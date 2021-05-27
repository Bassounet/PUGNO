class cible1 extends ObjetEnnemi{

    constructor(scene, x, y) {
        super(scene, x, y, "cible");


        this.body.allowGravity=false;
        this.flipX=false;
        this.setGravityY(40);

        this.setDisplaySize(30,64);

        this.setOffset(0,0);
        this.setBounceX(1);
        this.setVelocityX(0);
        this.setCollideWorldBounds(true)

    }
}