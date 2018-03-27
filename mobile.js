//author ketian
//ririhedou@gmail.com

module.exports =
{
    run_mobile_multiple_urls : run_mobile_multiple_urls
}


const fs = require('fs');
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const globalDir = './'

// let us emulate Iphone6:
async function run_mobile_single(myUrl){

    const browser = await puppeteer.launch({ignoreHTTPSErrors: true, args: ['--no-sandbox']});
    //if you do not use this, error will happen on CentOS 7

    const iPhone = devices['iPhone 6'];

    var page = null;

        page = await browser.newPage();

        await page.emulate(iPhone);

        //await page.setUserAgent(mobile_userAgent);

        var arrayOfStrings = String(myUrl).split('/');

        let name = globalDir + arrayOfStrings[arrayOfStrings.length-1];

        console.log("The store location is at " + name);

        await page.goto(myUrl,  { timeout: 5000 }); //5000 is 5000ms

        const url = await page.url();

        console.log('[1] Redirection: from url:<' + myUrl + '> to <' + url + '>');

        var directionChain = 'Redirection: from url:<' + myUrl + '> to <' + url + '>';

        await fs.writeFile(name + '.redirect', directionChain, (err) => {
            if (err) throw err;
            console.log('[1] Redirection Chain was successfully saved.');
        });

        let HTML = await page.content(); //content is enough for the HTML content

        var filepath = name + '.source.txt';
        await fs.writeFile(filepath, HTML, (err) => {
            if (err) throw err;
            console.log('[2] HTML was successfully saved.');
        });

        //await page.setViewport({width: 1600, height: 800});
        await page.screenshot({path: name + '.screen.png'});

        console.log('[3] Screen was saved.');
        await page.close();


    await browser.close();
};

async function run_mobile_multiple_urls(urlList, beginId, globalDir){

  var page = null;

  const browser = await puppeteer.launch({args: ['--no-sandbox']});
  //if you do not use this, error will happen on CentOS 7

  const iPhone = devices['iPhone 6'];

  var arrayLength = urlList.length;

  for (var i = 0; i < arrayLength; i++) {

    //the i-th element
    myUrl = urlList[i];

    console.log("[TEST MOBILE]Visiting  "+ beginId + ":" + myUrl);

    page = await browser.newPage();

    await page.emulate(iPhone);

    try {
            var arrayOfStrings = String(myUrl).split('/');

            let name = globalDir + arrayOfStrings[arrayOfStrings.length-1];

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

            await page.screenshot({path: name + '.screen.png'});

            //console.log('[3] Screen was saved.');
            console.log("[SUCC MOBILE]Done on "+  beginId + ":" + myUrl);
        }
    catch (e)
        {
            //console.log(e);
            console.log('[FAIL MOBILE]Cannot go to for ' +  beginId + ":" + myUrl + ', continue...');
        }

    await page.close();

  }
  await browser.close();

};


//var url ="http://facebook.com";
//run_mobile_single(url);