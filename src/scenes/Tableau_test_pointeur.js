class Tableau_v extends Tableau {

    preload() { 

        this.load.video('test', 'assets/video/test_logo.mp4', 'loadeddata', false, true);

        
    }


    create() {

        super.create();
        var blocks = this.physics.add.group({key: 'block', frameQuantity: 6, setXY: { x: 100, y: 400, stepX: 100 }});
        var clown = this.physics.add.image(200, 300, 'clown');
        var cursor = this.add.image(0, 0, 'cursor').setVisible(false);

        this.input.on('pointermove', function (pointer)
           {
        cursor.setVisible(true).setPosition(pointer.x, pointer.y);

        this.physics.moveToObject(clown, pointer, 240);

        Phaser.Utils.Array.Each(
            blocks.getChildren(),
            this.physics.moveToObject,
            this.physics,
            pointer, 120);
     }, this);  


            
          
         
    }


    update() {

        

        

    }

}






