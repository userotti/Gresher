Level = function(effects_layer, colidables_layer, background_layer, level_id, player){
	
	this.effects_layer = effects_layer;
	this.colidables_layer = colidables_layer;
	this.background_layer = background_layer;
//make array if multiplayer
	this.theplayer = player;

	this.level_id = level_id;
	
	//this.buildBackground();
	//this.buildLevel();


}

Level.prototype.constructor = Level;

Level.prototype.buildLevel = function()
{

	switch (this.level_id){

	case "firstlevel":	
		

		for (var i = 0; i < 18; i++) {
	         p = Tower.create(BASICJELLY, ONSCREENRANDOM(), JELLIESTEAM, SQUARE100_30MOVE_AI, RANDOMDEST, this.effects_layer, this.colidables_layer);
	        
	    };


	    for (var i = 0; i < 18; i++) {
	         p = Tower.create(BASICSTALAGMITE, ONSCREENSMALLRANDOM(), STALAGMITETEAM, STILLAI, NODEST, this.effects_layer, this.colidables_layer);
	     	   
	    };

	break;

	case "secondlevel":	
		

		for (var i = 0; i < 18; i++) {
	         p = Tower.create(BASICJELLY, ONSCREENSMALLRANDOM(), JELLIESTEAM, SQUARE100_30MOVE_AI, RANDOMDEST, this.effects_layer, this.colidables_layer);
	        
	    };


	    for (var i = 0; i < 18; i++) {
	         p = Tower.create(BASICSTALAGMITE, ONSCREENRANDOM(), STALAGMITETEAM, STILLAI, NODEST, this.effects_layer, this.colidables_layer);
	     	   
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

Level.prototype.doLevel = function()
{

	//this.space_rubble_deeper.rotation += 0.000025;
	//this.space_rubble.rotation += 0.00019;
	


}

