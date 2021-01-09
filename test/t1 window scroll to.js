    // scroll top & bottom
    window.scrollTo(0, 0);
    window.scrollTo(0, document.body.scrollHeight);



    function scrollToAnchor(aid) {
     var aTag = $("a[name='" + aid + "']");
     $('html,body').animate({scrollTop: aTag.offset().top},'slow');
}

$("#link").click(function() {
     scrollToAnchor('id3');
});


<script type='text/javascript'>
     setTimeout("window.scrollBy(0,270);",6000);
</script>