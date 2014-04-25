
// constructor
Gresher = function()
{
  
  
    this.setupPIXI();

    this.currentscene = new Gamescene(this.stage);


};

Gresher.prototype.constructor = Gresher;

//setup the PIXI renderer and Stage
Gresher.prototype.setupPIXI = function()
{
    


    this.stage = new PIXI.Stage(0x0a1c43, true);
    
  
    
    this.stage.setInteractive(true);

   

    this.renderer = PIXI.autoDetectRenderer(window.innerWidth/*window.devicePixelRatio*/,window.innerHeight/*window.devicePixelRatio*/);//, document.getElementById("main-canvas"), true, true);
    this.renderer.view.id = "main-canvas";
    this.renderer.view.style.display = "block";


    this.renderer.view.screencanvas = true;



    document.body.appendChild(this.renderer.view);
    
};

//mouse input function



Gresher.prototype.handleClickTap = function(data){

    
    this.currentscene.mouseClick(data);           

            
   
};

//main game loop

Gresher.prototype.gameupdate = function() {

      
        this.currentscene.sceneUpdate();

        this.renderer.render(this.stage);
        
 
};

//game resize function

Gresher.prototype.resize = function(){

      

        this.currentscene.resizeScene();

        this.renderer.resize(window.innerWidth,window.innerHeight);

};

