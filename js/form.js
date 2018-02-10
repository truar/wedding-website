function AnswerForm(nodeJsClient, slider) {
    this.nodeJsClient = nodeJsClient;
    this.slider = slider;
}

AnswerForm.prototype.moveSlider = function() {
    $("div.slider-form").animate({left: "-=" + this.slider.screen.width}, 400);
}

AnswerForm.prototype.putForm = function(guest, callbackSuccess, callbackError) {
    console.log(JSON.stringify(guest));

    this.nodeJsClient.putGuest(guest, () => callbackSuccess(), () => callbackError());
}

AnswerForm.prototype.toggleFirstButtonValue = function(value) {
    if (value === 'yes') {
        $("button[name=continue]").html("Continuer");
    }
    else if (value === 'no') {
        $("button[name=continue]").html("Envoyer");
    }
}

AnswerForm.prototype.validateFirstPart = function(guest, isPresent, email) {
    guest.answer.email = email;

    if(isPresent === "yes") {
        guest.answer.isAvailable = true;
        this.moveSlider();
    } else {
        guest.answer.isAvailable = false;
        $("#answerNo").css({display: 'block'});
        $("#secondPart, #lastPart, #answer").remove();
        
        this.putForm(guest, 
            () => this.moveSlider(), 
            () => this.displayErrorGuests('#firstPart .content', "Something wrong happened. Please try again later or contact us")
        );
    }
    
}

AnswerForm.prototype.validateSecondPart = function(guest, hebergement) {
    guest.answer.hebergement = hebergement;
    if(guest.answer.guests.length === 0) {
        this.displayErrorGuests('#secondPart .content', "Veuillez renseigner au moins un invit&eacute;");
    } else {
        this.moveSlider();
    }
}

AnswerForm.prototype.displayErrorGuests = function(selector, message) {
    if($(selector + " .error-guests").length === 0) {
        $(selector).append("<p class='error-guests'>" + message + "</p>");
    }
}

AnswerForm.prototype.removeErrorGuests = function(selector) {
    $(selector).remove();
}


AnswerForm.prototype.validateLastPart = function(guest, allergies, comments) {
    guest.answer.allergies = allergies;
    guest.answer.message = comments;
    
    console.log(JSON.stringify(guest));

    this.putForm(guest, 
        () => this.moveSlider(), 
        () => this.displayErrorGuests('#lastPart .content', "Something wrong happened. Please try again later or contact us")
    );
    
}

AnswerForm.prototype.addName = function(guest, guestName) {
    guest.answer.guests.push(guestName);
    this.removeErrorGuests('#secondPart .content .error-guests');
    $(".tableName").append("<p><span class='name'>" + guestName + "</span><span class='delete'></span></p>");
    $("input#guestName").val("");
}

AnswerForm.prototype.removeName = function(guest, name) {
    var index = guest.answer.guests.findIndex((n) => (n === name)? true : false);
    guest.answer.guests.splice(index, 1);
    $(".tableName p").eq(index).remove();
}

AnswerForm.prototype.logUser = function(website, login, password) {
    // Set the id and password of the guest object
    website.guest.id = login;
    website.guest.password = password;

    // Disable the button after the click
    $("#log").prop("disabled", "true");

    // Display the waiting GIF
    $('#login-wrapper').animate({opacity: 0}, 400, "swing", () => {
        $('#login-wrapper').css({display: 'none'});
        $(".error-login").remove();
        $('#login').append("<div class='content' id='waiting'><p><img id='loader' src='./css/images/icons/loading.gif' /></p></div>");
        // As soon as we have the answer, we put the information
        this.nodeJsClient.login(website,
            function(guest) {
                // Create the cookie to save the logged guest
                website.cookieMgr.create(guest);
                $('#waiting').animate({opacity: 0}, 400, "swing", function() {
                    $(this).css({display: 'none'});
                    $('#logged').css({display: "block", opacity: 0}).animate({opacity: 1}, "400", "swing");
                    $('p.displayName').text(website.guest.displayName);
                    $('nav').addClass('ready');
                    $('section').css({display: "block"});
                    $('#waiting').remove();
                });
            },
            function(data) {
                // remove the GIF and display the form again, with a message for the user
                console.log("Login FAILED : " + data.error);
                $("#login-form").prepend("<p class='error-login'>" + data.error + "</p>");
                $('#waiting').animate({opacity: 0}, 400, "swing", function() {
                    $(this).css({display: 'none'});
                    $('#login-wrapper').css({display: 'block'});
                    $("#log").removeProp("disabled");
                    $('#login-wrapper').animate({opacity: 1}, 400, "swing", () => {
                        $('#waiting').remove();
                    });
                });
            }
        );
    });
}

AnswerForm.prototype.logoutUser = function(website) {
    website.cookieMgr.delete();
    // Reload the website in the initial state
    // Display the waiting GIF
    $('#logged').animate({opacity: 0}, 400, "swing", () => {
        $("#logged").css({display: 'none'});
        website.reInit();
        this.slider.reInit();
        $('nav').removeClass('ready');
        $("#log").removeProp("disabled");
        $('#login-wrapper').css({display: 'block'}).animate({opacity: 1}, 400, "swing");
        $("#username, #password").val("");
    });
}