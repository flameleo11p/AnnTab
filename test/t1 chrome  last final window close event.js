chrome.windows.getAll(object getInfo, function callback)
获取所有窗口。

chrome.windows.onRemoved.addListener(function () {
    chrome.windows.getAll(function (windows) {
        if (windows.length <= 0) {
           // Write code here
        }
    });
});


0

var openWindowCount = 0;

chrome.windows.onCreated.addListener(function(Window window) {
  ++openWindowCount;
});

chrome.windows.onRemoved.addListener(function(windowId) {
  if (--openWindowCount == 0) {
    // this is the last window.
  }
);