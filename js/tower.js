
Tower = gamecore.DualPooled('Tower',
  {
    // Static constructor
    create:function (charparams, posparams, teamparams, aiparam, effectlayerparam, colidelayerparam)
    {
       var t = this._super();
       
       t.mylayer = colidelayerparam;
       t.effects_layer = effectlayerparam;

       t.setStats(charparams);
       
       t.setPos(posparams);
       t.setTeams(teamparams);
	   t.aifunc = aiparam;

	   t.buildBody();
	   
       t.sprite.addChild(t.towerbody);
       t.sprite.addChild(t.weapon);



       

       t.addToWorld();
        
       
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
 	range: 0,
 	reload: 0,
 	reload_time_left: 0,
 	damage: 0,
 	energy: 0,
 	energyrecharge: 0,
 	magneticcharge: 0,
 	magneticrange: 0,
 	maxboostpower: 0,
 	alive: false,
 	dying: false,



 	//visual aspects
 	sprite: 0,
 	body: 0,
 	body_flash: 0,
 	weapon: 0,
 	hud: 0,
 	scale: 0,
 	mylayer: 0,

 	//animation
 	bodybounce: 0,
 	bodyrotation_speed: 0,
 	weaponrotation_speed: 0,
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
 	
 	boosttarget: 0,
 	boostpower: 0,	
 	boostangle: 0,

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
 	destinations: 0,

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
 		this.body = new PIXI.SmaatGraphics();
 		this.body_flash = new PIXI.SmaatGraphics();
 		this.weapon = new PIXI.SmaatGraphics();
 		this.hud = new PIXI.SmaatGraphics();

		
		this.pos = new PIXI.Point();
		this.vel = new PIXI.Point();
	 	this.acc = new PIXI.Point();
	 	
	 	this.boostforce = new PIXI.Point();
	 	this.movementfric = new PIXI.Point();
	 	this.staticfric = new PIXI.Point();


	 	this.boosttarget = new PIXI.Point();
		this.movevect = new PIXI.Point();
		
		this.teams = [];
		this.destinations = [];
		this.targets = [];



	},
 

 	setStats: function(charparams){

 		this.character_class = charparams.character_class;
 		this.mass = charparams.mass;
	 	this.maxhealth = charparams.maxhealth;
	 	this.health = this.maxhealth;
	 	
	 	this.shield = charparams.shield;
	 	this.shielrecharge = charparams.shieldrecharge;
	 	this.range = charparams.range;
	 	this.reload = charparams.reload;
	 	this.damage = charparams.damage;
	 	this.energy = charparams.energy;
	 	this.energyrecharge = charparams.energyrecharge;
	 	this.magneticcharge = charparams.magneticcharge;
 		this.magneticrange = charparams.magneticrange;
 		this.scale = charparams.mass;
 		this.bodybounce = charparams.bodybounce;
 		this.bodyrotation_speed = charparams.bodyrotation_speed;
    	this.maxboostpower = charparams.maxboostpower;
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

 	setDestinations: function(destarray){

 		while (this.destinations.length != 0){

 			this.destinations.pop();
 		
 		}

 		for (var i=0; i <= destarray.length-1; i++){

 			this.destinations.push(destarray[i]);

 		}




 	},

 	buildBody: function(){

 		var x,y;
 		var x1,y1,x2,y2;

 		
 		this.towerbody.scale.x = this.scale;
		this.towerbody.scale.y = this.scale;	

		this.body_flash.visible = false;
		this.body_flash.counter = 0;
		
		switch (this.character_class){

		case "jelly" : 

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


			
				}

			



				
				break;

		case "stalagmite" :	

	
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

			};	
		
			
			break;			
	
		}

		this.towerbody.addChild(this.body);
		this.towerbody.addChild(this.body_flash);	
 		
 		this.body.cacheAsBitmap = true;
		this.body_flash.cacheAsBitmap = true;
		
 	},

 	distToPoint: function(x1,y1,x2,y2){


 		return Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));

 	},

 	redrawWeapon: function(target_tower){
			
		this.weapon.clear();	
		
		
	
		this.weapon.lineStyle(4, 0xffffff, 0.4);
		this.weapon.drawCircle(0,0,this.distToPoint(this.pos.x, this.pos.y, target_tower.pos.x, target_tower.pos.y));
		
		this.weapon.endFill();	

		this.weapon.lineStyle(2, 0xffffff, 0.3);
		this.weapon.moveTo(0,0);
		this.weapon.lineTo(this.range,0);
		this.weapon.moveTo(0,0);
		this.weapon.lineTo(-this.range,0);
	
	
		this.weapon.alpha = 1;

		this.weapon.rotation = this.current_target_angle + Math.PI/2;
	

 	},


 	/*ANIMATION FUNCTIONS */

 	attackAction: function(){

 		this.shoot(this.targets[0]);

 	},

 	addToTargets: function(target_tower){

 		if (!this.checkTeam(target_tower)){

 			this.targets.push(target_tower);
 		}	

 	},


 	shoot: function(target_tower){

		
		if (this.reload_time_left == 0){
			
			target_tower.iveBeenHitBy(this);

			this.redrawWeapon(target_tower);
			this.reload_time_left = this.reload;
		}	


	},

	/*

	interactWith: function(target_tower){


		if (!this.checkTeam(target_tower)){

			this.shoot(target_tower);

		}


	},*/

	checkTeam: function(target_tower){


		for (var i=0; i < this.teams.length; i++){

			 if (target_tower.teams.indexOf(this.teams[i]) != -1)
			 	return true;

		}


		return false;

	},

 	bodyHitFlash: function(length){

		this.body_flash.visible = true;
		this.body_flash.counter = length;



	},

	makeSparks: function(amount){

		for (var i = 0; i < amount; i++){
			Shrap.create(BASICSPARKSHRAP, SPARKSHRAP(this.pos.x, this.pos.y),  this.effects_layer);
		}

	},


	makeHitShards: function(amount){


	 		if (this.character_class == "jelly"){

		 		for (var i = 0; i < amount; i++){
		 			Shrap.create(JELLYSHRAP, FROMMESHRAP(this.pos.x, this.pos.y),  this.effects_layer);
		 		}
	 		}
	 		if (this.character_class == "stalagmite"){

		 		for (var i = 0; i < amount; i++){
		 			Shrap.create(STALAGSHRAP, FROMMESHRAP(this.pos.x, this.pos.y),  this.effects_layer);
		 		}
	 		}
	 		if (this.character_class == "struct"){
	 			for (var i = 0; i < amount; i++){
		 			Shrap.create(STRUCTSHRAP, FROMMESHRAP(this.pos.x, this.pos.y),  this.effects_layer);
		 		}
	 		}

	},

	iveBeenHitBy: function(attacker){

			this.health = this.health - attacker.damage;

			this.bodyHitFlash(5);

	 		this.makeHitShards(4);
	 		this.makeSparks(6);

	},

	startDying:function(){

		this.dying = true;
		this.bodyHitFlash(6);	
		this.dyinganimationcounter = 30;
		this.makeSparks(8);
		this.makeHitShards(9);



	},

	timeToDieAndBeRemoved:function(){
		
		this.alive = false;

	},





	startBoost: function(px,py){

 		this.boosttarget.x = px;
 		this.boosttarget.y = py;

 		this.boostpower = this.maxboostpower;
 	},

 	stopBoost: function(px,py){

 		this.boostpower = 0;
 	},


 	/* UTILITY FUNCTIONS */

 	checkboostdist: function(){


		  return ( (Math.abs(this.boosttarget.x - this.pos.x) * 2 < (50)) && (Math.abs(this.boosttarget.y - this.pos.y) * 2 < (50)) );
		
 	},

 	
 	updateAnimation: function(){

 		this.animcounter += this.animcounterstep;

 		if (this.bodybounce > 0){

	 		this.towerbody.scale.x = this.scale+(Math.sin(this.animcounter))*(this.bodybounce*this.scale);
	 		this.towerbody.scale.y = this.scale+(Math.cos(this.animcounter))*(this.bodybounce*this.scale);
	 		
 		}

 		//this.weapon.rotation = this.weapon.rotation + -((this.animcounterstep)*(this.reload/this.range)) * 0.1;

 		if (this.boostpower == 0)
 		this.towerbody.rotation += this.bodyrotation_speed;
 		else
 		this.towerbody.rotation =  Math.atan2(this.vel.y, this.vel.x);	
 		

 		if (this.body_flash.counter > 0){
 			this.body_flash.counter--;
 		}else{
			this.body_flash.visible = false;
		}

		if (this.weapon.alpha > 0)
			this.weapon.alpha = this.weapon.alpha - 0.08;

		if (this.dying == true){

			this.scale += 0.07;
			this.towerbody.alpha += -0.07;
			

		}


			

 	},

 	updateStatus: function(){

 		if ((this.dying == false) && (this.health <= 0)) this.startDying();


 		if (this.towerbody.alpha <= 0) this.timeToDieAndBeRemoved();

 		if (this.reload_time_left > 0) this.reload_time_left--;

 	},


 	updateBoost: function(){

 			if (this.checkboostdist()) this.stopBoost();
 			

 			if ((this.boostpower) > 0) {
 				
		 		this.boostangle = Math.atan2((this.boosttarget.y-this.pos.y), (this.boosttarget.x-this.pos.x));
	


		 	}	

		 	this.boostforce.x = Math.cos(this.boostangle)*this.boostpower;
			this.boostforce.y = Math.sin(this.boostangle)*this.boostpower;
			

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

		
 		
 		this.aifunc(this);
 		this.targets.length = 0;


 	},


 	updatePeriodic: function(){
 	
	
	 	this.healthpercentage = (this.health/this.maxhealth) * 100;

	 	if (this.healthpercentage != 100) {

		 	if ( (this.age) % Math.floor((2+ ((0.0005)*Math.pow(this.healthpercentage,3)))) == 0){
		 		Shrap.create(BASICSMOKESHRAP, SMOKESHRAP(this.pos.x-3, this.pos.y-3), this.effects_layer);
		 		if (this.health < 30){
		 			if ((this.age % 2)== 0)
		 				Shrap.create(BASICSPARKSHRAP, SPARKSHRAP(this.pos.x, this.pos.y), this.effects_layer);
		 	
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




 	releaseMe: function(){

 		this.body.clear();

 		this.body_flash.clear();
 		this.hud.clear();
 		this.weapon.clear();
 		this.removeFromWorld();
		this.release();



 	},

 	addToWorld: function(){

 		this.mylayer.addChild(this.sprite);


 	},

 	removeFromWorld: function(){

 		this.mylayer.removeChild(this.sprite);


 	},



    
  });	

