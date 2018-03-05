/*jslint node: true, vars: true */
/*global gEngine: false, GameObjectSet: false, SpriteRenderable: false, 
 * HelperFunctions: false, Manager: false, Block: false, HelperFunctions */
/* find out more about jslint: http://www.jslint.com/help.html */

function BlockManager (spriteTexture, blocksToCreate, size, x, y, camera) {
//    console.log(blocksToCreate);
//    console.log(size);

    Manager.call(this, spriteTexture, Block, 0, 0, false);
    
    this.blockSize = size;
    this.camera = camera;
    
    this.Blocks = new Array(blocksToCreate);
    this.Blocks.fill(true);
    
    this._placeObject(size, x -size, y+ size);
    for(var i = 0; i < blocksToCreate; i++){
        
        this._placeObject(size, x + ((i - 1) * size), y, camera);
        
    }
    
        this._placeObject(size, x - size + (blocksToCreate * size), y+ size, camera);

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

//BlockManager.prototype.replaceBlock = function (){
//    
//    var indeces = [];
//    for(var i = 0; i < this.Blocks.length; i++) {
//        if(this.Blocks[i] === false)
//            indeces.push(i);
//    }
//    console.log(this.Blocks);
//    console.log(indeces);
//    
//    var index = indeces[HelperFunctions.Core.generateRandomInt(0, indeces.length)];
//    console.log("going to fix block", index);
////    this._placeObject(this.size, this.x + ((index - 1) * this.size), this.y);
//    this._placeObjectAtIndex(this.x + ((index - 1) * this.blockSize), this.y, index);
//    this.Blocks[index] === true;
//    
//};
//
//BlockManager.prototype._placeObjectAtIndex = function (x, y, index) {
// 
//    //add a new patrol to the set
//    var mObject = new this.object(this.sprite, this.blockSize, x, y, this.camera);
//    this.addObjectAt(index, mObject);
//    
//};

