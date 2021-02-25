class ObjetPhysique extends Phaser.Physics.Arcade.Sprite{
    /**
     * // on crée une classe d'objets physique
     * @param {Tableau} scene // tout ça je comprend pas vraiment 
     * @param {Number} x
     * @param {Number} y
     * @param {string} image
     */
    constructor(scene, x, y,image) {
        super(scene, x, y,image);
        /**
         *
         * @type {Tableau}
         */
        this.scene=scene; // on raccourcis le this.scene ... 
        scene.add.existing(this); // ça je comprend pas vraiment ... 
        scene.physics.add.existing(this); // je comprend toujours pas ... 
    }
}