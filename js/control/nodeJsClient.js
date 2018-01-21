class NodeJsClient {
    constructor() {
        this.urlServer = "http://dev.anoukthibault.wedding-website.com/backoffice/guest";
    }

    login(website, callbackSuccess, callbackFailure) {
        $.ajax({
            method: "GET",
            dataType: "json",
            url: this.urlServer + "/login/" + website.guest.id
          })
            .done(function(data) {
                website.guest = data.data;
                // Init the guests table
                callbackSuccess(website.guest);
            })
            .fail(function(data) {
                callbackFailure(data)
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