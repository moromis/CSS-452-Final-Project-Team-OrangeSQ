/* File: Hero.js 
 *
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var state = {
  WALKING: 1,
  STANDING: 2
};

var direction = {
  LEFT: 1,
  RIGHT: 2
};

function Hero(spriteTexture, size, x, y) {
    
    this.kDelta = 1;
    this.size = size;
    
    this.mSprite = new LightRenderable(spriteTexture);
    this.mSprite.setColor([1, 1, 1, 0]);
    this.mSprite.getXform().setPosition(x, y);
    this.mSprite.setSpriteSequence(size, 0, size, size, 2, 0);
    this.mSprite.setAnimationSpeed(15);
    this.mSprite.getXform().setSize(size / 4, size / 4);
    this.mSprite.setElementPixelPositions(0, size, 0, size);
    GameObject.call(this, this.mSprite);
    
    this.mState = state.STANDING;
    this.mDirection = direction.RIGHT;
    this.walking = false;
}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.update = function () {
    
    var xform = this.getXform();

    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Left) || gEngine.Input.isKeyClicked(gEngine.Input.keys.Left)){
        this.walking = false;
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        
        xform.incXPosBy(-this.kDelta);
        this.mDirection = direction.LEFT;
        this.mState = state.WALKING;
        
    }else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        
        xform.incXPosBy(this.kDelta);
        this.mDirection = direction.RIGHT;
        this.mState = state.WALKING;
            
    }else{
        
        this.mState = state.STANDING;
        
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
        
    }
    
    this._updateAnimation();
    this.mSprite.updateAnimation();
};

Hero.prototype._updateAnimation = function () {
    
    switch(this.mDirection){
        case direction.LEFT:
            switch(this.mState){
                case state.STANDING:
                    this.mSprite.setSpriteSequence(this.size, 0, this.size, this.size, 0, 0);
                    this.walking = false;
                    break;
                case state.WALKING:
                    if(this.walking === false)
                        this.mSprite.setSpriteSequence(this.size, 0, this.size, this.size, 2, 0);
                    this.walking = true;
                    break;
            }
        break;
        case direction.RIGHT:
            switch(this.mState){
                case state.STANDING:
                    this.mSprite.setSpriteSequence(this.size, this.size + 2 * this.size, this.size, this.size, 0, 0);
                    this.walking = false;
                    break;
                case state.WALKING:
                    if(this.walking === false)
                        this.mSprite.setSpriteSequence(this.size, 2 * this.size, this.size, this.size, 2, 0);
                    this.walking = true;
                    break;
            }
    }
        
    
};