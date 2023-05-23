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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/main.scss */ \"./src/scss/main.scss\");\n\n\n\nlet minesArray = [];\nlet minesCount = 10;\nlet rows = 10;\nlet cols = 10;\nlet cellCount = 100;\n\nlet colWidth = 40;\nlet colHeight = 40;\n\nconst minesAroundArray = [];\n\nconst root = document.querySelector('.root');\nconst canvas = document.createElement('canvas');\ncanvas.className = 'canvas';\nroot.appendChild(canvas);\n\nwindow.addEventListener('load',function () {\n  const ctx = canvas.getContext('2d');\n  canvas.height = colHeight * cols;\n  canvas.width = colWidth * rows;\n\n  // Drawing the gameboard\n  const drawBoard = () => {\n    for (let i = 0; i < rows; i++) {\n      for (let j = 0; j < cols; j++) {\n        ctx.strokeStyle = 'gray';\n        ctx.strokeRect(i * colWidth,j * colHeight,colWidth,colHeight);\n      }\n    }\n  }\n\n\n  // Place the mines\n  const placeMines = () => {\n\n    for (let i = 0; i < minesCount; i++) {\n      let mine = Math.ceil(Math.random() * minesCount);\n      minesArray.push(mine);\n    }\n\n    console.log(minesArray);\n  }\n\n  // Exposing all mines (from downloaded img)\n  const exposeMines = () => {\n    for (let i = 0; i < cellCount; i++) {\n      if (!isCellOpen[i]) {\n        // console.log(i);\n        // console.log(isCellOpen[i]);\n\n        let x = ((i) % cols) * colWidth;\n        let y = (Math.floor(i / rows)) * colHeight;\n\n        ctx.fillStyle = 'lightgray';\n        ctx.fillRect(x,y,colWidth,colHeight);\n        ctx.strokeStyle = 'black';\n        ctx.strokeRect(x,y,colWidth,colHeight);\n      }\n    }\n    // console.log(isCellOpen);\n    let mineImg = new Image();\n    mineImg.addEventListener(\n      \"load\",\n      () => {\n        for (let i = 0; i < rows; i++) {\n          ctx.clearRect(((minesArray[i] - 1) * colWidth),i * colWidth,colWidth,colHeight);\n          ctx.fillStyle = 'pink';\n          ctx.fillRect(((minesArray[i] - 1) * colWidth),i * colWidth,colWidth,colHeight);\n          ctx.strokeStyle = 'black';\n          ctx.strokeRect(((minesArray[i] - 1) * colWidth),i * colWidth,colWidth,colHeight);\n          ctx.drawImage(mineImg,((minesArray[i] - 1) * colWidth),i * colWidth);\n        }\n      },\n      false\n    );\n    mineImg.src = \"./assets/img/small-mine-40.png\";\n\n  }\n\n\n\n\n  // Drawing mines as red circles\n  // for (let i = 0; i < rows; i++) {\n  // ctx.beginPath();\n  // ctx.arc((minesArray[i] * colWidth) - colWidth / 2,i * colWidth + colWidth / 2,colHeight / 3,0,Math.PI * 2);\n  // ctx.fillStyle = 'red';\n  // ctx.fill();\n\n  // ctx.drawImage(mineImg,(minesArray[i] * colWidth) - colWidth / 2,i * colWidth + colWidth / 2)\n  // }\n\n\n\n\n  // class Game {\n  //   constructor(width,height) {\n  //     this.width = width;\n  //     this.height = width;\n  //   }\n\n  //   update() {\n\n  //   }\n\n  //   draw() {\n\n\n  //   }\n  // }\n\n  drawBoard();\n\n  function getCursorPosition(canvas,event) {\n    const rect = canvas.getBoundingClientRect()\n    x = event.clientX - rect.left;\n    y = event.clientY - rect.top;\n    let rowClicki = Math.floor(y / 40) + 1;\n    let colClickj = Math.floor(x / 40) + 1;\n    // console.log(\"x: \" + x + \" y: \" + y);\n    // console.log(\"i: \" + colClicki + \" j: \" + rowClickj);\n    coords = [rowClicki,colClickj];\n    return coords;\n  }\n\n  function randomExcluded(min,max,excluded) {\n    var n = Math.floor(Math.random() * (max - min) + min);\n    if (n >= excluded) n++;\n    return n;\n  }\n\n  const checkFirstClick = () => {\n    if (coords[1] == minesArray[coords[0] - 1]) {\n      let newMine = randomExcluded(1,10,minesArray[coords[0]]);\n      minesArray.splice(coords[0] - 1,1,newMine);\n      console.log(minesArray);\n    }\n  }\n  // coords[1] == minesArray[coords[0] - 1]\n  const isMine = (x,y) => {\n    if (y == minesArray[x - 1]) {\n      return true;\n    } else {\n      return false;\n    }\n  }\n\n  const countMinesAround = (ipos,jpos) => {\n    minesAround = 0;\n    // cells on the row above, start from the left\n    if (isMine(ipos - 1,jpos - 1)) {\n      minesAround++;\n    }\n    if (isMine(ipos - 1,jpos)) {\n      minesAround++;\n    }\n    if (isMine(ipos - 1,jpos + 1)) {\n      minesAround++;\n    }\n\n    // cells on the same row, start from the left\n    if (isMine(ipos,jpos - 1)) {\n      minesAround++;\n    }\n    if (isMine(ipos,jpos + 1)) {\n      minesAround++;\n    }\n\n    // cells on the row below, start from the left\n    if (isMine(ipos + 1,jpos - 1)) {\n      minesAround++;\n    }\n    if (isMine(ipos + 1,jpos)) {\n      minesAround++;\n    }\n    if (isMine(ipos + 1,jpos + 1)) {\n      minesAround++;\n    }\n    return minesAround;\n  };\n\n  const countMinesAroundAll = () => {\n    for (let i = 0; i < rows; i++) {\n      for (let j = 0; j < cols; j++) {\n        minesAroundArray.push(countMinesAround(i + 1,j + 1));\n      }\n    }\n    return minesAroundArray;\n  };\n\n\n  const styleOpenCell = (x,y) => {\n    ctx.fillStyle = 'lightgray';\n    ctx.fillRect((y * colWidth) - colWidth,(x * colHeight) - colHeight,colWidth,colHeight);\n    ctx.strokeStyle = 'black';\n    ctx.strokeRect((y * colWidth) - colWidth,(x * colHeight) - colHeight,colWidth,colHeight);\n  };\n\n  const showMinesAround = (x,y) => {\n    ctx.font = \"35px Georgia\";\n    ctx.fillStyle = \"red\";\n    ctx.textAlign = 'center'\n    ctx.fillText(`${countMinesAround(x,y)}`,(y * colWidth) - colWidth / 2,(x * colHeight) - colHeight / 3.3);\n  }\n\n  const expandOpen = (i,j) => {\n\n    if (i > rows || j > cols || i < 1 || j < 1) {\n      return;\n    };\n\n    if (countMinesAround(i,j) == 0) {\n      styleOpenCell(i,j);\n    }\n\n    if (countMinesAround(i,j) !== 0 && !isMine(i,j)) {\n      styleOpenCell(i,j);\n      showMinesAround(i,j);\n      return;\n    };\n\n    return expandOpen(i,j-1);\n  }\n\n  let x = 0;\n  let y = 0;\n  let clicks = 0;\n  let coords = [];\n  let isCellOpen = new Array(cellCount).fill(false);\n  let clickedCellIndex;\n  let minesAround;\n\n  canvas.addEventListener('mousedown',function (e) {\n    clicks++;\n    getCursorPosition(canvas,e);\n    console.log(coords,clicks);\n    clickedCellIndex = ((coords[0] - 1) * minesCount) + coords[1] - 1;\n    console.log(clickedCellIndex);\n\n    // place mines only after the forst click\n    // and replace the mine with another is first click was on a mine\n    if (clicks == 1) {\n      placeMines();\n      checkFirstClick();\n      console.log(countMinesAroundAll());\n    }\n\n\n    // countMinesAroundAll();\n    // console.log(minesAroundArray);\n\n    // check is cell is already open\n    // and if it is not\n    if (!isCellOpen[clickedCellIndex]) {\n      console.log(isMine());\n      // check if it is a mine\n      if (isMine(coords[0],coords[1])) {\n        //if it is a mine\n        //then - game over\n        exposeMines();\n      }\n      // if it is not a mine\n      else {\n        //if no mines around\n        if (countMinesAround(coords[0],coords[1]) == 0) {\n          // style the cell and do nothing\n          console.log('opening');\n          console.log('not a mine');\n          isCellOpen.splice(clickedCellIndex,1,true);\n          expandOpen(coords[0],coords[1]);\n          // styleOpenCell(coords[0],coords[1]);\n          // console.log(isCellOpen);\n\n        } else {\n          //if there are mines Around\n          //show minesAround\n          console.log(countMinesAround(coords[0],coords[1]));\n          styleOpenCell();\n          showMinesAround(coords[0],coords[1]);\n          isCellOpen.splice(clickedCellIndex,1,true);\n        };\n      }\n    }\n    else if (isCellOpen[clickedCellIndex]) {\n      console.log('already open cell');\n    }\n\n\n\n  });\n\n\n})\n\n// const gameboard = document.createElement('div');\n// gameboard.className = 'gameboard';\n// root.appendChild(gameboard);\n\n// for (let i = 0; i < rows; i++) {\n  //   let colWidth = 50;\n  //   let colHeight = 50;\n  //   let boardRow = document.createElement('div');\n  //   boardRow.className = 'boardRow';\n  //   gameboard.appendChild(boardRow);\n  //   boardRow.style.width = `${colWidth * cols}px`;\n  //   boardRow.style.height = `${colHeight}px`;\n  //   gameboard.style.width = `${colWidth * cols}px`;\n  //   gameboard.style.height = `${colHeight * cols}px`;\n\n  // for (let j = 0; j < cols; j++) {\n\n    //     let boardCol = document.createElement('div');\n    //     boardCol.className = 'boardCol';\n    //     boardRow.appendChild(boardCol);\n    //     boardCol.style.width = `${colWidth}px`;\n    //     boardCol.style.height = `${colHeight}px`;\n    //     boardCol.style.display = 'inline-block';\n\n  // }\n// }\n\n\n\n//# sourceURL=webpack:///./src/js/main.js?");

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