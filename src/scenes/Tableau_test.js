class Tableau_test extends Tableau{



    /*preload() {
        super.preload();
        this.load.image('blood', 'assets/blood.png');
        this.load.image('medikit_1', 'assets/medikit_1.png');
        this.load.image('char', 'assets/char.png');
        this.load.image('personnage', 'assets/personnage.png');
        this.load.image('bato', 'assets/bato.png');
        this.load.image('tourelle', 'assets/tourelle.png');
        this.load.image('helico', 'assets/helico.png');

    }



    create() {
        super.create(); 

        
        let largeurDuTableau=4000;
        let hauteurDuTableau=600; //la hauteur est identique au cadre du jeu
        //this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);

        this.cameras.main.startFollow(this.player, false, 0.05, 0.05);

    }

    update(){
        super.update();
        
    }*/


        preload() {
            super.preload();

            this.load.image('blood', 'assets/blood.png');
            this.load.image('medikit_1', 'assets/medikit_1.png');
            this.load.image('char', 'assets/char.png');
            this.load.image('personnage', 'assets/personnage.png');
            this.load.image('bato', 'assets/bato.png');
            this.load.image('tourelle', 'assets/tourelle.png');
            this.load.image('helico', 'assets/helico.png');
            this.load.image('star', 'assets/star.png');
            this.load.image('ground', 'assets/platform.png');
            this.load.image('MAP_2D', 'assets/MAP_2D.png');
            this.load.image('plateforme_du_sol', 'assets/platformes_sol.png');
            this.load.image('mechant', 'assets/mechant.png');

        }


        create() {

            super.create();

            
    
            //on définit la taille du tableau
            let largeurDuTableau=2000;
            let hauteurDuTableau=600; //la hauteur est identique au cadre du jeu
            this.cameras.main.setBounds(0, 0, largeurDuTableau, game.config.height);
            this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);
    
            this.cameras.main.startFollow(this.player );
    
            //quelques étoiles et plateformes qui vont avec
            this.stars=this.physics.add.group();
            this.platforms=this.physics.add.staticGroup();
            
            
            for(let i=0; i<4; i++){
            this.platforms.create(i*630,417,'plateforme_du_sol');

            }

            this.physics.add.overlap(this.player, this.stars, this.found_piece, function(){ this.cameras.main.shake(50)}, this);
            this.physics.add.collider(this.player,this.platforms);

            
    
    
            //on change de ciel, on fait une tileSprite ce qui permet d'avoir une image qui se répète
            this.sky=this.add.tileSprite(
                0,
                0, // on la descend un peu pour pas voir le truc moche en bas
                largeurDuTableau, // le background sera égal à la largeur de notre tableau ... 
                game.config.height,
                'MAP_2D'
            );
            this.sky.setOrigin(0,0);
            this.sky.setScrollFactor(0);//fait en sorte que le ciel ne suive pas la caméra

            //fait passer les éléments devant le ciel
            this.platforms.setDepth(10)
            this.stars.setDepth(10)
            this.player.setDepth(10)

            // on pose nos assets
    
            new Helicopter(this,400,100);
            this.char1 = new Char(this,100, 100);
            this.physics.add.collider(this.char1, this.platforms);
            this.tour1 = new Tourelle(this,400,100);
            this.physics.add.collider(this.tour1, this.platforms);
            this.mechant1 = new mechant(this, 300, 200);
            this.physics.add.collider(this.mechant1, this.platforms);


            
        }

        
    
        update(){
            super.update();
            //le ciel se déplace moins vite que la caméra pour donner un effet paralax
            this.sky.tilePositionX=this.cameras.main.scrollX;
            // this.sky.tilePositionY=this.cameras.main.scrollY;
           
        }
    
    
    
    
    
    

}
