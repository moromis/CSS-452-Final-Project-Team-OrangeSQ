/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Block(spriteTexture, size, x, y) {
    
    this.size = size;
    
    this.mSprite = new LightRenderable(spriteTexture);
    this.mSprite.setColor([1, 1, 1, 0]);
    this.mSprite.getXform().setPosition(x, y);
    this.mSprite.getXform().setSize(size / 4, size / 4);
    this.mSprite.setElementPixelPositions(0, size, 0, size);
    GameObject.call(this, this.mSprite);

}
gEngine.Core.inheritPrototype(Block, GameObject);

Block.prototype.shouldDie = function () {
    
    return false;
    
};

Block.prototype.update = function () {
    
    
};



