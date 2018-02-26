# ChromeHeadless

Command line for get HTMLs

```
#install chrome debian
sudo apt-get update
sudo apt-get install google-chrome-stable

# get your chrome version
apt list --installed | grep chrome

#my version is that google-chrome-stable/now 62.0.3202.89-1 amd64 [installed,upgradable to: 64.0.3282.186-1]

google-chrome --headless --disable-gpu —-timeout=300 --enable-logging --v=1 --screenshot --window-size=1280,1696  http://facebook.com\
```


Run headless chrome at background

```
google-chrome --headless --hide-scrollbars --remote-debugging-port=9222 --disable-gpu &
```