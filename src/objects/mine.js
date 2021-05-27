class mine extends ObjetPhysique{

    constructor(scene, x, y,image) {
        super(scene, x, y,"mine");
        scene.physics.add.overlap(
            scene.player,
            this,
            scene.hitMine,
            null,
            scene
        );

    }
}