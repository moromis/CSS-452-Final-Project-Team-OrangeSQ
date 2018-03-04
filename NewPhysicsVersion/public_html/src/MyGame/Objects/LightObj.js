/*
 * File: LightObj: support the creation of light for MyGame
 */
/*jslint node: true, vars: true */
/*global gEngine, MyGame, Light, LightSet, HelperFunctions*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function LightObj(){
}

LightObj.prototype._createALight = function (pos, color, n, f, intensity) {
    var light = new Light();
    light.setColor(color);
    light.setXPos(pos[0]);
    light.setYPos(pos[1]);
    light.setZPos(pos[2]);
    light.setNear(n);
    light.setFar(f);
    light.setIntensity(intensity);

    return light;
};

LightObj.prototype._initializeLights = function () {
    var red = HelperFunctions.Core.generateRandomFloat(0, 1);
    var green = HelperFunctions.Core.generateRandomFloat(0, 1);
    var blue = HelperFunctions.Core.generateRandomFloat(0, 1);
    var l = this._createALight(
        [20, 20, 5],       // light position
        [red, green, blue, 1],  // some color
        10, 50,             // Near and Far
        2.89               // intensity
    );
    return l;
};

 // generates a random float in the range low to high
//LightObj.prototype.generateRandomFloat = function (low, high){ return Math.random() * (high - low) + low; };