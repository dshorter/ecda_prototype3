
"use strict";

var tempConstants = {
    user: 'zpq4@cdc.gov',
    password: 'Welcome!44',
    canvasid: '25cd9b0c-8adf-4c12-8580-72ea7b1ff9d0'
};

var gCanvas = {
    User: {}
};

var gUserJson = {
    User: {}
};

var gWalkCount = {};

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
                doWalk(val, pad);
            }
        }
    }
}

function tryAjax(myAjax, controllerName, jsonRequest) {


    myAjax.body = JSON.stringify(jsonRequest);

    myAjax.contentType = "application/json; charset=utf-8";
    myAjax.method = "POST";
    myAjax.url = "http://localhost/edca.api/" + controllerName;
    myAjax.handleAs = "text";
    myAjax.responseType = "json";
    myAjax.generateRequest();

    
}


















