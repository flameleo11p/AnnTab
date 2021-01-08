
function get_origin(url) {
  if (!url) {
    return ["origin", "noname"]
  }
  var url = new URL(url)
  var origin = url.origin;
  var origin_short = origin.replace(/https?:\/\//i, "")
  return [origin, origin_short]
}

function get_origin(url) {
  if (!url) {
    return ["origin", "host", "hostname"]
  }
  var url = new URL(url)
  return [url.origin, url.host, url.hostname]
}
var url = "https://www.google.co.jp/search?q=translate";

var print = console.log;


var log_exclude = [
    "https://www.youtube.com/",
    "https://www.google.co.jp/search?q=translate",
    "https://www.google.co.jp/",
    "https://www.google.com/",
    "https://wx.qq.com/",
    "chrome-extension://chphlpgkkbolifaimnlloiipkdnihall/onetab.html",
    "chrome://newtab/",
    "chrome://settings/",
    "chrome://version/",
    "chrome://flags/",
    "chrome://extensions/"
  ]
var close_exclude= [
'http://localhost:41070',
    "chrome://extensions/",
    "https://trello.com/"
  ]

var [origin, host, hostname] = get_origin(url);

print(url.match(_r(url)))

print(url, origin, host, hostname)

function _r(str) {
  return (str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&'))
}



var url = "https://trello.com/"
print(_r(url))

// http://localhost:41070/xcvxcvzxcv
// 111 'http://localhost:41070' 'localhost:41070' 'localhost'
// 222 true


// 24

// Here is a one-liner: 
// str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')

// I got it from the escape-string-regexp NPM module.

// Trying it out:

// escapeStringRegExp.matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
// function escapeStringRegExp(str) {
//     return str.replace(escapeStringRegExp.matchOperatorsRe, '\\$&');
// }

// console.log(new RegExp(escapeStringRegExp('example.com')));
// // => /example\.com/


function check_tab(tab) {
  var url = tab.url
  if (url.startsWith("chrome://")) {
    return false; 
  }
  if (url.startsWith("chrome-extension://")) {
    return false; 
  }
  if (gg_ignore_tab_url.includes(url)) {
    return false;
  }
  return true;
}

function check_close_condition(tab) {
  var url = tab.url
  var exclude = self.setting.close_exclude.find((regex)=>{
    return url.match(regex);
  })
  return (! exclude);
}