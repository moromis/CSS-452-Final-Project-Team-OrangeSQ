/*jslint node: true, vars: true, evil: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var HelperFunctions = HelperFunctions || { };

HelperFunctions.Core = (function () {
    
    // generates a random int in the range low to high
    var generateRandomInt = function(low, high){
        return Math.floor(Math.random() * (high - low) + low);
    };

    // generates a random float in the range low to high
    var generateRandomFloat = function (low, high){
        return Math.random() * (high - low) + low;
    };
    
    //public methods
    var mPublic = {
        generateRandomInt: generateRandomInt,
        generateRandomFloat: generateRandomFloat
    };

    return mPublic;
}());
