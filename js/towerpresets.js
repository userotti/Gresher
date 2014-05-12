BASICJELLY = {
	
	"character_class" : "jelly",
	"mass" : 1.4,
	"maxhealth" : 250,
	
 	"shield": 0,
 	"shielrecharge": 0,

 	"weapon_range": 100,
 	
 	"interaction_range": 250,
 	
 	"reload": 15,
 	"damage": 25,
 	"fullenergy": 30,
 	"energyrecharge": 1,
 	"magneticcharge": 0,
 	"magneticrange": 0,

 	"bodybounce" : 0.08,
 	"bodyrotation_speed": 0,
 	"fric_coeff": 0.30,
 	"ai_timepercall": 100, 

 	
 	"maxboostpower" : 2.5,

}

BASICSTALAGMITE = {
	
	"character_class" : "stalagmite",
	"mass" : 1,
	"maxhealth" : 70,
	
 	"shield": 0,
 	"shielrecharge": 0,
 	
 	"weapon_range": 210,

 	"interaction_range": 250,
 	"reload": 40,
 	"damage": 55,
 	"fullenergy": 80,
 	"energyrecharge": 1,
 	"magneticcharge": 0,
 	"magneticrange": 0,

 	"bodybounce" : 0.0,
 	"bodyrotation_speed": 0.01,
 	"fric_coeff": 0.350,
 	"ai_timepercall": 50,
 	
 	"maxboostpower" : 1.95,
 

}



BASICSTRUCT = {
	
	"character_class" : "struct",
	"mass" : 1,
	"maxhealth" : 100,
	
 	"shield": 0,
 	"shielrecharge": 0,
 	"weapon_range": 50,

 	"interaction_range": 250,


 	"reload": 30,
 	"damage": 3,
 	"fullenergy": 30,
 	"energyrecharge": 1,
 	"magneticcharge": 0,
 	"magneticrange": 0,

 	"bodybounce" : 0.00,
 	"bodyrotation_speed": 0.1,
 	"fric_coeff": 0.20,
 	"ai_timepercall": 100,

 	"maxboostpower" : 0.5,
 

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


ONSCREENSMALLRANDOM = function(){ 

	return({
	
	"posx" : (Math.random() * ((window.innerWidth)/3))  - (window.innerWidth)/6,
	"posy" : (Math.random() * ((window.innerHeight)/3))  - (window.innerHeight)/6,
	"velx" : 0,
	"vely" : 0,
 	"accx" : 0,
 	"accy" : 0, });
 	
}

//TEAMS

JELLIESTEAM = ["jellies"];

STALAGMITETEAM = ["stalagmites"];

STRUCTSTEAM = ["structs"];

FRIENDSOFALL = ["jellies", "stalagmites", "structs"];

NOTEAM = [];

