String.prototype.easyhash = function() {
    var hash = 0;
    if (this.length == 0) {
        for (var i = 0; i < this.length; i++) {
            var char = this.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
    return hash;
}


var str = "https://www.google.co.jp/search?newwindow=1&safe=strict&sxsrf=ALeKk01xTPOutzqIkj4zIaeIDC48fIKVQw%3A1610165258097&ei=Ciz5X6bBBYiK0gS0yquQCg&q=js+web+browser+easy+for+hash+string&oq=js+web+browser+easy+for+hash+string&gs_lcp=CgZwc3ktYWIQAzIHCCEQChCgATIHCCEQChCgATIFCCEQqwIyBQghEKsCOgQIABBHOgQIIxAnOgUIABCRAjoNCAAQsQMQgwEQFBCHAjoECAAQQzoOCC4QsQMQgwEQxwEQrwE6BwgAEBQQhwI6CAguEMcBEKMCOgoILhDHARCvARBDOgIIADoGCAAQFhAeOggIABAWEAoQHjoICCEQFhAdEB46BQghEKABUKOdAViF9gFgxvcBaAFwAngAgAGWAYgBrRuSAQQyLjMwmAEAoAEBqgEHZ3dzLXdpesgBCMABAQ&sclient=psy-ab&ved=0ahUKEwim7vOB_Y3uAhUIhZQKHTTlCqIQ4dUDCA0&uact=5"
var print = console.log;

print(str.easyhash())
