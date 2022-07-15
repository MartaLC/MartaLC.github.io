import Map from './Map.js'
import Personnage from './Personnage.js'
import Weapon from './Weapon.js'


class App {
  constructor(nbLigne, nbCol, personnage1, personnage2, weapons) {
    this.nbLigne = nbLigne;
    this.nbCol = nbCol;
    this.pers = [personnage1, personnage2];
    this.map;
    this.weapons = weapons;
    this.currentPlayer = this.pers[0];
    this.indexPlayer = 0;
    this.createMap ();
    this.listenToMoveAndPlay();
    
  }

  //Créer une carte de jeu
  createMap() {
    this.map = new Map(this.nbLigne, this.nbCol, document.getElementById('carte'), this.pers, this.weapons);
    this.map.currentPlayer=this.currentPlayer;
  }

  //Attendre que joueur se déplace
  listenToMoveAndPlay() {
    console.log("listenToMoveAndPlay")
    var that = this;
    that.map.listenMovement();
    that.map.changeStatusPlayer();

  }

}

// Dimensions de la carte
const nbLigne = 10;
const nbCol = 10;

//Définition des armes
let axe= new Weapon ('hache', nbLigne, nbCol,'axe.png', 20);
let sword=new Weapon ('épée', nbLigne, nbCol,'sword2.png', 30);
let bow=new Weapon ('arc', nbLigne, nbCol,'bow.png', 15);
let hammer=new Weapon ('marteau', nbLigne, nbCol,'hammer.png',20);
let twig=new Weapon ('brindille', 0, 0, 'twig.png',10);
let twig2 = new Weapon('brindille', 0, 0, 'twig2.png',10);

  
let weapons=[axe,sword,bow,hammer];





//Définition des joueurs
let lagertha= new Personnage ('lagertha', nbLigne, nbCol, 'lagertha.png',twig );
let aslaug = new Personnage('aslaug', nbLigne, nbCol,'aslaug.png',twig2 );


/**
Lancer App
**/
const app = new App(nbLigne, nbCol, lagertha, aslaug, weapons);








