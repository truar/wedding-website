function AnswerForm(nodeJsClient, slider) {
    this.nodeJsClient = nodeJsClient;
    this.slider = slider;
}

AnswerForm.prototype.validateFirstPart = function(guest, isPresent, email) {
    if(isPresent === "yes") {
        guest.answer.disponibility = 1;
    }
    guest.answer.email = email;
    $("div.slider-form").animate({left: "-=" + this.slider.screen.width}, 400);
}

AnswerForm.prototype.validateSecondPart = function() {
    $("div.slider-form").animate({left: "-=" + this.slider.screen.width}, 400);
}

AnswerForm.prototype.validateLastPart = function(guest, allergies, comments) {
    guest.answer.allergies = allergies;
    guest.answer.message = comments;
    
    console.log(JSON.stringify(guest));
    this.nodeJsClient.putGuest(guest, 
        () => {
            $("div.slider-form").animate({left: "-=" + this.slider.screen.width}, 400);
        }, () => {
            alert("PUT Failed");
        }
    );
    
}

AnswerForm.prototype.addName = function(guest, lastName, firstName) {
    guest.answer.guests.push(lastName + " " + firstName);
    $(".tableName").append("<p><span class='name'>" + lastName + " " + firstName + "</span><span class='delete'></span></p>");
    $("input#lastname, input#firstname").val("");
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

    // Display the waiting GIF
    $('#login-wrapper').animate({opacity: 0}, 400, "swing", () => {
        $('#login-wrapper').css({display: 'none'});
        $(".error-login").remove();
        $('#login').append("<div class='content' id='waiting'><p><img id='loader' src='./css/images/icons/loading.gif' /></p></div>");
        // As soon as we have the answer, we put the information
        this.nodeJsClient.login(website,
            function(guest) {
                $('#waiting').animate({opacity: 0}, 400, "swing", function() {
                    $(this).css({display: 'none'});
                    $('#logged').css({display: "block", opacity: 0}).animate({opacity: 1}, "400", "swing");
                    $('p.displayName').text(website.guest.displayName);
                    $('nav').addClass('ready');
                    $('section').css({display: "block"});
                });
            },
            function(data) {
                // remove the GIF and display the form again, with a message for the user
                console.log("Login FAILED : " + data.error);
                $("#login-form").prepend("<p class='error-login'>" + data.error + "</p>");
                $('#waiting').animate({opacity: 0}, 400, "swing", function() {
                    $(this).css({display: 'none'});
                    $('#login-wrapper').css({display: 'block'});
                    $('#login-wrapper').animate({opacity: 1}, 400, "swing", () => {
                        $('#waiting').remove();
                    });
                });
            }
        );
    });
}