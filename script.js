const hangmanImage=document.querySelector(".hangman-box img");
const wordDisplay=document.querySelector(".word-display");
const guessesText=document.querySelector(".guesses-text b");
const keyboardDiv=document.querySelector(".keyboard");
const gameModel=document.querySelector(".game-modal");
const playAgainBtn=document.querySelector(".play-again")

let currentWord , correctLetters,wrongGuessCount;
const maxGuesses=6;

const resetGame = () => {
    // Resetting all game varaibles and UI elements
    correctLetters=[];
    wrongGuessCount=0;
    hangmanImage.src=`hangman-${wrongGuessCount}.PNG`;
    guessesText.innerText=`${wrongGuessCount}/${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML=currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModel.classList.remove("show");
}

const getRandomWord = () => {
    // Selecting a randome word and hint from the wordList
    const{word , hint}=wordList[Math.floor(Math.random() * wordList.length)];
    currentWord=word;
    console.log(word);
    document.querySelector(".hint-text b").innerText=hint;
    resetGame();
}

const gameOver=(isVictory) => {
    //After 600ms of game complete.. Showing model with relevent details.
    setTimeout(() => {
        const modelText=isVictory ? `You found the word :`: `The correct word was :`;
        gameModel.querySelector("img").src = `${isVictory ? 'smile' : 'lost'}.gif`;
        gameModel.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
        gameModel.querySelector("p").innerHTML = `${modelText} <b>${currentWord}</b>`;
        gameModel.classList.add("show");

    },300)
}

const initGame=(button,clickedLetter) =>{
    //checking if clickedLetter is exist on the currentWord
    if(currentWord.includes(clickedLetter)){
       // console.log(clickedLetter," is exist on the word");
       [...currentWord].forEach((letter,index) => {
        // Showing all correct letters on the word display
            if(letter===clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText=letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
       })
    }else{
       // console.log(clickedLetter," is not exist on the word");
       //If clicked letter doesn't exist then update the wrongGuessCount and hnagman image
       wrongGuessCount++;
       hangmanImage.src=`hangman-${wrongGuessCount}.PNG`;
    }

    button.disabled=true;
    guessesText.innerText=`${wrongGuessCount}/${maxGuesses}`;

  //  correctLetters.push(letter);

    // Calling gameover function if any of these condition meets
    if(wrongGuessCount===maxGuesses) return gameOver(false);
    if(correctLetters.length===currentWord.length) return gameOver(true);


}

// Creating keyboard buttons and adding eventListeners
for(let i=97;i<122;i++){
    const button=document.createElement("button");
    button.innerText=String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click",e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener("click",getRandomWord);
