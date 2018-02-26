# ChromeHeadless

A lightweight built-in for website profiling.

## Install

Install chrome and check whether it is stable:

```
#install chrome debian
sudo apt-get update
sudo apt-get install google-chrome-stable

### get your chrome version
apt list --installed | grep chrome

#my version is that google-chrome-stable/now 62.0.3202.89-1 amd64
\ [installed,upgradable to: 64.0.3282.186-1]

```

Run headless chrome to get screenshot amd dump html page.

```
//take screen
google-chrome --headless --disable-gpu —-timeout=300 --enable-logging --v=1  \
--screenshot --window-size=1280,1696  http://facebook.com

//dump source
chrome --headless --disable-gpu --dump-dom https://www.chromestatus.com/

google-chrome --headless --hide-scrollbars --remote-debugging-port=9222 --disable-gpu &

```

Install npm dependence
```
npm -v
5.3.0

nodejs -v
v8.5.0

npm install puppeteer
```

## Get screenshots, HTML source and redirections.

one command line for all, paralleled version is under construction :star:

the url is parsed as the parameter.

```
nodejs pup_run.js --url=http://facebook.com
```


## Test and Samples:

Time for get all on facebook page: 1.7s.

It captures the redirection from http to https.

```
time nodejs pup_run.js --url=http://facebook.com
[1] Redirection: from url:<http://facebook.com> to <https://www.facebook.com/>
[2] HTML was succesfully saved.
[3] Screen was saved.

nodejs pup_run.js --url=http://facebook.com  1.00s user 0.18s system 65% cpu 1.796 total

```

- The screenshot: <img src="https://github.com/ririhedou/ChromeHeadless/blob/master/fb_test.png" width="800" height="400" />


- The redirection chain:

```
<http://facebook.com> -> <https://www.facebook.com/>
```

- The html source: [TEXT](https://raw.githubusercontent.com/ririhedou/ChromeHeadless/master/mynewfile.txt)


## Tutorials (I read)

Usage:

- use headless chrome to profile website. [LINK](https://medium.com/@e_mad_ehsan/getting-started-with-puppeteer-and-chrome-headless-for-web-scrapping-6bf5979dee3e)
- scrapy with Puppeteer [LINK](https://codeburst.io/a-guide-to-automating-scraping-the-web-with-javascript-chrome-puppeteer-node-js-b18efb9e9921)


How to build a :shipit:distributed:shipit: system:

- ChromeLess [LINK](https://github.com/graphcool/chromeless)
- Brozzler [LINK](https://github.com/internetarchive/brozzler)


## TODO

More code is on the way
