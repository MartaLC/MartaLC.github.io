export default class Weapon{
  constructor (nom, nbLigne, nbCol, image, force) {
    this.nom=nom;
    this.position={
      ligne:Math.round(Math.random() * nbLigne),
      col:Math.round(Math.random() * nbCol),
    }
    this.force=force;
    this.image=image;
  }
}


