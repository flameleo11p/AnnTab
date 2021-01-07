"use strict";
var print = console.log;

const fs = require('fs');

// console.log(fs.statSync(__filename));

//       console.time('main');
// fs.stat(__filename, (err, stats) => {
//     print(stats.size);
//       console.timeEnd('main');

// });


function getFilesizeInBytes(filename) {
  var stats = fs.statSync(filename);
  var fileSizeInBytes = stats.size;
  return fileSizeInBytes;
}

var path = __filename;
// var path = "config.json"

      console.time('main');
print(111, getFilesizeInBytes(path))
      console.timeEnd('main');




        console.time('main');
try {
  if (fs.existsSync(path)) {
    //file exists
  }


  //       console.time('main');
  // if (fs.exists(path, (...v)=>{
  //   print(...v)

  // })) {
  //   //file exists
  // }
  //     console.timeEnd('main');
} catch(err) {
  console.error(err)
}


      console.timeEnd('main');