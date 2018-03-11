/*jslint node: true, vars: true */
/*global gEngine: false,LightSet, GameObjectSet: false, SpriteRenderable: false, 
 * HelperFunctions: false, Manager: false, Light: false, HelperFunctions */
/* find out more about jslint: http://www.jslint.com/help.html */

function LightManager() {
    this.mLightSet = new LightSet();
    this.count = 0;
}

LightManager.prototype.addLight = function (light) {
    this.mLightSet.addToSet(light);
    this.count++;
};
LightManager.prototype.switchOffLight = function (light) {
    light.setLightTo(false);
};
LightManager.prototype.switchOnLight = function (light) {
    light.setLightTo(true);
};
LightManager.prototype.switchOffAll = function () {
    for (var i = 0; i < this.count; i++)
    {
        this.mLightSet.getLightAt(i).setLightTo(false);
    }
};
LightManager.prototype.createLight = function (val) {
//val=1 (point light), 2 = directional light, 3= spot light
    var light;
    if (val === 1)
    {
        var lobj = new LightObj();
        light = lobj.createPointLight();
    } else if (val === 2)
    {
        var lobj = new LightObj();
        light = lobj.createDirectionalLight();
    } else
    {
        var lobj = new LightObj();
        light = lobj.createSpotLight();
    }
    this.addLight(light);
    
//    console.log(this.mLightSet.numLights());
    return light;
};

LightManager.prototype.addLightsTo = function(obj){
  for(var i=0; i< this.count; i++)
      obj.addLight(this.mLightSet.getLightAt(i));  
};

LightManager.prototype.removeLights = function(){
    
  for(var i=0; i< this.count; i++)
  {
      if(!this.mLightSet.getLightAt(i).isLightOn())
      {
          this.mLightSet.removeFromSet(i);
          this.count--;
      }
  }
  
};