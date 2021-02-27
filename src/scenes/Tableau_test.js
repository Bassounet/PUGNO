class Tableau_test extends Tableau{

    create() {
        super.create();

        
        
        //on définit la taille du tableau
        let largeurDuTableau=4000;
        let hauteurDuTableau=448; //la hauteur est identique au cadre du jeu
       // this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);

        this.cameras.main.startFollow(this.player, false, 0.05, 0.05);


    }



}
