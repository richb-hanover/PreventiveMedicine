// Handle the interpretation of the rules - iterate through the global rule table (rules-json.js)
// PreventiveMedicine.GetRecommendations() returns the (html) of recommendations to display

// see http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html

var PreventiveMedicine = (function ($) {
    // private to this module
    var my = {},
        age = 0,
        height = 0,
        weight = 0,
        bmi = 0,
        packs = 0,
        yearsSmoked=0,
        quitYear = 0,
        drinks = 0;

//    function privateMethod() {
//        // ...
//    };
    function ProcessRules() {
        alert(globalrulesobject.rules.length);

    }

    my.init= function(){

    };

    my.moduleProperty = 1;
    my.GetRecommendations = function () {

        age    = $("#numAge").val();
        height = $("#numHeightIn").val();
        weight = $("#numWeightLb").val();
        if (weight != "0" && weight != ""){

            h = parseFloat(height);
            w = parseFloat(weight);
            bmi    = (703 * w)/(h*h);
            $("#numBmi").val(bmi.toPrecision(3));
        } else {
            $("#numBmi").val("-");
        }

        packs = $("#numPacks").val();
        yearsSmoked = $("#numSmokeYears").val();
        quitYear = $("#numQuitInYear").val();
        drinks = $("#numDrinksPerWk").val();

        var recs = ProcessRules();
        return recs;
    };

    return my;      // return the PreventiveMedicine module
}(jQuery));
