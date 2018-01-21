$(document).ready(function() {

    // Test 0 : Nothing happend because the file does not exist
    // Expected : Nothing change

    var test0 = new Page("test0", "fileToLoad/test0.html");
    test0.render();

    // Test 1: Load a basic H1 title without path
    // Expected : See in HTML source page : <h1> [TEST 1] Success !!</h1>
    var test1 = new Page("test1", "fileToLoad/test1.html");
    test1.render();

    // Test 1.1 : Reload the same page (so nothing move) but we have a callback
    test1.render(() => console.log("[TEST 1.1] Callback Success"));

    // Test 2 : Load a specific section in a page
    // Expected : See in HTML source page : <h2> [TEST 2] Success !!</h2>
    var test2 = new Page("test2", "fileToLoad/test2.html", "h2");
    test2.render();

    // Test 3 : Load a file with JS
    // Expected : HTML : <h1>[TEST 3] Look into your console to see if I worked !!</h1>
    //              JS : In the console : [TEST 3] Success!!
    var test3 = new Page("test3", "fileToLoad/test3.html", "", "fileToLoad/js/test3.js");
    test3.render();

    // Test 4 : Test with a callback function without JS file
    // Expected : HTML : <h1>[TEST 4] Look into your console to see if I worked !!</h1>
    //              JS : In the console : [TEST 4] true !!
    var test4 = new Page("test4", "fileToLoad/test4.html");
    test4.render(() => console.log("[TEST 4] " + test4.isRendered));

    // Test 5 : Test with a callback function with JS file
    // Expected : HTML : <h1>[TEST 5] Look into your console to see if I worked !!</h1>
    //              JS : In the console : [TEST 5] Success !!
    var test5 = new Page("test5", "fileToLoad/test5.html", "", "fileToLoad/js/test5.js");
    test5.render(() => console.log("[TEST 5] Success"));
});
