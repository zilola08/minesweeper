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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/main.scss */ \"./src/scss/main.scss\");\n\n\n\nconst minesArray = [];\nconst mineIndexesArray = [];\nlet minesCount = 10;\nlet rows = 10;\nlet cols = 10;\nlet cellCount = rows * cols;\nlet colWidth = 30;\nlet colHeight = 30;\n\nconst minesAroundArray = [];\n\nconst root = document.querySelector('.root');\nconst canvas = document.createElement('canvas');\ncanvas.className = 'canvas';\nroot.appendChild(canvas);\n\nwindow.addEventListener('load',function () {\n  const ctx = canvas.getContext('2d');\n  canvas.height = colHeight * cols;\n  canvas.width = colWidth * rows;\n\n  // Drawing the gameboard\n  const drawBoard = () => {\n    for (let i = 0; i < rows; i++) {\n      for (let j = 0; j < cols; j++) {\n        ctx.strokeStyle = '#9fb3c1';\n        ctx.strokeRect(i * colWidth,j * colHeight,colWidth,colHeight);\n      }\n    }\n  }\n\n\n  // Place the mines\n  const placeMines = () => {\n\n    for (let i = 0; i < minesCount; i++) {\n      let mine = Math.ceil(Math.random() * minesCount);\n      minesArray.push(mine);\n    }\n\n    for (let i = 0; i < minesCount; i++) {\n      let mineIndex = (i * rows) + minesArray[i] - 1;\n      mineIndexesArray.push(mineIndex);\n    }\n  }\n\n  const openUnopened = () => {\n    for (let i = 0; i < cellCount; i++) {\n      if (!isCellOpen[i]) {\n        let x = ((i) % cols) * colWidth;\n        let y = (Math.floor(i / rows)) * colHeight;\n\n        ctx.fillStyle = '#6b7985';\n        ctx.fillRect(x,y,colWidth,colHeight);\n        ctx.strokeStyle = '#404950';\n        ctx.strokeRect(x,y,colWidth,colHeight);\n\n        isCellOpen.splice(i,1,true);\n      }\n    }\n  }\n\n  // Exposing all mines (from downloaded img)\n  const exposeMines = (didWin) => {\n    openUnopened();\n\n    let color;\n\n    if (didWin == true) {\n      color = 'green';\n    } else {\n      color = 'pink';\n    }\n\n    let mineImg = new Image();\n    mineImg.addEventListener(\n      \"load\",\n      () => {\n        for (let i = 0; i < rows; i++) {\n          ctx.clearRect(((minesArray[i] - 1) * colWidth),i * colWidth,colWidth,colHeight);\n          ctx.fillStyle = color;\n          ctx.fillRect(((minesArray[i] - 1) * colWidth),i * colWidth,colWidth,colHeight);\n          ctx.strokeStyle = 'black';\n          ctx.strokeRect(((minesArray[i] - 1) * colWidth),i * colWidth,colWidth,colHeight);\n          ctx.drawImage(mineImg,((minesArray[i] - 1) * colWidth),i * colWidth);\n        }\n      },\n      false\n    );\n    mineImg.src = `./assets/img/small-mine-${colWidth}.png`;\n  }\n\n  function getCursorPosition(canvas,event) {\n    const rect = canvas.getBoundingClientRect()\n    x = event.clientX - rect.left;\n    y = event.clientY - rect.top;\n    let rowClicki = Math.floor(y / colWidth) + 1;\n    let colClickj = Math.floor(x / colHeight) + 1;\n    coords = [rowClicki,colClickj];\n    return coords;\n  }\n\n  function randomExcluded(min,max,excluded) {\n    var n = Math.floor(Math.random() * (max - min) + min);\n    if (n >= excluded) n++;\n    return n;\n  }\n\n  const checkFirstClick = () => {\n    if (coords[1] == minesArray[coords[0] - 1]) {\n      let newMine = randomExcluded(1,10,minesArray[coords[0] - 1]);\n      minesArray.splice(coords[0] - 1,1,newMine);\n    }\n  }\n  // coords[1] == minesArray[coords[0] - 1]\n  const isMine = (x,y) => {\n    if (y == minesArray[x - 1]) {\n      return true;\n    } else {\n      return false;\n    }\n  }\n\n  const countMinesAround = (ipos,jpos) => {\n    minesAround = 0;\n    // cells on the row above, start from the left\n    if (isMine(ipos - 1,jpos - 1)) {\n      minesAround++;\n    }\n    if (isMine(ipos - 1,jpos)) {\n      minesAround++;\n    }\n    if (isMine(ipos - 1,jpos + 1)) {\n      minesAround++;\n    }\n\n    // cells on the same row, start from the left\n    if (isMine(ipos,jpos - 1)) {\n      minesAround++;\n    }\n    if (isMine(ipos,jpos + 1)) {\n      minesAround++;\n    }\n\n    // cells on the row below, start from the left\n    if (isMine(ipos + 1,jpos - 1)) {\n      minesAround++;\n    }\n    if (isMine(ipos + 1,jpos)) {\n      minesAround++;\n    }\n    if (isMine(ipos + 1,jpos + 1)) {\n      minesAround++;\n    }\n    return minesAround;\n  };\n\n  const countMinesAroundAll = () => {\n    for (let i = 0; i < rows; i++) {\n      for (let j = 0; j < cols; j++) {\n        minesAroundArray.push(countMinesAround(i + 1,j + 1));\n      }\n    }\n    return minesAroundArray;\n  };\n\n  const open = (i,j) => {\n\n    if (i < 1 || j < 1 || i > rows || j > cols) { return; }\n\n    if (!isMine(i,j)) {\n      if (countMinesAround(i,j) == 0) {\n        styleOpenCell(i,j);\n        expandOpen(i,j);\n      }\n      else {\n        // if there are mines Around\n        showMinesAround(i,j);\n        // unopenedCellsCount--;\n      };\n    } else {\n      exposeMines(false);\n    }\n  }\n\n  const styleOpenCell = (x,y) => {\n\n    if (x < 1 || y < 1 || x > rows || y > cols) {\n      return;\n    }\n\n    // ctx.fillRect(x,y,colWidth,colHeight);\n    // ctx.strokeRect(x,y,colWidth,colHeight);\n\n    ctx.fillStyle = '#8294a4';\n    // ctx.fillStyle = 'lightgray';\n    ctx.fillRect((y * colWidth) - colWidth,(x * colHeight) - colHeight,colWidth,colHeight);\n    ctx.strokeStyle = '#404950';\n    // ctx.strokeStyle = 'black';\n    ctx.strokeRect((y * colWidth) - colWidth,(x * colHeight) - colHeight,colWidth,colHeight);\n\n    let cellIndex = ((x - 1) * rows) + y - 1;\n    isCellOpen.splice(cellIndex,1,true);\n  };\n\n  const showMinesAround = (x,y) => {\n    if (x < 1 || y < 1 || x > rows || y > cols) {\n      return;\n    }\n    styleOpenCell(x,y);\n    ctx.font = \"20px Verdana\";\n    ctx.textAlign = 'center'\n\n    if (countMinesAround(x,y) == 1) {\n      ctx.fillStyle = \"#a2d2ff\";\n    } else if (countMinesAround(x,y) == 2) {\n      ctx.fillStyle = \"#ffafcc\";\n    } else if (countMinesAround(x,y) == 3) {\n      ctx.fillStyle = \"#cdb4db\";\n    } else if (countMinesAround(x,y) == 4) {\n      ctx.fillStyle = \"#fcf6bd\";\n    } else if (countMinesAround(x,y) == 5) {\n      ctx.fillStyle = \"#f1faee\";\n    } else {\n      ctx.fillStyle = \"#f5af63\";\n    }\n\n    ctx.fillText(`${countMinesAround(x,y)}`,(y * colWidth) - colWidth / 2,(x * colHeight) - colHeight / 4);\n\n  }\n\n  const expandOpen = (i,j) => {\n\n    if (i < 1 || j < 1 || i > rows || j > cols) {\n      return;\n    }\n\n    let cellIndex = ((i - 1) * rows) + j - 1;\n\n    if (minesAroundArray[cellIndex - 11] == 0 && !isCellOpen[cellIndex - 11]) {\n      styleOpenCell(i - 1,j - 1);\n      open(i - 1,j - 1);\n    }\n    else if (minesAround[cellIndex - 11] !== 0 && !isCellOpen[cellIndex - 11]) {\n      showMinesAround(i - 1,j - 1);\n    }\n    if (minesAroundArray[cellIndex - 10] == 0 && !isCellOpen[cellIndex - 10]) {\n      styleOpenCell(i - 1,j);\n      open(i - 1,j);\n    }\n    else if (minesAround[cellIndex - 10] !== 0 && !isCellOpen[cellIndex - 10]) {\n      showMinesAround(i - 1,j);\n    }\n    if (minesAroundArray[cellIndex - 9] == 0 && !isCellOpen[cellIndex - 9]) {\n      styleOpenCell(i - 1,j + 1);\n      open(i - 1,j + 1);\n    }\n    else if (minesAround[cellIndex - 9] !== 0 && !isCellOpen[cellIndex - 9]) {\n      showMinesAround(i - 1,j + 1);\n    }\n\n    if (minesAroundArray[cellIndex - 1] == 0 && !isCellOpen[cellIndex - 1]) {\n      styleOpenCell(i,j - 1);\n      open(i,j - 1);\n    }\n    else if (minesAround[cellIndex - 1] !== 0 && !isCellOpen[cellIndex - 1]) {\n      showMinesAround(i,j - 1);\n    }\n    if (minesAroundArray[cellIndex + 1] == 0 && !isCellOpen[cellIndex + 1]) {\n      styleOpenCell(i,j + 1);\n      open(i,j + 1);\n    }\n    else if (minesAround[cellIndex + 1] !== 0 && !isCellOpen[cellIndex + 1]) {\n      showMinesAround(i,j + 1);\n    }\n\n    if (minesAroundArray[cellIndex + 9] == 0 && !isCellOpen[cellIndex + 9]) {\n      styleOpenCell(i + 1,j - 1);\n      open(i + 1,j - 1);\n    }\n    else if (minesAround[cellIndex + 9] !== 0 && !isCellOpen[cellIndex + 9]) {\n      showMinesAround(i + 1,j - 1);\n    }\n    if (minesAroundArray[cellIndex + 10] == 0 && !isCellOpen[cellIndex + 10]) {\n      styleOpenCell(i + 1,j);\n      open(i + 1,j);\n    }\n    else if (minesAround[cellIndex + 10] !== 0 && !isCellOpen[cellIndex + 10]) {\n      showMinesAround(i + 1,j);\n    }\n    if (minesAroundArray[cellIndex + 11] == 0 && !isCellOpen[cellIndex + 11]) {\n      styleOpenCell(i + 1,j + 1);\n      open(i + 1,j + 1);\n    }\n    else if (minesAround[cellIndex + 11] !== 0 && !isCellOpen[cellIndex + 11]) {\n      showMinesAround(i + 1,j + 1);\n    }\n  };\n\n  let isCellFlaggedArray = new Array(cellCount).fill(false);\n\n  let flags = [];\n  let flagIndexes = [];\n\n  const flagCell = (i,j) => {\n    let cellIndex = ((i - 1) * rows) + j - 1;\n\n    isCellFlaggedArray.splice(cellIndex,1,true);\n\n    flagIndexes.push(cellIndex);\n    flagIndexes.sort((a,b) => a.i - b.i);\n\n    isCellOpen.splice(cellIndex,1,'flagged');\n\n    let x = ((j - 1) * colWidth);\n    let y = (i - 1) * colHeight;\n\n    let flagImg = new Image();\n    flagImg.addEventListener(\n      \"load\",\n      () => {\n        ctx.clearRect(x,y,colWidth,colHeight);\n        ctx.fillStyle = '#a2efdf';\n        ctx.fillRect(x,y,colWidth,colHeight);\n        ctx.strokeStyle = 'black';\n        ctx.strokeRect(x,y,colWidth,colHeight);\n        ctx.drawImage(flagImg,x,y);\n      },\n      false\n    );\n    flagImg.src = \"./assets/img/flag1-30.png\";\n  }\n\n  const unflag = (i,j) => {\n\n    let cellIndex = ((i - 1) * rows) + j - 1;\n\n    isCellFlaggedArray.splice(cellIndex,1,false);\n    isCellOpen.splice(cellIndex,1,false);\n\n    function filterOutFlag(flag) {\n      return (flag.i !== i && flag.j == j)\n    }\n\n    flags = flags.filter(filterOutFlag);\n    flagIndexes = flagIndexes.filter((el) => el !== cellIndex);\n\n    let x = ((j - 1) * colWidth);\n    let y = (i - 1) * colHeight;\n    ctx.clearRect(x,y,colWidth,colHeight);\n    ctx.strokeStyle = 'gray';\n    ctx.strokeRect(x,y,colWidth,colHeight);\n  }\n\n  const checkIfWon = () => {\n\n    const arrayMatch = (array1,array2) =>\n      array2.every((element) => array1.includes(element));\n\n    if (arrayMatch(flagIndexes,mineIndexesArray)) {\n      // if all mines were flagged\n      exposeMines(true);\n      window.alert(\"You Won!\");\n      return true;\n    }\n\n    else if (isCellOpen.filter(el => el == false).length == minesCount) {\n      exposeMines(true);\n      window.alert(\"You Won!\");\n      return true;\n    }\n    // if all mines were flagged\n\n    //if flagged cells number is not equal to the minesCount\n    else {\n      return false;\n    }\n  }\n\n  // class Game {\n  //   constructor(width,height) {\n  //     this.width = width;\n  //     this.height = width;\n  //   }\n\n  //   update() {\n\n  //   }\n\n  //   draw() {\n\n\n  //   }\n  // }\n\n  drawBoard();\n\n  let x = 0;\n  let y = 0;\n  let clicks = 0;\n  let coords = [];\n  let isCellOpen = new Array(cellCount).fill(false);\n  let clickedCellIndex;\n  let minesAround;\n\n  canvas.addEventListener('contextmenu',function (e) {\n    e.preventDefault();\n  });\n\n  canvas.addEventListener('mousedown',function (e) {\n\n\n    clicks++;\n    getCursorPosition(canvas,e);\n    clickedCellIndex = ((coords[0] - 1) * minesCount) + coords[1] - 1;\n\n    if (clicks == 1) {\n      placeMines();\n      checkFirstClick();\n    }\n    countMinesAroundAll();\n\n    //left-click\n    if (e.button !== 2) {\n\n      // place mines only after the first click\n      // and replace the mine with another is first click was on a mine\n      // check is cell is already open\n      // and if it is not\n      if (!isCellOpen[clickedCellIndex]) {\n        open(coords[0],coords[1]);\n      }\n      else if (isCellOpen[clickedCellIndex] == true) {\n        console.log('already open cell');\n      }\n\n      checkIfWon();\n\n    }\n    //right-click\n    else {\n      if (isCellOpen[clickedCellIndex] !== 'flagged' && isCellOpen[clickedCellIndex] == false) {\n        flagCell(coords[0],coords[1]);\n      }\n      else if (isCellOpen[clickedCellIndex] == 'flagged') {\n        unflag(coords[0],coords[1]);\n      }\n\n      checkIfWon();\n    }\n  })\n\n})\n\n\n\n\n\n//# sourceURL=webpack:///./src/js/main.js?");

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