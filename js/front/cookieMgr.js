var CookieMgr = function() {

}

CookieMgr.prototype.create = function(guest) {    
    this.setCookie("guest", guest, 7, true);
}

// Return false if the cookie does not exist
// Otherwise, set the website.guest with the cookie value
CookieMgr.prototype.load = function(website) {
    var cookieValue = this.getCookie("guest", true);
    if(cookieValue === "") {
        return false;
    } else {
        website.guest = cookieValue;
        return true;
    }
}

CookieMgr.prototype.delete = function() {
    this.deleteCookie("guest");
}

CookieMgr.prototype.getCookie = function(cname, decodeJSON) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            var value = c.substring(name.length, c.length);
            var decoded_value = (decodeJSON === true) ? JSON.parse(value) : value;
            return decoded_value;
        }
    }
    return "";
}

CookieMgr.prototype.setCookie = function(cname, cvalue, exdays, encodeJSON) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    var encoded_value = (encodeJSON === true) ? JSON.stringify(cvalue) : cvalue;
    document.cookie = cname + "=" + encoded_value + ";" + expires + ";path=/";
}

CookieMgr.prototype.deleteCookie = function(cname) {
    var expires = "expires=expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = cname + "= ;" + expires + ";path=/";
}