//=include ../../node_modules/slick-carousel/slick/slick.js

//=include partials/fatNav.js
//=include partials/jquery.easing.1.3.js
//=include partials/jquery.hoverflow.js
//=include partials/face.js
//=include partials/slider.js
//=include partials/behance.js

(function () {
    $.fatNav();
}());

// add yellow bg to section once project has been loaded
$(".projects").on('click', 'li', function() {
    $('#behanceProjects').addClass('has-yellow-bg');
    // scroll to top
    $("html, body").delay('250').animate({ scrollTop: 0 }, 2000);
    });