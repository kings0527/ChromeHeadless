# ChromeHeadless

<p align="left">
<img src="https://ci.pytorch.org/jenkins/job/pytorch-builds/job/pytorch-win-ws2016-cuda9-cudnn7-py3-trigger/badge/icon" alt="building">

<img src="https://img.shields.io/readthedocs/pip.svg" alt="doc on">
</p>
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

Directly run headless chrome to get screenshot and dump html page, in separate steps

```
//take screen
google-chrome --headless --disable-gpu —-timeout=300 --enable-logging --v=1  \
--screenshot --window-size=1280,1696  http://facebook.com

//PS: --enable-logging --v=1 will log all the intermediate data, \
// you have to parse the log date to get the final URL.

//dump source
google-chrome --headless --disable-gpu --dump-dom https://www.chromestatus.com/


google-chrome --headless --hide-scrollbars --remote-debugging-port=9222 --disable-gpu &
```

Or install npm dependence to have more functionalities:
```
npm -v
5.6.0

nodejs -v
v8.5.0

npm install puppeteer
// google provided library
```

## Get screenshots, HTML source and redirections.

One command line for all, paralleled version is under construction :star:

The url is parsed into the parameter.

```
nodejs pup_run.js --url=http://facebook.com
```

## Test and Samples:

### Single case test

Time for get all on facebook page: 1.7s.

It captures the redirection from http to https.

```
time nodejs pup_run.js --url=http://facebook.com
[1] Redirection: from url:<http://facebook.com> to <https://www.facebook.com/>
[1] Redirection Chain was successfully saved.
[2] HTML was successfully saved.
[3] Screen was saved.

nodejs pup_run.js --url=http://facebook.com  0.96s user 0.18s system 64% cpu 1.756 total
```

- The screenshot: <img src="https://github.com/ririhedou/ChromeHeadless/blob/master/fb/facebook.com.screen.png" width="800" height="400" />


- The redirection chain:

```
<http://facebook.com> -> <https://www.facebook.com/>
```

- The html source: [TEXT](https://github.com/ririhedou/ChromeHeadless/blob/master/fb/facebook.com.source.txt)

### A large scale test

```
//--dir output directory
time nodejs pup_run.js --file=_home_datashare_dns_history_20170906_facebook.com.out --dir=fbtest/
```

For 225 test urls, the total time consumption is 335 seconds (1.5s/per url).

For 3165 test urls, the total time consumption is 763.21s user 130.13s system 17% cpu 1:27:09.00 total (1.65s/per url).


## Tutorials (I read)

Usage:

- use headless chrome to profile website. [LINK](https://medium.com/@e_mad_ehsan/getting-started-with-puppeteer-and-chrome-headless-for-web-scrapping-6bf5979dee3e)
- scrapy with Puppeteer [LINK](https://codeburst.io/a-guide-to-automating-scraping-the-web-with-javascript-chrome-puppeteer-node-js-b18efb9e9921)
- Puppeteer API reference [LINK](https://github.com/GoogleChrome/puppeteer/blob/v0.10.2/docs/api.md#pageclose)

How to build a :shipit:distributed:shipit: system:

- ChromeLess [LINK](https://github.com/graphcool/chromeless)
- Brozzler [LINK](https://github.com/internetarchive/brozzler)


## FAQ

- What if there are too many renders? (pkill chrome or run 100 urls each time)
-

More code is on the way
