JELLYSHRAP = {
	
	"shrap_class" : "jelly",
 	"bodybounce" : 0.08,
 	"bodyrotation_speed": 0.0,
 	"fric_coeff": 0.07,
    "startalpha" : 1,
    "alphadecrease" : 0.02,
    "scaleup_speed" : 0.0,
    "scale" : 1,

}

STALAGSHRAP = {
	
	"shrap_class" : "stalagmite",
 	"bodybounce" : 0.00,
 	"bodyrotation_speed": 0.0,
 	"fric_coeff": 0.070,
    "startalpha" : 1,
 	"alphadecrease" : 0.02,
 	"scaleup_speed" : 0.0,
 	"scale" : 1,

}



STRUCTSHRAP = {
	
	"shrap_class" : "struct",
 	"bodybounce" : 0.08,
 	"bodyrotation_speed": 0,
 	"fric_coeff": 0.20,
    "startalpha" : 1,
 	"alphadecrease" : 0.05,
 	"scaleup_speed" : 0.0,
 	"scale" : 1,

}

BASICSMOKESHRAP = {
	
	"shrap_class" : "smoke",
 	"bodybounce" : 0.00,
 	"bodyrotation_speed": 0.2,
 	"fric_coeff": 0.070,
    "startalpha" : 0.5,
 	"alphadecrease" : 0.02,
 	"scaleup_speed" : 0.05,
    "scale" : 1.6,

}

BASICSPARKSHRAP = {
	
	"shrap_class" : "spark",
 	"bodybounce" : 0.00,
 	"bodyrotation_speed": 0.0,
 	"fric_coeff": 0.070,
    "startalpha" : 2,
 	"alphadecrease" : 0.2,
 	"scaleup_speed" : 0.00,
    "scale" : 1,

}

JELLYWEAPONFLAME = {
	
	"shrap_class" : "jelly_weapon",
 	"bodybounce" : 0.00,
 	"bodyrotation_speed": 0.0,
 	"fric_coeff": 0.070,
    "startalpha" : 1.2,
 	"alphadecrease" : 0.24,
 	"scaleup_speed" : 0.25,
    "scale" : 0.2,

}


STALAGMITEWEAPONFLAME = {
	
	"shrap_class" : "stalagmite_weapon",
 	"bodybounce" : 0.00,
 	"bodyrotation_speed": 0.0,
 	"fric_coeff": 0.070,
    "startalpha" : 1.2,
 	"alphadecrease" : 0.24,
 	"scaleup_speed" : 0.25,
    "scale" : 0.2,

}
ONSCREENRANDOMSHRAP = function(){ 

	return({
	
	"posx" : Math.random() * (window.innerWidth/2*2) ,
	"posy" : Math.random() * (window.innerHeight/2*2),
	"velx" : (Math.random()*10)-5,
	"vely" : (Math.random()*10)-5,
 	"accx" : 0,
 	"accy" : 0,
 	"rotation": 0,
 	
 	});
 	
}

FROMMESHRAP = function(px,py){ 

	return({
	
	"posx" : px,
	"posy" : py,
	"velx" : (Math.random()*15)-7.5,
	"vely" : (Math.random()*15)-7.5,
 	"accx" : 0,
 	"accy" : 0,
 	"rotation": 0,

 	});
 	
}

SPARKSHRAP = function(px,py){ 

	return({
	
	"posx" : px,
	"posy" : py,
	"velx" : (Math.random()*8)-4,
	"vely" : (Math.random()*8)-4,
 	"accx" : 0,
 	"accy" : 0,
	"rotation": 0,
 	
 	});
 	
}

SMOKESHRAP = function(px,py){ 

	return({
	
	"posx" : px,
	"posy" : py,
	"velx" : (Math.random()*2)-2,
	"vely" : (Math.random()*2)-2,
 	"accx" : 0,
 	"accy" : 0,
 	"rotation": 0,

 	});
 	
}

FLAMESHRAP = function(px,py, rot){ 

	return({
	
	"posx" : px,
	"posy" : py,
	"velx" : 0,
	"vely" : 0,
 	"accx" : 0,
 	"accy" : 0,
 	"rotation": rot,

 	});
 	
}
