/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable, HelperFunctions, SpriteAnimateRenderable, Manager, TonguePiece */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function TongueManager(spriteTexture) {
    
    this.spriteSize = 64;
    this.numberOfSegments = 0;
    this.maxNumOfSegments = 8;
    
    Manager.call(this, spriteTexture, TonguePiece, 0, 0, 0, false);
    
    //the tongue tip is not counted in the number of segment
    this._placeObject(this.spriteSize, 120, 120);
    this.getObjectAt(0).setPiece(0);

}
gEngine.Core.inheritPrototype(TongueManager, Manager);

TongueManager.prototype.extend = function () {
        
    if(this.numberOfSegments < this.maxNumOfSegments){
        
        this.numberOfSegments++;
        this._placeObject(this.spriteSize, 50, 50);
    }
    
};

TongueManager.prototype.retract = function () {
    
    if(this.numberOfSegments > 0){
        
        this.removeObjectAt(this.numberOfSegments);
        this.numberOfSegments--;
    }
    
};

TongueManager.prototype.update = function () {
    
    Manager.prototype.update.call(this);
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up))
        this.extend();
    else
        this.retract();
    
};

TongueManager.prototype.updatePosition = function (pos, direction) {
    
    var obj = null;
    
    for(var i = 0; i < this.size(); i++){
        obj = this.getObjectAt(this.size() - 1 - i);
//        console.log(obj);
        console.log("my position: ", pos[0], pos[1]);
        console.log("direction: ", direction);
//        console.log("position: ", pos[0] + (i * this.spriteSize / 4), pos[1] + (i * this.spriteSize / 4))
//        obj.getXform().setPosition(128, 128);
        
        var divisor = 8;
        var offset = 8;

        if(direction === 0)
            obj.getXform().setPosition(pos[0] - (i * this.spriteSize / divisor) - offset, pos[1] + (i * this.spriteSize / divisor) + offset);
        
        if(direction === 1)
            obj.getXform().setPosition(pos[0] + (i * this.spriteSize / divisor) + offset, pos[1] + (i * this.spriteSize / divisor) + offset);
        
        obj.setDirection(direction);
    }
};

TongueManager.prototype.draw = function (camera) {
    
    if(this.size() > 1){
        Manager.prototype.draw.call(this, camera);
    }
};



