let btnRef = document.querySelectorAll(".button");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.querySelector(".newGame");
let restartBtn = document.querySelector(".reset");
let msgRef = document.querySelector(".winmsg");
let chancebtn = document.querySelector(".chance");
let image = document.querySelector(".img");
//Winning Pattern Array
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];
//Player 'X' plays first
let xTurn = true;
let count = 0;

//Disable All Buttons
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  //enable popup
  popupRef.classList.remove("hide");
};

//Enable all buttons (For New Game and Restart)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
    xTurn = true;
  });
  //disable popup
  popupRef.classList.add("hide");
};

//This function is executed when a player wins
const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    msgRef.innerText = "Congratulations, X Wins";
    image.style.height = "20vmin";
    newgameBtn.innerText = "New Game";
    chancebtn.innerText ="";
  } else {
    msgRef.innerText = "Congratulations, O Wins";
    image.style.height = "20vmin";
    newgameBtn.innerText = "New Game";
    chancebtn.innerText ="";
  }
};

//Function for draw
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "It's a Draw";
  newgameBtn.innerText = "New Game";
  chancebtn.innerText ="";
};

//New Game
newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
  chancebtn.innerText = "X Turn";
});
restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
  chancebtn.innerText = "X Turn";
});

//Win Logic
const winChecker = () => {
  //Loop through all win patterns
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];
    //Check if elements are filled
    //If 3 empty elements are same and would give win as would
    if (element1 != "" && (element2 != "") & (element3 != "")) {
      if (element1 == element2 && element2 == element3) {
        //If all 3 buttons have same values then pass the value to winFunction
        winFunction(element1);
      }
    }
  }
};

//Display X/O on click
btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      //Display X
      element.innerText = "X";
      element.disabled = true;
      chancebtn.innerText = "O Turn"

    } else {
      xTurn = true;
      //Display Y
      element.innerText = "O";
      element.disabled = true;
      chancebtn.innerText = "X Turn";
    }
    //Increment count on each click
    count += 1;
    if (count == 9) {
      drawFunction();
    }
    //Check for win on every click
    winChecker();
  });
});
//Enable Buttons and disable popup on page load
// window.onload = enableButtons;