class Tableau_start extends Tableau {

    preload() { 

        this.load.image('fond', 'assets/starting_screenV6.png');


    }


    create() {

        super.create();

        this.add.image(448,224,'fond');


        // var timedEvent;
        //
        // timedEvent = this.time.addEvent({
        //     delay: 3000,
        //     callback: Tableau.suivant,
        //     callbackScope: this,
        //     loop: true });

    }

    update() {     

    }

}






