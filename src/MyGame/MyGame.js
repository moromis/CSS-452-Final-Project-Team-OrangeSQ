/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light, BlockManager, HelperFunctions */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    
    this.kSnowman = "assets/Snowman.png";
    this.kBlock = "assets/Block.png";
    this.kFire = "assets/Fire.png";
    this.kWater = "assets/Water.png";
    this.kBG = "assets/BG.png";
    this.kParticle = "assets/particle.png";
    
    this.BGWidth = 1024;
    this.CameraCanvasWidth = HelperFunctions.Core.getCameraWidth();
    this.CameraCenter = HelperFunctions.Core.getCameraCenter();
    this.CanvasWidth = HelperFunctions.Core.getCanvasWidth();
    this.CanvasHeight = HelperFunctions.Core.getCanvasHeight();
    this.HeroSize = 64;
    this.HeroSpeed = 5;
    this.BlockSize = 32;
    this.ScalingFactor = 1;
    this.SpawnTime = 60;
    
    this.IntroLight = true;
    this.initialLightLevel = 1024;
    this.lightLevel = 4;
    
    this.Timer = 0;
    this.TimingAmount = 4;
    
    this.mHero = null;
    this.mBlockManager = null;
    this.mFireManager = null;
    this.mWaterManager = null;
    this.mCamera = null;
    this.mScoreMsg = null;
    this.mStatusMsg = null;
    this.mHealthMsg = null;
    
    this.mAllObjs = null;
    this.mCollisionInfos = []; 


    
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    
    gEngine.Textures.loadTexture(this.kSnowman);
    gEngine.Textures.loadTexture(this.kBlock);
    gEngine.Textures.loadTexture(this.kFire);
    gEngine.Textures.loadTexture(this.kWater);
    gEngine.Textures.loadTexture(this.kBG);
    gEngine.Textures.loadTexture(this.kParticle);
};

MyGame.prototype.unloadScene = function () {
    
    gEngine.LayerManager.cleanUp();
    gEngine.Textures.unloadTexture(this.kSnowman);
    gEngine.Textures.unloadTexture(this.kBlock);
    gEngine.Textures.unloadTexture(this.kFire);
    gEngine.Textures.unloadTexture(this.kWater);
    gEngine.Textures.unloadTexture(this.kBG);
    gEngine.Textures.unloadTexture(this.kParticle);
};

MyGame.prototype.initialize = function () {
    
    this.mCamera = new Camera(
        vec2.fromValues(this.CameraCenter, this.CameraCenter),  // position of the camera
        this.CameraCanvasWidth,                                 // width of camera
        [0, 0, this.CanvasWidth, this.CanvasWidth]              // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    //setup score message
    this.mScoreMsg = new FontRenderable("Status Message");
    this.mScoreMsg.setColor([1, 1, 1, 1]);
    this.mScoreMsg.getXform().setPosition(32, this.CanvasHeight - 32);
    this.mScoreMsg.setTextHeight(16);
    
    //setup hero health message
    this.mHealthMsg = new FontRenderable("");
    this.mHealthMsg.setColor([1, 1, 1, 1]);
    this.mHealthMsg.getXform().setPosition(this.CanvasWidth - 128, this.CanvasHeight - 32);
    this.mHealthMsg.setTextHeight(16);
    
    //setup status message
    this.mStatusMsg = new FontRenderable("");
    this.mStatusMsg.setColor([0, 0, 0, 1]);
    this.mStatusMsg.getXform().setPosition(this.CanvasWidth / 2 - 32, this.CanvasHeight / 2);
    this.mStatusMsg.setTextHeight(32);
    
    //initialize hero object
    this.mHero = new Hero(this.kSnowman, this.HeroSize, this.CameraCenter,  this.CameraCenter-400, this.HeroSpeed);
    
    //intialize background
    var bgR = new LightRenderable(this.kBG);
    bgR.setElementPixelPositions(0, this.CameraCanvasWidth, 0, this.CameraCanvasWidth);
    bgR.getXform().setSize(this.BGWidth, this.BGWidth);
    bgR.getXform().setPosition(this.CameraCenter, this.CameraCenter);
    this.mBG = new GameObject(bgR);
    
    //initialize the block manager
    this.mBlockManager = new BlockManager(this.kBlock, this.CameraCanvasWidth / this.BlockSize + 1, this.BlockSize, this.BlockSize / 2, this.BlockSize / (this.ScalingFactor * 2));
    
    this.mFireManager = new FireManager(this.kFire, this.SpawnTime, this.SpawnTime * 3);
    
    this.mWaterManager = new WaterManager(this.kWater);
    
//    this.mAllObjs = new GameObjectSet();

//    for(var i = 0; i < this.mBlockManager.size(); i++) {
//        this.mAllObjs.addToSet(this.mBlockManager.mSet[i]);
//    }
//    this.mAllObjs.addToSet(this.mHero);
//    console.log(this.mAllObjs.mSet);
//    console.log(this.mBlockManager.mSet);
    
    //add everything to the correct layer
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mScoreMsg);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mHealthMsg);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mStatusMsg);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.mFireManager);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.mBlockManager);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mWaterManager);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mHero);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eBackground, this.mBG);
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(this.initialLightLevel);

};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    gEngine.LayerManager.drawAllLayers(this.mCamera);
    
    this.mCollisionInfos = []; 

        
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
       

    
//    console.log(this.mHero.isDead(), " and ", this.mFireManager.getScore());
    
    if(this.mHero.isAlive()){
        
        if(this.mFireManager.getScore() < 100000){
        
            this.mCamera.update();

            gEngine.LayerManager.updateAllLayers();

            this.mWaterManager.updatePosition(this.mHero.getXform().getPosition(), this.mHero.getDirection());

            //Booting up light sequence
            var intensity = gEngine.DefaultResources.getGlobalAmbientIntensity();
            if(intensity > this.lightLevel)
                if(this.Timer >= this.TimingAmount){
                    gEngine.DefaultResources.setGlobalAmbientIntensity(intensity / 2);
                    this.Timer = 0;
                }else
                    this.Timer++;

            //dev key to relocate all fire objects
            if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)){
                this.mFireManager.relocate(this.mCamera.mouseWCX(), this.mCamera.mouseWCY());
            }
            
            //dev key to increment score
            if(gEngine.Input.isKeyPressed(gEngine.Input.keys.I)){
                this.mFireManager.incrementScoreBy(10000);
            }

            //only need to call one way, handles collisions on both managers' objects  
            var collisionInfo = new CollisionInfo();

            this.mBlockManager.checkCollisions(this.mFireManager, collisionInfo);
            this.mFireManager.checkCollisions(this.mWaterManager, collisionInfo);
           this.mFireManager.checkCollisionsWith(this.mHero, collisionInfo);
            this.mScoreMsg.setText("Score: " + this.mFireManager.getScore());
            this.mHealthMsg.setText("Health: " + this.mHero.getHealth());
            
        }else{
            
            this.mStatusMsg.setText("YOU WIN!");
            
        }
        
    }else{
        
        this.mStatusMsg.setText("You lose...");
        
    }
    
// Hero platform
    gEngine.Physics.processObjSet(this.mHero, this.mBlockManager);

 
};

 

