/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    
    this.kSpriteSheet = "assets/PyoroWalk.png";
    this.kBG = "assets/PyoroBG.png";
    this.kFG = "assets/PyoroFG.png";
    
    this.mHero = null;
    this.mCamera = null;
    
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kSpriteSheet);
    gEngine.Textures.loadTexture(this.kBG);
    gEngine.Textures.loadTexture(this.kFG);
};

MyGame.prototype.unloadScene = function () {
    
    gEngine.LayerManager.cleanUp();
    gEngine.Textures.unloadTexture(this.kSpriteSheet);
    gEngine.Textures.unloadTexture(this.kBG);
    gEngine.Textures.unloadTexture(this.kFG);
};

MyGame.prototype.initialize = function () {
    
    this.mCamera = new Camera(
        vec2.fromValues(128, 128), // position of the camera
        256,                       // width of camera
        [0, 0, 960, 960]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    this.mHero = new Hero(this.kSpriteSheet, 64, 128, (128 - 72 + 16));
    
    var bgR = new LightRenderable(this.kBG);
    bgR.setElementPixelPositions(0, 128 * 4, 0, 128 * 4);
    bgR.getXform().setSize(145, 145);
    bgR.getXform().setPosition(128, 128);
    this.mBG = new GameObject(bgR);
    
    var fgR = new SpriteRenderable(this.kFG);
    fgR.setElementPixelPositions(0, 256 * 4, 0, 256 * 4);
    fgR.getXform().setSize(256, 256);
    fgR.getXform().setPosition(128, 128);
    this.mFG = new GameObject(fgR);
    
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mHero);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eBackground, this.mBG);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mFG);
    
    
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    gEngine.LayerManager.drawAllLayers(this.mCamera);
    
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    
    this.mCamera.update();
    
    gEngine.LayerManager.updateAllLayers();
    this.mCamera.clampAtBoundary(this.mHero.getXform(), 145/256);
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(4);

};
