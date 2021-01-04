  var query = query_tabs_current
  var remove = !(cfg_KeepTabs);
  if (cfg_IncludeOthers) {
    query = query_tabs_all
  }
  collect_tabs(remove, query())


function collect_this() {
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