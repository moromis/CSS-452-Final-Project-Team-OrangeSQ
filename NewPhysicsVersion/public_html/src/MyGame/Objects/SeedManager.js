/*jslint node: true, vars: true */
/*global gEngine: false, GameObjectSet: false, SpriteRenderable: false, 
 * HelperFunctions: false, Manager: false, Seed: false */
/* find out more about jslint: http://www.jslint.com/help.html */

function SeedManager (spriteTexture, explosionManager, low, high) {
    
    this.explosionManager = explosionManager;
    Manager.call(this, spriteTexture, Seed, low, high, false);
    
}
gEngine.Core.inheritPrototype(SeedManager, Manager);

SeedManager.prototype.relocate = function (x, y) {
    
    for(var i = 0; i < this.size(); i++) {
        
        this.getObjectAt(i).relocate(x, y);
        
    }
    
};

//overwrite parent method
SeedManager.prototype._createObject = function () {
    
    //add a new patrol to the set
    var mObject = new this.object(this.sprite, this.explosionManager);
    this.addToSet(mObject);
    
};

//SeedManager.prototype.update = function (){
//  
//    Manager.prototype.update.call(this);
//    
//};
//
//SeedManager.prototype.draw = function (camera) {
//    
//    Manager.prototype.draw.call(this, camera);
//    
//};


