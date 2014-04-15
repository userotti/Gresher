Shrap = gamecore.DualPooled('Shrap',
  {
    // Static constructor
    create:function (charparams, posparams, miscparams, worldparam)
    {
       var s = this._super();
       
       s.myworld = worldparam;
       
       s.setStats(charparams);
       s.setPos(posparams);
	   s.buildBody();
	   
       //s.sprite.addChild(s.body);
       s.addToWorld();
       
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
 	scale: 0,
 	myworld: 0,

 	//animation
 	bodybounce: 0,
 	bodyrotation_speed: 0,
 	velsumremove: 0,
 	drawmefullalpha: 0,

 	
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
	   
	    console.log("new shraps");
	    //this.sprite = new PIXI.SmaatObjectContainer();
 		this.body = new PIXI.SmaatGraphics();
 	
		
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
 		this.scale = 1;
 		this.fric_coeff = charparams.fric_coeff;
 		this.releaseMeFromList = false;
 		this.velsumremove = charparams.velsumremove;
 		this.drawmefullalpha = charparams.drawmefullalpha;

 	},

 	setPos: function(posparams){

 		this.pos.x = posparams.posx;
		this.pos.y = posparams.posy;

		this.body.position.x = this.pos.x;
		this.body.position.y = this.pos.y;

		this.vel.x = posparams.velx;
		this.vel.y = posparams.vely;
		
		this.acc.x = 0;
		this.acc.y = 0;



 	},	

 

 	buildBody: function(){

 		var x,y;
 		var x1,y1,x2,y2;

 		this.body.scale.x = this.scale;
		this.body.scale.y = this.scale;	

		
		
		switch (this.shrap_class){

		case "jelly" : 

				for (var i = 0; i <  3; i++) {

					x = Math.floor(Math.random() * 10)-5;
					y = Math.floor(Math.random() * 10)-5;
					radius = 2;

					this.body.beginFill(color_rooi1(i+4), 1);
					this.body.drawCircle(x, y, radius);
					this.body.endFill();
	 

					this.body.beginFill(color_rooi1(i+5), 1);
					this.body.drawCircle(x/2, y/2, radius*1.5);
					this.body.endFill();	

			
				}

				
				break;

		case "stalagmite" :	

	
			for (var i = 0; i <  5; i++) {


				x1 = ((Math.random()*10)-5);
				y1 = ((Math.random()*10)-5);


				x2 = ((Math.random()*10)-5);
				y2 = ((Math.random()*10)-5);

			

				this.body.beginFill(color_blou1(Math.floor((i/1.8)) +6), 1);	
						
					this.body.moveTo(x1,y1);
					this.body.lineTo(x2,y2);
					this.body.lineTo(-x1-x2,-y1-y2);
					this.body.lineTo(x1,y1);
						
				this.body.endFill();	

			

			};	
		
			
			break;	

		case "track" :	

					this.body.beginFill(0xffee44, 1);
					this.body.drawRect(-1.5,-4, 3, 8);
					this.body.drawRect(-4,-1.5, 8, 3);
					this.body.endFill();
					
				
		
				/*this.body.beginFill(0xFFFFFF, 1);	
				
					this.body.drawEllipse((Math.random()*4) -2, (Math.random()*4) -2, Math.random()*30, Math.random()*30);

				this.body.endFill();	
		*/
		
			
		break;			
				
	
		}

		

 	},

 	updateAnimation: function(){

 		this.body.rotation += this.bodyrotation_speed; 
 		
 		if ((Math.abs(this.vel.x) + Math.abs(this.vel.y)) > this.drawmefullalpha){

 			this.body.alpha = 1;

 		}else{

 			this.body.alpha = (Math.abs(this.vel.x) + Math.abs(this.vel.y)) * (1/this.drawmefullalpha);

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

	 		this.body.position.x = this.pos.x;
	 		this.body.position.y = this.pos.y;

	 		
	
 	
 	},


 	updatePhysicsMovement: function(){


 			this.updateFric();
			this.updateMove();
 	
 		
 	},


 	update: function(){

 		
 	
 		this.updatePhysicsMovement();
		this.updateAnimation();


		if (Math.abs(this.vel.x+this.vel.y)   <  this.velsumremove) this.releaseMePlease(); 

	

 	},


 	releaseMePlease: function(){

 		
 		this.body.clear();

		this.releaseMeFromList = true;



 	},

 	addToWorld: function(){

 		this.myworld.addChildAt(this.body, 0);


 	},

 	removeFromWorld: function(){

 		this.myworld.removeChild(this.body);


 	},

  });	 	