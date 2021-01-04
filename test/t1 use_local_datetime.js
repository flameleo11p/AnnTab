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
  print(111, t)
  return t.replace(/[^\d]/g, '');
}

use_local_datetime()
var print = console.log;

print(get_time_id())

var t = new Date()
print(t.getUTCHours())