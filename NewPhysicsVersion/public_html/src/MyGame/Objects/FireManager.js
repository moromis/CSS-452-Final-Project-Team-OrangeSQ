/*jslint node: true, vars: true */
/*global gEngine: false, GameObjectSet: false, SpriteRenderable: false, 
 * HelperFunctions: false, Manager: false, Fire: false, HelperFunctions */
/* find out more about jslint: http://www.jslint.com/help.html */

function FireManager (fireTexture, angryFireTexture, heroPos, low, high) {
    
    Manager.call(this, fireTexture, Fire, low, high, true);
    
    this.low;
    this.high;
    this.fireTexture = fireTexture;
    this.angryFireTexture = angryFireTexture;
    this.heroPos = heroPos;
    this.maxFires = 1;
}
gEngine.Core.inheritPrototype(FireManager, Manager);

FireManager.prototype.relocate = function (x, y) {
    
    for(var i = 0; i < this.size(); i++) {
        
        this.getObjectAt(i).relocate(x, y);
        
    }
    
};
//
////overwrite parent method
//FireManager.prototype._createObject = function () {
//    
//    //add a new patrol to the set
//    var mObject = new this.object(this.sprite);
//    this.addToSet(mObject);
//    
//};

FireManager.prototype.incrementScoreBy = function (increment){
  
    this.score += increment;
    
};

FireManager.prototype.update = function (){
  
    Manager.prototype.update.call(this);
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.F)){
        this._toggleAutospawn();
    }
    
    this.low *= 0.999;
    this.high *= 0.999;
    this.setLowAndHigh(this.low, this.high);
    
};

FireManager.prototype._createObject = function (size, x, y) {
 
    var randomNumber = HelperFunctions.Core.generateRandomInt(0, 100);
//    console.log(randomNumber);
    
    if(this.size() < this.maxFires){
//    if(randomNumber === 42){
        
        var mObject = new AngryFire(this.angryFireTexture, this.heroPos);
        this.addToSet(mObject);
        
//    }else{
// 
//        var mObject = new Fire(this.fireTexture);
//        this.addToSet(mObject);
//    }
    }
};

//
//FireManager.prototype.draw = function (camera) {
//    
//    Manager.prototype.draw.call(this, camera);
//    
//};


