"use strict";

var ecda = {
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
    },
    appConfig: {
        AZURE_API_PATH: "http://ecdaapi.azurewebsites.net/",
        LOCAL_API_PATH: "http://localhost/edca.api/"
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
    myAjax.url = ecda.appConfig.LOCAL_API_PATH + controllerName;
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

    console.log('==== ' + s + ' ====');

}

function walk(obj, desc) {
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

















