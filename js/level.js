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
	
	}
    


};

Level.prototype.buildBackground = function()
{
	this.space_rubble = new PIXI.SmaatObjectContainer(); 
	this.space_rubble_deeper = new PIXI.SmaatObjectContainer(); 

	test = new PIXI.Sprite;
	test.setTexture(PIXI.Texture.fromFrame("big_back.png"));
	test.scale.x = 1.0;
	test.scale.y = test.scale.x
	test.alpha = 1//0.03;
		//test.tint = 0xccccee;
	test.position.x = -(this.map_width/4)*test.scale.x;
	test.position.y = -(this.map_height/4)*test.scale.y;

	this.space_rubble_deeper.addChild(test);

	test2 = new PIXI.Sprite;
	test2.setTexture(PIXI.Texture.fromFrame("big_back2.png"));
	test2.scale.x = 1.2;
	test2.scale.y = test2.scale.x
	test2.alpha = 1//0.06;
		//test.tint = 0xccccee;
	test2.position.x = -(this.map_width/4)*test2.scale.x;
	test2.position.y = -(this.map_height/4)*test2.scale.y;

	this.space_rubble.addChild(test2);

	this.background_layer.addChild(this.space_rubble_deeper);
	this.background_layer.addChild(this.space_rubble);

	
	
	


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

	this.space_rubble_deeper.position.x = this.player.pos.x*0.9;
	this.space_rubble_deeper.position.y = this.player.pos.y*0.9;
	
	this.space_rubble.position.x = this.player.pos.x*0.6;
	this.space_rubble.position.y = this.player.pos.y*0.6;
		
}

