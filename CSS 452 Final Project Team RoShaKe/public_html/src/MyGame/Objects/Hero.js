/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hero(spriteTexture, size, atX, atY) {
    
    this.kDelta = 1;
    this.size = size;
    
    this.mSprite = new LightRenderable(spriteTexture);
    this.mSprite.setColor([1, 1, 1, 0]);
    this.mSprite.getXform().setPosition(atX, atY);
    this.mSprite.setSpriteSequence(size, 0, size, size, 2, 0);
    this.mSprite.setAnimationSpeed(15);
    this.mSprite.getXform().setSize(16, 16);
    this.mSprite.setElementPixelPositions(0, size, 0, size);
    GameObject.call(this, this.mSprite);
    
    this.walking = false;
    this.facingRight = false;
}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.update = function () {
    
    var xform = this.getXform();
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        
        this.facingRight = false;
        xform.incXPosBy(-this.kDelta);
        
        if(!this.walking){
            
            this.walking = true;
            this.mSprite.setSpriteSequence(this.size, 0, this.size, this.size, 2, 0);
        }
        
    }else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        
        this.facingRight = true;
        xform.incXPosBy(this.kDelta);
        
        if(!this.walking){
            
            this.walking = true;
            this.mSprite.setSpriteSequence(this.size, 2 * this.size, this.size, this.size, 2, 0);
        }
            
    }else{
        
        this.walking = false;
        if(this.facingRight === false)
            this.mSprite.setSpriteSequence(this.size, 0, this.size, this.size, 0, 0);
        else
            this.mSprite.setSpriteSequence(this.size, this.size + 2 * this.size, this.size, this.size, 0, 0);
        
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
        
    }
    
    console.log(this.walking);
    
    this.mSprite.updateAnimation();
};