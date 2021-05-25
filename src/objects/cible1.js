class cible1 extends ObjetEnnemi{

    constructor(scene, x, y) {
        super(scene, x, y, "cible");
        this.body.allowGravity=false;
        this.flipX=false;
        this.setGravityY(40);
       

        //gestion de la taille
        this.setDisplaySize(30,64);

        //on réduit un peu la zone de hit
        this.setOffset(0,0);// ici on règle le point de référence du départ réglage de noter hitbox ... 
        this.setBounceX(1);
        this.setVelocityX(0);
        this.setCollideWorldBounds(true)

    }
}