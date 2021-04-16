class Tableau_v extends Tableau {

    preload() { 

        this.load.video('test', 'assets/video/test_logo.mp4', 'loadeddata', false, true);
    }


    create() {

        super.create();  


            var vid = this.add.video(448, 224, 'test');
            vid.setDisplaySize(896,448);
            vid.setDepth(40);
            vid.play(true);
            vid.setPaused(false);
            vid.setLoop(false);
            // var timer = this.time.delayedCall(0, callback, args, scope);  // delay in ms
            var timedEvent;

            timedEvent = this.time.addEvent({ 
                delay: 10,
                callback: Tableau.suivant,
                callbackScope: this,
                loop: true });
          
         
    }

    


    update() {

        

        

    }

}






