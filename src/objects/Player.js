class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "player")
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setBounce(0);
        this.setGravityY(600)
        this.setFriction(1,1);


        this.setBodySize(this.body.width-30,this.body.height-10);
        this.setOffset(13, 10);
        this.sens = 1;


        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            // frames: [ { key: 'player', frame: 4 } ],
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
            frameRate: 10
        });

        this._directionX=0;
        this._directionY=0;


    }

    set directionX(value){
        this._directionX=value;
    }
    set directionY(value){
        this._directionY=value;
    }

    /**
     * arrête le joueur
     */
    stop(){
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
                this.sens=-1;
                this.setVelocityX(-600);
                this.anims.play('left', true);
                break;
            case this._directionX>0:
                this.sens=1;
                this.setVelocityX(600);
                this.anims.play('right', true);
                break;
            default:
                this.setVelocityX(0);
            // this.anims.play('stance', true);
            //this.anims.play(this.sens===-1 ? 'back' : 'stance' ,true); //équivalent d'un if, pour mémoriser la position du personnage pour qu'il regarde à gauche ou à droite en fonction du dernier déplacement effectué
        }
        /*switch (true){
            case this._directionX<0:
                this.setVelocityX(-300);
                this.anims.play('left', true);
                break;
            case this._directionX>0:

                this.setVelocityX(300);
                this.anims.play('right', true);
                break;
            default:
                this.setVelocityX(0);
                this.anims.play('turn', true);
        }*/

        if(this._directionY<0){
            if(this.body.blocked.down || this.body.touching.down){
                this.setVelocityY(-650); // vitesse en montée 
            }
        }

    }

    shooter ()
    {
        this.input.on('pointerdown', function (pointer) {

            console.log( 'down B');
            }, this);
    }


    shoot(){
        var bullet = new Tir(this.scene,this.x, this.y);
        console.log("Tir");
        setTimeout(function(){
            bullet.destroy();
            },1500);

    }









}
