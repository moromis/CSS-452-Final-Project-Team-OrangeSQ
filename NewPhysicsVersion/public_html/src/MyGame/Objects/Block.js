/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Block(spriteTexture, size, x, y, camera) {
    
    this.size = size;
    
    this.mSprite = new TextureRenderable(spriteTexture);
    this.mSprite.setColor([1, 1, 1, 0]);
    this.mSprite.getXform().setPosition(x, y);
    this.mSprite.getXform().setSize(size, size);
    this.camera = camera;
   // this.mSprite.setElementPixelPositions(0, size * 2, 0, size * 2);
    

    GameObject.call(this, this.mSprite);
    
     var rigidShape = new RigidRectangle(this.getXform(), size, size);
        rigidShape.setMass(0);  // ensures no movements!
    rigidShape.setDrawBounds(true);
    rigidShape.setColor([0, 0, 1, 1]);
    this.setPhysicsComponent(rigidShape);

    //this.toggleDrawRenderable();
   // this.toggleDrawRigidShape();

}
gEngine.Core.inheritPrototype(Block, GameObject);

Block.prototype.getScore = function () {
    
    return 0;
    
};

Block.prototype.shouldDie = function () {
    
    if(!this.isVisible())
        return true;
    
    return false;
    
};

Block.prototype.handleCollision = function (otherObjectType) {
    
    if(otherObjectType === "Fire"){
        this.setVisibility(false);
    }
    
};

Block.prototype.update = function () {
    
        GameObject.prototype.update.call(this);

};



