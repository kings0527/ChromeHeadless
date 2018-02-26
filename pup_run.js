//author ketian
//ririhedou@gmail.com

const fs = require('fs');
const puppeteer = require('puppeteer');
var argv = require('minimist')(process.argv.slice(2));

const beginUrl = argv.url || 'http://facebook.com';

(async () => {

  const browser = await puppeteer.launch();
  var page = null;

  page = await browser.newPage();

  // WTF! needs to check this parameter seriously!
  // page.waitFor(0.001); //wait for the seconds to timeout ????

  await page.goto(beginUrl);

  const url = await page.url();

  console.log('[1] Redirection: from url:<' + beginUrl + '> to <' + url + '>')

  let HTML = await page.evaluate(() => document.documentElement.outerHTML);

    var filepath = 'mynewfile.txt';
    fs.writeFile(filepath, HTML, (err) => {
        if (err) throw err;
        console.log('[2] HTML was succesfully saved.');
    });

  await page.setViewport({width: 1600, height: 800, deviceScaleFactor: 2});
  await page.screenshot({path: 'fb_test.png'});
  console.log('[3] Screen was saved.');

  await browser.close();

})();