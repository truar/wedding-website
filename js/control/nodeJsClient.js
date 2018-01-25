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
                callbackFailure($.parseJSON(jqXHR.responseText));
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
            .fail(function(data) {
                callbackFailure(data);
            });
    }
}