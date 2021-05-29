class Moleux extends ObjetPhysique{

    constructor(scene, x, y, image) {
        super(scene, x, y, "moleu_");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        Tableau.current.physics.add.overlap(this, Tableau.current.player, function (){

            this.destroy();
            ui.gagne();
            Tableau.current.sound.play('moleu', {volume : 1 });

        }, null, this);

        this.setDepth(1000);



        this.body.allowGravity = false;
        this.setDisplaySize(25, 50);
        this.setBodySize(this.body.width, this.body.height);

    }
}
