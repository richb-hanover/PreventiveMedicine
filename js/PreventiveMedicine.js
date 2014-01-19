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
        curRecType = "",
        RecTypeList = "";                   // list of the RecTypes we've already output

//    function privateMethod() {
//        // ...
//    };

// Process Rules - scan each of the rules from the globalrulesobject examining the various columns.

    function ProcessRules() {

        var retstr = "";
        var x;
        var str;

        for (i = 0; i < globalrulesobject.rules.length; i++)    {
            x = globalrulesobject.rules[i];
            str = ProcessRule(x, i);
            if (str != "") { // look for a recommendation to output, and also suppress duplicates
                retstr += str;
                RecTypeList += " " + curRecType;
            }
        }

        return retstr;
    }

// Process a single rule to see what recommendations we might make
// Always retain Recommendation, URL, and RecType and process all the non-empty keys.

    function ProcessRule(theRule, itsIndex) {

        var n_val = 0;
        var k = "";             // the rule's key
        var v = "";             // that rule key's value
        var f = "";             // value of that key's Field on the Form
        var sawMatch = false;   // init to false; set to true any time we match

        for (key in theRule) {
            k = key;
            v = theRule[key];
//            if (k.indexOf("FIELD38") == 0) { return "" }
            if (k.indexOf("FIELD") == 0) { continue; }
            if (v == null || v == "") { continue; }
            if (k == "ckPGestationalDiabetes")  {
                return "";
            }

            if (key == "Recommendation") {
                curRec = v;
                continue;
            }
            else if (key == "URL")  {
                curURL = v;
                continue;
            }
            else if (key == "RecType")  {
                curRecType = v;
                continue;
            }

            // look through the remainder of the columns for non-null/non-empty fields
            if (key == "numMinAge") {
                n_val = parseFloat(v);
                if (isNaN(n_val) || age < n_val) { return "" }
                sawMatch = true;
                continue;
            } else if (key == "numMaxAge") {
                n_val = parseFloat(v);
                if (isNaN(n_val) || age > n_val) { return "" }
                sawMatch = true;
                continue;
            } else if (key == "numBmi") {
                n_val = parseFloat(v);
                if (isNaN(n_bmi) || n_bmi > n_val) { return "" }
                sawMatch = true;
                continue;
            } else if (key == "gender") {
                f = $("input[name=gender]:checked").val();
                if (v != f)   { return "" }
                sawMatch = true;
                continue;
            } else if (key == 'ckH5gtDrink5Day') {  // TOTAL CROCK FOR THE DEMO - 19Jan2014 -reb
                return "";

            } else {
                f = $("#"+key).is(':checked');      // check all the other checkboxes
                if (f) {
                    sawMatch = true;
                    continue;
                }
                return "";
            }




        }
        if (sawMatch)   {
            // Went through all columns without a failure so this is a match
//            return  curRec + " (" + itsIndex.toString()+ ") <small><a href='" + URL + "'> More</a></small><br />";
            return  curRec + " <small><a href='" + URL + "'> More</a></small><br />";

        } else {
            return "";
        }

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
