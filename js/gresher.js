
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
    
   
   // pFilter.size.y = 1;
    //pFilter.dirty = false;
    

    this.stage = new PIXI.Stage(0x0a1c43, true);
    this.stage.setInteractive(true);

    //this.stage.filters = [pFilter];
    this.renderer = PIXI.autoDetectRenderer($(window).width(), $(window).height());
    this.renderer.view.id = "main-canvas";
    this.renderer.view.style.display = "block";

    document.body.appendChild(this.renderer.view);
    
};

//mouse input function

Gresher.prototype.handleMouse = function(){

    this.currentscene.mouseClick(this.stage.getMousePosition());           

            
   
};

//main game loop

Gresher.prototype.gameupdate = function() {

      
        this.currentscene.sceneUpdate();

        this.renderer.render(this.stage);
        
 
};

//game resize function

Gresher.prototype.resize = function(){

      

        this.currentscene.resizeScene();

        this.renderer.resize($(window).width(), $(window).height());

};

