/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable, SpriteAnimateRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Explosion(spriteTexture, size, x, y) {
    
    this.maxFrame = 30;
    this.currentFrame = 0;
    
    this.mSprite = new LightRenderable(spriteTexture);
    this.mSprite.setColor([1, 1, 1, 0]);
    this.mSprite.getXform().setPosition(x, y);
    this.mSprite.getXform().setSize(size, size);
    this.mSprite.setSpriteSequence(size, 0, size, size, 3, 0);
    this.mSprite.setAnimationSpeed(5);
    this.mSprite.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    GameObject.call(this, this.mSprite);
}
gEngine.Core.inheritPrototype(Explosion, GameObject);

Explosion.prototype.update = function () {
    
    this.currentFrame++;
    this.mSprite.updateAnimation();
    
};

Explosion.prototype.shouldDie = function () {
    
    return this.currentFrame >= this.maxFrame;
    
};



