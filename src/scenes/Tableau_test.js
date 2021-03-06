class Tableau_test extends Tableau{




        preload() {
           
            super.preload();

            this.load.image('blood', 'assets/blood.png');
            this.load.image('medikit_1', 'assets/medikit_1.png');
            this.load.image('char', 'assets/char.png');
            this.load.image('tourelle', 'assets/tourelle.png');
            this.load.image('helico', 'assets/helico.png');
            this.load.image('MAP_2D', 'assets/MAP_2D.png');
            this.load.image('sol', 'assets/platformes_sol.png');
            this.load.image('mechant', 'assets/mechant.png');
            this.load.image('plat', 'assets/platform_.png');
            this.load.image('tono', 'assets/tono.png');

        }


        create() {

            super.create();           
    
            
            let largeurDuTableau=2000;
            let hauteurDuTableau=600;

            this.cameras.main.setBounds(0, 0, largeurDuTableau, game.config.height);
            this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);
            this.cameras.main.startFollow(this.player );
    
            //quelques étoiles et plat1s qui vont avec
            this.stars=this.physics.add.group();
            this.platforms=this.physics.add.staticGroup();
            this.tono=this.physics.add.staticGroup();



            
            // ----------------------** c'est le sol ça -------------------------------// 

            for(let i=0; i<4; i++){ 
            this.platforms.create(i*630,416,'sol');

            }
            // ----------------------** c'est le sol ça -------------------------------// 



            
             
            // ----------------------** PLATFORMES ** -------------------------------// 
            
            
            let posx_plat1 = 447;
            let posy_plat1 = 270;
            let plat1 = this.platforms.create(posx_plat1,posy_plat1,"plat");
            let h_plat1 = 15;
            let l_plat1 = 130;
           
            plat1.setDisplaySize( l_plat1, h_plat1);
            plat1.setBodySize(l_plat1,h_plat1);
            plat1.setOffset(135,10);

            let posx_plat2 = 620;
            let posy_plat2 = 205;
            let plat2 = this.platforms.create(posx_plat2,posy_plat2,"plat");
            let h_plat2 = 13;
            let l_plat2 = 100;
           
            plat2.setDisplaySize( l_plat2, h_plat2);
            plat2.setBodySize(l_plat2,h_plat2);
            plat2.setOffset(150,10);

            let posx_plat3 = 1186;
            let posy_plat3 = 250;
            let plat3 = this.platforms.create(posx_plat3,posy_plat3,"plat");
            let h_plat3 = 13;
            let l_plat3 = 163;
           
            plat3.setDisplaySize( l_plat3, h_plat3);
            plat3.setBodySize(l_plat3,h_plat3);
            plat3.setOffset(120,10);

            let posx_plat35 = 1186;
            let posy_plat35 = 150;
            let plat35 = this.platforms.create(posx_plat35,posy_plat35,"plat");
            let h_plat35 = 13;
            let l_plat35 = 163;
           
            plat35.setDisplaySize( l_plat35, h_plat35);
            plat35.setBodySize(l_plat35,h_plat35);
            plat35.setOffset(120,10);

            let posx_plat4 = 1352;
            let posy_plat4 = 300;
            let plat4 = this.platforms.create(posx_plat4,posy_plat4,"plat");
            let h_plat4 = 13;
            let l_plat4 = 140;
           
            plat4.setDisplaySize( l_plat4, h_plat4);
            plat4.setBodySize(l_plat4,h_plat4);
            plat4.setOffset(128,10);

            let posx_plat5 = 1654;
            let posy_plat5 = 250;
            let plat5 = this.platforms.create(posx_plat5,posy_plat5,"plat");
            let h_plat5 = 13;
            let l_plat5 = 140;
           
            plat5.setDisplaySize( l_plat5, h_plat5);
            plat5.setBodySize(l_plat5,h_plat5);
            plat5.setOffset(128,10);

            let posx_plat6 = 1900;
            let posy_plat6 = 115;
            let plat6 = this.platforms.create(posx_plat6,posy_plat6,"plat");
            let h_plat6 = 13;
            let l_plat6 = 190;
           
            plat6.setDisplaySize( l_plat6, h_plat6);
            plat6.setBodySize(l_plat6,h_plat6);
            plat6.setOffset(103,10);

            let posx_plat7 = 1900;
            let posy_plat7 = 250;
            let plat7 = this.platforms.create(posx_plat7,posy_plat7,"plat");
            let h_plat7 = 13;
            let l_plat7 = 190;
           
            plat7.setDisplaySize( l_plat7, h_plat7);
            plat7.setBodySize(l_plat7,h_plat7);
            plat7.setOffset(103,10);

            // ----------------------** PLATFORMES ** -------------------------------// 





            // ----------------------** SETTINGS_GENERAL ** -------------------------------// 


            this.physics.add.overlap(this.player, this.stars, this.found_piece, function(){ this.cameras.main.shake(50)}, this);
            this.physics.add.collider(this.player,this.platforms);
            this.physics.add.collider(this.player,this.tono);


            //on change de ciel, on fait une tileSprite ce qui permet d'avoir une image qui se répète
            this.sky=this.add.tileSprite( 0, 0, largeurDuTableau, game.config.height, 'MAP_2D' );
            this.sky.setOrigin(0,0);
            this.sky.setScrollFactor(0);//fait en sorte que le ciel ne suive pas la caméra

            //fait passer les éléments devant le ciel
            this.platforms.setDepth(10)
            this.stars.setDepth(10)
            this.player.setDepth(10)


            // ----------------------** SETTINGS_GENERAL ** -------------------------------//





            // ----------------------** ASSETS ** -------------------------------// 
            
    
            new Helicopter(this,1570,100);
            
            this.mechant1 = new mechant(this, 1880, 200);
            this.physics.add.collider(this.mechant1, this.platforms);

            this.tour1 = new Tourelle(this,1190,100);
            this.physics.add.collider(this.tour1, this.platforms);

            let l_tono1 = 35;
            let h_tono1 = 53;
            
            this.tono1 = this.physics.add.sprite(820,300,"tono");
            this.physics.add.collider(this.tono1, this.platforms);
            this.physics.add.overlap(this.player, this.tono1, this.hit_tono, null, this);
            this.tono1.setBodySize(l_tono1, h_tono1);
            this.tono1.setOffset(16,11);


            let lmed = 32
            let hmed = 25

            this.med1=this.physics.add.sprite(200,250,"medikit_1");
            this.physics.add.collider(this.med1, this.platforms);
            this.med1.setDisplaySize(lmed,hmed);
            this.physics.add.overlap(this.player, this.med1, this.found_piece, null, this);
            this.med1.setBounce(0.2);

            this.med2=this.physics.add.sprite(619,100,"medikit_1");
            this.physics.add.collider(this.med2, this.platforms);
            this.med2.setDisplaySize(lmed,hmed);
            this.physics.add.overlap(this.player, this.med2, this.found_piece, null, this);
            this.med2.setBounce(0.2);
            
            this.med3=this.physics.add.sprite(1000,100,"medikit_1");
            this.physics.add.collider(this.med3, this.platforms);
            this.med3.setDisplaySize(lmed,hmed);
            this.physics.add.overlap(this.player, this.med3, this.found_piece, null, this);
            this.med3.setBounce(0.2);

            this.med4=this.physics.add.sprite(1350,100,"medikit_1");
            this.physics.add.collider(this.med4, this.platforms);
            this.med4.setDisplaySize(lmed,hmed);
            this.physics.add.overlap(this.player, this.med4, this.found_piece, null, this);
            this.med4.setBounce(0.2);

            this.med5=this.physics.add.sprite(1900,100,"medikit_1");
            this.physics.add.collider(this.med5, this.platforms);
            this.med5.setDisplaySize(lmed,hmed);
            this.physics.add.overlap(this.player, this.med5, this.found_piece, null, this);
            this.med5.setBounce(0.2);



            // ----------------------** ASSETS ** -------------------------------// 

           
            
        }

        
    
        update(){
            super.update();
            //le ciel se déplace moins vite que la caméra pour donner un effet paralax
            this.sky.tilePositionX=this.cameras.main.scrollX;
            // this.sky.tilePositionY=this.cameras.main.scrollY;
        }
    
    
    
    
    
    

}
