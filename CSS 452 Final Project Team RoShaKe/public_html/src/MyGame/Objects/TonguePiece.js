/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function TonguePiece(spriteTexture, size, x, y) {
    
    this.size = 64;
    this.piece = 1;
    
    this.mSprite = new LightRenderable(spriteTexture);
    this.mSprite.setColor([1, 1, 1, 0]);
    this.mSprite.getXform().setPosition(x, y);
    this.mSprite.getXform().setSize(size / 4, size / 4);
    GameObject.call(this, this.mSprite);
    
}
gEngine.Core.inheritPrototype(TonguePiece, GameObject);

TonguePiece.prototype.setPiece = function (piece) {
    
    this.piece = piece;
    
};

TonguePiece.prototype.setDirection = function (dir) {
    
    var offset = this.size * this.piece + this.size * dir;

    if(this.piece === 0)
        
            this.mSprite.setElementPixelPositions(offset, offset + this.size, 0, this.size);
        
    else{
        
        offset += this.size;
        
        this.mSprite.setElementPixelPositions(offset, offset + this.size, 0, this.size);
    }
    
};

TonguePiece.prototype.shouldDie = function () {
    
    return false;
    
};

