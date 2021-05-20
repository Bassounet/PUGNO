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
    }
    Tupue(){
        this.disableBody(true, true);
        console.log('gg');
        // this.sound.play('die', {volume : 1 });

    }

}