$(document).ready(function () {

    // Function to fade in image sprites
    $('.sprite').fadeSprite();

    // Function to animate when leaving page
    $('#face a').leavePage();

    //Show the page once images are loaded	
    $('#face').animateHome();
    $('#face').resizeFace();
});

/* 
 * Function to fade in image sprites on hover
 */
$.fn.fadeSprite = function () {

    this.mouseenter(function (e) {

        $(this).find('a').hoverFlow(e.type, {
            opacity: 1
        }, 300);

    }).mouseleave(function (e) {

        $(this).find('a').hoverFlow(e.type, {
            opacity: 0
        }, 300);

    });
};

/* 
 * Function to animate leaving a page
 */
$.fn.leavePage = function () {

    this.click(function (event) {

        event.preventDefault();
        linkLocation = this.href;

        $('#header').animate({
            'opacity': '0',
            'top': '-92px'
        }, 500, 'easeOutExpo');
        $('body').fadeOut(500, function () {
            window.location = linkLocation;
        });
    });
};

/* 
 * Function to animate content details
 */
function animateContent() {

    // show the rest of the content		
    $('#content-detail').css({
        'opacity': '0',
        'top': '50px'
    }).stop().animate({
        'opacity': '1',
        'top': '0px'
    }, 500, 'easeOutExpo');
    $('#footer').css({
        'opacity': '0',
        'top': '50px'
    }).stop().animate({
        'opacity': '1',
        'top': '0px'
    }, 500, 'easeOutExpo');
};

/* 
 * Function to switch face on browser resize
 */
$.fn.resizeFace = function () {

    $(window).resize(function () {

        // Show large face
        if ($(window).width() >= 1140) {

            $('#designer-img').css({
                'opacity': '1'
            });
            $('#coder-img').css({
                'opacity': '1'
            });
            $('#designer-bg').css({
                'opacity': '1'
            });
            $('#coder-bg').css({
                'opacity': '1'
            });
            $('#designer').css({
                'opacity': '1'
            });
            $('#coder').css({
                'opacity': '1'
            });

        } else { // Show smaller face image

            $('#face-img').css({
                'opacity': '1'
            });
            $('#designer').css({
                'opacity': '1'
            });
            $('#coder').css({
                'opacity': '1'
            });
        }

    });
};

/* 
 * Function to animate home page
 */
$.fn.animateHome = function () {

    // only animate for large desktop browsers
    if ($(window).width() >= 1140) {

        $('#content').animate({
            'opacity': '1'
        }, 500, 'easeOutExpo');
        $('#designer-img').css({
            'left': '-500px'
        }).stop().animate({
            'opacity': '1',
            'left': '100px'
        }, 1000, 'easeOutExpo');
        $('#coder-img').css({
            'right': '-500px'
        }).stop().animate({
            'opacity': '1',
            'right': '100px'
        }, 1000, 'easeOutExpo');
        $('#designer-bg').css({
            'left': '-500px'
        }).stop().animate({
            'opacity': '1',
            'left': '100px'
        }, 1500, 'easeOutBack');
        $('#coder-bg').css({
            'right': '-500px'
        }).stop().animate({
            'opacity': '1',
            'right': '100px'
        }, 1500, 'easeOutBack');
        $('#designer').delay(1500).animate({
            'opacity': '1'
        }, 500, 'easeOutExpo');
        $('#coder').delay(1500).animate({
            'opacity': '1'
        }, 500, 'easeOutExpo', function () {
            animateFace();
        });

    } else {

        $('#content').animate({
            'opacity': '1'
        }, 500, 'easeOutExpo');
        $('#face-img').animate({
            'opacity': '1'
        }, 2000, 'easeOutExpo');
        $('#designer').delay(1000).animate({
            'opacity': '1'
        }, 500, 'easeOutExpo');
        $('#coder').delay(1000).animate({
            'opacity': '1'
        }, 500, 'easeOutExpo', function () {
            animateContent();
        });

    }
};

/* 
 * Function to animate face
 */
function animateFace() {

    var designerImg = $('#designer-img');
    var coderImg = $('#coder-img');
    var designerHover = $('#designer');
    var coderHover = $('#coder');
    var designerDesc = $('#designer-desc');
    var coderDesc = $('#coder-desc');
    var designerArrow = $('#designer-arrow');
    var coderArrow = $('#coder-arrow');
    var designerBg = $('#designer-bg');
    var coderBg = $('#coder-bg');
    var face = $('#face');
    var section = $('#section');
    var duration = 500;

    var mouseX = 0;
    var relMouseX = 520;
    var xp = 520;
    var frameRate = 30;
    var timeInterval = Math.round(1000 / frameRate);
    var loop = loop;

    // Firstly animate the bottom content onto the page
    animateContent();

    section.mouseenter(function (e) {

        // Get mouse position
        section.mousemove(function (e) {

            // raw mouse position
            mouseX = e.pageX;

            // mouse position relative to face div
            relMouseX = mouseX - face.offset().left;

        });

        // Animate the face based on mouse movement
        loop = setInterval(function () {

            // zeno's paradox dampens the movement
            xp += (relMouseX - xp) / 12;

            designerImg.css({
                width: 420 + (520 - xp) * 0.5,
                left: 100 + (520 - xp) * 0.1
            });
            coderImg.css({
                width: 420 + (xp - 520) * 0.5,
                right: 100 - (520 - xp) * 0.1
            });

            designerBg.css({
                left: 100 + (520 - xp) * 0.05,
                opacity: ((1040 - xp) / 520)
            });
            coderBg.css({
                right: 100 + (xp - 520) * 0.05,
                opacity: (xp / 520)
            });

            designerDesc.css({
                opacity: ((1040 - xp) / 520)
            });
            coderDesc.css({
                opacity: (xp / 520)
            });

        }, timeInterval);

    }).mouseleave(function (e) {

        // reset the face to initial state
        clearInterval(loop);
        xp = 520;
        mouseX = 0;
        relMouseX = 520;

        designerImg.hoverFlow(e.type, {
            width: 420,
            left: 100
        }, duration, 'easeOutQuad');
        coderImg.hoverFlow(e.type, {
            width: 420,
            right: 100
        }, duration, 'easeOutQuad');
        coderDesc.hoverFlow(e.type, {
            opacity: 1
        }, duration, 'easeOutQuad');
        designerDesc.hoverFlow(e.type, {
            opacity: 1
        }, duration, 'easeOutQuad');
        coderBg.hoverFlow(e.type, {
            right: 100,
            opacity: 1
        }, duration, 'easeOutQuad');
        designerBg.hoverFlow(e.type, {
            left: 100,
            opacity: 1
        }, duration, 'easeOutQuad');

    });
};