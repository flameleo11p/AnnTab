
// chrome.contextMenus.create({
//   "type":"radio",
//   "title":"collapse all",
//   "contexts":["browser_action"],
//   "onclick":function(info, tab) {
//       print(333, window)
//   }
// });


// chrome.contextMenus.create({type:'radio', title:'group1 r1'});
// chrome.contextMenus.create({type:'radio', title:'group1 r2'});
// chrome.contextMenus.create({type:'separator'});
// chrome.contextMenus.create({type:'radio', title:'group2 r1'});
// chrome.contextMenus.create({type:'radio', title:'group2 r2'});


    var tabs = res[0];
    var tabIds = []
    bg.tabs = tabs.filter(function (tab) {
      if (tab.url != "chrome://extensions/") {
        tabIds.push(tab.id)
      }
      return checkTab(tab);
    });

    send_localhost(bg.tabs)

    chrome.tabs.create({ url: 'popup.html' })
    if (true) {
      chrome.tabs.remove( tabIds )
    }


