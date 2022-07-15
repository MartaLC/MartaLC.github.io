export default class Personnage{
	constructor (nom, nbLigne, nbCol, image, weapon) {
		this.nom=nom;
		this.position={
			ligne:Math.round(Math.random() * nbLigne),
			col:Math.round(Math.random()* nbCol),
    	}
    	this.image=image;
    	this.weapon=weapon;
    	this.weaponToDrop;
    	this.lifePoints=100;
    	this.fightAttack=true;
	}

	move(targetCell) {
		let targetLine = targetCell[0];
		let targetCol = targetCell[1];
		this.position['ligne'] = targetLine;
		this.position['col'] = targetCol;
	}

	setWeaponToDrop(weapon){
		this.weaponToDrop=weapon;
	}
}


 