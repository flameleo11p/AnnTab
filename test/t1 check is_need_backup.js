const fs = require('fs');

const txt_maxsize_64K = 64 * 1024;

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

//----------------------------------------------------------
// rem
//----------------------------------------------------------


var print = console.log;
var path = __filename;

// 2618

// Convert a number to a hexadecimal string with:

// hexString = yourNumber.toString(16);
// And reverse the process with:

// yourNumber = parseInt(hexString, 16);


for (var i = 2; i <= 7; i++) {
  path = "../localhost/log/20210107.md"
  path = `../localhost/log/2021010${i}.md`



  print(i, is_need_backup(path), path)
}


// for (var i = 1; i <= 5000; i++) {
//   print(i, i.toString(16))
// }
var path = "t1.js"

// print(get_backup_name(path))