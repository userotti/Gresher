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

	this.booster_flames = [
		"booster1.png",
		"booster2.png",
		"smoke1.png",
		"spark1.png"
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

TextureGroups.prototype.getBoosterFlame = function(){
	return PIXI.Texture.fromFrame(this.booster_flames[Math.floor(this.booster_flames.length*Math.random())]);
}

