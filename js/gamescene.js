Gamescene = function(stage)
{
    this.camera = new PIXI.Camera();
    this.hud = new PIXI.SmaatObjectContainer();
    this.world = new PIXI.SmaatObjectContainer();

    this.background_layer = new PIXI.SmaatObjectContainer();
    this.colidables_layer = new PIXI.SmaatObjectContainer();
    this.effects_layer = new PIXI.SmaatObjectContainer();
    
    this.level = new Level(this.effects_layer,this.colidables_layer,this.background_layer,"1")

    this.world.addChild(this.background_layer);
    this.world.addChild(this.colidables_layer);
    this.world.addChild(this.effects_layer);

    this.camera.following = this.level.player;
    this.resizeScene();
    this.camera.addChild(this.world); 

    this.buildHud();
    // add the camera and the hud to the stage
    stage.addChild(this.camera);
    stage.addChild(this.hud);
 
};

// constructor

Gamescene.prototype.constructor = Gamescene;

Gamescene.prototype.buildHud = function(){

    this.player_health_bar = new PIXI.SmaatGraphics();
    this.player_health_bar_offset_pos_x = 30;
    this.player_health_bar_offset_pos_y = 30;
    this.player_health_bar_width = 10;
    this.player_health_bar_color = "";
    this.player_health__bar_height = 100;     

    this.player_energy_bar = new PIXI.SmaatGraphics();
    this.player_energy_bar_offset_pos_x = 50;
    this.player_energy_bar_offset_pos_y = 30;
    this.player_energy_bar_width = 10;
    this.player_energy_bar_color = "";
    this.player_energy__bar_height = 100;

    
    this.player_weapon_bar = new PIXI.SmaatGraphics();
    this.player_weapon_bar_offset_pos_x = 70;
    this.player_weapon_bar_offset_pos_y = 30;
    this.player_weapon_bar_width = 10;
    this.player_weapon_bar_color = "";
    this.player_weapon__bar_height = 100;  


}

Gamescene.prototype.checkInteractionRangeCollision = function(at,tt){

    if (this.checkBoundingboxCollision(at,tt, at.interaction_range)){
        return this.checkDistCollision(at,tt, at.interaction_range);
    }
    return false;
}


Gamescene.prototype.checkBoundingboxCollision = function(at,tt,radius){

    return  !(
        (at.pos.y+radius < tt.pos.y) ||
        (at.pos.y-radius > tt.pos.y) ||
        (at.pos.x-radius > tt.pos.x) ||
        (at.pos.x+radius < tt.pos.x) )

};

Gamescene.prototype.checkDistCollision = function(at,tt,radius){

    if (Math.pow(at.pos.x - tt.pos.x, 2) + Math.pow(at.pos.y - tt.pos.y, 2) < Math.pow(radius, 2)){
        return true;
    } else{
        return false;
    }

};

Gamescene.prototype.sortTargetsAndFriends = function(current_tower){
    
    this.target_tower = gamecore.DualPool.getPool(Tower).getUsedList().first;  
    this.attacker_tower = current_tower;
    
    while( this.target_tower ){
        if (this.attacker_tower != this.target_tower){
            if (this.checkInteractionRangeCollision(this.attacker_tower.obj,this.target_tower.obj) ){
                this.attacker_tower.obj.addToTargetsOrFriends(this.target_tower.obj); 
            }
        }    

    this.target_tower = this.target_tower.nextLinked;
    }
    
}

Gamescene.prototype.recycleDeadTowers = function(current_tower){

    while( this.current_tower ){
                                    
        if (this.current_tower.obj.alive == false) {
            this.current_tower.obj.clearSprites();    
            this.colidables_layer.removeChild(this.current_tower.obj.sprite);
            this.current_tower.obj.release();
            this.current_tower = gamecore.DualPool.getPool(Tower).getUsedList().first;
        }else{
            this.current_tower = this.current_tower.nextLinked;
        }
    }
}


Gamescene.prototype.updateTowers = function(){

    if (gamecore.DualPool.getPool(Tower) != null){

            this.current_tower = gamecore.DualPool.getPool(Tower).getUsedList().first;
            while( this.current_tower )
            {
                this.current_tower.obj.update();
                this.sortTargetsAndFriends(this.current_tower);
                this.current_tower = this.current_tower.nextLinked;
            }

            this.current_tower = gamecore.DualPool.getPool(Tower).getUsedList().first;
            this.recycleDeadTowers();

        }

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
                this.effects_layer.removeChild(nextShrap.obj.body)
                nextShrap.obj.release();
                nextShrap = gamecore.DualPool.getPool(Shrap).getUsedList().first;

            }else{
                nextShrap = nextShrap.nextLinked;
            }
        }
    }

}

Gamescene.prototype.updateHealthBar = function(){

    this.player_health_bar.clear();   
    if (this.level.player.health == this.level.player.maxhealth){
        this.player_health_bar_color = "0xE16962";
    }else{
        this.player_health_bar_color = "0x913936";
    }

    this.player_health__bar_height = (this.level.player.health / this.level.player.maxhealth) * 100;

    this.player_health_bar.beginFill(this.player_health_bar_color, 1);  
            
        this.player_health_bar.moveTo(0 + this.player_health_bar_offset_pos_x, window.innerHeight - this.player_health_bar_offset_pos_y);
        this.player_health_bar.lineTo(0 + this.player_health_bar_offset_pos_x, window.innerHeight - this.player_health__bar_height - this.player_health_bar_offset_pos_y);
        this.player_health_bar.lineTo(this.player_health_bar_width + this.player_health_bar_offset_pos_x, window.innerHeight - this.player_health__bar_height - this.player_health_bar_offset_pos_y);
        this.player_health_bar.lineTo(this.player_health_bar_width + this.player_health_bar_offset_pos_x ,window.innerHeight - this.player_health_bar_offset_pos_y);
            
    this.player_health_bar.endFill();
    this.hud.addChild(this.player_health_bar);

}

Gamescene.prototype.updateEnergyBar = function(){

    this.player_energy_bar.clear();   
    if (this.level.player.currentenergy == this.level.player.fullenergy){
        this.player_energy_bar_color = "0x61E962";
    }else{
        this.player_energy_bar_color = "0x319936";
    }

    this.player_energy__bar_height = (this.level.player.currentenergy / this.level.player.fullenergy) * 100;

    this.player_energy_bar.beginFill(this.player_energy_bar_color, 1);  
            
        this.player_energy_bar.moveTo(0 + this.player_energy_bar_offset_pos_x, window.innerHeight - this.player_energy_bar_offset_pos_y);
        this.player_energy_bar.lineTo(0 + this.player_energy_bar_offset_pos_x, window.innerHeight - this.player_energy__bar_height - this.player_energy_bar_offset_pos_y);
        this.player_energy_bar.lineTo(this.player_energy_bar_width + this.player_energy_bar_offset_pos_x, window.innerHeight - this.player_energy__bar_height - this.player_energy_bar_offset_pos_y);
        this.player_energy_bar.lineTo(this.player_energy_bar_width + this.player_energy_bar_offset_pos_x ,window.innerHeight - this.player_energy_bar_offset_pos_y);
            
    this.player_energy_bar.endFill();
    this.hud.addChild(this.player_energy_bar);

}

Gamescene.prototype.updateWeaponBar = function(){

    this.player_weapon_bar.clear();   
    
    if (this.level.player.current_reload == this.level.player.full_reload){
        this.player_weapon_bar_color = "0x6269e2";
    }else{
        this.player_weapon_bar_color = "0x323992";
    }

    this.player_weapon__bar_height = (this.level.player.current_reload / this.level.player.full_reload) * 100;

    this.player_weapon_bar.beginFill(this.player_weapon_bar_color, 1);  
            
        this.player_weapon_bar.moveTo(0 + this.player_weapon_bar_offset_pos_x, window.innerHeight - this.player_weapon_bar_offset_pos_y);
        this.player_weapon_bar.lineTo(0 + this.player_weapon_bar_offset_pos_x, window.innerHeight - this.player_weapon__bar_height - this.player_weapon_bar_offset_pos_y);
        this.player_weapon_bar.lineTo(this.player_weapon_bar_width + this.player_weapon_bar_offset_pos_x, window.innerHeight - this.player_weapon__bar_height - this.player_weapon_bar_offset_pos_y);
        this.player_weapon_bar.lineTo(this.player_weapon_bar_width + this.player_weapon_bar_offset_pos_x ,window.innerHeight - this.player_weapon_bar_offset_pos_y);
            
    this.player_weapon_bar.endFill();
    this.hud.addChild(this.player_weapon_bar);

}

Gamescene.prototype.updateHud = function(){

    this.updateHealthBar();
    this.updateEnergyBar();
    this.updateWeaponBar();
}    


Gamescene.prototype.sceneUpdate = function()
{
    this.camera.zoom = 1.1;// - (1 * ((Math.pow(this.player.vel.x,2) + Math.pow(this.player.vel.y,2))));
    this.updateTowers();
    this.updateEffects();
    this.updateHud();
    this.level.doLevel();

};




Gamescene.prototype.mouseClick = function(mousepos)
{

    this.mouseclickpos = mousepos;
    this.mouseclickposdist = Math.sqrt(Math.pow(((this.camera.screen_midx) - this.mouseclickpos.x),2) + Math.pow(((this.camera.screen_midy) - this.mouseclickpos.y),2));
    this.mouseclickposhoek = Math.atan2(((this.camera.screen_midy) - this.mouseclickpos.y), ((this.camera.screen_midx) - this.mouseclickpos.x) ) - this.camera.rotation;
    
    if (this.level.player.currentenergy == this.level.player.fullenergy){
        this.level.player.startBoost(this.level.player.pos.x - (Math.cos(this.mouseclickposhoek)*this.mouseclickposdist)/this.camera.zoom, this.level.player.pos.y - (Math.sin(this.mouseclickposhoek)*this.mouseclickposdist)/this.camera.zoom);
    }
    
};   

Gamescene.prototype.resizeScene = function(){

    this.camera.screenCenterView(window.innerWidth/2,window.innerHeight/2);

} 