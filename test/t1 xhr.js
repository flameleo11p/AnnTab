var print = console.log;


function load_setting() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState !=4) {
      print(xhr.statusText, xhr)
      return 
    }
    var data = xhr.response;
    var data2 = xhr.responseText;

    print(111, data)
    print(222, typeof data)
  }
  xhr.open("GET", chrome.extension.getURL("/setting.json"), true);
  xhr.send()
}

load_setting()
