var print = console.log;

function count_down(fn, sec) {
	fn(sec)
  var tm = setInterval(function(){
    sec--;
    fn(sec)
    if (sec <= 0) {
      clearInterval(tm);
    }
  }, 1000);
}    


count_down(function (sec) {
	print(22, sec)
}, 5)