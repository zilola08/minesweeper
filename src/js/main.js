import '../scss/main.scss';


let minesArray = [];
let minesCount = 10;
let rows = 10;
let cols = 10;
let cellValue = 1;

let colWidth = 40;
let colHeight = 40;

const root = document.querySelector('.root');
const canvas = document.createElement('canvas');
canvas.className = 'canvas';
root.appendChild(canvas);

window.addEventListener('load',function () {
  const ctx = canvas.getContext('2d');
  canvas.height = colHeight * cols;
  canvas.width = colWidth * rows;

  // Drawing the gameboard
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      ctx.strokeStyle = 'gray';
      ctx.strokeRect(i * colWidth,j * colHeight,colWidth,colHeight);
    }
  }

  // Hide the mines
  for (let i = 0; i < minesCount; i++) {
    let mine = Math.ceil(Math.random() * minesCount);
    minesArray.push(mine);
  }

  console.log(minesArray);

  // Exposing all mines (from downloaded img)
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      ctx.fillStyle = 'lightgray';
      ctx.fillRect(i * colWidth,j * colHeight,colWidth,colHeight);
      ctx.strokeStyle = 'black';
      ctx.strokeRect(i * colWidth,j * colHeight,colWidth,colHeight);
    }
  }
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



  // Drawing mines as red circles
  // for (let i = 0; i < rows; i++) {
  // ctx.beginPath();
  // ctx.arc((minesArray[i] * colWidth) - colWidth / 2,i * colWidth + colWidth / 2,colHeight / 3,0,Math.PI * 2);
  // ctx.fillStyle = 'red';
  // ctx.fill();

  // ctx.drawImage(mineImg,(minesArray[i] * colWidth) - colWidth / 2,i * colWidth + colWidth / 2)
  // }




  class Game {
    constructor(width,height) {
      this.width = width;
      this.height = width;
    }

    update() {

    }

    draw() {
      for (let i = 0; i < rows; i++) {
        let colWidth = 50;
        let colHeight = 50;

        for (let j = 0; j < cols; j++) {
          ctx.strokeRect(i * colWidth,j * colHeight,colWidth,colHeight);
        }
      }

    }
  }
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

