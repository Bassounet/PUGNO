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


        this.target_groundex = scene.add.particles('tono_particle');

        this.emitter_target = this.target_groundex.createEmitter({
            x: this.x,
            y: this.y,
            speed: {min: 0, max: 200},
            radial: true,
            angle: {min: -1, max: -180},
            scale: {start: 0.5, end: 0.6},
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
        this.once(MyEvents.EXPLODE_tono, function () {


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
            quantity: 3,
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

        // ___ ici floor hit

        this.target_ = scene.add.particles('particle_target');

        this.emitter_f = this.target_.createEmitter({
            x: this.x,
            y: this.y,
            speed: {min: 0, max: 200},
            radial: true,
            angle: {min: -1, max: -180},
            scale: {start: 0.6, end: 0.8},
            blendMode: 'NORMAL',
            active: true,
            lifespan: 300,
            gravityY: 1000,
            frequency: 100,
            quantity: 2,
            rotate: {min: 0, max: 360},

        });

        this.emitter_f.on = false;
        this.target_.setDepth(1000);

        let ce = this;
        this.once(MyEvents.EXPLODE, function () {


            ce.emitter_f.on = true
            ce.emitter_f.startFollow(ce);

            setTimeout(function () {

                ce.emitter_f.on = false;

            }, 100)

        }, 100)

        // ___ ici floor hit FIN

        // ___ ici floor hit

        this.target_moleux = scene.add.particles('particlesg');

        this.emitter_moleux = this.target_moleux.createEmitter({
            x: this.x,
            y: this.y,
            speed: {min: 0, max: 200},
            radial: true,
            angle: {min: -1, max: -180},
            scale: {start: 0.05, end: 0.1},
            blendMode: 'NORMAL',
            active: true,
            lifespan: 300,
            gravityY: 1000,
            frequency: 100,
            quantity: 7,
            rotate: {min: 0, max: 360},

        });

        this.emitter_moleux.on = false;
        this.target_moleux.setDepth(1000);

        let te = this;
        this.once(MyEvents.EXPLODE_moleu, function () {


            te.emitter_moleux.on = true
            te.emitter_moleux.startFollow(te);

            setTimeout(function () {

                te.emitter_moleux.on = false;

            }, 100)

        }, 100)

        // ___ ici floor hit FIN



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
                me.emit(MyEvents.EXPLODE_tono);
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

        let elle = this;
        scene.moleuContainer.iterate(moleuu => {
            scene.physics.add.overlap(this, moleuu, function () {

                Tableau.current.sound.play('hitcrystal', {volume : 0.1});
                me.emit(MyEvents.EXPLODE_moleu);
                tir.destroy();
                elle.destroy();



            }, null, scene);

        })




    }
}