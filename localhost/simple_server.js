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
const txt_maxsize_64K = 64 * 1024;

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

function get_now_text() {
  var t = new Date()
  return strftime('%Y-%m-%d %H:%M:%S', t);
}

// 20210107110808563.md
function get_today_id() {
  var t = new Date()
  // var theTime = new Date(js_unixtime)
  // var createTimeText = "Created " + (strftime('%d/%m/%Y %H:%M:%S', theTime));
  return strftime('%Y%m%d', t);
}

function save(filename, text, tag) {
	var start = Date.now();

	fs.writeFile(filename, text, {'flag':'a'}, (err) => {
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

function getFilesizeInBytes(filename) {
  var stats = fs.statSync(filename);
  var fileSizeInBytes = stats.size;
  return fileSizeInBytes;
}

function is_need_backup(filename) {
  if (fs.existsSync(filename)) {
    var fileSizeInBytes = getFilesizeInBytes(filename)
    if (fileSizeInBytes > txt_maxsize_64K) {
      return true;
    }
  }
  return false;
}

function get_backup_name(filename) {
  var newname = ""
  var max = parseInt('ffffffff', 16);
  for (var i = 1; i <= max; i++) {
    newname = filename + "." +i.toString(16);
    if (!fs.existsSync(newname)) {
      return newname
    }
  }
  return filename + ".tmp";
}

function onRecvJsonData(str, tabs) {
  var arr = [];
  var url, hashHex
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


  if (arr.length == 0) {
    return;
  }

  // insert end with a newline
  arr.push("")
  var text = arr.join("\n");

  var id = get_today_id()
  var filename = id + ".md"
  var filepath = path.join(log_folder, filename);
  var bakpath = ""
  // check size > 64k
  if (is_need_backup(filepath)) {
    bakpath = get_backup_name(filepath)
    fs.renameSync(filepath, bakpath)
  }
  save(filepath, text, filename)
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
  print("--", get_now_text())
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




