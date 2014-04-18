Level = function(effects_layer, colidables_layer, background_layer, level_id){
	
	this.effects_layer = effects_layer;
	this.colidables_layer = colidables_layer;
	this.background_layer = background_layer;

	this.level_id = level_id;
	
	this.buildLevel();


}

Level.prototype.constructor = Level;

Level.prototype.buildLevel = function()
{

	switch (this.level_id){

	case 1:	
		

		for (var i = 0; i < 10; i++) {
	         Tower.create(BASICJELLY, ONSCREENRANDOM(), this.effects_layer, this.colidables_layer);
	        
	    };


	    for (var i = 0; i < 0; i++) {
	         Tower.create(BASICSTALAGMITE, ONSCREENRANDOM(), this.effects_layer, this.colidables_layer);
	        
	    };

	break;
	


	
	}



}
