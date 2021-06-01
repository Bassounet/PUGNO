class Level_1 extends Tableau {

    preload() {
        super.preload();

        this.load.image('tourelleV2', 'assets/tourelleV2.png');
        this.load.image('drone', 'assets/drone.png');
        this.load.image('mechant', 'assets/mechant.png');
        this.load.image('tono', 'assets/tono1.png');
        this.load.image('mine', 'assets/mine.png');

        this.load.image('sol', 'assets/platformes_sol.png');
        this.load.image('plat', 'assets/platform_.png');
        this.load.image('platform', 'assets/new_image/platform.png');
        this.load.image('platform_t', 'assets/tente_barre.png');

        this.load.image('tir', 'assets/new_image/Bullet.png');
        this.load.image('moleu_', 'assets/moleu.png');
        this.load.image('cible', 'assets/cible.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('blood', 'assets/blood.png');

        this.load.image('sprite', 'ref/sprite4.png');
        this.load.image('back', 'assets/images/backgroundB.png');
        this.load.image('background2', 'assets/images/background2.png');
        this.load.image('background2_5', 'assets/images/background3.png');
        this.load.image('blue_sky', 'assets/blue_sky.png');
        this.load.image('cloud', 'assets/cloud.png');


        this.load.image('txt1', 'assets/txt1.png');
        this.load.image('txt2', 'assets/txt2.png');
        this.load.image('txt3', 'assets/txt3.png');
        this.load.image('txt4', 'assets/txt4.png');
        this.load.image('txt5', 'assets/txt5.png');
        this.load.image('txt6', 'assets/txt6.png');
        this.load.image('txt7', 'assets/txt7.png');
        this.load.image('sam_text', 'assets/sam_text.png');

        this.load.image('particlesg', 'assets/particles/particle1.png');
        this.load.image('particle_mine', 'assets/particles/particle_mine.png');
        this.load.image('particle_tono', 'assets/particles/particle_tono.png');
        this.load.image('particle_target', 'assets/particles/particle_target.png');
        this.load.image('tincelles', 'assets/particles/tincelles.png');
        this.load.image('ciblex', 'assets/particles/ciblex.png');
        this.load.image('pasblood', 'assets/particles/pasblood.png');
        this.load.image('tono_particle', 'assets/particles/tono_particle.png');


        this.load.audio('amb', 'son/ambiance.wav');

        this.load.tilemapTiledJSON('map', 'TILED/end/VFX_168.json');



    }

    create() {

        console.log(Phaser);

        super.create();


        this.musicamb = this.sound.add('amb');
        var musicConfig =
            {
                mute: false,
                volume: 0.2,
                rate : 1,
                detune: 0,
                seek: 0,
                loop: true,
                delay:0,
            }
        this.musicamb.play(musicConfig);


        //--------chargement de la tile map & configuration de la scène-----------------------

        //notre map
        this.map = this.make.tilemap({key: 'map'});
        this.tileset = this.map.addTilesetImage('sprite_', 'sprite');

        //on agrandit le champ de la caméra du coup

        let largeurDuTableau = this.map.widthInPixels;
        let hauteurDuTableau = this.map.heightInPixels;
        this.physics.world.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.cameras.main.startFollow(this.player, true, 1, 1);


        //   ---- PLACEMENT GRAPH ------

        //   ---- Particles ------

        this.emitter1 = this.add.particles('particlesg').createEmitter({
            x: 100,
            y: 100,
            speed: { min: -800, max: 800 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.5, end: 0 },
            blendMode: 'SCREEN',
            active: true,
            lifespan: 600,
            gravityY: 800
        });


        //   ---- Particles ------


        //   ---- PLACEMENT texte ------



        let text1_x = 175;
        let text1_y = 285;

        this.txt1 = this.add.image(text1_x, text1_y, "txt1")
        this.txt1.setDisplaySize(190,60);

        let text2_x = 2130;
        let text2_y = 150;

        this.txt2 = this.add.image(text2_x, text2_y, "txt2")
        this.txt2.setDisplaySize(175,60);

        let text3_x = 3225;
        let text3_y = 160;

        this.txt3 = this.add.image(text3_x, text3_y, "txt3")
        this.txt3.setDisplaySize(185,45);

        let text4_x = 4150;
        let text4_y = 155;

        this.txt4 = this.add.image(text4_x, text4_y, "txt4")
        this.txt4.setDisplaySize(160,60);

        let text5_x = 5370;
        let text5_y = 165;

        this.txt5 = this.add.image(text5_x, text5_y, "txt5")
        this.txt5.setDisplaySize(160,50);

        let text6_x = 6660;
        let text6_y = 160;

        this.txt6 = this.add.image(text6_x, text6_y, "txt6")
        this.txt6.setDisplaySize(170,50);

        let text7_x = 7560;
        let text7_y = 280;

        this.txt7 = this.add.image(text7_x, text7_y, "txt7")
        this.txt7.setDisplaySize(180,50);

        let text_sam_X = 13950;
        let text_sam_Y = 300;

        this.txtsam = this.add.image(text_sam_X, text_sam_Y, "sam_text")
        this.txtsam.setDisplaySize(180,50);




        //   ---- PLACEMENT texte FIN ------


        this.floor = this.map.createLayer('floor', this.tileset, 0, 0);
        this.floor.setOrigin(0, 0);

        this.background = this.map.createLayer('backgroundF', this.tileset, 0, 0);
        this.background.setOrigin(0, 0);

        this.sky = this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width * 2,
            this.sys.canvas.height * 2,
            'blue_sky'
        );
        this.sky.setOrigin(0, 0);
        this.sky.setScrollFactor(0);
        this.sky.displayWidth = 21 * 64;

        this.sky2 = this.add.tileSprite(
            0,
            130,
            this.sys.canvas.width * 2,
            this.sys.canvas.height * 2,
            'back'
        );
        this.sky2.setOrigin(0, 0);
        this.sky2.setScrollFactor(0);
        this.sky2.displayWidth = 21 * 64;

        this.cloud = this.add.tileSprite(
            0,
            50,
            this.sys.canvas.width * 2,
            this.sys.canvas.height * 2,
            'cloud'
        );
        this.cloud.setOrigin(0, 0);
        this.cloud.setScrollFactor(0);
        this.cloud.displayWidth = 21 * 64;

        this.background2 = this.add.tileSprite(
            -200,
            160,
            this.sys.canvas.width * 2,
            this.sys.canvas.height * 2,
            'background2'
        );
        this.background2.setOrigin(0, 0);
        this.background2.setScrollFactor(0);
        this.background2.displayWidth = 21 * 64;

        this.background2_5 = this.add.tileSprite(
            0,
            160,
            this.sys.canvas.width * 2,
            this.sys.canvas.height * 2,
            'background2_5'
        );
        this.background2_5.setOrigin(0, 0);
        this.background2_5.setScrollFactor(0);
        this.background2_5.displayWidth = 21 * 64;




        // _*_*_*_*_*_*__* PLATFORMS *--*-*-*-*-

        this.platforms = this.physics.add.group();
        this.platforms.children.iterate(function (child) {
            child.setImmovable(true);
            child.body.allowGravity = false;
            child.setCollideWorldBounds(false);
            child.setFriction(1);
            child.setOrigin(0, 0);
            child.setDisplaySize(103, 7);

        });

        // _*_*_*_*_*_*__* PLATFORM tente  *--*-*-*-*-

        this.platform_t = this.physics.add.group();

        this.platform_t.create(3390,288,"platform_t");
        this.platform_t.create(3583,288,"platform_t");
        this.platform_t.create(3774,288,"platform_t");
        this.platform_t.create(5889,288,"platform_t");
        this.platform_t.create(6208,288,"platform_t");

        this.platform_t.children.iterate(function (child) {
            child.setImmovable(true); // pour ne pas bouger quand il y a collision
            child.body.allowGravity = false; // on désactive l'effet de la gravité
            child.setCollideWorldBounds(false);
            child.setFriction(1); // pour que les éléments ne glissent sur cette plateforme
            child.setOrigin(0, 0); // pour positionner plus facilement, repère en haut à gauche (descendant, vers la droite)
            child.setDisplaySize(190, 8);

        });

        // _*_*_*_*_*_*__* PLATFORM tente FIN   *--*-*-*-*-

        // _*_*_*_*_*_*__* PLATFORMS FIN *--*-*-*-*-*



        // ----------- ***** ---- ON CREE NOS ITEM ---*****---------

        // ----------- ***** ---- ON CREE NOS MONSTRES ---*****---------


        this.mechantContainer = this.add.container();
        this.mineContainer = this.add.container();
        this.tonoContainer = this.add.container();
        this.cibleContainer = this.add.container();


        let ici = this;


        ici.mechantObjects = ici.map.getObjectLayer('mechant')['objects'];

        ici.mechantObjects.forEach(monsterObject => {
            let mechant = new mechant1(ici, monsterObject.x, monsterObject.y);
            ici.mechantContainer.add(mechant);
            ici.physics.add.collider(mechant, this.floor);

        });

        ici.tonoObjects = ici.map.getObjectLayer('tono')['objects'];
        ici.tonoObjects.forEach(tonoObject => {
            let tono = new Tono(ici, tonoObject.x, tonoObject.y);
            ici.tonoContainer.add(tono);
            ici.physics.add.collider(tono, this.floor);

        });

        ici.mineObjects = ici.map.getObjectLayer('mines')['objects'];
        ici.mineObjects.forEach(mineObject => {
            let minex = new mine(ici, mineObject.x, mineObject.y);
            ici.mineContainer.add(minex);
            ici.physics.add.collider(minex, this.floor);
        });

        ici.cibleObjects = ici.map.getObjectLayer('cibles')['objects'];
        ici.cibleObjects.forEach(cibleObject => {
            let cibleu = new cible1(ici, cibleObject.x, cibleObject.y);
            ici.cibleContainer.add(cibleu);
            ici.physics.add.collider(cibleu, this.floor);

        });

        ici.mechantObjects = ici.map.getObjectLayer('mechant')['objects'];

        ici.mechantObjects.forEach(monsterObject => {
            let mechant = new mechant1(ici, monsterObject.x, monsterObject.y);
            ici.mechantContainer.add(mechant);
            ici.physics.add.collider(mechant, this.floor);

        });

        // ----------- ***** ---- ON CREE NOS MONSTRES FIN ---*****---------

        // ----------- ***** ---- ON CREE NOS CRISTAUX  ---*****---------

        this.moleuContainer = this.add.container();


        ici.moleuuuObjects = ici.map.getObjectLayer('moleu')['objects'];
        ici.moleuuuObjects.forEach(moleuObject => {
            let moleuu = new Moleux(ici, moleuObject.x + 35, moleuObject.y);
            ici.moleuContainer.add(moleuu);
            // ici.physics.add.collider(moleuu, this.floor);
            this.add.image(0,0,'moleu_');

        });


        // ----------- ***** ---- ON CREE NOS CRISTAUX FIN   ---*****---------

        // ----------- ***** ---- ON CREE NOS ITEM FIN ---*****---------


        //----------collisions---------------------


        this.floor.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, this.floor);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.platform_t);
        this.physics.add.collider(this.mineContainer, this.floor);
        this.physics.add.collider(this.tonoContainer, this.floor);
        this.physics.add.collider(this.mechantContainer, this.floor);
        this.physics.add.collider(this.platform_t, this.mechantContainer)


        //----------collisions FIN ---------------------


        //----------débug---------------------


        let debug = this.add.graphics().setAlpha(this.game.config.physics.arcade.debug ? 0.75 : 0);
        if (this.game.config.physics.arcade.debug === false) {
            debug.visible = true;
        }

        this.floor.renderDebug(debug, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(0, 255, 0, 255),
            faceColor: null
        });


        //--------------- Debug -----------------


        // ***-*-*-*-*-*-*- Z ORDER -*-*-*-*-*-*-*-*-

        let z = 1000;

        //devant

        this.blood.setDepth(z--);
        // this.moleu.setDepth(z--);
        this.player.setDepth(z--);



        this.txt1.setDepth(z)
        this.txt2.setDepth(z);
        this.txt3.setDepth(z);
        this.txt4.setDepth(z);
        this.txt5.setDepth(z);
        this.txt6.setDepth(z);
        this.txt7.setDepth(z);
        this.txtsam.setDepth(z);


        this.mineContainer.setDepth(z);
        this.mechantContainer.setDepth(z);
        this.cibleContainer.setDepth(z);
        this.tonoContainer.setDepth(z);
        this.moleuContainer.setDepth(z);

        this.platform_t.setDepth(z);
        this.platforms.setDepth(z);

        this.floor.setDepth(z--);

        this.background.setDepth(z--);
        this.background2.setDepth(z--);

        this.sky2.setDepth(z--)
        this.background2_5.setDepth(z--);
        this.background2.setDepth(z--);

        this.cloud.setDepth(z--);


        this.sky.setDepth(z--);


        //derrière

        // ***-*-*-*-*-*-*- Z ORDER FIN -*-*-*-*-*-*-*-*-




    }

    // ***-*-*-*-*-*-*- NEW FONCTIONS  -*-*-*-*-*-*-*-*-

    // ***-*-*-*-*-*-*- TXT -*-*-*-*-*-*-*-*-

    apparitionText1() {

        // -*-*-*-*-*-*- TXT 1

        let x_ok_start_1 = 70;
        let x_ok_fin_1 = 400;


        if (this.player.x < x_ok_start_1) {
            //this.tuto_dash.alpha=1;
            Tableau.current.tweens.add({
                targets: Tableau.current.txt1,
                alpha: 0,
                duration: 30,
                ease: 'Sine.easeInOut',

            })

        } else if (this.player.x > x_ok_fin_1) {
            //this.tuto_dash.alpha=0;
            Tableau.current.tweens.add({
                targets: Tableau.current.txt1,
                alpha: 0,
                duration: 30,
                ease: 'Sine.easeInOut',

            })

        } else if (this.player.x > x_ok_start_1 + 1) {
            //this.tuto_dash.alpha=0;
            Tableau.current.tweens.add({
                targets: Tableau.current.txt1,
                alpha: 1,
                duration: 30,
                ease: 'Sine.easeInOut',

            })

        } else if (this.player.x < x_ok_fin_1 - 1) {
            //this.tuto_dash.alpha=0;
            Tableau.current.tweens.add({
                targets: Tableau.current.txt1,
                alpha: 1,
                duration: 30,
                ease: 'Sine.easeInOut',

            })

        }

        // -*-*-*-*-*-*- TXT 1 FIN

        // -*-*-*-*-*-*- TXT 2

        let x_ok_start_2 = 1850;
        let x_ok_fin_2 = 2300;


        if (this.player.x < x_ok_start_2) {
            //this.tuto_dash.alpha=1;
            Tableau.current.tweens.add({
                targets: Tableau.current.txt2,
                alpha: 0,
                duration: 30,
                ease: 'Sine.easeInOut',

            })

        } else if (this.player.x > x_ok_fin_2) {
            //this.tuto_dash.alpha=0;
            Tableau.current.tweens.add({
                targets: Tableau.current.txt2,
                alpha: 0,
                duration: 30,
                ease: 'Sine.easeInOut',

            })

        } else if (this.player.x > x_ok_start_2 + 1) {
            //this.tuto_dash.alpha=0;
            Tableau.current.tweens.add({
                targets: Tableau.current.txt2,
                alpha: 1,
                duration: 30,
                ease: 'Sine.easeInOut',

            })

        } else if (this.player.x < x_ok_fin_2 - 1) {
            //this.tuto_dash.alpha=0;
            Tableau.current.tweens.add({
                targets: Tableau.current.txt2,
                alpha: 1,
                duration: 30,
                ease: 'Sine.easeInOut',

            })

        }

        // -*-*-*-*-*-*- TXT 2 FIN

        // -*-*-*-*-*-*- TXT 3

        let x_ok_start_3 = 2900;
        let x_ok_fin_3 = 3280;


        if (this.player.x < x_ok_start_3) {
            //this.tuto_dash.alpha=1;
            Tableau.current.tweens.add({
                targets: Tableau.current.txt3,
                alpha: 0,
                duration: 30,
                ease: 'Sine.easeInOut',

            })

        } else if (this.player.x > x_ok_fin_3) {
            //this.tuto_dash.alpha=0;
            Tableau.current.tweens.add({
                targets: Tableau.current.txt3,
                alpha: 0,
                duration: 30,
                ease: 'Sine.easeInOut',

            })

        } else if (this.player.x > x_ok_start_3 + 1) {
            //this.tuto_dash.alpha=0;
            Tableau.current.tweens.add({
                targets: Tableau.current.txt3,
                alpha: 1,
                duration: 30,
                ease: 'Sine.easeInOut',

            })

        } else if (this.player.x < x_ok_fin_3 - 1) {
            //this.tuto_dash.alpha=0;
            Tableau.current.tweens.add({
                targets: Tableau.current.txt3,
                alpha: 1,
                duration: 30,
                ease: 'Sine.easeInOut',

            })

        }

        // -*-*-*-*-*-*- TXT 3 FIN

        // -*-*-*-*-*-*- TXT 4

        let x_ok_start_4 = 4032;
        let x_ok_fin_4 = 4400;


        if (this.player.x < x_ok_start_4) {
            //this.tuto_dash.alpha=1;
            Tableau.current.tweens.add({
                targets: Tableau.current.txt4,
                alpha: 0,
                duration: 30,
                ease: 'Sine.easeInOut',

            })

        } else if (this.player.x > x_ok_fin_4) {
            //this.tuto_dash.alpha=0;
            Tableau.current.tweens.add({
                targets: Tableau.current.txt4,
                alpha: 0,
                duration: 30,
                ease: 'Sine.easeInOut',

            })

        } else if (this.player.x > x_ok_start_4 + 1) {
            //this.tuto_dash.alpha=0;
            Tableau.current.tweens.add({
                targets: Tableau.current.txt4,
                alpha: 1,
                duration: 30,
                ease: 'Sine.easeInOut',

            })

        } else if (this.player.x < x_ok_fin_4 - 1) {
            //this.tuto_dash.alpha=0;
            Tableau.current.tweens.add({
                targets: Tableau.current.txt4,
                alpha: 1,
                duration: 30,
                ease: 'Sine.easeInOut',

            })

        }

        // -*-*-*-*-*-*- TXT 4 FIN

        // -*-*-*-*-*-*- TXT 5

        let x_ok_start_5 = 5250;
        let x_ok_fin_5 = 5700;


        if (this.player.x < x_ok_start_5) {
            //this.tuto_dash.alpha=1;
            Tableau.current.tweens.add({
                targets: Tableau.current.txt5,
                alpha: 0,
                duration: 30,
                ease: 'Sine.easeInOut',

            })

        } else if (this.player.x > x_ok_fin_5) {
            //this.tuto_dash.alpha=0;
            Tableau.current.tweens.add({
                targets: Tableau.current.txt5,
                alpha: 0,
                duration: 30,
                ease: 'Sine.easeInOut',

            })

        } else if (this.player.x > x_ok_start_5 + 1) {
            //this.tuto_dash.alpha=0;
            Tableau.current.tweens.add({
                targets: Tableau.current.txt5,
                alpha: 1,
                duration: 30,
                ease: 'Sine.easeInOut',

            })

        } else if (this.player.x < x_ok_fin_5 - 1) {
            //this.tuto_dash.alpha=0;
            Tableau.current.tweens.add({
                targets: Tableau.current.txt5,
                alpha: 1,
                duration: 30,
                ease: 'Sine.easeInOut',

            })

        }

        // -*-*-*-*-*-*- TXT 5 FIN

        // -*-*-*-*-*-*- TXT 6

        let x_ok_start_6 = 6450;
        let x_ok_fin_6 = 6740;


        if (this.player.x < x_ok_start_6) {
            //this.tuto_dash.alpha=1;
            Tableau.current.tweens.add({
                targets: Tableau.current.txt6,
                alpha: 0,
                duration: 30,
                ease: 'Sine.easeInOut',

            })

        } else if (this.player.x > x_ok_fin_6) {
            //this.tuto_dash.alpha=0;
            Tableau.current.tweens.add({
                targets: Tableau.current.txt6,
                alpha: 0,
                duration: 30,
                ease: 'Sine.easeInOut',

            })

        } else if (this.player.x > x_ok_start_6 + 1) {
            //this.tuto_dash.alpha=0;
            Tableau.current.tweens.add({
                targets: Tableau.current.txt6,
                alpha: 1,
                duration: 30,
                ease: 'Sine.easeInOut',

            })

        } else if (this.player.x < x_ok_fin_6 - 1) {
            //this.tuto_dash.alpha=0;
            Tableau.current.tweens.add({
                targets: Tableau.current.txt6,
                alpha: 1,
                duration: 30,
                ease: 'Sine.easeInOut',

            })

        }

        // -*-*-*-*-*-*- TXT 6 FIN

        // -*-*-*-*-*-*- TXT 7

        let x_ok_start_7 = 7200;
        let x_ok_fin_7 = 7600;


        if (this.player.x < x_ok_start_7) {
            //this.tuto_dash.alpha=1;
            Tableau.current.tweens.add({
                targets: Tableau.current.txt7,
                alpha: 0,
                duration: 30,
                ease: 'Sine.easeInOut',

            })

        } else if (this.player.x > x_ok_fin_7) {
            //this.tuto_dash.alpha=0;
            Tableau.current.tweens.add({
                targets: Tableau.current.txt7,
                alpha: 0,
                duration: 30,
                ease: 'Sine.easeInOut',

            })

        } else if (this.player.x > x_ok_start_7 + 1) {
            //this.tuto_dash.alpha=0;
            Tableau.current.tweens.add({
                targets: Tableau.current.txt7,
                alpha: 1,
                duration: 30,
                ease: 'Sine.easeInOut',

            })

        } else if (this.player.x < x_ok_fin_7 - 1) {
            //this.tuto_dash.alpha=0;
            Tableau.current.tweens.add({
                targets: Tableau.current.txt7,
                alpha: 1,
                duration: 30,
                ease: 'Sine.easeInOut',

            })

        }

        // -*-*-*-*-*-*- TXT 7 FIN

        // -*-*-*-*-*-*- TXT 7

        let x_ok_start_sam = 13700;
        let x_ok_fin_sam = 15000;


        if (this.player.x < x_ok_start_sam) {
            //this.tuto_dash.alpha=1;
            Tableau.current.tweens.add({
                targets: Tableau.current.txtsam,
                alpha: 0,
                duration: 30,
                ease: 'Sine.easeInOut',

            })

        } else if (this.player.x > x_ok_fin_sam) {
            //this.tuto_dash.alpha=0;
            Tableau.current.tweens.add({
                targets: Tableau.current.txtsam,
                alpha: 0,
                duration: 30,
                ease: 'Sine.easeInOut',

            })

        } else if (this.player.x > x_ok_start_sam + 1) {
            //this.tuto_dash.alpha=0;
            Tableau.current.tweens.add({
                targets: Tableau.current.txtsam,
                alpha: 1,
                duration: 30,
                ease: 'Sine.easeInOut',

            })

        } else if (this.player.x < x_ok_fin_sam - 1) {
            //this.tuto_dash.alpha=0;
            Tableau.current.tweens.add({
                targets: Tableau.current.txtsam,
                alpha: 1,
                duration: 30,
                ease: 'Sine.easeInOut',

            })

        }

        // -*-*-*-*-*-*- TXT 7 FIN
    }

    // ***-*-*-*-*-*-*- TXT FIN -*-*-*-*-*-*-*-*-

    TP() {

        // -*-*-*-*-*-*- BARBELS

        // -*-*-*-*-*-*- TP 1 FIN

        let TP1_X = 2493;
        let TP_Y = 400;
        let target_X1 = 200;

        if (this.player.x > TP1_X && this.player.y > TP_Y && this.player.x < TP1_X + 128 ) {

            this.cameras.main.shake(50, 0.07, true);
            this.sound.play('barbeles', {volume : 1 });
            this.sound.play('die', {volume : 1 });
            this.cameras.main.fadeOut(1, 0, 0, 0);
            this.player.setPosition(target_X1,200);
            this.cameras.main.fadeIn(700, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, (cam, effect) =>
            {
                this.sound.play('recovery', {volume : 1 });


            })

        }
        // -*-*-*-*-*-*- TP 1 FIN

        // -*-*-*-*-*-*- TP 1-2

        let TP1_2_X = 2300;


        if (this.player.x > TP1_2_X && this.player.y > TP_Y && this.player.x < TP1_2_X + 128 ) {


            this.sound.play('barbeles', {volume : 1 });
            this.sound.play('die', {volume : 1 });
            this.cameras.main.fadeOut(1, 0, 0, 0);
            this.player.setPosition(target_X1,200);
            this.cameras.main.fadeIn(700, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, (cam, effect) =>
            {
                this.sound.play('recovery', {volume : 1 });


            })

        }
        // -*-*-*-*-*-*- TP 1-2 FIN

        // -*-*-*-*-*-*- TP 2

        let TP2_X = 4800;
        let target_X2 = 3045;


        if (this.player.x > TP2_X && this.player.y > TP_Y && this.player.x < TP2_X + 128 ) {

            this.sound.play('barbeles', {volume : 1 });
            this.sound.play('die', {volume : 1 });
            this.cameras.main.fadeOut(1, 0, 0, 0);
            this.player.setPosition(target_X2,200);
            this.cameras.main.fadeIn(700, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, (cam, effect) =>
            {
                this.sound.play('recovery', {volume : 1 });


            })

        }
        // -*-*-*-*-*-*- TP 2 FIN

        // -*-*-*-*-*-*- TP 2-1

        let TP2_1X = 2685;


        if (this.player.x > TP2_1X && this.player.y > TP_Y && this.player.x < TP2_1X + 128 ) {

            this.sound.play('barbeles', {volume : 1 });
            this.sound.play('die', {volume : 1 });
            this.cameras.main.fadeOut(1, 0, 0, 0);
            this.player.setPosition(target_X1,200);
            this.cameras.main.fadeIn(700, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, (cam, effect) =>
            {
                this.sound.play('recovery', {volume : 1 });


            })
        }
        // -*-*-*-*-*-*- TP 2-1 FIN

        // -*-*-*-*-*-*- TP 3

        let TP3_X = 6590;
        let target_X3 = 5550;


        if (this.player.x > TP3_X && this.player.y > TP_Y && this.player.x < TP3_X + 128 ) {

            this.sound.play('barbeles', {volume : 1 });
            this.sound.play('die', {volume : 1 });
            this.cameras.main.fadeOut(1, 0, 0, 0);
            this.player.setPosition(target_X3,200);
            this.cameras.main.fadeIn(700, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, (cam, effect) =>
            {
                this.sound.play('recovery', {volume : 1 });


            })
        }
        // -*-*-*-*-*-*- TP3 FIN

        // -*-*-*-*-*-*- TP 3-1

        let TP3_1_X = 6068;
        let target_X3_1 = 5550;


        if (this.player.x > TP3_1_X && this.player.y > TP_Y && this.player.x < TP3_1_X + 128 ) {

            this.sound.play('barbeles', {volume : 1 });
            this.sound.play('die', {volume : 1 });
            this.cameras.main.fadeOut(1, 0, 0, 0);
            this.player.setPosition(target_X3_1,200);
            this.cameras.main.fadeIn(700, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, (cam, effect) =>
            {
                this.sound.play('recovery', {volume : 1 });


            })
        }
        // -*-*-*-*-*-*- TP3-1 FIN

        // -*-*-*-*-*-*- TP4

        // -*-*-*-*-*-*- BARBELS



        let TP4_X = 7783;
        let target_X4 = 8600;


        if (this.player.x > TP4_X &&  this.player.x < TP4_X + 128 ) {

            this.cameras.main.fadeOut(1, 0, 0, 0);
            this.player.setPosition(target_X4,200);
            this.cameras.main.fadeIn(700, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, (cam, effect) =>
            {
                this.sound.play('recovery', {volume : 1 });


            })

        }
        // -*-*-*-*-*-*- TP4 FIN

        // -*-*-*-*-*-*-  TP LVL 2

        let TP_SAM = 440;
        let target_sam = 8600;

        if (this.player.x > TP_SAM && this.player.y > TP_Y && this.player.x < TP_SAM + 128   ) {

            this.cameras.main.fadeOut(1, 0, 0, 0);
            this.player.setPosition(target_sam,200);
            this.cameras.main.fadeIn(3000, 0, 0, 0);

        }

        // -*-*-*-*-*-*- TP5 FIN

        // -*-*-*-*-*-*-  TP LVL 2

        let TP_SAM2 = 10900;
        let target_sam2 = 12400;

        if (this.player.x > TP_SAM2  && this.player.x < TP_SAM2 + 128   ) {

            this.cameras.main.fadeOut(1, 0, 0, 0);
            this.player.setPosition(target_sam2,200);
            this.cameras.main.fadeIn(3000, 0, 0, 0);

        }

        // -*-*-*-*-*-*- TP5 FIN

    }


    


    update() {
        super.update();

        this.apparitionText1();
        this.TP();



        //le second plan se déplace moins vite pour accentuer l'effet
        this.sky.tilePositionX = this.cameras.main.scrollX * 0.1;
        this.sky.tilePositionY = this.cameras.main.scrollY * 0.05;

        this.sky2.tilePositionX = this.cameras.main.scrollX * 0.15;
        this.sky2.tilePositionY = this.cameras.main.scrollY * 0.1;

        // le fond se déplace moins vite que la caméra pour donner un effet paralax
        this.background.tilePositionX = this.cameras.main.scrollX * 0.3;
        this.background.tilePositionY = this.cameras.main.scrollY * 0.15;

        this.background2_5.tilePositionX = this.cameras.main.scrollX * 0.12;
        this.background2_5.tilePositionY = this.cameras.main.scrollY * 0.5;

        this.background2.tilePositionX = this.cameras.main.scrollX * 0.1;
        this.background2.tilePositionY = this.cameras.main.scrollY * 0.3;

        this.cloud.tilePositionX = this.cameras.main.scrollX * 0.07;
        this.cloud.tilePositionY = this.cameras.main.scrollY * 0.15;



        //optimisation
        //teste si la caméra a bougé
        let actualPosition = JSON.stringify(this.cameras.main.worldView);
        if (!this.previousPosition || this.previousPosition !== actualPosition) {

            this.previousPosition = actualPosition;
            // this.optimizeDisplay();

        }
    }
}