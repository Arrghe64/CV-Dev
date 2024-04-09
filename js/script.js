$(function(){
  // Gestion du clic sur les liens de la navbar, du footer
  $(".navbar a, footer a").on("click", function (event) {
    event.preventDefault();
    var hash = this.hash;

    // Animation du scroll vers la section correspondante
    $("body,html").animate(
      { scrollTop: $(hash).offset().top },
      900,
      function () {
        window.location.hash = hash;
      }
    );
  });

  // Gestion du clic sur les boutons avec la classe .button2
  $(".button2, .button1").on("click", function (event) {
    event.preventDefault();
    var target = $(this).attr("href");

    // Animation du scroll vers la section correspondante
    $("html, body").animate({ scrollTop: $(target).offset().top }, "slow");
  });
})
    