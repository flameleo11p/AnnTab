

const bg = chrome.extension.getBackgroundPage()
var print = console.log;
var gg_clipboard_text = "";

//----------------------------------------------------------
// func
//----------------------------------------------------------
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
  setTimeout(()=>{
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
  // var txt = gg_clipboard_text

}

document.addEventListener('DOMContentLoaded', function () {
  var history = document.querySelector('.history');
  bg.tabs.map(function (tab) {
    var div = createPage(tab)
    history.appendChild(div);
  });

  print("[info] tabs", bg.tabs)
})




chrome.runtime.sendMessage({type: 'GET_HISTORY'}, function(res){
  print(111, 'GET_HISTORY recv res', res)
});  




/*

<div class="page">
  <img src="chrome://favicon/https://www.google.co.jp">
  <a class="clickable"
    href="https://www.google.co.jp/search?newwindow=1&amp;ei=VSReX5ytGMHEmAW0urjYDw&amp;q=translate&amp;oq=translate&amp;gs_lcp=CgZwc3ktYWIQAzILCAAQsQMQgwEQkQIyAggAMgIIADICCAAyAggAMgIIADICCAAyBQgAELEDMgIIADICCAA6BQgAEJECOggIABCxAxCDAToHCAAQsQMQQzoKCAAQsQMQgwEQQzoECAAQQ1CpixxY3pYcYJ-ZHGgAcAF4AIABnQSIAe8SkgELMC40LjIuMi4wLjGYAQCgAQGqAQdnd3Mtd2l6wAEB&amp;sclient=psy-ab&amp;ved=0ahUKEwjcq6Dvo-brAhVBIqYKHTQdDvsQ4dUDCA0&amp;uact=5">translate
    - Google Search&nbsp;</a>
  <span style="visibility: hidden;">https://www.google.co.jp/search?newwindow=1&ei=VSReX5ytGMHEmAW0urjYDw&q=translate&oq=translate&gs_lcp=CgZwc3ktYWIQAzILCAAQsQMQgwEQkQIyAggAMgIIADICCAAyAggAMgIIADICCAAyBQgAELEDMgIIADICCAA6BQgAEJECOggIABCxAxCDAToHCAAQsQMQQzoKCAAQsQMQgwEQQzoECAAQQ1CpixxY3pYcYJ-ZHGgAcAF4AIABnQSIAe8SkgELMC40LjIuMi4wLjGYAQCgAQGqAQdnd3Mtd2l6wAEB&sclient=psy-ab&ved=0ahUKEwjcq6Dvo-brAhVBIqYKHTQdDvsQ4dUDCA0&uact=5</span>
  <img src="images/cross.png">
  <input id="input-url"
    value="https://www.google.co.jp/search?newwindow=1&ei=VSReX5ytGMHEmAW0urjYDw&q=translate&oq=translate&gs_lcp=CgZwc3ktYWIQAzILCAAQsQMQgwEQkQIyAggAMgIIADICCAAyAggAMgIIADICCAAyBQgAELEDMgIIADICCAA6BQgAEJECOggIABCxAxCDAToHCAAQsQMQQzoKCAAQsQMQgwEQQzoECAAQQ1CpixxY3pYcYJ-ZHGgAcAF4AIABnQSIAe8SkgELMC40LjIuMi4wLjGYAQCgAQGqAQdnd3Mtd2l6wAEB&sclient=psy-ab&ved=0ahUKEwjcq6Dvo-brAhVBIqYKHTQdDvsQ4dUDCA0&uact=5">
</div>

*/
