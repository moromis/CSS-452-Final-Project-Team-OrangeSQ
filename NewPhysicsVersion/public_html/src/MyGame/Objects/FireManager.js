/*jslint node: true, vars: true */
/*global gEngine: false, GameObjectSet: false, SpriteRenderable: false, 
 * HelperFunctions: false, Manager: false, Fire: false */
/* find out more about jslint: http://www.jslint.com/help.html */

function FireManager (spriteTexture, low, high) {
    
    Manager.call(this, spriteTexture, Fire, low, high, true);
    
}
gEngine.Core.inheritPrototype(FireManager, Manager);

FireManager.prototype.relocate = function (x, y) {
    
    for(var i = 0; i < this.size(); i++) {
        
        this.getObjectAt(i).relocate(x, y);
        
    }
    
};

FireManager.prototype.incrementScoreBy = function (increment){
  
    this.score += increment;
    
};

FireManager.prototype.update = function (){
  
    Manager.prototype.update.call(this);
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.F)){
        this._toggleAutospawn();
    }
    
};


