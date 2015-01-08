Level = function(effects_layer, colidables_layer, background_layer, level_id){
	
	this.effects_layer = effects_layer;
	this.colidables_layer = colidables_layer;
	this.background_layer = background_layer;
	
	//make array if multiplayer
	this.player = 0;
	this.level_id = level_id;
	
	this.buildBackground();
	this.buildLevel();

}

Level.prototype.constructor = Level;

Level.prototype.buildLevel = function()
{
	
	this.player = Tower.create(BASICJELLY, ONSCREENSMALLRANDOM_LEFT(), JELLIESTEAM, BASICJELLY_PLAYER, this.effects_layer, this);
	this.player.controlled = true;
	this.addTowerToWorld(this.player.sprite);

	switch (this.level_id){

	case "1":	
		
		for (var i = 0; i < 30; i++) {
	        t = Tower.create(BASICJELLY, ONSCREENSMALLRANDOM_LEFT(), JELLIESTEAM, PLAYERFOLLOWJELLY_GEDAGTE, this.effects_layer, this);
	        this.addTowerToWorld(t.sprite);	
	    };
	    for (var i = 0; i < 38; i++) {
	        t = Tower.create(BASICSTALAGMITE, ONSCREENRANDOM(), STALAGMITETEAM, PLAYERFOLLOWJELLY_GEDAGTE, this.effects_layer, this);
	    	this.addTowerToWorld(t.sprite);	   
	    };

	break;

	case "2":	
		for (var i = 0; i < 0; i++) {
	         t = Tower.create(BASICJELLY, ONSCREENSMALLRANDOM(), JELLIESTEAM, BASICJELLY_GEDAGTE, this.effects_layer, this);
	         this.addTowerToWorld(t.sprite);
	    };
	    for (var i = 0; i < 3; i++) {
	         t = Tower.create(BASICSTALAGMITE, ONSCREENRANDOM(), STALAGMITETEAM, BASICSTALAGMITE_GEDAGTE, this.effects_layer, this);
	     	 this.addTowerToWorld(t.sprite);  
	    };

	break;
	
	}



};

Level.prototype.buildBackground = function()
{
	this.space_rubble = new PIXI.SmaatGraphics(); 
	this.space_rubble_deeper = new PIXI.SmaatGraphics(); 

	
		for (var i = 0; i <  250; i++) {


				x1 = ((Math.random()*300)-150);
				y1 = ((Math.random()*300)-150);


				x2 = ((Math.random()*300)-150);
				y2 = ((Math.random()*300)-150);

				px = (Math.random()*5000) - 2500;  
				py = (Math.random()*5000) - 2500;
				
				this.space_rubble.beginFill(color_background_rubble(), 1);	
						
					this.space_rubble.moveTo(px + x1, py + y1);
					this.space_rubble.lineTo(px + x2, py + y2);
					this.space_rubble.lineTo(px + -x1-x2, py + -y1-y2);
					this.space_rubble.lineTo(px+x1,py+y1);
						
				this.space_rubble.endFill();
		}

		for (var i = 0; i <  450; i++) {


				x1 = ((Math.random()*150)-75);
				y1 = ((Math.random()*150)-75);


				x2 = ((Math.random()*150)-75);
				y2 = ((Math.random()*150)-75);

				px = (Math.random()*5000) - 2500;  
				py = (Math.random()*5000) - 2500;
				
				this.space_rubble_deeper.beginFill(0x102349, 1);	
						
					this.space_rubble_deeper.moveTo(px + x1, py + y1);
					this.space_rubble_deeper.lineTo(px + x2, py + y2);
					this.space_rubble_deeper.lineTo(px + -x1-x2, py + -y1-y2);
					this.space_rubble_deeper.lineTo(px+x1,py+y1);
						
				this.space_rubble_deeper.endFill();
		}
		
	this.background_layer.addChild(this.space_rubble_deeper);
	this.space_rubble_deeper.position.x = (Math.random()*1500) - 750;
	this.space_rubble_deeper.position.y = (Math.random()*1500) - 750;

	this.background_layer.addChild(this.space_rubble);
	this.space_rubble.position.x = (Math.random()*1500) - 750;
	this.space_rubble.position.y = (Math.random()*1500) - 750;


	


};

Level.prototype.addTowerToWorld = function(t){

 	this.colidables_layer.addChild(t);

},

Level.prototype.makeHitShards = function(amount, x, y, char_class){

	var s;

	if (char_class == "jelly"){
		for (var i = 0; i < amount; i++){
		 	s = Shrap.create(JELLYSHRAP, FROMMESHRAP(x, y),  this.effects_layer);
		 	this.effects_layer.addChild(s.body);
		}
	}
	if (char_class == "stalagmite"){
		for (var i = 0; i < amount; i++){
		 	s = Shrap.create(STALAGSHRAP, FROMMESHRAP(x, y));
			this.effects_layer.addChild(s.body);
		}
	}
	if (char_class == "struct"){
	 	for (var i = 0; i < amount; i++){
		 	s = Shrap.create(STRUCTSHRAP, FROMMESHRAP(x, y));
			this.effects_layer.addChild(s.body);
		}
	}
},

Level.prototype.makeSparks = function(amount, x, y){

	for (var i = 0; i < amount; i++){
		s = Shrap.create(BASICSPARKSHRAP, SPARKSHRAP(x, y));
		this.effects_layer.addChild(s.body);
	}	

},

Level.prototype.makeSmoke = function(amount, x, y){

	for (var i = 0; i < amount; i++){
		s = Shrap.create(BASICSMOKESHRAP, SMOKESHRAP(x, y));
		this.effects_layer.addChild(s.body);
	}	

},


Level.prototype.makeWeaponFlames = function(amount, x, y, tx, ty, tcharacter_class){

	var rotation = Math.atan2(x-tx, y-ty) + Math.PI;

	if (tcharacter_class == "jelly"){
		

		//die pos van die shrap moet hier yt-gewerk word, en die angle moet saam gepass word.	
		console.log("jelly");
		for (var i = 0; i < amount; i++){
			s = Shrap.create(JELLYWEAPONFLAME, FLAMESHRAP(x, y, rotation));
			this.effects_layer.addChild(s.body);
		}		
					
	}


	if (tcharacter_class == "stalagmite"){

		console.log("stalagmite");
	

		for (var i = 0; i < amount; i++){
			s = Shrap.create(STALAGMITEWEAPONFLAME, FLAMESHRAP(x, y, rotation));
			this.effects_layer.addChild(s.body);
		}		
	}

},


Level.prototype.doLevel = function()
{

	this.space_rubble_deeper.rotation += 0.000025;
	this.space_rubble.rotation += 0.00019;

}

