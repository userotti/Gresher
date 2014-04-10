
Tower = gamecore.DualPooled('Tower',
  {
    // Static constructor
    create:function (charparams, posparams, miscparams, worldparam)
    {
       var t = this._super();
       
       t.myworld = worldparam;

       t.setStats(charparams);
       t.setPos(posparams);
	   t.buildBody();
	   t.buildHud();

       t.sprite.addChild(t.body);
       //t.sprite.addChild(t.weapon);


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
 	speed: 0,
 	shield: 0,
 	shielrecharge: 0,
 	range: 0,
 	reload: 0,
 	damage: 0,
 	energy: 0,
 	energyrecharge: 0,
 	magneticcharge: 0,
 	magneticrange: 0,
 	
 	maxboostpower: 0,



 	//visual aspects
 	sprite: 0,
 	body: 0,
 	weapon: 0,
 	hud: 0,
 	scale: 0,
 	myworld: 0,

 	//animation
 	bodybounce: 0,
 	bodyrotation_speed: 0,
 	weaponrotation_speed: 0,

 	//movement
 	pos: 0,
 	vel: 0,
 	acc: 0,
 	boostforce: 0,
 	movementfric: 0,
 	staticfric: 0,
 	
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

 			

 	//misc
 	animcounter: 0,
 	animcounterstep: 0.15,

 	init: function()
	{
	    console.log("news");
	    
	    this.sprite = new PIXI.SmaatObjectContainer();
 		this.body = new PIXI.SmaatGraphics();
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
	},
 

 	setStats: function(charparams){

 		this.character_class = charparams.character_class;
 		this.mass = charparams.mass;
	 	this.health = charparams.name;
	 	this.speed = charparams.speed;
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
 		


 	},

 	setPos: function(posparams){

 		this.pos.x = posparams.posx;
		this.pos.y = posparams.posy;

		this.sprite.position.x = this.pos.x;
		this.sprite.position.y = this.pos.y;

		this.vel.x = 0;
		this.vel.y = 0;
		
		this.acc.x = 0;
		this.acc.y = 0;

		this.boosttarget.x = 0;
		this.boosttarget.y = 0;

		this.boostpower = 0;
				


 	},

 	buildBody: function(){

 		var x,y;
 		var x1,y1,x2,y2;

 		
 		this.body.scale.x = this.scale;
		this.body.scale.y = this.scale;	
		
		switch (this.character_class){

		case "jelly" : 

				for (var i = 0; i <  5; i++) {

					x = Math.floor(Math.random() * 30)-15;
					y = Math.floor(Math.random() * 30)-15;
					radius = 5;

					this.body.beginFill(color_rooi1(i+4), 1);
					this.body.drawCircle(x, y, 5);
					this.body.endFill();		
		
					this.body.beginFill(color_rooi1(i+5), 1);
					this.body.drawCircle(x/2, y/2, 7.5);
					this.body.endFill();	
			
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

			};	
		
			
			break;			
	
		}

		

 	},


 	buildHud: function(){

 		for (var i = 0; i < this.damage; i++) {
							
			this.weapon.beginFill(0xFFFFFF, 0.2);
			this.weapon.drawCircle(Math.cos(((Math.PI * 2) / this.damage)*i)*this.range, Math.sin(((Math.PI * 2) / this.damage)*i)*this.range, (this.damage/2)+1);
			this.weapon.endFill();		

		};

		this.weapon.rotation = Math.random()*Math.PI;		

 	},



 	basicTween: function (t, b, c, d) {
	t /= (d);
	t--;

	
	return c*(t*t*t + 1) + b;
	},

 	updateAnimation: function(){

 		this.animcounter += this.animcounterstep;

 		this.body.scale.x = this.scale+(Math.sin(this.animcounter))*(this.bodybounce*this.scale);
 		this.body.scale.y = this.scale+(Math.cos(this.animcounter))*(this.bodybounce*this.scale);
 		this.body.rotation =  Math.atan2(this.vel.y, this.vel.x);
 		this.weapon.rotation = this.weapon.rotation + -((this.animcounterstep)*(this.reload/this.range)) * 0.1;

 		if (this.moving)
 		this.body.rotation += 0.05;

 		this.body.rotation += this.bodyrotation_speed;

 	},
/*
 	updateTweenMovement: function(){

 		if (this.moving == true){
 		
 		  this.sprite.position.x = this.basicTween(this.movingframe, this.pos.x, this.movevect.x, this.moveframes);
 		  this.sprite.position.y = this.basicTween(this.movingframe, this.pos.y, this.movevect.y, this.moveframes);

 		  this.movingframe += 1;

 		  if (this.movingframe >= this.moveframes)
 		  	this.stopMoving(); 

 		}
 	},


 	
 	startTweenMoving: function(x,y){

 		this.pos.x = this.sprite.position.x;
		this.pos.y = this.sprite.position.y;

 		this.moving = true;
 		this.movingframe = 0;
 		
 		this.movevect.x = x-this.pos.x;
		this.movevect.y = y-this.pos.y;

		this.moveframes = Math.sqrt(Math.pow(this.movevect.x, 2) + Math.pow(this.movevect.y, 2)) * this.speed;


		//this.bodyrotation_speed = this.bodyrotation_speed + 0.05;


 	},

 	stopTweenMoving: function(){

 		this.moving = false;
 		this.movingframe = 0;
 		this.pos.x = this.sprite.position.x;
		this.pos.y = this.sprite.position.y;

		//this.bodyrotation_speed = this.bodyrotation_speed - 0.05;

 	},*/

 	
 	checkboostdist: function(){


		  return ( (Math.abs(this.boosttarget.x - this.pos.x) * 2 < (50)) && (Math.abs(this.boosttarget.y - this.pos.y) * 2 < (50)) );
		
 	},

 	startBoost: function(px,py){

 		this.boosttarget.x = px;
 		this.boosttarget.y = py;

 		this.boostpower = this.maxboostpower;
 	},

 	stopBoost: function(px,py){

 		this.boostpower = 0;
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


		this.movementfric.x = -((this.vel.x * 0.20)); 
	 	this.movementfric.y = -((this.vel.y * 0.20));
 		
 		
 			
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

	 	
 		

 	},


 	updatePhysicsMovement: function(){

 			this.updateBoost();

 			this.updateFric();

 			this.updateMove();
 			


 			

 		
 	},

 	updateAI: function(){

 		

 		if (((this.age % 100) == 0) && (!this.controlled)){

 			console.log("yof");

 			this.startBoost(this.pos.x+(Math.random()*500 - 250), this.pos.y+(Math.random()*500 - 250));


 		}


 	},



 	update: function(){

 		
 		this.age += 1;

 		//this.updateTweenMovement();

 		this.updatePhysicsMovement();
		this.updateAnimation();

		this.updateAI();
 		 

 	},

 	releaseMe: function(){

 		this.body.clear();
 		this.hud.clear();
 		this.weapon.clear();
 		this.removeFromStage();
		this.release();



 	},

 	addToWorld: function(){

 		this.myworld.addChild(this.sprite);


 	},

 	removeFromStage: function(){

 		this.myworld.removeChild(this.sprite);


 	},



    
  });	

