JELLYSHRAP = {
	
	"shrap_class" : "jelly",
 	"bodybounce" : 0.08,
 	"bodyrotation_speed": 0.0,
 	"fric_coeff": 0.07,
    "velsumremove" : 0.1,
    "drawmefullalpha" : 4,
    "scaleup_speed" : 0.0,
    "scale" : 1,


}

STALAGSHRAP = {
	
	"shrap_class" : "stalagmite",
 	"bodybounce" : 0.00,
 	"bodyrotation_speed": 0.0,
 	"fric_coeff": 0.070,
 	"velsumremove" : 0.1,
 	"drawmefullalpha" : 4,
 	"scaleup_speed" : 0.0,
 	"scale" : 1,
    

}



STRUCTSHRAP = {
	
	
	"shrap_class" : "struct",
 	"bodybounce" : 0.08,
 	"bodyrotation_speed": 0,
 	"fric_coeff": 0.20,
 	"velsumremove" : 0.1,
 	"drawmefullalpha" : 4,
 	"scaleup_speed" : 0.0,
 	"scale" : 1,
    
 

}

BASICSMOKESHRAP = {
	
	"shrap_class" : "smoke",
 	"bodybounce" : 0.00,
 	"bodyrotation_speed": 0.2,
 	"fric_coeff": 0.070,
 	"velsumremove" : 0.1,
 	"drawmefullalpha" : 4,
 	"scaleup_speed" : 0.05,
    "scale" : 1.6,

}

BASICSPARKSHRAP = {
	
	"shrap_class" : "spark",
 	"bodybounce" : 0.00,
 	"bodyrotation_speed": 0.0,
 	"fric_coeff": 0.070,
 	"velsumremove" : 0.1,
 	"drawmefullalpha" : 1,
 	"scaleup_speed" : 0.00,
    "scale" : 1,

}

ONSCREENRANDOMSHRAP = function(){ 

	return({
	
	"posx" : Math.random() * (SCREEN_MIDX*2) ,
	"posy" : Math.random() * (SCREEN_MIDY*2),
	"velx" : (Math.random()*10)-5,
	"vely" : (Math.random()*10)-5,
 	"accx" : 0,
 	"accy" : 0, });
 	
}

FROMMESHRAP = function(px,py){ 

	return({
	
	"posx" : px,
	"posy" : py,
	"velx" : (Math.random()*15)-7.5,
	"vely" : (Math.random()*15)-7.5,
 	"accx" : 0,
 	"accy" : 0, });
 	
}

SPARKSHRAP = function(px,py){ 

	return({
	
	"posx" : px,
	"posy" : py,
	"velx" : (Math.random()*4)-2,
	"vely" : (Math.random()*4)-2,
 	"accx" : 0,
 	"accy" : 0, });
 	
}


SMOKESHRAP = function(px,py){ 

	return({
	
	"posx" : px,
	"posy" : py,
	"velx" : (Math.random()*2)-2,
	"vely" : (Math.random()*2)-2,
 	"accx" : 0,
 	"accy" : 0, });
 	
}