class Moleux extends ObjetPhysique{

    constructor(scene, x, y, image) {
        super(scene, x, y, "moleu_");

        scene.add.existing(this);
        scene.physics.add.existing(this);


        this.body.allowGravity = false;
        this.setDisplaySize(25, 50);
        this.setBodySize(this.body.width, this.body.height);

        this.recolt = scene.add.particles('particlesg');

        this.recolt_m = this.recolt.createEmitter({
            x : this.x,
            y : this.y,
            speed: { min: 0, max: 200 },
            radial : true,
            angle: { min: -20, max: -120 },
            scale: { start: 0.7, end: 0.1 },
            blendMode: 'SCREEN',
            active: true,
            lifespan: 300,
            gravityY: 1000 ,
            frequency : 20,
            quantity : 5 ,
            rotate : { min : 0, max : 360 } ,

        });

        this.recolt_m.on = false;
        this.recolt.setDepth(1000);

        let me = this;

        this.once(MyEvents.EXPLODE, function(){

            me.recolt_m.on = true
            me.recolt_m.startFollow(me);


        });

        this.brillance = this.scene.add.pointlight(this.x , this.y, 0xff0000, 30, 3, 5);
        this.brillance.attenuation = 0.02;
        this.brillance.color.setTo(0, 255, 0);

        this.brillance.setDepth(1000);

        this.scene.tweens.add({
            targets: this.brillance,
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

        Tableau.current.physics.add.overlap(this, Tableau.current.player, function (){

            me.recolt_m.on = true;
            this.destroy();
            this.brillance.destroy();
            ui.gagne();
            Tableau.current.sound.play('moleu', {volume : 0.3 });
            setTimeout(function(){

                me.recolt_m.on = false;

            }, 20 )


        }, null, this);

    }
}
