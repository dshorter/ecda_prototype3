"use strict";

var ecdaConstants = {
    Debug: "Debug",
    Release: "Release"
};

var ecda = {
    appConfig: {
        AZURE_API_PATH: "http://ecdaapi.azurewebsites.net/",
        LOCAL_API_PATH: "http://localhost/edca.api/",
        MODE: ecdaConstants.Release
    },
    getGadgetElementName: function (gadgetType) {

        switch (gadgetType) {
            case "Ewav.FrequencyControl" :
                return "ecda-freq";
                break;
            case "Ewav.TwoxTwoTableControl" :
                return "ecda-twoxtwo";
                break;
            case "Ewav.EpiCurve"  :
                return "ecda-epicurve";
                break;
            default :
                return "ecda-generic";
                break;
        }
    }
};

var epicurveRequestSchema = schema({
    DatasourceName: String,
    dateVariable: String,
    xAxisStartValue: String,
    xAxisEndValue: String,
    dateInterval: String,
    caseStatusVariable: String

});


var gCanvas = {
    User: {}
};

var gUserJson = {
    User: {}
};

var gWalkCount = {};

function tryAjax(myAjax, controllerName, jsonRequest) {
    logThis("tryAjax");
    myAjax.body = JSON.stringify(jsonRequest);

    myAjax.contentType = "application/json; charset=utf-8";
    myAjax.method = "POST";
    myAjax.url = ecda.appConfig.AZURE_API_PATH + controllerName;
    myAjax.handleAs = "text";
    myAjax.responseType = "json";
    myAjax.generateRequest();


}

var tempConstants = {
    user: 'zpq4@cdc.gov',
    password: 'Welcome!44',
    canvasid: '25cd9b0c-8adf-4c12-8580-72ea7b1ff9d0'
};

function logThis(s) {

    if (ecda.appConfig.MODE == ecdaConstants.Release)
        return;

    console.log("===== start log =====");
    console.log(s);
    //  console.log("===== end log =====");

}

function walk(obj, desc) {

    if (ecda.appConfig.MODE == ecdaConstants.Release)
        return;

    if (desc === undefined) {
        desc = 'object';
    }
    logThis("start walk of " + desc);
    doWalk(obj);
    logThis("ehd walk");
}

function doWalk(obj, pad) {
    if (pad === undefined) {
        pad = "-";
    } else {
        pad = pad + "-";
    }
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var val = obj[key];
            console.log(pad + key + ' ---> ' + val);
            if (typeof(val ) !== "string") {
                if (pad.length < 3)
                    doWalk(val, pad);
            }
        }
    }
}

function getValues(canvasJson) {
    var kvpArray = [];
    for (var key in   canvasJson) {
        if (canvasJson.hasOwnProperty(key)) {
            var val = canvasJson[key];
            kvpArray.push({"key": key, "val": val});
        }
    }
    return kvpArray;

}


function loremIpsum() {
    var loremIpsumWordBank = ["lorem", "ipsum", "dolor", "sit", "amet,", "consectetur", "adipisicing", "elit,", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua.", "enim", "ad", "minim", "veniam,", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea", "commodo", "consequat.", "duis", "aute", "irure", "dolor", "in", "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur.", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident,", "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum.", "sed", "ut", "perspiciatis,", "unde", "omnis", "iste", "natus", "error", "sit", "voluptatem", "accusantium", "doloremque", "laudantium,", "totam", "rem", "aperiam", "eaque", "ipsa,", "quae", "ab", "illo", "inventore", "veritatis", "et", "quasi", "architecto", "beatae", "vitae", "dicta", "sunt,", "explicabo.", "nemo", "enim", "ipsam", "voluptatem,", "quia", "voluptas", "sit,", "aspernatur", "aut", "odit", "aut", "fugit,", "sed", "quia", "consequuntur", "magni", "dolores", "eos,", "qui", "ratione", "voluptatem", "sequi", "nesciunt,", "neque", "porro", "quisquam", "est,", "qui", "dolorem", "ipsum,", "quia", "dolor", "sit,", "amet,", "consectetur,", "adipisci", "velit,", "sed", "quia", "non", "numquam", "eius", "modi", "tempora", "incidunt,", "ut", "labore", "et", "dolore", "magnam", "aliquam", "quaerat", "voluptatem.", "ut", "enim", "ad", "minima", "veniam,", "quis", "nostrum", "exercitationem", "ullam", "corporis", "suscipit", "laboriosam,", "nisi", "ut", "aliquid", "ex", "ea", "commodi", "consequatur?", "quis", "autem", "vel", "eum", "iure", "reprehenderit,", "qui", "in", "ea", "voluptate", "velit", "esse,", "quam", "nihil", "molestiae", "consequatur,", "vel", "illum,", "qui", "dolorem", "eum", "fugiat,", "quo", "voluptas", "nulla", "pariatur?", "at", "vero", "eos", "et", "accusamus", "et", "iusto", "odio", "dignissimos", "ducimus,", "qui", "blanditiis", "praesentium", "voluptatum", "deleniti", "atque", "corrupti,", "quos", "dolores", "et", "quas", "molestias", "excepturi", "sint,", "obcaecati", "cupiditate", "non", "provident,", "similique", "sunt", "in", "culpa,", "qui", "officia", "deserunt", "mollitia", "animi,", "id", "est", "laborum", "et", "dolorum", "fuga.", "harum", "quidem", "rerum", "facilis", "est", "et", "expedita", "distinctio.", "Nam", "libero", "tempore,", "cum", "soluta", "nobis", "est", "eligendi", "optio,", "cumque", "nihil", "impedit,", "quo", "minus", "id,", "quod", "maxime", "placeat,", "facere", "possimus,", "omnis", "voluptas", "assumenda", "est,", "omnis", "dolor", "repellendus.", "temporibus", "autem", "quibusdam", "aut", "officiis", "debitis", "aut", "rerum", "necessitatibus", "saepe", "eveniet,", "ut", "et", "voluptates", "repudiandae", "sint", "molestiae", "non", "recusandae.", "itaque", "earum", "rerum", "hic", "tenetur", "a", "sapiente", "delectus,", "aut", "reiciendis", "voluptatibus", "maiores", "alias", "consequatur", "aut", "perferendis", "doloribus", "asperiores", "repellat"]

    var minWordCount = 2
    var maxWordCount = 4

    var randy = Math.floor(Math.random() * (maxWordCount - minWordCount)) + minWordCount;
    var ret = "";
    for (var i = 0; i < randy; i++) {
        var newTxt = loremIpsumWordBank[Math.floor(Math.random() * (loremIpsumWordBank.length - 1))];
        if (ret.substring(ret.length - 1, ret.length) == "." || ret.substring(ret.length - 1, ret.length) == "?") {
            newTxt = newTxt.substring(0, 1).toUpperCase() + newTxt.substring(1, newTxt.length);
        }
        ret += " " + newTxt;
    }
    return "Lorem ipsum" + ret;
    //  document.getElementById(elem).innerHTML = document.getElementById(elem).innerHTML + "<p>Lorem ipsum " + ret.substring(0,ret.length-1) + ".</p>";
}








