JELLYSHRAP = {
	
	"shrap_class" : "jelly",
 	"bodybounce" : 0.08,
 	"bodyrotation_speed": 0.0,
 	"fric_coeff": 0.07,
    "velsumremove" : 0.1,
    "drawmefullalpha" : 4,


}

STALAGSHRAP = {
	
	"shrap_class" : "stalagmite",
 	"bodybounce" : 0.00,
 	"bodyrotation_speed": 0.0,
 	"fric_coeff": 0.070,
 	"velsumremove" : 0.1,
 	"drawmefullalpha" : 4,

}



STRUCTSHRAP = {
	
	
	"shrap_class" : "struct",
 	"bodybounce" : 0.08,
 	"bodyrotation_speed": 0,
 	"fric_coeff": 0.20,
 	"velsumremove" : 0.1,
 	"drawmefullalpha" : 4,
 

}

BASICTRACKSHRAP = {
	
	"shrap_class" : "track",
 	"bodybounce" : 0.00,
 	"bodyrotation_speed": 0.1,
 	"fric_coeff": 0.070,
 	"velsumremove" : 0.1,
 	"drawmefullalpha" : 3,

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
	"velx" : (Math.random()*10)-5,
	"vely" : (Math.random()*10)-5,
 	"accx" : 0,
 	"accy" : 0, });
 	
}


MYTRACKSHRAP = function(px,py){ 

	return({
	
	"posx" : px,
	"posy" : py,
	"velx" : (Math.random()*3)-1.5,
	"vely" : (Math.random()*3)-1.5,
 	"accx" : 0,
 	"accy" : 0, });
 	
}