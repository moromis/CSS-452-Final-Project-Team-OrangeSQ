/* File: Platform.js 
 *
 * Creates and initializes a Platform
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, IllumRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Igloo(texture, normal,width, lightmanager) {
    this.mSprite = texture;
    this.mNormal =normal;
    this.mLightManager = lightmanager;
    this.size = 512; //from image diemnsions
    this.pos = vec2.fromValues(920,320); //wc in the scene
    
    var igl = new IllumRenderable(this.mSprite, this.mNormal);
    igl.setElementPixelPositions(0, width, 0,width);
    igl.getXform().setSize(512, 512);
    igl.getXform().setPosition(this.pos[0],this.pos[1]);
    this.light = this.mLightManager.createLight(3);
    this.light.set2DPosition([730, 80]);
    this.light.setColor([0.7, 0.7, 0, 1]);
    this.light.setDirection([-1, 0, -2]);
    this.light.setInner(1.5);
    this.light.setOuter(2.5);
    this.light.setNear(200);
    this.light.setFar(400);
    this.light.setIntensity(10);
    igl.addLight(this.light);
    this.kdelta = 0.07;
    GameObject.call(this, igl);

    var rigidShape = new RigidRectangle(this.getXform(), this.width, this.width);
    rigidShape.setMass(0);  // ensures no movements!
    rigidShape.setDrawBounds(true);
  //  rigidShape.setColor([0, 0, 1, 1]);
    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(Igloo, GameObject);

Igloo.prototype.update = function() {
    GameObject.prototype.update.call(this);
    var lowerLimit = 1;
    var upperLimit = 10;
    var lightIntensity = this.light.getIntensity();
    if(lightIntensity <= lowerLimit || lightIntensity >= upperLimit){
        this.kdelta = this.kdelta * -1;
    }
    
    lightIntensity += this.kdelta;   
    this.light.setIntensity(lightIntensity);
};

