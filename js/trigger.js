function toggleMenu() {
    $("nav").toggleClass("responsive");
}

function reloadMenuText() {
    $(".menu-selected-mobile").text($("a.selected").text());
}

function addScrollEvent(website, slider) {
    $(window).scroll(function() {
        clearTimeout($.data(this, 'scrollTimer'));
        $.data(this, 'scrollTimer', setTimeout(function() {
            determineCurrentSection(website, slider);
            //replaceScroll(website);
        }, 250));
    });
}

function removeScrollEvent() {
    $(window).off("scroll");
}

function initTrigger(screen, slider, website, answerForm) {

    $('nav a:not(.icon)').click(function() {
        var idPage = $(this).attr("href").substr(1);
        var index = website.pages.findIndex((n) => (n.id === idPage)? true : false);
        website.render(index, () => {
            $("html, body").stop().animate({scrollTop: $($(this).attr("href")).offset().top}, 400, "swing", function() {
                determineCurrentSection(website, slider);
                reloadArticleSize();
            });
            
        });
    });
    
    $('body').on("click", "#log", () => answerForm.logUser(website, $('#username').val(), $('#password').val()));
        
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
    $("body").on("click", "#firstPart button.next", () => answerForm.validateFirstPart(website.guest, $("input[name='yesOrNo']:checked").val(), $("input[name='email']").val()));
    $("body").on("click", "#secondPart button.next", () => answerForm.validateSecondPart(website.guest));
    $("body").on("click", ".previous", () => $("div.slider-form").animate({left: "+=" + slider.screen.width}, 400));
    $("body").on("click", "button[name='send']", () => answerForm.validateLastPart(website.guest, $("textarea[name='allergies']").val(), $("textarea[name='comments']").val()));
    $("body").on("click", "button[name='addName']", () => answerForm.addName(website.guest, $("input[name='lastname']").val(), $("input[name='firstname']").val()));
    $("body").on("click", ".tableName span.delete", (event) => answerForm.removeName(website.guest, $(event.target).parent().find("span.name").html()));
}

$(document).ready(function() {

    var screen, slider, website, wedding, nodeJsClient, guest, answerForm;

    nodeJsClient = new NodeJsClient();
    guest = {};
    
    
    var pages = [new Page("profile", "pages/profile.html"),
                 new Page("le-jour-j", "pages/le-jour-j.html", "", "pages/js/le-jour-j.js"),
                 new Page("reponse", "pages/reponse.html", "", "pages/js/reponse.js"),
                 new Page("hebergement", "pages/hebergement.html"),
                 new Page("photo", "pages/photo.html"),
                 new Page("sjc", "pages/sjc.html"),
                 new Page("contact", "pages/contact.html")];

    screen = new Screen(
        $(document).width(),
        $(window).height()
    )

    slider = new Slider(7, 0, 0, screen);    
    
    website = new Website(pages.length, 1, 0, screen, pages, guest);
    
    answerForm = new AnswerForm(nodeJsClient, slider);

    // Init the trigger
    initTrigger(screen, slider, website, answerForm);
    
    // Determine the current section to activate or not the keyboard for the slider
    
    //enableSlider(website, slider);
    
    website.renderFirst("body div:first", () => determineCurrentSection(website, slider));

});

