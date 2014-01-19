// Handle the interpretation of the rules - iterate through the global rule table (rules-json.js)
// PreventiveMedicine.GetRecommendations() returns the (html) of recommendations to display

// see http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html

var PreventiveMedicine = (function ($) {
    // private to this module
    var my = {},
        age = 0,
        n_age = 0,
        height = 0,
        weight = 0,
        n_bmi = 0,
        packs = 0,
        yearsSmoked=0,
        quitYear = 0,
        drinks = 0;

    var curURL = "",
        curRec = "",
        curRecType = "";

//    function privateMethod() {
//        // ...
//    };

// Process Rules - scan each of the rules from the globalrulesobject examining the various columns.
// Always retain Recommendation, URL, and RecType and process all the non-empty keys.



    function ProcessRules() {
        var x = globalrulesobject.rules[0]; // do the first one...
        retstr = "";
        retstr += ProcessRule(x);
        return retstr;
    }

// Process a single rule to see what recommendations we might make
    function ProcessRule(theRule) {

        var n_val = 0;
        var j = "";

        for (key in theRule) {
            j = key;
            if (key == "Recommendation") {
                curRec = theRule[key];
                continue;
            }
            else if (key == "URL")  {
                curURL = theRule[key];
                continue;
            }
            else if (key == "RecType")  {
                curRecType = theRule[key];
                continue;
            }

            // look for non-null/non-empty fields
            if (theRule[key] != null && theRule[key] != "") {
                if (key == "numMinAge") {
                    n_val = parseFloat(theRule[key]);
                    if (age < n_val) { return "" }
                    continue;
                } else if (key == "numMaxAge") {
                    n_val = parseFloat(theRule[key]);
                    if (age > n_val) { return "" }
                    continue;
                } else if (key == "numBmi") {
                    n_val = parseFloat(theRule[key]);
                    if (n_bmi > n_val) { return "" }
                    continue;
                } else if (key == "gender") {
                    if (theRule[key] != $("input[name=gender]:checked").val())   { return "" }
                    continue;
                }

            }



        }
        // Went through all columns without a failure
        return  curRec + "<a href='" + URL + "'> More</a><br />";
    }

    my.init= function(){

    };

    my.moduleProperty = 1;
    my.GetRecommendations = function () {

        age    = $("#numAge").val();
        n_age  = parseFloat(age);
        height = $("#numHeightIn").val();
        weight = $("#numWeightLb").val();
        if (weight != "0" && weight != ""){

            h = parseFloat(height);
            w = parseFloat(weight);
            n_bmi = (703 * w)/(h*h);
            $("#numBmi").val(n_bmi.toPrecision(3));
        } else {
            $("#numBmi").val("-");
        }

        packs = $("#numPacks").val();
        yearsSmoked = $("#numSmokeYears").val();
        p = parseFloat(packs);
        y = parseFloat(yearsSmoked);
        n_packyears = p * y;
        packyears = toString(n_packyears);
        quitYear = $("#numQuitInYear").val();
        drinks = $("#numDrinksPerWk").val();
        n_drinks = parseFloat(drinks);


        var recs = ProcessRules();
        return recs;
    };

    return my;      // return the PreventiveMedicine module
}(jQuery));
