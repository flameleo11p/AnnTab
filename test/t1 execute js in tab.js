chrome.browserAction.onClicked.addListener(function(tab) {
    var found = false;
    var tabId;
    chrome.tabs.query({}, function (tabs) {
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].url.search("www.pandora.com/") > -1){
                found = true;
                tabId = tabs[i].id;
            }
        }
        if (found == false){
            chrome.tabs.executeScript(null,{file: "buy.js"});
        } else {
            chrome.tabs.update(tabId, {selected: true});
        }
    });
});