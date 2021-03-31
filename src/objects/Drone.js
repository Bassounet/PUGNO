class Drone extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "drone");
        //pas de gravité
        this.body.allowGravity=false;

        //gestion de la taille
        // this.setDisplaySize(20,20);

        //on réduit un peu la zone de hit
        // this.setBodySize(132,54);
        this.setOffset(0,0);// ici on règle le point de référence du départ réglage de noter hitbox ... 
        this.setVelocityX(100);

        //définir les propriété que l'on va utiliser dans notre animation

        // X
        this.originalX=x;
        this.minX=x-220;
        this.maxX=x+130;

        // Y
        this.originalY=y;
        this.minY=y-5;
        this.maxY=y+5;

        // on applique les propriété du début de l'animation
        this.x=this.minX;
        this.y=this.minY;
        this.alpha=0;
        let me=this;

        //on fait apparaitre notre objet avec un petit delay, puis on lance l'animation
        //ceci a pour effet de décaler les animations pour ce même objet
        scene.tweens.add({
                targets:this,
                duration:0,
                delay:Math.random()*800,
                alpha:{
                    startDelay:Math.random()*5000,
                    from:0,
                    to:1,
                },
                onComplete: function () {
                    me.start();
                }
            })

    }
    start(){
        this.scene.tweens.add({
            targets: this,
            x: {
                from: this.minX,
                to:this.maxX,
                duration: 7500,
                ease: 'Sine.easeInOut',
                yoyo: -1,
                repeat:-1,
                flipX:true,
            },
            y: {
                from: this.minY,
                to:this.maxY,
                duration: 500,
                ease: 'Sine.easeInOut',
                yoyo: -1,
                repeat:-1
            }
        });
    }

}