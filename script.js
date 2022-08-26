import ancientsData from "./data/ancients.js";
import blueCardsData from "./data/mythicCards/blue/index.js";
import brownCardsData from "./data/mythicCards/brown/index.js";
import greenCardsData from "./data/mythicCards/green/index.js";



const ancientSelectButton = document.querySelector('.ancient-select-button');
const ancientSelect = document.querySelector('.ancient-select');
const ancientSelected = document.querySelector('.ancient-selected');
const ancient = document.querySelectorAll('.ancient');
const difficultyButton = document.querySelectorAll('.difficulty-button');
const shuffleDeck = document.querySelector('.shuffle-deck');
const cardCounter = document.querySelector('.card-counter');
const cardFace = document.querySelector('.card-face');
const cardShirt = document.querySelector('.card-shirt');



//myAncientSelected переставить на значение по умолчанию {}
let myAncientSelected = {};//ancientsData[0];
//Изменить myDifficulty на 2
let myDifficulty = 2;
let myDeck = [[],[],[]];
let myCount = [[0,0,0],
               [0,0,0],
               [0,0,0]];
let cardOnTable = {};


function RandomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}



function ancientInstallToSelectList () {
    ancient.forEach((item, index) => {
        item.style.background = `center/contain no-repeat url('${ancientsData[index].cardFace}')`;
    })
}

//подбор карт

function shuffleStartDeck (tempCardsDeck) {
    let r = RandomNum(tempCardsDeck.length, tempCardsDeck.length * 2);
    for (let i = 0; i < r; i++) {
        tempCardsDeck.sort(() => {
            return Math.random() - 0.5;
        })
    }
    return tempCardsDeck;
}

function shuffleVeryEasyHardDeck (firstStageCard, secondStageCard, thirdStageCard, randomSortCardsDeck) {
    if (myDifficulty === 0 || myDifficulty === 4) {
        let needCard = firstStageCard + secondStageCard + thirdStageCard;
        let fBl = firstStageCard;
        let sBl = secondStageCard;
        let tBl = thirdStageCard;
        let easyHard = 0; //Сколько всего карт этой сложности есть в колоде
        let needEasyHard = 0, needNormal = 0; // Сколько нужно карт каждой сложности
        let strDifficulty;

        if (myDifficulty === 0) {strDifficulty = 'easy'}
        if (myDifficulty === 4) {strDifficulty = 'hard'}

        randomSortCardsDeck.forEach((item) => {
            if (item.difficulty === strDifficulty) {
                easyHard++;
            }
        })
        if (easyHard < needCard) {
            needEasyHard = easyHard;
            needNormal = needCard - needEasyHard;
        } else {
            needEasyHard = needCard;
        }
        randomSortCardsDeck.forEach((item) => {
            if (item.difficulty === strDifficulty && needEasyHard > 0){
                if (fBl > 0) {
                    myDeck[0].push(item);
                    fBl--;
                } else if (sBl > 0) {
                    myDeck[1].push(item);
                    sBl--;
                } else if (tBl > 0) {
                    myDeck[2].push(item);
                    tBl--;
                }
                needEasyHard--;
            }
            if (item.difficulty === 'normal' && needNormal > 0){
                if (fBl > 0) {
                    myDeck[0].push(item);
                    fBl--;
                } else if (sBl > 0) {
                    myDeck[1].push(item);
                    sBl--;
                } else if (tBl > 0) {
                    myDeck[2].push(item);
                    tBl--;
                }
                needNormal--;
            }
        })
    } else {console.log('error: the selected difficulty is not a Very easy or Very hard')}
}  

function shuffleEasyHardDeck (firstStageCard, secondStageCard, thirdStageCard, randomSortCardsDeck) {
    if (myDifficulty === 1 || myDifficulty === 3) {
        let fBl = firstStageCard;
        let sBl = secondStageCard;
        let tBl = thirdStageCard;
        let strDifficulty;

        if (myDifficulty === 1) {strDifficulty = 'hard'}
        if (myDifficulty === 3) {strDifficulty = 'easy'}

        randomSortCardsDeck.forEach((item) => {
            if (item.difficulty !== strDifficulty){
                if (fBl > 0) {
                    myDeck[0].push(item);
                    fBl--;
                } else if (sBl > 0) {
                    myDeck[1].push(item);
                    sBl--;
                } else if (tBl > 0) {
                    myDeck[2].push(item);
                    tBl--;
                }
            }
        })
    } else {console.log('error: the selected difficulty is not a Easy or Hard')}
}

function shuffleNormalDeck (firstStageCard, secondStageCard, thirdStageCard, randomSortCardsDeck) {
    if (myDifficulty === 2) {
        let fBl = firstStageCard;
        let sBl = secondStageCard;
        let tBl = thirdStageCard;

        randomSortCardsDeck.forEach((item) => {
            if (fBl > 0) {
                myDeck[0].push(item);
                fBl--;
            } else if (sBl > 0) {
                myDeck[1].push(item);
                sBl--;
            } else if (tBl > 0) {
                myDeck[2].push(item);
                tBl--;
            }
        })
    } else {console.log('error: the selected difficulty is not a Normal')}
}

function shuffleEndDeck () {
    let r = RandomNum((myDeck[0].length + myDeck[1].length + myDeck[2].length) / 2, myDeck[0].length + myDeck[1].length + myDeck[2].length);
    for (let i = 0; i < r; i++) {
        myDeck[0].sort(() => {
            return Math.random() - 0.5;
        })
        myDeck[1].sort(() => {
            return Math.random() - 0.5;
        })
        myDeck[2].sort(() => {
            return Math.random() - 0.5;
        })
    }
    return myDeck;
}

function createDeck () {
    myDeck = [[],[],[]];
    let randomSortBlueCardsDeck = shuffleStartDeck(blueCardsData).slice(0);
    let randomSortBrownCardsDeck = shuffleStartDeck(brownCardsData).slice(0);
    let randomSortGreenCardsDeck = shuffleStartDeck(greenCardsData).slice(0);
    

    if (myDifficulty === 0 || myDifficulty === 4){
        shuffleVeryEasyHardDeck (
            myAncientSelected.firstStage.blueCards, 
            myAncientSelected.secondStage.blueCards, 
            myAncientSelected.thirdStage.blueCards, 
            randomSortBlueCardsDeck);
        shuffleVeryEasyHardDeck (
            myAncientSelected.firstStage.brownCards, 
            myAncientSelected.secondStage.brownCards, 
            myAncientSelected.thirdStage.brownCards, 
            randomSortBrownCardsDeck);
        shuffleVeryEasyHardDeck (
            myAncientSelected.firstStage.greenCards, 
            myAncientSelected.secondStage.greenCards, 
            myAncientSelected.thirdStage.greenCards, 
            randomSortGreenCardsDeck);
    }
    if (myDifficulty === 1 || myDifficulty === 3) {
        shuffleEasyHardDeck (
            myAncientSelected.firstStage.blueCards, 
            myAncientSelected.secondStage.blueCards, 
            myAncientSelected.thirdStage.blueCards, 
            randomSortBlueCardsDeck);
        shuffleEasyHardDeck (
            myAncientSelected.firstStage.brownCards, 
            myAncientSelected.secondStage.brownCards, 
            myAncientSelected.thirdStage.brownCards, 
            randomSortBrownCardsDeck);
        shuffleEasyHardDeck (
            myAncientSelected.firstStage.greenCards, 
            myAncientSelected.secondStage.greenCards, 
            myAncientSelected.thirdStage.greenCards, 
            randomSortGreenCardsDeck);
    }
    if (myDifficulty === 2) {
        shuffleNormalDeck (
            myAncientSelected.firstStage.blueCards, 
            myAncientSelected.secondStage.blueCards, 
            myAncientSelected.thirdStage.blueCards, 
            randomSortBlueCardsDeck);
        shuffleNormalDeck (
            myAncientSelected.firstStage.brownCards, 
            myAncientSelected.secondStage.brownCards, 
            myAncientSelected.thirdStage.brownCards, 
            randomSortBrownCardsDeck);
        shuffleNormalDeck (
            myAncientSelected.firstStage.greenCards, 
            myAncientSelected.secondStage.greenCards, 
            myAncientSelected.thirdStage.greenCards, 
            randomSortGreenCardsDeck);
    }
    shuffleEndDeck ();
}

//Показать колоду

function initCounter () {
    myCount = [[0,0,0],
               [0,0,0],
               [0,0,0]];
    myDeck.forEach((item, index) => {
        item.forEach((item) => {
            if (item.color === 'blue') {
                myCount[index][0] += 1;
            }
            if (item.color === 'brown') {
                myCount[index][1] += 1;
            }
            if (item.color === 'green') {
                myCount[index][2] += 1;
            }
        })
    })
}

function showCounter () {
    cardCounter.childNodes[3].childNodes[1].textContent = `${myCount[0][0]}`;
    cardCounter.childNodes[3].childNodes[3].textContent = `${myCount[0][1]}`;
    cardCounter.childNodes[3].childNodes[5].textContent = `${myCount[0][2]}`;
    cardCounter.childNodes[7].childNodes[1].textContent = `${myCount[1][0]}`;
    cardCounter.childNodes[7].childNodes[3].textContent = `${myCount[1][1]}`;
    cardCounter.childNodes[7].childNodes[5].textContent = `${myCount[1][2]}`;
    cardCounter.childNodes[11].childNodes[1].textContent = `${myCount[2][0]}`;
    cardCounter.childNodes[11].childNodes[3].textContent = `${myCount[2][1]}`;
    cardCounter.childNodes[11].childNodes[5].textContent = `${myCount[2][2]}`;
}

//управление колодой

function showCardShirt () {
    if (myDeck[2].length > 0) {
        cardShirt.style.background = 'center/contain no-repeat url("./assets/mythicCardBackground.png")';
    } else {
        cardShirt.style.backgroundImage = 'none';
    }
}

function showCardFace () {
    if (myDeck[0].length > 0) {
        cardOnTable = myDeck[0].pop();
        if (cardOnTable.color === 'blue') {
            myCount[0][0] -= 1;
        }
        if (cardOnTable.color === 'brown') {
            myCount[0][1] -= 1;
        }
        if (cardOnTable.color === 'green') {
            myCount[0][2] -= 1;
        }
    } else if (myDeck[1].length > 0) {
        cardOnTable = myDeck[1].pop();
        if (cardOnTable.color === 'blue') {
            myCount[1][0] -= 1;
        }
        if (cardOnTable.color === 'brown') {
            myCount[1][1] -= 1;
        }
        if (cardOnTable.color === 'green') {
            myCount[1][2] -= 1;
        }
    } else if (myDeck[2].length > 0) {
        cardOnTable = myDeck[2].pop();
        if (cardOnTable.color === 'blue') {
            myCount[2][0] -= 1;
        }
        if (cardOnTable.color === 'brown') {
            myCount[2][1] -= 1;
        }
        if (cardOnTable.color === 'green') {
            myCount[2][2] -= 1;
        }
    }
    cardFace.style.background = `center/contain no-repeat url("${cardOnTable.cardFace}")`;
    showCardShirt();
    console.log(myDeck)
    showCounter();
}







ancientInstallToSelectList();
myAncientSelected = ancientsData[0];
ancientSelected.style.background = `center/contain no-repeat url('${myAncientSelected.cardFace}')`
ancientSelected.childNodes[0].style.display = 'none';

difficultyButton[myDifficulty].classList.add('difficulty-select');

ancientSelectButton.addEventListener('click', () => {
    ancientSelect.classList.toggle('ancient-select-close')
})

ancient.forEach((item, index) => {
    item.addEventListener('click', () => {
        myAncientSelected = ancientsData[index];
        ancientSelected.style.background = `center/contain no-repeat url('${myAncientSelected.cardFace}')`
        ancientSelect.classList.add('ancient-select-close');
        ancientSelected.childNodes[0].style.display = 'none';
    })
})

difficultyButton.forEach((item, index) => {
    item.addEventListener('click', () => {
        myDifficulty = index;
        difficultyButton.forEach((item) => {
            item.classList.remove('difficulty-select');
        })
        item.classList.add('difficulty-select');
    })
})

shuffleDeck.addEventListener('click', () => {
    createDeck();
    initCounter();
    showCounter();
    showCardShirt();
    cardOnTable = {};
    cardFace.style.background = `none`;
})

cardShirt.addEventListener('click', () => {
    showCardFace();
})


