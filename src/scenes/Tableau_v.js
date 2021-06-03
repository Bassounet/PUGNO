class Tableau_v extends Tableau {

    preload() { 

        this.load.video('test', 'assets/video/test_logo.mp4', 'loadeddata', false, true);
        this.load.spritesheet('player','assets/player1.png',
            { frameWidth: 61, frameHeight: 64  }
        );
        this.load.audio('moleu', 'son/collect.wav');
        this.load.audio('die', 'son/die.wav');
        this.load.audio('talkie', 'son/talkie.wav');
        this.load.audio('fire', 'son/fire.wav');
        this.load.audio('amb', 'son/ambiance.wav');


    }


    create() {

        super.create();



        this.boutonTir = this.input.keyboard.addKey('A');



            var vid = this.add.video(448, 224, 'test');
            vid.setDisplaySize(896,448);
            vid.setDepth(40);
            vid.play(true);
            vid.setPaused(false);
            vid.setLoop(false);

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






