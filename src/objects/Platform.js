class Platform extends ObjetPhysique{
    /**
     * Quand Player touche cet objet, il a perdu
     * @param {Tableau} scene
     * @param {Number} x
     * @param {Number} y
     * @param {string} image
     */
    constructor(scene, x, y,image) {
        super(scene, x, y,image);

        this.body.allowGravity=false;




        // this.physics.add.overlap( this.player, this, null, scene );
    }

}