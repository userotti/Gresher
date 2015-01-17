


MUSHROOMSHRAP = {
	
	"shrap_class" : "mushroom",
 	"bodybounce" : 0.08,
 	"bodyrotation_speed": 0.1,
 	"fric_coeff": 0.07,
    "startalpha" : 1,
    "alphadecrease" : 0.03,
    "scaleup_speed" : 0.0,
    "scale" : 0.25,

}

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

BASICSMOKESHRAP = function(){
	
	return ({
	"shrap_class" : "smoke",
 	"bodybounce" : 0.00,
 	"bodyrotation_speed": 0.04 - Math.random()*0.08,
 	"fric_coeff": 0.070,
    "startalpha" : 0.5,
 	"alphadecrease" : 0.008,
 	"scaleup_speed" : 0.005,
    "scale" : 0.21,
	});
}

BASICSPARKSHRAP = {
	
	"shrap_class" : "spark",
 	"bodybounce" : 0.00,
 	"bodyrotation_speed": 0.0,
 	"fric_coeff": 0.070,
    "startalpha" : 2,
 	"alphadecrease" : 0.2,
 	"scaleup_speed" : 0.00,
    "scale" : 0.5,

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


BOT1FLASH = {
	
	"shrap_class" : "bot1_flash",
 	"bodybounce" : 0.00,
 	"bodyrotation_speed": 0.0,
 	"fric_coeff": 0.070,
    "startalpha" : 0.8,
 	"alphadecrease" : 0.14,
 	"scaleup_speed" : 0,
    "scale" : 0.8,

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
 	"y_offset": 0
 	
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
 	"rotation": Math.random()*(Math.PI*2),
 	"y_offset": 0

 	});
 	
}

SPARKSHRAP = function(px,py){ 

	var velx = (Math.random()*8)-4;
	var vely = (Math.random()*8)-4;
	return({
	
	"posx" : px,
	"posy" : py,
	"velx" : velx,
	"vely" : vely,
 	"accx" : 0,
 	"accy" : 0,
	"rotation": Math.atan2(velx, vely),
	"y_offset": 0
 	
 	});
 	
}

SMOKESHRAP = function(px,py){ 

	return({
	
	"posx" : px,
	"posy" : py,
	"velx" : (Math.random()*1)-1,
	"vely" : (Math.random()*1)-1,
 	"accx" : 0,
 	"accy" : 0,
 	"rotation": 0.5 - (Math.random()*(Math.PI*2)),
 	"y_offset": 0
 	});
 	
}

FLASHSHRAP = function(px,py, rot, y_offset){ 

	return({
	
	"posx" : px,
	"posy" : py,
	"velx" : 0,
	"vely" : 0,
 	"accx" : 0,
 	"accy" : 0,
 	"rotation": rot - Math.PI,
 	"y_offset": y_offset*1.5

 	});
 	
}
