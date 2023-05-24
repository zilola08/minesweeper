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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/main.scss */ \"./src/scss/main.scss\");\n\n\n\nlet minesArray = [];\nlet minesCount = 10;\nlet rows = 10;\nlet cols = 10;\nlet cellCount = 100;\n\nlet colWidth = 40;\nlet colHeight = 40;\n\nconst minesAroundArray = [];\n\nconst root = document.querySelector('.root');\nconst canvas = document.createElement('canvas');\ncanvas.className = 'canvas';\nroot.appendChild(canvas);\n\nwindow.addEventListener('load',function () {\n  const ctx = canvas.getContext('2d');\n  canvas.height = colHeight * cols;\n  canvas.width = colWidth * rows;\n\n  // Drawing the gameboard\n  const drawBoard = () => {\n    for (let i = 0; i < rows; i++) {\n      for (let j = 0; j < cols; j++) {\n        ctx.strokeStyle = 'gray';\n        ctx.strokeRect(i * colWidth,j * colHeight,colWidth,colHeight);\n      }\n    }\n  }\n\n\n  // Place the mines\n  const placeMines = () => {\n\n    for (let i = 0; i < minesCount; i++) {\n      let mine = Math.ceil(Math.random() * minesCount);\n      minesArray.push(mine);\n    }\n\n    console.log(minesArray);\n  }\n\n  // Exposing all mines (from downloaded img)\n  const exposeMines = () => {\n    for (let i = 0; i < cellCount; i++) {\n      if (!isCellOpen[i]) {\n        // console.log(i);\n        // console.log(isCellOpen);\n\n        let x = ((i) % cols) * colWidth;\n        let y = (Math.floor(i / rows)) * colHeight;\n\n        ctx.fillStyle = 'lightgray';\n        ctx.fillRect(x,y,colWidth,colHeight);\n        ctx.strokeStyle = 'black';\n        ctx.strokeRect(x,y,colWidth,colHeight);\n      }\n    }\n    // console.log(isCellOpen);\n    let mineImg = new Image();\n    mineImg.addEventListener(\n      \"load\",\n      () => {\n        for (let i = 0; i < rows; i++) {\n          ctx.clearRect(((minesArray[i] - 1) * colWidth),i * colWidth,colWidth,colHeight);\n          ctx.fillStyle = 'pink';\n          ctx.fillRect(((minesArray[i] - 1) * colWidth),i * colWidth,colWidth,colHeight);\n          ctx.strokeStyle = 'black';\n          ctx.strokeRect(((minesArray[i] - 1) * colWidth),i * colWidth,colWidth,colHeight);\n          ctx.drawImage(mineImg,((minesArray[i] - 1) * colWidth),i * colWidth);\n        }\n      },\n      false\n    );\n    mineImg.src = \"./assets/img/small-mine-40.png\";\n\n  }\n\n  function getCursorPosition(canvas,event) {\n    const rect = canvas.getBoundingClientRect()\n    x = event.clientX - rect.left;\n    y = event.clientY - rect.top;\n    let rowClicki = Math.floor(y / 40) + 1;\n    let colClickj = Math.floor(x / 40) + 1;\n    // console.log(\"x: \" + x + \" y: \" + y);\n    // console.log(\"i: \" + colClicki + \" j: \" + rowClickj);\n    coords = [rowClicki,colClickj];\n    return coords;\n  }\n\n  function randomExcluded(min,max,excluded) {\n    var n = Math.floor(Math.random() * (max - min) + min);\n    if (n >= excluded) n++;\n    return n;\n  }\n\n  const checkFirstClick = () => {\n    if (coords[1] == minesArray[coords[0] - 1]) {\n      let newMine = randomExcluded(1,10,minesArray[coords[0] - 1]);\n      minesArray.splice(coords[0] - 1,1,newMine);\n      console.log(minesArray);\n    }\n  }\n  // coords[1] == minesArray[coords[0] - 1]\n  const isMine = (x,y) => {\n    if (y == minesArray[x - 1]) {\n      return true;\n    } else {\n      return false;\n    }\n  }\n\n  const countMinesAround = (ipos,jpos) => {\n    minesAround = 0;\n    // cells on the row above, start from the left\n    if (isMine(ipos - 1,jpos - 1)) {\n      minesAround++;\n    }\n    if (isMine(ipos - 1,jpos)) {\n      minesAround++;\n    }\n    if (isMine(ipos - 1,jpos + 1)) {\n      minesAround++;\n    }\n\n    // cells on the same row, start from the left\n    if (isMine(ipos,jpos - 1)) {\n      minesAround++;\n    }\n    if (isMine(ipos,jpos + 1)) {\n      minesAround++;\n    }\n\n    // cells on the row below, start from the left\n    if (isMine(ipos + 1,jpos - 1)) {\n      minesAround++;\n    }\n    if (isMine(ipos + 1,jpos)) {\n      minesAround++;\n    }\n    if (isMine(ipos + 1,jpos + 1)) {\n      minesAround++;\n    }\n    return minesAround;\n  };\n\n  const countMinesAroundAll = () => {\n    for (let i = 0; i < rows; i++) {\n      for (let j = 0; j < cols; j++) {\n        minesAroundArray.push(countMinesAround(i + 1,j + 1));\n      }\n    }\n    return minesAroundArray;\n  };\n\n  const open = (i,j) => {\n\n    if (i < 1 || j < 1 || i > rows || j > cols) {\n      return;\n    }\n\n    if (!isMine(i,j)) {\n      if (countMinesAround(i,j) == 0) {\n        expandOpen(i,j);\n\n        let cellIndex = ((i - 1) * rows) + j - 1;\n\n      }\n      else {\n        // if there are mines Around\n        // show minesAround\n        showMinesAround(i,j);\n      };\n    } else {\n      exposeMines();\n    }\n  }\n\n  const styleOpenCell = (x,y) => {\n\n    if (x < 1 || y < 1 || x > rows || y > cols) {\n      return;\n    }\n\n    ctx.fillStyle = 'lightgray';\n    ctx.fillRect((y * colWidth) - colWidth,(x * colHeight) - colHeight,colWidth,colHeight);\n    ctx.strokeStyle = 'black';\n    ctx.strokeRect((y * colWidth) - colWidth,(x * colHeight) - colHeight,colWidth,colHeight);\n\n    let cellIndex = ((x - 1) * rows) + y - 1;\n    isCellOpen.splice(cellIndex,1,true);\n    // console.log(x, y, cellIndex, isCellOpen.splice(cellIndex,1,true))\n  };\n\n  const showMinesAround = (x,y) => {\n    styleOpenCell(x,y);\n    ctx.font = \"35px Georgia\";\n    ctx.fillStyle = \"red\";\n    ctx.textAlign = 'center'\n    ctx.fillText(`${countMinesAround(x,y)}`,(y * colWidth) - colWidth / 2,(x * colHeight) - colHeight / 3.3);\n  }\n\n  const expandOpen = (i,j) => {\n\n    if (i < 1 || j < 1 || i > rows || j > cols) {\n      return;\n    }\n\n    let cellIndex = ((i - 1) * rows) + j - 1;\n\n    if (minesAroundArray[cellIndex - 11] == 0 && !isCellOpen[cellIndex - 11]) {\n      styleOpenCell(i - 1,j - 1);\n      open(i - 1,j - 1);\n    }\n    else if (minesAround[cellIndex - 11] !== 0 && !isCellOpen[cellIndex - 11]) {\n      showMinesAround(i - 1,j - 1);\n    }\n    if (minesAroundArray[cellIndex - 10] == 0 && !isCellOpen[cellIndex - 10]) {\n      styleOpenCell(i - 1,j);\n      open(i - 1,j);\n    }\n    else if (minesAround[cellIndex - 10] !== 0 && !isCellOpen[cellIndex - 10]) {\n      showMinesAround(i - 1,j);\n    }\n    if (minesAroundArray[cellIndex - 9] == 0 && !isCellOpen[cellIndex - 9]) {\n      styleOpenCell(i - 1,j + 1);\n      open(i - 1,j + 1);\n    }\n    else if (minesAround[cellIndex - 9] !== 0 && !isCellOpen[cellIndex - 9]) {\n      showMinesAround(i - 1,j + 1);\n    }\n\n    if (minesAroundArray[cellIndex - 1] == 0 && !isCellOpen[cellIndex - 1]) {\n      styleOpenCell(i,j - 1);\n      open(i,j - 1);\n    }\n    else if (minesAround[cellIndex - 1] !== 0 && !isCellOpen[cellIndex - 1]) {\n      showMinesAround(i,j - 1);\n    }\n    if (minesAroundArray[cellIndex + 1] == 0 && !isCellOpen[cellIndex + 1]) {\n      styleOpenCell(i,j + 1);\n      open(i,j + 1);\n    }\n    else if (minesAround[cellIndex + 1] !== 0 && !isCellOpen[cellIndex + 1]) {\n      showMinesAround(i,j + 1);\n    }\n\n    if (minesAroundArray[cellIndex + 9] == 0 && !isCellOpen[cellIndex + 9]) {\n      styleOpenCell(i + 1,j - 1);\n      open(i + 1,j - 1);\n    }\n    else if (minesAround[cellIndex + 9] !== 0 && !isCellOpen[cellIndex + 9]) {\n      showMinesAround(i + 1,j - 1);\n    }\n    if (minesAroundArray[cellIndex + 10] == 0 && !isCellOpen[cellIndex + 10]) {\n      styleOpenCell(i + 1,j);\n      open(i + 1,j);\n    }\n    else if (minesAround[cellIndex + 10] !== 0 && !isCellOpen[cellIndex + 10]) {\n      showMinesAround(i + 1,j);\n    }\n    if (minesAroundArray[cellIndex + 11] == 0 && !isCellOpen[cellIndex + 11]) {\n      styleOpenCell(i + 1,j + 1);\n      open(i + 1,j + 1);\n    }\n    else if (minesAround[cellIndex + 11] !== 0 && !isCellOpen[cellIndex + 11]) {\n      showMinesAround(i + 1,j + 1);\n    }\n  };\n\n  // class Game {\n  //   constructor(width,height) {\n  //     this.width = width;\n  //     this.height = width;\n  //   }\n\n  //   update() {\n\n  //   }\n\n  //   draw() {\n\n\n  //   }\n  // }\n\n  drawBoard();\n\n  let x = 0;\n  let y = 0;\n  let clicks = 0;\n  let coords = [];\n  let isCellOpen = new Array(cellCount).fill(false);\n  // console.log(isCellOpen);\n  let clickedCellIndex;\n  let minesAround;\n\n  canvas.addEventListener('mousedown',function (e) {\n    clicks++;\n    getCursorPosition(canvas,e);\n    clickedCellIndex = ((coords[0] - 1) * minesCount) + coords[1] - 1;\n\n    // place mines only after the first click\n    // and replace the mine with another is first click was on a mine\n    if (clicks == 1) {\n      placeMines();\n      checkFirstClick();\n      // console.log(countMinesAroundAll());\n    }\n    countMinesAroundAll();\n    // check is cell is already open\n    // and if it is not\n    if (!isCellOpen[clickedCellIndex]) {\n      open(coords[0],coords[1]);\n      // console.log(isCellOpen);\n    }\n    else {\n      // console.log(clickedCellIndex);\n      // console.log(isCellOpen[clickedCellIndex]);\n      console.log('already open cell');\n    }\n  })\n\n})\n\n\n\n//# sourceURL=webpack:///./src/js/main.js?");

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