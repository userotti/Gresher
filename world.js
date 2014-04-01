PIXI.World = function()
{
    PIXI.DisplayObjectContainer.call( this );

    this.renderable = true;

};

// constructor
PIXI.World.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );
PIXI.World.prototype.constructor = PIXI.World;



PIXI.World.prototype.updateTransform = function()
{
    //this._currentBounds = null;

    if(!this.visible)return;

    PIXI.DisplayObject.prototype.updateTransform.call( this );

    for(var i=0,j=this.children.length; i<j; i++)
    {
        this.children[i].updateTransform();
    }
};