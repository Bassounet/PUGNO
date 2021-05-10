class mine extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "mine");
        this.body.allowGravity=true;
        this.flipX=false;
        
        this.setGravityY(40);
        this.setDisplaySize(35,25);
        this.setOffset(0,0);
        this.setCollideWorldBounds(true)
        
    }


       

}