/*jslint node: true, vars: true */
/*global gEngine: false, GameObjectSet: false, SpriteRenderable: false, 
 * HelperFunctions: false, Manager: false, Fire: false, HelperFunctions */
/* find out more about jslint: http://www.jslint.com/help.html */

function FireManager (fireTexture, angryFireTexture, meteorTexture, heroPos, low, high, bg, igloo, lightManager, blockManager) {
    
    Manager.call(this, fireTexture, Fire, low, high, false);
    
    this.low;
    this.high;
    this.fireTexture = fireTexture;
    this.angryFireTexture = angryFireTexture;
    this.meteorTexture = meteorTexture;
    this.heroPos = heroPos;
    this.maxFires = 20;
    this.mbg= bg;
    this.migloo= igloo;
    this.lightManager = lightManager;
    this.blockManager = blockManager;
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
 
    var randomNumber = HelperFunctions.Core.generateRandomInt(0, 1000); 
    if(this.size() < this.maxFires){
        
        //create light

        //1 in 100 chance to spawn an angry fire
        if(randomNumber >= 100 && randomNumber < 200){
            
            var mObject = new AngryFire(this.angryFireTexture, 
            this.heroPos,this.mbg,this.migloo, 
            this.lightManager,
            this.blockManager);
            this.addToSet(mObject);

        //1 in 1000 chance to spawn a meteor
        }else if(randomNumber === 42){
         
            var mObject = new Meteor(this.meteorTexture,
            this.mbg,
            this.migloo, 
            this.lightManager,
            this.blockManager);
            this.addToSet(mObject);
            
        //if we don't create a special fire, just create a normal one    
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