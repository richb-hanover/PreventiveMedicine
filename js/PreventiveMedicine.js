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

    function ProcessRules() {

        var retstr = "";
        var x;
        var str;

        for (i = 0; i < globalrulesobject.rules.length; i++)    {
            x = globalrulesobject.rules[i];
            str = ProcessRule(x);
            if (str != "") {
                retstr += i.toString()+str;
            }
        }

        return retstr;
    }

// Process a single rule to see what recommendations we might make
// Always retain Recommendation, URL, and RecType and process all the non-empty keys.

    function ProcessRule(theRule) {

        var n_val = 0;
        var k = "";             // the rule's key
        var v = "";             // that rule key's value
        var f = "";             // value of that key's Field on the Form

        for (key in theRule) {
            k = key;
            v = theRule[key];
            if (v == null || v == "") { continue; }
            if (v == "ckH1gtSexPartners") break;

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
                continue;
            } else if (key == "numMaxAge") {
                n_val = parseFloat(v);
                if (isNaN(n_val) || age > n_val) { return "" }
                continue;
            } else if (key == "numBmi") {
                n_val = parseFloat(v);
                if (isNaN(n_bmi) || n_bmi > n_val) { return "" }
                continue;
            } else if (key == "gender") {
                f = $("input[name=gender]:checked").val();
                if (v != f)   { return "" }
                continue;
            } else {
                f = $("#"+key).val();
                if (f == null || f == "") { return "" }
                continue;
            }




        }
        // Went through all columns without a failure so this is a match
        return  curRec + "<small><a href='" + URL + "'> More</a></small><br />";
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
