
// constructor
Gresher = function()
{
    this.stage;
    this.queue;
    this.paused = false;
    this.setupPIXIStage();
    //this.currentscene = new GameScene(this.stage);

    //loadfile manifest
    this.manifest = [
            {id: "solar_seas_minimal", src: "Solar-seas-A-mix-3-minimal.mp3"},
            {id: "solar_seas_basic", src: "Solar-seas-A-mix-1.mp3"},
            {id: "laser_shot", src: "Game-Shot.mp3"},
            {id: "nes_laser_shot", src: "nes-07-00.wav"}
        ]

   
    this.loadSound();    
    this.currentscene = new LoadingScene(this.stage, this.queue);
    this.setupInteraction(this.stage);
   

};

Gresher.prototype.constructor = Gresher;


Gresher.prototype.loadSound = function()
{
    var preload;
    if (preload != null) {
            preload.close();
    }

    var params = {};
    var pieces = window.location.search.slice(1).split("&");
    for (var i = 0, l = pieces.length; i < l; i++) {
        var parts = pieces[i].split("=");
        params[parts[0]] = parts[1];
    }

    
    var displayStatus;
    

    if (params.type == "flash") {
        createjs.Sound.registerPlugins([createjs.FlashAudioPlugin]);
    } else if (params.type == "html5") {
        createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin]);
    } else {
        createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashAudioPlugin]);
    }

    if (!createjs.Sound.isReady()) {
        document.getElementById("error").style.display = "block";
        document.getElementById("content").style.display = "none";
        return;
    }

    if (createjs.BrowserDetect.isIOS || createjs.BrowserDetect.isAndroid || createjs.BrowserDetect.isBlackberry) {
        document.getElementById("mobile").style.display = "block";
        document.getElementById("content").style.display = "none";
        return;
    }

        // Instantiate a queue.
    this.queue = new createjs.LoadQueue(true, "assets/audio/");

    createjs.Sound.alternateExtensions = ["mp3"];   // add other extensions to try loading if the src file extension is not supported
    this.queue.installPlugin(createjs.Sound);
        this.queue.addEventListener("fileload", this.fileLoaded);
        this.queue.addEventListener("fileprogress", this.handleFileProgress);
    this.queue.loadManifest(this.manifest);

};



Gresher.prototype.fileLoaded = function(event) {
        //console.log("soundFileLoaded", event);
    if (gresher.queue.progress == 1){
        gresher.currentscene = new GameScene(gresher.stage);

    }



}

Gresher.prototype.handleFileProgress = function(event) {

        console.log("preload progress", gresher.queue.progress);
               
}

Gresher.prototype.loadGraphics = function(){

    // create an array of assets to load, in the form of json files generated from TexturePacker
    var assetsToLoader = [ "SpriteSheet.json"];
    // create a new loader
    loader = new PIXI.AssetLoader(assetsToLoader);
    // use callback
    loader.onComplete = onAssetsLoaded
    //begin load
    loader.load();
    // holder to store aliens
    var aliens = [];
    var alienFrames = ["eggHead.png", "flowerTop.png", "helmlok.png", "skully.png"];
}


//setup the PIXI renderer and Stage
Gresher.prototype.setupPIXIStage = function()
{
    this.stage = new PIXI.Stage(0x0a1c43, true);
    this.renderer = PIXI.autoDetectRenderer(window.innerWidth/*window.devicePixelRatio*/,window.innerHeight/*window.devicePixelRatio*/);//, document.getElementById("main-canvas"), true, true);
    this.renderer.view.id = "main-canvas";
    this.renderer.view.style.display = "block";
    this.renderer.view.screencanvas = true;
    
    
};

Gresher.prototype.setupInteraction = function(stage)
{
    that = this;
    stage.click = function(mouseData){
        that.currentscene.mouseClick(mouseData.originalEvent);           
    }
    stage.tap = function(touchData){
        that.currentscene.mouseClick(touchData.global);           
    }
    stage.tap = function(touchData){
        that.currentscene.mouseClick(touchData.global);           
    }
};

//main game loop

Gresher.prototype.gameupdate = function() 
{
    if (this.paused == false){
        this.currentscene.sceneUpdate();
    }
    this.renderer.render(this.stage);
};

//game resize function

Gresher.prototype.resize = function(){
        this.currentscene.resizeScene();
        this.renderer.resize(window.innerWidth,window.innerHeight);
};

