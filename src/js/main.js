import '../scss/main.scss';


let minesArray = [];
let minesCount = 10;
let rows = 10;
let cols = 10;
let cellCount = 100;

let colWidth = 40;
let colHeight = 40;

const minesAroundArray = [];

const root = document.querySelector('.root');
const canvas = document.createElement('canvas');
canvas.className = 'canvas';
root.appendChild(canvas);

window.addEventListener('load',function () {
  const ctx = canvas.getContext('2d');
  canvas.height = colHeight * cols;
  canvas.width = colWidth * rows;

  // Drawing the gameboard
  const drawBoard = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        ctx.strokeStyle = 'gray';
        ctx.strokeRect(i * colWidth,j * colHeight,colWidth,colHeight);
      }
    }
  }


  // Place the mines
  const placeMines = () => {

    for (let i = 0; i < minesCount; i++) {
      let mine = Math.ceil(Math.random() * minesCount);
      minesArray.push(mine);
    }

    console.log(minesArray);
  }

  // Exposing all mines (from downloaded img)
  const exposeMines = () => {
    for (let i = 0; i < cellCount; i++) {
      if (!isCellOpen[i]) {
        // console.log(i);
        // console.log(isCellOpen);

        let x = ((i) % cols) * colWidth;
        let y = (Math.floor(i / rows)) * colHeight;

        ctx.fillStyle = 'lightgray';
        ctx.fillRect(x,y,colWidth,colHeight);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(x,y,colWidth,colHeight);
      }
    }
    // console.log(isCellOpen);
    let mineImg = new Image();
    mineImg.addEventListener(
      "load",
      () => {
        for (let i = 0; i < rows; i++) {
          ctx.clearRect(((minesArray[i] - 1) * colWidth),i * colWidth,colWidth,colHeight);
          ctx.fillStyle = 'pink';
          ctx.fillRect(((minesArray[i] - 1) * colWidth),i * colWidth,colWidth,colHeight);
          ctx.strokeStyle = 'black';
          ctx.strokeRect(((minesArray[i] - 1) * colWidth),i * colWidth,colWidth,colHeight);
          ctx.drawImage(mineImg,((minesArray[i] - 1) * colWidth),i * colWidth);
        }
      },
      false
    );
    mineImg.src = "./assets/img/small-mine-40.png";

  }

  function getCursorPosition(canvas,event) {
    const rect = canvas.getBoundingClientRect()
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
    let rowClicki = Math.floor(y / 40) + 1;
    let colClickj = Math.floor(x / 40) + 1;
    // console.log("x: " + x + " y: " + y);
    // console.log("i: " + colClicki + " j: " + rowClickj);
    coords = [rowClicki,colClickj];
    return coords;
  }

  function randomExcluded(min,max,excluded) {
    var n = Math.floor(Math.random() * (max - min) + min);
    if (n >= excluded) n++;
    return n;
  }

  const checkFirstClick = () => {
    if (coords[1] == minesArray[coords[0] - 1]) {
      let newMine = randomExcluded(1,10,minesArray[coords[0] - 1]);
      minesArray.splice(coords[0] - 1,1,newMine);
      console.log(minesArray);
    }
  }
  // coords[1] == minesArray[coords[0] - 1]
  const isMine = (x,y) => {
    if (y == minesArray[x - 1]) {
      return true;
    } else {
      return false;
    }
  }

  const countMinesAround = (ipos,jpos) => {
    minesAround = 0;
    // cells on the row above, start from the left
    if (isMine(ipos - 1,jpos - 1)) {
      minesAround++;
    }
    if (isMine(ipos - 1,jpos)) {
      minesAround++;
    }
    if (isMine(ipos - 1,jpos + 1)) {
      minesAround++;
    }

    // cells on the same row, start from the left
    if (isMine(ipos,jpos - 1)) {
      minesAround++;
    }
    if (isMine(ipos,jpos + 1)) {
      minesAround++;
    }

    // cells on the row below, start from the left
    if (isMine(ipos + 1,jpos - 1)) {
      minesAround++;
    }
    if (isMine(ipos + 1,jpos)) {
      minesAround++;
    }
    if (isMine(ipos + 1,jpos + 1)) {
      minesAround++;
    }
    return minesAround;
  };

  const countMinesAroundAll = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        minesAroundArray.push(countMinesAround(i + 1,j + 1));
      }
    }
    return minesAroundArray;
  };

  const open = (i,j) => {

    if (i < 1 || j < 1 || i > rows || j > cols) {
      return;
    }

    if (!isMine(i,j)) {
      if (countMinesAround(i,j) == 0) {
        expandOpen(i,j);

        let cellIndex = ((i - 1) * rows) + j - 1;

      }
      else {
        // if there are mines Around
        // show minesAround
        showMinesAround(i,j);
      };
    } else {
      exposeMines();
    }
  }

  const styleOpenCell = (x,y) => {

    if (x < 1 || y < 1 || x > rows || y > cols) {
      return;
    }

    ctx.fillStyle = 'lightgray';
    ctx.fillRect((y * colWidth) - colWidth,(x * colHeight) - colHeight,colWidth,colHeight);
    ctx.strokeStyle = 'black';
    ctx.strokeRect((y * colWidth) - colWidth,(x * colHeight) - colHeight,colWidth,colHeight);

    let cellIndex = ((x - 1) * rows) + y - 1;
    isCellOpen.splice(cellIndex,1,true);
    // console.log(x, y, cellIndex, isCellOpen.splice(cellIndex,1,true))
  };

  const showMinesAround = (x,y) => {
    styleOpenCell(x,y);
    ctx.font = "35px Georgia";
    ctx.fillStyle = "red";
    ctx.textAlign = 'center'
    ctx.fillText(`${countMinesAround(x,y)}`,(y * colWidth) - colWidth / 2,(x * colHeight) - colHeight / 3.3);
  }

  const expandOpen = (i,j) => {

    if (i < 1 || j < 1 || i > rows || j > cols) {
      return;
    }

    let cellIndex = ((i - 1) * rows) + j - 1;

    if (minesAroundArray[cellIndex - 11] == 0 && !isCellOpen[cellIndex - 11]) {
      styleOpenCell(i - 1,j - 1);
      open(i - 1,j - 1);
    }
    else if (minesAround[cellIndex - 11] !== 0 && !isCellOpen[cellIndex - 11]) {
      showMinesAround(i - 1,j - 1);
    }
    if (minesAroundArray[cellIndex - 10] == 0 && !isCellOpen[cellIndex - 10]) {
      styleOpenCell(i - 1,j);
      open(i - 1,j);
    }
    else if (minesAround[cellIndex - 10] !== 0 && !isCellOpen[cellIndex - 10]) {
      showMinesAround(i - 1,j);
    }
    if (minesAroundArray[cellIndex - 9] == 0 && !isCellOpen[cellIndex - 9]) {
      styleOpenCell(i - 1,j + 1);
      open(i - 1,j + 1);
    }
    else if (minesAround[cellIndex - 9] !== 0 && !isCellOpen[cellIndex - 9]) {
      showMinesAround(i - 1,j + 1);
    }

    if (minesAroundArray[cellIndex - 1] == 0 && !isCellOpen[cellIndex - 1]) {
      styleOpenCell(i,j - 1);
      open(i,j - 1);
    }
    else if (minesAround[cellIndex - 1] !== 0 && !isCellOpen[cellIndex - 1]) {
      showMinesAround(i,j - 1);
    }
    if (minesAroundArray[cellIndex + 1] == 0 && !isCellOpen[cellIndex + 1]) {
      styleOpenCell(i,j + 1);
      open(i,j + 1);
    }
    else if (minesAround[cellIndex + 1] !== 0 && !isCellOpen[cellIndex + 1]) {
      showMinesAround(i,j + 1);
    }

    if (minesAroundArray[cellIndex + 9] == 0 && !isCellOpen[cellIndex + 9]) {
      styleOpenCell(i + 1,j - 1);
      open(i + 1,j - 1);
    }
    else if (minesAround[cellIndex + 9] !== 0 && !isCellOpen[cellIndex + 9]) {
      showMinesAround(i + 1,j - 1);
    }
    if (minesAroundArray[cellIndex + 10] == 0 && !isCellOpen[cellIndex + 10]) {
      styleOpenCell(i + 1,j);
      open(i + 1,j);
    }
    else if (minesAround[cellIndex + 10] !== 0 && !isCellOpen[cellIndex + 10]) {
      showMinesAround(i + 1,j);
    }
    if (minesAroundArray[cellIndex + 11] == 0 && !isCellOpen[cellIndex + 11]) {
      styleOpenCell(i + 1,j + 1);
      open(i + 1,j + 1);
    }
    else if (minesAround[cellIndex + 11] !== 0 && !isCellOpen[cellIndex + 11]) {
      showMinesAround(i + 1,j + 1);
    }
  };

  // class Game {
  //   constructor(width,height) {
  //     this.width = width;
  //     this.height = width;
  //   }

  //   update() {

  //   }

  //   draw() {


  //   }
  // }

  drawBoard();

  let x = 0;
  let y = 0;
  let clicks = 0;
  let coords = [];
  let isCellOpen = new Array(cellCount).fill(false);
  // console.log(isCellOpen);
  let clickedCellIndex;
  let minesAround;

  canvas.addEventListener('mousedown',function (e) {
    clicks++;
    getCursorPosition(canvas,e);
    clickedCellIndex = ((coords[0] - 1) * minesCount) + coords[1] - 1;

    // place mines only after the first click
    // and replace the mine with another is first click was on a mine
    if (clicks == 1) {
      placeMines();
      checkFirstClick();
      // console.log(countMinesAroundAll());
    }
    countMinesAroundAll();
    // check is cell is already open
    // and if it is not
    if (!isCellOpen[clickedCellIndex]) {
      open(coords[0],coords[1]);
      // console.log(isCellOpen);
    }
    else {
      // console.log(clickedCellIndex);
      // console.log(isCellOpen[clickedCellIndex]);
      console.log('already open cell');
    }
  })

})

