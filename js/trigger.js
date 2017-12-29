var screen, slider, website, wedding;

function initDOM() {
    screen = new Screen(
        $(document).width(),
        $(window).height()
    )
    
    slider = new Slider($("#le-jour-j article").length, 0, 0, screen);
    
    website = new Website($("section").length, 1, screen);
    
    wedding = new Wedding(true, "", [], "", "");
    
    // Hide the left arrow
    $('#move-left').css({opacity: 0});
    
    // Change the size of the section depending on the screen size
    if(screen.width >= 800) {
       // $("section").css({height: screen.height});
    }
    $("#le-jour-j article, #reponse article").css({width: screen.width});
    var menuWidth = 90;
    if(screen.width >= 800) {
        $(".wrapper-content").css({width: screen.width - menuWidth});
    } else {
         $(".wrapper-content").css({width: screen.width});
    }
}

function addScrollEvent(website, slider) {
   // console.log("adding scroll event");
    $(window).scroll(function() {
        clearTimeout($.data(this, 'scrollTimer'));
        $.data(this, 'scrollTimer', setTimeout(function() {
            determineCurrentSection(website, slider);
            //replaceScroll(website);
        }, 250));
    });
}

function removeScrollEvent() {
    console.log("removing scroll event");
    $(window).off("scroll");
}

function initTrigger() {
    
    $('nav a').click(function() {
        $("html, body").stop().animate({scrollTop: $($(this).attr("href")).offset().top}, 400, "swing", function() {
            determineCurrentSection(website, slider);
        });
    });
    
    $('body').on("click", "#log", () => logUser($('#username').val(), $('#password').val()));
        
    $('body').on("click", ".bubble", function() {
        moveSlider(slider, $(this).index());
    });
    
    $('body').on("swipeleft", "#le-jour-j", function() {
        moveSliderKeyboard(slider, "-");
    });
    $('body').on("swiperight", "#le-jour-j", function() {
        moveSliderKeyboard(slider, "+");
    });
    
    $(document).keydown(function(e) {
        switch(e.which) {
            case 37: // left
                if(slider.isEnabled) {
                    moveSliderKeyboard(slider, "+");
                }
            break;
            
            case 38: // up
                moveWebsite(website, slider, "up")
            break;

            case 39: // right
                if(slider.isEnabled) {
                    moveSliderKeyboard(slider, "-");
                }
            break;

            case 40: // down
                moveWebsite(website, slider, "down");
            break;

            default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });
        
       
    // Listener on the scroll event  
    addScrollEvent(website, slider);
    
    // Trigger on form buttons to validate the different part of the form
    $("body").on("click", "#firstPart button.next", () => validateFirstPart(wedding, $("input[name='yesOrNo']:checked").val(), $("input[name='email']").val()));
    $("body").on("click", "#secondPart button.next", () => validateSecondPart(wedding));
    $("body").on("click", ".previous", () => $("div.slider-form").animate({left: "+=" + slider.screen.width}, 400));
    $("body").on("click", "button[name='send']", () => validateLastPart(wedding));
    $("body").on("click", "button[name='addName']", () => addName(wedding, $("input[name='lastname']").val(), $("input[name='firstname']").val()));
    $(".tableName").on("click", "span.delete", (event) => removeName(wedding, $(event.target).parent().find("span.name").html()));
}

$(document).ready(function() {

    // Init the initDOM
    initDOM();
    // Init the trigger
    initTrigger();
    
    // Determine the current section to activate or not the keyboard for the slider
    determineCurrentSection(website, slider);
    enableSlider(website, slider);
    
});

