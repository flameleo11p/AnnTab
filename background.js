var print = console.log;


var bg = window;
bg.arr_page = [];


// https://developer.chrome.com/extensions/tabs#type-WindowType
// possible window types: "normal", "popup", "panel", "app", or "devtools"
function tabQueryToPromise(windowType) {
  return new Promise(function (resolve, reject) {
    chrome.tabs.query({ windowType: windowType }, function (tabs) {
      if (tabs == null) {
        reject(tabs);
      } else {
        resolve(tabs);
      }
    });
  });
}

function getTabs() {
  return Promise.all([tabQueryToPromise('normal'), tabQueryToPromise('popup')]).then(
    function (res) {
      // var normalWindowTabs = res[0];
      // var popupTabs = res[1];
      var tabs = ([]).concat(...res).map(function (tab) {
        return tab;
        // return {
        //   id: tab.id,
        //   url: tab.url,
        //   favIconUrl: tab.favIconUrl,
        //   title: tab.title,
        // };
      });
      return Promise.resolve(tabs);
    });
}


// onrecv when F5 reload 
chrome.runtime.onMessage.addListener(
  function (message, sender, sendResponse) {
    var page = message;
    bg.arr_page.push(page)
  }
)

chrome.browserAction.onClicked.addListener( 
  function (tab, sender, sendResponse) {


	  Promise.resolve(Promise.all([getTabs()]))
	    .then(function (res) {
	      var tabs = res[0];
	      bg.tabs = tabs;

	      print(222, tabs)

	      chrome.tabs.create({ url: 'popup.html' })

	    })
	    .catch(function (err) {
	      console.error("Could not merge tabs", err);
	    });

    
  }
)


