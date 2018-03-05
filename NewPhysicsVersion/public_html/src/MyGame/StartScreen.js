/*
 * File: StartScreen.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light, BlockManager, HelperFunctions */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function StartScreen() {
    this.kBG = "assets/SplashScreen.png";
    this.BGWidth = 1024;
    this.initialLightLevel = 3.5;
    this.CameraCanvasWidth = HelperFunctions.Core.getCameraWidth();
    this.CameraCenter = HelperFunctions.Core.getCameraCenter();
    this.CanvasWidth = HelperFunctions.Core.getCanvasWidth();
    this.CanvasHeight = HelperFunctions.Core.getCanvasHeight();
    
    // The camera to view the scene
    this.mCamera = null;
    this.mStatusMsg = null;
}
gEngine.Core.inheritPrototype(StartScreen, Scene);

StartScreen.prototype.loadScene = function () {
        gEngine.Textures.loadTexture(this.kBG);
};

StartScreen.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();
    gEngine.Textures.unloadTexture(this.kBG);
    
    var nextLevel = new MyGame();  // load the next level
    gEngine.Core.startScene(nextLevel);
};

StartScreen.prototype.initialize = function () {
    this.mCamera = new Camera(
        vec2.fromValues(this.CameraCenter, this.CameraCenter),  // position of the camera
        this.CameraCanvasWidth,                                 // width of camera
        [0, 0, this.CanvasWidth, this.CanvasWidth]              // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    //intialize background
    var bgR = new LightRenderable(this.kBG);
    bgR.setElementPixelPositions(0, this.CameraCanvasWidth, 0, this.CameraCanvasWidth-200);
    bgR.getXform().setSize(this.BGWidth, this.BGWidth);
    bgR.getXform().setPosition(this.CameraCenter, this.CameraCenter);
    this.mBG = new GameObject(bgR);
    
    this.mStatusMsg = new FontRenderable("");
    this.mStatusMsg.setColor([1, 1, 1, 1]);
    this.mStatusMsg.getXform().setPosition(this.CanvasWidth / 2 - 150, 40);
    this.mStatusMsg.setTextHeight(32);
    this.mStatusMsg.setText("Press SPACEBAR to start game...");
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mStatusMsg);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eBackground, this.mBG);
    gEngine.DefaultResources.setGlobalAmbientIntensity(this.initialLightLevel);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
StartScreen.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([1, 1, 1, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    gEngine.LayerManager.drawAllLayers(this.mCamera);
};

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
StartScreen.prototype.update = function () {
      if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
                gEngine.GameLoop.stop();
            }
};