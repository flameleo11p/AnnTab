
var print = console.log;

function get_origin(url) {
	if (!url) {
		return ["origin", "noname", "http://host"]
	}
	var url = new URL(url)
	var origin = url.origin;
	var origin_short = origin.replace(/https?:\/\//i, "")
	return [origin, origin_short]
}

// 9 about loading tab
// 	get origin from pendingurl
// 	const url = new URL("blob:https://mozilla.org:443/")
// 	console.log(url.origin); // Logs 'https://mozilla.org'

var url = "blob:https://MOZILLA.org:443/"
// var url = ''

print(get_origin(url))
var [origin, origin_short]  = get_origin(url);

print(origin.replace(/https?:\/\//i, ""))
print(origin, origin_short)