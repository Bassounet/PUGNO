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
        // ------pour TILED-------------
        
        this.load.image('sprite', 'ref/sprite.png');

        this.load.tilemapTiledJSON('map', 'TILED/end/VFX_21.json');

        // -----et puis aussi-------------s

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



        //---- ajoute les plateformes simples ----------------------------



        this.tono = this.map.createLayer('graphiques/tono', this.tileset, 0, 0);
        this.gun = this.map.createLayer('graphiques/gun', this.tileset, 0, 0);
        this.med = this.map.createLayer('graphiques/medikit', this.tileset, 0, 0);
        this.mine = this.map.createLayer('graphiques/mine', this.tileset, 0, 0);

        // this.mechant = this.map.createLayer('graphiques/mechant', this.tileset, 0, 0);


        // this.platform = this.map.createLayer('graphiques/platform', this.tileset, 0, 0);
        this.playerx = this.map.createLayer('graphiques/player', this.tileset, 0, 0);
        this.floor = this.map.createLayer('graphiques/floor', this.tileset, 0, 0);

        this.background = this.map.createLayer('graphiques/backgroundF', this.tileset, 0, 0);

        // this.hole = this.map.createLayer('hole', this.tileset, 0, 0);


        //on définit les z à la fin
        let z = 1000; //niveau Z qui a chaque fois est décrémenté.

        this.tono.setDepth(z);
        this.gun.setDepth(z);
        this.med.setDepth(z);
        this.mine.setDepth(z);
        // this.mechant.setDepth(z);

        this.platform.setDepth(z--);
        this.player.setDepth(z--);


        this.floor.setDepth(z--);
        this.background.setDepth(z--);

        // _*_*_*_*_*_*__* PLATFORMS *--*-*-*-*-

        let profondeur_platforme = 998;

        this.platform1 = new Platform(this, 244, 190, 'platform');
        this.physics.add.collider(this.player, this.platform1);
        this.platform1.setDepth(profondeur_platforme);

        this.platform2 = new Platform(this, 448, 114, 'platform');
        this.physics.add.collider(this.player, this.platform2);
        this.platform2.setDepth(profondeur_platforme);

        this.platform3 = new Platform(this, 1015, 335, 'platform');
        this.physics.add.collider(this.player, this.platform3);
        this.platform3.setDepth(profondeur_platforme);

        // _*_*_*_*_*_*__* PLATFORMS *--*-*-*-*-*



        //----------collisions---------------------




        this.floor.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, this.floor);




        // this.physics.add.collider(this.stars, this.solides);
        // //si le joueur touche une étoile dans le groupe...
        // this.physics.add.overlap(this.player, this.stars, this.found_piece, null, this);
        // //quand on touche la lave, on meurt
        // this.physics.add.collider(this.player, this.lave, this.playerDie, null, this);






        // ----------- ***** ----------- ON CREE NOS MONSTRES ---------*****---------


        // let ici = this;
        //
        //
        // // let helicoContainer = this.add.container();
        //
        // // ici.helicoObjects = ici.map.getObjectLayer('drone')['objects'];
        //
        // // ici.helicoObjects.forEach(monsterObject => {
        // //     // ici.create(this,monsterObject.x,monsterObject.y,monsterObject.y)
        // //     let helico=new Helicopter(this,monsterObject.x,monsterObject.y);
        // //     helicoContainer.add(helico);
        // //     this.physics.add.collider(helico, this.platform); // pas besoin de collide avec les platformes c un helico
        //
        // // });
        //

        let ici = this;

        let mechantContainer = this.add.container();

        ici.mechantObjects = ici.map.getObjectLayer('objets/mechant')['objects'];

        ici.mechantObjects.forEach(monsterObject => {
            let mechant=new mechant1(this,monsterObject.x,monsterObject.y);
            mechantContainer.add(mechant);
            this.physics.add.collider(mechant, this.floor);

        });

        // this.mechant.setDepth(1000);

        let platform_container = this.add.container();

        ici.platform_container = ici.map.getObjectLayer('objets/_platform_')['objects'];

        ici.mechantObjects.forEach(monsterObject => {
            let platform_=new Platform(this,monsterObject.x,monsterObject.y);
            mechantContainer.add(platform_);
            this.physics.add.collider(platform_, this.player);



        });
        //
        //
        // let tourelleContainer = this.add.container();
        //
        // ici.tourelleObjects = ici.map.getObjectLayer('tourelles')['objects'];
        //
        // ici.tourelleObjects.forEach(monsterObject => {
        //     let tourelle=new Tourelle(this,monsterObject.x,monsterObject.y-100);
        //     tourelleContainer.add(tourelle);
        //     this.physics.add.collider(tourelle, this.platform);
        //
        // });
        //
        // let droneContainer = this.add.container();
        //
        // ici.droneObjects = ici.map.getObjectLayer('drone')['objects'];
        //
        // ici.droneObjects.forEach(monsterObject => {
        //     let drone=new Drone(this,monsterObject.x,monsterObject.y);
        //     droneContainer.add(drone);
        //     this.physics.add.collider(drone, this.platform);
        //
        // });

        // let mineContainer = this.add.container();
        //
        // ici.mineObjects = ici.map.getObjectLayer('mine')['objects'];
        //
        // ici.mineObjects.forEach(monsterObject => {
        //     let mine=new mine(this,monsterObject.x,monsterObject.y);
        //     mineContainer.add(mine);
        //     this.physics.add.collider(mine, this.platform);
        //
        // });


        // this.tab = [];
        let tonoContainer = this.add.container();

        ici.tonoObjects = ici.map.getObjectLayer('objets/tono')['objects'];

        ici.tonoObjects.forEach(monsterObject => {
            let tono = new Tono(this,monsterObject.x,monsterObject.y);
            tonoContainer.add(tono);
            this.physics.add.collider(tono, this.floor);
            // this.tab.push(tono);

        });

        // this.tab.setDepth(1000);

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



        //---------- parallax ciel (rien de nouveau) -------------

        //on change de ciel, on fait une tileSprite ce qui permet d'avoir une image qui se répète
        // this.back = this.add.tileSprite(
        //     0,
        //     0,
        //     this.sys.canvas.width,
        //     this.sys.canvas.height,
        //     'MAP_2D'
        // );
        // this.map2 = this.add.tileSprite(
        //     0,
        //     0,
        //     this.sys.canvas.width,
        //     this.sys.canvas.height,
        //     'MAP_2D'
        // );
        // this.back.setOrigin(0, 0);
        // this.map2.setOrigin(0, 0);
        // this.back.setScrollFactor(0);//fait en sorte que le ciel ne suive pas la caméra
        // this.map2.setScrollFactor(0);//fait en sorte que le ciel ne suive pas la caméra
        // this.map2.blendMode = Phaser.BlendModes.ADD;




        // moveParallax() {
        //     //le ciel se déplace moins vite que la caméra pour donner un effet paralax
        //     this.sky.tilePositionX = this.cameras.main.scrollX * 0.6;
        //     this.sky.tilePositionY = this.cameras.main.scrollY * 0.6;
        //     this.sky2.tilePositionX = this.cameras.main.scrollX * 0.7 + 100;
        //     this.sky2.tilePositionY = this.cameras.main.scrollY * 0.7 + 100;
        // }
        // for mouse click

    
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