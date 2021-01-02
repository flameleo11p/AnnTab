var print = console.log;
//获取域名
var host = window.location.host;
var domain = document.domain;
var url = window.location.href;
var title = document.title;
var origin = window.location.origin;

chrome.runtime.sendMessage({
  url: url,
  domain: domain,
  host: host,
  title: title,
  origin: origin,
})


// chrome.tabs.getSelected(null, function (tab) {
//   var id = tab.id;
//   var url = tab.url;

//   print(222, url, id)
// });

// setTimeout(function(){ 
// 	print(1111, window)
// 	print(2222, document)
// 	print(3333, window.location.href)
// 	print(4444, document.URL)	
// 	print(5555, document.cookie)
// }, 3000);


