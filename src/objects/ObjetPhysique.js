class ObjetPhysique extends Phaser.Physics.Arcade.Sprite{



    constructor(scene, x, y,image) {
        super(scene, x, y,image);
        /**
         *
         * @type {Tableau}
         */
        this.scene=scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }
}