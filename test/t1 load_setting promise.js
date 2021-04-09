
function load_url(url) {
  return new Promise((resolve, reject)=>{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      // var str = xhr.response;
      var res = "";
      if (xhr.readyState ==4) {
        res = xhr.response;
      }
      resolve(res);
    }

    xhr.open("GET", url);
    xhr.send()    
  })
}

function load_setting(callback) {
  var queue = [
    load_url(chrome.extension.getURL("/setting.json.default")),
    load_url(chrome.extension.getURL("/setting.json"))
  ]

  Promise.resolve(Promise.all(queue)
  .then(function (res) {
    callback(res)
  })
  .catch(function (err) {
    console.error("[error] enum_tabs failed !", err);
  });
}