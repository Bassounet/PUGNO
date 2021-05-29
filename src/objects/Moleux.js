class Moleux extends ObjetPhysique{

    constructor(scene, x, y) {
        super(scene, x, y, "moleu_");

        scene.add.existing(this);
        scene.physics.add.existing(this);



        this.body.allowGravity = true;
        this.setDisplaySize(100, 100);
        this.setBodySize(100, 100);

    }
}
