class Char extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "char");
        this.body.allowGravity=true;
        this.flipX=true;
        this.setGravityY(5000);
       

        //gestion de la taille
        this.setDisplaySize(65,65);

        //on réduit un peu la zone de hit
        this.setOffset(0,0);// ici on règle le point de référence du départ réglage de noter hitbox ... 
        this.setBounceX(1);
        this.setVelocityX(100);
        this.setCollideWorldBounds(true)
        
    }


       

}