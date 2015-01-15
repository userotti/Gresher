TextureGroups = function(){

	this.organic_backgrounds = [
		"back1.png",
		"back2.png",
		"back3.png",
		"back4.png",
		"back5.png",
	]


}
TextureGroups.prototype.constructor = TextureGroups;



TextureGroups.prototype.getOrganicBackground = function(){
	return PIXI.Texture.fromFrame("back1.png");

}

