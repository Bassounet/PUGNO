class Ui extends Phaser.Scene{
    constructor ()
    {
        super({ key: 'ui', active: true }); // je comprend pas cette connerie de super c'est quoi ??? 
        window.ui=this; // est ce que l'ui correspond au tableau ui ??? mais non c'est un dosseier des asstes mdr j'avaias pas vu ok c bon .
    }
    preload(){
        this.load.image('ui/full-screen-icon', 'assets/ui/full-screen.png');
    }
    create (){
        console.log("create Ui") // on écrit qu'on crée l'UI

        this.score=0; // on donne 0 au score ... 
        /**
         * Le champ texte du score
         * @type {Phaser.GameObjects.Text}
         * @private
         */
        this._scoreText = this.add.text(16, 16, '...', { // on donne la position du texte ...
            font:'32px "Hanalei Fill"',
            fill: '#fff' // on donne la taille et la couleur ... 
        });

        /**
         * Le champ texte avec la clé du tableau
         * @type {Phaser.GameObjects.Text}
         * @private
         */
        this._tableauText = this.add.text(this.sys.canvas.width-16, 16, '...', {
            font:'32px "Hanalei Fill"',
            align: 'right',
            fill: '#fff'
        })

        /**
         * Le champ texte avec la classe du tableau
         * @type {Phaser.GameObjects.Text}
         * @private
         */
        this._tableauTextClass = this.add.text(this.sys.canvas.width-16, 16+32, '...', {
            font:'24px "Hanalei Fill"',
            align: 'right',
            fill: '#fff',
        }).setAlpha(0.5)

        this._tableauText.originX=1; // on attribue encore la position du texte 
        this._tableauTextClass.originX=1; // pareil 

        this._tableauText.setInteractive(); // ç aje compren pas vrmt ... 
        this._tableauText.on('pointerdown', function () { // si on clique sur les texte ça nous fait passer au tableau suivant ... pointeur down ; ) 
            Tableau.suivant();
        })

        //met l'ui au dessus du tableau
        this.scene.bringToTop();
        //lance le tableau
        this.scene.launch(this.game.scene.scenes[0].scene.key); // choix du lancement de tableau ... 


        let me=this;
        setTimeout(function(){
            me.tableau="Hello World";
            me.gagne(0) // là je comprend pas vraiment ...
        },100)



        let pad=new GamePad(this,0,0); // apparition du joystick de jeu mais ces ptn de réglages je comprend pas vrmt ... 
        pad.x=this.sys.canvas.width-pad.size-60; // positionnement du joystick de jeu 
        pad.y=this.sys.canvas.height-pad.size-60;



        let btFs=this.add.image(0,0,'ui/full-screen-icon'); // t'as capté
        btFs.setInteractive(); // là on le rend interactif ... 
        btFs.on('pointerup', function () { // différence entre pointer up et down ??? 

            if (this.scale.isFullscreen){
                this.scale.stopFullscreen(); // on crée la fonction qui nous permet de le rendre full screen après le click ... 
            }else{
                this.scale.startFullscreen();
            }

        }, this);
        btFs.setOrigin(1,1)
        btFs.setDisplaySize(48,48)
        btFs.x=this.sys.canvas.width;
        btFs.y=this.sys.canvas.height; // on le positionne ...


        // svar camera = this.cameras.main;

    }

    gagne(points=10) // combien de points on remporte par étoiles attrapées ... 
    {
        this.score+=points;
        this._scoreText.setText('Score: ' + this.score); // on ajoute directement le score
        
        //this.camera.shake(1000,1000,10,1,1);   // création d'un caméra shaker  mais ça marche pas des masses 
        //console.log( 'la putian de camera fonctionne ');// camera.shake(duration, intensity, force, callback, context);  // callback: invoked when completed 

    }
    update(){
        if(Tableau.current){
            this._tableauText.setText(Tableau.current.scene.key);
            this._tableauTextClass.setText(Tableau.current.constructor.name); // je comprend pas vrmt là ...
        }
    }
}
