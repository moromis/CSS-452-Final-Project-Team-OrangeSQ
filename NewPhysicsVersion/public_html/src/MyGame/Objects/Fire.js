/*jslint node: true, vars: true */
/*global gEngine, GameObject,CameraManager, LightRenderable, IllumRenderable, HelperFunctions, SpriteAnimateRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Fire(spriteTexture,bg, igloo, lightmanager) {

    this.kDelta = 15;
    this.size = 64;
    this.downSize = 1.5;

    this.mSprite = new LightRenderable(spriteTexture);
    this.mSprite.setColor([1, 1, 1, 0]);
    this.mSprite.getXform().setPosition(HelperFunctions.Core.generateRandomFloat(0, 960), 640);
    this.mSprite.setSpriteSequence(this.size, 0, this.size, this.size, 3, 0);
    this.mSprite.setAnimationSpeed(15);
    this.mSprite.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mSprite.getXform().setSize(this.size, this.size);
    this.mSprite.setElementPixelPositions(0, this.size, 0, this.size);

   
    this.mlight = lightmanager.createLight(1);
    this.mSprite.addLight(this.mlight);
    bg.addLight(this.mlight);
    igloo.addLight(this.mlight);
    GameObject.call(this, this.mSprite);

    this.shouldScore = false;
    this.scoreAmount = 0;
    this.dangerHeight = 240;

    this.focusCamera = null;

    this.mParticles = null;
    var r = new RigidRectangle(this.getXform(), this.size, this.size);
    this.setPhysicsComponent(r);
}
gEngine.Core.inheritPrototype(Fire, GameObject);

Fire.prototype.shouldDie = function () {

    if (!this.isVisible() && this.mParticles === null) {

        this.mlight.setLightTo(false);
        return true;
    }
    return false;
};

Fire.prototype.getScore = function () {

    if (this.shouldScore)
        return Math.floor(this.scoreAmount);
    else
        return 0;
};

Fire.prototype.handleCollision = function (otherObjectType) {

    var pos = this.getXform().getPosition();

//    console.log(otherObjectType);
  
    if(otherObjectType === "Block" || otherObjectType === "Water" || otherObjectType === "Hero"){
       
        if(this.isVisible()){

            this.mParticles = new ParticleGameObjectSet();
            this.mParticles.addEmitterAt(
                    [pos[0], pos[1] - this.size / this.downSize / 2], 200,
                    this.createParticle);
            this.mParticles.update(); // start emit immediately

            this.setVisibility(false);
        }
    }

    if (otherObjectType === "Water") {
        this.shouldScore = true;
        this.scoreAmount = pos[1];
    }
     this.mlight.setLightTo(false);
};

Fire.prototype.relocate = function (x, y) {

    this.mSprite.getXform().setPosition(x, y);
};

Fire.prototype.update = function () {

    var pos = this.getXform().getPosition();
    //call parent update
    GameObject.prototype.update.call(this);

    if (this.isVisible()) {

        if (pos[1] < 0) {
            this.setVisibility(false);
            this.mlight.setLightTo(false);
        }

        if (pos[1] < this.dangerHeight) {
            if (this.focusCamera === null) {
                this.focusCamera = CameraManager.Core.checkoutCamera();
            }
        }

        if (this.focusCamera !== null) {
            this.focusCamera.setWCCenter(pos[0], pos[1]);
        }

        //update Y position    
        this.interpolateBy(0, -this.kDelta);
        this.mlight.setYPos(this.mSprite.getXform().getYPos());
        this.mlight.setXPos(this.mSprite.getXform().getXPos());

        //update the sprite's animation    
        this.mSprite.updateAnimation();

    } else {
        if (this.focusCamera !== null) {

            CameraManager.Core.returnCamera();
            this.focusCamera = null;
        }
        if (this.mParticles !== null) {
            this.mParticles.update();  // this will remove expired particles
            if (this.mParticles.size() === 0) // all gone
                this.mParticles = null;
        }
        return;
    }
};

Fire.prototype.draw = function (camera) {

    // draw the projectile only if it has some interesting speed
    if (this.mParticles !== null) {
        this.mParticles.draw(camera);
    }

    GameObject.prototype.draw.call(this, camera);

};

Fire.prototype.createParticle = function (atX, atY) {

    var life = 30 + Math.random() * 200;
    var p = new ParticleGameObject("assets/particle.png", atX, atY, life);
    p.getRenderable().setColor([1, 0.2, 0, 1]);

    // size of the particle
    var r = 20 + Math.random() * 2.5;
    p.getXform().setSize(r, r);

    // final color
    var fr = 0.2;
    var fg = 0.2;
    var fb = 0.2;
    p.setFinalColor([fr, fg, fb, 0.6]);

    // velocity on the particle
//    var fx = 10 * Math.random() - 20 * Math.random();
//    var fy = 20 * Math.random();
//    p.getParticle().setVelocity([fx, fy]);

    // size delta
    p.setSizeDelta(0.7);

    return p;
};



