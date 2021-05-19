class Tono extends ObjetPhysique{

    constructor(scene, x, y,image) {
        super(scene, x, y,"tono");
        scene.physics.add.overlap(
            scene.player,
            this,
            scene.hitTono,
            null,
            scene
        );
        this.setBodySize(30,55);
        this.setOffset(20,10);
    }
    Tupue(){
        this.disableBody(true, true);
    }
    // constructor(scene, x, y) {
    //     super(scene, x, y, "tono");
    //     this.body.allowGravity=true;
    //     this.flipX=false;
    //
    //     this.setGravityY(40);
    //     this.setDisplaySize(64,64);
    //     this.setOffset(0,0);
    //     this.setCollideWorldBounds(true)
    //
    // }


       

}