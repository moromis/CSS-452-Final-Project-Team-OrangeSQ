/*jslint node: true, vars: true */
/*global gEngine: false, GameObjectSet: false, SpriteRenderable: false, 
 * HelperFunctions: false, Manager: false, Seed: false */
/* find out more about jslint: http://www.jslint.com/help.html */

function SeedManager (spriteTexture, low, high) {
    
    Manager.call(this, spriteTexture, Seed, low, high, true);
    
}
gEngine.Core.inheritPrototype(SeedManager, Manager);

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


