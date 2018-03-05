/*jslint node: true, vars: true */
/*global gEngine: false, GameObjectSet: false, SpriteRenderable: false, 
 * HelperFunctions: false, Manager: false, Fire: false, HelperFunctions */
/* find out more about jslint: http://www.jslint.com/help.html */

function FireManager (fireTexture, angryFireTexture, heroPos, low, high,bg,igloo, lightManager) {
    
    Manager.call(this, fireTexture, Fire, low, high, true);
    
    this.low;
    this.high;
    this.fireTexture = fireTexture;
    this.angryFireTexture = angryFireTexture;
    this.heroPos = heroPos;
    this.maxFires = 20;
    this.mbg= bg;
    this.migloo= igloo;
    this.lightManager = lightManager;
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
  
//  console.log(this.size());
  
    Manager.prototype.update.call(this);
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.F)){
        this.autoSpawn();
    }
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.T)){
        this._createObject();
    }
    
    this.low *= 0.9999;
    this.high *= 0.9999;
    this.setLowAndHigh(this.low, this.high);
};

FireManager.prototype.autoSpawn = function(){
    this._toggleAutospawn();
};

FireManager.prototype._createObject = function () {
 
    var randomNumber = HelperFunctions.Core.generateRandomInt(0, 100); 
    if(this.size() < this.maxFires){
        
        //create light
        if(randomNumber >=42 && randomNumber <= 68){
            var mObject = new AngryFire(this.angryFireTexture, 
            this.heroPos,this.mbg,this.migloo, 
            this.lightManager);
            this.addToSet(mObject);

        }else{

            var mObject = new Fire(this.fireTexture,this.mbg,this.migloo, this.lightManager);
            this.addToSet(mObject);
        }
    }
};

FireManager.prototype.deleteFires = function(){
    this.deleteAll();
    this.lightManager.removeLights();
};