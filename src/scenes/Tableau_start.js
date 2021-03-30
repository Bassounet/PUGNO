class Tableau_start extends Tableau {

    preload() { 

        this.load.image('fond', 'assets/starting_screenV5.png');
        this.load.image('button', 'assets/play_button.png');
    }


    create() {

        super.create();  


            this.add.image(448,224,'fond');
            // const button = this.add.image(448,154,'button');
            // button.setInteractive();
            // button.on('lol',() => {console.log('lol'); });

            var timedEvent;

            timedEvent = this.time.addEvent({ 
                delay: 6400,
                callback: Tableau.suivant,
                callbackScope: this,
                loop: true });

                               
         
         
    }

    


    update() {     
0
        

    }

}






