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

function Hero(spriteTexture, size, x, y, speed, blockSize) {

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

    this.health = 3;
    this.movementSpeed = 4;

    this.name = "Hero";

    var xform = this.getXform();
    var r = new RigidRectangle(xform, size-30, size-30 + blockSize);
//    console.log(this);

    r.setMass(0.01);
    r.setRestitution(0);
    r.setColor([0, 1, 0, 1]);
    r.setDrawBounds(true);
    //  r.setDrawBounds(true);
    //r.setAcceleration(-5);
    this.setPhysicsComponent(r);
    //this.toggleDrawRenderable();
    // this.toggleDrawRigidShape();

}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.update = function () {

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Left) || gEngine.Input.isKeyClicked(gEngine.Input.keys.Right)) {

        //when left or right is called for the first time, we should change
        //the sprite sequence to a walking sprite sequence. here we change
        //a boolean to let the state manager know that the sequence should change.
        this.justStartedWalking = true;
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        if(this.mState !== state.EXTENDING){
            this.interpolateBy(-this.kDelta,0);
            
            this.mDirection = direction.LEFT;
            this.mState = state.WALKING;
        }
        
    }else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        
        if(this.mState !== state.EXTENDING){
            this.interpolateBy(this.kDelta,0);

            this.mDirection = direction.RIGHT;
            this.mState = state.WALKING;
        }

    } else {

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

Hero.prototype.handleCollision = function (otherObjectType) {

    if (otherObjectType === "Fire") {
        this.health--;
    }

};

Hero.prototype.getType = function () {

    return "Hero";

};

Hero.prototype.isAlive = function () {

    return (this.isVisible() && this.getXform().getYPos() > 0 && this.health > 0);

};

Hero.prototype.getHealth = function () {

    return this.health;

};

Hero.prototype.getDirection = function () {

    return this.mDirection;

};

Hero.prototype.getX = function () {

    return this.getXform().getPosition()[0];

};

Hero.prototype._providePrintout = function () {

    var statePrintout;
    switch (this.mState) {
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
    switch (this.mDirection) {
        case direction.LEFT:
            directionPrintout = "LEFT";
            break
        case direction.RIGHT:
            directionPrintout = "RIGHT";
            break
    }

    var pos = this.getXform().getPosition();

    console.log("position: ", pos[0], pos[1], "state: ", statePrintout,
            " direction: ", directionPrintout, " atLeftEdge: ", this.atLeftEdge,
            " atRightEdge: ", this.atRightEdge, " canWalk: ", this._canWalk());


};

Hero.prototype._updateAnimation = function () {

    switch (this.mDirection) {
        case direction.LEFT:
            switch (this.mState) {
                case state.STANDING:
                    this.mSprite.setSpriteSequence(this.size, 0, this.size, this.size, 0, 0);
                    break;
                case state.WALKING:

                    if (this.justStartedWalking) {
                        this.mSprite.setSpriteSequence(this.size, this.size * 1, this.size, this.size, 2, 0);
                        this.justStartedWalking = !this.justStartedWalking;
                    }
                    break;
                case state.EXTENDING:
                    this.mSprite.setSpriteSequence(this.size, this.size * 4, this.size, this.size, 0, 0);
                    break;
            }
            break;
        case direction.RIGHT:
        switch (this.mState) {
            case state.STANDING:
                this.mSprite.setSpriteSequence(this.size, this.size * 3, this.size, this.size, 0, 0);
                break;
            case state.WALKING:
                if (this.justStartedWalking) {
                    this.mSprite.setSpriteSequence(this.size, this.size * 1, this.size, this.size, 2, 0);
                    this.justStartedWalking = !this.justStartedWalking;
                }
                break;
            case state.EXTENDING:
                this.mSprite.setSpriteSequence(this.size, this.size * 5, this.size, this.size, 0, 0);
                break;
        }
    }


};