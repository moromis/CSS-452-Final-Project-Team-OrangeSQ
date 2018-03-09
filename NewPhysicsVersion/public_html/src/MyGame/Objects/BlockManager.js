/*jslint node: true, vars: true */
/*global gEngine: false, GameObjectSet: false,AngryFire, SpriteRenderable: false, 
 * HelperFunctions: false, Manager: false, Block: false, HelperFunctions */
/* find out more about jslint: http://www.jslint.com/help.html */

function BlockManager(spriteTexture, blocksToCreate, size, x, y, camera) {
//    console.log(blocksToCreate);
//    console.log(size);

    Manager.call(this, spriteTexture, Block, 0, 0, false);

    this.blockSize = size;
    this.camera = camera;
    this.x = x;
    this.y = y;
    this.Blocks = new Array(blocksToCreate);
    this.Blocks.fill(true);

    this.blockCount = blocksToCreate;

    this.createBlocks();

    //store x and y for "collision" considerations with regards
    //to the hero object
    this.x = x - (size / 2);
    this.y = y;

}
gEngine.Core.inheritPrototype(BlockManager, Manager);

BlockManager.prototype.update = function () {

    //call parent update method
    Manager.prototype.update.call(this);

    //update the truth array for block "existence"
    for (var i = 0; i < this.size(); i++) {

        if (this.getObjectAt(i).isVisible)
            this.Blocks[i] = true;
        else
            this.Blocks[i] = false;
    }
};

BlockManager.prototype.checkCollisions = function (otherManager, collisionInfo) {
    Manager.prototype.checkCollisions.call(this, otherManager, collisionInfo);
};

BlockManager.prototype.reset = function () {
   this.deleteAll();
   this.createBlocks();
};

BlockManager.prototype._createMore = function () {
    this._placeObject(this.blockSize, this.x + this.blockSize * 2, this.y + this.blockSize, this.camera);
    this._placeObject(this.blockSize, this.x + this.blockSize * 4, this.y + this.blockSize, this.camera);

    this._placeObject(this.blockSize, this.x + this.blockSize * 5, this.y + this.blockSize, this.camera);
    this._placeObject(this.blockSize, this.x + this.blockSize * 8, this.y + this.blockSize, this.camera);
    this._placeObject(this.blockSize, this.x + this.blockSize * 9, this.y + this.blockSize, this.camera);
    this.blockCount+=4;
};

BlockManager.prototype.createBlocks = function () {
    for (var i = 0; i < this.blockCount; i++) {
        this._placeObject(this.blockSize,
                this.x + ((i - 1) * this.blockSize),
                this.y,
                this.camera);
    }
    this._createMore();
};