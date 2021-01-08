
function get_fistr_line(str) {
  str = str.replace(/^\s+/, '');
  var n = str.indexOf("\n");
  return str.substring(0, n);
}

function get_str_head(str, n) {
  return str.substring(0, 100);
}


function parse_json(str) {
  var data;
  try {
    data = JSON.parse(str);
  } catch(e) {
    var desc = get_str_head(str)
    print("[error] JSON.parse:", desc)
    print(e)
  }
  return data;
}


var str = `
{
  "log_exclude": [
    "https://www.youtube.com/",
    "https://www.google.co.jp/search?q=translate",
    "https://www.google.co.jp/",
    "https://www.google.com/",
    "https://wx.qq.com/",
    "chrome-extension://chphlpgkkbolifaimnlloiipkdnihall/onetab.html",
    "chrome://newtab/",
    "chrome://settings/",
    "chrome://version/",
    "chrome://flags/",
    "chrome://extensions/"
  ],
  "close_exclude": [
    "chrome://extensions/"
  ],
  "name": "test config",
  "version": "1.0",
  "desc": 2
}
`;


var print = console.log;

print(parse_json(str))

