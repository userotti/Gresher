TextureGroups = function(){

	this.gromites = [
		"grom1.png",
		"grom2.png",
		"grom3.png",
		"grom4.png",
		"grom5.png",
	]

	this.mushroom_shraps = [
		"mushroom_sharp1.png",
		"mushroom_sharp2.png",
	
	]


}
TextureGroups.prototype.constructor = TextureGroups;



TextureGroups.prototype.getOrganicBackground = function(){
	return PIXI.Texture.fromFrame("back1.png");

}

TextureGroups.prototype.getGrom = function(){
	return PIXI.Texture.fromFrame(this.gromites[Math.floor(this.gromites.length*Math.random())]);
}

TextureGroups.prototype.getMushroomShrap = function(){
	
	return PIXI.Texture.fromFrame(this.mushroom_shraps[Math.floor(this.mushroom_shraps.length*Math.random())]);
}

