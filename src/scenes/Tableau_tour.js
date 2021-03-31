class Tableau_tour extends Tableau{




        preload() {
           
            super.preload();

            this.load.image('tourelleV2', 'assets/tourelleV2.png');

            

        }


        create() {

            

            super.create();           
    
            
            let largeurDuTableau=896
            let hauteurDuTableau=448;

            this.cameras.main.setBounds(0, 0, largeurDuTableau, game.config.height);
            this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);
            this.cameras.main.startFollow(this.player );
    
            //quelques étoiles et plat1s qui vont avec
            this.stars=this.physics.add.group();
            this.platforms=this.physics.add.staticGroup();
            this.tono=this.physics.add.staticGroup();

            let tour1 = new Tourelle(this,500,300);
            
            



            
            // ----------------------** c'est le sol ça -------------------------------// 

            

            
            // ----------------------** c'est le sol ça -------------------------------// 



            
             
            // ----------------------** PLATFORMES ** -------------------------------// 
            
            
            

            // ----------------------** PLATFORMES ** -------------------------------// 





            // ----------------------** SETTINGS_GENERAL ** -------------------------------// 


            // this.physics.add.overlap(this.player, this.stars, this.found_piece, function(){ this.cameras.main.shake(50)}, this);
            // this.physics.add.collider(this.player,this.platforms);
            // this.physics.add.collider(this.player,this.tono);


            //on change de ciel, on fait une tileSprite ce qui permet d'avoir une image qui se répète
            // this.sky=this.add.tileSprite( 0, 0, largeurDuTableau, game.config.height, 'MAP_2D' );
            // this.sky.setOrigin(0,0);
            // this.sky.setScrollFactor(0);//fait en sorte que le ciel ne suive pas la caméra




            // ----------------------** SETTINGS_GENERAL ** -------------------------------//





            // ----------------------** ASSETS ** -------------------------------// 
            
    
            


            // ----------------------** ASSETS ** -------------------------------// 

           
            
        }

        
    
        update(){
            super.update();
            //le ciel se déplace moins vite que la caméra pour donner un effet paralax
            this.sky.tilePositionX=this.cameras.main.scrollX;
            // this.sky.tilePositionY=this.cameras.main.scrollY;


            // ptite rota de la tourelle qui plus tard tirera ;) 

            
            
        }
    
    
    
    
    
    

}
