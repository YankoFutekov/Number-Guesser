/* RULES
  - Player must guess a number between a min/max
  - Player gets a certain amount of guesses
  - Notify the player of guesses remaining
  - Display the correct answer if they lose
  - Give the player the option to play again
*/

//Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//Assign UI min/max
  minNum.textContent = min;
  maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});


//Listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);
  //Validate
  if(isNaN(guess) || guess < min || guess > max){
  setMessage(`Enter a number between ${min} & ${max}`, 'red');
}
  //Game over - won
  if(guess === winningNum){
    gameOver(true, `${winningNum} is correct!`);
  }else{
//Wrong number
  guessesLeft -= 1;
  if(guessesLeft === 0){
    //Game over - lost
    gameOver(false, `You've lost, the correct number was ${winningNum}`);
    }else{
    //Game continues - answer wrong
    //Change border color
    guessInput.style.borderColor = 'red';
    //Clear input
    guessInput.value = '';
    //Set message
    setMessage(`${guess} is not correct, ${guessesLeft} guesses left`);
    }
  }
});

//Game over
function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';
  //Disable input (game over - won)
  guessInput.disabled = true;
  //Change border color
  guessInput.style.borderColor = color;
  //Change text color
  message.style.color = color;
  //Set message
  setMessage(msg);
  //Play again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

//Get winning number
function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

//Set message
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}