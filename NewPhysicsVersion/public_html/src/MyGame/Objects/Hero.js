/* File: Hero.js 
 *
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable, HelperFunctions */
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

function Hero(spriteTexture, size, x, y, speed) {
    
    this.kDelta = speed;
    this.size = size;
    
    this.mSprite = new LightRenderable(spriteTexture);
    this.mSprite.setColor([1, 1, 1, 0]);
    this.mSprite.getXform().setPosition(x, y);
    this.mSprite.setSpriteSequence(size, 0, size, size, 2, 0);
    this.mSprite.setAnimationSpeed(15);
    this.mSprite.getXform().setSize(size, size);
    this.mSprite.setElementPixelPositions(0, size, 0, size);
    GameObject.call(this, this.mSprite);
    
    this.mState = state.STANDING;
    this.mDirection = direction.RIGHT;
    this.justStartedWalking = false;
    
    this.walkingTimerLimit = 8;
    this.walkingTimer = this.walkingTimerLimit;
    
    this.atLeftEdge = false;
    this.atRightEdge = false;
}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.update = function () {

    this._clamp();
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Left) || gEngine.Input.isKeyClicked(gEngine.Input.keys.Right)){
        this.justStartedWalking = true;
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        
        if(this.mState !== state.EXTENDING && this.atRightEdge && this.mDirection !== direction.LEFT){
            this.mDirection = direction.LEFT;
            this.mState = state.STANDING;
            this.walkingTimer = 0;
        }else if(this.mState !== state.EXTENDING && this._canWalk()){
            this.getXform().incXPosBy(-64);
            this.mDirection = direction.LEFT;
            this.mState = state.WALKING;
        }
        
    }else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        
        if(this.mState !== state.EXTENDING && this.atLeftEdge && this.mDirection !== direction.RIGHT){
            this.mDirection = direction.RIGHT;
            this.mState = state.STANDING;
            this.walkingTimer = 0;
        }else if(this.mState !== state.EXTENDING && this._canWalk() && !this.atRightEdge){
            this.getXform().incXPosBy(64);
            this.mDirection = direction.RIGHT;
            this.mState = state.WALKING;
        }
            
    }else{
        
        this.setCurrentFrontDir([0, 0]);
        this.mState = state.STANDING;
        
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
        
        this.walking = false;
        this.mState = state.EXTENDING;
        
    }
    
    //enable this line to see informative printout
//    this._providePrintout();
    
    this._updateAnimation();
    this.mSprite.updateAnimation();
    
    GameObject.prototype.update.call(this);
};

Hero.prototype.getDirection = function () {
    
    return this.mDirection;
    
};

Hero.prototype.getX = function () {
    
    return this.getXform().getPosition()[0];
    
};

Hero.prototype._clamp = function () {
  
    var x = this.getX();
    var minCameraX = HelperFunctions.Core.getCameraMinX();
    var maxCameraX = HelperFunctions.Core.getCameraMaxX();
    
    if(x === minCameraX)
        this.atLeftEdge = true;
    else
        this.atLeftEdge = false;
    if(x === maxCameraX)
        this.atRightEdge = true;
    else
        this.atRightEdge = false;
};

Hero.prototype._canWalk = function () {
    
    if(this.walkingTimer >= this.walkingTimerLimit){
        this.walkingTimer = 0;
        return true;
    }else{
        this.walkingTimer++;
        return false;
    }
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
    
    var pos = this.getXform().getPosition();
    
    console.log("position: ",  pos[0], pos[1], "state: ", statePrintout, 
    " direction: ", directionPrintout, " atLeftEdge: ", this.atLeftEdge, 
    " atRightEdge: ", this.atRightEdge, " canWalk: ", this._canWalk());
    
    
};

Hero.prototype._updateAnimation = function () {
    
    switch(this.mDirection){
        case direction.LEFT:
            switch(this.mState){
                case state.STANDING:
                    this.mSprite.setSpriteSequence(this.size, 0, this.size, this.size, 0, 0);
                    break;
                case state.WALKING:
                    if(this.justStartedWalking){
                        this.mSprite.setSpriteSequence(this.size, 0, this.size, this.size, 2, 0);
                        this.justStartedWalking = !this.justStartedWalking;
                    }
                    break;
            case state.EXTENDING:
                    this.mSprite.setSpriteSequence(this.size, this.size * 4, this.size, this.size, 0, 0);
                    break;
            }
        break;
        case direction.RIGHT:
            switch(this.mState){
                case state.STANDING:
                    this.mSprite.setSpriteSequence(this.size, this.size * 3, this.size, this.size, 0, 0);
                    break;
                case state.WALKING:
                    if(this.justStartedWalking){
                        this.mSprite.setSpriteSequence(this.size, this.size * 2, this.size, this.size, 2, 0);
                        this.justStartedWalking = !this.justStartedWalking;
                    }
                    break;
            case state.EXTENDING:
                    this.mSprite.setSpriteSequence(this.size, this.size * 5, this.size, this.size, 0, 0);
                    break;
            }
    }
        
    
};