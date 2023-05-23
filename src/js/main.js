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
        // console.log(isCellOpen[i]);

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




  // Drawing mines as red circles
  // for (let i = 0; i < rows; i++) {
  // ctx.beginPath();
  // ctx.arc((minesArray[i] * colWidth) - colWidth / 2,i * colWidth + colWidth / 2,colHeight / 3,0,Math.PI * 2);
  // ctx.fillStyle = 'red';
  // ctx.fill();

  // ctx.drawImage(mineImg,(minesArray[i] * colWidth) - colWidth / 2,i * colWidth + colWidth / 2)
  // }




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
      let newMine = randomExcluded(1,10,minesArray[coords[0]]);
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


  const styleOpenCell = (x,y) => {
    ctx.fillStyle = 'lightgray';
    ctx.fillRect((y * colWidth) - colWidth,(x * colHeight) - colHeight,colWidth,colHeight);
    ctx.strokeStyle = 'black';
    ctx.strokeRect((y * colWidth) - colWidth,(x * colHeight) - colHeight,colWidth,colHeight);
  };

  const showMinesAround = (x,y) => {
    ctx.font = "35px Georgia";
    ctx.fillStyle = "red";
    ctx.textAlign = 'center'
    ctx.fillText(`${countMinesAround(x,y)}`,(y * colWidth) - colWidth / 2,(x * colHeight) - colHeight / 3.3);
  }

  const expandOpen = (i,j) => {

    if (i > rows || j > cols || i < 1 || j < 1) {
      return;
    };

    if (countMinesAround(i,j) == 0) {
      styleOpenCell(i,j);
    }

    if (countMinesAround(i,j) !== 0 && !isMine(i,j)) {
      styleOpenCell(i,j);
      showMinesAround(i,j);
      return;
    };

    return expandOpen(i,j-1);
  }

  let x = 0;
  let y = 0;
  let clicks = 0;
  let coords = [];
  let isCellOpen = new Array(cellCount).fill(false);
  let clickedCellIndex;
  let minesAround;

  canvas.addEventListener('mousedown',function (e) {
    clicks++;
    getCursorPosition(canvas,e);
    console.log(coords,clicks);
    clickedCellIndex = ((coords[0] - 1) * minesCount) + coords[1] - 1;
    console.log(clickedCellIndex);

    // place mines only after the forst click
    // and replace the mine with another is first click was on a mine
    if (clicks == 1) {
      placeMines();
      checkFirstClick();
      console.log(countMinesAroundAll());
    }


    // countMinesAroundAll();
    // console.log(minesAroundArray);

    // check is cell is already open
    // and if it is not
    if (!isCellOpen[clickedCellIndex]) {
      console.log(isMine());
      // check if it is a mine
      if (isMine(coords[0],coords[1])) {
        //if it is a mine
        //then - game over
        exposeMines();
      }
      // if it is not a mine
      else {
        //if no mines around
        if (countMinesAround(coords[0],coords[1]) == 0) {
          // style the cell and do nothing
          console.log('opening');
          console.log('not a mine');
          isCellOpen.splice(clickedCellIndex,1,true);
          expandOpen(coords[0],coords[1]);
          // styleOpenCell(coords[0],coords[1]);
          // console.log(isCellOpen);

        } else {
          //if there are mines Around
          //show minesAround
          console.log(countMinesAround(coords[0],coords[1]));
          styleOpenCell();
          showMinesAround(coords[0],coords[1]);
          isCellOpen.splice(clickedCellIndex,1,true);
        };
      }
    }
    else if (isCellOpen[clickedCellIndex]) {
      console.log('already open cell');
    }



  });


})

// const gameboard = document.createElement('div');
// gameboard.className = 'gameboard';
// root.appendChild(gameboard);

// for (let i = 0; i < rows; i++) {
  //   let colWidth = 50;
  //   let colHeight = 50;
  //   let boardRow = document.createElement('div');
  //   boardRow.className = 'boardRow';
  //   gameboard.appendChild(boardRow);
  //   boardRow.style.width = `${colWidth * cols}px`;
  //   boardRow.style.height = `${colHeight}px`;
  //   gameboard.style.width = `${colWidth * cols}px`;
  //   gameboard.style.height = `${colHeight * cols}px`;

  // for (let j = 0; j < cols; j++) {

    //     let boardCol = document.createElement('div');
    //     boardCol.className = 'boardCol';
    //     boardRow.appendChild(boardCol);
    //     boardCol.style.width = `${colWidth}px`;
    //     boardCol.style.height = `${colHeight}px`;
    //     boardCol.style.display = 'inline-block';

  // }
// }

