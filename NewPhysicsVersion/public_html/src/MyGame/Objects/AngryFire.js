/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable,vec3,Fire,Light, IllumRenderable, HelperFunctions, SpriteAnimateRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function AngryFire(spriteTexture, heroPos,bg, igloo, lightmanager) {

    this.heroPos = heroPos;
//    this.currentHeroPos = heroPos[0] + 8;
    this.kDelta = 1;
    this.size = 64;
    this.downSize = 1;
    this.interp = null;

    Fire.call(this, spriteTexture,bg,igloo, lightmanager);

    this.mlight.setLightType(Light.eLightType.eSpotLight);
    this.mlight.setNear(300);
    this.mlight.setFar(350);
    this.mlight.setInner(1.4);
    this.mlight.setOuter(1.6);
    this.mlight.setIntensity(15);
    this.mlight.setColor([1,0,1,1]);
}
gEngine.Core.inheritPrototype(AngryFire, Fire);

AngryFire.prototype.update = function () {

    //call parent update
    Fire.prototype.update.call(this);
    var pos = this.getXform().getPosition();

    //update X position
    this.rotateObjPointTo(this.heroPos, 0.1);
    if (pos[0] > this.heroPos[0])
        this.getXform().incXPosBy(-1.5);
    else if (pos[0] < this.heroPos[0])
        this.getXform().incXPosBy(1.5);

    var fdr = this.getCurrentFrontDir();
    var dir = vec3.fromValues(fdr[0], fdr[1], this.mlight.getDirection()[2]);
    this.mlight.setDirection(dir);
};


