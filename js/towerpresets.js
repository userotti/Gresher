BASICJELLY = {
	
	"character_class" : "jelly",
	"mass" : 1.4,
	"maxhealth" : 250,
	"shield": 0,
 	"shielrecharge": 0,
 	"weapon_range": 120,
 	"interaction_range": 200,
 	"full_reload": 100,
 	"reload_speed": 2,
 	"damage": 35,
 	"fullenergy": 170,
 	"energyrecharge": 10.5,
 	"magneticcharge": 0,
 	"magneticrange": 0,
 	"bodybounce" : 0.08,
 	"bodyrotation_speed": 0,
 	"fric_coeff": 0.300,
 	"ai_timepercall": 100, 
 	"maxboostpower" : 2.9,

}

BASICSTALAGMITE = {
	
	"character_class" : "stalagmite",
	"mass" : 1,
	"maxhealth" : 500,
 	"shield": 0,
 	"shielrecharge": 0,
 	"weapon_range": 210,
 	"interaction_range": 250,
 	"full_reload": 100,
 	"reload_speed": 1,
 	"damage": 55,
 	"fullenergy": 120,
 	"energyrecharge": 1,
 	"magneticcharge": 0,
 	"magneticrange": 0,
 	"bodybounce" : 0.0,
 	"bodyrotation_speed": 0.01,
 	"fric_coeff": 0.350,
 	"ai_timepercall": 50,
 	"maxboostpower" : 1.65,

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


ONSCREENSMALLRANDOM_LEFT = function(){ 

	return({
	
	"posx" : 1400 + (Math.random() * ((window.innerWidth)/4))  - (window.innerWidth)/8,
	"posy" : (Math.random() * ((window.innerHeight)/4))  - (window.innerHeight)/8,
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

