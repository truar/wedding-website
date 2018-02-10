$(document).ready(function() {
    
    var cookieMgr = new CookieMgr();
    
    cookieMgr.setCookie("cookie1", "aloa", 7, false);
    cookieMgr.setCookie("cookie2", {id : 1}, 7, true);
    
    var guest = {id: 1, password: 2};
    var website = new Website(2, 1, 0, undefined, undefined, guest, cookieMgr);
    cookieMgr.create(guest);
    console.log(document.cookie);

    cookieMgr.load(website);
    console.log(website.guest);

});
