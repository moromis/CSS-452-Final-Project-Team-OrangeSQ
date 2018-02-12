/*jslint node: true, vars: true */
/*global gEngine: false, GameObjectSet: false, SpriteRenderable: false, 
 * HelperFunctions: false, Manager: false, Block: false */
/* find out more about jslint: http://www.jslint.com/help.html */

function BlockManager (spriteTexture, blocksToCreate, size, x, y) {
    
    Manager.call(this, spriteTexture, Block, 0, 0, false);
    
    this.Blocks = new Array(blocksToCreate);
    this.Blocks.fill(true);
    
    for(var i = 0; i < blocksToCreate; i++){
        
        this._placeObject(size, x - (size / 2) + (i * size), y);
        
    }
    
}
gEngine.Core.inheritPrototype(BlockManager, Manager);

//BlockManager.prototype.update = function (){
//  
//    Manager.prototype.update.call(this);
//    
//};
//
//BlockManager.prototype.draw = function (camera) {
//    
//    Manager.prototype.draw.call(this, camera);
//    
//};
