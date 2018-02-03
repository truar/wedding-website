$("#reponse article").css({width: screen.width});

if(website.guest.answer.hasAnswered === true) {
    $("#reponse #firstPart, #reponse #secondPart, #reponse #lastPart").remove();
    if(website.guest.answer.isAvailable != undefined) {
        if(website.guest.answer.isAvailable === true) {
            $("#reponse #answerNo").remove();
        } else {
            $("#reponse #answer").remove();
            $("#reponse #answerNo").css({display: "block"});
        }
    }
}
else if(website.guest.category === 1 ){
    $("#reponse div.hebergement").remove();
}
