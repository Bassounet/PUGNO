class Tableau_Zoo extends Tableau{

    preload() {
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
        //quelques étoiles
        let largeur=64*2;
        this.stars=this.physics.add.group();
        for(let posX=largeur/2;posX<largeur*7;posX+=largeur){
            this.stars.create(posX ,0,"medikit_1");
         
        }
     
        this.stars.children.iterate(function (child) {
            child.setBounce(1);
            child.setGravity(1);
            child.setDisplaySize(35,30);
            child.setCollideWorldBounds(true);
            child.setVelocity( 0,Phaser.Math.Between(-100, 100));
            child.setMaxVelocity(0,500);
        });
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);

        /*le charerino
        this.monstre=this.physics.add.sprite(300,this.sys.canvas.height-25,"char");
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(65,65);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(1);
        this.monstre.setVelocityX(50);
        this.physics.add.overlap(this.player, this.monstre, this.hitMonster, null, this);
        */ 


        // le soldat v_1 un peu pourrie 
        this.monstre=this.physics.add.sprite(300,this.sys.canvas.height-25,"personnage");
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(45,65);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(1);
        this.monstre.setVelocityX(180);
        this.physics.add.overlap(this.player, this.monstre, this.hitMonster, null, this);


        // le batooooooooo 
        this.monstre=this.physics.add.sprite(300,this.sys.canvas.height-10,"bato");
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(90,90);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(1);
        this.monstre.setVelocityX(20);
        this.physics.add.overlap(this.player, this.monstre, this.hitMonster, null, this);

        // la tourelle non mobile
        this.monstre=this.physics.add.sprite(300,this.sys.canvas.height-150,"tourelle");
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(90,65);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(0);
        this.monstre.setVelocityX(0);
        this.physics.add.overlap(this.player, this.monstre, this.hitMonster, null, this);

        
        new Helicopter(this,400,100);
        new Char(this,100, 100);
        
        
        
        
        /*// l'helicoherino
        this.monstre=this.physics.add.sprite(150,this.sys.canvas.height-150,"helico");
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(120,80);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(0);
        this.monstre.setVelocityX(0);
        this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);
        */
        



    }

}

