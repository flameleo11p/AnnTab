"use strict";
var print = console.log;

const fs = require('fs');


var path = "t1.js"

var oldPath, newPath

oldPath = "t5.js"
newPath = "t5_re_1.js"


console.time('main');
// console.time('t1');
// fs.rename(oldPath, newPath, (...v)=>{
//   // body...
//   console.timeEnd('t1');
//   print(...v)
// })

fs.renameSync(oldPath, newPath)
console.timeEnd('main');

