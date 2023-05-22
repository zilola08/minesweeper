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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/main.scss */ \"./src/scss/main.scss\");\n\n\n\nlet minesArray = [];\nlet minesCount = 10;\nlet rows = 10;\nlet cols = 10;\nlet cellValue = 1;\n\nlet colWidth = 40;\nlet colHeight = 40;\n\nconst root = document.querySelector('.root');\nconst canvas = document.createElement('canvas');\ncanvas.className = 'canvas';\nroot.appendChild(canvas);\n\nwindow.addEventListener('load',function () {\n  const ctx = canvas.getContext('2d');\n  canvas.height = colHeight * cols;\n  canvas.width = colWidth * rows;\n\n  // Drawing the gameboard\n  for (let i = 0; i < rows; i++) {\n    for (let j = 0; j < cols; j++) {\n      ctx.strokeStyle = 'gray';\n      ctx.strokeRect(i * colWidth,j * colHeight,colWidth,colHeight);\n    }\n  }\n\n  // Hide the mines\n  for (let i = 0; i < minesCount; i++) {\n    let mine = Math.ceil(Math.random() * minesCount);\n    minesArray.push(mine);\n  }\n\n  console.log(minesArray);\n\n  // Exposing all mines (from downloaded img)\n  for (let i = 0; i < rows; i++) {\n    for (let j = 0; j < cols; j++) {\n      ctx.fillStyle = 'lightgray';\n      ctx.fillRect(i * colWidth,j * colHeight,colWidth,colHeight);\n      ctx.strokeStyle = 'black';\n      ctx.strokeRect(i * colWidth,j * colHeight,colWidth,colHeight);\n    }\n  }\n  let mineImg = new Image();\n  mineImg.addEventListener(\n    \"load\",\n    () => {\n      for (let i = 0; i < rows; i++) {\n        ctx.clearRect(((minesArray[i] - 1) * colWidth),i * colWidth,colWidth,colHeight);\n        ctx.fillStyle = 'pink';\n        ctx.fillRect(((minesArray[i] - 1) * colWidth),i * colWidth,colWidth,colHeight);\n        ctx.strokeStyle = 'black';\n        ctx.strokeRect(((minesArray[i] - 1) * colWidth),i * colWidth,colWidth,colHeight);\n        ctx.drawImage(mineImg,((minesArray[i] - 1) * colWidth),i * colWidth);\n      }\n    },\n    false\n  );\n  mineImg.src = \"./assets/img/small-mine-40.png\";\n\n\n\n  // Drawing mines as red circles\n  // for (let i = 0; i < rows; i++) {\n  // ctx.beginPath();\n  // ctx.arc((minesArray[i] * colWidth) - colWidth / 2,i * colWidth + colWidth / 2,colHeight / 3,0,Math.PI * 2);\n  // ctx.fillStyle = 'red';\n  // ctx.fill();\n\n  // ctx.drawImage(mineImg,(minesArray[i] * colWidth) - colWidth / 2,i * colWidth + colWidth / 2)\n  // }\n\n\n\n\n  class Game {\n    constructor(width,height) {\n      this.width = width;\n      this.height = width;\n    }\n\n    update() {\n\n    }\n\n    draw() {\n      for (let i = 0; i < rows; i++) {\n        let colWidth = 50;\n        let colHeight = 50;\n\n        for (let j = 0; j < cols; j++) {\n          ctx.strokeRect(i * colWidth,j * colHeight,colWidth,colHeight);\n        }\n      }\n\n    }\n  }\n})\n\n// const gameboard = document.createElement('div');\n// gameboard.className = 'gameboard';\n// root.appendChild(gameboard);\n\n// for (let i = 0; i < rows; i++) {\n  //   let colWidth = 50;\n  //   let colHeight = 50;\n  //   let boardRow = document.createElement('div');\n  //   boardRow.className = 'boardRow';\n  //   gameboard.appendChild(boardRow);\n  //   boardRow.style.width = `${colWidth * cols}px`;\n  //   boardRow.style.height = `${colHeight}px`;\n  //   gameboard.style.width = `${colWidth * cols}px`;\n  //   gameboard.style.height = `${colHeight * cols}px`;\n\n  // for (let j = 0; j < cols; j++) {\n\n    //     let boardCol = document.createElement('div');\n    //     boardCol.className = 'boardCol';\n    //     boardRow.appendChild(boardCol);\n    //     boardCol.style.width = `${colWidth}px`;\n    //     boardCol.style.height = `${colHeight}px`;\n    //     boardCol.style.display = 'inline-block';\n\n  // }\n// }\n\n\n\n//# sourceURL=webpack:///./src/js/main.js?");

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