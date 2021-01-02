var t = new Date().toISOString();
var print = console.log;

print(t)
print(t.replace(/[^\d]/g, ''))


function get_time_id() {
  var t = new Date().toISOString();
  return t.replace(/[^\d]/g, '');
}


print(11, get_time_id())
// new Date().toISOString().
//   replace(/T/, ' ').      // replace T with a space
//   replace(/\..+/, '')     // delete the dot and everything after
