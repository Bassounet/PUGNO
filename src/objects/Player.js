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
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        // this.anims.create({
        //     key: 'turn',
        //     // frames: [ { key: 'player', frame: 4 } ],
        //     // frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
        //     frameRate: 10
        // });

        this._directionX=0;
        this._directionY=0;




    }

    set directionX(value){
        this._directionX=value;
    }
    set directionY(value){
        this._directionY=value;
    }


    stop(){
        this.setVelocityY(0);
        this.directionY=0;
        this.directionX=0;
    }


        move(){
        switch (true) {
            case this._directionX < 0:
                this.sens = -1;
                this.setVelocityX(-420);
                this.anims.play('left', true);
                break;
            case this._directionX > 0:
                this.sens = 1;
                this.setVelocityX(420);
                this.anims.play('right', true);
                break;
            default:
                this.setVelocityX(0);


        }


        if(this._directionY<0){
            if(this.body.blocked.down || this.body.touching.down){
                this.setVelocityY(-650);
            }
        }
    }


    shoot(){

        this.target_groundex = Tableau.current.add.particles('tincelles');

        this.departx = this.x +15 ;
        this.departy = this.y ;

        this.emitter_target = this.target_groundex.createEmitter({
            x: this.departx,
            y: this.departy,
            speed: {min: 0, max: 200},
            radial: true,
            angle: {min: -1, max: -180},
            scale: {start: 1, end: 1},
            blendMode: 'NORMAL',
            active: true,
            lifespan: 300,
            gravityY: 1000,
            frequency: 100,
            quantity: 0.5,
            rotate: {min: 0, max: 360},

        });

        this.emitter_target.on = true;
        this.target_groundex.setDepth(1000);

        let me = this;

        this.departx = this.x ;
        this.departy = this.y ;

        var bullet = new Tir(this.scene,this.departx, this.departy);

        Tableau.current.cameras.main.shake(30, 0.01, true)

        setTimeout(function(){

            me.emitter_target.on = false;

            },50);

        setTimeout(function(){

            bullet.destroy();

            },600);


    }










}
