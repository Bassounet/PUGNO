class mechant extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "mechant");
        this.body.allowGravity=true;
        this.flipX=true;
        this.setGravityY(40);
       

        //gestion de la taille
        this.setDisplaySize(45,65);

        //on réduit un peu la zone de hit
        this.setOffset(0,0);// ici on règle le point de référence du départ réglage de noter hitbox ... 
        this.setBounceX(1);
        this.setVelocityX(0);
        this.setCollideWorldBounds(true)
        
    }


       

}