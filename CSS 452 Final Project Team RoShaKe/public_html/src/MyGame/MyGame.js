/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light, BlockManager */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    
    this.kPyoro = "assets/PyoroWalk.png";
    this.kBlock = "assets/Block.png";
    this.kSeed = "assets/Seed.png";
    this.kBG = "assets/PyoroBG.png";
    this.kFG = "assets/PyoroFG.png";
    
    this.BGWidth = 144;
    this.CameraCanvasWidth = 256;
    this.CanvasWidth = 960;
    this.CameraCenter = 128;
    this.HeroSize = 64;
    this.BlockSize = 32;
    this.ScalingFactor = 4;
    this.BottomOfFrame = this.CameraCenter - (this.BGWidth / 2);
    
    this.mHero = null;
    this.mBlockManager = null;
    this.mSeedManager = null;
    this.mCamera = null;
    
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kPyoro);
    gEngine.Textures.loadTexture(this.kBlock);
    gEngine.Textures.loadTexture(this.kSeed);
    gEngine.Textures.loadTexture(this.kBG);
    gEngine.Textures.loadTexture(this.kFG);
};

MyGame.prototype.unloadScene = function () {
    
    gEngine.LayerManager.cleanUp();
    gEngine.Textures.unloadTexture(this.kPyoro);
    gEngine.Textures.unloadTexture(this.kBlock);
    gEngine.Textures.unloadTexture(this.kSeed);
    gEngine.Textures.unloadTexture(this.kBG);
    gEngine.Textures.unloadTexture(this.kFG);
};

MyGame.prototype.initialize = function () {
    
    this.mCamera = new Camera(
        vec2.fromValues(this.CameraCenter, this.CameraCenter),  // position of the camera
        this.CameraCanvasWidth,                                 // width of camera
        [0, 0, this.CanvasWidth, this.CanvasWidth]              // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    //initialize hero object
    this.mHero = new Hero(this.kPyoro, this.HeroSize, this.CameraCenter, this.BottomOfFrame + this.HeroSize / this.ScalingFactor);
    
    //intialize background
    var bgR = new LightRenderable(this.kBG);
    bgR.setElementPixelPositions(0, this.CameraCanvasWidth * (this.ScalingFactor / 2), 0, this.CameraCanvasWidth * (this.ScalingFactor / 2));
    bgR.getXform().setSize(this.BGWidth, this.BGWidth);
    bgR.getXform().setPosition(this.CameraCenter, this.CameraCenter);
    this.mBG = new GameObject(bgR);
    
    //initialize foreground
    var fgR = new SpriteRenderable(this.kFG);
    fgR.setElementPixelPositions(0, this.CameraCanvasWidth * this.ScalingFactor, 0, this.CameraCanvasWidth * this.ScalingFactor);
    fgR.getXform().setSize(this.CameraCanvasWidth, this.CameraCanvasWidth);
    fgR.getXform().setPosition(this.CameraCenter, this.CameraCenter);
    this.mFG = new GameObject(fgR);
    
    //initialize the block manager
    this.mBlockManager = new BlockManager(this.kBlock, 18, this.BlockSize, this.CameraCenter / 2, this.BottomOfFrame + this.BlockSize / (this.ScalingFactor * 2));
    
    this.mSeedManager = new SeedManager(this.kSeed);
    
    //add everything to the correct layer
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.mBlockManager);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.mSeedManager);
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
    this.mCamera.clampAtBoundary(this.mHero.getXform(), this.BGWidth / this.CameraCanvasWidth);
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(4);

};
