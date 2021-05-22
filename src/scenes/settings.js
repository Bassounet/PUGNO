class settings extends Tableau {

    preload() { 

        this.load.image('back', 'assets/settings_.png');


    }


    create() {

        super.create();

        this.add.image(448,224,'back');


        // ---- *** ---- VERS START  ---- *** ----

        this.input.keyboard.on('keydown-B', function () //'keydown-SPACE', function ()
        {
            if (!this.touchePressed)
            {
                this.touchePressed = true;
                this.sound.play('woosh',{volume : 1});
                this.cameras.main.fadeOut(1000, 0, 0, 0)
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>
                {

                    this.game.scene.start(Tableau_start);
                    this.scene.start("start");

                })
            }
        }, this);
    }

    update() {     

    }

}






