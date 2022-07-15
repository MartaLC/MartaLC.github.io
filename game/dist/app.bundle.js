!function(e){var t={};function n(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(a,o,function(t){return e[t]}.bind(null,o));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=332)}({332:function(e,t,n){"use strict";n.r(t);var a=function e(t,n,a,o){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.nom=t,this.position={ligne:Math.round(Math.random()*n),col:Math.round(Math.random()*a)},this.image=o};var o=function e(t,n,a,o,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.nom=t,this.position={ligne:Math.round(Math.random()*n),col:Math.round(Math.random()*a)},this.force=i,this.image=o};function i(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var r=function(){function e(t,n,a,o,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.nbLigne=t,this.nbCol=n,this.map=[],this.personnages=o,this.takenCell=[],this.obstacleCell=[],this.weaponCell=[],this.carteHTML=a,this.create(),this.display(),this.placePerso(),this.placeWeapon(i),this.placeObstacle(),this.currentPlayer=this.personnages[0],this.indexPlayer=!1,this.numberMovement=0,this.weaponToDrop=this.currentPlayer.weapon,this.nbPersonChooseFight=0}var t,n,o;return t=e,(n=[{key:"create",value:function(){for(var e=0;e<this.nbLigne;e++){this.map.push([0]);for(var t=0;t<this.nbCol;t++)this.map[e][t]=0}}},{key:"placePerso",value:function(){var e=this;this.personnages.forEach((function(t){var n=0,a=0;do{n=Math.round(Math.random()*(e.nbLigne-1)),a=Math.round(Math.random()*(e.nbCol-1))}while(e.takenCell.includes("".concat(n).concat(a))||e.takenCell.includes("".concat(n-1).concat(a))||e.takenCell.includes("".concat(n+1).concat(a))||e.takenCell.includes("".concat(n).concat(a+1))||e.takenCell.includes("".concat(n).concat(a-1)));e.takenCell.push("".concat(n).concat(a)),t.position.ligne=n,t.position.col=a,e.map[t.position.ligne][t.position.col]=t,document.querySelector('[data-id="'.concat(n).concat(a,'"]')).innerHTML="<img src='"+t.image+"'/>"}))}},{key:"placeWeapon",value:function(e){var t=this;e.forEach((function(e){var n=0,a=0;do{n=Math.round(Math.random()*(t.nbLigne-1)),a=Math.round(Math.random()*(t.nbCol-1))}while(t.takenCell.includes("".concat(n).concat(a)));t.takenCell.push("".concat(n).concat(a)),t.weaponCell.push("".concat(n).concat(a)),e.position.ligne=n,e.position.col=a,t.map[e.position.ligne][e.position.col]=e,document.querySelector('[data-id="'.concat(n).concat(a,'"]')).innerHTML="<img src='"+e.image+"'/>";var o=JSON.stringify(e);document.querySelector('[data-id="'.concat(n).concat(a,'"]')).setAttribute("data-weapon",o)}))}},{key:"placeObstacle",value:function(){var e=this,t=new a("tree",this.nbLigne,this.nbCol,"Tree1.png"),n=new a("bush",this.nbLigne,this.nbCol,"Bush.png"),o=new a("appleTree",this.nbLigne,this.nbCol,"Tree2.png");[t,t,t,n,o,o,o,n].forEach((function(t){var n=0,a=0;do{n=Math.round(Math.random()*(e.nbLigne-1)),a=Math.round(Math.random()*(e.nbCol-1))}while(e.takenCell.includes("".concat(n).concat(a)));e.takenCell.push("".concat(n).concat(a)),e.obstacleCell.push("".concat(n).concat(a)),t.position.ligne=n,t.position.col=a,e.map[t.position.ligne][t.position.col]=t,document.querySelector('[data-id="'.concat(n).concat(a,'"]')).innerHTML="<img src='"+t.image+"'/>"}))}},{key:"display",value:function(){for(var e=0;e<this.nbLigne;e++){for(var t=document.createElement("tr"),n=0;n<this.nbCol;n++){var a=document.createElement("td");a.dataset.id="".concat(e).concat(n),t.appendChild(a)}this.carteHTML.appendChild(t)}this.carteHTML.setAttribute("border","5")}},{key:"isNoObstacleDetected",value:function(e,t){var n=t[0],a=t[1],o=e.position.ligne,i=e.position.col,r=[],c=0==this.obstacleCell.includes("".concat(n).concat(a));if(c){if(o==n)if(a-i>0)for(var s=i;s<a;s++){var l="".concat(o).concat(s);r.push(l)}else for(var u=a;u<i;u++){var h="".concat(o).concat(u);r.push(h)}else if(n-o>0)for(var d=o;d<n;d++){var p="".concat(d).concat(i);r.push(p)}else for(var f=n;f<o;f++){var g="".concat(f).concat(i);r.push(g)}for(var m=0;m<r.length;m++){var y=r[m];if(c=0==this.obstacleCell.includes("".concat(y)),!c)break}}return c}},{key:"isAllowedToMove",value:function(e,t){var n=t[0],a=t[1],o=e.position.ligne,i=e.position.col,r=Math.abs(n-o)+Math.abs(a-i),c=this.isNoObstacleDetected(e,t);return n==o||a==i||(c=!1,alert("Vous ne pouvez pas vous déplacer en ligne diagnonale")),c&&(this.numberMovement+r>3?(alert("Vous pouvez vous déplacer 3 cases maximum"),c=!1):this.numberMovement=r+this.numberMovement),c}},{key:"changeLifePoints",value:function(e,t){"lagertha"===e.nom?($("#health-Lagertha").html(e.lifePoints),$("#health-Aslaug").html(t.lifePoints)):($("#health-Aslaug").html(e.lifePoints),$("#health-Lagertha").html(t.lifePoints))}},{key:"calculateLifePoints",value:function(e,t){var n=this.indexPlayer?this.personnages[0]:this.personnages[1];this.nbPersonChooseFight=0,1==e.fightAttack&&1==n.fightAttack?(n.lifePoints=n.lifePoints-e.weapon.force,e.lifePoints=e.lifePoints-n.weapon.force):1==e.fightAttack&&0==n.fightAttack?(console.log("second case"),n.lifePoints=n.lifePoints-e.weapon.force/2,console.log("second player life points "+n.lifePoints)):0==e.fightAttack&&1==n.fightAttack?e.lifePoints=e.lifePoints-n.weapon.force/2:(n.lifePoints,e.lifePoints),this.changeLifePoints(e,n),n.lifePoints<0||0===n.lifePoints?(alert("Le jeux est terminé! "+e.nom+" a gagné!"),this.endScreen()):(e.lifePoints<0||0===e.lifePoints)&&(alert("Le jeux est terminé! "+n.nom+" a gagné!"),this.endScreen())}},{key:"endScreen",value:function(){$("#attack").hide(),$("#defense").hide(),$("#fightmap").append('<button data-role="button" data-inline="true" data-mini="true" data-theme="b" class="button" id="rejouer">Rejouer</button>'),$("#status-Lagertha").hide(),$("#status-Aslaug").hide(),$("#rejouer").on("click",(function(){window.location.reload()}))}},{key:"battleStarted",value:function(){alert("Vous avez commencé la bataille!"),$("#carte").hide(),$("#button").hide(),$("#fightmap").append('<button data-role="button" data-inline="true" data-mini="true" data-theme="b" class="button" id="attack">Attaquer</button>'),$("#fightmap").append('<button data-role="button" data-inline="true" data-mini="true" data-theme="b" class="button" id="defense">Défendre</button>');var e=this;$("#attack").on("click",(function(){var t=e.currentPlayer;console.log("firstPlayer "+t.nom),t.fightAttack=!0,e.nbPersonChooseFight++,console.log("nbPersonChooseFight "+e.nbPersonChooseFight),2===e.nbPersonChooseFight&&e.calculateLifePoints(t),e.changePlayer(),e.changeStatusPlayer()})),$("#defense").on("click",(function(){var t=e.currentPlayer;t.fightAttack=!1,console.log("defense works"),e.nbPersonChooseFight++,2===e.nbPersonChooseFight&&e.calculateLifePoints(t),e.changePlayer(),e.changeStatusPlayer()}))}},{key:"move",value:function(e,t){var n=t[0],a=t[1],o=e.position.ligne,i=e.position.col,r=document.querySelector('[data-id="'.concat(o).concat(i,'"]')),c=document.querySelector('[data-id="'.concat(n).concat(a,'"]'));if(this.weaponCell.includes("".concat(o).concat(i))){r.innerHTML="<img src='"+e.weaponToDrop.image+"'/>";var s=JSON.stringify(e.weaponToDrop);document.querySelector('[data-id="'.concat(o).concat(i,'"]')).setAttribute("data-weapon",s)}else r.innerHTML="";var l=this.indexPlayer?this.personnages[0]:this.personnages[1],u=Math.abs(n-l.position.ligne),h=Math.abs(a-l.position.col);c.innerHTML="<img src='"+e.image+"'/>",(u<=1&&0==h||0==u&&h<=1)&&this.battleStarted();for(var d="".concat(o).concat(i),p=0;p<this.takenCell.length;p++)this.takenCell[p]===d&&this.takenCell.splice(p,1);var f="".concat(n).concat(a);this.takenCell.push(f)}},{key:"listenMovement",value:function(){var e=document.querySelectorAll("td"),t=this;e.forEach((function(e){e.addEventListener("click",(function(e){var n=[e.currentTarget.dataset.id.substr(0,1),e.currentTarget.dataset.id.substr(1,1)];t.play(n)}))})),document.getElementById("button").addEventListener("click",(function(e){t.changePlayer(),t.changeStatusPlayer()}))}},{key:"changeStatusPlayer",value:function(){"lagertha"===this.currentPlayer.nom?(document.getElementById("status-Lagertha").innerHTML="Est en train de jouer",document.getElementById("status-Aslaug").innerHTML="En attente"):(document.getElementById("status-Lagertha").innerHTML="En attente",document.getElementById("status-Aslaug").innerHTML="Est en train de jouer")}},{key:"changePlayer",value:function(){this.indexPlayer=!this.indexPlayer,this.currentPlayer=this.indexPlayer?this.personnages[1]:this.personnages[0],this.numberMovement=0}},{key:"play",value:function(e){var t=e[0],n=e[1];if(this.isAllowedToMove(this.currentPlayer,e)){if(this.weaponCell.includes("".concat(t).concat(n))){var a=document.querySelector('[data-id="'.concat(t).concat(n,'"]')).innerHTML;this.currentPlayer.setWeaponToDrop(this.currentPlayer.weapon);var o=document.querySelector('[data-id="'.concat(t).concat(n,'"]')).getAttribute("data-weapon"),i=JSON.parse(o),r=i.nom,c=i.force;"lagertha"===this.currentPlayer.nom?(console.log("lagerthta "+r),document.getElementById("weapon-Lagertha").innerHTML=a,document.getElementsByClassName("weapon-name")[0].innerHTML=r,this.currentPlayer.weapon=i,document.getElementsByClassName("weapon-force")[0].innerHTML=c):(console.log("auslaugh "+r),document.getElementById("weapon-Aslaug").innerHTML=a,document.getElementsByClassName("weapon-name")[1].innerHTML=r,document.getElementsByClassName("weapon-force")[1].innerHTML=c,this.currentPlayer.weapon=i)}this.move(this.currentPlayer,e),this.currentPlayer.move(e),3===this.numberMovement&&(console.log("this.numberMovement  ="+this.numberMovement),this.changePlayer(),this.changeStatusPlayer())}}}])&&i(t.prototype,n),o&&i(t,o),e}();function c(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var s=function(){function e(t,n,a,o,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.nom=t,this.position={ligne:Math.round(Math.random()*n),col:Math.round(Math.random()*a)},this.image=o,this.weapon=i,this.weaponToDrop,this.lifePoints=100,this.fightAttack=!0}var t,n,a;return t=e,(n=[{key:"move",value:function(e){var t=e[0],n=e[1];this.position.ligne=t,this.position.col=n}},{key:"setWeaponToDrop",value:function(e){this.weaponToDrop=e}}])&&c(t.prototype,n),a&&c(t,a),e}();function l(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var u=function(){function e(t,n,a,o,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.nbLigne=t,this.nbCol=n,this.pers=[a,o],this.map,this.weapons=i,this.currentPlayer=this.pers[0],this.indexPlayer=0,this.createMap(),this.listenToMoveAndPlay()}var t,n,a;return t=e,(n=[{key:"createMap",value:function(){this.map=new r(this.nbLigne,this.nbCol,document.getElementById("carte"),this.pers,this.weapons),this.map.currentPlayer=this.currentPlayer}},{key:"listenToMoveAndPlay",value:function(){console.log("listenToMoveAndPlay"),this.map.listenMovement(),this.map.changeStatusPlayer()}}])&&l(t.prototype,n),a&&l(t,a),e}(),h=new o("hache",10,10,"axe.png",20),d=new o("épée",10,10,"sword2.png",30),p=new o("arc",10,10,"bow.png",15),f=new o("marteau",10,10,"hammer.png",20),g=new o("brindille",0,0,"twig.png",10),m=new o("brindille",0,0,"twig2.png",10),y=[h,d,p,f];new u(10,10,new s("lagertha",10,10,"lagertha.png",g),new s("aslaug",10,10,"aslaug.png",m),y)}});