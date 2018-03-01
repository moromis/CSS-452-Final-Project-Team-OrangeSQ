/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable, HelperFunctions, SpriteAnimateRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function LightManager (){
    this.mlightObj = null;
    this.mGlobalLightSet = new LightSet();
}

LightManager.prototype.createLight = function(){
   this.mlightObj = new LightObj();
};