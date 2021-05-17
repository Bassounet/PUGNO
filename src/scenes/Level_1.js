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
        this.load.image('gun', 'assets/Pnonante.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('platform', 'assets/new_image/platform.png');
        this.load.image('blue_sky', 'assets/blue_sky.png');

        this.load.image('sprite', 'ref/sprite.png');
        this.load.tilemapTiledJSON('map', 'TILED/end/VFX_33.json');
        this.load.image('back', 'assets/images/background.png');

    }

    create() {

        console.log(Phaser);

        super.create();


        //--------chargement de la tile map & configuration de la scène-----------------------

        //notre map
        this.map = this.make.tilemap({ key: 'map' });

        //nos images qui vont avec la map

        this.tileset = this.map.addTilesetImage('sprite_', 'sprite');

        //on agrandit le champ de la caméra du coup

        let largeurDuTableau = this.map.widthInPixels;
        let hauteurDuTableau = this.map.heightInPixels;
        this.physics.world.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.cameras.main.startFollow(this.player, true, 1, 1);



        //   ---- PLACEMENT GRAPH ------



        // this.tono = this.map.createLayer('tono', this.tileset, 0, 0);
        this.gun = this.map.createLayer('gun', this.tileset, 0, 0);
        this.med = this.map.createLayer('medikit', this.tileset, 0, 0);
        // this.mine = this.map.createLayer('mine', this.tileset, 0, 0);
        this.playerx = this.map.createLayer('player', this.tileset, 0, 0);

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
        this.sky.displayWidth=21*64;

        this.sky2 = this.add.tileSprite(
            0,
            100,
            this.sys.canvas.width * 2,
            this.sys.canvas.height * 2,
            'sky'
        );
        this.sky2.setOrigin(0, 0);
        this.sky2.setScrollFactor(0);
        this.sky2.displayWidth=21*64;


        //   ---- PLACEMENT INTERACT/ MOV  ------



        // _*_*_*_*_*_*__* PLATFORMS *--*-*-*-*-

        this.platforms = this.physics.add.group();

        // créeons nos platform

        // this.platforms.create(216, 206, 'plat');
        this.platforms.create(638, 262, 'plat');
        this.platforms.create(404, 145, 'plat');
        this.platforms.create(1893, 199, 'plat');

        this.platforms.children.iterate(function (child) {
            child.setImmovable(true); // pour ne pas bouger quand il y a collision
            child.body.allowGravity=false; // on désactive l'effet de la gravité
            child.setCollideWorldBounds(false);
            child.setFriction(1); // pour que les éléments ne glissent sur cette plateforme
            child.setOrigin(0,0); // pour positionner plus facilement, repère en haut à gauche (descendant, vers la droite)
            child.setDisplaySize(103,7);
            //child.refreshBody();
        });






        // _*_*_*_*_*_*__* PLATFORMS *--*-*-*-*-*

        // ----------- ***** ---- ON CREE NOS MONSTRES ---*****---------


        this.mechantContainer=this.add.container();
        this.mineContainer=this.add.container();
        this.tonoContainer=this.add.container();


        let ici = this;


        ici.mechantObjects = ici.map.getObjectLayer('mechant')['objects'];

        ici.mechantObjects.forEach(monsterObject => {
            let mechant=new mechant1(ici,monsterObject.x,monsterObject.y);
            ici.mechantContainer.add(mechant);
            ici.physics.add.collider(mechant, this.floor);

            // this.physics.add.collider(mechant, this.floor);

        });


        ici.tonoObjects = ici.map.getObjectLayer('tono')['objects'];

        ici.tonoObjects.forEach(tonoObject => {
            let tono = new Tono(ici,tonoObject.x,tonoObject.y);
            ici.tonoContainer.add(tono);
            ici.physics.add.collider(tono, this.floor);

            // this.physics.add.collider(tono, this.floor);
            // this.tab.push(tono);

        });

        ici.mineObjects = ici.map.getObjectLayer('mines')['objects'];
        ici.mineObjects.forEach(mineObject => {
            let minex = new mine(ici, mineObject.x, mineObject.y);
            ici.mineContainer.add(minex);
            ici.physics.add.collider(minex, this.floor);

        });


        // ----------- ***** ----------- ON CREE NOS MONSTRES ---------*****-


        //   ---- PLACEMENT INTERACT/ MOV  ------


        //----------collisions---------------------


        this.floor.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, this.floor);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.mineContainer, this.floor);
        this.physics.add.collider(this.tonoContainer, this.floor);
        this.physics.add.collider(this.mechantContainer, this.floor);


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


        //--------------- Debug-----------------

        // ***-*-*-*-*-*-*- Z ORDER -*-*-*-*-*-*-*-*-

        let z = 1000; //niveau Z qui a chaque fois est décrémenté.

        //devant

        // this.tono.setDepth(z);
        // this.gun.setDepth(z);

        this.med.setDepth(z);
        // this.mine.setDepth(z);
        this.player.setDepth(z--);

        this.tonoContainer.setDepth(z);
        this.mineContainer.setDepth(z);
        this.mechantContainer.setDepth(z);

        this.platforms.setDepth(z);
        this.floor.setDepth(z--);

        this.background.setDepth(z--);

        this.sky2.setDepth(z--);
        this.sky.setDepth(z--);

        //derrière

        // ***-*-*-*-*-*-*- Z ORDER FIN -*-*-*-*-*-*-*-*-

        let sprite = this.add.sprite(400, 300, 'mechant').setInteractive();

        sprite.on('pointerdown', function (pointer) {

            this.setTint(0xff0000);

        });

        sprite.on('pointerout', function (pointer) {

            this.clearTint();

        });

        sprite.on('pointerup', function (pointer) {

            this.clearTint();

        });

    
    }
    


    update() {
        super.update();
        //le second plan se déplace moins vite pour accentuer l'effet
        this.sky.tilePositionX = this.cameras.main.scrollX * 0.1;
        this.sky.tilePositionY = this.cameras.main.scrollY * 0.05;

        this.sky2.tilePositionX = this.cameras.main.scrollX * 0.15;
        this.sky2.tilePositionY = this.cameras.main.scrollY * 0.1;

        // le fond se déplace moins vite que la caméra pour donner un effet paralax
        this.background.tilePositionX = this.cameras.main.scrollX * 0.2;
        this.background.tilePositionY = this.cameras.main.scrollY * 0.15;

        // this.moveParallax();

        //optimisation
        //teste si la caméra a bougé
        let actualPosition = JSON.stringify(this.cameras.main.worldView);
        if (!this.previousPosition || this.previousPosition !== actualPosition) {

            this.previousPosition = actualPosition;
            // this.optimizeDisplay();



        }



    
    }
}