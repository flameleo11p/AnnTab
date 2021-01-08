
//----------------------------------------------------------
// tmp
//----------------------------------------------------------

// save cache in last window
// not working when last window close
var tmp_windowCount = 0;
chrome.windows.onCreated.addListener(function(windowId) {
  tmp_windowCount++;
});

chrome.windows.onRemoved.addListener(function(windowId) {
  tmp_windowCount--;
  if (tmp_windowCount <= 1) {
    // 123
  }
});

chrome.storage.local.get(['arr_session'], function(res) {
  bg.last_arr_session = res.arr_session || [];
  print("[db] last sessions:", bg.last_arr_session, res)
});