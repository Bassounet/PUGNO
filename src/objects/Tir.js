class Tir extends ObjetPhysique{
    constructor(scene, x, y) {
        super(scene, x, y, "tir");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.allowGravity = false;
        this.setDisplaySize(10, 5);
        this.setBodySize(this.body.width, this.body.height);

        this.setVelocityX(800 * scene.player.sens);
        this.setBounce(1);
        this.setDepth(1000);

        let tir = this;



        // ___ ici tono shot


        this.target_groundex = scene.add.particles('particle_tono');

        this.emitter_target = this.target_groundex.createEmitter({
            x: this.x,
            y: this.y,
            speed: {min: 0, max: 200},
            radial: true,
            angle: {min: -1, max: -180},
            scale: {start: 1, end: 1},
            blendMode: 'NORMAL',
            active: true,
            lifespan: 300,
            gravityY: 1000,
            frequency: 100,
            quantity: 2,
            rotate: {min: 0, max: 360},

        });

        this.emitter_target.on = false;
        this.target_groundex.setDepth(1000);

        let me = this;
        this.once(MyEvents.EXPLODE, function () {


            me.emitter_target.on = true
            me.emitter_target.startFollow(me);

            setTimeout(function () {

                me.emitter_target.on = false;

            }, 100)

        }, 100)

        // ___ ici tono shot fin


        // ___ ici cible shot

        this.target_ciblex = scene.add.particles('ciblex');

        this.emitter_cible = this.target_ciblex.createEmitter({
            x: this.x,
            y: this.y,
            speed: {min: 0, max: 200},
            radial: true,
            angle: {min: -1, max: -180},
            scale: {start: 1, end: 1},
            blendMode: 'NORMAL',
            active: true,
            lifespan: 300,
            gravityY: 1000,
            frequency: 100,
            quantity: 4,
            rotate: {min: 0, max: 360},

        });

        this.emitter_cible.on = false;
        this.target_ciblex.setDepth(1000);

         let je = this;
        this.once(MyEvents.EXPLODE_cible, function () {


            je.emitter_cible.on = true
            je.emitter_cible.startFollow(je);

            setTimeout(function () {

                je.emitter_cible.on = false;

            }, 100)

        }, 100)

        // ___ ici cible shot fin

        this.target_blood = scene.add.particles('pasblood');

        this.emitter_blood = this.target_blood.createEmitter({
            x: this.x,
            y: this.y,
            speed: {min: 0, max: 200},
            radial: true,
            angle: {min: -1, max: -180},
            scale: {start: 1, end: 1},
            blendMode: 'NORMAL',
            active: true,
            lifespan: 300,
            gravityY: 1000,
            frequency: 100,
            quantity: 4,
            rotate: {min: 0, max: 360},

        });

        this.emitter_blood.on = false;
        this.target_blood.setDepth(1000);

        let tu = this;
        this.once(MyEvents.EXPLODE_mechant, function () {


            tu.emitter_blood.on = true
            tu.emitter_blood.startFollow(tu);

            setTimeout(function () {

                tu.emitter_blood.on = false;

            }, 100)

        }, 100)



        scene.cibleContainer.iterate(cibleu => {
            scene.physics.add.overlap(this, cibleu, function () {

                me.emit(MyEvents.EXPLODE_cible);
                cibleu.killcible();
                tir.destroy()

            }, null, scene);

        })

        scene.tonoContainer.iterate(monster => {
            scene.physics.add.overlap(this, monster, function () {

                Tableau.current.sound.play('hit_tono_song', {volume : 1});
                me.emit(MyEvents.EXPLODE);
                tir.destroy()


            }, null, scene);

        })

        scene.mechantContainer.iterate(monster => {
            scene.physics.add.overlap(this, monster, function () {

                Tableau.current.sound.play('hitman', {volume : 0.1});
                monster.killmonster();
                me.emit(MyEvents.EXPLODE_mechant);
                tir.destroy()


            }, null, scene);

        })

        scene.physics.add.collider(this, scene.floor, function () {

            me.emit(MyEvents.EXPLODE);
            tir.destroy();
            Tableau.current.sound.play('hitground', {volume : 0.1});

        });
    }
}