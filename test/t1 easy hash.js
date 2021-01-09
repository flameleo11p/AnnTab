function toRadix16int32(x) {
  return ((x >>> 0).toString(16));
}

function easyhash(str) {
  var x = 0;
  if (str.length > 0) {
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        x = ((x<<5)-x)+char;
        x = x & x; // Convert to 32bit integer
    }
  }
  return ("00000000"+(x >>> 0).toString(16)).substr(-8);
}

String.prototype.easyhash = function() {
  var hash = 0;
  if (this.length > 0) {
    for (var i = 0; i < this.length; i++) {
        var char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
  }

  return toRadix16int32(hash);
}

// 5 tabs
// Created 09/01/2021 12:09:50
// 
var title = "js web browser easy for hash string - Google Search"
var url   = "https://www.google.co.jp/search?newwindow=1&safe=strict&sxsrf=ALeKk01xTPOutzqIkj4zIaeIDC48fIKVQw%3A1610165258097&ei=Ciz5X6bBBYiK0gS0yquQCg&q=js+web+browser+easy+for+hash+string&oq=js+web+browser+easy+for+hash+string&gs_lcp=CgZwc3ktYWIQAzIHCCEQChCgATIHCCEQChCgATIFCCEQqwIyBQghEKsCOgQIABBHOgQIIxAnOgUIABCRAjoNCAAQsQMQgwEQFBCHAjoECAAQQzoOCC4QsQMQgwEQxwEQrwE6BwgAEBQQhwI6CAguEMcBEKMCOgoILhDHARCvARBDOgIIADoGCAAQFhAeOggIABAWEAoQHjoICCEQFhAdEB46BQghEKABUKOdAViF9gFgxvcBaAFwAngAgAGWAYgBrRuSAQQyLjMwmAEAoAEBqgEHZ3dzLXdpesgBCMABAQ&sclient=psy-ab&ved=0ahUKEwim7vOB_Y3uAhUIhZQKHTTlCqIQ4dUDCA0&uact=5"

// var title = "Generate a Hash from string in Javascript - Stack Overflow"
// var url   = "https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript"

// sha1 sha256 区别 - Google Search
// https://www.google.co.jp/search?newwindow=1&safe=strict&sxsrf=ALeKk03YF-q9Xsbc5jZKHJie9rzISIFU-Q%3A1610165340964&ei=XCz5X-myOoLm0QS2gpj4AQ&q=sha1+sha256+%E5%8C%BA%E5%88%AB&oq=sha1+sha25&gs_lcp=CgZwc3ktYWIQAxgBMgIIADIFCAAQywEyAggAMgUIABDLATIFCAAQywEyBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeOgQIIxAnOgUIABCRAjoICAAQsQMQgwE6BQgAELEDOgQIABBDOgQILhBDOgoIABCxAxCDARBDOgcIABCxAxBDOgcILhCxAxBDOgoIABCxAxAUEIcCOgcIABAUEIcCOgQIABAKUJANWPgoYJUzaABwAXgAgAGdAYgBpAiSAQMzLjaYAQCgAQGqAQdnd3Mtd2l6wAEB&sclient=psy-ab

// SHA1和SHA256有什么区别-链客区块链技术开发者社区
// https://www.liankexing.com/n/13559

// 加密算法比较：SHA1，SHA256，MD5_极客神殿-CSDN博客
// https://blog.csdn.net/WuLex/article/details/81477097

// 4 tabs
// Created 09/01/2021 12:01:48
// 
// js array includes 效率 时间复杂性_百度搜索
// https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=js%20array%20includes%20%E6%95%88%E7%8E%87%20%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E6%80%A7&fenlei=256&oq=js%2520array%2520inlucde%2520%25E6%2595%2588%25E7%258E%2587%2520%25E6%2597%25B6%25E9%2597%25B4%25E5%25A4%258D%25E6%259D%2582%25E6%2580%25A7&rsv_pq=f8aa867e000a39d8&rsv_t=cd30FS1tASsAQXmFGi1dOai489oe07VRTQljdNPuSC%2FmDs3raiU0ldj%2FWmo&rqlang=cn&rsv_dl=tb&rsv_enter=1&rsv_btype=t&inputT=152&rsv_sug3=34&rsv_sug1=13&rsv_sug7=000&rsv_sug2=0&rsv_sug4=3955&rsv_sug=1

// js数组去重与性能分析（时间复杂度很重要）_weixin_30698527的博客-CSDN博客
// https://blog.csdn.net/weixin_30698527/article/details/96225235

// js数组去重效率——Map,Set是最高的吗_INSONG不二的博客-CSDN博客
// https://blog.csdn.net/weixin_44156518/article/details/88358548?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.control&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.control

// javascript 里的Set.has和Array.includes谁的效率更高？ - 知乎
// https://www.zhihu.com/question/330518732

// 3 tabs
// Created 09/01/2021 11:57:45
// 
// js string array include is o(1) - Google Search
// https://www.google.co.jp/search?newwindow=1&safe=strict&sxsrf=ALeKk018KM7cdoVHlsExSPKZCvBQzNCjvw%3A1610164547688&ei=Qyn5X4u4KZKlmAXC35qgAw&q=js+string+array+include+is+o%281%29&oq=js+string+array+include+is+o%281%29&gs_lcp=CgZwc3ktYWIQAzIFCAAQzQIyBQgAEM0CMgUIABDNAjIFCAAQzQI6BAgAEEc6CAghEBYQHRAeOgYIABAWEB5QjDNY8lFg6VZoAHAGeACAAXqIAZsFkgEDMC42mAEAoAEBqgEHZ3dzLXdpesgBCMABAQ&sclient=psy-ab&ved=0ahUKEwjL5ZOv-o3uAhWSEqYKHcKvBjQQ4dUDCA0&uact=5

// javascript - Remove duplicate values from JS array - Stack Overflow
// https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array

// 如何检查数组是否在JavaScript中包含值？ - 堆栈溢出
// https://stackoverflow.com/questions/237104/how-do-i-check-if-an-array-includes-a-value-in-javascript

// 12 tabs
// Created 09/01/2021 11:52:32
// 
// log | Trello
// https://trello.com/b/Gq30mbhi/log

// log | Trello
// https://trello.com/b/Gq30mbhi/log

// log | Trello
// https://trello.com/b/Gq30mbhi/log

// log | Trello
// https://trello.com/b/Gq30mbhi/log

// log | Trello
// https://trello.com/b/Gq30mbhi/log

// log | Trello
// https://trello.com/b/Gq30mbhi/log

// log | Trello
// https://trello.com/b/Gq30mbhi/log

// log | Trello
// https://trello.com/b/Gq30mbhi/log

// log | Trello
// https://trello.com/b/Gq30mbhi/log

// log | Trello
// https://trello.com/b/Gq30mbhi/log

// log | Trello
// https://trello.com/b/Gq30mbhi/log

var title = "log | Trello"
var url   = "https://trello.com/b/Gq30mbhi/log"

// var title = "log | Trello"
// var url   = "https://trello.com/b/Gq30mbhi/log"

// var title = ""
// var url   = ""


var str = "https://www.google.co.jp/search?newwindow=1&safe=strict&sxsrf=ALeKk01xTPOutzqIkj4zIaeIDC48fIKVQw%3A1610165258097&ei=Ciz5X6bBBYiK0gS0yquQCg&q=js+web+browser+easy+for+hash+string&oq=js+web+browser+easy+for+hash+string&gs_lcp=CgZwc3ktYWIQAzIHCCEQChCgATIHCCEQChCgATIFCCEQqwIyBQghEKsCOgQIABBHOgQIIxAnOgUIABCRAjoNCAAQsQMQgwEQFBCHAjoECAAQQzoOCC4QsQMQgwEQxwEQrwE6BwgAEBQQhwI6CAguEMcBEKMCOgoILhDHARCvARBDOgIIADoGCAAQFhAeOggIABAWEAoQHjoICCEQFhAdEB46BQghEKABUKOdAViF9gFgxvcBaAFwAngAgAGWAYgBrRuSAQQyLjMwmAEAoAEBqgEHZ3dzLXdpesgBCMABAQ&sclient=psy-ab&ved=0ahUKEwim7vOB_Y3uAhUIhZQKHTTlCqIQ4dUDCA0&uact=5"
var print = console.log;

// 7f463186 9836145a
// 4d2102459e21baba
print(easyhash(title) , easyhash(url))
