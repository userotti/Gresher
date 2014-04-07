PIXI.Camera = function()
{
    PIXI.DisplayObjectContainer.call( this );

    this.renderable = true;

    this.following = 0;

    this.screen_midx = SCREEN_MIDX;
    this.screen_midy = SCREEN_MIDY;

    this.zoom = 0.8;

    this.maxzoom = 2.5;

    this.minzoom = 0.7;



    this.rotation = 0;

    this.RM = $M([
                  [1,0,0],
                  [0,1,0],
                  [0,0,1]

                     ]);

    this.T1;
    this.R1;

    this.S1;
    this.T2;



    this.T1 = $M([
                  [1,0,0],
                  [0,1,0],
                  [0,0,1]

                     ]);
    this.R1 = $M([
                  [1,0,0],
                  [0,1,0],
                  [0,0,1]

                     ]);

    this.S1 = $M([
                  [1,0,0],
                  [0,1,0],
                  [0,0,1]

                     ]);

    this.T2 = $M([
                  [1,0,0],
                  [0,1,0],
                  [0,0,1]

                     ]);

    this.RM = this.RM.x(this.T1).x(this.R1).x(this.S1).x(this.T2);


    
    console.log(this.RM.elements);
    
    




};

// constructor
PIXI.Camera.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );
PIXI.Camera.prototype.constructor = PIXI.Camera;


PIXI.Camera.prototype.printmymatrix = function()
{

    console.log(this.worldTransform);
    console.log("X: " + this.following.sprite.position.x + "Y: " + this.following.sprite.position.y );

}    



PIXI.Camera.prototype.updateTransform = function()
{
    //this._currentBounds = null;

   


    if(!this.visible)return;

     //console.log(this.worldTransform);

    //THIS LINE I SHOULD FIX MYSELF:
     
    //PIXI.DisplayObject.prototype.updateTransform.call( this );

//aaaaaaaa plonk    
    
    
    if(this.rotation !== this.rotationCache)
    {

        this.rotationCache = this.rotation;
        this._sr =  Math.sin(this.rotation);
        this._cr =  Math.cos(this.rotation);
    }

    this.RM = $M([
                  [1,0,0],
                  [0,1,0],
                  [0,0,1]

                     ]);


    this.T1 = $M([
                  [1,0,-this.following.sprite.position.x],
                  [0,1,-this.following.sprite.position.y],
                  [0,0,1]

                     ]);
    this.R1 = $M([
                  [this._cr,-this._sr,0],
                  [this._sr,this._cr,0],
                  [0,0,1]

                     ]);

    this.S1 = $M([
                  [this.zoom,0,0],
                  [0,this.zoom,0],
                  [0,0,1]

                     ]);

    this.T2 = $M([
                  [1,0,this.screen_midx],
                  [0,1,this.screen_midy],
                  [0,0,1]

                     ]);

    

    this.RM = this.RM.x(this.T2).x(this.R1).x(this.S1).x(this.T1);





   
    var parentTransform = this.parent.worldTransform;//.toArray();
    var worldTransform = this.worldTransform;//.toArray();
    var px = this.pivot.x;
    var py = this.pivot.y;

    var a00 = this._cr * this.scale.x,
        a01 = -this._sr * this.scale.y,
        a10 = this._sr * this.scale.x,
        a11 = this._cr * this.scale.y,
        a02 = (this.screen_midx - this.following.sprite.position.x) - a00 * px - py * a01,
        a12 = (this.screen_midy - this.following.sprite.position.y) - a11 * py - px * a10,
        b00 = parentTransform.a, b01 = parentTransform.b,
        b10 = parentTransform.c, b11 = parentTransform.d;

    /*
    worldTransform.a = b00 * a00 + b01 * a10;
    worldTransform.b = b00 * a01 + b01 * a11;
    worldTransform.tx = b00 * a02 + b01 * a12 + parentTransform.tx;

    worldTransform.c = b10 * a00 + b11 * a10;
    worldTransform.d = b10 * a01 + b11 * a11;
    worldTransform.ty = b10 * a02 + b11 * a12 + parentTransform.ty;    
*/
    

    this.worldAlpha = this.alpha * this.parent.worldAlpha;



    this.worldTransform.a = this.RM.e(1,1);
    this.worldTransform.b = this.RM.e(1,2);
    this.worldTransform.tx = this.RM.e(1,3);
    

    this.worldTransform.c = this.RM.e(2,1);
    this.worldTransform.d = this.RM.e(2,2);
    this.worldTransform.ty = this.RM.e(2,3);




    //ggggggggg plonk

/*


    var wA = Matrix.create([
          [worldTransform.a,worldTransform.b,worldTransform.tx],
          [worldTransform.c,worldTransform.d,worldTransform.ty],
          [0,0,1]
        ]);


    var T1 = Matrix.create([
          [1,0,-this.screen_midx],
          [0,1,-this.screen_midy],
          [0,0,1]
        ]);

     var T2 = Matrix.create([
          [this.zoom,0,0],
          [0,this.zoom,0],
          [0,0,this.zoom]
        ]);

      var T3 = Matrix.create([
          [1,0,this.screen_midx/this.zoom],
          [0,1,this.screen_midy/this.zoom],
          [0,0,1]
        ]);


    var finalMatrix = wA.multiply(T1).multiply(T2);

  




    worldTransform.a = finalMatrix.e(1,1);
    worldTransform.b = finalMatrix.e(1,2);
    worldTransform.c = finalMatrix.e(2,1);
    
    worldTransform.d = finalMatrix.e(2,2);
    worldTransform.tx = finalMatrix.e(1,3);
    worldTransform.ty = finalMatrix.e(2,3);
*/









    for(var i=0,j=this.children.length; i<j; i++)
    {
        this.children[i].updateTransform();
    }
};


/*
PIXI.DisplayObject.prototype.updateTransform = function()
{
    
    if(this.rotation !== this.rotationCache)
    {

        this.rotationCache = this.rotation;
        this._sr =  Math.sin(this.rotation);
        this._cr =  Math.cos(this.rotation);
    }

   
    var parentTransform = this.parent.worldTransform;//.toArray();
    var worldTransform = this.worldTransform;//.toArray();
    var px = this.pivot.x;
    var py = this.pivot.y;

    var a00 = this._cr * this.scale.x,
        a01 = -this._sr * this.scale.y,
        a10 = this._sr * this.scale.x,
        a11 = this._cr * this.scale.y,
        a02 = this.position.x - a00 * px - py * a01,
        a12 = this.position.y - a11 * py - px * a10,
        b00 = parentTransform.a, b01 = parentTransform.b,
        b10 = parentTransform.c, b11 = parentTransform.d;

    worldTransform.a = b00 * a00 + b01 * a10;
    worldTransform.b = b00 * a01 + b01 * a11;
    worldTransform.tx = b00 * a02 + b01 * a12 + parentTransform.tx;

    worldTransform.c = b10 * a00 + b11 * a10;
    worldTransform.d = b10 * a01 + b11 * a11;
    worldTransform.ty = b10 * a02 + b11 * a12 + parentTransform.ty;

    this.worldAlpha = this.alpha * this.parent.worldAlpha;
};*/