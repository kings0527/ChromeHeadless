//author ketian
//ririhedou@gmail.com

const fs = require('fs');
const puppeteer = require('puppeteer');
var argv = require('minimist')(process.argv.slice(2));

const beginUrl = argv.url || 'http://facebook.com';
const beginFile = argv.file || 'default.txt' ;

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

  console.log('[1] Redirection: from url:<' + beginUrl + '> to <' + url + '>')

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

  await page.setViewport({width: 1600, height: 800, deviceScaleFactor: 2});
  await page.screenshot({path: name + '.screen.png'});
  console.log('[3] Screen was saved.');
  await browser.close();

};


run_single(beginUrl);