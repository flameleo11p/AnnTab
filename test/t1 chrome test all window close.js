//----------------------------------------------------------
// not working
//----------------------------------------------------------

chrome.windows.onRemoved.addListener(function(windowId){
  print("!! Exiting the Browser !!");
  // not working in last closed
  send_localhost({name:"test"})
});

//----------------------------------------------------------
// not working too
//----------------------------------------------------------

var num_tabs = 0
chrome.tabs.getAllInWindow( null, function( tabs ){
  print("Init:" + tabs.length);
  num_tabs = tabs.length;
});

chrome.tabs.onCreated.addListener(function(tab){
  num_tabs++;
  print("onCreated: " + num_tabs);
});

chrome.tabs.onRemoved.addListener(function(tabId){
  num_tabs--;
  print("onRemoved" + num_tabs);
  if( num_tabs == 0 ) {
    alert("removeAllTabs" +  num_tabs  )
      // notification.cancel();
  }
});