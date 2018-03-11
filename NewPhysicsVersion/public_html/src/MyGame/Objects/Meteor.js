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

    this.mlight.setNear(50);
    this.mlight.setFar(100);
    this.mlight.setInner(64);
    this.mlight.setOuter(70);
    this.mlight.setIntensity(2);
    this.mlight.setColor([0.5, 0.7, 0.5, 1]);this.interpolateBy(0, -this.kDelta);
}
gEngine.Core.inheritPrototype(Meteor, Fire);

Meteor.prototype.update = function () {
    
    //call parent update
    Fire.prototype.update.call(this);
    
    //move again
    this.interpolateBy(0, -5 * this.kDelta);
    this.mlight.setYPos(this.mSprite.getXform().getYPos());
    this.mlight.setXPos(this.mSprite.getXform().getXPos());
    
};

Meteor.prototype.handleCollision = function (otherObjectType) {

    Fire.prototype.handleCollision.call(this, otherObjectType);

    if (otherObjectType === "Water") {
        this.shouldScore = true;
        this.scoreAmount = this.getXform().getPosition()[1] * 5;
    }
};

