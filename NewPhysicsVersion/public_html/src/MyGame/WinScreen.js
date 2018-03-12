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

function WinScreen(score) {
    
    this.score = score;
    
    this.kBG = "assets/BGIce.png";
    this.BGWidth = 1024;
    
    this.initialLightLevel = 3.5;
    this.CameraCanvasWidth = HelperFunctions.Core.getCameraWidth();
    this.CameraCenter = HelperFunctions.Core.getCameraCenter();
    this.CanvasWidth = HelperFunctions.Core.getCanvasWidth();
    this.CanvasHeight = HelperFunctions.Core.getCanvasHeight();

    // The camera to view the scene
    this.mCamera = null;
    this.mStatusMsg = null;
  
    this.kStartAudio = "assets/sounds/start.wav";

    this.kStartScreneAudio = "assets/sounds/Magical_Winter_MP3.mp3";
    
    this.nextLevel = null;

}
gEngine.Core.inheritPrototype(WinScreen, Scene);

WinScreen.prototype.loadScene = function () {
  
    gEngine.AudioClips.loadAudio(this.kStartScreneAudio);
    gEngine.AudioClips.loadAudio(this.kStartAudio);

    gEngine.Textures.loadTexture(this.kBG);
  
};

WinScreen.prototype.unloadScene = function () {
  
    gEngine.AudioClips.unloadAudio(this.kStartAudio);
    gEngine.AudioClips.stopBackgroundAudio();
  
    gEngine.LayerManager.cleanUp();
    gEngine.Textures.unloadTexture(this.kBG);
    
    gEngine.Core.startScene(this.nextLevel);
};

WinScreen.prototype.initialize = function () {
  
    gEngine.AudioClips.playBackgroundAudio(this.kStartScreneAudio);

    this.mCamera = new Camera(
            vec2.fromValues(this.CameraCenter, this.CameraCenter), // position of the camera
            this.CameraCanvasWidth, // width of camera
            [0, 0, this.CanvasWidth, this.CanvasWidth]              // viewport (orgX, orgY, width, height)
            );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    //intialize background
    var bgR = new LightRenderable(this.kBG);
    bgR.setElementPixelPositions(0, this.CameraCanvasWidth, 0, this.CameraCanvasWidth - 200);
    bgR.getXform().setSize(this.BGWidth, this.BGWidth);
    bgR.getXform().setPosition(this.CameraCenter, this.CameraCenter);
    this.mBG = new GameObject(bgR);
    
    var highscore = localStorage.getItem("highscore");
    var gotHighScore = "";
    var newHighScore = "";

    if(highscore !== null){
        if (this.score > highscore) {
            localStorage.setItem("highscore", this.score);
            newHighScore = "NEW HIGH SCORE";
            gotHighScore = "your score is a high score!";
        }else{
            newHighScore = "Current High Score";
            gotHighScore = "Better luck next time";
            this.score = highscore;
        }
    }
    else{
        localStorage.setItem("highscore", this.score);
        newHighScore = "NEW HIGH SCORE";
        gotHighScore = "your score is a high score!";
    }
    
    this.mNew = new FontRenderable(newHighScore);
    this.mNew.setColor([0, 0, 0, 1]);
    this.mNew.getXform().setPosition(150, 550);
    this.mNew.setTextHeight(64);
    
    this.mScore = new FontRenderable(this.score);
    this.mScore.setColor([0, 0, 0, 1]);
    this.mScore.getXform().setPosition(320, 350);
    this.mScore.setTextHeight(128);
    
    this.mScoreMsg = new FontRenderable(gotHighScore);
    this.mScoreMsg.setColor([0, 0, 0, 1]);
    this.mScoreMsg.getXform().setPosition(260, 120);
    this.mScoreMsg.setTextHeight(32);

    this.mStatusMsg = new FontRenderable("SPACEBAR - Restart Game...");
    this.mStatusMsg.setColor([0, 0, 0, 1]);
    this.mStatusMsg.getXform().setPosition(250, 40);
    this.mStatusMsg.setTextHeight(32);
    
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mNew);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mScore);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mScoreMsg);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mStatusMsg);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eBackground, this.mBG);
    gEngine.DefaultResources.setGlobalAmbientIntensity(this.initialLightLevel);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
WinScreen.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([1, 1, 1, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    gEngine.LayerManager.drawAllLayers(this.mCamera);
};

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
WinScreen.prototype.update = function () {
  
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
      
        gEngine.AudioClips.playACue(this.kStartAudio);
        this.nextLevel = new MyGame();

        gEngine.GameLoop.stop();
    }
};