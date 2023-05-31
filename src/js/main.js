import '../scss/main.scss';

const root = document.querySelector('.root');
const canvas = document.createElement('canvas');
canvas.className = 'canvas';
root.appendChild(canvas);

window.addEventListener('load',function () {

  // Drawing the gameboard
  const drawBoard = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        ctx.strokeStyle = '#9fb3c1';
        ctx.strokeRect(i * colWidth,j * colHeight,colWidth,colHeight);
      }
    }
  }


  // Place the mines
  const placeMines = () => {

    for (let i = 0; i < minesCount; i++) {

      let mineIndex = Math.floor(Math.random() * cellIndexAll.length);

      mineIndexesArray.push(cellIndexAll[mineIndex]);

      cellIndexAll.splice(mineIndex,1);
    }
    mineIndexesArray.sort((a,b) => a - b);
    console.log(mineIndexesArray);
  }

  const openUnopened = () => {
    for (let i = 0; i < cellCount; i++) {
      if (!isCellOpen[i]) {
        let x = ((i) % cols) * colWidth;
        let y = (Math.floor(i / rows)) * colHeight;

        ctx.fillStyle = '#6b7985';
        ctx.fillRect(x,y,colWidth,colHeight);
        ctx.strokeStyle = '#404950';
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
      setTimeout(() => {
        window.alert('Game over. Try again!')
      },20)
    }

    let mineImg = new Image();

    mineImg.addEventListener(
      "load",
      () => {

        for (let i = 0; i < minesCount; i++) {
          let x = (mineIndexesArray[i] % cols) * colWidth;
          let y = (Math.floor(mineIndexesArray[i] / rows)) * colHeight;

          ctx.clearRect(x,y,colWidth,colHeight);
          ctx.fillStyle = color;
          ctx.fillRect(x,y,colWidth,colHeight);
          ctx.strokeStyle = 'black';
          ctx.strokeRect(x,y,colWidth,colHeight);
          ctx.drawImage(mineImg,x,y);
        }
      },
      false
    );
    mineImg.src = `./assets/img/small-mine-${colWidth}.png`;

  }

  function getCursorPosition(canvas,event) {
    const rect = canvas.getBoundingClientRect();
    let x = 0;
    let y = 0;
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
    let rowClicki = Math.floor(y / colWidth) + 1;
    let colClickj = Math.floor(x / colHeight) + 1;
    coords = [rowClicki,colClickj];
    return coords;
  }

  function randomExcluded(min,max,excluded) {
    var n = Math.floor(Math.random() * (max - min) + min);
    if (n >= excluded) n++;
    return n;
  }

  const checkFirstClick = () => {

    if (mineIndexesArray.includes(clickedCellIndex)) {

      let newMine = randomExcluded(1,cellIndexAll.length,clickedCellIndex);

      mineIndexesArray.splice(mineIndexesArray.indexOf(clickedCellIndex),1,newMine);

      cellIndexAll.splice(cellIndexAll.indexOf(newMine),1);
    }
  }

  const isMine = (cellIndex) => {
    if (cellIndex < 0 || cellIndex > cellCount - 1) {
      return;
    }

    if (mineIndexesArray.includes(cellIndex)) {
      return true;
    } else {
      return false;
    }
  }

  const isNotRightEdge = (cellIndex) => {
    if ((cellIndex % cols) !== (cols - 1)) {
      return true;
    }
  }

  const isNotLeftEdge = (cellIndex) => {
    if ((cellIndex % cols) !== 0) {
      return true;
    }
  }

  const isNotTop = (cellIndex) => {
    if ((cellIndex - cols) >= 0) {
      return true;
    }
  }

  const isNotBottom = (cellIndex) => {
    if ((cellIndex + cols) <= cellCount) {
      return true;
    }
  }

  const countMinesAround = (cellIndex) => {
    minesAround = 0;

    if (isNotTop(cellIndex) && isNotLeftEdge(cellIndex)) {
      if (isMine(cellIndex - 11)) {
        minesAround++;
      }
    }

    if (isNotTop(cellIndex)) {
      if (isMine(cellIndex - 10)) {
        minesAround++;
      }
    }

    if (isNotTop(cellIndex) && isNotRightEdge(cellIndex)) {

      if (isMine(cellIndex - 9)) {
        minesAround++;
      }
    }

    if (isNotLeftEdge(cellIndex)) {
      if (isMine(cellIndex - 1)) {
        minesAround++;
      }
    }

    if (isNotRightEdge(cellIndex)) {
      if (isMine(cellIndex + 1)) {
        minesAround++;
      }
    }

    if (isNotBottom(cellIndex) && isNotLeftEdge(cellIndex)) {
      if (isMine(cellIndex + 9)) {
        minesAround++;
      }
    }
    if (isNotBottom(cellIndex)) {
      if (isMine(cellIndex + 10)) {
        minesAround++;
      }
    }
    if (isNotBottom(cellIndex) && isNotRightEdge(cellIndex)) {
      if (isMine(cellIndex + 11)) {
        minesAround++;
      }
    }
    return minesAround;
  };

  const countMinesAroundAll = () => {

    for (let i = 0; i < cellCount; i++) {
      minesAroundArray.push(countMinesAround(i));
    }
    return minesAroundArray;
  };

  const open = (cellIndex) => {

    if (cellIndex < 0 || cellIndex > cellCount - 1) {
      return;
    }

    if (isMine(cellIndex) == false) {

      if (minesAroundArray[cellIndex] == 0) {
        styleOpenCell(cellIndex);
        expandOpen(cellIndex);
      }
      else {
        // if there are mines Around
        showMinesAround(cellIndex);
      };
    } else if (isMine(cellIndex) == true) {
      exposeMines(false);
    }
  }

  const styleOpenCell = (cellIndex) => {

    if (cellIndex < 0 || cellIndex > cellCount - 1) {
      return;
    }

    let x = (cellIndex % cols) * colWidth;
    let y = (Math.floor(cellIndex / rows)) * colHeight;

    ctx.fillStyle = '#8294a4';
    ctx.fillRect(x,y,colWidth,colHeight);
    ctx.strokeStyle = '#404950';
    ctx.strokeRect(x,y,colWidth,colHeight);

    isCellOpen.splice(cellIndex,1,true);
  };

  const showMinesAround = (cellIndex) => {
    if (cellIndex < 0 || cellIndex > cellCount - 1) {
      return;
    }

    let x = (cellIndex % cols) * colWidth;
    let y = (Math.floor(cellIndex / rows)) * colHeight;

    styleOpenCell(cellIndex);
    ctx.font = "20px Verdana";
    ctx.textAlign = 'center'

    if (minesAroundArray[cellIndex] == 1) {
      ctx.fillStyle = "#a2d2ff";
    } else if (minesAroundArray[cellIndex] == 2) {
      ctx.fillStyle = "#ffafcc";
    } else if (minesAroundArray[cellIndex] == 3) {
      ctx.fillStyle = "#cdb4db";
    } else if (minesAroundArray[cellIndex] == 4) {
      ctx.fillStyle = "#fcf6bd";
    } else if (minesAroundArray[cellIndex] == 5) {
      ctx.fillStyle = "#f1faee";
    } else {
      ctx.fillStyle = "#f5af63";
    }

    ctx.fillText(`${minesAroundArray[cellIndex]}`,x + colWidth / 2,y + colHeight / 1.3);

  }

  const expandOpen = (cellIndex) => {

    if (cellIndex < 0 || cellIndex > cellCount - 1) {
      return;
    }

    if (isNotTop(cellIndex) && isNotLeftEdge(cellIndex)) {
      if (minesAroundArray[cellIndex - 11] == 0 && !isCellOpen[cellIndex - 11]) {
        styleOpenCell(cellIndex - 11);
        open(cellIndex - 11);
      }
      else if (minesAround[cellIndex - 11] !== 0 && !isCellOpen[cellIndex - 11]) {
        showMinesAround(cellIndex - 11);
      }
    }

    if (isNotTop(cellIndex)) {
      if (minesAroundArray[cellIndex - 10] == 0 && !isCellOpen[cellIndex - 10]) {
        styleOpenCell(cellIndex - 10);
        open(cellIndex - 10);
      }
      else if (minesAround[cellIndex - 10] !== 0 && !isCellOpen[cellIndex - 10]) {
        showMinesAround(cellIndex - 10);
      }
    }

    if (isNotTop(cellIndex) && isNotRightEdge(cellIndex)) {
      if (minesAroundArray[cellIndex - 9] == 0 && !isCellOpen[cellIndex - 9]) {
        styleOpenCell(cellIndex - 9);
        open(cellIndex - 9);
      }
      else if (minesAround[cellIndex - 9] !== 0 && !isCellOpen[cellIndex - 9]) {
        showMinesAround(cellIndex - 9);
      }
    }

    if (isNotLeftEdge(cellIndex)) {
      if (minesAroundArray[cellIndex - 1] == 0 && !isCellOpen[cellIndex - 1]) {
        styleOpenCell(cellIndex - 1);
        open(cellIndex - 1);
      }
      else if (minesAround[cellIndex - 1] !== 0 && !isCellOpen[cellIndex - 1]) {
        showMinesAround(cellIndex - 1);
      }
    }

    if (isNotRightEdge(cellIndex)) {
      if (minesAroundArray[cellIndex + 1] == 0 && !isCellOpen[cellIndex + 1]) {
        styleOpenCell(cellIndex + 1);
        open(cellIndex + 1);
      }
      else if (minesAround[cellIndex + 1] !== 0 && !isCellOpen[cellIndex + 1]) {
        showMinesAround(cellIndex + 1);
      }
    }

    if (isNotBottom(cellIndex) && isNotLeftEdge(cellIndex)) {
      if (minesAroundArray[cellIndex + 9] == 0 && !isCellOpen[cellIndex + 9]) {
        styleOpenCell(cellIndex + 9);
        open(cellIndex + 9);
      }
      else if (minesAround[cellIndex + 9] !== 0 && !isCellOpen[cellIndex + 9]) {
        showMinesAround(cellIndex + 9);
      }
    }

    if (isNotBottom(cellIndex)) {
      if (minesAroundArray[cellIndex + 10] == 0 && !isCellOpen[cellIndex + 10]) {
        styleOpenCell(cellIndex + 10);
        open(cellIndex + 10);
      }
      else if (minesAround[cellIndex + 10] !== 0 && !isCellOpen[cellIndex + 10]) {
        showMinesAround(cellIndex + 10);
      }
    }

    if (isNotBottom(cellIndex) && isNotRightEdge(cellIndex)) {
      if (minesAroundArray[cellIndex + 11] == 0 && !isCellOpen[cellIndex + 11]) {
        styleOpenCell(cellIndex + 11);
        open(cellIndex + 11);
      }
      else if (minesAround[cellIndex + 11] !== 0 && !isCellOpen[cellIndex + 11]) {
        showMinesAround(cellIndex + 11);
      }
    }
  };

  const flagCell = (cellIndex) => {

    isCellFlaggedArray.splice(cellIndex,1,true);

    flagIndexes.push(cellIndex);
    flagIndexes.sort((a,b) => a.i - b.i);

    isCellOpen.splice(cellIndex,1,'flagged');

    let x = (cellIndex % cols) * colWidth;
    let y = (Math.floor(cellIndex / rows)) * colHeight;

    let flagImg = new Image();
    flagImg.addEventListener(
      "load",
      () => {
        ctx.clearRect(x + 1,y + 1,colWidth - 2,colHeight - 2);
        ctx.fillStyle = '#a2efdf';
        ctx.fillRect(x + 1,y + 1,colWidth - 2,colHeight - 2);
        ctx.drawImage(flagImg,x,y);
      },
      false
    );
    flagImg.src = "./assets/img/flag1-30.png";
  }

  const unflag = (cellIndex) => {

    isCellFlaggedArray.splice(cellIndex,1,false);
    isCellOpen.splice(cellIndex,1,false);

    flagIndexes = flagIndexes.filter((el) => el !== cellIndex);

    let x = (cellIndex % cols) * colWidth;
    let y = (Math.floor(cellIndex / rows)) * colHeight;
    ctx.clearRect(x + 1,y + 1,colWidth - 2,colHeight - 2);
  }

  const checkIfWon = () => {

    const arrayMatch = (array1,array2) =>
      array2.every((element) => array1.includes(element));

    if (arrayMatch(flagIndexes,mineIndexesArray)) {
      // if all mines were flagged
      exposeMines(true);
      console.log('all mines are flagged');
      return true;
    }

    else if (isCellOpen.filter(el => el !== true).length == minesCount) {
      exposeMines(true);
      console.log('all cells opened only mines left');
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



  let minesCount = 10;
  let rows = 10;
  let cols = 10;
  let cellCount = rows * cols;
  let colWidth = 30;
  let colHeight = 30;
  let cellIndexAll = [];
  const mineIndexesArray = [];
  const minesAroundArray = [];
  let isCellFlaggedArray = new Array(cellCount).fill(false);
  let flagIndexes = [];

  for (let i = 0; i < cellCount; i++) {
    cellIndexAll.push(i);
  }

  const ctx = canvas.getContext('2d');
  canvas.height = colHeight * cols;
  canvas.width = colWidth * rows;

  drawBoard();

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
    clickedCellIndex = ((coords[0] - 1) * rows) + coords[1] - 1;

    if (clicks == 1) {
      placeMines();
      checkFirstClick();
      countMinesAroundAll();
    }

    //left-click
    if (e.button !== 2) {

      // place mines only after the first click
      // and replace the mine with another is first click was on a mine
      // check is cell is already open
      // and if it is not
      if (!isCellOpen[clickedCellIndex]) {
        open(clickedCellIndex);
      }
      else if (isCellOpen[clickedCellIndex] == true) {
        console.log('already open cell');
      }

      if (checkIfWon()) {
        setTimeout(() => {
          window.alert("You Won!");
        },10)
      };

    }
    //right-click
    else {
      if (isCellOpen[clickedCellIndex] !== 'flagged' && isCellOpen[clickedCellIndex] == false) {
        flagCell(clickedCellIndex);
      }
      else if (isCellOpen[clickedCellIndex] == 'flagged') {
        unflag(clickedCellIndex);
      }

      if (checkIfWon()) {
        setTimeout(() => {
          window.alert("You Won!");
        },10)
      };
    }
  })

})



