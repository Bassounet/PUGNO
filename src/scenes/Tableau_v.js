class Tableau_v extends Tableau {

    preload() { 

        this.load.video('test', 'assets/video/test_logo.mp4', 'loadeddata', false, true);
        this.load.image('sky', 'assets/sky.png');
        // this.load.image('spike', 'assets/spike.png');
        this.load.spritesheet('player','assets/player1.png',
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


    create() {

        super.create();
        z
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


            var vid = this.add.video(448, 224, 'test');
            vid.setDisplaySize(896,448);
            vid.setDepth(40);
            vid.play(true);
            vid.setPaused(false);
            vid.setLoop(false);
            // var timer = this.time.delayedCall(0, callback, args, scope);  // delay in ms
            var timedEvent;

            timedEvent = this.time.addEvent({ 
                delay: 6200,
                callback: Tableau.suivant,
                callbackScope: this,
                loop: true });
          
         
    }

    


    update() {

        

        

    }

}






