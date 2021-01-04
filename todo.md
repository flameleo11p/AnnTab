
------------------
2021-01-05 Tuesday
------------------

1 add cache for filter duplicate collect before
  a) chrome bg.js 
  b)backend nodejs server.js

temporarily using plan b
    server.js
    const gg_cache = {};
    get_url_hash

test ok

------------------
2021-01-04 Monday
------------------

add mem cache

[ok] 1 multiple collection support
  bg.arr_tabs instead bg.tabs

[ok] 2 add tabs seesion html & css
  create div tabs_layout by popup.js

[ok] 3 session header
  info & action to open or remove

[ok] add create time
3.1 fix session create time 1/2/2021, 6:08:00 PM
  js Date time and unix_timestamp
  var unix_timestamp = new Date().getTime() / 1000
  new Date(unix_timestamp * 1000);

* Adjust code structure


------------------
2021-01-03 Sunday
------------------

3 remove tabs
4 save to log folder
5 filter chrome setting etc. default tab




9 about  tab not complete (loading)

  get origin from pendingurl
  const url = new URL("blob:https://mozilla.org:443/")
  console.log(url.origin); // Logs 'https://mozilla.org'

10 about favicon
   localhost
   undefined


------------------
todo:
------------------


2 commit pm2 config
  pm2 ls
  pm2 reload all
  pm2 start
  startup sh

3 combine backend log
  not single session a file
  but combine multi session
  to control file size


4 type ctrl to open without remove session

5 config
  for action Restore all
  whether remove session after open

------------------

btn_save.onclick = function () {
  // todo download a text file
  // var txt = gg_clipboard_text
}

------------------


2 add local save
  local web storage cache

3  js copy all
  ignore text button or action



------------------

1 record google search -
  for user checking tabs info

2 show copied tips
  now trigger selection for tips







6 send json cors to post nodejs

7 timetstamp
  you can read it 
  select it 
  but not copy it

8 using time indicator
  by colorful prograss bar





0 auto show when chrome start up
  trigger popup need load last log
	


3 auto backup before last month
  only keep current month & last month

1 scroll to $.ajax get json data
  from localhost node server
  current log folder: for current month & last month


2 server start build log list
  sory by datetime id

4 frontend add combobox to set log session:
	current : for current month & last month
	the xx month: before last month

5 save cache in chrome ext
  for filter same tab origin same day
  only work for origin url
  www.baidu.com
  google.com



--------------------------


1 scan tab activity
2 get chrome forcus status
3 get or calc tab forcus time

4 indiacator tab read time


--------------------------

1 new multi ssh key
2 commit git for
	flameleo11p
	flameleo11@protonmail.com
	flameleo11p@protonmail.com



1

backup all chrome ext

2
content.js like inject js to current page
can record keys
& load local files by fetch

3 load my js by origin url match
icon gray show this page has no custom script need to inject
yellow is loading
green loaded
red failed


load in bg.js
reload when click



--------------------------
-- todo other
--------------------------

1
t1 strftime
// todo
// create js code simple by %d-%m-%Y %H:%M

2 create language snipets

