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


        this.antenne = this.scene.add.pointlight(this.x - 14, this.y -20, 0xff0000, 10, 10, 100);
        this.antenne2 = this.scene.add.pointlight(this.x + 14, this.y -20 , 0xff0000, 10, 10, 10);
        this.antenne2.attenuation = 0.05;
        this.antenne2.color.setTo(255, 0, 0);
        this.antenne.attenuation = 0.05;
        this.antenne.color.setTo(255, 0, 0);

        this.antenne.setDepth(1000);
        this.antenne2.setDepth(1000);

        this.scene.tweens.add({
            targets: [this.antenne, this.antenne2],
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


        this.mineepxlode = scene.add.particles('particle_mine');

        this.emitter_m = this.mineepxlode.createEmitter({
            x : this.x,
            y : this.y,
            speed: { min: 0, max: 500 },
            radial : true,
            angle: { min: -20, max: -120 },
            scale: { start: 1, end: 1 },
            blendMode: 'NORMAL',
            active: true,
            lifespan: 300,
            gravityY: 1200 ,
            frequency : 20,
            quantity : 2 ,
            rotate : { min : 0, max : 360 } ,

        });

        this.emitter_m.on = false;
        this.mineepxlode.setDepth(1000);

       let me = this;
       this.once(MyEvents.EXPLODE, function(){

           me.emitter_m.on = true
           me.emitter_m.startFollow(me);

           setTimeout(function(){

               me.emitter_m.on = false;

           }, 150 )


       })

    }

}