function reloadArticleSize() {
    var menuWidth = 90;
    if(screen.width >= 800) {
        $(".wrapper-content").css({width: screen.width - menuWidth});
    } else {
         $(".wrapper-content").css({width: screen.width});
    }
}

function enableSlider(website, slider) {
    if(website.pageCurrentSection === 1) {
        slider.isEnabled = true;
    } else {
        slider.isEnabled = false;
    }
}

// direction : "+" for left move, "-" for right move
function moveSliderKeyboard(slider, direction) {
    if(direction === "-") {
        moveSlider(slider, slider.currentIndex + 1);
    } else {
        moveSlider(slider, slider.currentIndex - 1);
    }
}


function moveSlider(slider, index) {
    index = index % slider.count;
    if(index < 0) {
        index = slider.count - 1;
    }
    var newLeft = -index * slider.screen.width;
    slider.currentIndex = index;
        
    $("div.slider").animate({left: newLeft}, 500);
    changeBubbleSelected(slider.currentIndex);
   
    return 1;
}

function moveWebsite(website, slider, direction) {
    if(direction === "up") {
        (website.currentSection > 0) ? website.currentSection -= 1 : null;
    } else {
        (website.currentSection < website.numberSection - 1) ? website.currentSection += 1 : null;
    }
    website.render(website.currentSection, () => {
        enableSlider(website, slider);
        replaceScroll(website, slider);
        reloadArticleSize();
    });
}

function replaceScroll(website, slider) {
    console.log(website.currentSection);
    $("html, body").animate({scrollTop: website.currentSection * website.screen.height}, 400, "swing", function() {
        determineCurrentSection(website, slider);
    });
}

// Determine and set the current Section into the website var
function determineCurrentSection(website, slider) {
    var currentScrollPosition = $('html').scrollTop() || $('body').scrollTop();
    var currentSection = Math.round(currentScrollPosition / website.screen.height);
    // Get the index in the array of pages given the current section
    var currentId = $("section:eq("+currentSection+")").attr("id");
    var pageCurrentSection = website.pages.findIndex((n) => (n.id === currentId)? true : false);
    website.currentSection = currentSection;
    website.pageCurrentSection = pageCurrentSection;
    //console.log(website.currentSection + " - " + website.pageCurrentSection);
    enableSlider(website, slider);
    changeMenuSelected(website);
}

function changeMenuSelected(website, selectedA) {
    $('nav a').removeClass('selected');
    if(typeof selectedA !== "undefined") {
        $(selectedA).addClass('selected');
    } else {
        $('nav a:eq(' + website.pageCurrentSection + ')').addClass('selected');
        reloadMenuText();
    }
}

function changeBubbleSelected(index) {
    $('.slider-nav span').removeClass('bubble-selected');
    $('.slider-nav span:eq(' + index + ')').addClass('bubble-selected');
}