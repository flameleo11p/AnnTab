var print = console.log;

window.addEventListener('keydown',function(event){
	print(9999, chrome.runtime, chrome.runtime.sendMessage)
	// chrome.runtime.sendMessage({type: 'keydown', event: event}, function(){});  
  print(111, "recv event", String.fromCharCode(event.keyCode))
  print(222, "recv event", event, event.isComposing, event.keyCode)
});

window.addEventListener('keyup',function(event){
	// chrome.runtime.sendMessage({type: 'keyup', data: event}, function(){});   
});



