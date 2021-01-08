



function localstorage_save_array(missionKey, arr, count) {
	// save last 10
	var len = arr.length;
	var key = "", 
	      x = 0, 
	    opt = {};

	for (var i = 1; i <= count; i++) {
		x = len - 1 - i;
		key = `${missionKey}[${x}]`
		opt[key] = arr[x]

	  chrome.storage.local.set(opt, function() {
	    print("[info] save arr_session: ", key, x, arr[x]);
	  }); 
	}
}


function localstorage_array_set(missionKey, index, data, callback) {
	var key = "", 
	    opt = {};
	key = `${missionKey}[${index}]`
	opt[key] = data

  chrome.storage.local.set(opt, function(...args) {
  	if (callback) {
  		callback(...args)
  	}
  }); 
}


function localstorage_load_array(missionKey, count, callback) {
	var keys = []
	for (var i = 0; i < count; i++) {
		key = `${missionKey}[${i}]`
		keys.push(key)
	}

	var arr = [];
	chrome.storage.local.get(keys, function(res) {
		arr = keys.map((k)=>(res[k])).filter((v)=>(!!v))
		callback(arr);
  	if (callback) {
  		callback(arr);
  	}		
	});
}




function localstorage_array_set(missionKey, index, data, callback) {
  var key = "", 
      opt = {};
  key = `${missionKey}[${index}]`
  opt[key] = data

  chrome.storage.local.set(opt, function(...args) {
    if (callback) {
      callback(...args)
    }
  }); 
}

function localstorage_load_array(missionKey, count, callback) {
  var keys = []
  for (var i = 0; i < count; i++) {
    key = `${missionKey}[${i}]`
    keys.push(key)
  }

  var arr = [];
  chrome.storage.local.get(keys, function(res) {
    arr = keys.map((k)=>(res[k])).filter((v)=>(!!v))
    if (callback) {
      callback(arr);
    }   
  });
}

localstorage_load_array('arr_session', 10, (arr)=>{
  print(999, "localstorage_load_array", arr)
})
