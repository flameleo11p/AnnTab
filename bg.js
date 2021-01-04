

var print = console.log;
var bg = window;
bg.arr_page = [];
bg.tabs = [];

//----------------------------------------------------------
// rem
//----------------------------------------------------------


// todo match start with
const gg_ignore_tab_url = [

  "chrome-extension://chphlpgkkbolifaimnlloiipkdnihall/onetab.html",
  "https://www.youtube.com/",
  "https://www.google.co.jp/search?q=translate",
  "https://www.google.co.jp/",
  "https://www.google.com/",
  // "https://wx.qq.com/",

  "chrome://newtab/",
  "chrome://settings/",
  "chrome://version/",
  "chrome://flags/",
  "chrome://extensions/"
]

var ctrlPressed = false;
var altPressed = false;

// config
var cfg_KeepTabs = false,
    cfg_IncludeOthers = false;



//----------------------------------------------------------
// func
//----------------------------------------------------------

function send_localhost(data, contentType='json') {
  var text;
  if (contentType == 'json') {
    try {
      text = JSON.stringify(data);
    } catch(e) {
      print("[erro] invalid data (json.stringify):", data)
    }

    contentType = "application/json"
  } else {
    text = data
    contentType = "text/html; charset=UTF-8";
  }

  if (!(text && text.length > 2)) return;

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

function _P(async_proc) {
  return new Promise(function (resolve, reject) {
    async_proc(resolve, reject)
  });
}

function check_tab(tab) {
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

function query_tabs(windowType, currentWindow) {
  var options = { windowType: windowType };
  if (currentWindow !== undefined) {
    options["currentWindow"] = currentWindow
  }

  return new Promise((resolve, reject)=>{
    chrome.tabs.query(options, function (tabs) {
      if (tabs) {
        resolve(tabs);
      }
    });
  })
}

function query_tabs_all() {
  return Promise.all([query_tabs('normal'), query_tabs('popup')]).then(
    function (res) {
      var tabs = ([]).concat(...res).map(function (tab) {
        return tab;
      });
      return Promise.resolve(tabs);
    });
}

function query_tabs_current() {
  return Promise.all([query_tabs('normal', true), query_tabs('popup', true)]).then(
    function (res) {
      var tabs = ([]).concat(...res).map(function (tab) {
        return tab;
      });
      return Promise.resolve(tabs);
    });
}

function query_tabs_others() {
  return Promise.all([query_tabs('normal', false), query_tabs('popup', false)]).then(
    function (res) {
      var tabs = ([]).concat(...res).map(function (tab) {
        return tab;
      });
      return Promise.resolve(tabs);
    });
}

function get_results(callback, ...queryTabResults) {
  Promise.resolve(Promise.all([...queryTabResults]))
  .then(function (res) {
    callback(res)
  })
  .catch(function (err) {
    console.error("[error] enum_tabs failed !", err);
  });
}

// cfg_KeepTabs cfg_IncludeOthers
// query_tabs
// query_tabs_all
// query_tabs_current
// query_tabs_others
function collect_tabs(remove, ...queryTabResults) {
  get_results((res)=>{
    var tabs = res[0];
    var tabIds = []

    tabs = tabs.filter(function (tab) {
      if (tab.url != "chrome://extensions/") {
        tabIds.push(tab.id)
      }
      return check_tab(tab);
    });

    // send to backend for save log file
    send_localhost(tabs)

    // create popup
    bg.tabs = tabs;
    chrome.tabs.create({ url: 'popup.html' })

    if (remove) {
      // var tabIds = tabs.map((t)=>t.id)
      chrome.tabs.remove( tabIds )
    }
  }, ...queryTabResults)
}

function collect_this() {
  var remove = !(cfg_KeepTabs);
  collect_tabs(remove, query_tabs_current())
}

function collect_all() {
  var remove = !(cfg_KeepTabs);
  collect_tabs(remove, query_tabs_all())
}

function collect_others() {
  var remove = !(cfg_KeepTabs);
  collect_tabs(remove, query_tabs_others())
}

function collect_with_alive() {
  var invert_query = cfg_IncludeOthers ? query_tabs_current : query_tabs_all
  collect_tabs(false, invert_query())
}


//----------------------------------------------------------
// events
//----------------------------------------------------------

chrome.browserAction.onClicked.addListener(()=>{
  var query = cfg_IncludeOthers ? query_tabs_all : query_tabs_current
  var remove = !(cfg_KeepTabs);
  collect_tabs(remove, query())
})

//----------------------------------------------------------
// contextMenus
//----------------------------------------------------------

// todo cfg_IncludeOthers cfg_KeepTabs
// add or remove menu
chrome.contextMenus.create({
  "title":"Get this",
  "contexts":["browser_action"],
  "onclick":function(info, tab) {
    collect_this()
  }
});

chrome.contextMenus.create({
  "title":"Take all",
  "contexts":["browser_action"],
  "onclick":function(info, tab) {
    collect_all()
  }
});

chrome.contextMenus.create({
  "title":"Close other tabs",
  "contexts":["browser_action"],
  "onclick":function(info, tab) {
    collect_others() 
  }
});


// chrome.contextMenus.create({
//   "title":"Go with tab alive",
//   "contexts":["browser_action"],
//   "onclick":function(info, tab) {
//     collect_with_alive() 
//   }
// });

chrome.contextMenus.create({
  "type": 'separator',
  "contexts": ["browser_action"]
});

chrome.contextMenus.create({
  "title":"Keep tab alive",
  "type": "checkbox",
  "checked": false,  
  "contexts":["browser_action"],
  "onclick":function(info, tab) {
    cfg_KeepTabs = info.checked;
  }
});

chrome.contextMenus.create({
  "title":"Include others",
  "type": "checkbox",
  "checked": false,  
  "contexts":["browser_action"],
  "onclick":function(info, tab) {
    cfg_IncludeOthers = info.checked;
  }
});

function dispatch_event(event) {
  switch(event.type){
    case 'GET_HISTORY':
        ctrlPressed = true;
        break;
    // case 'altPressed':
    //     altPressed = true;
    //     break;
    // case 'keyup':
    //     ctrlPressed = false;
    //     altPressed = false;
    //     break;
  }
}



//----------------------------------------------------------
// onMessage
//----------------------------------------------------------

chrome.runtime.onMessage.addListener(
  function(event, sender, sendResponse){

    dispatch_event(event) 
    print(111 , event)
    print(222, sender, sendResponse)
  // print(111, "recv event", event.type, event.data)
  // print(222, "recv event", event.data.isComposing, event.data.keyCode)

  }
); 