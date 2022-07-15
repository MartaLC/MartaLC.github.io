    /**
    partOne : array
    Première partie de mes phrases.
    **/
    let partOne = [
		'Un oiseau ',
        'Quelqu\'un ',
        'Un poëte ',
        'Un chanteur ',
        'Un homme ',

	]

    /**
    partTwo : array
    Deuxième partie de mes phrases.
    **/
	let partTwo = [
		' est assis joyeusement sur le banc ',
        ' se souvient toujours des moments heureux ',
        ' chante haut et fort ',
        ' parle avec la nature '

	]


    /**
    partThree : array
    Troisième partie de mes phrases.
    **/
	let partThree = [
		'parce que le ciel est bleu.',
        'quand le soleil brille.',
        'avec satisfaction.',
        'tout simplement parce qu\'il peut le faire.'
	]

    /**
    randomSentence : function
    return : string
    param partOne : array
    param partTwo : array
    param partThree : array
    Générer une phrase aléatoire.
    **/
	const randomSentence = (partOne,partTwo,partThree)=>
 	{
        let randomPartOne=Math.round(Math.random() * (partOne.length-1));
        let randomPartTwo=Math.round(Math.random() * (partTwo.length-1));
        let randomPartThree=Math.round(Math.random() * (partThree.length-1));
           
        return partOne[randomPartOne]+partTwo[randomPartTwo]+partThree[randomPartThree];
	}

    //La phrase générée s'affiche dans la zone du conteneur.
    document.querySelector(".container p").innerHTML = randomSentence(partOne, partTwo, partThree);
