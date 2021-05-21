class Level_1 extends Tableau {

    preload() {
        super.preload();

        this.load.image('blood', 'assets/blood.png');
        this.load.image('tourelleV2', 'assets/tourelleV2.png');
        this.load.image('drone', 'assets/drone.png');
        this.load.image('sol', 'assets/platformes_sol.png');
        this.load.image('mechant', 'assets/mechant.png');
        this.load.image('plat', 'assets/platform_.png');
        this.load.image('tono', 'assets/tono.png');
        this.load.image('mine', 'assets/mine.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('platform', 'assets/new_image/platform.png');
        this.load.image('platform_t', 'assets/tente_barre.png');
        this.load.image('blue_sky', 'assets/blue_sky.png');
        this.load.image('tir', 'assets/new_image/Bullet.png');
        this.load.image('moleu_', 'assets/moleu.png');
        this.load.image('test_1', 'assets/new_image/test-dgt-1.png');
        this.load.image('cible', 'assets/cible.png');

        this.load.image('sprite', 'ref/sprite.png');
        this.load.tilemapTiledJSON('map', 'TILED/end/VFX_68.json');
        this.load.image('back', 'assets/images/background.png');


        this.load.audio('amb', 'son/ambiance.wav');


    }

    create() {

        console.log(Phaser);

        super.create();

        this.tuto = this.add.image(300,200,"test_1")
        this.tuto.setDisplaySize(100,100);

        // this.tuto.create(1000,150,"test_1");



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

        //nos images qui vont avec la map

        this.tileset = this.map.addTilesetImage('sprite_', 'sprite');

        //on agrandit le champ de la caméra du coup

        let largeurDuTableau = this.map.widthInPixels;
        let hauteurDuTableau = this.map.heightInPixels;
        this.physics.world.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.cameras.main.startFollow(this.player, true, 1, 1);


        //   ---- PLACEMENT GRAPH ------


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
            100,
            this.sys.canvas.width * 2,
            this.sys.canvas.height * 2,
            'back'
        );
        this.sky2.setOrigin(0, 0);
        this.sky2.setScrollFactor(0);
        this.sky2.displayWidth = 21 * 64;


        //   ---- PLACEMENT INTERACT/ MOV  ------


        // _*_*_*_*_*_*__* PLATFORMS *--*-*-*-*-

        this.platforms = this.physics.add.group();

        // créeons nos platform


        this.platforms.children.iterate(function (child) {
            child.setImmovable(true); // pour ne pas bouger quand il y a collision
            child.body.allowGravity = false; // on désactive l'effet de la gravité
            child.setCollideWorldBounds(false);
            child.setFriction(1); // pour que les éléments ne glissent sur cette plateforme
            child.setOrigin(0, 0); // pour positionner plus facilement, repère en haut à gauche (descendant, vers la droite)
            child.setDisplaySize(103, 7);
            //child.refreshBody();
        });

        this.platform_t = this.physics.add.group();

        this.platform_t.create(1000,150,"platform_t");
        this.platform_t.create(2688,288,"platform_t");
        this.platform_t.create(3326,288,"platform_t");
        this.platform_t.create(3519,288,"platform_t");
        this.platform_t.create(3710,288,"platform_t");
        this.platform_t.create(5889,288,"platform_t");
        this.platform_t.create(6208,288,"platform_t");

        this.platform_t.children.iterate(function (child) {
            child.setImmovable(true); // pour ne pas bouger quand il y a collision
            child.body.allowGravity = false; // on désactive l'effet de la gravité
            child.setCollideWorldBounds(false);
            child.setFriction(1); // pour que les éléments ne glissent sur cette plateforme
            child.setOrigin(0, 0); // pour positionner plus facilement, repère en haut à gauche (descendant, vers la droite)
            child.setDisplaySize(190, 8);
            //child.refreshBody();
        });


        // _*_*_*_*_*_*__* PLATFORMS *--*-*-*-*-*

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

        this.moleu=this.physics.add.group();
        this.moleu.create(663,263,"moleu_");
        this.moleu.create(6750,220,"moleu_");
        this.moleu.create(7066,220,"moleu_");
        this.moleu.create(7519,270,"moleu_");

        this.moleu.children.iterate(function (child) {
            child.setCollideWorldBounds(true);
            child.setBounce(0);
            child.setDisplaySize(30,50)
            child.setBodySize(20,45);
            child.body.allowGravity = false;
            child.flipX = false;

        });

        this.physics.add.overlap(this.player, this.moleu, this.getMoleu, null, this);


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


        // ----------- ***** ----------- ON CREE NOS MONSTRES ---------*****-


        //   ---- PLACEMENT INTERACT/ MOV  ------


        //----------collisions---------------------


        this.floor.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, this.floor);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.platform_t);
        this.physics.add.collider(this.mineContainer, this.floor);
        this.physics.add.collider(this.tonoContainer, this.floor);
        this.physics.add.collider(this.mechantContainer, this.floor);
        this.physics.add.collider(this.platform_t, this.mechantContainer);


        //----------collisions---------------------


        //----------débug---------------------


        //pour débugger les collisions sur chaque layer
        let debug = this.add.graphics().setAlpha(this.game.config.physics.arcade.debug ? 0.75 : 0);
        if (this.game.config.physics.arcade.debug === false) {
            debug.visible = true;
        }
        //débug solides en vers
        this.floor.renderDebug(debug, {
            tileColor: null, // Couleur des tiles qui ne collident pas
            collidingTileColor: new Phaser.Display.Color(0, 255, 0, 255), //Couleur des tiles qui collident
            faceColor: null // Color of colliding face edges
        });


        //--------------- Debug -----------------

        // ***-*-*-*-*-*-*- Z ORDER -*-*-*-*-*-*-*-*-

        let z = 1000;

        //devant

        this.blood.setDepth(z--);
        this.moleu.setDepth(z--);
        this.player.setDepth(z--);
        this.tuto.setDepth(z);
        this.tonoContainer.setDepth(z);
        this.mineContainer.setDepth(z);
        this.mechantContainer.setDepth(z);
        this.platform_t.setDepth(z);
        this.cibleContainer.setDepth(z);

        this.platforms.setDepth(z);
        this.floor.setDepth(z--);

        this.background.setDepth(z--);

        this.sky2.setDepth(z--);
        this.sky.setDepth(z--);

        //derrière

        // ***-*-*-*-*-*-*- Z ORDER FIN -*-*-*-*-*-*-*-*-

        //






    }

    apparitionTexte() {

        if (this.player.x < 520) {
            //this.tuto_dash.alpha=1;
            Tableau.current.tweens.add({
                targets: Tableau.current.tuto,
                alpha: 1,
                duration: 30,
                ease: 'Sine.easeInOut',

            })
        } else if (this.player.x >= 0) {
            //this.tuto_dash.alpha=0;
            Tableau.current.tweens.add({
                targets: Tableau.current.tuto,
                alpha: 0,
                duration: 30,
                ease: 'Sine.easeInOut',

            })
        }
    }
    


    update() {
        super.update();

        this.apparitionTexte();
        //le second plan se déplace moins vite pour accentuer l'effet
        this.sky.tilePositionX = this.cameras.main.scrollX * 0.1;
        this.sky.tilePositionY = this.cameras.main.scrollY * 0.05;

        this.sky2.tilePositionX = this.cameras.main.scrollX * 0.15;
        this.sky2.tilePositionY = this.cameras.main.scrollY * 0.1;

        // le fond se déplace moins vite que la caméra pour donner un effet paralax
        this.background.tilePositionX = this.cameras.main.scrollX * 0.2;
        this.background.tilePositionY = this.cameras.main.scrollY * 0.15;



        //optimisation
        //teste si la caméra a bougé
        let actualPosition = JSON.stringify(this.cameras.main.worldView);
        if (!this.previousPosition || this.previousPosition !== actualPosition) {

            this.previousPosition = actualPosition;
            // this.optimizeDisplay();



        }



    
    }
}