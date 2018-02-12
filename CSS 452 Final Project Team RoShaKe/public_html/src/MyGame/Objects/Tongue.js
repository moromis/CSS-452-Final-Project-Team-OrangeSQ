/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable, HelperFunctions, SpriteAnimateRenderable, GameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Tongue(spriteTexture) {
    
    this.sprite = spriteTexture;
    this.size = 64;
    this.numberOfSegments = 0;
    this.maxNumOfSegments = 2;
    
    GameObjectSet.call(this);
    
    this.addToSet(new GameObject());
}
gEngine.Core.inheritPrototype(Tongue, GameObjectSet);

Tongue.prototype.extend = function () {
    
    if(this.numberOfSegments < this.maxNumOfSegments){
        this.numberOfSegments++;
        this.addToSet();
    }
    
};

Tongue.prototype.retract = function () {
    
    if(this.numberOfSegments > 0){
        this.numberOfSegments--;
    }
    
};

Tongue.prototype.update = function () {
    
    GameObjectSet.prototype.update.call(this);
    
};

Tongue.prototype.update = function () {
    
    if(this.size() > 1){
        GameObjectSet.prototype.update.call(this);
    }
    
};



