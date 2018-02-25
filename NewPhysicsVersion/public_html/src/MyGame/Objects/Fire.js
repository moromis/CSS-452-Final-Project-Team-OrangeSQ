/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable, HelperFunctions, SpriteAnimateRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Fire(spriteTexture, explosionManager) {
    
    this.kDelta = 1;
    this.size = 64;
    this.downSize = 1.5;
    
    this.mSprite = new LightRenderable(spriteTexture);
    this.mSprite.setColor([1, 1, 1, 0]);
    this.mSprite.getXform().setPosition(HelperFunctions.Core.generateRandomFloat(0, 960), 640);
    this.mSprite.setSpriteSequence(this.size, 0, this.size, this.size, 3, 0);
    this.mSprite.setAnimationSpeed(15);
    this.mSprite.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mSprite.getXform().setSize(this.size / this.downSize, this.size / this.downSize);
    this.mSprite.setElementPixelPositions(0, this.size, 0, this.size);
    GameObject.call(this, this.mSprite);
    
    this.mParticles = null;
}
gEngine.Core.inheritPrototype(Fire, GameObject);

Fire.prototype.shouldDie = function () {
    
    if(!this.isVisible() && this.mParticles === null) {
            return true;
    }
    
    return false;
    
};

Fire.prototype.handleCollision = function (otherObjectType) {
  
    if(otherObjectType === "Block" || otherObjectType === "Water"){
        
        var pos = this.getXform().getPosition();
        
        this.mParticles = new ParticleGameObjectSet();
        this.mParticles.addEmitterAt(
                [pos[0], pos[1] - this.size / this.downSize / 2], 200, 
        this.createParticle);
        this.mParticles.update(); // start emit immediately
        
        this.setVisibility(false);
    }
    
};

Fire.prototype.relocate = function (x, y) {
  
    this.mSprite.getXform().setPosition(x, y);
    
};

Fire.prototype.update = function () {
    
    //call parent update
    GameObject.prototype.update.call(this);
    
    if(this.isVisible()){
        
        //update Y position    
        this.mSprite.getXform().incYPosBy(-this.kDelta);

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

Fire.prototype.draw = function (camera) {
  
    // draw the projectile only if it has some interesting speed
    if (this.mParticles !== null) {
        this.mParticles.draw(camera);
    }
    
    GameObject.prototype.draw.call(this, camera);

};

Fire.prototype.createParticle = function(atX, atY) {
    
    var life = 30 + Math.random() * 200;
    var p = new ParticleGameObject("assets/particle.png", atX, atY, life);
    p.getRenderable().setColor([1, 0.2, 0, 1]);
    
    // size of the particle
    var r = 20 + Math.random() * 2.5;
    p.getXform().setSize(r, r);
    
    // final color
    var fr = 0.5;
    var fg = 0.5;
    var fb = 0.5;
    p.setFinalColor([fr, fg, fb, 0.6]);
    
    // velocity on the particle
    var fx = 10 * Math.random() - 20 * Math.random();
    var fy = 20 * Math.random();
    p.getParticle().setVelocity([fx, fy]);
    
    // size delta
    p.setSizeDelta(0.98);
    
    return p;
};



