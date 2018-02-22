/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable, HelperFunctions, SpriteAnimateRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Fire(spriteTexture, explosionManager) {
    
    this.kDelta = 1;
    this.size = 64;
    
    this.mSprite = new LightRenderable(spriteTexture);
    this.mSprite.setColor([1, 1, 1, 0]);
    this.mSprite.getXform().setPosition(HelperFunctions.Core.generateRandomFloat(0, 960), 640);
    this.mSprite.setSpriteSequence(this.size, 0, this.size, this.size, 3, 0);
    this.mSprite.setAnimationSpeed(15);
    this.mSprite.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mSprite.getXform().setSize(this.size, this.size);
    this.mSprite.setElementPixelPositions(0, this.size, 0, this.size);
    GameObject.call(this, this.mSprite);
    
    this.explosion = null;
    this.explosionManager = explosionManager;
}
gEngine.Core.inheritPrototype(Fire, GameObject);

Fire.prototype.shouldDie = function () {
    
    if(this.explosion !== null) {
        if(!this.explosion.isVisible()){
            return true;
        }
    }
    
    return false;
    
};

Fire.prototype.handleCollision = function (otherObjectType) {
  
    if(otherObjectType === "Block"){
        
        var pos = this.getXform().getPosition();
        this.explosionManager._placeObject(this.size, pos[0], pos[1]);
//        this.explosion = new Explosion(this.explosionTexture, pos[0], pos[1]);
        this.setVisibility(false);
    }
    
    if(otherObjectType === "TonguePiece"){
        
        //need to attach to tongue, and follow the tongue back
        //to the hero object and then die
        
    }
    
};

Fire.prototype.relocate = function (x, y) {
  
    this.mSprite.getXform().setPosition(x, y);
    
};

Fire.prototype.update = function () {
    
    //call parent update
    GameObject.prototype.update.call(this);
    
    if(this.isVisible()){
        
        //update Y position    
        this.mSprite.getXform().incYPosBy(-this.kDelta);

        //update the sprite's animation    
        this.mSprite.updateAnimation();
    }
};



