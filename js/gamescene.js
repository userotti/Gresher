Gamescene = function(stage)
{
  

    this.camera = new PIXI.Camera();
    this.hud = new PIXI.SmaatObjectContainer();
    

    this.world = new PIXI.SmaatObjectContainer();

    this.background_layer = new PIXI.SmaatObjectContainer();
    this.colidables_layer = new PIXI.SmaatObjectContainer();
    this.effects_layer = new PIXI.SmaatObjectContainer();
    
    
    this.world.addChild(this.background_layer);
    this.world.addChild(this.colidables_layer);
    this.world.addChild(this.effects_layer);

    this.level = new Level(this.effects_layer,this.colidables_layer,this.background_layer,1)

    this.player = Tower.create(BASICSTALAGMITE, ONSCREENRANDOM(), this.effects_layer, this.colidables_layer);
    this.player.controlled = true;





    this.camera.following =  this.player;
    this.camera.screenCenterView($(window).width()/2,$(window).height()/2);
    this.camera.addChild(this.world); 
    


    // add the camera and the hud to the stage
    stage.addChild(this.camera);
    stage.addChild(this.hud);


 

};

// constructor

Gamescene.prototype.constructor = Gamescene;

Gamescene.prototype.sceneUpdate = function()
{
    
        this.camera.zoom = 0.95;// - (1 * ((Math.pow(this.player.vel.x,2) + Math.pow(this.player.vel.y,2))));

        
        this.updateTowers();
        this.updateEffects();

        
    
};

Gamescene.prototype.updateEffects = function(){

    if (gamecore.DualPool.getPool(Shrap) != null){

            var nextShrap = gamecore.DualPool.getPool(Shrap).getUsedList().first;
            
            while( nextShrap )
            {
                
                nextShrap.obj.update();
                nextShrap = nextShrap.nextLinked;
    
            }

            nextShrap = gamecore.DualPool.getPool(Shrap).getUsedList().first;

            while( nextShrap )
            {
                
                if (nextShrap.obj.releaseMeFromList) {


                    nextShrap.obj.release();
                    this.effects_layer.removeChild(nextShrap.obj.body)
                    nextShrap = gamecore.DualPool.getPool(Shrap).getUsedList().first;

                }else{
                
                nextShrap = nextShrap.nextLinked;
                
                }
            }
            
    }

}

Gamescene.prototype.updateTowers = function(){

    if (gamecore.DualPool.getPool(Tower) != null){


            this.next_tower = gamecore.DualPool.getPool(Tower).getUsedList().first;
            while( this.next_tower )
            {
                this.next_tower.obj.update();
                this.next_tower = this.next_tower.nextLinked;
            }

            this.next_tower = gamecore.DualPool.getPool(Tower).getUsedList().first;

            while( this.next_tower )
            {
                                    
                if (this.next_tower.obj.alive == false) {

                    this.next_tower.obj.release();
                    this.colidables_layer.removeChild(this.next_tower.obj.sprite)
                    this.next_tower = gamecore.DualPool.getPool(Tower).getUsedList().first;

                }else{
                
                this.next_tower = this.next_tower.nextLinked;
                
                }
            }


        }

};

Gamescene.prototype.mouseClick = function(mousepos)
{
     this.mouseclickpos = mousepos;
        
    this.mouseclickposdist = Math.sqrt(Math.pow((this.camera.screen_midx - this.mouseclickpos.x),2) + Math.pow((this.camera.screen_midy - this.mouseclickpos.y),2));
    this.mouseclickposhoek = Math.atan2((this.camera.screen_midy - this.mouseclickpos.y), (this.camera.screen_midx - this.mouseclickpos.x) ) - this.camera.rotation;
    this.player.startBoost(this.player.pos.x - (Math.cos(this.mouseclickposhoek)*this.mouseclickposdist)/this.camera.zoom, this.player.pos.y - (Math.sin(this.mouseclickposhoek)*this.mouseclickposdist)/this.camera.zoom);
            
    this.player.iveBeenHitBy();

};   

Gamescene.prototype.resizeScene = function(){

    this.camera.screenCenterView($(window).width()/2,$(window).height()/2);

} 