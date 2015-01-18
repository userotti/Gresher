BASICBOT = {
	
	"character_class" : "bot1",
	"mass" : 1.4,
	"maxhealth" : 250,
	"shield": 0,
 	"shielrecharge": 0,
 	"weapon_range": 120,
 	"interaction_range": 200,
 	"full_reload": 100,
 	"reload_speed": 2,
 	"damage": 35,
 	"fullenergy": 100,
 	"energyrecharge": 2,
 	"magnetic_charge": -7.5,
 	"magnetic_range": 100,
 	"push_pullable" : false,
 	"bodybounce" : 0.00,
 	"bodyrotation_speed": 0,
 	"fric_coeff": 0.300,
 	"ai_timepercall": 100, 
 	"maxboostpower" : 1.9,


}

BASICBROMITE_CHAR = function(){
	
	return  ({

		"character_class" : "bromite",
		"mass" : 0.3,
		"maxhealth" : 100,
		"shield": 0,
	 	"shielrecharge": 0,
	 	"weapon_range": 0,
	 	"interaction_range": 0,
	 	"full_reload": 0,
	 	"reload_speed": 0,
	 	"damage": 0,
	 	"fullenergy": 0,
	 	"energyrecharge": 0,
	 	"magnetic_charge": -5,
	 	"magnetic_range": 100,
	 	"push_pullable" : true,
	 	"bodybounce" : 0.00,
	 	"bodyrotation_speed": 1 - (Math.random()*2),
	 	"fric_coeff": 0.15,//200,
	 	"ai_timepercall": 0, 
	 	"maxboostpower" : 0,
	})	

}

BASICMUSHROOM = {
	
	"character_class" : "mushroom",
	"mass" : 1.4,
	"maxhealth" : 100,
	"shield": 0,
 	"shielrecharge": 0,
 	"weapon_range": 0,
 	"interaction_range": 0,
 	"full_reload": 0,
 	"reload_speed": 0,
 	"damage": 0,
 	"fullenergy": 0,
 	"energyrecharge": 0,
 	"magnetic_charge": 8,
 	"magnetic_range": 100,
 	"push_pullable" : false,
 	"bodybounce" : 0.04,
 	"bodyrotation_speed": 0,
 	"fric_coeff": 0.300,
 	"ai_timepercall": 0, 
 	"maxboostpower" : 0,


}

BASICJELLY = {
	
	"character_class" : "jelly",
	"mass" : 1.4,
	"maxhealth" : 250,
	"shield": 0,
 	"shielrecharge": 0,
 	"weapon_range": 120,
 	"interaction_range": 200,
 	"full_reload": 100,
 	"reload_speed": 0.5,
 	"damage": 65,
 	"fullenergy": 170,
 	"energyrecharge": 10.5,
 	"magnetic_charge": 0,
 	"magnetic_range": 200,
 	"push_pullable" : false,
 	"bodybounce" : 0.08,
 	"bodyrotation_speed": 0,
 	"fric_coeff": 0.300,
 	"ai_timepercall": 100, 
 	"maxboostpower" : 2.9,

}

BASICSTALAGMITE = {
	
	"character_class" : "stalagmite",
	"mass" : 1,
	"maxhealth" : 3000,
 	"shield": 0,
 	"shielrecharge": 0,
 	"weapon_range": 210,
 	"interaction_range": 250,
 	"full_reload": 100,
 	"reload_speed": 0.5,
 	"damage": 10,
 	"fullenergy": 120,
 	"energyrecharge": 0.1,
 	"magnetic_charge": 0,
 	"magnetic_range": 200,
 	"push_pullable" : false,
 	"bodybounce" : 0.0,
 	"bodyrotation_speed": 0.01,
 	"fric_coeff": 0.350,
 	"ai_timepercall": 50,
 	"maxboostpower" : 0.65,

}



BASICSTRUCT = {
	
	"character_class" : "struct",
	"mass" : 1,
	"maxhealth" : 100,
 	"shield": 0,
 	"shielrecharge": 0,
 	"weapon_range": 50,
 	"interaction_range": 250,
 	"full_reload": 30,
 	"reload_speed": 1,
 	"damage": 3,
 	"fullenergy": 30,
 	"energyrecharge": 1,
 	"magnetic_charge": 0,
 	"magnetic_range": 0,
 	"push_pullable" : false,
 	"bodybounce" : 0.00,
 	"bodyrotation_speed": 0.1,
 	"fric_coeff": 0.20,
 	"ai_timepercall": 100,
 	"maxboostpower" : 0.5,
 

}


MIDDLE = function(){ 

	return({
	
	"posx" : 0,
	"posy" : 0,
	"velx" : 0,
	"vely" : 0,
 	"accx" : 0,
 	"accy" : 0, });
 	
}

ONSCREENRANDOM = function(){ 

	return({
	
	"posx" : (Math.random() * ((window.innerWidth) ) )  - (window.innerWidth/2),
	"posy" : (Math.random() * ((window.innerHeight) ) )   - (window.innerHeight/2),
	"velx" : 0,
	"vely" : 0,
 	"accx" : 0,
 	"accy" : 0, });
 	
}

ONMAPRANDOM = function(map_width, map_height){ 

	return({
	
	"posx" : (Math.random() * ((map_width) ) )  - (map_height/2),
	"posy" : (Math.random() * ((map_width) ) )  - (map_height/2),
	"velx" : 0,
	"vely" : 0,
 	"accx" : 0,
 	"accy" : 0, });
 	
}


ONSCREENSMALLRANDOM = function(){ 

	return({
	
	"posx" : (Math.random() * ((window.innerWidth)/3))  - (window.innerWidth)/6,
	"posy" : (Math.random() * ((window.innerHeight)/3))  - (window.innerHeight)/6,
	"velx" : 0,
	"vely" : 0,
 	"accx" : 0,
 	"accy" : 0, });
 	
}


ONSCREENSMALLRANDOM_LEFT = function(){ 

	return({
	
	"posx" : 1400 + (Math.random() * ((window.innerWidth)/4))  - (window.innerWidth)/8,
	"posy" : (Math.random() * ((window.innerHeight)/4))  - (window.innerHeight)/8,
	"velx" : 0,
	"vely" : 0,
 	"accx" : 0,
 	"accy" : 0, });
 	
}

ONMAP_PRECISE = function(x,y){

	return({
	
	"posx" : x,
	"posy" : y,
	"velx" : 0,
	"vely" : 0,
 	"accx" : 0,
 	"accy" : 0, });

}

//TEAMS

BOT1TEAM = ["bot1", "bromite", "mushroom", "jellies", "stalagmites"];

JELLIESTEAM = ["jellies"];

STALAGMITETEAM = ["stalagmites"];

STRUCTSTEAM = ["structs"];

FRIENDSOFALL = ["jellies", "stalagmites", "structs"];

NOTEAM = [];

PLAYERTEAM = [];

BROMITE_TEAM = ["bot1", "mushroom", "jellies", "stalagmites"];

