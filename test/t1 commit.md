
1 add cache for filt duplicate

bg.js

mv config defination
+func
	easyhash
	get_tab_key by easyhash title & url
		for check tab duplicate

change std_tab add id	
	for cache push id duplicate need remove


---------

2 result page add reload tips , tab url img with ctrl key


popup.html
	add tips for refresh null results
	fix link icon
	change menu a to div menu btn

popup.js
	add tips count down reload_tabs
+func 
	init_menu to link btn onclick
		reload_tabs init hide tips 

	show_div
		change display style & comments all property

	createPage change page html 
		using <div> btn instead of image & url link <a>
		add url onclick for trigger link url
		(with ctrl hotkey)

t1 create_user_tips.js
	test add user tips 
	and timer update text



---------

3 change menu & page html/css
popup.html	
	change menu a to div menu btn

css\tabs.css
	add tips css
	add div-a 

---------


4 change menu

css\menu.css
	add .menu-btn
	change menu toggler size

css\style.css
	change color scheme
	header button size


5 delete permission about content.js inject <all_urls>

manifest.json
remove 'content.js'

content_scripts config

	"content_scripts": [
		{
			"matches": [
				"<all_urls>"
			],
			"js": [
				"content.js"
			]
		}
	],



6

README.md
add comments for remove google analytics injection
