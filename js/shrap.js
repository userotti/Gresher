Shrap = gamecore.DualPooled('Shrap',
  {
    // Static constructor
    create:function (charparams, posparams)
    {
       var s = this._super();
       
      // console.log(effectlayerparam);
       
       s.setStats(charparams);
       s.setPos(posparams);
	   s.buildBody();
	   
       
       s.animcounter = Math.random()*Math.PI;
       
       return s;

    }
  },
  
  {
      
 	//look and stats
 	shrap_class:'',
 	

 	//visual aspects
 	sprite: 0,
 	body: 0,
 	body_container: 0,
 	scale: 0,
 	y_offset: 0,

 	//animation
 	bodybounce: 0,
 	bodyrotation_speed: 0,
 	startalpha: 0,
 	alphadecrease: 0,
 	scaleup_speed: 0,

 	
 	//movement
 	pos: 0,
 	vel: 0,
 	acc: 0,
 	movementfric: 0,
 	staticfric: 0,
 	fric_coeff: 0,
 	
 	//misc
 	animcounter: 0,
 	animcounterstep: 0.15,

 	//status

 	releaseMeFromList: false,
	

 	init: function()
	{
	 	this.body_container = new PIXI.SmaatObjectContainer();  
 		this.body = new PIXI.Sprite();

 		this.pos = new PIXI.Point();
		this.vel = new PIXI.Point();
	 	this.acc = new PIXI.Point();
	 	
	 	this.movementfric = new PIXI.Point();
	 	this.staticfric = new PIXI.Point();

	},
 

 	setStats: function(charparams){

 		this.shrap_class = charparams.shrap_class;
 		this.bodybounce = charparams.bodybounce;
 		this.bodyrotation_speed = charparams.bodyrotation_speed;
 		this.scale = charparams.scale;
 		this.fric_coeff = charparams.fric_coeff;
 		this.releaseMeFromList = false;
 		
 		this.startalpha = charparams.startalpha;
 		this.alphadecrease = charparams.alphadecrease;

 		this.scaleup_speed = charparams.scaleup_speed;
 		

 	},

 	setPos: function(posparams){

 		this.pos.x = posparams.posx;
		this.pos.y = posparams.posy;

		this.body_container.position.x = this.pos.x;
		this.body_container.position.y = this.pos.y;

		this.vel.x = posparams.velx;
		this.vel.y = posparams.vely;
		
		this.acc.x = 0;
		this.acc.y = 0;

		this.body_container.rotation = posparams.rotation;

		
		this.y_offset = posparams.y_offset;	
		//this.body.rotation = 
		
 	},	
/*
 	drawweaponflame: function(length,starty,sidewidth, midheight, angle,color){

 		this.body.beginFill(color, 1);	
			this.body.moveTo(Math.cos(angle)*length, starty + (Math.sin(angle)*length));
			this.body.lineTo(-sidewidth*Math.cos(angle-Math.PI/2) - midheight*Math.sin(angle-Math.PI/2), -sidewidth*Math.sin(angle-Math.PI/2) + midheight*Math.cos(angle - Math.PI/2) + starty);
			this.body.lineTo(0,starty);
			this.body.lineTo(sidewidth*Math.cos(angle-Math.PI/2) - midheight*Math.sin(angle-Math.PI/2), sidewidth*Math.sin(angle-Math.PI/2) + midheight*Math.cos(angle-Math.PI/2) + starty);
			this.body.lineTo(Math.cos(angle)*length, starty + (Math.sin(angle)*length));
		this.body.endFill();
 	},
*/
 	

 	buildBody: function(){

 		var x,y;
 		var x1,y1,x2,y2;

 		this.body.scale.x = this.scale;
		this.body.scale.y = this.scale;
		this.body.alpha = this.startalpha;

		//this.body.clear();

		switch (this.shrap_class){

		case "bot1_flash" : 
				
				var texture = PIXI.Texture.fromFrame("bot1_flash.png");
				this.body.setTexture(texture);

				console.log("this.y_offset", this.y_offset);
				this.body.position.x = -((texture.width*this.body.scale.x)/2);
	 			this.body.position.y = -((texture.height*this.body.scale.y)/2) - this.y_offset;
				
		break;

		case "spark" :	

				var texture = PIXI.Texture.fromFrame("spark1.png");
				this.body.setTexture(texture);

				this.body.position.x = -((texture.width*this.body.scale.x)/2);
	 			this.body.position.y = -((texture.height*this.body.scale.y)/2);
			
		break;

		case "mushroom" : 

				var texture = texturegroups.getMushroomShrap();
				this.body.setTexture(texture);

				this.body.position.x = -((texture.width*this.body.scale.x)/2);
	 			this.body.position.y = -((texture.height*this.body.scale.y)/2);
				
		break;


		case "smoke" :	

			var x,y
			var texture = PIXI.Texture.fromFrame("smoke1.png");
			this.body.setTexture(texture);

			this.body.position.x = -((texture.width*this.body.scale.x)/2);
	 		this.body.position.y = -((texture.height*this.body.scale.y)/2);

		

		break;	

		}

		this.body_container.addChild(this.body);
 	},

 	updateAnimation: function(){

 		this.body_container.rotation += this.bodyrotation_speed; 
 		this.body.scale.x += this.scaleup_speed;
 		this.body.scale.y += this.scaleup_speed;
 		
 		if (this.body.alpha > 0) {
 			this.body.alpha = this.body.alpha - this.alphadecrease;
 		}

 	},

 	updateFric: function(){

		this.movementfric.x = -((this.vel.x * this.fric_coeff)); 
	 	this.movementfric.y = -((this.vel.y * this.fric_coeff));
 			
 	},

 	updateMove: function(){
	 
 		this.acc.x = this.movementfric.x;
 		this.acc.y = this.movementfric.y;

 		this.vel.x += this.acc.x;
 		this.vel.y += this.acc.y;
 		
 		this.pos.x += this.vel.x;
 		this.pos.y += this.vel.y;

 		this.body_container.position.x = this.pos.x;
 		this.body_container.position.y = this.pos.y;

 	
 	},

 	updatePhysicsMovement: function(){

		this.updateFric();
		this.updateMove();
 		
 	},

 	update: function(){
 	
 		this.updatePhysicsMovement();
		this.updateAnimation();

		if (this.body.alpha  <= 0) this.releaseMePlease(); 

 	},

 	releaseMePlease: function(){

 		//this.body.clear();
		this.releaseMeFromList = true;

 	},

});	 	