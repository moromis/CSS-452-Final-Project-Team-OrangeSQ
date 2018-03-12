/* File: Owl.js 
 *
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable, HelperFunctions */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var state = {
    WALKING: 0,
    STANDING: 1
};

var direction = {
    LEFT: 0,
    RIGHT: 1
};

function Owl(spriteTexture, size, x, y) {

    this.mSprite = new LightRenderable(spriteTexture);
    this.mSprite.setColor([1, 1, 1, 0]);
    this.mSprite.getXform().setPosition(x - size * 2, y);
    this.mSprite.setSpriteSequence(size, 0, size, size, 3, 0);
    this.mSprite.setAnimationSpeed(15);
    this.mSprite.getXform().setSize(size, size);
    this.mSprite.setElementPixelPositions(0, size, 0, size);
    
    this.size = size;
    
    this.actionLength = 5;
    this.mState = state.STANDING;
    this.mDirection = direction.LEFT;
    
    GameObject.call(this, this.mSprite);

}
gEngine.Core.inheritPrototype(Owl, GameObject);

Owl.prototype.update = function () {
    
    var xPos = this.getXform().getPosition()[0];
    var yPos = this.getXform().getPosition()[1];
    if(xPos > 936){
        this.getXform().setPosition(32, yPos);
    }else if(xPos < 20){
        this.getXform().setPosition(920, yPos);
    }
    
    
    var rand = HelperFunctions.Core.generateRandomInt(1, 100);
    
    if(this.actionLength === 0){
        
        if(rand > 2 && rand < 40){
            
            this.mState = state.WALKING;
            this.mDirection = direction.LEFT;
            
            
            //TODO: doesn't work
            this.interpolateBy(-10, 0);
            
        }else if(rand > 42 && rand < 70){
            
            this.mState = state.WALKING;
            this.mDirection = direction.RIGHT;
            
            //TODO: doesn't work
            this.interpolateBy(10, 0);
            
        }else{
            this.mState = state.STANDING;
        }
        
        console.log(rand);
        this._providePrintout();
        
        this.actionLength = HelperFunctions.Core.generateRandomInt(300, 600);
        
        this._updateAnimation();
        
    }else{
        
        this.actionLength--;
        
    }
    
    this.mSprite.updateAnimation();
};

Owl.prototype._updateAnimation = function () {

    switch (this.mState) {
        
        case state.WALKING:
            switch (this.mDirection) {
                case direction.RIGHT:
                    this.mSprite.setSpriteSequence(this.size, 0, this.size, this.size, 3, 0);
                    break;
                case direction.LEFT:
                    this.mSprite.setSpriteSequence(this.size, this.size * 3, this.size, this.size, 3, 0);
                    break;
            }
            break;
        case state.STANDING:
            this.mSprite.setSpriteSequence(this.size, this.size * 6, this.size, this.size, 9, 0);
            break;
        
    }
};

Owl.prototype._providePrintout = function () {

    var statePrintout;
    switch (this.mState) {
        case state.WALKING:
            statePrintout = "WALKING";
            break;
        case state.STANDING:
            statePrintout = "STANDING";
            break;
    }

    var directionPrintout;
    switch (this.mDirection) {
        case direction.LEFT:
            directionPrintout = "LEFT";
            break
        case direction.RIGHT:
            directionPrintout = "RIGHT";
            break
    }

    console.log("actionLength: ", this.actionLength, "state: ", statePrintout,
            " direction: ", directionPrintout);
};