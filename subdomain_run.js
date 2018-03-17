//author ketian
//ririhedou@gmail.com

const fs = require('fs');
const puppeteer = require('puppeteer');
var argv = require('minimist')(process.argv.slice(2));


function checkDirectorySync(directory) {
  try {

    fs.statSync(directory);
    console.log("Existing "+ directory + ", no need to recreate");

  } catch(e) {

    fs.mkdirSync(directory);
    console.log("Create a directory as "+ directory);
  }
}

//terminate the process in case some weird things happen
process.on('unhandledRejection', up => { throw up })

/*
*  run multiple URL instances
*  @input: list of URLs
*
*/
async function run_multiple_urls(urlList, _idx, globalDir){

  var page = null;

  const browser = await puppeteer.launch({args: ['--no-sandbox']});
  //if you do not use this, error will happen on CentOS 7

  var arrayLength = urlList.length;

  for (var i = 0; i < arrayLength; i++) {

    //the i-th element
    myUrl = urlList[i];

    console.log("[TEST]Visiting  "+ _idx + ":" + myUrl);

    page = await browser.newPage();
    try {
            var arrayOfStrings = String(myUrl).split('/');

            var name = globalDir + arrayOfStrings[arrayOfStrings.length-1];

            await page.goto(myUrl,  { timeout: 5000 }); //5000 is 5000ms

            //await page.waitForNavigation();

            const url = await page.url();

            //console.log('[1] Redirection: from url:<' + myUrl + '> to <' + url + '>');

            var directionChain = 'Redirection: from url:<' + myUrl + '> to <' + url + '>';

            await fs.writeFile(name + '.redirect', directionChain, (err) => {
                if (err) throw err;
                //console.log('[1] Redirection Chain was successfully saved.');
            });

            let HTML = await page.content(); //content is enough for the HTML content

            var filepath = name + '.source.txt';
            await fs.writeFile(filepath, HTML, (err) => {
                if (err) throw err;
                //console.log('[2] HTML was successfully saved.');
            });

            await page.setViewport({width: 1600, height: 800});
            await page.screenshot({path: name + '.screen.png'});

            //console.log('[3] Screen was saved.');
            console.log("[SUCC]Done on "+  _idx + ":" + myUrl);
        }
    catch (e)
        {
            //console.log(e);
            console.log('[FAIL]Cannot go to for ' +  _idx + ":" + myUrl + ', continue...');
        }
    await page.close();

  }
  await browser.close();

};


async function run_file_in_subdomain_fashion(filename, _id, outputDir)
{

    var lines = fs.readFileSync(filename, 'utf-8').split('\n').filter(Boolean);
    var urlList = new Array();

    for (var i in lines)
        {
          var arr = lines[i].split(",");
          //do some data cleaning
          arr[3] = arr[3].replace('(u\'','').replace(')','').replace('\'','').replace('\'','').replace(' ','');
          var url = 'http://' + arr[3];
          urlList.push(url);

        }

    console.log('[STAT]Total length of ' + filename + '  is   ' + String(urlList.length));

    var length = urlList.length;
    var interval = 100;
    for (var i = 0; i < length; i = i+interval)
    {
        var subArray = urlList.slice(i,i+interval)
        try
        {
            await run_multiple_urls(subArray, _id, outputDir);
        }
        catch (e)
        {
           console.log("[FXXK]Browser launch failed");
        }
    }

}



//Read all files into a map
async function main() {

    const beginId = "subdomain";
    var outputDir = null;

    if (beginId.length > 0)
    {  outputDir = argv.dir + beginId + '/'|| './' }
    else
    {  outputDir = argv.dir || './' }

    console.log("globalDir is " + outputDir);
    fs.mkdirSync(outputDir);
    var files = fs.readdirSync('./subdomain_collect/');
    files.sort()
    for (i in files)
    {
        var file = './subdomain_collect/' + files[i];
        var _id = i;
        var output = outputDir + _id.toString() + '/'
        checkDirectorySync(output);
        console.log(_id, file);
        await run_file_in_subdomain_fashion(file, _id.toString(), output);
    }

    process.exit(0);
}

main();

//run_file_in_subdomain_fashion(_map);
