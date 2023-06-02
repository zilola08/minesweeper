/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./src/scss/main.scss?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/main.scss */ \"./src/scss/main.scss\");\n\n\nclass Game {\n  start(minesCount,rows,cols) {\n    this.minesCount = minesCount;\n    this.rows = rows;\n    this.cols = cols;\n\n    this.colWidth = 30;\n    this.colHeight = 30;\n    this.cellIndexAll = [];\n    this.mineIndexesArray = [];\n    this.minesAround;\n    this.minesAroundArray = [];\n\n    // this.clicks = 0;\n    this.timer = null;\n    this.clickedCellIndex;\n    this.coords = [];\n\n    this.cellCount = this.rows * this.cols;\n    console.log(this.rows);\n    console.log(this.cellCount);\n    this.isCellFlaggedArray = [];\n    this.flagIndexes = [];\n    this.isCellOpen = [];\n\n    for (let i = 0; i < this.cellCount; i++) {\n      this.cellIndexAll.push(i);\n      this.isCellFlaggedArray.push(false);\n      this.isCellOpen.push(false);\n    }\n\n    // drawBoard();\n    this.canvas = document.querySelector('.canvas');\n    this.ctx = this.canvas.getContext('2d');;\n    //right-click\n    this.canvas.addEventListener('contextmenu',(e) => {\n      e.preventDefault();\n      this.onRightClick(e);\n      // console.log(this.isCellFlaggedArray[this.clickedCellIndex]);\n      console.log(this.isCellFlaggedArray);\n      return false;\n    },false);\n\n    this.canvas.addEventListener('click',(e) => {\n      this.onLeftClick(e);\n    })\n\n    const timeCount = document.createElement('span');\n    timeCount.classList = \"time-count\"\n    timeCount.innerHTML = \"00:00\"\n    timer.appendChild(timeCount);\n\n    this.timer = setInterval(showTime,1000);\n    let seconds = 0;\n    function showTime() {\n      seconds++;\n      let hours = Math.floor(seconds / 3600);\n      let mins = Math.floor(seconds / 60) - (hours * 60);\n      let secs = Math.floor(seconds % 60);\n      let output = [];\n      output.push(\n        // hours.toString().padStart(2, '0'),\n        mins.toString().padStart(2,'0'),\n        secs.toString().padStart(2,'0'));\n      return timeCount.innerHTML = output.join(\":\")\n    }\n  }\n\n  //left-click\n  onLeftClick(e) {\n    // this.clicks++;\n\n    this.getCursorPosition(this.canvas,e);\n    this.clickedCellIndex = ((this.coords[0] - 1) * rows) + this.coords[1] - 1;\n\n    let moveCount = document.querySelector(\".move-count\");\n    let timeCount = document.querySelector(\".time-count\");\n    if (moveCount.innerHTML == '0') {\n      this.placeMines();\n      this.checkFirstClick();\n      this.countMinesAroundAll();\n    }\n\n    // place mines only after the first click\n    // and replace the mine with another is first click was on a mine\n    // check is cell is already open\n    // and if it is not\n    console.log(e.button);\n    if (e.button == 0) {\n      moveCount.innerHTML++;\n      if (!this.isCellOpen[this.clickedCellIndex]) {\n        this.open(this.clickedCellIndex);\n      }\n      else if (this.isCellOpen[this.clickedCellIndex] == true) {\n        console.log('already open cell');\n      }\n\n      if (this.checkIfWon()) {\n        clearInterval(this.timer);\n        setTimeout(() => {\n          window.alert(`Hooray! You won in ${timeCount.innerHTML} and ${moveCount.innerHTML} moves!`);\n        },10)\n      };\n    }\n  }\n\n  //right-click\n  onRightClick = (e) => {\n    // this.clicks++;\n    let moveCount = document.querySelector(\".move-count\");\n    let timeCount = document.querySelector(\".time-count\");\n    if (moveCount.innerHTML == '0') {\n      this.placeMines();\n      // this.checkFirstClick();\n      this.countMinesAroundAll();\n    };\n    moveCount.innerHTML++;\n    this.getCursorPosition(this.canvas,e);\n    this.clickedCellIndex = ((this.coords[0] - 1) * rows) + this.coords[1] - 1;\n\n    if (this.isCellOpen[this.clickedCellIndex] !== 'flagged' && this.isCellOpen[this.clickedCellIndex] == false) {\n      this.flagCell(this.clickedCellIndex);\n    }\n    else if (this.isCellOpen[this.clickedCellIndex] == 'flagged') {\n      this.unflag(this.clickedCellIndex);\n    }\n\n    if (this.checkIfWon()) {\n      clearInterval(this.timer);\n      setTimeout(() => {\n        window.alert(`Hooray! You won in ${timeCount.innerHTML} and ${moveCount.innerHTML} moves!`);\n      },10)\n    };\n  }\n\n\n  // Place the mines\n  placeMines = () => {\n\n    for (let i = 0; i < this.minesCount; i++) {\n\n      let mineIndex = Math.floor(Math.random() * this.cellIndexAll.length);\n\n      this.mineIndexesArray.push(this.cellIndexAll[mineIndex]);\n\n      this.cellIndexAll.splice(mineIndex,1);\n    }\n    this.mineIndexesArray.sort((a,b) => a - b);\n    console.log(this.mineIndexesArray);\n  }\n\n  openUnopened = () => {\n    for (let i = 0; i < this.cellCount; i++) {\n      if (!this.isCellOpen[i]) {\n        let x = ((i) % this.cols) * this.colWidth;\n        let y = (Math.floor(i / this.rows)) * this.colHeight;\n\n        this.ctx.fillStyle = '#6b7985';\n        this.ctx.fillRect(x,y,this.colWidth,this.colHeight);\n        this.ctx.strokeStyle = '#404950';\n        this.ctx.strokeRect(x,y,this.colWidth,this.colHeight);\n\n        this.isCellOpen.splice(i,1,true);\n      }\n    }\n  }\n\n  // Exposing all mines (from downloaded img)\n  exposeMines = (didWin) => {\n    this.openUnopened();\n\n    let color;\n\n    if (didWin == true) {\n      color = 'green';\n    } else {\n      color = 'pink';\n      setTimeout(() => {\n        window.alert('Game over. Try again!')\n      },20)\n    }\n\n    let mineImg = new Image();\n\n    mineImg.addEventListener(\n      \"load\",\n      () => {\n\n        for (let i = 0; i < this.minesCount; i++) {\n          let x = (this.mineIndexesArray[i] % this.cols) * this.colWidth;\n          let y = (Math.floor(this.mineIndexesArray[i] / this.rows)) * this.colHeight;\n\n          this.ctx.clearRect(x,y,this.colWidth,this.colHeight);\n          this.ctx.fillStyle = color;\n          this.ctx.fillRect(x,y,this.colWidth,this.colHeight);\n          this.ctx.strokeStyle = 'black';\n          this.ctx.strokeRect(x,y,this.colWidth,this.colHeight);\n          this.ctx.drawImage(mineImg,x,y);\n        }\n      },\n      false\n    );\n    mineImg.src = `./assets/img/small-mine-${colWidth}.png`;\n\n  }\n\n  getCursorPosition(canvas,event) {\n    const rect = canvas.getBoundingClientRect();\n    let x = 0;\n    let y = 0;\n    x = event.clientX - rect.left;\n    y = event.clientY - rect.top;\n    let rowClicki = Math.floor(y / colWidth) + 1;\n    let colClickj = Math.floor(x / colHeight) + 1;\n    this.coords = [rowClicki,colClickj];\n    return this.coords;\n  }\n\n  randomExcluded(min,max,excluded) {\n    var n = Math.floor(Math.random() * (max - min) + min);\n    if (n >= excluded) n++;\n    return n;\n  }\n\n  checkFirstClick = () => {\n\n    if (this.mineIndexesArray.includes(this.clickedCellIndex)) {\n\n      let newMine = this.randomExcluded(1,this.cellIndexAll.length,this.clickedCellIndex);\n\n      this.mineIndexesArray.splice(this.mineIndexesArray.indexOf(this.clickedCellIndex),1,newMine);\n\n      this.cellIndexAll.splice(this.cellIndexAll.indexOf(newMine),1);\n    }\n  }\n\n  isMine = (cellIndex) => {\n    if (cellIndex < 0 || cellIndex > this.cellCount - 1) {\n      return;\n    }\n\n    if (this.mineIndexesArray.includes(cellIndex)) {\n      return true;\n    } else {\n      return false;\n    }\n  }\n\n  isNotRightEdge = (cellIndex) => {\n    if ((cellIndex % this.cols) !== (this.cols - 1)) {\n      return true;\n    }\n  }\n\n  isNotLeftEdge = (cellIndex) => {\n    if ((cellIndex % this.cols) !== 0) {\n      return true;\n    }\n  }\n\n  isNotTop = (cellIndex) => {\n    if ((cellIndex - this.cols) >= 0) {\n      return true;\n    }\n  }\n\n  isNotBottom = (cellIndex) => {\n    if ((cellIndex + this.cols) <= this.cellCount) {\n      return true;\n    }\n  }\n\n  countMinesAround = (cellIndex) => {\n    this.minesAround = 0;\n\n    if (this.isNotTop(cellIndex) && this.isNotLeftEdge(cellIndex)) {\n      if (this.isMine(cellIndex - 11)) {\n        this.minesAround++;\n      }\n    }\n\n    if (this.isNotTop(cellIndex)) {\n      if (this.isMine(cellIndex - 10)) {\n        this.minesAround++;\n      }\n    }\n\n    if (this.isNotTop(cellIndex) && this.isNotRightEdge(cellIndex)) {\n\n      if (this.isMine(cellIndex - 9)) {\n        this.minesAround++;\n      }\n    }\n\n    if (this.isNotLeftEdge(cellIndex)) {\n      if (this.isMine(cellIndex - 1)) {\n        this.minesAround++;\n      }\n    }\n\n    if (this.isNotRightEdge(cellIndex)) {\n      if (this.isMine(cellIndex + 1)) {\n        this.minesAround++;\n      }\n    }\n\n    if (this.isNotBottom(cellIndex) && this.isNotLeftEdge(cellIndex)) {\n      if (this.isMine(cellIndex + 9)) {\n        this.minesAround++;\n      }\n    }\n    if (this.isNotBottom(cellIndex)) {\n      if (this.isMine(cellIndex + 10)) {\n        this.minesAround++;\n      }\n    }\n    if (this.isNotBottom(cellIndex) && this.isNotRightEdge(cellIndex)) {\n      if (this.isMine(cellIndex + 11)) {\n        this.minesAround++;\n      }\n    }\n    return this.minesAround;\n  };\n\n  countMinesAroundAll = () => {\n\n    for (let i = 0; i < this.cellCount; i++) {\n      this.minesAroundArray.push(this.countMinesAround(i));\n    }\n    return this.minesAroundArray;\n  };\n\n  open = (cellIndex) => {\n\n    if (cellIndex < 0 || cellIndex > this.cellCount - 1) {\n      return;\n    }\n\n    if (this.isMine(cellIndex) == false) {\n\n      if (this.minesAroundArray[cellIndex] == 0) {\n        this.styleOpenCell(cellIndex);\n        this.expandOpen(cellIndex);\n      }\n      else {\n        // if there are mines Around\n        this.showMinesAround(cellIndex);\n      };\n    } else if (this.isMine(cellIndex) == true) {\n      clearInterval(this.timer);\n      this.exposeMines(false);\n    }\n  }\n\n  styleOpenCell = (cellIndex) => {\n\n    if (cellIndex < 0 || cellIndex > this.cellCount - 1) {\n      return;\n    }\n\n    let x = (cellIndex % this.cols) * this.colWidth;\n    let y = (Math.floor(cellIndex / this.rows)) * this.colHeight;\n\n    this.ctx.fillStyle = '#8294a4';\n    this.ctx.fillRect(x,y,this.colWidth,this.colHeight);\n    this.ctx.strokeStyle = '#404950';\n    this.ctx.strokeRect(x,y,this.colWidth,this.colHeight);\n\n    this.isCellOpen.splice(cellIndex,1,true);\n  };\n\n  showMinesAround = (cellIndex) => {\n    if (cellIndex < 0 || cellIndex > this.cellCount - 1) {\n      return;\n    }\n\n    let x = (cellIndex % this.cols) * this.colWidth;\n    let y = (Math.floor(cellIndex / this.rows)) * this.colHeight;\n\n    this.styleOpenCell(cellIndex);\n    this.ctx.font = \"20px Verdana\";\n    this.ctx.textAlign = 'center'\n\n    if (this.minesAroundArray[cellIndex] == 1) {\n      this.ctx.fillStyle = \"#a2d2ff\";\n    } else if (this.minesAroundArray[cellIndex] == 2) {\n      this.ctx.fillStyle = \"#ffafcc\";\n    } else if (this.minesAroundArray[cellIndex] == 3) {\n      this.ctx.fillStyle = \"#cdb4db\";\n    } else if (this.minesAroundArray[cellIndex] == 4) {\n      this.ctx.fillStyle = \"#fcf6bd\";\n    } else if (this.minesAroundArray[cellIndex] == 5) {\n      this.ctx.fillStyle = \"#f1faee\";\n    } else {\n      this.ctx.fillStyle = \"#f5af63\";\n    }\n\n    this.ctx.fillText(`${this.minesAroundArray[cellIndex]}`,x + this.colWidth / 2,y + this.colHeight / 1.3);\n\n  }\n\n  expandOpen = (cellIndex) => {\n\n    if (cellIndex < 0 || cellIndex > this.cellCount - 1) {\n      return;\n    }\n\n    if (this.isNotTop(cellIndex) && this.isNotLeftEdge(cellIndex)) {\n      if (this.minesAroundArray[cellIndex - 11] == 0 && !this.isCellOpen[cellIndex - 11]) {\n        this.styleOpenCell(cellIndex - 11);\n        this.open(cellIndex - 11);\n      }\n      else if (this.minesAround[cellIndex - 11] !== 0 && !this.isCellOpen[cellIndex - 11]) {\n        this.showMinesAround(cellIndex - 11);\n      }\n    }\n\n    if (this.isNotTop(cellIndex)) {\n      if (this.minesAroundArray[cellIndex - 10] == 0 && !this.isCellOpen[cellIndex - 10]) {\n        this.styleOpenCell(cellIndex - 10);\n        this.open(cellIndex - 10);\n      }\n      else if (this.minesAround[cellIndex - 10] !== 0 && !this.isCellOpen[cellIndex - 10]) {\n        this.showMinesAround(cellIndex - 10);\n      }\n    }\n\n    if (this.isNotTop(cellIndex) && this.isNotRightEdge(cellIndex)) {\n      if (this.minesAroundArray[cellIndex - 9] == 0 && !this.isCellOpen[cellIndex - 9]) {\n        this.styleOpenCell(cellIndex - 9);\n        this.open(cellIndex - 9);\n      }\n      else if (this.minesAround[cellIndex - 9] !== 0 && !this.isCellOpen[cellIndex - 9]) {\n        this.showMinesAround(cellIndex - 9);\n      }\n    }\n\n    if (this.isNotLeftEdge(cellIndex)) {\n      if (this.minesAroundArray[cellIndex - 1] == 0 && !this.isCellOpen[cellIndex - 1]) {\n        this.styleOpenCell(cellIndex - 1);\n        this.open(cellIndex - 1);\n      }\n      else if (this.minesAround[cellIndex - 1] !== 0 && !this.isCellOpen[cellIndex - 1]) {\n        this.showMinesAround(cellIndex - 1);\n      }\n    }\n\n    if (this.isNotRightEdge(cellIndex)) {\n      if (this.minesAroundArray[cellIndex + 1] == 0 && !this.isCellOpen[cellIndex + 1]) {\n        this.styleOpenCell(cellIndex + 1);\n        this.open(cellIndex + 1);\n      }\n      else if (this.minesAround[cellIndex + 1] !== 0 && !this.isCellOpen[cellIndex + 1]) {\n        this.showMinesAround(cellIndex + 1);\n      }\n    }\n\n    if (this.isNotBottom(cellIndex) && this.isNotLeftEdge(cellIndex)) {\n      if (this.minesAroundArray[cellIndex + 9] == 0 && !this.isCellOpen[cellIndex + 9]) {\n        this.styleOpenCell(cellIndex + 9);\n        this.open(cellIndex + 9);\n      }\n      else if (this.minesAround[cellIndex + 9] !== 0 && !this.isCellOpen[cellIndex + 9]) {\n        this.showMinesAround(cellIndex + 9);\n      }\n    }\n\n    if (this.isNotBottom(cellIndex)) {\n      if (this.minesAroundArray[cellIndex + 10] == 0 && !this.isCellOpen[cellIndex + 10]) {\n        this.styleOpenCell(cellIndex + 10);\n        this.open(cellIndex + 10);\n      }\n      else if (this.minesAround[cellIndex + 10] !== 0 && !this.isCellOpen[cellIndex + 10]) {\n        this.showMinesAround(cellIndex + 10);\n      }\n    }\n\n    if (this.isNotBottom(cellIndex) && this.isNotRightEdge(cellIndex)) {\n      if (this.minesAroundArray[cellIndex + 11] == 0 && !this.isCellOpen[cellIndex + 11]) {\n        this.styleOpenCell(cellIndex + 11);\n        this.open(cellIndex + 11);\n      }\n      else if (this.minesAround[cellIndex + 11] !== 0 && !this.isCellOpen[cellIndex + 11]) {\n        this.showMinesAround(cellIndex + 11);\n      }\n    }\n  };\n\n  flagCell = (cellIndex) => {\n\n    this.isCellFlaggedArray.splice(cellIndex,1,true);\n\n    this.flagIndexes.push(cellIndex);\n    this.flagIndexes.sort((a,b) => a.i - b.i);\n\n    this.isCellOpen.splice(cellIndex,1,'flagged');\n\n    let x = (cellIndex % this.cols) * this.colWidth;\n    let y = (Math.floor(cellIndex / this.rows)) * this.colHeight;\n\n    let flagImg = new Image();\n    flagImg.addEventListener(\n      \"load\",\n      () => {\n        this.ctx.clearRect(x + 1,y + 1,colWidth - 2,colHeight - 2);\n        this.ctx.fillStyle = '#a2efdf';\n        this.ctx.fillRect(x + 1,y + 1,colWidth - 2,colHeight - 2);\n        this.ctx.drawImage(flagImg,x,y);\n      },\n      false\n    );\n    flagImg.src = \"./assets/img/flag1-30.png\";\n  }\n\n  unflag = (cellIndex) => {\n\n    this.isCellFlaggedArray.splice(cellIndex,1,false);\n    this.isCellOpen.splice(cellIndex,1,false);\n\n    this.flagIndexes = this.flagIndexes.filter((el) => el !== cellIndex);\n\n    let x = (cellIndex % this.cols) * this.colWidth;\n    let y = (Math.floor(cellIndex / this.rows)) * this.colHeight;\n    this.ctx.clearRect(x + 1,y + 1,this.colWidth - 2,this.colHeight - 2);\n  }\n\n  checkIfWon = () => {\n\n    const arrayMatch = (array1,array2) =>\n      array2.every((element) => array1.includes(element));\n\n    if (arrayMatch(this.flagIndexes,this.mineIndexesArray)) {\n      // if all mines were flagged\n      this.exposeMines(true);\n      console.log('all mines are flagged');\n      return true;\n    }\n\n    else if (this.isCellOpen.filter(el => el !== true).length == this.minesCount) {\n      this.exposeMines(true);\n      console.log('all cells opened only mines left');\n      return true;\n    }\n    // if all mines were flagged\n\n    //if flagged cells number is not equal to the minesCount\n    else {\n      return false;\n    }\n  }\n}\n\n\nconst root = document.querySelector('.root');\n\nconst container = document.createElement('div');\ncontainer.className = 'container';\nroot.appendChild(container);\n\nconst newAndTopBox = document.createElement('div');\nnewAndTopBox.className = 'button-box container__new-and-top-box';\ncontainer.appendChild(newAndTopBox);\n\nconst timerAndMovesBox = document.createElement('div');\ntimerAndMovesBox.className = 'button-box container__timer-and-moves-box';\ncontainer.appendChild(timerAndMovesBox);\n\nconst newGameButton = document.createElement('button');\nnewGameButton.className = 'button newGame-button';\nnewGameButton.innerHTML = 'New Game';\nnewAndTopBox.appendChild(newGameButton);\n\n// const top10Button = document.createElement('button');\n// top10Button.className = 'button top10-button';\n// top10Button.innerHTML = 'Top 10';\n// newAndTopBox.appendChild(top10Button);\n\nconst moves = document.createElement('button');\nmoves.className = 'button moves-display';\nmoves.innerHTML = 'Moves: ';\ntimerAndMovesBox.appendChild(moves);\n\nconst moveCount = document.createElement('span');\nmoveCount.classList = \"move-count\"\nmoveCount.innerHTML = `${0}`;\nmoves.appendChild(moveCount);\n\nconst timer = document.createElement('button');\ntimer.className = 'button timer-display';\ntimer.innerHTML = 'Time: ';\ntimerAndMovesBox.appendChild(timer);\n\nlet colWidth = 30;\nlet colHeight = 30;\nlet cols = 10;\nlet rows = 10;\n\n\n// Drawing the gameboard\nconst drawBoard = (cols,rows) => {\n  const canvas = document.createElement('canvas');\n  canvas.className = 'canvas';\n  canvas.height = colHeight * cols;\n  canvas.width = colWidth * rows;\n  root.appendChild(canvas);\n\n  const ctx = canvas.getContext('2d');\n  for (let i = 0; i < rows; i++) {\n    for (let j = 0; j < cols; j++) {\n      ctx.strokeStyle = '#9fb3c1';\n      ctx.strokeRect(i * colWidth,j * colHeight,colWidth,colHeight);\n    }\n  }\n}\n\n// Removing the gameboard\nconst eraseBoard = () => {\n  document.querySelector('.canvas').remove();\n}\n\n\nwindow.addEventListener('load',function () {\n\n  let minesCount = 15;\n  let rows = 10;\n  let cols = 10;\n\n  drawBoard(10,10);\n  let newGame = new Game();\n\n  newGame.start(minesCount,rows,cols);\n\n  newGameButton.addEventListener('click',function (e) {\n    document.querySelector('.time-count').remove();\n    // document.querySelector('.move-count').remove();\n    clearInterval(this.timer);\n    eraseBoard();\n    drawBoard(10,10);\n    let movesCount = document.querySelector(\".move-count\");\n    movesCount.innerHTML = `${0}`;\n    newGame.start(minesCount,rows,cols);\n  })\n\n})\n\n\n\n\n\n//# sourceURL=webpack:///./src/js/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/main.js");
/******/ 	
/******/ })()
;