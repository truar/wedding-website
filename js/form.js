function validateFirstPart(wedding, isPresent, email) {
    if(isPresent === "yes") {
        wedding.isPresent = isPresent;
    }
    wedding.email = email;
    $("div.slider-form").animate({left: "-=" + slider.screen.width}, 400);
}

function validateSecondPart(wedding) {
    $("div.slider-form").animate({left: "-=" + slider.screen.width}, 400);
}

function validateLastPart(wedding) {
   // console.log(wedding.isPresent + " - " + wedding.email + " " + wedding.names + " " + wedding.allergies + " " + wedding.comments);
    $("div.slider-form").animate({left: "-=" + slider.screen.width}, 400);
}

function addName(wedding, lastName, firstName) {
    wedding.names.push(lastName + " " + firstName);
    $(".tableName").append("<p><span class='name'>" + lastName + " " + firstName + "</span><span class='delete'></span></p>");
    $("input#lastname, input#firstname").val("");
}

function removeName(wedding, name) {
    var index = wedding.names.findIndex((n) => (n === name)? true : false);
    wedding.names.splice(index, 1);
    $(".tableName p").eq(index).remove();
}

function logUser(username, password) {
    // add Ajax call to server and then log if ok
    if(true) {
        $('#login-wrapper').animate({opacity: 0}, 400, "swing", function() {
            $(this).css({display: 'none'});
            $('#login').append("<div class='content' id='waiting'><p><img src='./css/images/icons/loading.gif' /></p></div>");
            setTimeout(function() {
                $('#waiting').animate({opacity: 0}, 400, "swing", function() {
                    $(this).css({display: 'none'});
                    $('#logged').css({display: "block", opacity: 0}).animate({opacity: 1}, "400", "swing");
                    $('nav').animate({left: '-260px'}, 400, "swing");
                    $('section').css({display: "block"});
                });
            }, 1000);
            
        });
    }
}