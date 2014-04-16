BASICJELLY = {
	
	"character_class" : "jelly",
	"mass" : 1,
	"maxhealth" : 100,
	"speed" : 0.2,
 	"shield": 0,
 	"shielrecharge": 0,
 	"range": 30,
 	"reload": 80,
 	"damage": 1,
 	"energy": 0,
 	"energyrecharge": 0,
 	"magneticcharge": 0,
 	"magneticrange": 0,

 	"bodybounce" : 0.08,
 	"bodyrotation_speed": 0,
 	"fric_coeff": 0.20,

 	
 	"maxboostpower" : 0.5,
 	



}

BASICSTALAGMITE = {
	
	"character_class" : "stalagmite",
	"mass" : 1,
	"maxhealth" : 100,
	"speed" : 0.5,
 	"shield": 0,
 	"shielrecharge": 0,
 	"range": 70,
 	"reload": 20,
 	"damage": 1,
 	"energy": 100,
 	"energyrecharge": 1,
 	"magneticcharge": 0,
 	"magneticrange": 0,

 	"bodybounce" : 0.0,
 	"bodyrotation_speed": 0.01,
 	"fric_coeff": 0.20,
 	
 	"maxboostpower" : 1.25,
 

}



BASICSTRUCT = {
	
	"character_class" : "stalagmite",
	"mass" : 1,
	"maxhealth" : 100,
	"speed" : 1,
 	"shield": 0,
 	"shielrecharge": 0,
 	"range": 50,
 	"reload": 30,
 	"damage": 3,
 	"energy": 0,
 	"energyrecharge": 0,
 	"magneticcharge": 0,
 	"magneticrange": 0,

 	"bodybounce" : 0.00,
 	"bodyrotation_speed": 0.1,
 	"fric_coeff": 0.20,
 	
 	"maxboostpower" : 0.5,
 

}

ONSCREENRANDOM = function(){ 

	return({
	
	"posx" : Math.random() * (SCREEN_MIDX*2) ,
	"posy" : Math.random() * (SCREEN_MIDY*2),
	"velx" : 0,
	"vely" : 0,
 	"accx" : 0,
 	"accy" : 0, });
 	
}