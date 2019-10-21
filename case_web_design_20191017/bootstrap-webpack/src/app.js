import 'bootstrap';
import './scss/app.scss';
import $ from 'jquery'


$(".app1").click(function() {
    $("html,body").animate(
      { scrollTop: $(".section3").offset().top  -30},
      1200
    );
  });
  $(".app2").click(function() {
    $("html,body").animate(
      { scrollTop: $(".section4").offset().top  -30},
      1200
    );
  });

