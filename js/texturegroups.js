TextureGroups = function(){

	this.oragnicBackgroundItems = [
	"",
	"",

	]

}

TextureGroups.prototype.constructor = TextureGroups;


TextureGroups.prototype.getOrganicBackground = function(){
	
	return PIXI.Texture.fromFrame("clawbot.png");
	
}