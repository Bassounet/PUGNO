class Moleux extends ObjetPhysique{

    constructor(scene, x, y) {
        super(scene, x, y, "moleu_");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        Tableau.current.physics.add.overlap(this, this.player, function (){

            ui.gagne();
            console.log('hey');


        }, null, this);


        this.body.allowGravity = true;
        this.setDisplaySize(100, 100);
        this.setBodySize(100, 100);

    }
}
