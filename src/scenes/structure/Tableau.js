/**
 * Toutes les fonctions propres à un tableau dans notre jeu.
 * Cette classe n'est pas à utiliser directement, elle doit être extend !
 */
class Tableau extends Phaser.Scene{
    /**
     *
     * @param {String} key identifiant de la scène à jouer
     */
    constructor(key) {
        super(key);
    }

   
    preload(){
        this.load.image('sky', 'assets/sky.png');
        this.load.image('spike', 'assets/spike.png');
        this.load.spritesheet('player','assets/player1.png',
            { frameWidth: 61, frameHeight: 64  }
        );
    }


    create(){
        Tableau.current=this; // je comprend pas trop là ... 
        this.sys.scene.scale.lockOrientation("landscape")
        console.log("Mais où sommes-nous ?"+this.constructor.name+" / "+this.scene.key);
        /**
         * Le ciel en fond
         * @type {Phaser.GameObjects.Image}
         */
        this.sky=this.add.image(0, 0, 'sky').setOrigin(0,0); // position de l'image ... 
        this.sky.displayWidth=14*64;
        this.sky.setScrollFactor(0,0); // WTF ??? 
        /**
         * Le joueur
         * @type {Player}
         */
        this.player=new Player(this,0,0);

        this.blood=this.add.sprite(this.sys.canvas.width/2,this.sys.canvas.height/2,"blood")
        this.blood.displayWidth=64;
        this.blood.displayHeight=64;
        this.blood.visible=false; // wtf ??? >> apparition du sang middle screen ..; wtf

    }
    
    update(){
        super.update();
        this.player.move();
        
    }
/**
     *
     * @param {Sprite} object Objet qui saigne
     * @param {function} onComplete Fonction à appeler quand l'anim est finie
     */
    saigne(object,onComplete){
        let me=this; // pk le m. devant ? à kécaserre ?
        me.blood.visible=true;
        me.blood.rotation = Phaser.Math.Between(0,21);
        me.blood.x=object.x;
        me.blood.y=object.y;
        me.tweens.add({
            targets:me.blood,
            duration:500, // temps en ms ... 
            displayHeight:{ // permet de distorde l'image et donc de donner l'effetd e la gerbe de sang ... 
                from:10,
                to:100,
            },
            displayWidth:{
                from:10,
                to:100,
            },
            onComplete: function () {
                me.blood.visible=false; // fait disparaître le sang quand l'objet est mort donc apres le nb de s requis ??? 
                onComplete();
            }
        })
    }

    found_piece (player, medikit_1) // on crée la fonction qui s'active quand on apelle le ramassage d'étoile dans les éléments plus bas ... 
    {

        medikit_1.disableBody(true, true);
 
        ui.gagne();
        //va lister tous les objets de la scène pour trouver les étoies et vérifier si elles sont actives
        let totalActive=0;
        for(let child of this.children.getChildren()){ // WTF ?????
            if(child.texture && child.texture.key==="medikit_1"){
                if(child.active){
                    totalActive++;
                }
            }
        }
        if(totalActive===0){ // quand toutes les étoiles ont été récup on apelle win , 
            this.win(); 
        }
        /*
        // this.stars est un groupe (plus tard)
        if (this.stars.countActive(true) === 0)
        {
           this.win();
        }
         */
    }

    /**
     * Aïeee ça fait mal
     * @param player
     * @param spike
     */
    hit_tono (player, spike) // je ne compwend pas ...
    {
        this.physics.pause();
        player.setTint(0xff0000); 
        player.anims.play('turn');
        this.scene.restart(); 

    }
  /**
     * Quand on touche un monstre
     * si on le touche par en haut on le tue, sinon c'est lui qui nous tue
     * @param {Player} player
     * @param {Phaser.Physics.Arcade.Sprite} monster // enfait on attribue à nos différents éléments les règles qu'on veut leur donner ... 
     * 
     */
    hitMonster(player, monster){ // voilà parametrage des  acteurs de la fonction ... 
        let me=this;
        if(monster.isDead !== true){ //si notre monstre n'est pas déjà mort
            if(
                // si le player descend
                player.body.velocity.y > 0
                // et si le bas du player est plus haut que le monstre
                && player.getBounds().bottom < monster.getBounds().top+30 // ♥ && est un "et" 

            ){
                ui.gagne(); // je comprend pas vrmt là ... 
                monster.isDead=true; //ok le monstre est mort
                monster.visible=false;
                this.saigne(monster,function(){
                    //à la fin de la petite anim...ben il se passe rien :)
                })
                //notre joueur rebondit sur le monstre
                player.directionY=500;
            }else{
                //le joueur est mort
                if(!me.player.isDead){ // wtf le point d'interrogation ... 
                    me.player.isDead=true;
                    me.player.visible=false;
                    //ça saigne...
                    me.saigne(me.player,function(){
                        //à la fin de la petite anim, on relance le jeu
                        me.blood.visible=false;
                        me.player.anims.play('turn');
                        me.player.isDead=false;
                        me.scene.restart();
                    })

                }


            }
        }

    }
        



    
    /**
     * Pour reset cette scène proprement
     * @private
     */
    _destroy(){
        this.player.stop();
        this.scene.stop();
    }

    /**
     * Quand on a gagné
     */
    win(){
        Tableau.suivant();
    }

     //shake(){ /: on va créer une camera shake mais pas pour le moment on se concentre sur le rendu de lundi ;)

    /**
     * Va au tableau suivant
     */
    static suivant(){ // wtf static ? 
        let ceSeraLaSuivante=false; // je comprend pas vraiment l'intérêt du let ... je sais pas trop ce que c'est ... 
        let nextScene=null;
        if(Tableau.current){
            for(let sc of game.scene.scenes){ // ok à partir de là je comprend plus rien ... 
                if(sc.scene.key !== "ui"){
                    if(!nextScene){
                        if(ceSeraLaSuivante){
                            nextScene=sc;
                        }
                        if(sc.scene.key === Tableau.current.scene.key){
                            ceSeraLaSuivante=true;
                        }
                    }
                }
            }
        }
        if(!nextScene){
            nextScene = game.scene.scenes[0];
        }
        Tableau.goTableau(nextScene);
    }

    static goTableau(tableau){
        if(Tableau.current){
            Tableau.current._destroy();
        }
        game.scene.start(tableau);
    }


}

/**
 * Le tableau en cours
 * @type {null|Tableau} // je comprend toujours rien ... 
 */
Tableau.current=null;