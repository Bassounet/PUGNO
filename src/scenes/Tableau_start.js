class Tableau_start extends Tableau {

    preload() { 

        this.load.image('fond', 'assets/starting_screenV6.png');
        this.load.audio('go', 'son/go.wav');



    }


    create() {

        super.create();

        this.add.image(448,224,'fond');
        this.motiv = this.sound.add('go');

        this.input.keyboard.on('keydown-ENTER', function () //'keydown-SPACE', function ()
        {
            if (!this.touchePressed)
            {
                this.touchePressed = true;
                this.sound.play('go',{volume : 1});
                this.cameras.main.fadeOut(1000, 0, 0, 0)
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>
                {
                    Tableau.suivant();

                })
            }

        }, this);


    }

    update() {     

    }

}






