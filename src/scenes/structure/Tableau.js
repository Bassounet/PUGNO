class Tableau extends Phaser.Scene{

    constructor(key) {
        super(key);
    }


    preload(){

        this.load.image('sky', 'assets/sky.png');
        this.load.image('fire', 'assets/start_button.png');
        this.load.image('fire', 'assets/start_button.png');

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
        this.load.audio('cible', 'son/hit_cible.wav');
        this.load.audio('barbeles', 'son/barbles.wav');
        this.load.audio('barrel', 'son/barrels.wav');
        this.load.audio('mines', 'son/mines.wav');
        this.load.audio('blood', 'son/blood_effect.wav');
        this.load.audio('mechant', 'son/die_mechant.wav');
        this.load.audio('recovery', 'son/recovery.wav');
        this.load.audio('ouch', 'son/ouch.wav');
        this.load.audio('punch', 'son/punch.wav');
        this.load.audio('hitground', 'son/hit_ground.wav');

    }


    create(){

        Tableau.current=this;

        this.sys.scene.scale.lockOrientation("landscape")
        console.log("Mais où sommes-nous ?"+this.constructor.name+" / "+this.scene.key);

        this.player=new Player(this,80,250);

        this.blood=this.add.sprite(this.sys.canvas.width/2,this.sys.canvas.height/2,"blood")
        this.blood.displayWidth=64;
        this.blood.displayHeight=64;
        this.blood.visible=false;

        this.boutonTir = this.input.keyboard.addKey('A');
        this.bouton_Pause = this.input.keyboard.addKey('P');


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

                tono.isDead=true;
                tono.visible=false;

                tono.emit(MyEvents.EXPLODE);

                this.sound.play('barrel', {volume : 0.4 });
                this.sound.play('die', { delay : 0.15 });
                this.sound.play('blood', { delay : 0.04 });

                Tableau.current.cameras.main.shake(200, 0.1, true);


                if(!me.player.isDead){
                    this.musicamb.stop();
                    me.player.isDead=true;
                    me.player.visible=false;

                    me.saigne(me.player,function(){


                        me.blood.visible=false;
                        me.player.anims.play('turn');
                        me.player.isDead=false;
                        me.scene.restart();
                        me.sound.play('recovery', { delay : 0.04 });


                    })

                }
        }

    }

    hitMine (player, mine)
    {
        let me=this;

        if(mine.isDead !== true){


                mine.isDead=true;
                mine.visible=false;

                mine.emit(MyEvents.EXPLODE);

                this.sound.play('mines', {volume : 0.6 });
                this.sound.play('die', { delay : 0.15 });
                this.sound.play('blood', { delay : 0.15 });

                Tableau.current.cameras.main.shake(100, 0.07, true);

                if(!me.player.isDead){

                    this.musicamb.stop();
                    me.player.isDead=true;
                    me.player.visible=false;


                    me.saigne(me.player,function(){


                        me.blood.visible=false;
                        me.player.anims.play('turn');
                        me.player.isDead=false;
                        me.scene.restart();
                        me.sound.play('recovery', { delay : 0.04 });



                    })

                }

        }

    }


    hitMechant(player, monster){
        let me=this;
        if(monster.isDead !== true ){
                if(!me.player.isDead){
                    me.player.isDead=true;
                    this.musicamb.stop();
                    me.player.visible=false;
                    this.sound.play('die', {volume : 1 });
                    this.sound.play('punch', {volume : 3 });
                    Tableau.current.cameras.main.shake(1000, 0.02, true);

                    me.saigne(me.player,function(){

                        me.blood.visible=false;
                        me.player.anims.play('turn');
                        me.player.isDead=false;
                        me.scene.restart();
                        me.sound.play('recovery', { delay : 0.04 });
                    })

                }
        }

    }

    hitCible(player, monster){

        let me=this;

        if(monster.isDead !== true){


            monster.isDead=true;
            monster.visible=false;

            this.sound.play('cible', {volume : 0.6 });
            this.sound.play('ouch', { delay : 0.15 });


            Tableau.current.cameras.main.shake(50, 0.07, true);

            if(!me.player.isDead){

                this.musicamb.stop();
                me.player.isDead=true;
                me.player.visible=false;


                me.saigne(me.player,function(){


                    me.blood.visible=false;
                    me.player.anims.play('turn');
                    me.player.isDead=false;
                    me.scene.restart();
                    me.sound.play('recovery', { delay : 0.04 });



                })

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
            if(child.texture && child.texture.key === "star"){
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