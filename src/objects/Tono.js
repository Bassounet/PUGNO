class Tono extends ObjetPhysique{

    constructor(scene, x, y,image) {
        super(scene, x, y,"tono");
        scene.physics.add.overlap(
            scene.player,
            this,
            scene.hitTono,
            null,
            scene
        );
        this.setBodySize(30,55);
        this.setOffset(20,10);
    }



       

}