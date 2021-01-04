
function get_origin(url) {
  if (!url) {
    return ["origin", "noname"]
  }
  var url = new URL(url)
  var origin = url.origin;
  var origin_short = origin.replace(/https?:\/\//i, "")
  return [origin, origin_short]
}

function get_origin(url) {
  if (!url) {
    return ["origin", "host", "hostname"]
  }
  var url = new URL(url)
  return [url.origin, url.host, url.hostname]
}
var url = "http://localhost:41070/xcvxcvzxcv";

var print = console.log;

print(url)

function is_localhost(hostname) {
  return hostname === "" || hostname === "localhost" || hostname === "127.0.0.1";
}

var [origin, host, hostname] = get_origin(url);
print(111, origin, host, hostname)
print(222, is_localhost(hostname) )