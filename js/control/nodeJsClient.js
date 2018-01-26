class NodeJsClient {
    constructor() {
        this.urlServer = "http://dev.anoukthibault.wedding-website.com/backoffice/guest";
    }

    login(website, callbackSuccess, callbackFailure) {
        $.ajax({
            method: "POST",
            dataType: "json",
            url: this.urlServer + "/login/" + website.guest.id,
            data: { password : website.guest.password }
          })
            .done(function(data) {
                website.guest = data.data;
                // Init the guests table
                callbackSuccess(website.guest);
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.status);
                if(jqXHR.status == "403") {
                    callbackFailure($.parseJSON(jqXHR.responseText));
                } else {
                    var data = {};
                    data.error = "Something wrong happen. Please try again later";
                    callbackFailure(data);
                }
                
            });
    }

    putGuest(guest, callbackSuccess, callbackFailure) {
        guest.answer.date = Date.now();
        $.ajax({
            method: "PUT",
            dataType: "json",
            url: this.urlServer + "/" + guest._id,
            data: guest
        })
            .done(function(data) {
                callbackSuccess(data);
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                callbackFailure(jqXHR.responseText);
            });
    }
}