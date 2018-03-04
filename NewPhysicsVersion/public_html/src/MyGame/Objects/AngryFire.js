/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable, HelperFunctions, SpriteAnimateRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function AngryFire(spriteTexture, heroPos, bg, igloo) {
    
    this.heroPos = heroPos;
//    this.currentHeroPos = heroPos[0] + 8;
    this.kDelta = 1;
    this.size = 64;
    this.downSize = 1;
    this.interp = null;
    
    this.mSprite = new LightRenderable(spriteTexture);
    this.mSprite.setColor([1, 1, 1, 0]);
    this.mSprite.getXform().setPosition(HelperFunctions.Core.generateRandomFloat(0, 960), 640);
    this.mSprite.setSpriteSequence(this.size, 0, this.size, this.size, 3, 0);
    this.mSprite.setAnimationSpeed(15);
    this.mSprite.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mSprite.getXform().setSize(this.size / this.downSize, this.size / this.downSize);
    this.mSprite.setElementPixelPositions(0, this.size, 0, this.size);
   
    this.mlightObj = new LightObj();
    this.mlight = this.mlightObj._initializeLights();
    var pos = this.mSprite.getXform().getPosition();
    this.mlight.setXPos(pos[0]);
    this.mlight.setYPos(pos[1]);
    this.mSprite.addLight(this.mlight);
    bg.addLight(this.mlight);
    igloo.addLight(this.mlight);
    GameObject.call(this, this.mSprite);
    
    this.shouldScore = false;
    this.scoreAmount = 0;
    
    this.mParticles = null;
    
     var r = new RigidRectangle(this.getXform(), 31, 62);
     r.setDrawBounds(true);

     this.setPhysicsComponent(r);
}
gEngine.Core.inheritPrototype(AngryFire, GameObject);

AngryFire.prototype.shouldDie = function () {
    
    if(!this.isVisible() && this.mParticles === null) {
            return true;
    }
    
    return false;
    
};

AngryFire.prototype.getScore = function () {
    
    if(this.shouldScore)
        return Math.floor(this.scoreAmount * 1.5);
    else
        return 0;
    
};

AngryFire.prototype.handleCollision = function (otherObjectType) {
  
    var pos = this.getXform().getPosition();
  
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
    
    if(otherObjectType === "Water"){
        this.shouldScore = true;
        this.scoreAmount = pos[1];
    }
    
};

AngryFire.prototype.relocate = function (x, y) {
  
    this.mSprite.getXform().setPosition(x, y);
    
};

AngryFire.prototype.update = function () {
    
    //call parent update
    GameObject.prototype.update.call(this);
    
    var currentPos = this.getXform().getPosition();
    
    if(this.isVisible()){
        
        //update Y position    
        this.interpolateBy(0,-this.kDelta);
        this.mlight.setYPos(this.mSprite.getXform().getYPos());
        
        //update X position
        if(currentPos[0] > this.heroPos[0])
            this.getXform().incXPosBy(-1.5);
        else if(currentPos[0] < this.heroPos[0])
            this.getXform().incXPosBy(1.5);

        //update the sprite's animation    
        this.mSprite.updateAnimation();
        
    }else{
        
        if (this.mParticles !== null) {
            this.mParticles.update();  // this will remove expired particles
            if (this.mParticles.size() === 0) // all gone
                this.mParticles = null;
        }
        return;
    }
};

AngryFire.prototype.draw = function (camera) {
  
    // draw the projectile only if it has some interesting speed
    if (this.mParticles !== null) {
        this.mParticles.draw(camera);
    }
    
    GameObject.prototype.draw.call(this, camera);

};

AngryFire.prototype.createParticle = function(atX, atY) {
    
    var life = 30 + Math.random() * 200;
    var p = new ParticleGameObject("assets/particle.png", atX, atY, life);
    p.getRenderable().setColor([1, 0.2, 0, 1]);
    
    // size of the particle
    var r = 40 + Math.random() * 2.5;
    p.getXform().setSize(r, r);
    
    // final color
    var fr = 0.5;
    var fg = 0.5;
    var fb = 0.5;
    p.setFinalColor([fr, fg, fb, 0.6]);
    
    // velocity on the particle
    var fx = 10 * Math.random() - 20 * Math.random();
    var fy = 20 * Math.random();
//    p.getParticle().setVelocity([fx, fy]);
    
    // size delta
    p.setSizeDelta(0.98);
    
    return p;
};



