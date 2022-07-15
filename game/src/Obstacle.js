export default class Obstacle{
  constructor (nom,nbLigne, nbCol, image){
    this.nom=nom;
    this.position={
      ligne:Math.round(Math.random() * nbLigne),
      col:Math.round(Math.random() * nbCol),
    }
    this.image=image;
    }
}