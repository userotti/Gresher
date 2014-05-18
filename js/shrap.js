Shrap = gamecore.DualPooled('Shrap',
  {
    // Static constructor
    create:function (charparams, posparams, effectlayerparam)
    {
       var s = this._super();
       
      // console.log(effectlayerparam);
      s.mylayer = effectlayerparam;
       
       s.setStats(charparams);
       s.setPos(posparams);
	   s.buildBody();
	   
       //s.sprite.addChild(s.body);
       s.addToLayer();
       
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
 	mylayer: 0,

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

		this.body.alpha = this.startalpha;

		this.body.clear();
		
		
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

		case "smoke" :	


					var x,y

					x = -1;
					y = -1;

					this.body.beginFill(0xb4a2a1, 1);
					this.body.drawRect(-2+x,-4+y, 4, 8);
					this.body.drawRect(-4+x,-2+y, 8, 4);
					this.body.endFill();
					
				
				/*this.body.beginFill(0xFFFFFF, 1);	
				
					this.body.drawEllipse((Math.random()*4) -2, (Math.random()*4) -2, Math.random()*30, Math.random()*30);

				this.body.endFill();	
		*/
		
			
		break;	

		case "spark" :	

				

				x1 = ((Math.random()*5)-2.5);
				y1 = ((Math.random()*5)-2.5);


				x2 = ((Math.random()*5)-2.5);
				y2 = ((Math.random()*5)-2.5);

					
				this.body.beginFill(0xffff00, 1);	
						
					this.body.moveTo(x1,y1);
					this.body.lineTo(x2,y2);
					this.body.lineTo(-x1-x2,-y1-y2);
					this.body.lineTo(x1,y1);
						
				this.body.endFill();	
					
				
		
				/*this.body.beginFill(0xFFFFFF, 1);	
				
					this.body.drawEllipse((Math.random()*4) -2, (Math.random()*4) -2, Math.random()*30, Math.random()*30);

				this.body.endFill();	
		*/
		
			
		break;					
				
	
		}

		this.body.cacheAsBitmap = true;

		

 	},

 	updateAnimation: function(){

 		this.body.rotation += this.bodyrotation_speed; 

 		this.body.scale.x += this.scaleup_speed;
 		this.body.scale.y += this.scaleup_speed;
 		
 		
 		if (this.body.alpha > 0) {

 			this.body.alpha = this.body.alpha - this.alphadecrease;
 			//console.log(this.body.alpha);	
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


		if (this.body.alpha  <= 0) this.releaseMePlease(); 

	

 	},


 	releaseMePlease: function(){

 		
 		this.body.clear();

		this.releaseMeFromList = true;



 	},

 	addToLayer: function(){

 		
 		this.mylayer.addChild(this.body);


 	},

 	removeFromWorld: function(){

 		this.mylayer.removeChild(this.body);


 	},

  });	 	