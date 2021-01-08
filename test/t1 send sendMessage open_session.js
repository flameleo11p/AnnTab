      chrome.runtime.sendMessage({ type: 'open_session', index: x, bg_key: bg_key }, function (res) {
        inline_hide_tabs_layout()
      });



      
function dispatch_event(event, sender, sendResponse) {
  switch(event.type){

    case 'open_session':
      open_session(event.index, event.bg_key);
      sendResponse({})
      break;
    case 'GET_HISTORY':
      ctrlPressed = true;
      break;
    // case 'keyup':
    //     ctrlPressed = false;
    //     altPressed = false;
    //     break;
  }
}

function open_session(index, bg_key) {
  var session = bg[bg_key][index]
  print("[debug] open_session", index, session, bg.arr_session)
  session.tabs.map(function (tab) {
    chrome.tabs.create({ url: tab.url })
  })
}
