class Tir extends ObjetPhysique{
    constructor(scene, x, y){
        super(scene, x, y, "tir");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.allowGravity=false;
        this.setDisplaySize(10,5);
        this.setBodySize(this.body.width,this.body.height);

        this.setVelocityX(450 * scene.player.sens);
        this.setBounce(1);
        this.setDepth(1000);

        let tir = this;

        scene.cibleContainer.iterate(cibleu=>{
            scene.physics.add.overlap(this, cibleu, function(){cibleu.killcible();
            tir.destroy()}, null, scene);

        })

        scene.mechantContainer.iterate(monster=>{
            scene.physics.add.overlap(this, monster, function(){monster.killmonster();tir.destroy()}, null, scene);

        })

        scene.physics.add.collider(this, scene.floor, function(){
            tir.destroy()

        });
    }
}