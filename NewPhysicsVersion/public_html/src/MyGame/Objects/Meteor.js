/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable,vec3,Fire,Light, IllumRenderable, HelperFunctions, SpriteAnimateRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Meteor(spriteTexture, bg, igloo, lightmanager, blockManager) {

    this.kDelta = 1;
    this.downSize = 1;
    this.interp = null;
    this.name = "Meteor";
    this.blockManager = blockManager;
    
    Fire.call(this, spriteTexture, bg, igloo, lightmanager);
    
    this.lightColor = [1, 0, 1, 1];

    this.mlight.setNear(600);
    this.mlight.setFar(700);
    this.mlight.setInner(1.4);
    this.mlight.setOuter(8);
    this.mlight.setIntensity(5);
    this.mlight.setColor(this.lightColor);
    
    this.size = 96;
    this.mSprite.getXform().setSize(this.size, this.size);
}
gEngine.Core.inheritPrototype(Meteor, Fire);

Meteor.prototype.update = function () {
    
    //call parent update
    Fire.prototype.update.call(this);
    
    for(var i = 0; i < 3; i++){
        if(this.lightColor[i] < 1) this.lightColor[i] += 0.1;
        else this.lightColor[i] = 0;
    }
    this.mlight.setColor(this.lightColor);
    
    console.log(this.lightColor);

};

Meteor.prototype.handleCollision = function (otherObjectType) {

Fire.prototype.handleCollision.call(this, otherObjectType);

    if (otherObjectType === "Block") {
        this.blockManager.deleteAll();
    }
    
    if (otherObjectType === "Water") {
        this.shouldScore = true;
        this.scoreAmount = this.getXform().getPosition()[1] * 5;
    }
};

