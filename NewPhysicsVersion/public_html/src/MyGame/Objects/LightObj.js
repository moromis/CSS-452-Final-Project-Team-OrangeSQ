/*
 * File: LightObj: support the creation of light for MyGame
 */
/*jslint node: true, vars: true */
/*global gEngine, MyGame, Light, LightSet, HelperFunctions*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function LightObj() {
}

LightObj.prototype._createALight = function (type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
    var light = new Light();
    light.setLightType(type);
    light.setColor(color);
    light.setXPos(pos[0]);
    light.setYPos(pos[1]);
    light.setZPos(pos[2]);
    light.setDirection(dir);
    light.setNear(n);
    light.setFar(f);
    light.setInner(inner);
    light.setOuter(outer);
    light.setIntensity(intensity);
    light.setDropOff(dropOff);

    return light;
};

LightObj.prototype.createPointLight = function () {
    var red = HelperFunctions.Core.generateRandomFloat(0.3, 1);
    var green = HelperFunctions.Core.generateRandomFloat(0, 1);
    var blue = HelperFunctions.Core.generateRandomFloat(0.2, 1);
    var l = this._createALight(Light.eLightType.ePointLight,
            [15, 50, 5], // position
            [0, 0, -1], // Direction 
            [red, green, blue, 1], // some color
            25, 40, // near and far distances
            0.1, 0.2, // inner and outer cones
            3, // intensity
            2                     // drop off
            );
    return l;
};
LightObj.prototype.createDirectionalLight = function () {
    var l = this._createALight(Light.eLightType.eDirectionalLight,
            [15, 50, 4], // position (not used by directional)
            [1, 0, 2], // Pointing direction upwards
            [0, 0.7, 0.5, 1], // color
            50, 100, // near anf far distances: essentially switch this off
            0.3, 1.2, // inner and outer cones
            2, // intensity
            1                    // drop off
            );
    return l;
};

LightObj.prototype.createSpotLight = function () {
    var l = this._createALight(Light.eLightType.eSpotLight,
            [80, 18, 10], // random position - reset in obj.
            [0, -2, -2], // direction
            [1, 0, 1, 1], // color
            100, 150, // near and far distances
            1, 2, // inner outter angles (in radius)
            10, // intensity
            2                     // drop off
            );
    return l;
};

// generates a random float in the range low to high
//LightObj.prototype.generateRandomFloat = function (low, high){ return Math.random() * (high - low) + low; };