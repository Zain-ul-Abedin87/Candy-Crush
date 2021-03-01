document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const width = 8;
  const squres = [];
  const candyColor = ["red", "yellow", "green", "orange", "blue", "gray"];
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

      // console.log(squres)
      let ranDomColor = Math.floor(Math.random() * candyColor.length);
      squreShapes.style.backgroundColor = candyColor[ranDomColor];
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
    (colorBeingDrag = this.style.backgroundColor),
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
      
    }
  }
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
    colorBeingReplaced = this.style.backgroundColor;
    this.style.backgroundColor = colorBeingDrag;
    console.log(colorBeingDrag);
    squareIdBeingReplaced = parseInt(this.id);
    console.log();
    squres[squreIdBeingDroped].style.backgroundColor = colorBeingReplaced;
  }
});
