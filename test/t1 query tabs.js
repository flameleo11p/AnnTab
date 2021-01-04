
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
