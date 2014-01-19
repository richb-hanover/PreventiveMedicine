// Handle the interpretation of the rules - iterate through the global rule table (rules-json.js)
// PreventiveMedicine.GetRecommendations() returns the (html) of recommendations to display

// see http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html

var PreventiveMedicine = (function ($) {
    var my = {},
        age = 0,
        height = 0,
        weight = 0;
        bmi = 0,
        packs = 0,
        yearsSmoked=0,
        packyears = 0,
        drinks = 0;


//    function privateMethod() {
//        // ...
//    };

    my.init= function(){
        alert("Called the PreventiveMedicine.init method");
    };

    my.moduleProperty = 1;
    my.GetRecommendations = function () {

        return "<em>Hi Rich!</em>";
    };

    return my;      // return the PreventiveMedicine module
}(jQuery));
