/*jslint node: true, vars: true */
/*global gEngine: false, GameObjectSet: false, SpriteRenderable: false, HelperFunctions: false */
/* find out more about jslint: http://www.jslint.com/help.html */

function Manager(spriteTexture, object, timer, high, low, autospawn) {
    
    this.sprite = spriteTexture;
    this.object = object;
    this.timer = timer;
    this.high = high;
    this.low = low;
    this.autoSpawn = autospawn;
    
    GameObjectSet.call(this);
}
gEngine.Core.inheritPrototype(Manager, GameObjectSet);

Manager.prototype.update = function (){
    
    //if the auto spawn counter has
    if(this.autoSpawn){
        
        //decrease the timer
        this.timer--;
        
        //if the timer has hit 0
        if(this.timer <= 0){

            //create a patrol
            this._createObject();
            
            //calculate a new timer between 120 - 180, 2-3 seconds
            this.timer = HelperFunctions.Core.generateRandomFloat(this.low, this.high);
        }
    }
    
    //check the lifetimes of the dye packs
    for(var i = 0; i < this.size(); i++){
        if(this.getObjectAt(i).shouldDie()){
            this.removeObject(i);
        }
    }
    
};


Manager.prototype.checkCollisions = function (objSet) {
    
    for(var i = 0; i < this.size(); i++){
        if(objSet.isHit(this.getObjectAt(i))){
            this.getObjectAt(i).collide();
        }
    }
};

Manager.prototype.isHit = function (obj) {
    
    for(var i = 0; i < this.size(); i++){
        if(this.getObjectAt(i).isHit(obj)){
            return true;
        }
    }
    
    return false;
};

Manager.prototype._createObject = function () {
    
    //add a new patrol to the set
    var mObject = new this.object(this.sprite);
    this.addToSet(mObject);
    
};


