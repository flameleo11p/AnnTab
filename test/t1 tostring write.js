
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
