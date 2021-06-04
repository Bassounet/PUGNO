class Tableau_end extends Tableau {

    preload() { 

        this.load.image('end__screen', 'assets/the_end_screen.png');

    }


    create() {

        super.create();

        this.add.image(448,224,'end__screen');

        this.input.keyboard.on('keydown-Q', function () //'keydown-SPACE', function ()
        {
            if (!this.touchePressed)
            {
                this.touchePressed = true;
                this.sound.play('woosh',{volume : 1});
                this.cameras.main.fadeOut(1000, 0, 0, 0)
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>
                {
                    this.game.scene.start(Tableau_v);
                    this.scene.start("test_v");



                })
            }

        }, this);

          
         
    }


}






