import Obstacle from './Obstacle.js'
import Weapon from './Weapon.js'

export default class Map {
  constructor(nbLigne, nbCol, carte,personnages, weapons) {
    this.nbLigne = nbLigne;
    this.nbCol = nbCol;
    this.map = []
    this.personnages= personnages;
    this.takenCell = [];
    this.obstacleCell=[];
    this.weaponCell=[];
    this.carteHTML = carte;
    this.create();
    this.display();
    this.placePerso();
    this.placeWeapon(weapons);
    this.placeObstacle(); 
    this.currentPlayer= this.personnages[0];
    this.indexPlayer = false;
    this.numberMovement = 0;
    this.weaponToDrop=this.currentPlayer.weapon;
    this.nbPersonChooseFight=0;


  }
  //Créer une table à deux dimensions
  create() {
    for (let i = 0; i < this.nbLigne; i++) {
		this.map.push([0]);
		for (let j = 0; j < this.nbCol; j++) {
			this.map[i][j]=0;
			}
		}
  }

  /**
  description : Placer les personnage avec condition de ne pas être côte à côte
  param personnages : array
  return void
  **/
  placePerso () {

  this.personnages.forEach(p => {
  let ligne = 0; 
  let col = 0;
   
    do {
      ligne = Math.round(Math.random()* (this.nbLigne-1))
      col = Math.round(Math.random()* (this.nbCol-1))
     
    } while (this.takenCell.includes(`${ligne}${col}`) 
      || this.takenCell.includes(`${ligne-1}${col}`) 
      || this.takenCell.includes(`${ligne+1}${col}`) 
      || this.takenCell.includes(`${ligne}${col+1}`) 
      || this.takenCell.includes(`${ligne}${col-1}`));
      
      this.takenCell.push(`${ligne}${col}`);
           
      p.position['ligne'] = ligne;
      p.position['col'] = col;
   
      this.map[p.position['ligne']][p.position['col']] = p;

    document.querySelector(`[data-id="${ligne}${col}"]`).innerHTML ="<img src='" + p.image +"'/>";
  })
   
  }

  /**
  description : place les armes aléatoirement 
  param weapons : array
  return void
  **/
  placeWeapon (weapons) {
    
  weapons.forEach(p => {
  let ligne = 0; 
  let col = 0;
    do {
      ligne = Math.round(Math.random()* (this.nbLigne-1))
      col = Math.round(Math.random()* (this.nbCol-1))
     
    } while (this.takenCell.includes(`${ligne}${col}`));
      this.takenCell.push(`${ligne}${col}`);
      this.weaponCell.push(`${ligne}${col}`);
     
      p.position['ligne'] = ligne;
      p.position['col'] = col;
   
      this.map[p.position['ligne']][p.position['col']] = p;

    document.querySelector(`[data-id="${ligne}${col}"]`).innerHTML ="<img src='" + p.image +"'/>";
    let weaponString = JSON.stringify(p);
    //On ajoute les information des armes (force,image,nom)car ces valeurs seront utilisé pour le combat plus tard.
    //set attribute ne sait pas interpreter les objets Javascript donc il fallait le convertir en string.

    document.querySelector(`[data-id="${ligne}${col}"]`).setAttribute("data-weapon", weaponString);
  
  })


  }

  /**
  description : place les obstacles aléatoirement 
  param obstacles : array
  return void
  **/  

  placeObstacle(){
  let tree=new Obstacle ('tree', this.nbLigne, this.nbCol, 'Tree1.png');
  let bush= new Obstacle ('bush',this.nbLigne, this.nbCol,'Bush.png' );
  let appleTree=new Obstacle ('appleTree',this.nbLigne, this.nbCol,'Tree2.png');
  
  let obstacles=[tree,tree,tree,bush,appleTree,appleTree,appleTree,bush];
  
  obstacles.forEach (p=> {
    let ligne=0;
    let col=0;
    
    do {
      ligne = Math.round(Math.random()* (this.nbLigne-1))
      col = Math.round(Math.random()* (this.nbCol-1))
     
    } while (this.takenCell.includes(`${ligne}${col}`));
      this.takenCell.push(`${ligne}${col}`);
      this.obstacleCell.push(`${ligne}${col}`);
      p.position['ligne'] = ligne;
      p.position['col'] = col;
   
      this.map[p.position['ligne']][p.position['col']] = p;
    
    document.querySelector(`[data-id="${ligne}${col}"]`).innerHTML ="<img src='" + p.image +"'/>";
  })
  }

  //Créé les rangées et colonnes dans la carte
  display(){
   
    for (var i=0; i< this.nbLigne; i++){
      var row=document.createElement("tr");

      for (var j=0; j< this.nbCol; j++){
        var col=document.createElement("td");
        col.dataset.id = `${i}${j}`;
        row.appendChild(col);
      }
      this.carteHTML.appendChild(row);
    }

    this.carteHTML.setAttribute("border","5");
  }

  /**
  description :  Vérifie si'il n'y a pas des obstacles sur le chemin à parcourir
  param personnage : object
  param targetCell : array
  return: booléan
  **/

  isNoObstacleDetected(personnage,targetCell) {
    let lineTarget = targetCell[0];
    let colTarget = targetCell[1];
    let oldLine=personnage.position['ligne'];
    let oldCol=personnage.position['col'];
    let pathCells=[];
    //On vérifie si la postition target ne contient pas l'obstacle
    let isNoObstacleDetected = (this.obstacleCell.includes(`${lineTarget}${colTarget}`)==false);
    if(isNoObstacleDetected) {
      //On reste sur la même ligne
      if (oldLine==lineTarget){
        let value = colTarget - oldCol;
        if(value > 0) {
          // On bouge vers la droite et on récupere la liste des coordonées dans le chemin et met à jours pathCells
          for(let i=oldCol;i<colTarget;i++ ){
            let coordonates=`${oldLine}${i}`;
            pathCells.push(coordonates);
          }
        }else {
          //vers la gauche on récuper liste des coordones dans le chemin et met à jours pathCells
          for(let i=colTarget;i<oldCol;i++ ){
            let coordonates=`${oldLine}${i}`;
            pathCells.push(coordonates);
          }
        }
      }else {
        //cas colTarget = oldCol, on reste sur la même colonne
        let valueLine = lineTarget - oldLine;
        if(valueLine > 0) {
          // on va vers le bas on récuper liste des coordones dans le chemin et met à jours pathCells
          for(let i=oldLine;i<lineTarget;i++ ){
            let coordonates=`${i}${oldCol}`;
            pathCells.push(coordonates);
          }
        }else {
        // on va vers le haut on récuper liste des coordones dans le chemin et met à jours pathCells
          for(let i=lineTarget;i<oldLine;i++ ){ 
            let coordonates=`${i}${oldCol}`;
            pathCells.push(coordonates);
          } 
        }
      }
      // On vérifie chaque coordonée dans le chemin pathCell si elles ne contient pas d'obstacle
      for (let i=0; i<pathCells.length;i++){
        let coordonates=pathCells[i];
        isNoObstacleDetected = (this.obstacleCell.includes(`${coordonates}`)==false);
        if (!isNoObstacleDetected){
          break;
        }
      }
    }  
    return isNoObstacleDetected;
  }

  /**
  description : Vérifie les conditions de déplacement
  param personnage : object
  param targetCell : array
  return: booléan
  **/


  isAllowedToMove(personnage, targetCell) {
    let lineTarget = targetCell[0];
    let colTarget = targetCell[1];
    let oldLine=personnage.position['ligne'];
    let oldCol=personnage.position['col'];
        
    //calcule la distance parcouru et prend le valeur absolut de resultat
    let distance = Math.abs(lineTarget - oldLine) + Math.abs(colTarget - oldCol);
    //vérifie s'il n'y a pas d'obstacle dans le target cell
    let isAllowed = this.isNoObstacleDetected(personnage,targetCell);

    //Vérifie si deplacement est horizontal ou vertical
    if (lineTarget==oldLine || colTarget==oldCol){
    }else{
       // pas de deplacement diagnonale
      isAllowed=false;
      alert('Vous ne pouvez pas vous déplacer en ligne diagnonale');
    }

    if(isAllowed){
      //calculer la distance total si le deplacement se fait en plusieurs fois/click
      let totalDistance= this.numberMovement + distance;

      if (totalDistance>3){
        alert('Vous pouvez vous déplacer 3 cases maximum');
        isAllowed=false;
      }
      else{
          this.numberMovement= distance + this.numberMovement; 
        }
      }
      return isAllowed;
  } 
  
    /**
  description : Met à jour le DOM avec les valeurs de points de vie
  param firstPlayer : object
  param secondPlayer : object
  return: void
  **/
  changeLifePoints (firstPlayer,secondPlayer){

    if (firstPlayer.nom ==='lagertha'){
    $("#health-Lagertha").html(firstPlayer.lifePoints);
    $("#health-Aslaug").html(secondPlayer.lifePoints);
    } else {
      $("#health-Aslaug").html(firstPlayer.lifePoints);
      $("#health-Lagertha").html(secondPlayer.lifePoints);
    }
  }

  //Calcule les points de vie des personnages selon type d'action choisie
  calculateLifePoints(firstPlayer,fightAttack){
    let indexSecondPlayer = !this.indexPlayer;
    
    let secondPlayer= indexSecondPlayer ? this.personnages[1] : this.personnages[0];
      
    this.nbPersonChooseFight =0;
    

    if (firstPlayer.fightAttack==true && secondPlayer.fightAttack==true){
      secondPlayer.lifePoints=secondPlayer.lifePoints - firstPlayer.weapon.force;
      firstPlayer.lifePoints=firstPlayer.lifePoints-secondPlayer.weapon.force;

    }else if (firstPlayer.fightAttack==true && secondPlayer.fightAttack==false) {

      secondPlayer.lifePoints=secondPlayer.lifePoints - (firstPlayer.weapon.force/2);
      
    }else if(firstPlayer.fightAttack==false && secondPlayer.fightAttack==true){
      //secondPlayer.lifePoints=secondPlayer.lifePoints;
      firstPlayer.lifePoints=firstPlayer.lifePoints-(secondPlayer.weapon.force/2);

    }else {
      //cas ou (firstPlayer.fightAttack==false && secondPlayer.fightAttack==false){

      secondPlayer.lifePoints;
      firstPlayer.lifePoints;
    }

    this.changeLifePoints(firstPlayer,secondPlayer);

    //le jeu continue tant que les joueurs ont les points de vie
    if (secondPlayer.lifePoints<0 || secondPlayer.lifePoints===0){
      alert('Le jeux est terminé! ' + firstPlayer.nom + ' a gagné!');
      this.endScreen();
    }else if (firstPlayer.lifePoints<0 || firstPlayer.lifePoints===0) {
      alert('Le jeux est terminé! ' + secondPlayer.nom + ' a gagné!');
      this.endScreen();

      } 


  }
  //Modifie l'écran à la fin de jeu, permet de rejouer
  endScreen(){
    $("#attack").hide();
    $("#defense").hide();
    $('#fightmap').append('<button data-role="button" data-inline="true" data-mini="true" data-theme="b" class="button" id="rejouer">Rejouer</button>');
    $('#status-Lagertha').hide();
    $('#status-Aslaug').hide();
    $("#rejouer").on('click', function(){
      window.location.reload();
    })

  }

  //modifie la carte pour la bataille
  battleStarted(){

    alert('Vous avez commencé la bataille!');
      $("#carte").hide();
      $("#button").hide();
      $('#fightmap').append('<button data-role="button" data-inline="true" data-mini="true" data-theme="b" class="button" id="attack">Attaquer</button>');
      $('#fightmap').append('<button data-role="button" data-inline="true" data-mini="true" data-theme="b" class="button" id="defense">Défendre</button>');
      //On crée that pour que event 'click' puisse avoir acces au contenu de this
      let that=this;

      $('#attack').on('click', function(){
   
        let firstPlayer = that.currentPlayer;
        firstPlayer.fightAttack=true;
        //vérifier que chaque joueur a fait son tour
        that.nbPersonChooseFight++;

        if (that.nbPersonChooseFight === 2) {
          that.calculateLifePoints(firstPlayer);
        } 
          that.changePlayer();
          that.changeStatusPlayer();
      })


      $('#defense').on('click', function(){
        let defendingPlayer=that.currentPlayer;
        defendingPlayer.fightAttack=false;
        that.nbPersonChooseFight++;
        
        if (that.nbPersonChooseFight === 2) {
          that.calculateLifePoints(defendingPlayer);
        } 

        that.changePlayer();
        that.changeStatusPlayer();
    })

  }


  //conditionnement de déplacement

  move(what, targetCell) {

    let lineTarget = targetCell[0];
    let colTarget = targetCell[1];
    let oldLine = what.position['ligne'];
    let oldCol = what.position['col'];
    let oldCell = document.querySelector(`[data-id="${oldLine}${oldCol}"]`);
    let cell = document.querySelector(`[data-id="${lineTarget}${colTarget}"]`);
    
    if ( this.weaponCell.includes(`${oldLine}${oldCol}`)){
      //placer l'arme à l'ancienne position
      oldCell.innerHTML = "<img src='" + what.weaponToDrop.image +"'/>";

      //set attribute n'accepte que le string, j'ai donc transformé  objet l'arme(p) en string
      let weaponString = JSON.stringify(what.weaponToDrop);
      document.querySelector(`[data-id="${oldLine}${oldCol}"]`).setAttribute("data-weapon", weaponString);
    
    }else{
      //si le personnage quitte sa position sans arme, l'ancien espace devient vide
      oldCell.innerHTML = ''

    }
    
    //ici on véfrifie si les personnage sont cote à cote pour detecter la bataille
    let indexPlayerOpponent = !this.indexPlayer;
    let playerOpponent = indexPlayerOpponent  ? this.personnages[1] : this.personnages[0];

    let lineDistance=Math.abs(lineTarget-playerOpponent.position['ligne']);
    let columnDistance=Math.abs(colTarget-playerOpponent.position['col']);

    //le personnage est déplacé 
    cell.innerHTML = "<img src='" + what.image +"'/>";

    if ((lineDistance <= 1 && columnDistance ==0)||(lineDistance == 0 && columnDistance <= 1)){
      this.battleStarted();
    } 

    
    //remove old position from taken cell
    let oldPosition= `${oldLine}${oldCol}`;
    
    for( var i = 0; i < this.takenCell.length; i++){
      let value= this.takenCell[i];
      if ( value === oldPosition) { 
        this.takenCell.splice(i, 1); 
      }
    }

    // add new position to takenCell
    let newPosition=`${lineTarget}${colTarget}`;

    this.takenCell.push(newPosition);

  }


  //Ajoute les evenement au click sur la carte et bouton 'j'ai fini'

  listenMovement() {
    let field = document.querySelectorAll("td");
    let that=this;
    field.forEach(f=> {
      f.addEventListener("click", function(e) {
        let lineTarget=e.currentTarget.dataset.id.substr(0,1);
        let colTarget=e.currentTarget.dataset.id.substr(1,1);   
        let targetCell =  [lineTarget, colTarget];
        that.play(targetCell);
      })
    })
    let button =document.getElementById("button");
    
    button.addEventListener("click", function(e) {
      that.changePlayer();
      that.changeStatusPlayer();
     
    })
  }

  //Met à jour le DOM avec le statut de joueur
  changeStatusPlayer (){
    if(this.currentPlayer.nom==='lagertha'){
    document.getElementById("status-Lagertha").innerHTML="Est en train de jouer";
    document.getElementById("status-Aslaug").innerHTML="En attente";
    }else {
    document.getElementById("status-Lagertha").innerHTML="En attente";
    document.getElementById("status-Aslaug").innerHTML="Est en train de jouer";
    }

  }

  //change le jouer
  changePlayer(){
    //indexPlayer correspond à une valeur true ou false. Cette valeur permet de changer le joueur
    this.indexPlayer = !this.indexPlayer;
    this.currentPlayer = this.indexPlayer  ? this.personnages[1] : this.personnages[0];
    this.numberMovement=0;
  }

  /*
  Met à jour l'arme de joueur 
  met à jour DOM avec les détails de l'arme, 
  met à jour la nouvelle position de personnage 
  change le joueur si le personnage a bougé trois cases
  */
  play(targetCell) {
    let lineTarget = targetCell[0];
    let colTarget = targetCell[1];


    if(this.isAllowedToMove(this.currentPlayer, targetCell)) {
      if ( this.weaponCell.includes(`${lineTarget}${colTarget}`)){
        //obtient l'image de target cell
        let weaponInTarget=document.querySelector(`[data-id="${lineTarget}${colTarget}"]`).innerHTML;
        this.currentPlayer.setWeaponToDrop(this.currentPlayer.weapon);
        //getAttribute weapon retour JSON objet weapon en string
        let weaponStringJSON= document.querySelector(`[data-id="${lineTarget}${colTarget}"]`).getAttribute("data-weapon");
        //parse = Transforme string JSON en javascript objet appelé weapon
        let weaponObject= JSON.parse(weaponStringJSON);
        let weaponName=weaponObject.nom;
        let weaponForce=weaponObject.force;

      
        if(this.currentPlayer.nom==='lagertha'){
          //Obtient arme de target cell et met à jour dans le DOM (carré personnage)
          document.getElementById('weapon-Lagertha').innerHTML =weaponInTarget;
          document.getElementsByClassName('weapon-name')[0].innerHTML=weaponName;
          //this.currentPlayer.weapon est mis à jour avec l'objet weaponObject
          this.currentPlayer.weapon=weaponObject;
          document.getElementsByClassName("weapon-force")[0].innerHTML=weaponForce;
        }else{
          document.getElementById('weapon-Aslaug').innerHTML =weaponInTarget;
          document.getElementsByClassName('weapon-name')[1].innerHTML=weaponName;
          document.getElementsByClassName("weapon-force")[1].innerHTML=weaponForce;
          this.currentPlayer.weapon=weaponObject;
          
        }
      }


      //mettre à jour (this.currentplayer) avec sa nouvelle position
      this.move(this.currentPlayer, targetCell);
      this.currentPlayer.move(targetCell);

      //Après trois movement le joueur change autmomatiquement sans cliquer le bouton 'j'ai fini'
      if(this.numberMovement===3){
        this.changePlayer();
        this.changeStatusPlayer();
    }


    }
   
  }
}

