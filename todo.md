
------------------
2021-01-08 Friday
------------------

0 add popup.html
window.location.reload()

a) if not get history  
  countdown to refresh

b) notify frondend popup.html result 
  to refresh when last sessions loaded
  bg.last_arr_seesion


[ok] 1
fix tab data standard in source bg.js

popup.js 
remove data changer-fix
+
+func create_session
      create_separate_line

bg.js
+func std_tab

  std {
    favIconUrl: tab.favIconUrl,
    title: tab.title,
    url: tab.url
  }

change tabs filter tabs.map().filter((v)=>(!!v))


[ok] 2

add last sessions & separate line ()

bg.js
save last sessions onclick (local storage)

coz Serialization array will lost custorm key 
must change arr_tabs to arr_session

session = {
  tabs: tabs,
  createTime: 8097896768
}

popup.js
fix var tabs using
+func
create_session
create_separate_line

tabs.css
add .line for separate_line


[ok] 3
button open session with ctrl, local data save method, open current & last session

i)
change local data save scene
when include all or window < 5 
ii)
fix bug: open session with bg_key 
to mapping arr_session or last_arr_session
iii)
remove sendMessage open_session
instead of window.open in popup.js button.onclick

[ok] 
save&load last top10 & ignore 0 tabs session

c)
  using save & load keep last top10 session
  last 20 session

d) [deprecated] 
  local storage save array by missionKey
  particle update storage data 
  when push new session
  save every push to subkey
  get and set fix
  check local save
  whether can using subkey


[ok] 4
add popup.js

a) hotkey
result page 
ctrl+click open tabs dont switch tab  
b) change button onclick
window.open
already default using that style ctrl+click to open new tab



[ok] 6 

log filter
close filter

[ok] 7 log json config
    self.log_exclude_url = data.log_exclude;
    self.close_exclude_origin = data.close_exclude;

[ok] 10 
 
a)  [deprecated] 
load menu default checked
by default json

b) load checked default value by local storage


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



2 create language snipets
ok

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


5 
get tabs
by await

8
load defaults setting
user setting to override system defaults    

9 load json await
change function load_setting(callback) 
to await 
xhr.open("GET"
onreadystatechange

11
restucture code 
by with init()



1
t1 strftime
// todo
// create js code simple by %d-%m-%Y %H:%M

2 change icons
  change name


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
