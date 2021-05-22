class Tableau_start extends Tableau {

    preload() { 

        this.load.image('fond', 'assets/starting_screenV5.png');
        this.load.image('button', 'assets/play_button.png');
        this.load.video('test', 'assets/video/test_logo.mp4', 'loadeddata', false, true);
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


    create() {

        super.create();

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


            this.add.image(448,224,'fond');
            // const button = this.add.image(448,154,'button');
            // button.setInteractive();
            // button.on('lol',() => {console.log('lol'); });

            var timedEvent;

            timedEvent = this.time.addEvent({ 
                delay: 3000,
                callback: Tableau.suivant,
                callbackScope: this,
                loop: true });

                               
         
         
    }

    


    update() {     
0
        

    }

}






