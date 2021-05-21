class ObjetEnnemi extends ObjetPhysique{



    constructor(scene, x, y,image) {
        super(scene, x, y,image);
        scene.physics.add.overlap(
            scene.player,
            this,
            scene.hitMechant,
            null,
            scene
        );
        scene.physics.add.collider(scene.platform_t, this);
    }
    Tupue(){
        this.disableBody(true, true);
        console.log('gg');
        // this.sound.play('die', {volume : 1 });

    }

}