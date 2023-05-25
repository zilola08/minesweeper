import '../scss/main.scss';


const minesArray = [];
const mineIndexesArray = [];
let minesCount = 10;
let rows = 10;
let cols = 10;
let cellCount = rows * cols;
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

    for (let i = 0; i < minesCount; i++) {
      let mineIndex = (i * rows) + minesArray[i] - 1;
      mineIndexesArray.push(mineIndex);
    }
  }

  const openUnopened = () => {
    for (let i = 0; i < cellCount; i++) {
      if (!isCellOpen[i]) {
        let x = ((i) % cols) * colWidth;
        let y = (Math.floor(i / rows)) * colHeight;

        ctx.fillStyle = 'lightgray';
        ctx.fillRect(x,y,colWidth,colHeight);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(x,y,colWidth,colHeight);

        isCellOpen.splice(i,1,true);
      }
    }
  }

  // Exposing all mines (from downloaded img)
  const exposeMines = (didWin) => {
    openUnopened();

    let color;

    if (didWin == true) {
      color = 'green';
    } else {
      color = 'pink';
    }

    let mineImg = new Image();
    mineImg.addEventListener(
      "load",
      () => {
        for (let i = 0; i < rows; i++) {
          ctx.clearRect(((minesArray[i] - 1) * colWidth),i * colWidth,colWidth,colHeight);
          ctx.fillStyle = color;
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

    if (i < 1 || j < 1 || i > rows || j > cols) { return; }

    if (!isMine(i,j)) {
      if (countMinesAround(i,j) == 0) {
        styleOpenCell(i,j);
        expandOpen(i,j);
      }
      else {
        // if there are mines Around
        showMinesAround(i,j);
        // unopenedCellsCount--;
      };
    } else {
      exposeMines(false);
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

  let isCellFlaggedArray = new Array(cellCount).fill(false);

  let flags = [];
  let flagIndexes = [];

  const flagCell = (i,j) => {
    let cellIndex = ((i - 1) * rows) + j - 1;

    isCellFlaggedArray.splice(cellIndex,1,true);

    const flag = new Object();
    flag.i = i;
    flag.j = j;
    flags.push(flag);
    flags.sort((a,b) => a.i - b.i);

    flagIndexes.push(cellIndex);
    flagIndexes.sort((a,b) => a.i - b.i);

    isCellOpen.splice(cellIndex,1,'flagged');

    let x = ((j - 1) * colWidth);
    let y = (i - 1) * colHeight;
    let ximg = ((j - 1) * colWidth) + colWidth / 4;
    let yimg = (i - 1) * colHeight + colWidth / 7;

    let flagImg = new Image();
    flagImg.addEventListener(
      "load",
      () => {
        ctx.clearRect(x,y,colWidth,colHeight);
        ctx.fillStyle = 'lightgreen';
        ctx.fillRect(x,y,colWidth,colHeight);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(x,y,colWidth,colHeight);
        ctx.drawImage(flagImg,ximg,yimg);
      },
      false
    );
    flagImg.src = "./assets/img/flag-30.png";
  }

  const unflag = (i,j) => {

    let cellIndex = ((i - 1) * rows) + j - 1;

    isCellFlaggedArray.splice(cellIndex,1,false);
    isCellOpen.splice(cellIndex,1,false);

    function filterOutFlag(flag) {
      return (flag.i !== i && flag.j == j)
    }

    flags = flags.filter(filterOutFlag);
    flagIndexes = flagIndexes.filter((el) => el !== cellIndex);

    let x = ((j - 1) * colWidth);
    let y = (i - 1) * colHeight;
    ctx.clearRect(x,y,colWidth,colHeight);
    ctx.strokeStyle = 'gray';
    ctx.strokeRect(x,y,colWidth,colHeight);
  }

  const checkIfWon = () => {

    const arrayMatch = (array1,array2) =>
      array2.every((element) => array1.includes(element));

    if (arrayMatch(flagIndexes,mineIndexesArray)) {
      // if all mines were flagged
      exposeMines(true);
      window.alert("You Won!");
      return true;
    }

    else if (isCellOpen.filter(el => el == false).length == minesCount) {
      exposeMines(true);
      window.alert("You Won!");
      return true;
    }
    // if all mines were flagged

    //if flagged cells number is not equal to the minesCount
    else {
      return false;
    }
  }

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
  let clickedCellIndex;
  let minesAround;

  canvas.addEventListener('contextmenu',function (e) {
    e.preventDefault();
  });

  canvas.addEventListener('mousedown',function (e) {


    clicks++;
    getCursorPosition(canvas,e);
    clickedCellIndex = ((coords[0] - 1) * minesCount) + coords[1] - 1;

    if (clicks == 1) {
      placeMines();
      checkFirstClick();
    }
    countMinesAroundAll();

    //left-click
    if (e.button !== 2) {

      // place mines only after the first click
      // and replace the mine with another is first click was on a mine
      // check is cell is already open
      // and if it is not
      if (!isCellOpen[clickedCellIndex]) {
        open(coords[0],coords[1]);
      }
      else if (isCellOpen[clickedCellIndex] == true) {
        console.log('already open cell');
      }

      checkIfWon();

    }
    //right-click
    else {
      if (isCellOpen[clickedCellIndex] !== 'flagged' && isCellOpen[clickedCellIndex] == false) {
        flagCell(coords[0],coords[1]);
      }
      else if (isCellOpen[clickedCellIndex] == 'flagged') {
        unflag(coords[0],coords[1]);
      }

      checkIfWon();
    }
  })

})



