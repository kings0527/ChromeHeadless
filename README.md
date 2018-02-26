# ChromeHeadless

Command line for get HTMLs

```
#install chrome debian
sudo apt-get update
sudo apt-get install google-chrome-stable

# get your chrome version
apt list --installed | grep chrome

#my version is that google-chrome-stable/now 62.0.3202.89-1 amd64 [installed,upgradable to: 64.0.3282.186-1]

google-chrome --headless --disable-gpu —-timeout=300 --enable-logging --v=1  \
--screenshot --window-size=1280,1696  http://facebook.com
```


Run headless chrome at background

```
google-chrome --headless --hide-scrollbars --remote-debugging-port=9222 --disable-gpu &
```


# Tutorials

Usage:

- use headless chrome to profile website. [LINK](https://medium.com/@e_mad_ehsan/getting-started-with-puppeteer-and-chrome-headless-for-web-scrapping-6bf5979dee3e)
- scrapy with Puppeteer [LINK](https://codeburst.io/a-guide-to-automating-scraping-the-web-with-javascript-chrome-puppeteer-node-js-b18efb9e9921)


How to build a :shipit:distributed:shipit: system:

- ChromeLess [LINK](https://github.com/graphcool/chromeless)
- Brozzler [LINK](https://github.com/internetarchive/brozzler)

