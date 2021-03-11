document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const width = 8;
  const squres = [];
  // const candyColor = ["red", "yellow", "green", "orange", "blue", "gray"];
  const candyColor = [
    "url(images/blue-candy.png)",
    "url(images/red-candy.png)",
    "url(images/green-candy.png)",
    "url(images/orange-candy.png)",
    "url(images/purple-candy.png)",
    "url(images/yellow-candy.png)",
  ];
  let score = 0;
  let CountDown = 30;
  const scoreDisplay = document.getElementById("score");
  document.getElementById("gameTime").innerHTML = CountDown;
  function creatBoard() {
    for (i = 0; i < width * width; i++) {
      const squreShapes = document.createElement("div");
      //   squreShapes.setAttribute(
      //     "src",
      //     "images/candy-" + Math.floor(Math.random() * 8) + ".png"
      //   );
      //   squreShapes.setAttribute("class", "candy");
      squreShapes.setAttribute("draggable", true);
      grid.appendChild(squreShapes);
      squres.push(squreShapes);
      squreShapes.setAttribute("id", i);

      console.log(squres);
      let ranDomColor = Math.floor(Math.random() * candyColor.length);
      squreShapes.style.backgroundImage = candyColor[ranDomColor];
      //   console.log(ranDomColor)
    }
  }
  creatBoard();
  let colorBeingDrag;
  let colorBeingReplaced;
  let squareIdBeingReplaced;

  squres.forEach((item) => item.addEventListener("dragstart", dragStart));
  squres.forEach((item) => item.addEventListener("dragend", dragEnd));
  squres.forEach((item) => item.addEventListener("dragover", dragOver));
  squres.forEach((item) => item.addEventListener("dragenter", dragEnter));
  squres.forEach((item) => item.addEventListener("dragleave", dragLeave));
  squres.forEach((item) => item.addEventListener("drop", dragDrop));

  function dragStart() {
    (colorBeingDrag = this.style.backgroundImage),
      (squreIdBeingDroped = parseInt(this.id));
    console.log(colorBeingDrag);
    console.log(squreIdBeingDroped);
    console.log(this.id, "dragstart");
  }
  function dragEnd() {
    console.log(this.id, "dragEnd");
    let validMoves = [
      squreIdBeingDroped - 1,
      squreIdBeingDroped - width,
      squreIdBeingDroped + 1,
      squreIdBeingDroped + width,
    ];

    let validMove = validMoves.includes(squareIdBeingReplaced);
    console.log(validMove);
    // console.log(validMove[0])
    // console.log(squreIdBeingDroped-width)
    // console.log(squreIdBeingDroped+width)
    if (squareIdBeingReplaced && validMove) {
      squareIdBeingReplaced = null;
      console.log(null);
    } else if (squareIdBeingReplaced && !validMove) {
      squres[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
      squres[squreIdBeingDroped].style.backgroundImage = colorBeingDrag;
    } else squres[squreIdBeingDroped].style.backgroundImage = colorBeingDrag;
  }

  // Drop the box once when some have been cleared
  function moveBox() {
    for (i = 0; i < 55; i++) {
      if (squres[i + width].style.backgroundImage === "") {
        squres[i + width].style.backgroundImage =
          squres[i].style.backgroundImage;
        squres[i].style.backgroundImage = "";
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
        firstRow.includes(i);
        if (firstRow && squres[i].style.backgroundImage == "") {
          let ranDomColor = Math.floor(Math.random() * candyColor.length);
          squres[i].style.backgroundImage = candyColor[ranDomColor];
        }
      }
    }
  }

  let clickSound = document.createElement("audio");
  clickSound.setAttribute("src", "sounds/sound.mp3");

  // Checking for matches
  // check for Row Same 4
  function checkRowForFour() {
    for (i = 0; i < 60; i++) {
      let rowOffFour = [i, i + 1, i + 2, i + 3];

      //  console.log(rowOffThree)
      let decidedColor = squres[i].style.backgroundImage;
      // console.log(decidedColor)
      let isBlank = squres[i].style.backgroundImage === "";
      let notValid = [
        5.6,
        7,
        13,
        14,
        15,
        21,
        22,
        23,
        29,
        30,
        31,
        37,
        38,
        39,
        45,
        46,
        47,
        53,
        54,
        55,
      ];
      if (notValid.includes(i)) continue;
      if (
        rowOffFour.every(
          (index) =>
            squres[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        (clickSound.currentTime = 0), clickSound.play();
        score += 4;
        scoreDisplay.innerHTML = score;

        rowOffFour.forEach((index) => {
          squres[index].style.backgroundImage = "";
        });
      }
    }
  }
  // console.log(score);

  // document.getElementsByTagName('div').style.animation="blink 7s linear "
  function checkColForFour() {
    for (i = 0; i < 47; i++) {
      // console.log(width)
      let colOffFour = [i, i + width, i + width * 2, i + width * 3];
      //  console.log(colOffThree)
      let decidedColor = squres[i].style.backgroundImage;
      // console.log(decidedColor)
      let isBlank = squres[i].style.backgroundImage === "";
      if (
        colOffFour.every(
          (index) =>
            squres[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        (clickSound.currentTime = 0), clickSound.play();
        score += 4;
        scoreDisplay.innerHTML = score;
        console.log(score);
        colOffFour.forEach((index) => {
          squres[index].style.backgroundImage = "";
        });
      }
    }
  }

  // check for Row Same 3
  function checkRowForThree() {
    for (i = 0; i < 61; i++) {
      let rowOffThree = [i, i + 1, i + 2];
      //  console.log(rowOffThree)
      let decidedColor = squres[i].style.backgroundImage;
      // console.log(decidedColor)
      let isBlank = squres[i].style.backgroundImage === "";
      let notValid = [6, 7, 14, 15, 22, 23, 30, 31, , 38, 39, 46, 47, 54, 55];
      if (notValid.includes(i)) continue;
      if (
        rowOffThree.every(
          (index) =>
            squres[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        (clickSound.currentTime = 0), clickSound.play();
        score += 3;
        console.log(score);
        scoreDisplay.innerHTML = score;

        rowOffThree.forEach((index) => {
          squres[index].style.backgroundImage = "";
        });
      }
    }
  }
  // console.log(score);

  // document.getElementsByTagName('div').style.animation="blink 7s linear "

  function checkColForThree() {
    for (i = 0; i < 47; i++) {
      // console.log(width)

      let colOffThree = [i, i + width, i + width * 2];
      //  console.log(colOffThree)
      let decidedColor = squres[i].style.backgroundImage;
      // console.log(decidedColor)
      let isBlank = squres[i].style.backgroundImage === "";
      if (
        colOffThree.every(
          (index) =>
            squres[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        (clickSound.currentTime = 0), clickSound.play();
        score += 3;
        scoreDisplay.innerHTML = score;
        console.log(score);
        colOffThree.forEach((index) => {
          squres[index].style.backgroundImage = "";
        });
      }
    }
  }

  function gameStarted() {
 
    let startGame = document.getElementById("startBtn");
    startGame.onclick = (evt) => {
      splash_Screen.classList.add("hide");
      this.audio = document.createElement("audio");
      this.audio.setAttribute("src", "sounds/splashS.mp3");
      console.log("clicked");
      
      checkRowForFour();
      checkColForFour();
      checkRowForThree();
      checkColForThree();
      this.audio.play();
      // game_screen.classList.remove("hide");
      window.setInterval(() => {
        moveBox();
        checkRowForFour();
        checkColForFour();
        checkRowForThree();
        checkColForThree();
      }, 100);
      GameOver();
    };
  }

  gameStarted();

  // GAme Over
  function GameOver() {
    let TimeOut = setInterval(handelCountDown, 1000);
    
    function handelCountDown() {
      if (CountDown > 0) {
        CountDown--;
        document.getElementById("gameTime").innerHTML = CountDown;
        if (CountDown === 0) {
          console.log("game over");
          splash_Screen.classList.remove("hide");
          game_over_screen.classList.remove("hide");
          this.audio.pause();
          setTimeout(() => {
            clearInterval(TimeOut);
            score = 0;
            scoreDisplay.innerHTML = score;
            console.log(score);
            game_over_screen.classList.add("hide");
            // creatBoard();
            CountDown = 30;
            document.getElementById("gameTime").innerHTML = CountDown;
          }, 3000);
          console.log(CountDown);
          document.getElementById("gameTime").innerHTML = CountDown;
        }
      }
    }
  }
  GameOver();


  // Checking for matches

  function dragOver(e) {
    e.preventDefault();
    console.log(this.id, "dragover");
  }
  function dragEnter() {
    console.log(this.id, "dragEnter");
  }
  function dragLeave() {
    console.log(this.id, "dragLeave");
  }
  function dragDrop() {
    console.log(this.id, "dragDrop");
    colorBeingReplaced = this.style.backgroundImage;
    this.style.backgroundImage = colorBeingDrag;
    console.log(colorBeingDrag);
    squareIdBeingReplaced = parseInt(this.id);
    console.log();
    squres[squreIdBeingDroped].style.backgroundImage = colorBeingReplaced;
  }
});
