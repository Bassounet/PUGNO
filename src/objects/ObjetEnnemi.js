class ObjetEnnemi extends ObjetPhysique{



    constructor(scene, x, y,image) {
        super(scene, x, y,image);
        scene.physics.add.overlap( scene.player, this, scene.hitMechant, null, scene);
        scene.physics.add.collider(scene.platform_t, this);
    }

    killmonster(){
        this.disableBody(true, true);
        console.log('gg');
        this.scene.sound.play('die',{volume : 1});

    }

    killcible(){
        this.disableBody(true, true);
        console.log('gg1');
        this.scene.sound.play('moleu',{volume : 1});

    }

}