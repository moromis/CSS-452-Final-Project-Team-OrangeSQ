/*jslint node: true, vars: true */
/*global gEngine: false, GameObjectSet: false, SpriteRenderable: false, 
 * HelperFunctions: false, Manager: false, Block: false */
/* find out more about jslint: http://www.jslint.com/help.html */

function BlockManager (spriteTexture, blocksToCreate, size, x, y) {
//    console.log(blocksToCreate);
//    console.log(size);

    Manager.call(this, spriteTexture, Block, 0, 0, false);
    
    this.Blocks = new Array(blocksToCreate);
    this.Blocks.fill(true);
    
    this._placeObject(size, x -size, y+ size);
    for(var i = 0; i < blocksToCreate; i++){
        
        this._placeObject(size, x - (size) + (i * size), y);
        
    }
    
        this._placeObject(size, x - size + (blocksToCreate * size), y+ size);

    //store x and y for "collision" considerations with regards
    //to the hero object
    this.x = x - (size / 2);
    this.y = y;
    
}
gEngine.Core.inheritPrototype(BlockManager, Manager);

BlockManager.prototype.update = function (){
  
    //call parent update method
    Manager.prototype.update.call(this);
    
    //update the truth array for block "existence"
    for(var i = 0; i < this.size(); i++) {
        
        if(this.getObjectAt(i).isVisible)
            this.Blocks[i] = true;
        else
            this.Blocks[i] = false;
    }
};


//
//BlockManager.prototype.draw = function (camera) {
//    
//    Manager.prototype.draw.call(this, camera);
//    
//};
