/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
 Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
 GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light, BlockManager, HelperFunctions 
 ,CameraManager*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {

    this.kSnowman = "assets/Snowman@2x.png";
    this.kBlock = "assets/Block.png";
    this.kFire = "assets/Fire.png";
    this.kWater = "assets/Water.png";
    this.kBG = "assets/BG.png";
    this.kParticle = "assets/particle.png";
    this.kIgloo = "assets/Igloo.png";
    this.kIglooNormal = "assets/IglooNormalMap.png";
    this.kbgNormal = "assets/bgNormal.png";
    this.kAngryFire = "assets/FireWithEyes_2.png";
    this.kMeteor = "assets/comet.png";
    this.kBomb = "assets/bomb.png";

    this.BGWidth = 1024;
    this.CameraCanvasWidth = HelperFunctions.Core.getCameraWidth();
    this.CameraCenter = HelperFunctions.Core.getCameraCenter();
    this.CanvasWidth = HelperFunctions.Core.getCanvasWidth();
    this.CanvasHeight = HelperFunctions.Core.getCanvasHeight();
    this.HeroSize = 128;
    this.HeroSpeed = 300;
    this.BlockSize = 64;
    this.ScalingFactor = 1;
    this.SpawnTime = 60;

    this.IntroLight = true;
    this.initialLightLevel = 100;
    this.lightLevel = 3.4;

    this.nextNewBlock = 5000;
    this.nextNewBlockCount = 0;
    this.winningScore = 1000000;

    this.Timer = 0;
    this.TimingAmount = 4;

    this.mHero = null;
    this.mBlockManager = null;
    this.mFireManager = null;
    this.mWaterManager = null;
    this.mLightManager = null;
    this.mCamera = null;
    this.mScoreMsg = null;
    this.mStatusMsg = null;
    this.mHealthMsg = null;
    this.mIgloo = null;

    this.mAllObjs = null;
    this.mCollisionInfos = [];

    this.firstCamera = null;
    this.secondCamera = null;
    this.thirdCamera = null;
    this.fourthCamera = null;
    this.isLost = false;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {

    gEngine.Textures.loadTexture(this.kSnowman);
    gEngine.Textures.loadTexture(this.kBlock);
    gEngine.Textures.loadTexture(this.kFire);
    gEngine.Textures.loadTexture(this.kWater);
    gEngine.Textures.loadTexture(this.kBG);
    gEngine.Textures.loadTexture(this.kParticle);
    gEngine.Textures.loadTexture(this.kIgloo);
    gEngine.Textures.loadTexture(this.kIglooNormal);
    gEngine.Textures.loadTexture(this.kbgNormal);
    gEngine.Textures.loadTexture(this.kAngryFire);
    gEngine.Textures.loadTexture(this.kMeteor);
    gEngine.Textures.loadTexture(this.kBomb);
};

MyGame.prototype.unloadScene = function () {

    gEngine.LayerManager.cleanUp();
    gEngine.Textures.unloadTexture(this.kSnowman);
    gEngine.Textures.unloadTexture(this.kBlock);
    gEngine.Textures.unloadTexture(this.kFire);
    gEngine.Textures.unloadTexture(this.kWater);
    gEngine.Textures.unloadTexture(this.kBG);
    gEngine.Textures.unloadTexture(this.kParticle);
    gEngine.Textures.unloadTexture(this.kIgloo);
    gEngine.Textures.unloadTexture(this.kIglooNormal);
    gEngine.Textures.unloadTexture(this.kbgNormal);
    gEngine.Textures.unloadTexture(this.kAngryFire);
    gEngine.Textures.unloadTexture(this.kMeteor);
    gEngine.Textures.unloadTexture(this.kBomb);

    var nextLevel;
    if (this.isLost)
        nextLevel = new MyGame();  // load the next level
    else
        nextLevel = new StartScreen();
    gEngine.Core.startScene(nextLevel);
};

MyGame.prototype.initialize = function () {

    this.mCamera = new Camera(
            vec2.fromValues(this.CameraCenter, this.CameraCenter), // position of the camera
            this.CameraCanvasWidth, // width of camera
            [0, 0, this.CanvasWidth, this.CanvasWidth]              // viewport (orgX, orgY, width, height)
            );
    this.mCamera.setBackgroundColor([1, 1, 1, 1]);

    //setup score message
    this.mScoreMsg = new FontRenderable("Status Message");
    this.mScoreMsg.setColor([1, 1, 1, 1]);
    this.mScoreMsg.getXform().setPosition(32, this.CanvasHeight - 32);
    this.mScoreMsg.setTextHeight(24);

    //setup hero health message
    this.mHealthMsg = new FontRenderable("");
    this.mHealthMsg.setColor([1, 1, 1, 1]);
    this.mHealthMsg.getXform().setPosition(this.CanvasWidth - 140, this.CanvasHeight - 32);
    this.mHealthMsg.setTextHeight(24);

    //setup status message
    this.mStatusMsg = new FontRenderable("");
    this.mStatusMsg.setColor([1, 1, 0, 1]);
    this.mStatusMsg.getXform().setPosition(this.CanvasWidth / 2 - 60, this.CanvasHeight / 2);
    this.mStatusMsg.setTextHeight(32);

    //setup status message
    this.mRestartMsg = new FontRenderable("");
    this.mRestartMsg.setColor([1, 1, 1, 1]);
    this.mRestartMsg.getXform().setPosition(50, this.CanvasHeight / 2 -50);
    this.mRestartMsg.setTextHeight(32);

    //initialize hero object
    this.mHero = new Hero(this.kSnowman, this.HeroSize, this.CameraCenter, this.HeroSize, this.HeroSpeed);

    this.mLightManager = new LightManager();
    this.mIgloo = new Igloo(this.kIgloo, this.kIglooNormal, this.CameraCanvasWidth, this.mLightManager);


    //intialize background
    var bgR = new IllumRenderable(this.kBG, this.kbgNormal);
    bgR.setElementPixelPositions(0, this.CameraCanvasWidth, 0, this.CameraCanvasWidth - 200);
    bgR.getXform().setSize(this.BGWidth, this.BGWidth);
    bgR.getXform().setPosition(this.CameraCenter, this.CameraCenter);
    bgR.addLight(this.mLightManager.createLight(2));
    this.mBG = new GameObject(bgR);

    //initialize the block manager
    this.mBlockManager = new BlockManager(
            this.kBlock,
            this.CameraCanvasWidth / this.BlockSize + 1,
            this.BlockSize, this.BlockSize / 2,
            this.BlockSize / (this.ScalingFactor * 2),
            this.mCamera);
    this.mFireManager = new FireManager(
            this.kFire,
            this.kAngryFire,
            this.kMeteor,
            this.kBomb,
            this.mHero.getXform().getPosition(),
            this.SpawnTime,
            this.SpawnTime * 3,
            this.mBG, this.mIgloo,
            this.mLightManager,
            this.mBlockManager);
    this.mWaterManager = new WaterManager(this.kWater);

    //add everything to the correct layergEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mIgloo);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mScoreMsg);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mHealthMsg);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mStatusMsg);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mRestartMsg);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.mFireManager);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.mBlockManager);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mIgloo);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mWaterManager);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mHero);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eBackground, this.mBG);

    gEngine.DefaultResources.setGlobalAmbientIntensity(this.initialLightLevel);

    CameraManager.Core.initCameraManager(4, this.CanvasHeight / 4);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {

    // Step A: clear the canvas
    gEngine.Core.clearCanvas([1, 1, 1, 1.0]); // clear to light gray

    CameraManager.Core.draw();
    this.mCollisionInfos = [];
    this.mCamera.setupViewProjection();
    gEngine.LayerManager.drawAllLayers(this.mCamera);

};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
//    console.log(this.mHero.isDead(), " and ", this.mFireManager.getScore());

    if (this.mHero.isAlive()) {

        if (this.mFireManager.getScore() < this.winningScore) {

            CameraManager.Core.update();
            this.mCamera.update();

            gEngine.LayerManager.updateAllLayers();

//            this.nextNewBlockCount = this.mFireManager.getScore() % this.nextNewBlock;
//            if(this.nextNewBlockCount > 4500){
//                this.mBlockManager.replaceBlock();
//            }

//            this.nextNewBlockCount = this.mFireManager.getScore() % this.nextNewBlock;
//            if(this.nextNewBlockCount > 4500){
//                this.mBlockManager.replaceBlock();
//            }

            this.mWaterManager.updatePosition(this.mHero.getXform().getPosition(), this.mHero.getDirection());

            this.bootUpLight();

            this.checkDevKeys();

            //only need to call one way, handles collisions on both managers' objects  
            var collisionInfo = new CollisionInfo();

            //collisions (physics)
            this.mBlockManager.checkCollisions(this.mFireManager, collisionInfo);
            this.mFireManager.checkCollisions(this.mWaterManager, collisionInfo);
            //per pixel collision
            this.mFireManager.checkCollisionsWith(this.mHero);

            //text updates
            this.mScoreMsg.setText("Score: " + this.mFireManager.getScore());
            this.mHealthMsg.setText("Health: " + this.mHero.getHealth());

        } else {
            //win message
            this.mStatusMsg.setText("YOU WIN!");
            this.finishGame();
        }

    } else {
        //lose message
        this.mStatusMsg.setText("You Lose!");
        this.finishGame();
    }

    // Hero platform
    gEngine.Physics.processObjSet(this.mHero, this.mBlockManager);
    gEngine.Physics.processObjSet(this.mIgloo, this.mBlockManager);
    this.mIgloo.update();
};

MyGame.prototype.finishGame = function ()
{

    this.mFireManager.deleteFires();
    this.mLightManager.switchOffAll();
    gEngine.DefaultResources.setGlobalAmbientIntensity(1.5);
    this.mRestartMsg.setText("Press: 'R' to restart, 'S' for SplashScreen ");
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.S)) {
        gEngine.GameLoop.stop();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        this.isLost = true;
        gEngine.GameLoop.stop();
    }
};

MyGame.prototype.bootUpLight = function () {

    //Booting up light sequence
    var intensity = gEngine.DefaultResources.getGlobalAmbientIntensity();
    if (intensity > this.lightLevel)
        if (this.Timer >= this.TimingAmount) {
            gEngine.DefaultResources.setGlobalAmbientIntensity(intensity / 2);
            this.Timer = 0;
        } else
            this.Timer++;

};

MyGame.prototype.checkDevKeys = function () {


    //dev key to relocate all fire objects
    if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)) {
        var mousePosition = CameraManager.Core.getMouseLocation();
        this.mFireManager.relocate(mousePosition[0], mousePosition[1]);
    }

    //dev key to increment score
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.I)) {
        this.mFireManager.incrementScoreBy(5000);
    }
//    else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.I)) {
//        this.mFireManager.incrementScoreBy(10000);
//    }

    //camera checkout keys for testing
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.One)) {
        this.firstCamera = CameraManager.Core.checkoutIthCamera(0);
        if (this.firstCamera === null)
            CameraManager.Core.returnIthCamera(0);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Two)) {
        this.secondCamera = CameraManager.Core.checkoutIthCamera(1);
        if (this.secondCamera === null)
            CameraManager.Core.returnIthCamera(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Three)) {
        this.thirdCamera = CameraManager.Core.checkoutIthCamera(2);
        if (this.thirdCamera === null)
            CameraManager.Core.returnIthCamera(2);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Four)) {
        this.fourthCamera = CameraManager.Core.checkoutIthCamera(3);
        if (this.fourthCamera === null)
            CameraManager.Core.returnIthCamera(3);
    }
};