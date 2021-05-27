class ObjetEnnemi extends ObjetPhysique{



    constructor(scene, x, y,image) {
        super(scene, x, y,image);
        scene.physics.add.overlap( scene.player, this, scene.hitMechant, null, scene);
        scene.physics.add.collider(scene.platform_t, this);
    }

    killmonster(){

        this.disableBody(true, true);
        this.scene.sound.play('mechant',{volume : 3});


    }

    killcible(){

        this.disableBody(true, true);
        this.scene.sound.play('cible',{volume : 1});

    }

}