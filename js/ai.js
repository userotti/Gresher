
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


	this.dest = new PIXI.Point();
	this.dest.x = 0;
	this.dest.y = 0;



	this.closet_friend = 0;

	this.closet_target = 0;
	this.target_inrange = 0;

	
	



	this.environment = 0;

	

}

Ai.prototype.constructor = Ai;

Ai.prototype.setAi = function(aiparams)
{

	this.player = aiparams.player;
	this.moveradius = aiparams.moveradius;
	

	this.alone = aiparams.alone;
	this.withfriends = aiparams.withfriends;
	this.withtargets = aiparams.withtargets;
	this.withfriendstargets = aiparams.withfriendstargets;

	this.friendmemory =  aiparams.friendmemory;
	this.targetmemory =  aiparams.targetmemory;
	

};




Ai.prototype.APointCloseTo = function(dest,cx,cy,r){

	var angle = Math.random()*Math.PI*2;


	dest.x = cx + (Math.cos(angle) * r);
	dest.y = cy + (Math.sin(angle) * r); 

	



};	 


Ai.prototype.capMoveDist = function(){


	
	var movetoangle = Math.atan2(this.mytower.pos.y - this.dest.y, this.mytower.pos.x - this.dest.x) + Math.PI;

	if ( (Math.pow(this.mytower.pos.x - this.dest.x,2) + Math.pow(this.mytower.pos.y - this.dest.y,2)) > Math.pow(this.moveradius,2)){

		this.dest.x = this.mytower.pos.x + Math.cos(movetoangle)*this.moveradius;
		this.dest.y = this.mytower.pos.y + Math.sin(movetoangle)*this.moveradius;


	}

};

Ai.prototype.setDestinationXY = function(whattodo)
{	
			
		

		switch (whattodo){



			case "chill":

				this.dest.x = this.mytower.pos.x;
				this.dest.y = this.mytower.pos.y;


			break;


			case "interaction_roam":

				this.APointCloseTo(this.dest, this.mytower.pos.x, this.mytower.pos.y, this.mytower.interaction_range * 0.7);


			break;


			case "approach_closest_target" :


				if (this.closet_target != null) {


					this.APointCloseTo(this.dest, this.closet_target.pos.x, this.closet_target.pos.y, this.mytower.weapon_range * 0.7);

					
					//this.dest.x = this.closet_target.pos.x;
					//this.dest.y = this.closet_target.pos.y;




				}	



			break;



			case "approach_closest_friend" :


				if (this.closet_friend != null) {



					this.APointCloseTo(this.dest, this.closet_friend.pos.x, this.closet_friend.pos.y, this.mytower.interaction_range * 0.2);




				}	


			break;



			case "retreat" :


			break;



			case "far_retreat" :


			break;

//tower increase interact weapon_range

			case "following" :


			break;

			case "hunting" :


			break;
	


			




		}
		this.capMoveDist();


};



Ai.prototype.setClosestTarget = function(){

	var closest;
	var unsquared_dist_to_closest;

	if (this.mytower.targets.length != 0){
		closest = this.mytower.targets[0];
		for(var i = 0; i < this.mytower.targets.length-1; i++){		
			if (this.getUnsquaredDistance(closest) > this.getUnsquaredDistance(this.mytower.targets[i])) {
				closest = this.mytower.targets[i];			
			}
		}		
		this.closet_target = closest;
	}else{		
		this.closet_target = null;	
	}

	if ((this.closet_target != null) && (this.getUnsquaredDistance(closest) < Math.pow(this.mytower.weapon_range,2))) {
		this.target_inrange = true;
		this.mytower.weapon_drawangle = Math.atan2(this.mytower.pos.y - this.closet_target.pos.y, this.mytower.pos.x - this.closet_target.pos.x) + Math.PI;
	}else{
		this.target_inrange = false;
	}

};


Ai.prototype.setClosestFriend = function(){

	var closest;
	var unsquared_dist_to_closest;

	if (this.mytower.friends.length != 0){
		closest = this.mytower.friends[0];
		for(var i = 0; i < this.mytower.friends.length-1; i++){		
			if (this.getUnsquaredDistance(closest) > this.getUnsquaredDistance(this.mytower.friends[i])) {
				closest = this.mytower.friends[i];			
			}
		}		
		this.closet_friend = closest;
	}else{		
		this.closet_friend = null;	
	}

	

};

Ai.prototype.whatToDoInThisEnvironment = function(){

	if (this.environment == "alone")
		return(this.alone);
	if (this.environment == "withfriends")
		return(this.withfriends);
	if (this.environment == "withtargets")
		return(this.withtargets);
	if (this.environment == "withfriendstargets")
		return(this.withfriendstargets);

};


Ai.prototype.getUnsquaredDistance = function(other_tower){

	return(Math.pow(other_tower.pos.x-this.mytower.pos.x,2) + Math.pow(other_tower.pos.y-this.mytower.pos.y,2)); 


};



Ai.prototype.updateEnvironment = function()
{
	

	if ((this.mytower.friends.length == 0) && (this.mytower.targets.length == 0)){
		

		this.environment = "alone";

		
		
	}else

	if ((this.mytower.friends.length != 0) && (this.mytower.targets.length == 0)){
		
		this.environment = "withfriends";
	
		

	}else

	if ((this.mytower.friends.length == 0) && (this.mytower.targets.length != 0)){

		this.environment = "withtargets";

		

	}else

	if ((this.mytower.friends.length != 0) && (this.mytower.targets.length != 0)){

		this.environment = "withfriendstargets";
		
		

	}
	    

};

Ai.prototype.updateIndividuals = function(){

	this.setClosestTarget();
	this.setClosestFriend();
	



}




Ai.prototype.updateAttack = function()
{	
	if (this.mytower.reload_time_left == 0){

		if (this.mytower.targets.length != 0){
	   		
	   		if (this.target_inrange == true)
	    	this.mytower.shoot(this.closet_target);

	    }	

	}    		

};

Ai.prototype.updateMove = function()
{
	if (this.mytower.currentenergy >= this.mytower.fullenergy){

		
		this.setDestinationXY(this.whatToDoInThisEnvironment());

		this.mytower.startBoost(this.dest.x, this.dest.y);			
		

		this.mytower.currentenergy = 0;

	}

		

};



Ai.prototype.update = function()
{



	this.updateIndividuals();		
	this.updateEnvironment();
	
	//controlled means its a player
	if (this.mytower.controlled == false)
		this.updateMove();
	
	this.updateAttack();

	


}; 

BASICJELLY_GEDAGTE = {
	
	"player" : false,
	"moveradius" : 100,
	"alone" : "interaction_roam",
	"withfriends" : "interaction_roam",
	"withtargets" : "approach_closest_target",
	"withfriendstargets" : "approach_closest_target",

	"friendmemory" : 50,
	"targetmemory" : 50,

	


};


BASICSTALAGMITE_GEDAGTE = {
	
	"player" : false,
	"moveradius" : 200,
	"alone" : "interaction_roam",
	"withfriends" : "chill",
	"withtargets" : "chill",
	"withfriendstargets" : "chill",

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