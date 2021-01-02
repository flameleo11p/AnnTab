var print = console.log;

$(document).ready(function () {
  $("#hide_h1").hover(function () {
    $(this).css("color", "white")
  }, function () {
    $(this).css("color", "black")
  })

  $("h1#hide_h1").hover(
    function () {
      $(this).append($("<span> ***</span>"));
    }, function () {
      $(this).find("span").last().remove();
    }
  );


  print(111, 222)
})