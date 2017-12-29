
function enableSlider(website, slider) {
    if(website.currentSection === 1) {
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
        
    $("div.slider").animate({left: newLeft}, 400);
    changeBubbleSelected(slider.currentIndex);
   
    return 1;
}

function moveWebsite(website, slider, direction) {
    if(direction === "up") {
        (website.currentSection > 0) ? website.currentSection -= 1 : null;
    } else {
        (website.currentSection < website.numberSection - 1) ? website.currentSection += 1 : null;
    }
    enableSlider(website, slider);
    replaceScroll(website, slider);
}

function replaceScroll(website, slider) {
    $("html, body").animate({scrollTop: website.currentSection * website.screen.height}, 400, "swing", function() {
        determineCurrentSection(website, slider);
    });
}

// Determine and set the current Section into the website var
function determineCurrentSection(website, slider) {
    var currentScrollPosition = $('html').scrollTop() || $('body').scrollTop();
    var currentSection = Math.round(currentScrollPosition / website.screen.height);
    //console.log(currentScrollPosition + " " + currentSection);
    website.currentSection = currentSection;
    enableSlider(website, slider);
    changeMenuSelected(website);
}

function changeMenuSelected(website, selectedA) {
    $('nav a').removeClass('selected');
    if(typeof selectedA !== "undefined") {
        $(selectedA).addClass('selected');
    } else {
        $('nav a:eq(' + website.currentSection + ')').addClass('selected');
    }
}

function changeBubbleSelected(index) {
    $('.slider-nav span').removeClass('bubble-selected');
    $('.slider-nav span:eq(' + index + ')').addClass('bubble-selected');
}