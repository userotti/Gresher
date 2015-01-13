LoadingScene = function(stage, loading_queue)
{   
    this.camera = new PIXI.Camera();
    this.world = new PIXI.SmaatObjectContainer();
    this.loading_bar = new PIXI.SmaatGraphics();

    
    
    this.loading_queue = loading_queue;
    
    this.resizeScene();
    this.world.addChild(this.loading_bar);
    stage.addChild(this.world);

    
};

// constructor

LoadingScene.prototype.constructor = LoadingScene;

LoadingScene.prototype.sceneUpdate = function()
{
    var window_width = window.innerWidth;
    this.camera.zoom = 1.1;// - (1 * ((Math.pow(this.player.vel.x,2) + Math.pow(this.player.vel.y,2))));
    
    this.loading_bar.clear();
    

    this.loading_bar.beginFill(0xbb3355, 1);    
    
        this.loading_bar.moveTo(0,0);
        this.loading_bar.lineTo(0,100);

        this.loading_bar.lineTo(window_width*this.loading_queue.progress,100);
        this.loading_bar.lineTo(window_width*this.loading_queue.progress,0);
                            
    this.loading_bar.endFill();    

    

};

LoadingScene.prototype.mouseClick = function(mousepos)
{
    this.mouseclickpos = mousepos;
};   

LoadingScene.prototype.resizeScene = function(){

    this.camera.screenCenterView(window.innerWidth/2,window.innerHeight/2);

} 