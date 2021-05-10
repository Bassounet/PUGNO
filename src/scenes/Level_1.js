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


        this.load.image('sprite', 'ref/sprite.png');
        this.load.tilemapTiledJSON('map', 'TILED/end/VFX_24.json');
        this.load.image('back', 'assets/images/background.png');



    }

    



    create() {

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



        this.tono = this.map.createLayer('graphiques/tono', this.tileset, 0, 0);
        this.gun = this.map.createLayer('graphiques/gun', this.tileset, 0, 0);
        this.med = this.map.createLayer('graphiques/medikit', this.tileset, 0, 0);
        this.mine = this.map.createLayer('graphiques/mine', this.tileset, 0, 0);
        this.playerx = this.map.createLayer('graphiques/player', this.tileset, 0, 0);
        this.floor = this.map.createLayer('graphiques/floor', this.tileset, 0, 0);
        this.background = this.map.createLayer('graphiques/backgroundF', this.tileset, 0, 0);


        //   ---- PLACEMENT INTERACT/ MOV  ------



        // _*_*_*_*_*_*__* PLATFORMS *--*-*-*-*-

        this.platforms = this.physics.add.group();

        // créeons nos platform

        this.platforms.create(245, 194, 'plat');

        this.platforms.children.iterate(function (child) {
            child.setImmovable(true); // pour ne pas bouger quand il y a collision
            child.body.allowGravity=false; // on désactive l'effet de la gravité
            child.setCollideWorldBounds(false);
            child.setFriction(1); // pour que les éléments ne glissent sur cette plateforme
            child.setOrigin(0,0); // pour positionner plus facilement, repère en haut à gauche (descendant, vers la droite)
            child.setDisplaySize(103,7);
            //child.refreshBody();
        });



        // let profondeur_platform = 998;
        //
        // this.platform1 = new Platform(this, 244, 190, 'platform');
        // this.physics.add.collider(this.player, this.platform1);
        // this.platform1.setDepth(profondeur_platforme);
        //
        // this.platform2 = new Platform(this, 448, 114, 'platform');
        // this.physics.add.collider(this.player, this.platform2);
        // this.platform2.setDepth(profondeur_platforme);
        //
        // this.platform3 = new Platform(this, 1015, 335, 'platform');
        // this.physics.add.collider(this.player, this.platform3);
        // this.platform3.setDepth(profondeur_platforme);
        //
        // this.plat = new Platform(this,987,130, 'plat');
        // this.plat.setDepth(profondeur_platforme);



        // _*_*_*_*_*_*__* PLATFORMS *--*-*-*-*-*

        // ----------- ***** ---- ON CREE NOS MONSTRES ---*****---------


        this.objetcts_container=this.add.container();


        let ici = this;

        let mechantContainer = this.add.container();

        ici.mechantObjects = ici.map.getObjectLayer('objets/mechant')['objects'];

        ici.mechantObjects.forEach(monsterObject => {
            let mechant=new mechant1(this,monsterObject.x,monsterObject.y);
            this.objetcts_container.add(mechant);
            this.physics.add.collider(mechant, this.floor);

            // this.physics.add.collider(mechant, this.floor);

        });


        ici.tonoObjects = ici.map.getObjectLayer('objets/tono')['objects'];

        ici.tonoObjects.forEach(monsterObject => {
            let tono = new Tono(this,monsterObject.x,monsterObject.y);
            this.objetcts_container.add(tono);
            this.physics.add.collider(tono, this.floor);

            // this.physics.add.collider(tono, this.floor);
            // this.tab.push(tono);

        });

        // ----------- ***** ----------- ON CREE NOS MONSTRES ---------*****-


        //   ---- PLACEMENT INTERACT/ MOV  ------


        //----------collisions---------------------


        this.floor.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, this.floor);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.objetcts_container, this.floor);


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

        // this.tono.setDepth(z);
        // this.gun.setDepth(z);

        this.med.setDepth(z);
        this.mine.setDepth(z);
        this.player.setDepth(z--);
        this.objetcts_container.setDepth(z);
        this.platforms.setDepth(z);
        this.floor.setDepth(z--);
        this.background.setDepth(z--);

        // ***-*-*-*-*-*-*- Z ORDER -*-*-*-*-*-*-*-*-

    
    }
    


    update() {
        super.update();
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