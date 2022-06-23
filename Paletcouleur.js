class paletCouleur{
    constructor(){
        this.couleurs = [];
        this.couleurs.push(new couleur(204,0,0));
        this.couleurs.push(new couleur(204,102,0));
        this.couleurs.push(new couleur(204,204,0));
        this.couleurs.push(new couleur(102,204,0));
        this.couleurs.push(new couleur(0,204,204));
        this.couleurs.push(new couleur(0,102,204));
        this.couleurs.push(new couleur(0,0,204));
        this.couleurs.push(new couleur(102,0,204));
        this.couleurs.push(new couleur(204,0,102));
        this.couleurs.push(new couleur(204,255,255));
        this.couleurs.push(new couleur(204,204,255));
    }
}
class couleur {
    constructor(r,g,b){
        this.r = r;
        this.g = g;
        this.b = b;
    }
}