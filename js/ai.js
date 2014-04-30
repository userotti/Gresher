STILLAI = function(tower){

 	
}


SQUARE250_100MOVE_AI = function(tower){

 		if (((tower.age % 100) == 0) && (!tower.controlled)){
		

 			tower.startBoost(tower.pos.x+(Math.random()*500 - 250), tower.pos.y+(Math.random()*500 - 250));


 		}

}


SQUARE100_30MOVE_AI = function(tower){

 			

 		if (((tower.age % 30) == 0) && (!tower.controlled)){
		

 			tower.startBoost(tower.pos.x+(Math.random()*200 - 100), tower.pos.y+(Math.random()*200 - 100));


 		}

}

SQUARE150_50MOVE_AI = function(tower){

 			

 		if (((tower.age % 50) == 0) && (!tower.controlled)){
		

 			tower.startBoost(tower.pos.x+(Math.random()*300 - 150), tower.pos.y+(Math.random()*300 - 150));


 		}

}

BASIC_DESTINATION_100TIC_AI = function(tower){

 		
 		if (((tower.age % 100) == 0)){
		

 			tower.startBoost(tower.pos.x+(Math.random()*300 - 150), tower.pos.y+(Math.random()*300 - 150));


 		}

}



BASICAI = function(tower){

 		if (((tower.age % tower.ai_timepercall) == 0) && (!tower.controlled)){
		

 			tower.startBoost(tower.pos.x+(Math.random()*500 - 250), tower.pos.y+(Math.random()*500 - 250));


 		}

}