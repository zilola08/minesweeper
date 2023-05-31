import '../scss/main.scss';

class Game {
  start(minesCount,rows,cols) {
    this.minesCount = minesCount;
    this.rows = rows;
    this.cols = cols;

    this.colWidth = 30;
    this.colHeight = 30;
    this.cellIndexAll = [];
    this.mineIndexesArray = [];
    this.minesAround;
    this.minesAroundArray = [];

    this.clicks = 0;
    this.clickedCellIndex;
    this.coords = [];

    this.cellCount = this.rows * this.cols;
    console.log(this.rows);
    console.log(this.cellCount);
    this.isCellFlaggedArray = new Array();
    // this.isCellFlaggedArray = new Array(this.cellCount).fill(false);
    this.flagIndexes = [];
    this.isCellOpen = new Array();
    // this.isCellOpen = new Array(this.cellCount).fill(false);


    for (let i = 0; i < this.cellCount; i++) {
      this.cellIndexAll.push(i);
      this.isCellFlaggedArray.push(false);
      this.isCellOpen.push(false);
    }

    // drawBoard();

    canvas.addEventListener('contextmenu',function (e) {
      e.preventDefault();
    });

    canvas.addEventListener('mousedown',(e) => {

      this.onClickOnTile(e);
    })
  }

  onClickOnTile(e) {

    this.clicks++;
    this.getCursorPosition(canvas,e);
    this.clickedCellIndex = ((this.coords[0] - 1) * rows) + this.coords[1] - 1;

    if (this.clicks == 1) {
      this.placeMines();
      this.checkFirstClick();
      this.countMinesAroundAll();
    }

    //left-click
    if (e.button !== 2) {

      // place mines only after the first click
      // and replace the mine with another is first click was on a mine
      // check is cell is already open
      // and if it is not
      if (!this.isCellOpen[this.clickedCellIndex]) {
        this.open(this.clickedCellIndex);
      }
      else if (this.isCellOpen[this.clickedCellIndex] == true) {
        console.log('already open cell');
      }

      if (this.checkIfWon()) {
        setTimeout(() => {
          window.alert("You Won!");
        },10)
      };

    }
    //right-click
    else {
      if (this.isCellOpen[this.clickedCellIndex] !== 'flagged' && this.isCellOpen[this.clickedCellIndex] == false) {
        this.flagCell(this.clickedCellIndex);
      }
      else if (this.isCellOpen[this.clickedCellIndex] == 'flagged') {
        this.unflag(this.clickedCellIndex);
      }

      if (this.checkIfWon()) {
        setTimeout(() => {
          window.alert("You Won!");
        },10)
      };
    }
  }


  // Place the mines
  placeMines = () => {

    for (let i = 0; i < this.minesCount; i++) {

      let mineIndex = Math.floor(Math.random() * this.cellIndexAll.length);

      this.mineIndexesArray.push(this.cellIndexAll[mineIndex]);

      this.cellIndexAll.splice(mineIndex,1);
    }
    this.mineIndexesArray.sort((a,b) => a - b);
    console.log(this.mineIndexesArray);
  }

  openUnopened = () => {
    for (let i = 0; i < this.cellCount; i++) {
      if (!this.isCellOpen[i]) {
        let x = ((i) % this.cols) * this.colWidth;
        let y = (Math.floor(i / this.rows)) * this.colHeight;

        ctx.fillStyle = '#6b7985';
        ctx.fillRect(x,y,this.colWidth,this.colHeight);
        ctx.strokeStyle = '#404950';
        ctx.strokeRect(x,y,this.colWidth,this.colHeight);

        this.isCellOpen.splice(i,1,true);
      }
    }
  }

  // Exposing all mines (from downloaded img)
  exposeMines = (didWin) => {
    this.openUnopened();

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

        for (let i = 0; i < this.minesCount; i++) {
          let x = (this.mineIndexesArray[i] % this.cols) * this.colWidth;
          let y = (Math.floor(this.mineIndexesArray[i] / this.rows)) * this.colHeight;

          ctx.clearRect(x,y,this.colWidth,this.colHeight);
          ctx.fillStyle = color;
          ctx.fillRect(x,y,this.colWidth,this.colHeight);
          ctx.strokeStyle = 'black';
          ctx.strokeRect(x,y,this.colWidth,this.colHeight);
          ctx.drawImage(mineImg,x,y);
        }
      },
      false
    );
    mineImg.src = `./assets/img/small-mine-${colWidth}.png`;

  }

  getCursorPosition(canvas,event) {
    const rect = canvas.getBoundingClientRect();
    let x = 0;
    let y = 0;
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
    let rowClicki = Math.floor(y / colWidth) + 1;
    let colClickj = Math.floor(x / colHeight) + 1;
    this.coords = [rowClicki,colClickj];
    return this.coords;
  }

  randomExcluded(min,max,excluded) {
    var n = Math.floor(Math.random() * (max - min) + min);
    if (n >= excluded) n++;
    return n;
  }

  checkFirstClick = () => {

    if (this.mineIndexesArray.includes(this.clickedCellIndex)) {

      let newMine = this.randomExcluded(1,this.cellIndexAll.length,this.clickedCellIndex);

      this.mineIndexesArray.splice(this.mineIndexesArray.indexOf(this.clickedCellIndex),1,newMine);

      this.cellIndexAll.splice(this.cellIndexAll.indexOf(newMine),1);
    }
  }

  isMine = (cellIndex) => {
    if (cellIndex < 0 || cellIndex > this.cellCount - 1) {
      return;
    }

    if (this.mineIndexesArray.includes(cellIndex)) {
      return true;
    } else {
      return false;
    }
  }

  isNotRightEdge = (cellIndex) => {
    if ((cellIndex % this.cols) !== (this.cols - 1)) {
      return true;
    }
  }

  isNotLeftEdge = (cellIndex) => {
    if ((cellIndex % this.cols) !== 0) {
      return true;
    }
  }

  isNotTop = (cellIndex) => {
    if ((cellIndex - this.cols) >= 0) {
      return true;
    }
  }

  isNotBottom = (cellIndex) => {
    if ((cellIndex + this.cols) <= this.cellCount) {
      return true;
    }
  }

  countMinesAround = (cellIndex) => {
    this.minesAround = 0;

    if (this.isNotTop(cellIndex) && this.isNotLeftEdge(cellIndex)) {
      if (this.isMine(cellIndex - 11)) {
        this.minesAround++;
      }
    }

    if (this.isNotTop(cellIndex)) {
      if (this.isMine(cellIndex - 10)) {
        this.minesAround++;
      }
    }

    if (this.isNotTop(cellIndex) && this.isNotRightEdge(cellIndex)) {

      if (this.isMine(cellIndex - 9)) {
        this.minesAround++;
      }
    }

    if (this.isNotLeftEdge(cellIndex)) {
      if (this.isMine(cellIndex - 1)) {
        this.minesAround++;
      }
    }

    if (this.isNotRightEdge(cellIndex)) {
      if (this.isMine(cellIndex + 1)) {
        this.minesAround++;
      }
    }

    if (this.isNotBottom(cellIndex) && this.isNotLeftEdge(cellIndex)) {
      if (this.isMine(cellIndex + 9)) {
        this.minesAround++;
      }
    }
    if (this.isNotBottom(cellIndex)) {
      if (this.isMine(cellIndex + 10)) {
        this.minesAround++;
      }
    }
    if (this.isNotBottom(cellIndex) && this.isNotRightEdge(cellIndex)) {
      if (this.isMine(cellIndex + 11)) {
        this.minesAround++;
      }
    }
    return this.minesAround;
  };

  countMinesAroundAll = () => {

    for (let i = 0; i < this.cellCount; i++) {
      this.minesAroundArray.push(this.countMinesAround(i));
    }
    return this.minesAroundArray;
  };

  open = (cellIndex) => {

    if (cellIndex < 0 || cellIndex > this.cellCount - 1) {
      return;
    }

    if (this.isMine(cellIndex) == false) {

      if (this.minesAroundArray[cellIndex] == 0) {
        this.styleOpenCell(cellIndex);
        this.expandOpen(cellIndex);
      }
      else {
        // if there are mines Around
        this.showMinesAround(cellIndex);
      };
    } else if (this.isMine(cellIndex) == true) {
      this.exposeMines(false);
    }
  }

  styleOpenCell = (cellIndex) => {

    if (cellIndex < 0 || cellIndex > this.cellCount - 1) {
      return;
    }

    let x = (cellIndex % this.cols) * this.colWidth;
    let y = (Math.floor(cellIndex / this.rows)) * this.colHeight;

    ctx.fillStyle = '#8294a4';
    ctx.fillRect(x,y,this.colWidth,this.colHeight);
    ctx.strokeStyle = '#404950';
    ctx.strokeRect(x,y,this.colWidth,this.colHeight);

    this.isCellOpen.splice(cellIndex,1,true);
  };

  showMinesAround = (cellIndex) => {
    if (cellIndex < 0 || cellIndex > this.cellCount - 1) {
      return;
    }

    let x = (cellIndex % this.cols) * this.colWidth;
    let y = (Math.floor(cellIndex / this.rows)) * this.colHeight;

    this.styleOpenCell(cellIndex);
    ctx.font = "20px Verdana";
    ctx.textAlign = 'center'

    if (this.minesAroundArray[cellIndex] == 1) {
      ctx.fillStyle = "#a2d2ff";
    } else if (this.minesAroundArray[cellIndex] == 2) {
      ctx.fillStyle = "#ffafcc";
    } else if (this.minesAroundArray[cellIndex] == 3) {
      ctx.fillStyle = "#cdb4db";
    } else if (this.minesAroundArray[cellIndex] == 4) {
      ctx.fillStyle = "#fcf6bd";
    } else if (this.minesAroundArray[cellIndex] == 5) {
      ctx.fillStyle = "#f1faee";
    } else {
      ctx.fillStyle = "#f5af63";
    }

    ctx.fillText(`${this.minesAroundArray[cellIndex]}`,x + this.colWidth / 2,y + this.colHeight / 1.3);

  }

  expandOpen = (cellIndex) => {

    if (cellIndex < 0 || cellIndex > this.cellCount - 1) {
      return;
    }

    if (this.isNotTop(cellIndex) && this.isNotLeftEdge(cellIndex)) {
      if (this.minesAroundArray[cellIndex - 11] == 0 && !this.isCellOpen[cellIndex - 11]) {
        this.styleOpenCell(cellIndex - 11);
        this.open(cellIndex - 11);
      }
      else if (this.minesAround[cellIndex - 11] !== 0 && !this.isCellOpen[cellIndex - 11]) {
        this.showMinesAround(cellIndex - 11);
      }
    }

    if (this.isNotTop(cellIndex)) {
      if (this.minesAroundArray[cellIndex - 10] == 0 && !this.isCellOpen[cellIndex - 10]) {
        this.styleOpenCell(cellIndex - 10);
        this.open(cellIndex - 10);
      }
      else if (this.minesAround[cellIndex - 10] !== 0 && !this.isCellOpen[cellIndex - 10]) {
        this.showMinesAround(cellIndex - 10);
      }
    }

    if (this.isNotTop(cellIndex) && this.isNotRightEdge(cellIndex)) {
      if (this.minesAroundArray[cellIndex - 9] == 0 && !this.isCellOpen[cellIndex - 9]) {
        this.styleOpenCell(cellIndex - 9);
        this.open(cellIndex - 9);
      }
      else if (this.minesAround[cellIndex - 9] !== 0 && !this.isCellOpen[cellIndex - 9]) {
        this.showMinesAround(cellIndex - 9);
      }
    }

    if (this.isNotLeftEdge(cellIndex)) {
      if (this.minesAroundArray[cellIndex - 1] == 0 && !this.isCellOpen[cellIndex - 1]) {
        this.styleOpenCell(cellIndex - 1);
        this.open(cellIndex - 1);
      }
      else if (this.minesAround[cellIndex - 1] !== 0 && !this.isCellOpen[cellIndex - 1]) {
        this.showMinesAround(cellIndex - 1);
      }
    }

    if (this.isNotRightEdge(cellIndex)) {
      if (this.minesAroundArray[cellIndex + 1] == 0 && !this.isCellOpen[cellIndex + 1]) {
        this.styleOpenCell(cellIndex + 1);
        this.open(cellIndex + 1);
      }
      else if (this.minesAround[cellIndex + 1] !== 0 && !this.isCellOpen[cellIndex + 1]) {
        this.showMinesAround(cellIndex + 1);
      }
    }

    if (this.isNotBottom(cellIndex) && this.isNotLeftEdge(cellIndex)) {
      if (this.minesAroundArray[cellIndex + 9] == 0 && !this.isCellOpen[cellIndex + 9]) {
        this.styleOpenCell(cellIndex + 9);
        this.open(cellIndex + 9);
      }
      else if (this.minesAround[cellIndex + 9] !== 0 && !this.isCellOpen[cellIndex + 9]) {
        this.showMinesAround(cellIndex + 9);
      }
    }

    if (this.isNotBottom(cellIndex)) {
      if (this.minesAroundArray[cellIndex + 10] == 0 && !this.isCellOpen[cellIndex + 10]) {
        this.styleOpenCell(cellIndex + 10);
        this.open(cellIndex + 10);
      }
      else if (this.minesAround[cellIndex + 10] !== 0 && !this.isCellOpen[cellIndex + 10]) {
        this.showMinesAround(cellIndex + 10);
      }
    }

    if (this.isNotBottom(cellIndex) && this.isNotRightEdge(cellIndex)) {
      if (this.minesAroundArray[cellIndex + 11] == 0 && !this.isCellOpen[cellIndex + 11]) {
        this.styleOpenCell(cellIndex + 11);
        this.open(cellIndex + 11);
      }
      else if (this.minesAround[cellIndex + 11] !== 0 && !this.isCellOpen[cellIndex + 11]) {
        this.showMinesAround(cellIndex + 11);
      }
    }
  };

  flagCell = (cellIndex) => {

    this.isCellFlaggedArray.splice(cellIndex,1,true);

    this.flagIndexes.push(cellIndex);
    this.flagIndexes.sort((a,b) => a.i - b.i);

    this.isCellOpen.splice(cellIndex,1,'flagged');

    let x = (cellIndex % this.cols) * this.colWidth;
    let y = (Math.floor(cellIndex / this.rows)) * this.colHeight;

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

  unflag = (cellIndex) => {

    this.isCellFlaggedArray.splice(cellIndex,1,false);
    this.isCellOpen.splice(cellIndex,1,false);

    this.flagIndexes = this.flagIndexes.filter((el) => el !== cellIndex);

    let x = (cellIndex % this.cols) * this.colWidth;
    let y = (Math.floor(cellIndex / this.rows)) * this.colHeight;
    ctx.clearRect(x + 1,y + 1,this.colWidth - 2,this.colHeight - 2);
  }

  checkIfWon = () => {

    const arrayMatch = (array1,array2) =>
      array2.every((element) => array1.includes(element));

    if (arrayMatch(this.flagIndexes,this.mineIndexesArray)) {
      // if all mines were flagged
      this.exposeMines(true);
      console.log('all mines are flagged');
      return true;
    }

    else if (this.isCellOpen.filter(el => el !== true).length == this.minesCount) {
      this.exposeMines(true);
      console.log('all cells opened only mines left');
      return true;
    }
    // if all mines were flagged

    //if flagged cells number is not equal to the minesCount
    else {
      return false;
    }
  }
}


const root = document.querySelector('.root');
const canvas = document.createElement('canvas');
canvas.className = 'canvas';
root.appendChild(canvas);

const ctx = canvas.getContext('2d');

let colWidth = 30;
let colHeight = 30;
let cols = 10;
let rows = 10;
canvas.height = colHeight * cols;
canvas.width = colWidth * rows;

// Drawing the gameboard
const drawBoard = (cols,rows) => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      ctx.strokeStyle = '#9fb3c1';
      ctx.strokeRect(i * colWidth,j * colHeight,colWidth,colHeight);
    }
  }
}


window.addEventListener('load',function () {

  let minesCount = 15;
  let rows = 10;
  let cols = 10;

  drawBoard(10,10);

  let newGame = new Game();
  newGame.start(minesCount,rows,cols);



})



