'use strict';
//----------------------------------------------------------
// header
//----------------------------------------------------------

const fs = require('fs');
const http = require('http');
var path = require('path');
const crypto = require('crypto')


var print = console.log;

//----------------------------------------------------------
// config
//----------------------------------------------------------

var app_folder = path.dirname(require.main.filename);
var log_folder = path.join(app_folder, 'log');
var port = 41069

const gg_cache = {};

//----------------------------------------------------------
// func
//----------------------------------------------------------

function get_url_hash(url, method = 'sha1') {
  return crypto.createHash(method).update(url).digest('hex');
}

function use_local_datetime() {
  function pad(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  }
  Date.prototype.toISOString = function() {
    return this.getFullYear() +
      '-' + pad(this.getMonth() + 1) +
      '-' + pad(this.getDate()) +
      'T' + pad(this.getHours()) +
      ':' + pad(this.getMinutes()) +
      ':' + pad(this.getSeconds()) +
      '.' + (this.getMilliseconds() / 1000).toFixed(3).slice(2, 5) +
      'Z';
  };
}
function get_time_id() {
  var t = new Date().toISOString();
  return t.replace(/[^\d]/g, '');
}

function save(filename, text, tag) {
	var start = Date.now();

	fs.writeFile(filename, text, (err) => {
		print("[+] " + tag);
    if (err) {
    	print("[error]" + filename+" save failed", err);
    	return 
    }
    var delay = Date.now() - start;
    print(`↳ using ${delay}ms `)
	});
}

//----------------------------------------------------------
// main
//----------------------------------------------------------

function get_origin(url) {
  if (!url) {
    return ["origin", "host", "hostname"]
  }
  var url = new URL(url)
  return [url.origin, url.host, url.hostname]
}

function onRecvJsonData(str, tabs) {
  var arr = [];
  var text, url, hashHex
  print("[info] recv tabs len: " + tabs.length);

  tabs.map(function (tab) {
  	if (tab.status == "loading") {
  		tab.url = tab.url || tab.pendingUrl;
  		var [origin, origin_short] = get_origin(tab.url);
  		tab.title = tab.title || origin_short;
  	}


    url = tab.url
    hashHex = get_url_hash(url)
    gg_cache[hashHex] = (gg_cache[hashHex] || 0 ) + 1
    
    if (gg_cache[hashHex] <= 1) {
    	arr.push(tab.title)
    	arr.push(tab.url)
    	arr.push("")
    }
  })

  if (arr.length > 0) {
    var id = get_time_id()

    var filename = id + ".json"
    var filepath = path.join(log_folder, filename);
    save(filepath, str, filename)

    text = arr.join("\n");
    var filename = id + ".md"
    var filepath = path.join(log_folder, filename);
  	save(filepath, text, filename)
  }
}
//----------------------------------------------------------
// rem
//----------------------------------------------------------
function createServer() {

  http.createServer((req, res) => {
    var str = "";
    var data = null;

    req.on('data', chunk => {
      str += chunk;
    })
    req.on('end', () => {
      try {
        data = JSON.parse(str);
      } catch(e) {
        res.end("invalid json")
        print("[erro] invalid json str (JSON.parse):", str)
      }

      // print(111, str, data)
      if (str && data) {
        // print(222, str, data)
        onRecvJsonData(str, data)
      }
      res.end("ok")
    })

    res.statusCode = 200;
  }).listen(port);
}

function show_header() {

  print("")
  print("")
  print("-------------------------")
  print("-- start", get_time_id())
  print("-------------------------")
  print("")
  print("")
  print("[info] log save to " + log_folder);
  print("[info] listen port: " + port);

}

function init() {
  use_local_datetime()
  createServer()
  show_header()
}


init()




