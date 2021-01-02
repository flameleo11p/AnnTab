var print = console.log;
var bg = window;
bg.arr_page = [];
bg.tabs = [];

// todo match start with
const gg_ignore_tab_url = [
  "chrome://newtab/",
  "chrome://settings/",
  "chrome://version/",
  "chrome://flags/",
  "chrome://extensions/",
  "chrome-extension://chphlpgkkbolifaimnlloiipkdnihall/onetab.html",
]


//----------------------------------------------------------
// func
//----------------------------------------------------------

function send_localhost(data, contentType='json') {
  var text;
  if (contentType == 'json') {
    text = JSON.stringify(data);
    contentType = "application/json"
  } else {
    text = data
    contentType = "text/html; charset=UTF-8";
  }

  var url = "http://localhost:41069/";
  fetch(url, {
    // credentials: "cors",
    mode: "cors",
    method: "post",
    headers: { 
      "Access-Control-Allow-Origin": "*",
      "Content-Type": contentType
      // "Content-Type": "text/html; charset=UTF-8"
    },
    body: text
  })
}

function checkTab(tab) {
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

//----------------------------------------------------------
// events
//----------------------------------------------------------

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
        var tabIds = []
	      bg.tabs = tabs.filter(function (tab) {
          if (tab.url != "chrome://extensions/") {
            tabIds.push(tab.id)
          }
          return checkTab(tab);
        });

        // send_localhost(tabs)
        send_localhost(bg.tabs)

	      chrome.tabs.create({ url: 'popup.html' })
        chrome.tabs.remove( tabIds )
	    })
	    .catch(function (err) {
	      console.error("Could not merge tabs", err);
	    });
  }
)


