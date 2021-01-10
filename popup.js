

var print = console.log;
var gg_clipboard_text = "";

const bg = chrome.extension.getBackgroundPage()

//----------------------------------------------------------
// common: tmp : need instead by simple
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

function count_down(fn, sec) {
  fn(sec)
  var tm = setInterval(function () {
    sec--;
    fn(sec)
    if (sec <= 0) {
      clearInterval(tm);
    }
  }, 1000);
}

function show_div(div, style = 'block') {
  // p.ex1 { display: none; }
  // p.ex2 { display: inline; }
  // p.ex3 { display: block; }
  // p.ex4 { display: inline - block; }  
  // https://www.w3schools.com/cssref/pr_class_display.asp
  div.style.display = style
}

function get_tabs_intro_text(tabs) {
  var count = tabs.length
  return (count == 1) ? "1 tab" : (count + " tabs");
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
  var div_layout = document.createElement('div');
  div_layout.classList.add('page-layout')

  var div = document.createElement('div');
  div.classList.add('page')

  // page img tile url
  var img = document.createElement('img');
  img.classList.add('page-icon')
  img.src = tab.favIconUrl;

  var a_img = document.createElement('div');
  a_img.classList.add('div-img')
  a_img.classList.add('inline-btn')
  a_img.appendChild(img);
  a_img.onclick = function () {
    window.open(tab.favIconUrl);
  }

  var a = document.createElement('div');
  var titleText = document.createTextNode(tab.title);
  a.classList.add('div-a')
  a.classList.add('inline-btn')
  a.appendChild(titleText);
  a.onclick = function () {
    window.open(tab.url);
  }

  var input = document.createElement('input');
  input.classList.add('hidden-input')
  input.readOnly = true;
  input.value = tab.url;
  input.style.width = Math.min(input.value.length, 20) + "ch";

  // input.type = "button";
  // ondblclick
  input.onclick = function () {
    this.select();
    document.execCommand('copy');
  }

  // newline
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

function create_session(arr_session, bg_key) {
  print("[info]", bg_key, arr_session)
  if (!(arr_session && arr_session.length > 0)) {
    return;
  }

  var history = document.querySelector('.history');

  var len = arr_session.length;
  arr_session.map((i_tabs, i, arr) => {
    // invert i to x
    var x = len - 1 - i;
    var session = arr[x];
    var tabs = session.tabs;
    var theTime = new Date(session.createTime)

    if (tabs.length <= 0) {
      return
    }
    if (session["hidden"]) {
      return
    }

    var all_urls = tabs.map(function (tab) {
      return tab.url;
    });

    // todo delete from local storage
    function inline_hide_tabs_layout() {
      session["hidden"] = true;
      show_div(tabs_layout, 'none')
    }

    var sz_intro = get_tabs_intro_text(tabs);
    // "Created 1/2/2021, 6:08:00 PM");
    var createTimeText = "Created " + (strftime('%d/%m/%Y %H:%M:%S', theTime));


    var tabs_layout = document.createElement('div');
    tabs_layout.classList.add('tabs-layout')

    var title_layout = document.createElement('div');
    title_layout.classList.add('title-layout')

    var title_box1 = document.createElement('div');
    title_box1.classList.add('title-layout-box1')
    var infoText = document.createTextNode(sz_intro);
    title_box1.appendChild(infoText);

    var title_box2 = document.createElement('div');
    title_box2.classList.add('title-layout-box2')

    var title_time = document.createElement('div');
    title_time.classList.add('title-layout-box2-time')

    var dateText = document.createTextNode(createTimeText);
    title_time.appendChild(dateText);


    var title_btn1 = document.createElement('div');
    title_btn1.classList.add('title-layout-box2-action')
    title_btn1.classList.add('inline-btn')
    var text = document.createTextNode('Restore all');
    title_btn1.appendChild(text);
    title_btn1.onclick = function () {
      all_urls.map((url) => {
        window.open(url);
      })
      inline_hide_tabs_layout()
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


}

function create_separate(num = 1) {
  var history = document.querySelector('.history');

  var tabs_layout = document.createElement('div');
  tabs_layout.classList.add('separate-layout')

  for (var i = 1; i <= num; i++) {
    var line = document.createElement('div');
    line.classList.add('line')
    tabs_layout.appendChild(line);
  }
  
  history.appendChild(tabs_layout);
}

// todo init clear history
function reload_tabs() {
  var count = bg.arr_session.length;
  var count2 = bg.last_arr_session.length;

  var tips_layout = document.querySelector('.tips-layout');
  show_div(tips_layout, 'none')

  if (count > 0) {
    create_session(bg.arr_session, "arr_session")
  }

  if (count2 > 0) {
    print("[debug] render last_arr_session", count2)
    create_separate(1)
    create_session(bg.last_arr_session, "last_arr_session")
  }
}

// Home
// Setting
// About
// Contact
function init_menu() {
  var menu_toggler = document.querySelector('.toggler');

  var btn_home = document.querySelector('#menu-btn-home');
  btn_home.onclick = function () {
    menu_toggler.checked = false;
    window.scrollTo(0, 0);
    // window.scrollTo(0, document.body.scrollHeight);
    window.open("https://github.com/flameleo11p/AnnTab");
  }

  var btn_setting = document.querySelector('#menu-btn-setting');
  btn_setting.onclick = function () {
    // window.open("/setting.json");
    // window.open(chrome.extension.getURL("/test"));
    // window.open("file://"+chrome.extension.getURL("/setting.json"));
    // window.open("file:///home/me/Downloads/");
    // chrome.tabs.create({url: "file:///home/me/Downloads/"});
    chrome.tabs.create({url: "file:///home"});

  }

  var btn_about = document.querySelector('#menu-btn-about');
  btn_about.onclick = function () {
    window.open("/about.html");
    // file:///drive_d/work/chrome_ext/meTabs/test/
    // chrome-extension://mblimcaofbhaknffgoedcgefjfbahjmp/setting.json
    // window.open("https://github.com/flameleo11p/AnnTab");
  }

  var btn_back = document.querySelector('#menu-btn-back');
  btn_back.onclick = function () {
    menu_toggler.checked = false;
  }


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
    window.open("http://www.google.com/");
  }



}

//----------------------------------------------------------
// main
//----------------------------------------------------------


document.addEventListener('DOMContentLoaded', function () {
  init_menu()

  var count = bg.arr_session.length;
  var count2 = bg.last_arr_session.length;

  if (count + count2 > 0) {
    reload_tabs()
    return;
  }

  var tips_layout = document.querySelector('.tips-layout');
  show_div(tips_layout, 'block')

  var cfg_num = 3;
  count_down(function (sec) {
    if (sec <= 0) {
      reload_tabs()
      return;
    }

    var tips = document.querySelector('.tips-text');
    var str = tips.getAttribute('FormatText')
    tips.textContent = str.replace(/%s/, () => sec)

    print(sec)
  }, cfg_num)
})
