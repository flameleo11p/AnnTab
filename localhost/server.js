'use strict';

const fs = require('fs');
const http = require('http');
var path = require('path');
var app_folder = path.dirname(require.main.filename);


var print = console.log;
//----------------------------------------------------------
// config
//----------------------------------------------------------


var log_folder = path.join(app_folder, 'log');
var port = 41069


//----------------------------------------------------------
// func
//----------------------------------------------------------

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

function tostring(v) {
  return String(v);
}

function write(...arg) {
  var arr = [];
  for (var i = 0; i < arg.length; i++) {
    var str = tostring(arg[i]);
    arr.push(str);
  }
  var line = arr.join(' \t ');
  return process.stdout.write(line);
}

//----------------------------------------------------------
// main
//----------------------------------------------------------

function get_origin(url) {
	if (!url) {
		return ["origin", "noname"]
	}
	var url = new URL(url)
	var origin = url.origin;
	var origin_short = origin.replace(/https?:\/\//i, "")
	return [origin, origin_short]
}

function onRecvJsonData(data) {
	var id = get_time_id()
	var filename = id + ".json"
  var filepath = path.join(log_folder, filename);
	save(filepath, data, filename)

  var tabs = JSON.parse(data) 
  var arr = [];
  var text

  tabs.map(function (tab) {
  	if (tab.status == "loading") {
  		tab.url = tab.url || tab.pendingUrl;
  		var [origin, origin_short] = get_origin(tab.url);
  		tab.title = tab.title  || origin_short;
  	}
  	// body...
  	arr.push(tab.title)
  	arr.push(tab.url)
  	arr.push("")
  })

  text = arr.join("\n");

  var filename = id + ".md"
  var filepath = path.join(log_folder, filename);
	save(filepath, text, filename)
}

http.createServer((request, response) => {
  let data = '';
  request.on('data', chunk => {
    data += chunk;
  })
  request.on('end', () => {
  	onRecvJsonData(data)
  })
  print("[info] http server start listen: " + port);
}).listen(port);


print("-------------------------")
print("-- start", get_time_id())
print("-------------------------")

print("[info] log save to " + log_folder);






