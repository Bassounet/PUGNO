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
        this.load.image('particlesg', 'assets/particles/particle1.png');


    }
    create (){
        console.log("create Ui")

        this.score=0;


        this.moleui = this.add.image(50, 53 , 'moleu_');

        this._scoreText = this.add.text(36, 36, '...', {
            font:'32px "Yoster"',
            fill: '#fff'
        });
        


        this.scene.bringToTop();
        this.scene.launch(this.game.scene.scenes[0].scene.key);


        let me=this;
        setTimeout(function(){
            me.tableau="Hello World";
            me.gagne(0)
        },100)



        this.pad=new GamePad(this,0,0);
        this.pad.x=this.sys.canvas.width-this.pad.size-60;
        this.pad.y=this.sys.canvas.height-this.pad.size-60;

        // *è*_*_*_*_*_*_*_* full screen


        this.btFs=this.add.image(0,0,'ui/full-screen-icon');
        this.btFs.setInteractive();
        this.btFs.on('pointerup', function () {

            if (this.scale.isFullscreen){
                this.scale.stopFullscreen();
            }else{
                this.scale.startFullscreen();
            }

        }, this);
        this.btFs.setOrigin(1,1)
        this.btFs.setDisplaySize(48,48)
        this.btFs.x=this.sys.canvas.width;
        this.btFs.y=this.sys.canvas.height;

        // *_*_*_*_*_*_*_*_* full screen end

        this.playok = false;

        // *_*_*_*_*_*_*_*_* bouton tir


        this.boutonshoot = this.add.image(60,300, 'bouton_tir');
        this.boutonshoot.setInteractive();
        this.boutonshoot.on('pointerdown', function () {

            Tableau.current.player.shoot();
            Tableau.current.sound.play('gunshot', {volume:0.2});
        })

    }

    gagne(points=1)
    {
        this.score+=points;
        this._scoreText.setText('     x  ' + this.score);

    }

    update(){


        if(this.playok)
        {
            this.pad.visible = true;
            this._scoreText.visible = true;
            this.moleui.visible = true ;
            this.boutonshoot.visible = true ;
            this.btFs.visible = true ;
            this._tableauText= true;

        }else {

            this.pad.visible = false;
            this._scoreText.visible = false;
            this.moleui.visible = false ;
            this.boutonshoot.visible = false;
            this.btFs.visible = false ;
            this._tableauText= false ;

        }
    }
}
