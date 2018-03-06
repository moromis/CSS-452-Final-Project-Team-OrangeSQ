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
    RIGHT: 1,
    UP: 2
};

function Hero(spriteTexture, size, x, y, speed) {

    this.kDelta = speed;
    this.size = size;
    this.velocity = 1200;

    this.mSprite = new LightRenderable(spriteTexture);
    this.mSprite.setColor([1, 1, 1, 0]);
    this.mSprite.getXform().setPosition(x, y);
    this.mSprite.setSpriteSequence(size, 0, size, size, 2, 0);
    this.mSprite.setAnimationSpeed(15);
    this.mSprite.getXform().setSize(size*0.75, size*0.85);
    this.mSprite.setElementPixelPositions(0, size, 0, size);
    GameObject.call(this, this.mSprite);

    this.mState = state.STANDING;
    this.mDirection = direction.RIGHT;
    this.justStartedWalking = false;

    this.health = 3;
//    this.movementSpeed = 15;

    this.name = "Hero";

    var xform = this.getXform();
    var r = new RigidRectangle(xform, size / 2, size-20);
//    console.log(this);

    r.setMass(0.01);
    r.setRestitution(0);
    r.setColor([0, 1, 0, 1]);
    //r.setAcceleration(-5);
    r.setFriction(.085);
    r.setDrawBounds(true);
    this.setPhysicsComponent(r);
    //this.toggleDrawRenderable();
    // this.toggleDrawRigidShape();

}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.getSprite = function(){
  return this.mSprite;  
};

Hero.prototype.update = function () {

    var v = this.getPhysicsComponent().getVelocity();

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        //if (!gEngine.Input.isKeyPressed(gEngine.Input.keys.Space))
        //this.interpolateBy(-this.kDelta,0);
        v[0] = -this.kDelta;
        if (this.mState !== state.EXTENDING) {
            this.justStartedWalking = true;
            this.mDirection = direction.LEFT;
            this.mState = state.WALKING;
        }

    } else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
       if (!gEngine.Input.isKeyPressed(gEngine.Input.keys.Space))
        v[0] = this.kDelta;
        if (this.mState !== state.EXTENDING) {
            this.justStartedWalking = true;
            this.mDirection = direction.RIGHT;
            this.mState = state.WALKING;
        }

    } else {
        this.setCurrentFrontDir([0, 0]);
        this.mState = state.STANDING;
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)
            || gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
        if (v[1] < 1 && v[1] > -1) {
            v[1] = this.velocity; // Jump velocity
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)) {

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
            break;
        case direction.UP:
            switch (this.mState) {
                case state.STANDING:
                    this.mSprite.setSpriteSequence(this.size, this.size * 1, this.size, this.size, 0, 0);
                    break;
                case state.WALKING:
                    if (this.justStartedWalking) {
                        this.mSprite.setSpriteSequence(this.size, this.size * 1, this.size, this.size, 2, 0);
                        this.justStartedWalking = !this.justStartedWalking;
                    }
                    break;
                case state.EXTENDING:
                    this.mSprite.setSpriteSequence(this.size, this.size * 6, this.size, this.size, 0, 0);
                    break;
            }
            break;
    }


};