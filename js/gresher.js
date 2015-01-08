
// constructor
Gresher = function()
{
    this.stage;
    this.paused = false;
    this.setupPIXIStage();
    this.currentscene = new Gamescene(this.stage);
    this.setupInteraction(this.stage);
    this.loadSound();

};

Gresher.prototype.constructor = Gresher;


Gresher.prototype.loadSound = function()
{
    // Create a single item to load.
    
    var assetsPath = "assets/audio/";
    var src_beat = assetsPath + "05-Binrpilot-Underground";
    var src_shot = assetsPath + "Game-Shot";
    
    createjs.Sound.alternateExtensions = ["mp3"];   // add other extensions to try loading if the src file extension is not supported
    //createjs.Sound.onLoadComplete = playSound;  // add a callback for when load is completed
    createjs.Sound.addEventListener("fileload", this.playBeat); // add an event listener for when load is completed
   // createjs.Sound.registerSound("assets/audio/05-Binrpilot-Underground.mp3");  // register sound, which preloads by default
   // createjs.Sound.registerSound("assets/audio/Game-Shot.mp3");
/*
    createjs.Sound.addEventListener("fileload", playShot); // add an event listener for when load is completed
    createjs.Sound.registerSound(src_shot);  // register sound, which preloads by default
*/
};

Gresher.prototype.playBeat = function(event) {
        soundInstance = createjs.Sound.play(event.src);  // start playing the sound we just loaded, storing the playing instance
     // let the user know what we are playing
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

