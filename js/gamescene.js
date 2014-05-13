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

    this.player = Tower.create(BASICJELLY, ONSCREENRANDOM(), JELLIESTEAM, BASICJELLY_PLAYER, this.effects_layer, this.colidables_layer);
    this.player.controlled = true;
  
    //console.log(STILLAI);

    this.level = new Level(this.effects_layer,this.colidables_layer,this.background_layer,"firstlevel", this.player)

    




    this.camera.following =  this.player;
    this.resizeScene();
    this.camera.addChild(this.world); 
    


    // add the camera and the hud to the stage
    stage.addChild(this.camera);
    stage.addChild(this.hud);


 

};

// constructor

Gamescene.prototype.constructor = Gamescene;


Gamescene.prototype.checkInweapon_rangeCollision = function(at,tt){

    if (this.checkBoundingboxCollision(at,tt)){

        return this.checkDistCollision(at,tt);

    }else
    return false;
    
}


Gamescene.prototype.checkBoundingboxCollision = function(at,tt){

    return  !(
        (at.pos.y+at.interaction_range < tt.pos.y) ||
        (at.pos.y-at.interaction_range > tt.pos.y) ||
        (at.pos.x-at.interaction_range > tt.pos.x) ||
        (at.pos.x+at.interaction_range < tt.pos.x) )

};

Gamescene.prototype.checkDistCollision = function(at,tt){

  

    if (Math.pow(at.pos.x - tt.pos.x, 2) + Math.pow(at.pos.y - tt.pos.y, 2) < Math.pow(at.interaction_range, 2)){

           

        return true;

    } else{


        return false;
    }





};



Gamescene.prototype.sceneUpdate = function()
{
    
        //this.camera.zoom = 0.95;// - (1 * ((Math.pow(this.player.vel.x,2) + Math.pow(this.player.vel.y,2))));

        
        this.updateTowers();
        this.updateEffects();

        //this.updateAttacks();

        this.level.doLevel();

        
    
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
                /* main update */
                this.next_tower.obj.update();


                /* add to targets list */
                this.target_tower = gamecore.DualPool.getPool(Tower).getUsedList().first;  
                this.attacker_tower = this.next_tower;
                while( this.target_tower )
                {
                    if (this.attacker_tower != this.target_tower){
                        
                        if (this.checkInweapon_rangeCollision(this.attacker_tower.obj,this.target_tower.obj) ){

                            
                              this.attacker_tower.obj.addToTargetsOrFriends(this.target_tower.obj); 
                        }
                    }    

                this.target_tower = this.target_tower.nextLinked;
                }
                /*end of add to targets list */

                /* neeeeext */
                this.next_tower = this.next_tower.nextLinked;
            
            }

            






            /* remove die siele wat gekak het die loop */

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
        
    this.mouseclickposdist = Math.sqrt(Math.pow(((this.camera.screen_midx) - this.mouseclickpos.x),2) + Math.pow(((this.camera.screen_midy) - this.mouseclickpos.y),2));
    this.mouseclickposhoek = Math.atan2(((this.camera.screen_midy) - this.mouseclickpos.y), ((this.camera.screen_midx) - this.mouseclickpos.x) ) - this.camera.rotation;
    this.player.startBoost(this.player.pos.x - (Math.cos(this.mouseclickposhoek)*this.mouseclickposdist)/this.camera.zoom, this.player.pos.y - (Math.sin(this.mouseclickposhoek)*this.mouseclickposdist)/this.camera.zoom);
           
   


};   

Gamescene.prototype.resizeScene = function(){

    this.camera.screenCenterView(window.innerWidth/2,window.innerHeight/2);

} 