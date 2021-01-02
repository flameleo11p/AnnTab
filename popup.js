const bg = chrome.extension.getBackgroundPage()
var print = console.log;

/***

< ul >
  <li><a href="#">Home</a></li>
  <li><a href="#">About</a></li>
  <li><a href="#">Services</a></li>
  <li><a href="#">Contact</a></li>


</ul >

***/
print(111, bg)


document.addEventListener('DOMContentLoaded', function () {
  var history = document.querySelector(".history");
  print(222, history)

  function createPage(page, index) {
    var div = document.createElement('div');
    div.classList.add('page')
    // var ul = document.createElement('ul');

    var img = document.createElement('img');
    img.src = `chrome://favicon/${page.origin}`;
    var a = document.createElement('a');
    var linkText = document.createTextNode(page.title);
    a.appendChild(linkText);
    a.href = page.url;
    var input = document.createElement('input');
    input.value = page.url;


    // var li1 = document.createElement('li');
    // var li2 = document.createElement('li');
    // li2.appendChild(img);
    // li2.appendChild(a)
    // var li3 = document.createElement('li');
    // li3.appendChild(input)

    div.appendChild(img);
    div.appendChild(a);
    div.appendChild(input);
    print(333, div)
    history.appendChild(div);
  }
  bg.arr_page.forEach(createPage);

})

/*

<div class="page">
  <img src="chrome://favicon/https://www.google.co.jp">
  <a class="clickable"
    href="https://www.google.co.jp/search?newwindow=1&amp;ei=VSReX5ytGMHEmAW0urjYDw&amp;q=translate&amp;oq=translate&amp;gs_lcp=CgZwc3ktYWIQAzILCAAQsQMQgwEQkQIyAggAMgIIADICCAAyAggAMgIIADICCAAyBQgAELEDMgIIADICCAA6BQgAEJECOggIABCxAxCDAToHCAAQsQMQQzoKCAAQsQMQgwEQQzoECAAQQ1CpixxY3pYcYJ-ZHGgAcAF4AIABnQSIAe8SkgELMC40LjIuMi4wLjGYAQCgAQGqAQdnd3Mtd2l6wAEB&amp;sclient=psy-ab&amp;ved=0ahUKEwjcq6Dvo-brAhVBIqYKHTQdDvsQ4dUDCA0&amp;uact=5">translate
    - Google Search&nbsp;</a>
  <span style="visibility: hidden;">https://www.google.co.jp/search?newwindow=1&ei=VSReX5ytGMHEmAW0urjYDw&q=translate&oq=translate&gs_lcp=CgZwc3ktYWIQAzILCAAQsQMQgwEQkQIyAggAMgIIADICCAAyAggAMgIIADICCAAyBQgAELEDMgIIADICCAA6BQgAEJECOggIABCxAxCDAToHCAAQsQMQQzoKCAAQsQMQgwEQQzoECAAQQ1CpixxY3pYcYJ-ZHGgAcAF4AIABnQSIAe8SkgELMC40LjIuMi4wLjGYAQCgAQGqAQdnd3Mtd2l6wAEB&sclient=psy-ab&ved=0ahUKEwjcq6Dvo-brAhVBIqYKHTQdDvsQ4dUDCA0&uact=5</span>
  <img src="images/cross.png">
  <input id="input-url"
    value="https://www.google.co.jp/search?newwindow=1&ei=VSReX5ytGMHEmAW0urjYDw&q=translate&oq=translate&gs_lcp=CgZwc3ktYWIQAzILCAAQsQMQgwEQkQIyAggAMgIIADICCAAyAggAMgIIADICCAAyBQgAELEDMgIIADICCAA6BQgAEJECOggIABCxAxCDAToHCAAQsQMQQzoKCAAQsQMQgwEQQzoECAAQQ1CpixxY3pYcYJ-ZHGgAcAF4AIABnQSIAe8SkgELMC40LjIuMi4wLjGYAQCgAQGqAQdnd3Mtd2l6wAEB&sclient=psy-ab&ved=0ahUKEwjcq6Dvo-brAhVBIqYKHTQdDvsQ4dUDCA0&uact=5">
</div>

*/
