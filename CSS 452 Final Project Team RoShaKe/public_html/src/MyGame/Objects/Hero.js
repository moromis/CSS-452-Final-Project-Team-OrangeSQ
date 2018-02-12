/* File: Hero.js 
 *
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var state = {
  WALKING: 0,
  STANDING: 1,
  EXTENDING: 2
};

var direction = {
  LEFT: 0,
  RIGHT: 1
};

function Hero(spriteTexture, size, x, y) {
    
    this.kDelta = 1;
    this.kTongueSpeed = 2;
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
    
    this.mTongue = null;
    this.mTonguePos = [0, 0];
}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.update = function () {

    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Left) || gEngine.Input.isKeyClicked(gEngine.Input.keys.Left)){
        this.walking = false;
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        
        if(this.mState !== state.EXTENDING){
            this.setCurrentFrontDir([-1, 0]);
            this.setSpeed(this.kDelta);
            this.mDirection = direction.LEFT;
            this.mState = state.WALKING;
        }
        
    }else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        
        if(this.mState !== state.EXTENDING){
            this.setCurrentFrontDir([1, 0]);
            this.setSpeed(this.kDelta);
            this.mDirection = direction.RIGHT;
            this.mState = state.WALKING;
        }
            
    }else{
        
        this.setCurrentFrontDir([0, 0]);
        this.setSpeed(0);
        this.mState = state.STANDING;
        
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
        
        this.setSpeed(0);
        this.walking = false;
        this.mState = state.EXTENDING;
        
    }
    
//    this._providePrintout();
    
    this._updateAnimation();
    this.mSprite.updateAnimation();
    
    GameObject.prototype.update.call(this);
};

Hero.prototype.draw = function (camera) {
    
    GameObject.prototype.draw.call(this, camera);
    
    if(this.mTongue !== null){
        this.mTongue.draw(camera);
    }
    
};

Hero.prototype.getDirection = function () {
    
    return this.mDirection;
    
};

Hero.prototype._providePrintout = function () {
  
    var statePrintout;
    switch(this.mState){
        case state.WALKING:
            statePrintout = "WALKING";
            break;
        case state.STANDING:
            statePrintout = "STANDING";
            break;
        case state.EXTENDING:
            statePrintout = "EXTENDING";
            break;
    }
    
    var directionPrintout;
    switch(this.mDirection){
        case direction.LEFT:
            directionPrintout = "LEFT";
            break
        case direction.RIGHT:
            directionPrintout = "RIGHT";
            break   
    }
    
    
    console.log("state: ", statePrintout, " direction: ", directionPrintout);
    
    
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