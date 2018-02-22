/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Block(spriteTexture, size, x, y) {
    
    this.size = size;
    
    this.mSprite = new LightRenderable(spriteTexture);
    this.mSprite.setColor([1, 1, 1, 0]);
    this.mSprite.getXform().setPosition(x, y);
    this.mSprite.getXform().setSize(size, size);
    this.mSprite.setElementPixelPositions(0, size * 2, 0, size * 2);
    GameObject.call(this, this.mSprite);

}
gEngine.Core.inheritPrototype(Block, GameObject);

Block.prototype.shouldDie = function () {
    
    if(!this.isVisible())
        return true;
    
    return false;
    
};

Block.prototype.handleCollision = function (otherObjectType) {
    
    if(otherObjectType === "Seed"){
        this.setVisibility(false);
    }
    
};

Block.prototype.update = function () {
    
    
};



