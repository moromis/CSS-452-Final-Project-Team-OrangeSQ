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

            //create an object
            this._createObject();
            
            //calculate a new timer between this.low and this.high seconds long
            this.timer = HelperFunctions.Core.generateRandomFloat(this.low, this.high);
        }
    }
    
    //check the lifetimes of the objects
    for(var i = 0; i < this.size(); i++){
        if(this.getObjectAt(i).shouldDie()){
            this.removeObject(i);
        }
    }
    
};


Manager.prototype.checkCollisions = function (objSet) {
    
    //check collisions with all objects in this object set
    //with all the objects in the other set
    for(var i = 0; i < this.size(); i++){
        if(objSet.isCollidingWith(this.getObjectAt(i))){
            this.getObjectAt(i).handleCollision();
        }
    }
};

Manager.prototype.isHit = function (obj) {
    
    for(var i = 0; i < this.size(); i++){
        if(this.getObjectAt(i).isCollidingWith(obj)){
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


