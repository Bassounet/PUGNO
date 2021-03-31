class Tourelle extends ObjetEnnemi{
    
    // preload() { 

    //     this.load.image('tourelleV2', 'assets/tourelleV2.png');
        
    // }
    
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "tourellev2");
        //pas de gravité
        this.body.allowGravity=true;
        this.setGravityY(100);

        //gestion de la taille
        this.setDisplaySize(90,60);
        // this.physics.add.collider(this.Tourelle, this.platforms); // faut arriver à la mettre là la physique 


        //on réduit un peu la zone de hit
        // this.setBodySize(165,75);
        this.setOffset(0,0);// ici on règle le point de référence du départ réglage de noter hitbox ...
        this.setBounceX(1);

        

    }
}
