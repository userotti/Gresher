
Tower = gamecore.DualPooled('Tower',
{
    // Static constructor
    create:function (charparams, posparams, teamparams, aiparams, effectlayerparam, level)
    {
       	var t = this._super();
       
       	t.effects_layer = effectlayerparam;
       	t.level = level
       	t.setStats(charparams);
       	t.setPos(posparams);
       	t.setTeams(teamparams);
	   	t.mind.setAi(aiparams);
	   	t.buildBody();
	   	t.sprite.addChild(t.towerbody);
       	t.animcounter = Math.random()*Math.PI;
       	return t;

    }
},
  
{
  	//look and stats
 	character_class:'',
 	age: 0,
 	health: 0,
 	maxhealth: 0,
 	speed: 0,
 	shield: 0,
 	shielrecharge: 0,
 	weapon_range: 0,
 	full_reload: 0,
 	current_reload: 0,
 	reload_speed: 0,
 	damage: 0,
 	
 	magnetic_charge: 0,
 	magnetic_range: 0,
 	magnetic_inner_range: 0,
 	
 	magnetic_force: 0,
 	maxboostpower: 0,
 	push_pullable: false,

 	alive: false,
 	dying: false,

 	//visual aspects
 	sprite: 0,
 	body: 0,
 	body_flash: 0,
 	hud: 0,
 	scale: 0,
 	mylayer: 0,

 	//animation
 	bodybounce: 0,
 	bodyrotation_speed: 0,
 	dyinganimationcounter: 0,

 	//movement
 	pos: 0,
 	vel: 0,
 	acc: 0,
 	boostforce: 0,
 	final_force: 0,

 	movementfric: 0,
 	fric_coeff: 0,
 	staticfric: 0,
 	myfakespeed: 0,
 	fullenergy: 0,
 	energyrecharge: 0,
 	currentenergy: 0,
 	
 	boosttarget: 0,
 	boostpower: 0,	
 	boostangle: 0,
 	boosting: false,

 	closeenoughtodestination: 20,

 	//tween 
 	moving: false,
 	movingframe: 0,
 	movevect: 0,
 	moveframes: 0,

 	//AI
 	controlled: false,
 	ai_timepercall: 0,
 	teams: 0,
 	targets: 0,
 	interaction_range: 0,
 	destination: 0,

 	//attacking
 	
 	current_target_distance_nosqrt: 0,	
	current_target_angle: 0,	

 	//misc
 	animcounter: 0,
 	animcounterstep: 0.15,

 	init: function()
	{
	    
	    this.sprite = new PIXI.SmaatObjectContainer();
	    this.towerbody = new PIXI.SmaatObjectContainer();
 		this.body = new PIXI.Sprite;

 		this.body_flash = new PIXI.SmaatGraphics();
  		this.hud = new PIXI.SmaatGraphics();

		this.pos = new PIXI.Point();
		this.vel = new PIXI.Point();
	 	this.acc = new PIXI.Point();
	 	
	 	this.boostforce = new PIXI.Point();
	 	this.final_force = new PIXI.Point();
	 	this.magnetic_force = new PIXI.Point();
	 	
	 	this.movementfric = new PIXI.Point();
	 	this.staticfric = new PIXI.Point();
	 	this.boosttarget = new PIXI.Point();
		this.movevect = new PIXI.Point();

		this.mind = new Ai(this);
		
		this.teams = [];
		this.targets = [];
		this.friends = [];
		this.pushing_pulling_me = [];
		this.can_push_pull_me = [];


		this.normal_colorMatrix =  [
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

	  	this.body_filter = new PIXI.ColorMatrixFilter();
  		this.body_filter.matrix = this.normal_colorMatrix;
  		
  		//this make the bodies flash, but is suuuuper expencive!!

  		//this.body.filters = [this.body_filter];


	},
 

 	setStats: function(charparams){

 		this.character_class = charparams.character_class;
 		this.mass = charparams.mass;
	 	this.maxhealth = charparams.maxhealth;
	 	this.health = this.maxhealth;
	 	
	 	this.shield = charparams.shield;
	 	this.shielrecharge = charparams.shieldrecharge;
	 	this.weapon_range = charparams.weapon_range;
	 	this.full_reload = charparams.full_reload;
	 	this.reload_speed = charparams.reload_speed;
	 	
	 	this.damage = charparams.damage;
	 	this.fullenergy = charparams.fullenergy;
	 	this.energyrecharge = charparams.energyrecharge;
	 	this.currentenergy = 0;
	 	this.magnetic_charge = charparams.magnetic_charge;
 		this.magnetic_range = charparams.magnetic_range;
 		this.magnetic_inner_range = charparams.magnetic_inner_range;
 		this.push_pullable = charparams.push_pullable;

 		this.scale = charparams.mass;
 		this.bodybounce = charparams.bodybounce;
 		this.bodyrotation_speed = charparams.bodyrotation_speed;
    	this.maxboostpower = charparams.maxboostpower;
    	this.interaction_range = charparams.interaction_range,
    	this.fric_coeff = charparams.fric_coeff;
    	this.alive = true;
    	this.dying = false;

    	this.ai_timepercall = charparams.ai_timepercall;

 	},

 	setPos: function(posparams){

 		this.pos.x = posparams.posx;
		this.pos.y = posparams.posy;

		this.sprite.position.x = this.pos.x;
		this.sprite.position.y = this.pos.y;

		this.vel.x = posparams.velx;
		this.vel.y = posparams.vely;
		
		this.acc.x = 0;
		this.acc.y = 0;

		this.boosttarget.x = 0;
		this.boosttarget.y = 0;

		this.boostpower = 0;
	
 	},

 	setTeams: function(teamparams){

 		while (this.teams.length != 0){
 			this.teams.pop();
 		}

 		for (var i=0; i <= teamparams.length-1; i++){
 			this.teams.push(teamparams[i]);
 		}
 	},

 	buildBody: function(){

 		switch (this.character_class){

 		case "bot1" : 


			var texture = PIXI.Texture.fromFrame("bot1.png");
	 		this.body.setTexture(texture);
	    	
	 		this.body.scale.x = 0.50;
	 		this.body.scale.y = 0.50;
			
			this.body.position.x = -((texture.width*this.body.scale.x)/2);
	 		this.body.position.y = -((texture.height*this.body.scale.y)/2);
	 		
	 		this.towerbody.rotation = Math.PI;
	 		this.towerbody.addChild(this.body);
	 			this.can_push_pull_me.push("bot1");
	 		this.can_push_pull_me.push("mushroom");
	 		

	 		
		break;

		case "mushroom" : 

 			
			var texture = PIXI.Texture.fromFrame("mushroom1.png");
	 		this.body.setTexture(texture);
	    	
	    	this.body.scale.x = 0.25 + (0.10 * Math.random());
	 		this.body.scale.y = this.body.scale.x;
			
			this.body.position.x = -((texture.width*this.body.scale.x)/2);
	 		this.body.position.y = -((texture.height*this.body.scale.y)/2);
	 		
	 		this.towerbody.rotation = (Math.PI*2) * Math.random();
	 		this.towerbody.addChild(this.body);
 			 		


		break;
	

		case "jelly" : //getGrom

			var texture = texturegroups.getGrom();
	 		this.body.setTexture(texture);
	    	
	 		this.body.scale.x = 0.25;
	 		this.body.scale.y = 0.25;
			
			this.body.position.x = -((texture.width*this.body.scale.x)/2);
	 		this.body.position.y = -((texture.height*this.body.scale.y)/2);
	 		
	 		this.towerbody.rotation = Math.PI;
	 		this.towerbody.addChild(this.body);

	 		this.can_push_pull_me.push("mushroom"); 		


		break;

		case "stalagmite" :	

			var texture = PIXI.Texture.fromFrame("clawbot.png");
	 		this.body.setTexture(texture);
	    	
	 		this.body.scale.x = 0.25;
	 		this.body.scale.y = 0.25;
			
			this.body.position.x = -((texture.width*this.body.scale.x)/2);
	 		this.body.position.y = -((texture.height*this.body.scale.y)/2);

	 		this.towerbody.rotation = Math.PI;
	 		this.towerbody.addChild(this.body);

	 			 		

			break;			
	
		

		case "bromite" :	

			console.log("ASd");
			var texture = texturegroups.getBromite();
	 		this.body.setTexture(texture);
	    	
	 		this.body.scale.x = 0.65;
	 		this.body.scale.y = 0.65;
			
			this.body.position.x = -((texture.width*this.body.scale.x)/2);
	 		this.body.position.y = -((texture.height*this.body.scale.y)/2);

	 		this.towerbody.rotation = Math.PI;
	 		this.towerbody.addChild(this.body);

	 		this.can_push_pull_me.push("bot1");
	 		this.can_push_pull_me.push("mushroom");
	 		this.can_push_pull_me.push("bromite");
	 		
			break;			
	
		}
	
 	},

 	distToPoint: function(x1,y1,x2,y2){
 		return Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));

 	},

	distToTowerNoSqrt: function(other_tower){
 		return Math.sqrt(Math.pow(this.pos.x-other_tower.pos.x,2) + Math.pow(this.pos.y-other_tower.pos.y,2));

 	},
 	

 	/*ANIMATION FUNCTIONS */

 	attackAction: function(){

 		this.shoot(this.targets[0]);

 	},

 	

 	shoot: function(target_tower){
 	
			target_tower.iveBeenHitBy(this);
			
			// Using Player like this?  Close, but every tower has a reference to the level...
			// Getting player from shooter (this) distance
			//var dist = (Math.pow(window.gresher.currentscene.level.player.pos.x-this.pos.x,2) + Math.pow(window.gresher.currentscene.level.player.pos.y-this.pos.y,2));
			
			var dist = (Math.pow(this.level.player.pos.x-this.pos.x,2) + Math.pow(this.level.player.pos.y-this.pos.y,2));
			var panning = this.level.player.pos.x-this.pos.x;

			// Making range from 0 to 1+
			// Also making it from 0.5 to 0-
			var dynamicVolume = 0.6 - (dist/500000); // Random 500K mark? //This sounds perfect
			var dynamicPan = panning/800 * -1;


			// Setting a min limit
			if(dynamicVolume <= 0.025){
				dynamicVolume = 0.025;
			}
			
			
			if (this.character_class === 'bot1'){
				createjs.Sound.play("nes_laser_shot", {loop:0,
				pan: dynamicPan,
				volume:dynamicVolume});
			} else if (this.character_class === 'stalagmite'){
				createjs.Sound.play("nes_laser_shot2", {loop:0, 
				pan: dynamicPan,
				volume:dynamicVolume});
			}	
			
			
			this.level.makeWeaponFlames(1, this.pos.x, this.pos.y, target_tower.pos.x, target_tower.pos.y, this.character_class, (this.body.texture.width/2)*this.body.scale.x);

			this.current_reload = 0;

	},

	

 	bodyHitFlash: function(length){

		
		this.body_flash.counter = length;
		this.body_filter.matrix = this.white_colorMatrix;
	 		

	},

	iveBeenHitBy: function(attacker){

		this.health = this.health - attacker.damage;
		this.bodyHitFlash(5);
		this.level.makeHitShards(((attacker.damage/this.maxhealth) * 10), this.pos.x, this.pos.y, this.character_class);
	 	this.level.makeSparks(5, this.pos.x, this.pos.y);

	},

	startDying:function(){

		this.dying = true;
		this.bodyHitFlash(6);	
		this.dyinganimationcounter = 30;
		this.level.makeHitShards(4, this.pos.x, this.pos.y, this.character_class);
		this.level.makeSparks(5, this.pos.x, this.pos.y);
		
		if (this.character_class === 'mushroom'){
			createjs.Sound.play("death", {loop:0, 
			volume:0.7});
		}	

	},

	timeToDieAndBeRemoved:function(){
		this.alive = false;
	},

	startBoost: function(px,py){

 		this.boosttarget.x = px;
 		this.boosttarget.y = py;
 		this.boostpower = this.maxboostpower;
 		
 		this.boosting = true;
 	},

 	stopBoost: function(px,py){
 		this.boosting = false;
 	},


 	/* UTILITY FUNCTIONS */
 	checkboostdist: function(){

		  return ( (Math.abs(this.boosttarget.x - this.pos.x) < (this.closeenoughtodestination)) && 
		  	(Math.abs(this.boosttarget.y - this.pos.y) < (this.closeenoughtodestination)) );
		
 	},

 	
 	updateAnimation: function(){

 		this.animcounter += this.animcounterstep;

 		if (this.bodybounce > 0){
	 		this.towerbody.scale.x = this.scale+(Math.sin(this.animcounter))*(this.bodybounce*this.scale);
	 		this.towerbody.scale.y = this.scale+(Math.cos(this.animcounter))*(this.bodybounce*this.scale);
 		}

 		if (this.myfakespeed > 0.1)
 			this.towerbody.rotation = Math.atan2(this.vel.x, this.vel.y);	
 		
 		if (this.body_flash.counter > 0){
 			this.body_flash.counter--;
 		}else{
 			this.body_filter.matrix = this.normal_colorMatrix;
		}
			
		if (this.dying == true){
			this.scale += 0.07;
			this.towerbody.alpha += -0.07;
		}

 	},

 	updateStatus: function(){

 		if ((this.dying == false) && (this.health <= 0)) this.startDying();
 		if (this.towerbody.alpha <= 0) this.timeToDieAndBeRemoved();
 		if (this.current_reload < this.full_reload) {
 			this.current_reload = 	this.current_reload + this.reload_speed;
 		}

 		if (this.current_reload > this.full_reload){
 			this.current_reload = this.full_reload;
 		}

 		
 		if (this.boosting){
 			this.currentenergy = this.currentenergy - this.maxboostpower;
 		}else{
 			this.currentenergy = this.currentenergy + this.energyrecharge;
 		}

 		if (this.currentenergy < 0)
 			this.currentenergy = 0;


 		if (this.currentenergy > this.fullenergy)
 			this.currentenergy = this.fullenergy;
 		
 	},


 	updateForce: function(){
 		
 		
 		if ((this.currentenergy == 0) || (this.checkboostdist())){
 			this.stopBoost();
 		}	

		if (this.boosting) {
	 		this.boostangle = Math.atan2((this.boosttarget.y-this.pos.y), (this.boosttarget.x-this.pos.x));
			this.boostforce.x = Math.cos(this.boostangle)*this.boostpower;
			this.boostforce.y = Math.sin(this.boostangle)*this.boostpower;
		}else{
			this.boostforce.x = 0;
			this.boostforce.y = 0;
		}	

		this.magnetic_force.x = 0;
		this.magnetic_force.y = 0;

		var total_mag_force = 0;
		var dist = 0


		for(var j = 0; j < this.pushing_pulling_me.length; j++){
			
			if (this.allowedToPushPullMe(this.pushing_pulling_me[j].character_class)){

				dist = this.distToTowerNoSqrt(this.pushing_pulling_me[j]);
				if (dist > this.pushing_pulling_me[j].magnetic_inner_range){

					total_mag_force = (this.pushing_pulling_me[j].magnetic_charge)
					angle = Math.atan2(this.pos.y-this.pushing_pulling_me[j].pos.y, this.pos.x-this.pushing_pulling_me[j].pos.x)

					this.magnetic_force.x += Math.cos(angle) * total_mag_force;
					this.magnetic_force.y += Math.sin(angle) * total_mag_force;
				}else{
					/*total_mag_force = 50;
					angle = Math.atan2(this.pos.y-this.pushing_pulling_me[j].pos.y, this.pos.x-this.pushing_pulling_me[j].pos.x)

					this.magnetic_force.x += Math.cos(angle) * total_mag_force;
					this.magnetic_force.y += Math.sin(angle) * total_mag_force;*/
				}
			}		
		}



		this.final_force.x = this.boostforce.x + this.magnetic_force.x;
		this.final_force.y = this.boostforce.y +  this.magnetic_force.y;
	 	
		
	},

	allowedToPushPullMe: function(char_class){

		//console.log("this.character_class: ", this.character_class);
		//console.log("char_class: ", char_class);
		
		if (this.can_push_pull_me.indexOf(char_class) == -1){
			//console.log("false");
			return false;
		}else{
			//console.log("true");
			return true;
		}

	},

 	updateFric: function(){
		this.movementfric.x = -((this.vel.x * this.fric_coeff)); 
	 	this.movementfric.y = -((this.vel.y * this.fric_coeff));
 			
 	},


 	updateMove: function(){
	 
	 		this.acc.x = (this.final_force.x + this.movementfric.x) / (this.mass*4); 
	 		this.acc.y = (this.final_force.y + this.movementfric.y) / (this.mass*4);

	 		this.vel.x += this.acc.x;
	 		this.vel.y += this.acc.y;
	 		
	 		this.pos.x += this.vel.x;
	 		this.pos.y += this.vel.y;

	 		this.sprite.position.x = this.pos.x;
	 		this.sprite.position.y = this.pos.y;

 			this.myfakespeed = (Math.abs(this.vel.x) + Math.abs(this.vel.y));

 	},


 	updatePhysicsMovement: function(){

 			this.updateForce();
 			this.updateFric();
 			this.updateMove();
 		
 	},

 	updateAI: function(){

		this.mind.update();
 		

 	},


 	updatePeriodic: function(){
 	
	 	this.healthpercentage = (this.health/this.maxhealth) * 100;

	 	if (this.healthpercentage != 100) {
		 	if ( (this.age) % Math.floor((2+ ((0.0005)*Math.pow(this.healthpercentage,3)))) == 0){
		 		this.level.makeSmoke(1, this.pos.x, this.pos.y, this.body.width, this.body.scale.x);
		 		if (this.health < 50){
		 			if ((this.age % 2)== 0)
		 				this.level.makeSparks(1, this.pos.x, this.pos.y);
		 	
		 		}
		 	}
	 	}

	 	if (this.boosting == true){
	 		this.level.makeBooster(1, this.pos.x, this.pos.y, this.vel.x, this.vel.y, this.character_class, (this.body.texture.width/2)*this.body.scale.x);	
	 		
	 		if ((this.age % 6) == 0){
	 			createjs.Sound.play("blurm", {loop:0,	volume:0.7});	
	 		}
	 		
	 	}
 	},

 	update: function(){
 		
 		
 		
 		this.age += 1;
 		this.updatePhysicsMovement();
		this.updateAnimation();
		this.updatePeriodic();
		this.updateStatus();
		this.updateAI();

 	},

 	clearSprites: function(){

 		//this.body.clear();
 		
 		this.hud.clear();
 		
 		
 	},
    
});	

