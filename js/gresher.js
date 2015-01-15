
// constructor
Gresher = function()
{
    this.stage;
    
    this.paused = false;
    this.setupPIXIStage();
    //this.currentscene = new GameScene(this.stage);

    //load sound file sound_file_manifest
    this.sound_file_load_queue;
    this.sound_file_manifest = [
            {id: "solar_seas_minimal", src: "Solar-seas-A-mix-3-minimal.mp3"},
            {id: "solar_seas_basic", src: "Solar-seas-A-mix-1.mp3"},
            {id: "laser_shot", src: "Game-Shot.mp3"},
            {id: "nes_laser_shot", src: "energy-6.wav"},
            {id: "nes_laser_shot2", src: "energy-2.wav"}
        ]
    
    this.image_file_loader;     
    this.images_loaded = 0;       
   
    this.loadSound();  
    this.loadGraphics();  
    this.currentscene = new LoadingScene(this.stage, this.sound_file_load_queue);
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

    if (params.type == "flash") {
        createjs.Sound.registerPlugins([createjs.FlashAudioPlugin]);
    } else if (params.type == "html5") {
        createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin]);
    } else {
        createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashAudioPlugin]);
    }
    
    // Compression Mods
    //console.log(createjs.Sound.activePlugin.dynamicsCompressorNode);

    // Instantiate a sound_file_load_queue.
    this.sound_file_load_queue = new createjs.LoadQueue(true, "assets/audio/");

    createjs.Sound.alternateExtensions = ["mp3"];   // add other extensions to try loading if the src file extension is not supported
    this.sound_file_load_queue.installPlugin(createjs.Sound);
        this.sound_file_load_queue.addEventListener("fileload", this.fileLoaded);
    this.sound_file_load_queue.loadManifest(this.sound_file_manifest);

};

Gresher.prototype.loadGraphics = function(){

    var assetsToLoader = [ "assets/sprites/spritesheet.json"];    
    this.image_file_loader = new PIXI.AssetLoader(assetsToLoader);
    this.image_file_loader.onProgress = this.fileLoaded;
    this.image_file_loader.load();
    
}

Gresher.prototype.fileLoaded = function(event) {
    
    if (event.loaded == true){
        gresher.images_loaded = 1;
    }

    if ((gresher.sound_file_load_queue.progress == 1) && (gresher.images_loaded == 1)){
        gresher.currentscene = new GameScene(gresher.stage);
    }

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

