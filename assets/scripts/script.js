//MAIN
const main = document.querySelector('main')
// BUTTONS
const allButton = document.querySelectorAll('button')
const btnPlay = document.querySelector('.btn-play')
const btnSettings = document.querySelector('.btn-settings')
const btnHowToPlay = document.querySelector('.btn-howToPlay')
const btnCredits = document.querySelector('.btn-credits')
//BACK BUTTON
const btnBackHome = document.querySelector('.btn-backToHome')
const btnBackHomes = document.querySelector('.btn-backToHomes')
const btnBackMain = document.querySelector('.btn-backToMain')
const btnBackToSetting = document.querySelector('.btn-backToSetting')
//PAGES
const pageHome = document.querySelector('.page-main')
const pageLevel = document.querySelector('.page-selectLevel')
const pageSettings = document.querySelector('.page-settings')
const pageCredit = document.querySelector('.page-credit')
const pagehowToPlay = document.querySelector('.page-howToPlay')

//SELECT LEVEL
const levelBeginner = document.querySelector('#level-beginner')
const levelIntermidiate = document.querySelector('#level-intermidiate')
const levelAdvanced = document.querySelector('#level-advanced')

// Background music
// const backgroundMusic = document.querySelector('.backgroundMusic')
const backgroundMusic = new Audio('/MagicSquare/assets/soundEffect/bMusic.mp3')
const buttonHoverMusic = new Audio('/MagicSquare/assets/soundEffect/buttonHover.mp3')
const winner = new Audio('/MagicSquare/assets/soundEffect/win.mp3')
const tryAgain = new Audio('/MagicSquare/assets/soundEffect/tryAgain.mp3')
const music = document.getElementsByName('music')
let musicStatus = true

window.addEventListener('load', () => {
    playBackgroundMusic()
    music[0].checked = true

})

//Problem status 1 is solved or to be solve 0 is not solve
let problemStatus = {
    'beginner' : [1,0,0,0,0,0],
    'intermidiate' : [1,0,0,0,0,0],
    'advanced' : [1,0,0,0,0,0],
}

// SETTINGS
let btnSaveSetting = document.querySelector('.btn-saveSetting')
btnSaveSetting.addEventListener('click', applySetting)
function applySetting() {
    playButtonMusic()
    
      
    for(let i = 0; i < music.length; i++) {
        if(!music[i].checked){
            musicStatus = true
            playBackgroundMusic()
            
        }
        else{
            musicStatus = false
            pauseBackgroundMusic()
        }
    }
}

btnCredits.addEventListener('click', () => {
    playButtonMusic()
    pageCredit.classList.add(myClasses.showPage, myClasses.animationZoom)
    pageCredit.classList.remove(myClasses.hidePage)

    pageSettings.classList.remove(myClasses.showPage, myClasses.animationZoom)
    pageSettings.classList.add(myClasses.hidePage)
})

btnBackToSetting.addEventListener('click', () => {
    playButtonMusic()
    pageCredit.classList.add(myClasses.hidePage)
    pageCredit.classList.remove(myClasses.showPage, myClasses.animationZoom)

    pageSettings.classList.remove(myClasses.hidePage)
    pageSettings.classList.add(myClasses.showPage, myClasses.animationZoom)
})

// INSTRUCTION
btnHowToPlay.addEventListener('click', () => {
    playButtonMusic()
    pageHome.classList.add(myClasses.hidePage)
    pageHome.classList.remove(myClasses.showPage, myClasses.animationZoom)

    pagehowToPlay.classList.add(myClasses.showPage, myClasses.animationZoom)
    pagehowToPlay.classList.remove(myClasses.hidePage)
})

btnBackMain.addEventListener('click', () => {
    playButtonMusic()
    pageHome.classList.add(myClasses.showPage, myClasses.animationZoom)
    pageHome.classList.remove(myClasses.hidePage)

    pagehowToPlay.classList.add(myClasses.hidePage)
    pagehowToPlay.classList.remove(myClasses.showPage, myClasses.animationZoom)
})

// when play button is click hide pageHome show pageLevel
btnPlay.addEventListener('click', () => {
    playButtonMusic()

    // hide pageHome
    pageHome.classList.add(myClasses.hidePage)
    pageHome.classList.remove(myClasses.showPage)

    // show pageLevel
    pageLevel.classList.add(myClasses.showPage , myClasses.animationZoom)
    pageLevel.classList.remove(myClasses.hidePage)
})

// when back button is click hide pagelevel show pageHome
btnBackHome.addEventListener('click', () => {
    playButtonMusic()

    //show pageHome
    pageHome.classList.add(myClasses.showPage , myClasses.animationZoom)
    pageHome.classList.remove(myClasses.hidePage)

    //hide pageLevel
    pageLevel.classList.add(myClasses.hidePage)
    pageLevel.classList.remove(myClasses.showPage , myClasses.animationZoom)
})

btnBackHomes.addEventListener('click', () => {
    playButtonMusic()
    //show pageHome
    pageHome.classList.add(myClasses.showPage, myClasses.animationZoom)
    pageHome.classList.remove(myClasses.hidePage)

    //hide pageLevel
    pageSettings.classList.add(myClasses.hidePage)
    pageSettings.classList.remove(myClasses.showPage, myClasses.animationZoom)
})

//function back to pageLevelPage
function backToLevelPage(){
    playButtonMusic()

    const pagePuzzle = document.querySelector('.'+myClasses.pageSelectPuzzle)
    // show pageLevel
    pageLevel.classList.add(myClasses.showPage, myClasses.animationZoom)
    pageLevel.classList.remove(myClasses.hidePage)

    // remove pagePuzzle
    main.removeChild(pagePuzzle)
}

//when level is selected display puzzles for the level:
//for beginner
levelBeginner.addEventListener('click', () => {
    playButtonMusic()

    // hide pageLevel
    pageLevel.classList.add(myClasses.hidePage)
    pageLevel.classList.remove(myClasses.showPage , myClasses.animationZoom)

    // show pagePuzzle
    //call function to create puzzle page
    createPuzzlePage(gameLevel.beginner)
})

//for intermidiate 
//finish all beginner to unlock this level

levelIntermidiate.addEventListener('click', () => {
    //check if the beginner level is finish
    if(problemStatus['beginner'].indexOf(0) == -1){
        playButtonMusic()

        // hide pageLevel
        pageLevel.classList.add(myClasses.hidePage)
        pageLevel.classList.remove(myClasses.showPage , myClasses.animationZoom)
    
        // show pagePuzzle
        //call function to create puzzle page
        createPuzzlePage(gameLevel.intermidiate)
    }
   
})

//for advanced
//finish all intermidiate to unlock this level
levelAdvanced.addEventListener('click', () => {
    if(problemStatus['intermidiate'].indexOf(0) == -1){
        playButtonMusic()

        // hide pageLevel
        pageLevel.classList.add(myClasses.hidePage)
        pageLevel.classList.remove(myClasses.showPage , myClasses.animationZoom)

        // show pagePuzzle
        //call function to create puzzle page
        createPuzzlePage(gameLevel.advanced)
    }
})

//create dynamic puzzle page
function createPuzzlePage(level){
    //create the container
    const containerClass = [myClasses.pageSelectPuzzle, myClasses.showPage, myClasses.flex, myClasses.fdCol, myClasses.alignCenter, myClasses.h100, myClasses.mx40 , myClasses.animationZoom]
    const newPuzzlePage = createElement(myElements.div, containerClass)
    main.appendChild(newPuzzlePage) 

    //create title for the page
    const titleClass = [myClasses.h10, myClasses.textCenter]
    const titleText = `SELECT ${level.toUpperCase()} PUZZLE`
    const puzzlePageTitle = createElement(myElements.p, titleClass, titleText)
    newPuzzlePage.appendChild(puzzlePageTitle) 

    //create back button container
    const backContainerClass = [myClasses.backBtnContainer, myClasses.h10]
    const puzzlePageBackContainer = createElement(myElements.div, backContainerClass)
    newPuzzlePage.appendChild(puzzlePageBackContainer)

    //create back button element
    const buttonClass = [myClasses.btnBackToLevel, myClasses.btnBack]
    const puzzlePageBack = createElement(myElements.button, buttonClass, '', 'click', backToLevelPage)
    puzzlePageBackContainer.appendChild(puzzlePageBack)
    

    //create text inside button
    const buttonTextClass = [myClasses.fa, myClasses.close]
    const buttonText = createElement(myElements.i, buttonTextClass )
    puzzlePageBack.appendChild(buttonText)

    //create tile puzzle parent
    const tileParentClass = [myClasses.pageSelectPuzzleContainer, myClasses.flex, myClasses.justifyAround, myClasses.flRow, myClasses.h80, myClasses.maxW45]
    const tileParent = createElement(myElements.div,tileParentClass)
    newPuzzlePage.appendChild(tileParent)

    //create div of problem puzzle
    puzzleTiles(6, level, tileParent)
}

//create puzzle tiles
function puzzleTiles(tileNumber, level, parent){
    for(let index = 0; index < tileNumber; index++){
        const tileOpenClasses = [myClasses.puzzle, myClasses.flex, myClasses.justifyCenter, myClasses.alignCenter, myClasses.buttonHover]
        const tileLockClasses = [myClasses.puzzle, myClasses.flex, myClasses.justifyCenter, myClasses.alignCenter, myClasses.magicDigits, myClasses.textWhite]
        let tile, tileTitle
        if(index == 0 || problemStatus[level.toLocaleLowerCase()][index] == 1){
            tile = createElement(myElements.div, tileOpenClasses, '', 'click',tileSelected, `puzzle-${level.toLowerCase()}-${index+1}`)
            tileTitle = createElement(myElements.p,'', `${index+1}`)
        }
        else{
            //lock puzzle
            tile = createElement(myElements.div, tileLockClasses, '', '',()=>{}, `puzzle-${level.toLowerCase()}-${index+1}`)
            tileTitle = createElement(myElements.i,[myClasses.fa, myClasses.lock])
        }
        
        parent.appendChild(tile)
        tile.appendChild(tileTitle)

    }
    
}

//called when a tile is click
function tileSelected(){
    playButtonMusic()
    
    const problemID = this.id.split('-')
    const problemMagicSum = identifyMagicSum(`${problemID[1]}Sum${problemID[2]}`) 
    createProblemPage(problemID[1],problemID[2], problemMagicSum )
    
    //hide puzzle page
    const hidePuzzlePage = document.querySelector('.page-selectPuzzle')
    hidePuzzlePage.classList.add(myClasses.hidePage)
    hidePuzzlePage.classList.remove(myClasses.showPage, myClasses.animationZoom)
    // main.removeChild(hidePuzzlePage)
}

//selec the obeject magicSum and return the key based on id as parameter
function identifyMagicSum(id){
    return magicSum[id]
}

//create puzzle problem page
function createProblemPage(level, problemNumber, magicSum){
    const problemId = `${level.toLowerCase()}-Container-${problemNumber}`
    //create problem page container
    const newProblemClasses = [myClasses.pageProblem, myClasses.flex, myClasses.fdCol, myClasses.alignCenter, myClasses.h100, myClasses.mx40, myClasses.animationZoom]
    const newProblem = createElement(myElements.div, newProblemClasses)
    newProblem.setAttribute('id', problemId)
    main.appendChild(newProblem)

    //create problem title
    const problemTitleClasses = [myClasses.h10, myClasses.textCenter]
    const problemText = `${level.toUpperCase()} ${problemNumber}: MAGIC SUM ${magicSum}`
    const problemTitle = createElement(myElements.p, problemTitleClasses, problemText)
    newProblem.appendChild(problemTitle)

    //create the magic square parent
    const magicSquareParentClasses = [myClasses.problemContainer, myClasses.flex, myClasses.justifyAround, myClasses.alignCenter, myClasses.flRow, myClasses.h60, myClasses.gap1]

    identityLevelSelected(level, magicSquareParentClasses) 

    const magicSquareParent = createElement(myElements.div, magicSquareParentClasses)
    newProblem.appendChild(magicSquareParent)

    createMagicSquareChild(level, problemNumber, magicSquareParent)

     //create problem button countainer
     const buttonContainerClasses = [myClasses.h10, myClasses.problemButtonContainer]
     const buttonContainer = createElement(myElements.div, buttonContainerClasses)
     newProblem.appendChild(buttonContainer)

    //create the button pause
    const btnPause = createElement(myElements.button,[myClasses.btnPause],'','click',createPauseModal)
    buttonContainer.appendChild(btnPause)

    //create the button check
    const btnCheck = createElement(myElements.button, [myClasses.btnCheck],'','click', checkUserAnswer)
    buttonContainer.appendChild(btnCheck)

    //Add icon in the button pause
    const pauseText = createElement(myElements.i, [myClasses.fa, myClasses.pause])
    btnPause.appendChild(pauseText)

    //Add icon in the button pause
    const checkText = createElement(myElements.i, [myClasses.fa, myClasses.check])
    btnCheck.appendChild(checkText)
}

//identify level dynamically
function identityLevelSelected(level, parent){
    switch(level.toLowerCase()){
        case gameLevel.beginner:
            return parent.push(myClasses.problemContainerBeginner)
        case gameLevel.intermidiate:
            return parent.push(myClasses.problemContainerIntermidiate)
        case gameLevel.advanced:
            return parent.push(myClasses.problemContainerAdvanced)
    } 
}

//funtion to identify number of box per level
function getSquareNumber(level){
    let square = 0
    switch(level.toLowerCase()){
        case gameLevel.beginner:
            return square = 3
        case gameLevel.intermidiate:
            return square = 4
        case gameLevel.advanced:
            return square = 5
    }  
}

//generate magic square tiles
function createMagicSquareChild(level, number, parent){
    let totalSquare = Math.pow(getSquareNumber(level),2)
    for(let index = 0; index < totalSquare; index++){
        const squareContainerClasses = [myClasses.problemChild, myClasses.flex, myClasses.justifyAround, myClasses.alignCenter]

        switch(level.toLowerCase()){
            case gameLevel.beginner:
                squareContainerClasses.push(myClasses.problemChildBeginner)
                break
            case gameLevel.intermidiate:
                squareContainerClasses.push(myClasses.problemChildIntermidiate)
                break
            case gameLevel.advanced:
                squareContainerClasses.push(myClasses.problemChildAdvanced)
                break
        }  
        const squareContainer = createElement(myElements.div,squareContainerClasses)
        parent.appendChild(squareContainer)

        const inputSquare = document.createElement('input')
        let digit = identifyMagicDigits(level, number)[index]
        inputSquare.setAttribute('type','number')
        inputSquare.setAttribute('id',`${index}`)
        inputSquare.setAttribute('value', digit)
        inputSquare.setAttribute('oninput', 'validity.valid||(value="0");')
        inputSquare.setAttribute('min', '0')
        //check if the square is default
        if(digit > 0){
            inputSquare.setAttribute('disabled', true)
            inputSquare.classList.add(myClasses.textWhite)
            squareContainer.classList.add(myClasses.magicDigits)
            inputSquare.classList.add(myClasses.magicDigits)
        }
        inputSquare.classList.add(myClasses.input)
        squareContainer.appendChild(inputSquare)

    }
}

function identifyMagicDigits(level, number){
    return magicDigits[level.toString()+number]
}

//create element functions
function createElement(element, classes, text, event, action, ids){
    const newElement = document.createElement(element)

    for(let index = 0; index < classes.length; index++){
        newElement.classList.add(classes[index])
    }

    newElement.textContent = text
    newElement.setAttribute('id', ids)
    newElement.addEventListener(event, action)
    return newElement
}

//create pause modal
function createPauseModal(){
    pauseBackgroundMusic()
    playButtonMusic()
    
    //create container
    const modalContainerClasses = [myClasses.modalContainer, myClasses.flex, myClasses.justifyCenter, myClasses.flRow, myClasses.alignCenter]
    const modalPauseContainer = createElement(myElements.div,modalContainerClasses)
    main.appendChild(modalPauseContainer)

    //create contents
    const modalContentClasses = [myClasses.modalSize, myClasses.flex, myClasses.alignCenter, myClasses.justifyCenter, myClasses.fdCol, myClasses.animationZoom, 'bgModal']
    const modalContent = createElement(myElements.div, modalContentClasses)
    modalPauseContainer.appendChild(modalContent)

    const modalTitle = createElement(myElements.h1, ['none'], 'MAGIC SQUARE')
    modalContent.appendChild(modalTitle)

    const modalIconContainer = createElement(myElements.div, [myClasses.warningSize])
    modalContent.appendChild(modalIconContainer)

    const modalIcon = createElement(myElements.i, [myClasses.pause, myClasses.fa])
    modalIconContainer.appendChild(modalIcon)

    const modalText = createElement(myElements.h1, ['none'], 'GAME PAUSE')
    modalContent.appendChild(modalText)
    

    //create button
    createModalButton('CONTINUE', modalContent, 'click', continueClick)
    createModalButton('QUIT GAME', modalContent, 'click', quitClick)
   
}

//create pause modal button
function createModalButton(title, parent, event, actionFunction){
    const modalButtonClasses = [myClasses.modalButton, myClasses.buttonHover]
    const button = createElement(myElements.button, modalButtonClasses,'',event, actionFunction)
    button.setAttribute('id',`${title.toLowerCase()}Button`)
    parent.appendChild(button)

    const buttonText = createElement(myElements.h1, [myClasses.fs30], title)
    button.appendChild(buttonText)
}

//modal button event
function continueClick(){
    playBackgroundMusic()
    playButtonMusic()

    const modalContainer = document.querySelector('.'+myClasses.modalContainer)
    main.removeChild(modalContainer)
}

function quitClick(){
    tryAgain.play()
    tryAgain.loop = false
    playBackgroundMusic()
    playButtonMusic()

    const home = document.querySelector('.'+myClasses.pageMain)
    const modalContainer = document.querySelector('.'+myClasses.modalContainer)
    const problemContainer = document.querySelector('.'+myClasses.pageProblem)
    const puzzlePage = document.querySelector('.'+ myClasses.pageSelectPuzzle)

    home.classList.add(myClasses.showPage, myClasses.animationZoom)
    home.classList.remove(myClasses.hidePage)

    main.removeChild(modalContainer)
    main.removeChild(problemContainer)
    main.removeChild(puzzlePage)
}

function tryAgainClick(){
    playBackgroundMusic()
    playButtonMusic()

    const modalContainer = document.querySelector('.'+myClasses.modalContainer)
    main.removeChild(modalContainer)
}

// called when button check is click
function checkUserAnswer(){
    playButtonMusic()
    // identify the problem and the magic sum
    const problem = document.querySelector('.page-problem')
    const problemDetails = problem.id.split('-')

    // TODO compute the input value
    if(computePattern(problemDetails, getAnswer())){
        tryAgainModal()
    }
    else{
        congratulationModal()
    }

}

// answer validation
function getAnswer(){
    // target the element input
    const inputArray = document.querySelectorAll('.input')
    //get the target element input value
    let answer = []
    inputArray.forEach((e) => {
        let input = parseInt(e.value)
        if(input == NaN){
            answer.push(0)
        }
        else{
            answer.push(input)
        }
    })
    return answer
}

// compute the sum of given value 
function getSum(...indexValue){
    return indexValue.reduce((total, value) => total + value, 0)
}

// contains the computation of indexes
function computePattern(problem, answer){
    let isWrong = false
    const getMagicSum = magicSum[`${problem[0]}Sum${problem[2]}`]
    const pattern = getPattern(problem[0].toLocaleLowerCase())

    for(let index = 0; index < pattern.length; index++){
        let total = getTotal(problem[0].toLocaleLowerCase(), answer, pattern, index)

        if(getMagicSum != total){
            return isWrong = true
        }
    }
    return isWrong
}

function getTotal(level, answer, pattern, index){
    let total 
    switch(level.toLocaleLowerCase()){
        case gameLevel.beginner:
            total = getSum(answer[pattern[index][0]], answer[pattern[index][1]], answer[pattern[index][2]])
            break
        case gameLevel.intermidiate:
            total = getSum(answer[pattern[index][0]], answer[pattern[index][1]], answer[pattern[index][2]], answer[pattern[index][3]] )
            break
        case gameLevel.advanced:
            total = getSum(answer[pattern[index][0]], answer[pattern[index][1]], answer[pattern[index][2]], answer[pattern[index][3]], answer[pattern[index][4]] )
            break
    }
    return total
}


function getPattern(level){
    let pattern
    switch(level.toLocaleLowerCase()){
        case gameLevel.beginner:
            pattern = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
            break
        case gameLevel.intermidiate:
            pattern = [[0,1,2,3], [4,5,6,7], [8,9,10,11], [12,13,14,15], 
                    [0,4,8,12], [1,5,9,13], [2,6,10,14], [3,7,11,15], 
                    [0,5,10,15], [3,6,9,12]]
            break
        case gameLevel.advanced:
            pattern = [[0,1,2,3,4], [5,6,7,8,9], [10,11,12,13,14], [15,16,17,18,19], [20,21,22,23,24],
                        [0,5,10,15,20], [1,6,11,16,21], [2,7,12,17,22], [3,8,13,18,23], [4,9,14,19,24],
                        [0,6,12,18,24], [4,8,12,16,20]] 
            break
    }
    return pattern
}

// create try again modal
function tryAgainModal(){
    pauseBackgroundMusic()
    tryAgain.play()
    tryAgain.loop = false

    //create container
    const modalContainerClasses = [myClasses.modalContainer, myClasses.flex, myClasses.justifyCenter, myClasses.flRow, myClasses.alignCenter]
    const modalPauseContainer = createElement(myElements.div,modalContainerClasses)
    main.appendChild(modalPauseContainer)

    //create contents
    const modalContentClasses = [myClasses.modalSize, myClasses.flex, myClasses.alignCenter, myClasses.justifyCenter, myClasses.fdCol, myClasses.animationZoom, 'bgModal']
    const modalContent = createElement(myElements.div, modalContentClasses)
    modalPauseContainer.appendChild(modalContent)

    const modalTitle = createElement(myElements.h1, ['none'], 'MAGIC SQUARE')
    modalContent.appendChild(modalTitle)

    const modalIconContainer = createElement(myElements.div, [myClasses.warningSize])
    modalContent.appendChild(modalIconContainer)

    const modalIcon = createElement(myElements.i, [myClasses.warning, myClasses.textRed, myClasses.fa])
    modalIconContainer.appendChild(modalIcon)

    const modalText = createElement(myElements.h1, [myClasses.textRed], 'WRONG ANSWER!')
    modalContent.appendChild(modalText)
    
    createModalButton('TRY AGAIN', modalContent, 'click', tryAgainClick)
    createModalButton('QUIT GAME', modalContent, 'click', quitClick)
}

// create congratulation modal
function congratulationModal(){
    winner.play()
    winner.loop = false

    //create container
    const modalContainerClasses = [myClasses.modalContainer, myClasses.flex, myClasses.justifyCenter, myClasses.flRow, myClasses.alignCenter, myClasses.congratulationBackground]
    const modalPauseContainer = createElement(myElements.div,modalContainerClasses)
    main.appendChild(modalPauseContainer)

    //create contents
    const modalContentClasses = [myClasses.modalSize, myClasses.flex, myClasses.alignCenter, myClasses.justifyCenter, myClasses.fdCol, myClasses.animationZoom, 'bgModal']
    const modalContent = createElement(myElements.div, modalContentClasses)
    modalPauseContainer.appendChild(modalContent)

    const modalTitle = createElement(myElements.h1, ['none'], 'MAGIC SQUARE')
    modalContent.appendChild(modalTitle)

    const modalIconContainer = createElement(myElements.div, [myClasses.warningSize])
    modalContent.appendChild(modalIconContainer)

    const modalIcon = createElement(myElements.i, [myClasses.check, myClasses.textGreen, myClasses.fa])
    modalIconContainer.appendChild(modalIcon)

    const modalText = createElement(myElements.h1, [myClasses.textGreen], 'CONGRATULATION!')
    modalContent.appendChild(modalText)
    
    const lastProblemID = document.querySelector('.'+myClasses.pageProblem).id
    const lastProblemDetatils = lastProblemID.split('-')
    if(parseInt(lastProblemDetatils[2]) != 6){
        createModalButton('NEXT PUZZLE', modalContent, 'click', nextPuzzleClick)
    }
    else{
        createModalButton('NEXT LEVEL', modalContent, 'click', nextLevelClick)
    }
    
    createModalButton('QUIT GAME', modalContent, 'click', quitClick)
}

//function next level
function nextLevelClick(){
    const modalContainer = document.querySelector('.'+myClasses.modalContainer)
    const problemContainer = document.querySelector('.'+myClasses.pageProblem)
    const puzzlePage = document.querySelector('.'+ myClasses.pageSelectPuzzle)
    const selectLevel = document.querySelector('.'+myClasses.pageLevel)
    const currentLevel = problemContainer.id.split('-')

    const intermidiateLevel = document.querySelector('#level-intermidiate')
    const advancedLevel = document.querySelector('#level-advanced')

   if(currentLevel[0] == gameLevel.beginner){
        intermidiateLevel.classList.remove(myClasses.magicDigits, myClasses.textWhite)
        intermidiateLevel.classList.add(myClasses.buttonHover)
   }
   if(currentLevel[0] == gameLevel.intermidiate){
        advancedLevel.classList.remove(myClasses.magicDigits, myClasses.textWhite)
        advancedLevel.classList.add(myClasses.buttonHover)
   }
    

    selectLevel.classList.add(myClasses.showPage, myClasses.animationZoom)
    selectLevel.classList.remove(myClasses.hidePage)

    main.removeChild(modalContainer)
    main.removeChild(problemContainer)
    main.removeChild(puzzlePage)
}

//function next puzzle
function nextPuzzleClick(){
    playButtonMusic()

    const modalContainer = document.querySelector('.' + myClasses.modalContainer)
    main.removeChild(modalContainer)

    const pageProblem = document.querySelector('.' + myClasses.pageProblem)
    const currentProblem = pageProblem.id.split('-')
    main.removeChild(pageProblem)

    const pagePuzzle = document.querySelector('.' + myClasses.pageSelectPuzzle)
    
    const nextProblem = document.querySelector(`#puzzle-${currentProblem[0]}-${parseInt(currentProblem[2])+ 1}`)

    problemStatus[currentProblem[0].toLocaleLowerCase()][parseInt(currentProblem[2])] = 1

    nextProblem.textContent = parseInt(currentProblem[2])+ 1
    nextProblem.classList.remove(myClasses.magicDigits, myClasses.textWhite)
    nextProblem.classList.add(myClasses.buttonHover)

    pagePuzzle.classList.remove(myClasses.hidePage)
    pagePuzzle.classList.add(myClasses.showPage, myClasses.animationZoom)

    nextProblem.addEventListener('click', tileSelected)

}

// all button when hover sound effect
function playButtonMusic(){
    buttonHoverMusic.play()
    buttonHoverMusic.loop = false
} 

function pauseButtonMusic(){
    buttonHoverMusic.pause()
    buttonHoverMusic.loop = false
} 

function playBackgroundMusic(){
    if(musicStatus){
        backgroundMusic.autoplay = true
        backgroundMusic.play()
        backgroundMusic.loop =true 
    }
   
}

function pauseBackgroundMusic(){
    backgroundMusic.pause()
}

// prevent user from reloading the page
window.addEventListener("keydown", (ev) => {
    if (ev.key === "r" && (ev.ctrlKey || ev.metaKey)) {
      ev.preventDefault() // Prevent browser reload on CTRL+R
    }
  });

// setting button
btnSettings.addEventListener('click', () => {
    playButtonMusic()
    pageHome.classList.add(myClasses.hidePage)
    pageHome.classList.remove(myClasses.showPage)

    pageSettings.classList.remove(myClasses.hidePage)
    pageSettings.classList.add(myClasses.showPage)
})