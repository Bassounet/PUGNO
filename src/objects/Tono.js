class Tono extends ObjetPhysique{

    constructor(scene, x, y,image) {
        super(scene, x, y,"tono");
        scene.physics.add.overlap(
            scene.player,
            this,
            scene.hitTono,
            null,
            scene
        );
        this.setBodySize(30,55);
        this.setOffset(2,6);

        this.C4 = this.scene.add.pointlight(this.x +5, this.y +32 , 0xff0000, 10, 10, 100);
        this.C4.attenuation = 0.05;

        this.C4.setDepth(1000);

        this.scene.tweens.add({
            targets: [this.C4],
            duration: 1000,
            yoyo: true,
            repeat: -1,
            delay: 0,
            alpha:
                {
                    startDelay: 0,
                    from: 0,
                    to: 1,
                }
        });

        this.tonoepxlode = scene.add.particles('particle_tono');

        this.emitter_t = this.tonoepxlode.createEmitter({
            x : this.x,
            y : this.y,
            speed: { min: 0, max: 1000 },
            radial : true,
            angle: { min: -1, max: -180 },
            scale: { start: 1, end: 1 },
            blendMode: 'NORMAL',
            active: true,
            lifespan: 300,
            gravityY: 1000 ,
            frequency : 20,
            quantity : 2 ,
            rotate : { min : 0, max : 360 } ,

        });

        this.emitter_t.on = false;
        this.tonoepxlode.setDepth(1000);

        let me = this;
        this.once(MyEvents.EXPLODE, function(){

            me.emitter_t.on = true
            me.emitter_t.startFollow(me);

            setTimeout(function(){

                me.emitter_t.on = false;

            }, 100 )


        })
    }


}