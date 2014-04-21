Level = function(effects_layer, colidables_layer, background_layer, level_id){
	
	this.effects_layer = effects_layer;
	this.colidables_layer = colidables_layer;
	this.background_layer = background_layer;

	this.level_id = level_id;
	
	this.buildBackground();
	this.buildLevel();


}

Level.prototype.constructor = Level;

Level.prototype.buildLevel = function()
{

	switch (this.level_id){

	case 1:	
		

		for (var i = 0; i < 0; i++) {
	         Tower.create(BASICJELLY, ONSCREENRANDOM(), this.effects_layer, this.colidables_layer);
	        
	    };


	    for (var i = 0; i < 10; i++) {
	         Tower.create(BASICSTALAGMITE, ONSCREENRANDOM(), this.effects_layer, this.colidables_layer);
	        
	    };

	break;
	


	
	}



};

Level.prototype.buildBackground = function()
{
	this.space_rubble = new PIXI.SmaatGraphics(); 

	
		for (var i = 0; i <  450; i++) {


				x1 = ((Math.random()*30)-15);
				y1 = ((Math.random()*30)-15);


				x2 = ((Math.random()*30)-15);
				y2 = ((Math.random()*30)-15);

				px = (Math.random()*5000) - 2500;  
				py = (Math.random()*5000) - 2500;
				
				this.space_rubble.beginFill(color_background_rubble(), 1);	
						
					this.space_rubble.moveTo(px + x1, py + y1);
					this.space_rubble.lineTo(px + x2, py + y2);
					this.space_rubble.lineTo(px + -x1-x2, py + -y1-y2);
					this.space_rubble.lineTo(px+x1,py+y1);
						
				this.space_rubble.endFill();
		}
		
	this.background_layer.addChild(this.space_rubble);


}
