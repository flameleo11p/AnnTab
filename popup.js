

var print = console.log;
var gg_clipboard_text = "";

const bg = chrome.extension.getBackgroundPage()

//----------------------------------------------------------
// tmp : need instead by simple
//----------------------------------------------------------


function strftime(sFormat, date) {
  if (!(date instanceof Date)) date = new Date();
  var nDay = date.getDay(),
    nDate = date.getDate(),
    nMonth = date.getMonth(),
    nYear = date.getFullYear(),
    nHour = date.getHours(),
    aDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    aMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    aDayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
    isLeapYear = function () {
      return (nYear % 4 === 0 && nYear % 100 !== 0) || nYear % 400 === 0;
    },
    getThursday = function () {
      var target = new Date(date);
      target.setDate(nDate - ((nDay + 6) % 7) + 3);
      return target;
    },
    zeroPad = function (nNum, nPad) {
      return ('' + (Math.pow(10, nPad) + nNum)).slice(1);
    };
  return sFormat.replace(/%[a-z]/gi, function (sMatch) {
    return {
      '%a': aDays[nDay].slice(0, 3),
      '%A': aDays[nDay],
      '%b': aMonths[nMonth].slice(0, 3),
      '%B': aMonths[nMonth],
      '%c': date.toUTCString(),
      '%C': Math.floor(nYear / 100),
      '%d': zeroPad(nDate, 2),
      '%e': nDate,
      '%F': date.toISOString().slice(0, 10),
      '%G': getThursday().getFullYear(),
      '%g': ('' + getThursday().getFullYear()).slice(2),
      '%H': zeroPad(nHour, 2),
      '%I': zeroPad((nHour + 11) % 12 + 1, 2),
      '%j': zeroPad(aDayCount[nMonth] + nDate + ((nMonth > 1 && isLeapYear()) ? 1 : 0), 3),
      '%k': '' + nHour,
      '%l': (nHour + 11) % 12 + 1,
      '%m': zeroPad(nMonth + 1, 2),
      '%M': zeroPad(date.getMinutes(), 2),
      '%p': (nHour < 12) ? 'AM' : 'PM',
      '%P': (nHour < 12) ? 'am' : 'pm',
      '%s': Math.round(date.getTime() / 1000),
      '%S': zeroPad(date.getSeconds(), 2),
      '%u': nDay || 7,
      '%V': (function () {
        var target = getThursday(),
          n1stThu = target.valueOf();
        target.setMonth(0, 1);
        var nJan1 = target.getDay();
        if (nJan1 !== 4) target.setMonth(0, 1 + ((4 - nJan1) + 7) % 7);
        return zeroPad(1 + Math.ceil((n1stThu - target) / 604800000), 2);
      })(),
      '%w': '' + nDay,
      '%x': date.toLocaleDateString(),
      '%X': date.toLocaleTimeString(),
      '%y': ('' + nYear).slice(2),
      '%Y': nYear,
      '%z': date.toTimeString().replace(/.+GMT([+-]\d+).+/, '$1'),
      '%Z': date.toTimeString().replace(/.+\((.+?)\)$/, '$1')
    }[sMatch] || sMatch;
  });
}


//----------------------------------------------------------
// func
//----------------------------------------------------------

function createTabs() {
  var history = document.querySelector('.history');
  var len = bg.arr_tabs.length;

  bg.arr_tabs.map((i_tabs, i, arr) => {
    // invert i to x
    var x = len - 1 - i;
    var tabs = arr[x];
    if (tabs["hidden"]) {
      return
    }

    // "Created 1/2/2021, 6:08:00 PM");
    var theTime = new Date(tabs.createTime)
    var createTimeText = "Created " + (strftime('%d/%m/%Y %H:%M:%S', theTime));
    print(111, i, x, theTime, createTimeText)
    print(222, typeof theTime, theTime instanceof Date)

    function inline_hide_tabs_layout() {
      // correspond bg.arr_tabs[x]
      tabs["hidden"] = true;
      hide_div(tabs_layout)
    }

    var tabs_layout = document.createElement('div');
    tabs_layout.classList.add('tabs-layout')

    var title_layout = document.createElement('div');
    title_layout.classList.add('title-layout')

    var title_box1 = document.createElement('div');
    title_box1.classList.add('title-layout-box1')
    var infoText = document.createTextNode(get_tabs_intro_text(tabs));
    title_box1.appendChild(infoText);

    var title_box2 = document.createElement('div');
    title_box2.classList.add('title-layout-box2')

    var title_time = document.createElement('div');
    title_time.classList.add('title-layout-box2-time')
    // var dateText = document.createTextNode("Created 1/2/2021, 6:08:00 PM");
    // title_time.appendChild(dateText);
    var dateText = document.createTextNode(createTimeText);
    title_time.appendChild(dateText);



    var title_btn1 = document.createElement('div');
    title_btn1.classList.add('title-layout-box2-action')
    title_btn1.classList.add('inline-btn')
    var text = document.createTextNode('Restore all');
    title_btn1.appendChild(text);
    title_btn1.onclick = function () {
      chrome.runtime.sendMessage({ type: 'open_tabs', index: x }, function (res) {
        inline_hide_tabs_layout()
      });
    }

    var title_btn2 = document.createElement('div');
    title_btn2.classList.add('title-layout-box2-action')
    title_btn2.classList.add('inline-btn')
    var text = document.createTextNode('Delete all');
    title_btn2.appendChild(text);
    title_btn2.onclick = function () {
      inline_hide_tabs_layout()
    }

    title_box2.appendChild(title_time);
    title_box2.appendChild(title_btn1);
    title_box2.appendChild(title_btn2);
    title_layout.appendChild(title_box1);
    title_layout.appendChild(title_box2);
    tabs_layout.appendChild(title_layout);

    tabs.map(function (tab) {
      var page_layout = createPage(tab)
      tabs_layout.appendChild(page_layout);
    });

    history.appendChild(tabs_layout);
  });

  print("[info] arr_tabs", bg.arr_tabs)
}

function hide_div(div) {
  div.style.display = 'none'
  // div.remove()
}

function get_tabs_intro_text(tabs) {
  var count = tabs.length
  return (count == 1) ? "1 tab" : (count + " tabs");
}

function is_localhost(hostname) {
  return hostname === "" || hostname === "localhost" || hostname === "127.0.0.1";
}

function get_origin(url) {
  if (!url) {
    return ["origin", "host", "hostname"]
  }
  var url = new URL(url)
  return [url.origin, url.host, url.hostname]
}

function resizeInput() {
  this.style.width = this.value.length + "ch";
}

function selectText(id) {
  var sel, range;
  var el = document.getElementById(id);
  sel = window.getSelection();
  sel.removeAllRanges();
  range = document.createRange();
  range.selectNodeContents(el);
  sel.addRange(range);

  gg_clipboard_text = sel.toString()
}

function deselectAll() {
  window.getSelection().removeAllRanges();

}

function createPage(tab) {
  if (!tab) return;

  if (tab.status == "loading") {
    print(222, "loading", tab)

    tab.url = tab.url || tab.pendingUrl;

    var [origin, host, hostname] = get_origin(tab.url);
    tab.title = tab.title || host;
    // chrome://favicon/https://stackoverflow.com
    if (is_localhost(hostname)) {
      tab.favIconUrl = tab.favIconUrl || ("chrome://favicon/undefined");
    } else {
      tab.favIconUrl = tab.favIconUrl || ("chrome://favicon/" + origin);
    }
    print(333, "loading-fix", tab)
  }
  tab.favIconUrl = tab.favIconUrl || ("chrome://favicon/undefined");




  var div_layout = document.createElement('div');
  div_layout.classList.add('page-layout')

  var div = document.createElement('div');
  div.classList.add('page')

  var img = document.createElement('img');
  img.src = tab.favIconUrl;

  // var ul = document.createElement('ul');
  var a_img = document.createElement('a');
  a_img.appendChild(img);
  a_img.href = tab.favIconUrl;


  var a = document.createElement('a');
  var aText = document.createTextNode(tab.title);
  // a.classList.add('btn')
  a.appendChild(aText);
  a.href = tab.url;

  var span = document.createElement('span');
  var spanText = document.createTextNode(tab.url);
  span.appendChild(spanText);

  var input = document.createElement('input');
  input.readOnly = true;
  input.value = tab.url;
  input.style.width = Math.min(input.value.length, 20) + "ch";

  // input.type = "button";
  // ondblclick
  input.onclick = function () {
    this.select();
    document.execCommand('copy');
  }

  var span = document.createElement('span');
  var br = document.createElement('br');
  span.appendChild(br);

  div.appendChild(a_img);
  div.appendChild(a);
  div.appendChild(input);
  div.appendChild(span);

  div_layout.appendChild(div);
  return div_layout;
}
//----------------------------------------------------------
// events
//----------------------------------------------------------


// todo 
// SHOW copied tooltips
var btn_copy = document.getElementById('copy_all');
btn_copy.onclick = function () {
  selectText('record')
  document.execCommand('copy');
  setTimeout(() => {
    deselectAll()
    document.execCommand('paste');
  }, 500);
}

// document.addEventListener('paste', function (evt) {
//   copied = evt.clipboardData.getData('text/plain');
//   print(333, copied)
// });

var btn_save = document.getElementById('btn_save');
btn_save.onclick = function () {
  // todo download a text file
  // var txt = gg_clipboard_text
}

document.addEventListener('DOMContentLoaded', function () {
  createTabs()
})




chrome.runtime.sendMessage({ type: 'GET_HISTORY' }, function (res) {
  print(111, 'GET_HISTORY recv res', res)
});




/*
id="copy_all"

*/
