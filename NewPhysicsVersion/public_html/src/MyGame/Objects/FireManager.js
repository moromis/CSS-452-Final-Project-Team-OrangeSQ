/*jslint node: true, vars: true */
/*global gEngine: false, GameObjectSet: false, SpriteRenderable: false, 
 * HelperFunctions: false, Manager: false, Fire: false, HelperFunctions */
/* find out more about jslint: http://www.jslint.com/help.html */

function FireManager (fireTexture, angryFireTexture, meteorTexture, bombTexture, heroPos, low, high, bg, igloo, lightManager, blockManager) {
    
    Manager.call(this, fireTexture, Fire, low, high, true);
    
    this.low;
    this.high;
    this.fireTexture = fireTexture;
    this.angryFireTexture = angryFireTexture;
    this.meteorTexture = meteorTexture;
    this.bombTexture = bombTexture;
    this.heroPos = heroPos;
    this.maxFires = 20;
    this.mbg= bg;
    this.migloo= igloo;
    this.lightManager = lightManager;
    this.blockManager = blockManager;
    
    for(var i = 0; i < 2; i++) {
          var mObject = new AngryFire(this.angryFireTexture, 
            this.heroPos,this.mbg,this.migloo, 
            this.lightManager,
            this.blockManager
          );
            
          this.addToSet(mObject);
    }
    
    for(var i = 2; i < 4; i++) {
         var mObject = new Meteor(this.meteorTexture,
            this.mbg,
            this.migloo, 
            this.lightManager,
            this.blockManager
         );
            
        this.addToSet(mObject);
        
    }
    
    for(var i = 4; i < 19; i++) {
        var mObject = new Fire(this.fireTexture,this.mbg,this.migloo, this.lightManager);
        this.addToSet(mObject);
    }
    
         
            var mObject = new Bomb(this.bombTexture,
            this.mbg,
            this.migloo, 
            this.lightManager,
            this.blockManager);
            this.addToSet(mObject);
    
    
    
    
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

    this.low *= 0.9999;
    this.high *= 0.9999;
    this.setLowAndHigh(this.low, this.high);
};

FireManager.prototype.autoSpawn = function(){
    this._toggleAutospawn();
};

FireManager.prototype._createObject = function () {
 
    var randomNumber = HelperFunctions.Core.generateRandomInt(0, 20);
    

this.score += this.getObjectAt(randomNumber).getScore();
    //add weight to object
    var toSpawn = this.getObjectAt(randomNumber);
//    console.log(toSpawn.getPhysicsComponent().getInvMass());
    toSpawn.getPhysicsComponent().setMass(1);
    //console.log(toSpawn);

    toSpawn.setVisibility(true);
    toSpawn.mlight.setLightTo(true);
    toSpawn.shouldMoveFunction(true);
};

FireManager.prototype.deleteFires = function(){
    this.deleteAll();
    this.lightManager.removeLights();
};