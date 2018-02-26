//author ketian
//ririhedou@gmail.com

const fs = require('fs');
const puppeteer = require('puppeteer');
var argv = require('minimist')(process.argv.slice(2));

const beginUrl = argv.url || 'http://facebook.com';
const beginFile = argv.file || 'default.txt' ;
const globalDir = argv.dir || './'

//terminate the process in case some weird things happen
process.on('unhandledRejection', up => { throw up })

/*
* run for only 1 url at each time
*/
async function run_single(myUrl){

  const browser = await puppeteer.launch();
  var page = null;

  page = await browser.newPage();

  // WTF! needs to check this parameter seriously!
  // page.waitFor(0.001); //wait for the seconds to timeout ????
  var arrayOfStrings = String(myUrl).split('/');
  let name = arrayOfStrings[arrayOfStrings.length-1];

  await page.goto(myUrl);

  const url = await page.url();

  console.log('[1] Redirection: from url:<' + beginUrl + '> to <' + url + '>');

  var directionChain = 'Redirection: from url:<' + beginUrl + '> to <' + url + '>';

  fs.writeFile(name + '.redirect', directionChain, (err) => {
        if (err) throw err;
        console.log('[1] Redirection Chain was successfully saved.');
    });

  let HTML = await page.evaluate(() => document.documentElement.outerHTML);

    var filepath = name + '.source.txt';
    fs.writeFile(filepath, HTML, (err) => {
        if (err) throw err;
        console.log('[2] HTML was successfully saved.');
    });

  await page.setViewport({width: 1600, height: 800});
  await page.screenshot({path: name + '.screen.png'});
  console.log('[3] Screen was saved.');
  await browser.close();

};

/*
*  run multiple URL instances
*/
async function run_multiple_urls(urlList){

  urlList.sort();

  const browser = await puppeteer.launch();

  var page = null;

  var arrayLength = urlList.length;
  for (var i = 0; i < arrayLength; i++) {

    //the i-th element
    myUrl = urlList[i];

    console.log(String(i) +'-th: ' + myUrl);

    page = await browser.newPage();


    await page.waitFor(5); //wait for the seconds to timeout ????
    var arrayOfStrings = String(myUrl).split('/');
    let name = globalDir + arrayOfStrings[arrayOfStrings.length-1];

    await page.goto(myUrl);

    const url = await page.url();

    console.log('[1] Redirection: from url:<' + myUrl + '> to <' + url + '>');

    var directionChain = 'Redirection: from url:<' + myUrl + '> to <' + url + '>';

    fs.writeFile(name + '.redirect', directionChain, (err) => {
        if (err) throw err;
        console.log('[1] Redirection Chain was successfully saved.');
    });

    let HTML = await page.content(); //content is enough for the HTML content

    var filepath = name + '.source.txt';
    fs.writeFile(filepath, HTML, (err) => {
        if (err) throw err;
        console.log('[2] HTML was successfully saved.');
    });

    await page.setViewport({width: 1600, height: 800});
    await page.screenshot({path: name + '.screen.png'});

    console.log('[3] Screen was saved.');
    await page.close();
  }

  await browser.close();

};

//run_single(beginUrl);
urlList = ['http://facebook.com', 'http://google.com'];
run_multiple_urls(urlList);