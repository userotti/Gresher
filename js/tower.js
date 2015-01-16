
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
 	
 	magneticcharge: 0,
 	magneticweapon_range: 0,
 	maxboostpower: 0,
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

 	closeenoughtodestination: 50,

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
	 	this.movementfric = new PIXI.Point();
	 	this.staticfric = new PIXI.Point();
	 	this.boosttarget = new PIXI.Point();
		this.movevect = new PIXI.Point();

		this.mind = new Ai(this);
		
		this.teams = [];
		this.targets = [];
		this.friends = [];

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
  		this.body.filters = [this.body_filter];


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
	 	this.magneticcharge = charparams.magneticcharge;
 		this.magneticweapon_range = charparams.magneticweapon_range;
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

 		

 		//this.body.tint = 0xFFFFFF
 		/*
 		var x,y;
 		var x1,y1,x2,y2;

 		this.towerbody.scale.x = this.scale;
		this.towerbody.scale.y = this.scale;	

		this.body_flash.visible = false;
		this.body_flash.counter = 0;
		*/
		switch (this.character_class){

		case "jelly" : //getGrom

			var texture = texturegroups.getGrom();
			
	 		//console.log("texture", texture);
	 		this.body.setTexture(texture);
	    	
	 		this.body.scale.x = 0.25;
	 		this.body.scale.y = 0.25;
			
			this.body.position.x = -((texture.width*this.body.scale.x)/2);
	 		this.body.position.y = -((texture.height*this.body.scale.y)/2);
	 		
	 		this.towerbody.rotation = Math.PI;
	 		this.towerbody.addChild(this.body);


				/*

				for (var i = 0; i <  5; i++) {

					x = Math.floor(Math.random() * 30)-15;
					y = Math.floor(Math.random() * 30)-15;
					radius = 5;

					this.body.beginFill(color_rooi1(i+4), 1);
					this.body.drawCircle(x, y, 5);
					this.body.endFill();

						
					this.body_flash.beginFill('0xffffff', 1);
					this.body_flash.drawCircle(x, y, 5);
					this.body_flash.endFill();	
					 

					this.body.beginFill(color_rooi1(i+5), 1);
					this.body.drawCircle(x/2, y/2, 7.5);
					this.body.endFill();	

					this.body_flash.beginFill('0xffffff', 1);
					this.body_flash.drawCircle(x/2, y/2, 7.5);
					this.body_flash.endFill();
					
				}*/
				
		break;

		case "stalagmite" :	

			var texture = PIXI.Texture.fromFrame("clawbot.png");
		
	 		//console.log("texture", texture);
	 		
	 		this.body.setTexture(texture);
	    	
	 		this.body.scale.x = 0.25;
	 		this.body.scale.y = 0.25;
			
			this.body.position.x = -((texture.width*this.body.scale.x)/2);
	 		this.body.position.y = -((texture.height*this.body.scale.y)/2);

	 		this.towerbody.rotation = Math.PI;
	 		this.towerbody.addChild(this.body);

	 		
  			
	 	

			/*
			
			for (var i = 0; i <  10; i++) {


				x1 = ((Math.random()*30)-15);
				y1 = ((Math.random()*30)-15);
				x2 = ((Math.random()*30)-15);
				y2 = ((Math.random()*30)-15);

				this.body.beginFill(color_blou1(Math.floor((i/1.8)) +6), 1);	
				this.body.moveTo(x1,y1);
				this.body.lineTo(x2,y2);
				this.body.lineTo(-x1-x2,-y1-y2);
				this.body.lineTo(x1,y1);
						
				this.body.endFill();	
				this.body_flash.beginFill('0xffffff', 1);	
					this.body_flash.moveTo(x1,y1);
					this.body_flash.lineTo(x2,y2);
					this.body_flash.lineTo(-x1-x2,-y1-y2);
					this.body_flash.lineTo(x1,y1);
				this.body_flash.endFill();	

			};	*/
			
			break;			
	
		}
/*
		this.towerbody.addChild(this.body);
		this.towerbody.addChild(this.body_flash);	
 		
 		this.body.cacheAsBitmap = true;
		this.body_flash.cacheAsBitmap = true;

		this.body.alpha = 1;

		this.towerbody.alpha = 1;
		this.towerbody.cacheAsBitmap = false;
		console.log(this.towerbody.cacheAsBitmap);*/
		
 	},

 	distToPoint: function(x1,y1,x2,y2){
 		return Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));

 	},

 	

 	/*ANIMATION FUNCTIONS */

 	attackAction: function(){

 		this.shoot(this.targets[0]);

 	},

 	addToTargetsOrFriends: function(target_tower){

 		if (!this.checkTeam(target_tower)){
 			
 			this.targets.push(target_tower);
 		}else{
 			this.friends.push(target_tower);	
 			
 		}	

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
			
			
			if (this.character_class === 'jelly'){
				createjs.Sound.play("nes_laser_shot", {loop:0,
				pan: dynamicPan,
				volume:dynamicVolume});
			} else if (this.character_class === 'stalagmite'){
				createjs.Sound.play("nes_laser_shot2", {loop:0, 
				pan: dynamicPan,
				volume:dynamicVolume});
			}	
			
			
			this.level.makeWeaponFlames(1, this.pos.x, this.pos.y, target_tower.pos.x, target_tower.pos.y, this.character_class);

			this.level.makeSparks(6, this.pos.x, this.pos.y);
			this.current_reload = 0;

	},

	checkTeam: function(target_tower){

		for (var i=0; i < this.teams.length; i++){
			 if (target_tower.teams.indexOf(this.teams[i]) != -1)
			 	return true;
		}
		return false;

	},

 	bodyHitFlash: function(length){

		
		this.body_flash.counter = length;
		this.body_filter.matrix = this.white_colorMatrix;
	 		

	},
	
	distanceFrom: function(other){
		
		
		
		this.health = this.health - attacker.damage;
		this.bodyHitFlash(5);
		this.level.makeHitShards(attacker.damage/15, this.pos.x, this.pos.y, this.character_class);
	 	this.level.makeSparks(attacker.damage/10, this.pos.x, this.pos.y);

	},
	

	iveBeenHitBy: function(attacker){

		this.health = this.health - attacker.damage;
		this.bodyHitFlash(5);
		this.level.makeHitShards(attacker.damage/15, this.pos.x, this.pos.y, this.character_class);
	 	this.level.makeSparks(attacker.damage/10, this.pos.x, this.pos.y);

	},

	startDying:function(){

		this.dying = true;
		this.bodyHitFlash(6);	
		this.dyinganimationcounter = 30;
		this.level.makeHitShards(7, this.pos.x, this.pos.y, this.character_class);
		this.level.makeSparks(8, this.pos.x, this.pos.y);
		
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

 		if (this.boostpower == 0){
 			this.towerbody.rotation += this.bodyrotation_speed;
 		}else{
 			this.towerbody.rotation = Math.atan2(this.vel.x, this.vel.y);	
 		}
 		
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


 	updateBoost: function(){
 		
 		
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

	 	
		
	},

 	updateFric: function(){
		this.movementfric.x = -((this.vel.x * this.fric_coeff)); 
	 	this.movementfric.y = -((this.vel.y * this.fric_coeff));
 			
 	},


 	updateMove: function(){
	 
	 		this.acc.x = (this.boostforce.x + this.movementfric.x) / (this.mass*4); 
	 		this.acc.y = (this.boostforce.y + this.movementfric.y) / (this.mass*4);

	 		this.vel.x += this.acc.x;
	 		this.vel.y += this.acc.y;
	 		
	 		this.pos.x += this.vel.x;
	 		this.pos.y += this.vel.y;

	 		this.sprite.position.x = this.pos.x;
	 		this.sprite.position.y = this.pos.y;

 			this.myfakespeed = (Math.abs(this.vel.x) + Math.abs(this.vel.y));

 	},


 	updatePhysicsMovement: function(){

 			this.updateBoost();
 			this.updateFric();
 			this.updateMove();
 		
 	},

 	updateAI: function(){

		this.mind.update();
 		this.targets.length = 0;
		this.friends.length = 0;

 	},


 	updatePeriodic: function(){
 	
	 	this.healthpercentage = (this.health/this.maxhealth) * 100;

	 	if (this.healthpercentage != 100) {
		 	if ( (this.age) % Math.floor((2+ ((0.0005)*Math.pow(this.healthpercentage,3)))) == 0){
		 		this.level.makeSmoke(1, this.pos.x, this.pos.y);
		 		if (this.health < 50){
		 			if ((this.age % 2)== 0)
		 				this.level.makeSparks(1, this.pos.x, this.pos.y);
		 	
		 		}
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

