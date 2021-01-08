createTabs(bg.last_arr_tabs)
createTabs(bg.arr_tabs)


function createTabs(arr_tabs) {
  var history = document.querySelector('.history');
  var len = arr_tabs.length;

  arr_tabs.map((i_tabs, i, arr) => {
    // invert i to x
    var x = len - 1 - i;
    var tabs = arr[x];
    if (tabs["hidden"]) {
      return
    }

    // "Created 1/2/2021, 6:08:00 PM");
    var theTime = new Date(tabs.createTime)
    var createTimeText = "Created " + (strftime('%d/%m/%Y %H:%M:%S', theTime));

    function inline_hide_tabs_layout() {
      // mapping arr_tabs[x]
      tabs["hidden"] = true;
      hide_div(tabs_layout)
    }

    var tabs_layout = document.createElement('div');
    tabs_layout.classList.add('tabs-layout')

    var title_layout = document.createElement('div');
    title_layout.classList.add('title-layout')

    var title_box1 = document.createElement('div');
    title_box1.classList.add('title-layout-box1')
    var infoText = document.createTextNode(get_tabs_intro_text(tabs));
    title_box1.appendChild(infoText);

    var title_box2 = document.createElement('div');
    title_box2.classList.add('title-layout-box2')

    var title_time = document.createElement('div');
    title_time.classList.add('title-layout-box2-time')
    // var dateText = document.createTextNode("Created 1/2/2021, 6:08:00 PM");
    // title_time.appendChild(dateText);
    var dateText = document.createTextNode(createTimeText);
    title_time.appendChild(dateText);



    var title_btn1 = document.createElement('div');
    title_btn1.classList.add('title-layout-box2-action')
    title_btn1.classList.add('inline-btn')
    var text = document.createTextNode('Restore all');
    title_btn1.appendChild(text);
    title_btn1.onclick = function () {
      chrome.runtime.sendMessage({ type: 'open_tabs', index: x }, function (res) {
        inline_hide_tabs_layout()
      });
    }

    var title_btn2 = document.createElement('div');
    title_btn2.classList.add('title-layout-box2-action')
    title_btn2.classList.add('inline-btn')
    var text = document.createTextNode('Delete all');
    title_btn2.appendChild(text);
    title_btn2.onclick = function () {
      inline_hide_tabs_layout()
    }

    title_box2.appendChild(title_time);
    title_box2.appendChild(title_btn1);
    title_box2.appendChild(title_btn2);
    title_layout.appendChild(title_box1);
    title_layout.appendChild(title_box2);
    tabs_layout.appendChild(title_layout);

    tabs.map(function (tab) {
      var page_layout = createPage(tab)
      tabs_layout.appendChild(page_layout);
    });

    history.appendChild(tabs_layout);
  });

  print("[info] arr_tabs", arr_tabs)
}
