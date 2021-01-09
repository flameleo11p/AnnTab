
function create_user_tips() {
  var history = document.querySelector('.history');

  var tabs_layout = document.createElement('div');
  tabs_layout.classList.add('tabs-layout')

  var tips = document.createElement('div');
  tips.classList.add('tips')
  var text = "Refresh in 5 seconds. click here or type F5 refresh now."
  var tipsText = document.createTextNode(text);
  tips.appendChild(tipsText);


  tabs_layout.appendChild(tips);
  history.appendChild(tabs_layout);
}


