class Player extends Phaser.Physics.Arcade.Sprite{ // on l'associe au sprite de phaser physique arcade sprite 
    constructor(scene, x, y) {
        super(scene, x, y, "player") // c'est quoi cette merde de super ? ?
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setCollideWorldBounds(true) // on paramètre les rebonds 
        this.setBounce(0.3); // effet du rebond 
        this.setGravityY(700) // l'effet de la gravité 
        this.setFriction(1,1); //jvois pas trop ce que c'est j'essaye mais ça change rien :/ 


        this.setBodySize(this.body.width-6,this.body.height-10); // on règle sa taille ... celle du player avec le this. 
        this.setOffset(3, 10); // jsp vraiment 

        this.anims.create({ // gestion de l'anim de déplacement vers la gauche 
            key: 'left', // utilisation de la partie gacuhe 
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }), // on utilise la generation de frame et on choisit celle de 0 à 3 pour le déplacement vers la gauche 
            frameRate: 20, // nombre de frame ( fréquence )
            repeat: -1 // pourquoi 
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'player', frame: 4 } ],
            frameRate: 20
        });

        this._directionX=0; // position de base quand il apparaît ... 
        this._directionY=0;


    }

    set directionX(value){ // jsp vraiment .. 
        this._directionX=value;
    }
    set directionY(value){
        this._directionY=value;
    }

    /**
     * arrête le joueur
     */
    stop(){ // on crée la focntion pour arrêter le joueur 
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.directionY=0;
        this.directionX=0;
    }

    /**
     * Déplace le joueur en fonction des directions données
     */
    move(){

        switch (true){
            case this._directionX<0:
                this.setVelocityX(160); // réglage de la vitesse en X vers la gauche 
                this.setVelocityX(-160);
                this.anims.play('left', true);
                break;
            case this._directionX>0:

                this.setVelocityX(160); // réglage de la vitesse en X vers la droite
                this.anims.play('right', true);
                break;
            default:
                this.setVelocityX(0); // je comprend pas vraiment 
                this.anims.play('turn');
        }

        if(this._directionY<0){
            if(this.body.blocked.down || this.body.touching.down){ // wtffffffffffffffffffffffff
                this.setVelocityY(-550); // vitesse en montée 
            }
        }

    }

}
