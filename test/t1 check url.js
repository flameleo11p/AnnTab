
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


var self = {}
self.setting = {
  "log_exclude": [
    "https://www.youtube.com/",
    "https://www.google.co.jp/search?q=translate",
    "https://www.google.co.jp/",
    "https://www.google.com/",
    "https://wx.qq.com/",
    "chrome://newtab/",
    "chrome://settings/",
    "chrome://version/",
    "chrome://flags/",
    "^chrome-extension://",
    "chrome://extensions/"
  ],
  "close_exclude": [
    "^chrome://extensions",
    "^https://trello.com"
  ]
}


function check_close_exclude(tab) {
  var url = tab.url
  var exclude = self.setting.close_exclude.find((pattern)=>{
    if (pattern.startsWith('^')) {
      var rest = pattern.substr(1);
      return url.startsWith(rest); 
    }
    return (url == pattern);
  })
  return (!!exclude);
}

function check_log_exclude(tab) {
  var url = tab.url
  var exclude = self.setting.log_exclude.find((pattern)=>{
    if (pattern.startsWith('^')) {
      var rest = pattern.substr(1);
      return url.startsWith(rest); 
    }
    return (url == pattern);
  })
  return (!!exclude);
}




// var tab = {
//   url: "chrome-extension://mblimcaofbhaknffgoedcgefjfbahjmp/popup.html"
// }
var tab = {
  url: "chrome://newtab/"
}


print(check_log_exclude(tab))
print(check_close_exclude(tab))
