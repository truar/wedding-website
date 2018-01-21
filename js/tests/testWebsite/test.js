$(document).ready(function() {

    // Test for the Website to see if it can render properly and in the right order the section
    // Expected result : Test0, Test1 then Test2

    var pages = [new Page("testWebsite0", "fileToLoad/testWebsite0.html"), 
                 new Page("testWebsite1", "fileToLoad/testWebsite1.html"),
                 new Page("testWebsite2", "fileToLoad/testWebsite2.html"),
                 new Page("testWebsite3", "fileToLoad/testWebsite3.html"),
                 new Page("testWebsite4", "fileToLoad/testWebsite4.html")];

    testWebsite = new Website(5, 1, 1, null, pages);
    testWebsite.renderFirst("body", () => console.log("[TEST WEBSITE] Success if only 1 section : " + $("section").length));
    setTimeout(() => testWebsite.render(4), 1000);
    setTimeout(() => testWebsite.render(2), 1500);
    setTimeout(() => testWebsite.render(3), 2000);
    setTimeout(() => testWebsite.render(1, () => console.log("[TEST WEBSITE] Success with callback !!")), 2500);
    
});
