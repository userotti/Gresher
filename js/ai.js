
Ai = function(mytower, aiparams){
	
	this.mytower = mytower;


	this.player = 0;
	this.moveradius = 0;
	this.alone = 0;
	this.withfriends = 0;
	this.withtargets = 0;
	this.withfriendstargets = 0;
	this.destination = 0;

	this.friendmemory = 0;
	this.targetmemory = 0;

	this.destination_memory = 0;

	this.destx = 0;
	this.desty = 0;
	
	



	this.environment = "";
	

}

Ai.prototype.constructor = Ai;

Ai.prototype.setAi = function(aiparams)
{

	this.player = aiparams.player;
	this.moveradius = aiparams.moveradius;
	console.log(this.moveradius);

	this.alone = aiparams.alone;
	this.withfriends = aiparams.withfriends;
	this.withtargets = aiparams.withtargets;
	this.withfriendstargets = aiparams.withfriendstargets;

	this.friendmemory =  aiparams.friendmemory;
	this.targetmemory =  aiparams.targetmemory;
	

};

Ai.prototype.updateAttack = function()
{	
	if (this.mytower.reload_time_left == 0){

		if (this.mytower.targets.length != 0)
	    	this.mytower.shoot(this.mytower.targets[0]);

	}    		

};

Ai.prototype.updateEnvironment = function()
{
	
	if ((this.mytower.friends.length == 0) && (this.mytower.targets.length == 0)){

		this.environment = "alone";
		return;
	}

	if ((this.mytower.friends.length == 0) && !(this.mytower.targets.length == 0)){

		this.environment = "withfriends";
		return;

	}

	if (!(this.mytower.friends.length == 0) && (this.mytower.targets.length == 0)){

		this.environment = "withtargets";
		return;

	}

	if (!(this.mytower.friends.length == 0) && !(this.mytower.targets.length == 0)){

		this.environment = "withfriendstargets";
		return;

	}



	
	    

};

Ai.prototype.updateMove = function()
{
	if (this.mytower.currentenergy >= this.mytower.fullenergy){

	if (this.environment == "alone"){




	} else
	
		if ((this.environment == "withfriends") || (this.environment == "withtargets") || (this.environment == "withfriendstargets")){


			if (!this.mytower.controlled){
					

					this.mytower.startBoost(this.mytower.pos.x+(Math.random()*this.moveradius*2) - this.moveradius, this.mytower.pos.y+(Math.random()*this.moveradius*2) - this.moveradius);
					
					this.mytower.currentenergy = 0;
			}


		}
		
	}

		

};



Ai.prototype.update = function()
{

	this.updateEnvironment();
	
	//this.updateAttack();
	this.updateMove();

	


}; 

BASICJELLY_GEDAGTE = {
	
	"player" : false,
	"moveradius" : 100,
	"alone" : "random",
	"withfriends" : "followstrongest",
	"withtargets" : "attackclosesttilldead",
	"withfriendstargets" : "attackclosesttilldead",

	"friendmemory" : 50,
	"targetmemory" : 50,

	


};

BASICJELLY_PLAYER = {
	
	"player" : true,
	"moveradius" : 100,
	"alone" : "",
	"withfriends" : "",
	"withtargets" : "",
	"withfriendstargets" : "",

	"friendmemory" : 0,
	"targetmemory" : 0,
	


};

/*

STILLAI = function(tower){

	//if (this.targets.length != 0)
	//		this.attackAction();

 	
}

STILL_BUT_ATTACKING_AI = function(tower){

	if (this.targets.length != 0)
			this.attackAction();


 	
}


SQUARE250_100MOVE_AI = function(tower){

		if (this.targets.length != 0)
			this.attackAction();

 		if (((tower.age % 100) == 0) && (!tower.controlled)){
		

 			tower.startBoost(tower.pos.x+(Math.random()*500 - 250), tower.pos.y+(Math.random()*500 - 250));


 		}

}


SQUARE100_30MOVE_AI = function(tower){

 		if (this.targets.length != 0)
			this.attackAction();	

 		if (((tower.age % 30) == 0) && (!tower.controlled)){
		

 			tower.startBoost(tower.pos.x+(Math.random()*200 - 100), tower.pos.y+(Math.random()*200 - 100));


 		}

}

SQUARE150_50MOVE_AI = function(tower){

 		if (this.targets.length != 0)
			this.attackAction();		

 		if (((tower.age % 50) == 0) && (!tower.controlled)){
		

 			tower.startBoost(tower.pos.x+(Math.random()*300 - 150), tower.pos.y+(Math.random()*300 - 150));


 		}

}

BASIC_DESTINATION_100TIC_AI = function(tower){

		if (this.targets.length != 0)
			this.attackAction();
 		
 		if (((tower.age % 100) == 0)){
		

 			tower.startBoost(tower.pos.x+(Math.random()*300 - 150), tower.pos.y+(Math.random()*300 - 150));


 		}

}



BASICAI = function(tower){

 		if (((tower.age % tower.ai_timepercall) == 0) && (!tower.controlled)){
		

 			tower.startBoost(tower.pos.x+(Math.random()*500 - 250), tower.pos.y+(Math.random()*500 - 250));


 		}

} */