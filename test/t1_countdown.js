var print = console.log;

function count_down(sec) {
  var tm = setInterval(function(){
    sec--;
    if (sec <= 0) {
      print(sec)
      clearInterval(tm);
    }
  }, 1000);
	// body...
}    


count_down(5)