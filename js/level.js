Level = function(effects_layer, colidables_layer, background_layer, level_id){
	
	this.effects_layer = effects_layer;
	this.colidables_layer = colidables_layer;
	this.background_layer = background_layer;
	
	//make array if multiplayer
	this.player = 0;
	this.map_width = 0;
	this.map_height = 0;
	this.level_id = level_id;
	
	this.buildLevel();
	this.buildBackground();
	


}

Level.prototype.constructor = Level;

Level.prototype.buildLevel = function()
{
	
	this.player = Tower.create(BASICBOT, MIDDLE(), BOT1TEAM, BASICJELLY_PLAYER, this.effects_layer, this);
	this.player.controlled = true;
	this.addTowerToWorld(this.player.sprite);

	switch (this.level_id){

	case "1":	
		
		for (var i = 0; i < 4; i++) {
	        t = Tower.create(BASICJELLY, ONSCREENSMALLRANDOM_LEFT(), JELLIESTEAM, PLAYERFOLLOWJELLY_GEDAGTE, this.effects_layer, this);
	        this.addTowerToWorld(t.sprite);	
	    };
	    for (var i = 0; i < 15; i++) {
	        t = Tower.create(BASICSTALAGMITE, ONSCREENRANDOM(), STALAGMITETEAM, PLAYERFOLLOWJELLY_GEDAGTE, this.effects_layer, this);
	    	this.addTowerToWorld(t.sprite);	   
	    };
	    
		
	break;

	case "2":	
		for (var i = 0; i < 0; i++) {
	         t = Tower.create(BASICJELLY, ONSCREENSMALLRANDOM(), JELLIESTEAM, BASICJELLY_GEDAGTE, this.effects_layer, this);
	         this.addTowerToWorld(t.sprite);
	    };
	    for (var i = 0; i < 1; i++) {
	         t = Tower.create(BASICSTALAGMITE, ONSCREENRANDOM(), STALAGMITETEAM, BASICSTALAGMITE_GEDAGTE, this.effects_layer, this);
	     	 this.addTowerToWorld(t.sprite);  
	    };

	break;
	
	
	case "3":	
		this.map_width = 4000;
		this.map_height = 4000;
		
		for (var i = 0; i < 50; i++) {
	         mush = Tower.create(BASICMUSHROOM, ONMAPRANDOM(this.map_width, this.map_height), NOTEAM, BASICMUSHROOM_GEDAGTE, this.effects_layer, this);
	         this.addTowerToWorld(mush.sprite);
	         brom = Tower.create(BASICBROMITE_CHAR(), ONMAP_PRECISE(mush.pos.x, mush.pos.y), BROMITE_TEAM, BASICBROMITE_GEDAGTE, this.effects_layer, this);
	         this.addTowerToWorld(brom.sprite);
	    
	    };

	    for (var i = 0; i < 20; i++) {
	    	t = Tower.create(BASICBROMITE_CHAR(), ONMAPRANDOM(this.map_width, this.map_height), BROMITE_TEAM, BASICBROMITE_GEDAGTE, this.effects_layer, this);
	        this.addTowerToWorld(t.sprite);
	    
	        
	    };

	    
	break;
	
	case "4":	
			this.map_width = 4000;
			this.map_height = 4000;
				
		    for (var i = 0; i < 170; i++) {
		    	t = Tower.create(BASICBROMITE_CHAR(), ONMAPRANDOM(this.map_width, this.map_height), BROMITE_TEAM, BASICBROMITE_GEDAGTE, this.effects_layer, this);
		        this.addTowerToWorld(t.sprite);
		    
		        
		    };
	
		    
		break;
	
	
	}
    


};

Level.prototype.buildBackground = function()
{
	this.space_platform = new PIXI.SmaatObjectContainer(); 
	this.space_rubble = new PIXI.SmaatObjectContainer(); 
	this.space_rubble_deeper = new PIXI.SmaatObjectContainer();
	this.space_rubble_deeper_deeper = new PIXI.SmaatObjectContainer(); 
	
	/*layerPlatform = new PIXI.Sprite;
	layerPlatform.setTexture(PIXI.Texture.fromFrame("platform.png"));
	layerPlatform.scale.x = 1;
	layerPlatform.scale.y = layerPlatform.scale.x
	layerPlatform.alpha = 1;
	layerPlatform.position.x = -(this.map_width/4)*layerPlatform.scale.x + 775;
	layerPlatform.position.y = -(this.map_height/4)*layerPlatform.scale.y + 788;
	this.space_platform.addChild(layerPlatform);
	*/
	/*this.normal_colorMatrix =  [
    		1,0,0,0,
		    0,1,0,0,
		    0,0,1,0,
		    0,0,0,1
  		];

  		this.white_colorMatrix =  [
    		1,0,0,1,
		    0,1,0,1,
		    0,0,1,1,
		    0,0,0,1
  		];

	this.layerTop_filter = new PIXI.ColorMatrixFilter();
  	this.layerTop_filter.matrix = this.normal_colorMatrix;
  		
  	this.layerTop.filters = [this.layerTop_filter];*/

  	//0x111d3a
	layerTop = new PIXI.Sprite;
	layerTop.setTexture(PIXI.Texture.fromFrame("background_black_dot.png"));
	layerTop.scale.x = 0.5;
	layerTop.scale.y = layerTop.scale.x
	layerTop.alpha = 1;
	layerTop.position.x = -(layerTop.texture.width*layerTop.scale.x)/2;
	layerTop.position.y = -(layerTop.texture.height*layerTop.scale.y)/2;
	
	var vibe = 0.07
	colorMatrix =  [
    		1,0,0,0.0666666667+vibe,
		    0,1,0,0.11372549+vibe,
		    0,0,1,0.22745098+vibe,
		    0,0,0,1
  	];

	layerTop_filter = new PIXI.ColorMatrixFilter();
  	layerTop_filter.matrix = colorMatrix;
  	layerTop.filters = [layerTop_filter];

  	this.space_rubble.addChild(layerTop);
	

	
	layerMid = new PIXI.Sprite;
	layerMid.setTexture(PIXI.Texture.fromFrame("background_a.png"));
	layerMid.scale.x = 1;
	layerMid.scale.y = layerMid.scale.x
	layerMid.alpha = 1;
	layerMid.position.x = -(this.map_width/4)*layerMid.scale.x;
	layerMid.position.y = -(this.map_height/4)*layerMid.scale.y;
	
	var vibe = 0.07
	colorMatrix =  [
    		1,0,0,0.0666666667+vibe,
		    0,1,0,0.11372549+vibe,
		    0,0,1,0.22745098+vibe,
		    0,0,0,1
  	];

	layerTop_filter = new PIXI.ColorMatrixFilter();
  	layerTop_filter.matrix = colorMatrix;
  	layerTop.filters = [layerTop_filter];

	this.space_rubble_deeper.addChild(layerMid);
	
	layerBottom = new PIXI.Sprite;
	layerBottom.setTexture(PIXI.Texture.fromFrame("background_a.png"));
	layerBottom.scale.x = 0.8;
	layerBottom.scale.y = layerBottom.scale.x
	layerBottom.alpha = 1;
	layerBottom.position.x = -(this.map_width/4)*layerBottom.scale.x;
	layerBottom.position.y = -(this.map_height/4)*layerBottom.scale.y;

	//this.space_rubble_deeper_deeper.addChild(layerBottom);
	
	
	this.background_layer.addChild(this.space_rubble_deeper_deeper);
	this.background_layer.addChild(this.space_rubble_deeper);
	this.background_layer.addChild(this.space_rubble);
	this.background_layer.addChild(this.space_platform);
	
	
	


};

Level.prototype.addTowerToWorld = function(t){

 	this.colidables_layer.addChild(t);

},

Level.prototype.makeHitShards = function(amount, x, y, char_class){

	var s;
	for (var i = 0; i < amount; i++){
	
		if (char_class == "mushroom"){
			 	s = Shrap.create(MUSHROOMSHRAP, FROMMESHRAP(x, y),  this.effects_layer);
			 	this.effects_layer.addChild(s.body_container);
		}

		if (char_class == "jelly"){
			 	s = Shrap.create(JELLYSHRAP, FROMMESHRAP(x, y),  this.effects_layer);
			 	this.effects_layer.addChild(s.body_container);
		}
		if (char_class == "stalagmite"){
			 	s = Shrap.create(STALAGSHRAP, FROMMESHRAP(x, y));
				this.effects_layer.addChild(s.body_container);
		}
		if (char_class == "struct"){
			 	s = Shrap.create(STRUCTSHRAP, FROMMESHRAP(x, y));
				this.effects_layer.addChild(s.bobody_containerdy);
		}
	}	
},

Level.prototype.makeSparks = function(amount, x, y){

	for (var i = 0; i < amount; i++){
		s = Shrap.create(BASICSPARKSHRAP, SPARKSHRAP(x, y));
		this.effects_layer.addChild(s.body_container);
	}	

},

Level.prototype.makeSmoke = function(amount, x, y, width, scale_x){


	for (var i = 0; i < amount; i++){
		s = Shrap.create(BASICSMOKESHRAP(), SMOKESHRAP(x, y));
		this.effects_layer.addChild(s.body_container);
	}	

},

Level.prototype.makeBooster = function(amount, x, y, vx, vy, tcharacter_class, y_offset){

	var dist_rotation = Math.atan2(vy, vx) + Math.PI;
	var y_offset_adjusted = y_offset - 10;

	if (tcharacter_class == "bot1"){
		for (var i = 0; i < amount; i++){
			s = Shrap.create(BOOSTERSHRAP_LOOK(), BOOSTERSHRAP_POS(x + Math.cos(dist_rotation) * y_offset_adjusted, y +Math.sin(dist_rotation) * y_offset_adjusted));
			this.effects_layer.addChild(s.body_container);
		}
	}		

},


Level.prototype.makeWeaponFlames = function(amount, x, y, tx, ty, tcharacter_class, y_offset){

	
	var rotation = Math.atan2(x-tx, y-ty) + Math.PI;

	if (tcharacter_class == "bot1"){
		for (var i = 0; i < amount; i++){
			s = Shrap.create(BOT1FLASH, FLASHSHRAP(x, y, rotation, y_offset));
			this.effects_layer.addChild(s.body_container);
		}		
	}

	if (tcharacter_class == "jelly"){
		
		for (var i = 0; i < amount; i++){
			s = Shrap.create(JELLYWEAPONFLAME, FLASHSHRAP(x, y, rotation, y_offset));
			this.effects_layer.addChild(s.body_container);
		}		
	}

	if (tcharacter_class == "stalagmite"){
		
		for (var i = 0; i < amount; i++){
			s = Shrap.create(STALAGMITEWEAPONFLAME, FLASHSHRAP(x, y, rotation, y_offset));
			this.effects_layer.addChild(s.body_container);
		}		
	}

},


Level.prototype.doLevel = function()
{
	
	this.space_rubble_deeper_deeper.position.x = this.player.pos.x*1;
	this.space_rubble_deeper_deeper.position.y = this.player.pos.y*1;
	
	this.space_rubble_deeper.position.x = this.player.pos.x*0.90;
	this.space_rubble_deeper.position.y = this.player.pos.y*0.90;
	
	this.space_rubble.position.x = this.player.pos.x*0.7;
	this.space_rubble.position.y = this.player.pos.y*0.7;
	
	this.space_platform.position.x = this.player.pos.x*0;
	this.space_platform.position.y = this.player.pos.y*0;
		
}

