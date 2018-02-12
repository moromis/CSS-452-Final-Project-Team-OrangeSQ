/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable, HelperFunctions, SpriteAnimateRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Seed(spriteTexture) {
    
    this.kDelta = 1;
    this.size = 64;
    
    this.mSprite = new LightRenderable(spriteTexture);
    this.mSprite.setColor([1, 1, 1, 0]);
    this.mSprite.getXform().setPosition(HelperFunctions.Core.generateRandomFloat(56, 144 + 56), 128 + 72 + 16);
    this.mSprite.setSpriteSequence(this.size, 0, this.size, this.size, 3, 0);
    this.mSprite.setAnimationSpeed(15);
    this.mSprite.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mSprite.getXform().setSize(this.size / 4, this.size / 4);
    this.mSprite.setElementPixelPositions(0, this.size, 0, this.size);
    GameObject.call(this, this.mSprite);
    
    this.blowUp = false;
}
gEngine.Core.inheritPrototype(Seed, GameObject);

Seed.prototype.shouldDie = function () {
    
    return false;
    
};

Seed.prototype.update = function () {
    
    GameObject.prototype.update.call(this);
    
    var xform = this.getXform();
        
    xform.incYPosBy(-this.kDelta);
        
    this.mSprite.updateAnimation();
};



