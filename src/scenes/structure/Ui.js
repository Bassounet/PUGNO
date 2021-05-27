class Ui extends Phaser.Scene{
    constructor ()
    {
        super({ key: 'ui', active: true });
        window.ui=this;
    }
    preload(){
        this.load.image('ui/full-screen-icon', 'assets/ui/full-screen.png');
        this.load.image('bouton_tir', 'assets/ui/fire_button2.png');
        this.load.image('moleu_', 'assets/moleu.png');
    }
    create (){
        console.log("create Ui")

        this.score=0;

        this.moleui = this.add.image(50, 53 , 'moleu_');

        this._scoreText = this.add.text(36, 36, '...', {
            font:'32px "Yoster"',
            fill: '#fff'
        });


        this._tableauText = this.add.text(this.sys.canvas.width-16, 16, '...', {
            font:'32px "Yoster"',
            align: 'right',
            fill: '#fff'
        })


        this._tableauTextClass = this.add.text(this.sys.canvas.width-16, 16+32, '...', {
            font:'24px "Yoster"',
            align: 'right',
            fill: '#fff',
        }).setAlpha(0.5)

        this._tableauText.originX=1;
        this._tableauTextClass.originX=1;

        this._tableauText.setInteractive();
        this._tableauText.on('pointerdown', function () {
            Tableau.suivant();
        })


        this.scene.bringToTop();
        this.scene.launch(this.game.scene.scenes[0].scene.key);


        let me=this;
        setTimeout(function(){
            me.tableau="Hello World";
            me.gagne(0)
        },100)



        let pad=new GamePad(this,0,0);
        pad.x=this.sys.canvas.width-pad.size-60;
        pad.y=this.sys.canvas.height-pad.size-60;

        // *è*_*_*_*_*_*_*_* full screen


        let btFs=this.add.image(0,0,'ui/full-screen-icon');
        btFs.setInteractive();
        btFs.on('pointerup', function () {

            if (this.scale.isFullscreen){
                this.scale.stopFullscreen();
            }else{
                this.scale.startFullscreen();
            }

        }, this);
        btFs.setOrigin(1,1)
        btFs.setDisplaySize(48,48)
        btFs.x=this.sys.canvas.width;
        btFs.y=this.sys.canvas.height;

        // *_*_*_*_*_*_*_*_* full screen end

        // *_*_*_*_*_*_*_*_* bouton tir


        this.boutonshoot = this.add.image(60,300, 'bouton_tir');
        this.boutonshoot.setInteractive();
        this.boutonshoot.on('pointerdown', function () {

            Tableau.current.player.shoot();
            Tableau.current.sound.play('fire', {volume: 3});


        })

        var emitter0 = this.add.particles('bouton_tir').createEmitter({
            x: 50,
            y: 53,
            speed: { min: -800, max: 800 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.5, end: 0 },
            blendMode: 'SCREEN',
            active: true,
            lifespan: 600,
            gravityY: 800
        });

        // emitter0.explode();




    }

    gagne(points=1)
    {
        this.score+=points;
        this._scoreText.setText('     x  ' + this.score);

    }
    update(){
        if(Tableau.current){
            this._tableauText.setText(Tableau.current.scene.key);
            this._tableauTextClass.setText(Tableau.current.constructor.name);
        }
    }
}
