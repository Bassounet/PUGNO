
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
        // this.load.image('spike', 'assets/spike.png');
        this.load.spritesheet('player','assets/player2.png',
            { frameWidth: 61, frameHeight: 64  }
        );
        this.load.audio('moleu', 'son/collect.wav');
        this.load.audio('die', 'son/die.wav');
        this.load.audio('talkie', 'son/talkie.wav');
        this.load.audio('jump', 'son/jump.wav');
        this.load.audio('explosion', 'son/explo.wav');
        this.load.audio('fire', 'son/fire.wav');
        this.load.audio('amb', 'son/ambiance.wav');

    }


    create(){
        Tableau.current=this;
        this.sys.scene.scale.lockOrientation("landscape")
        console.log("Mais où sommes-nous ?"+this.constructor.name+" / "+this.scene.key);


        this.player=new Player(this,67,250);

        this.blood=this.add.sprite(this.sys.canvas.width/2,this.sys.canvas.height/2,"blood")
        this.blood.displayWidth=64;
        this.blood.displayHeight=64;
        this.blood.visible=false;

        this.boutonTir = this.input.keyboard.addKey('A');

        this.sound.add('moleu');
        this.sound.add('die');
        this.sound.add('talkie');
        this.sound.add('jump');
        this.sound.add('explosion');
        this.sound.add('fire');
        this.musicamb = this.sound.add('amb');

    }

    update(){
        super.update();
        this.player.move();
        this.tirPlayer();
    }

    tirPlayer(){
        if (Phaser.Input.Keyboard.JustDown(this.boutonTir)){
            this.player.shoot();
            this.sound.play('fire', {volume: 3});

        }
    }

    saigne(object,onComplete){
        let me=this;
        me.blood.visible=true;
        //me.blood.setDepth(10);
        me.blood.rotation = Phaser.Math.Between(0,21);
        me.blood.x=object.x;
        me.blood.y=object.y;
        me.tweens.add({
            targets:me.blood,

            duration:500,
            displayHeight:{
                from:10,
                to:100,
            },
            displayWidth:{
                from:10,
                to:100,
            },
            onComplete: function () {
                me.blood.visible=false;
                onComplete();
            }
        })
    }


    hitTono (player, tono)
    {
        let me=this;
        if(tono.isDead !== true){
            if(

                player.body.velocity.y > 0

                && player.getBounds().bottom < tono.getBounds().top+30

            ){

                tono.isDead=true;
                tono.visible=false;

                this.sound.play('explosion', {volume : 2 });

                this.saigne(tono,function(){

                })

                player.directionY=500;
            }else{

                if(!me.player.isDead){
                    this.musicamb.stop();
                    me.player.isDead=true;
                    me.player.visible=false;

                    me.saigne(me.player,function(){

                        me.blood.visible=false;
                        me.player.anims.play('turn');
                        me.player.isDead=false;
                        me.scene.restart();
                        // this.sound.play('die', {volume : 1 });

                    })

                }
            }
        }

    }

    hitMine (player, mine)
    {
        let me=this;
        if(mine.isDead !== true){
            if(

                player.body.velocity.y > 0

                && player.getBounds().bottom < mine.getBounds().top+30

            ){

                mine.isDead=true;
                mine.visible=false;

                this.sound.play('explosion', {volume : 2 });

                this.saigne(mine,function(){

                })

                player.directionY=500;
            }else{

                if(!me.player.isDead){
                    this.musicamb.stop();
                    me.player.isDead=true;
                    me.player.visible=false;

                    me.saigne(me.player,function(){

                        me.blood.visible=false;
                        me.player.anims.play('turn');
                        me.player.isDead=false;
                        me.scene.restart();
                        // this.sound.play('die', {volume : 1 });

                    })

                }
            }
        }

    }


    hitMechant(player, monster){
        let me=this;
        if(monster.isDead !== true){
            if(

                player.body.velocity.y > 0

                && player.getBounds().bottom < monster.getBounds().top+30

            ){
                ui.gagne();
                monster.isDead=true;
                monster.visible=false;

                this.sound.play('die', {volume : 1 });

                this.saigne(monster,function(){

                })

                player.directionY=500;
            }else{

                if(!me.player.isDead){
                    me.player.isDead=true;
                    this.musicamb.stop();
                    me.player.visible=false;

                    me.saigne(me.player,function(){

                        me.blood.visible=false;
                        me.player.anims.play('turn');
                        me.player.isDead=false;
                        me.scene.restart();
                    })

                }
            }
        }

    }

    getMoleu (player, star)
    {
        star.disableBody(true, true);
        ui.gagne();
        this.sound.play('moleu', {volume : 1 });



        let totalActive=0;
        for(let child of this.children.getChildren()){
            if(child.texture && child.texture.key==="star"){
                if(child.active){
                    totalActive++;
                    this.sound.play('collect_1', {volume : 1 });

                }
            }
        }

    }


    _destroy(){
        this.player.stop();
        this.scene.stop();
    }


    win(){
        Tableau.suivant();
        this.musicamb.stop();
    }


    static suivant(){
        let ceSeraLaSuivante=false;
        let nextScene=null;
        if(Tableau.current){
            for(let sc of game.scene.scenes){
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

Tableau.current=null;