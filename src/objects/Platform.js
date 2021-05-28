class Platform extends ObjetPhysique
{

    constructor(scene, x, y,image)
    {
        super(scene, x, y,image);
        scene.add.existing(this);

        this.body.setImmovable();
        this.body.allowGravity=false;

    }

}