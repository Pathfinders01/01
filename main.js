/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tweenjs/tween.js */ "./node_modules/@tweenjs/tween.js/dist/tween.esm.js");



class ThreeJSContainer {
    scene;
    light;
    cloudR;
    cloudG;
    cloudB;
    constructor() {
    }
    // 画面部分の作成(表示する枠ごとに)*
    createRendererDOM = (width, height, cameraPos) => {
        const renderer = new three__WEBPACK_IMPORTED_MODULE_2__.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_2__.Color(0x000000));
        renderer.shadowMap.enabled = true; //シャドウマップを有効にする
        //カメラの設定
        const camera = new three__WEBPACK_IMPORTED_MODULE_2__.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.copy(cameraPos);
        camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, 15, 0));
        const orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(camera, renderer.domElement);
        this.createScene();
        // 毎フレームのupdateを呼んで，render
        // reqestAnimationFrame により次フレームを呼ぶ
        const render = (time) => {
            orbitControls.update();
            renderer.render(this.scene, camera);
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    };
    // シーンの作成(全体で1回)
    createScene = () => {
        this.scene = new three__WEBPACK_IMPORTED_MODULE_2__.Scene();
        // テクスチャの追加 見た目を改善
        let generateSprite = (r, g, b) => {
            //新しいキャンバスの作成
            let canvas = document.createElement('canvas');
            canvas.width = 16;
            canvas.height = 16;
            //円形のグラデーションの作成
            let context = canvas.getContext('2d');
            let gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
            gradient.addColorStop(0.2, 'rgba(' + r + ',' + g + ',' + b + ',1)');
            gradient.addColorStop(0.2, 'rgba(' + r + ',' + g + ',' + b + ',1)');
            gradient.addColorStop(0.4, 'rgba(' + r / 4 + ',' + g / 4 + ',' + b / 4 + ',1)');
            gradient.addColorStop(1, 'rgba(0,0,0,1)');
            context.fillStyle = gradient;
            context.fillRect(0, 0, canvas.width, canvas.height);
            //テクスチャの生成
            let texture = new three__WEBPACK_IMPORTED_MODULE_2__.Texture(canvas);
            texture.needsUpdate = true;
            return texture;
        };
        // パーティクルの作成
        const geometryR = new three__WEBPACK_IMPORTED_MODULE_2__.BufferGeometry();
        const geometryG = new three__WEBPACK_IMPORTED_MODULE_2__.BufferGeometry();
        const geometryB = new three__WEBPACK_IMPORTED_MODULE_2__.BufferGeometry();
        // マテリアルの作成 赤
        const materialR = new three__WEBPACK_IMPORTED_MODULE_2__.PointsMaterial({
            size: 1,
            map: generateSprite(255, 0, 0),
            transparent: true,
            blending: three__WEBPACK_IMPORTED_MODULE_2__.AdditiveBlending,
            depthWrite: false,
        });
        // マテリアルの作成 緑
        const materialG = new three__WEBPACK_IMPORTED_MODULE_2__.PointsMaterial({
            size: 1,
            map: generateSprite(0, 255, 0),
            transparent: true,
            blending: three__WEBPACK_IMPORTED_MODULE_2__.AdditiveBlending,
            depthWrite: false,
        });
        // マテリアルの作成 青
        const materialB = new three__WEBPACK_IMPORTED_MODULE_2__.PointsMaterial({
            size: 1,
            map: generateSprite(0, 0, 255),
            transparent: true,
            blending: three__WEBPACK_IMPORTED_MODULE_2__.AdditiveBlending,
            depthWrite: false,
        });
        const particleNum = 500; // パーティクルの数
        const positionsR = new Float32Array(particleNum * 3);
        const positionsG = new Float32Array(particleNum * 3);
        const positionsB = new Float32Array(particleNum * 3);
        let particleIndex = 0;
        for (let i = 0; i < particleNum; ++i) {
            positionsR[particleIndex++] = 0; // x座標
            positionsR[particleIndex++] = 0; // y座標
            positionsR[particleIndex++] = 0; // z座標
            positionsG[particleIndex++] = 0; // x座標
            positionsG[particleIndex++] = 0; // y座標
            positionsG[particleIndex++] = 0; // z座標
            positionsB[particleIndex++] = 0; // x座標
            positionsB[particleIndex++] = 0; // y座標
            positionsB[particleIndex++] = 0; // z座標
        }
        // THREE.Pointsの作成
        geometryR.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_2__.BufferAttribute(positionsR, 3));
        // THREE.Pointsの作成
        geometryG.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_2__.BufferAttribute(positionsG, 3));
        // THREE.Pointsの作成
        geometryB.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_2__.BufferAttribute(positionsB, 3));
        // シーンへの追加
        this.cloudR = new three__WEBPACK_IMPORTED_MODULE_2__.Points(geometryR, materialR);
        this.cloudG = new three__WEBPACK_IMPORTED_MODULE_2__.Points(geometryG, materialG);
        this.cloudB = new three__WEBPACK_IMPORTED_MODULE_2__.Points(geometryB, materialB);
        this.scene.add(this.cloudR);
        this.scene.add(this.cloudG);
        this.scene.add(this.cloudB);
        // それぞれの花火のアニメーションを作成
        for (let i = 0; i < particleNum; ++i) {
            // Tweenでコントロールする変数の定義
            let tweeninfoR = { x: -8.0, y: 3.0, z: 5.0, index: i }; // tweenでコントロールする変数の定義
            let tweeninfoG = { x: 0.0, y: 5.0, z: 0.0, index: i }; // tweenでコントロールする変数の定義
            let tweeninfoB = { x: 8.0, y: 2.0, z: 5.0, index: i }; // tweenでコントロールする変数の定義
            //  Tweenでパラメータの更新の際に呼び出される関数
            let updatePosition = () => {
                let geometryR = this.cloudR.geometry;
                let geometryG = this.cloudG.geometry;
                let geometryB = this.cloudB.geometry;
                let positionsR = geometryR.getAttribute('position'); // 座標データ
                let positionsG = geometryG.getAttribute('position'); // 座標データ
                let positionsB = geometryB.getAttribute('position'); // 座標データ
                positionsR.setX(tweeninfoR.index, tweeninfoR.x);
                positionsR.setY(tweeninfoR.index, tweeninfoR.y);
                positionsR.setZ(tweeninfoR.index, tweeninfoR.z);
                positionsG.setX(tweeninfoG.index, tweeninfoG.x);
                positionsG.setY(tweeninfoG.index, tweeninfoG.y);
                positionsG.setZ(tweeninfoG.index, tweeninfoG.z);
                positionsB.setX(tweeninfoB.index, tweeninfoB.x);
                positionsB.setY(tweeninfoB.index, tweeninfoB.y);
                positionsB.setZ(tweeninfoB.index, tweeninfoB.z);
                positionsR.needsUpdate = true;
                positionsG.needsUpdate = true;
                positionsB.needsUpdate = true;
            };
            // 球面上の座標値
            const u = Math.random() * 2 * Math.PI;
            const v = Math.random() * 2 * Math.PI - Math.PI / 2;
            const r = 5;
            const toX = r * Math.cos(u) * Math.cos(v);
            const toY = r * Math.sin(u) * Math.cos(v);
            const toZ = r * Math.sin(v);
            // Tweenの作成 変化の仕方の変更
            let tweenUpR = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(tweeninfoR).to({ x: -8.0, y: 3.0, z: 5.0 }, 1000).easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Circular.Out).onUpdate(updatePosition);
            let tweenOpenR = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(tweeninfoR).to({ x: toX - 8.0, y: toY + 3.0, z: toZ + 5.0 }, 1000).easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Circular.Out).onUpdate(updatePosition);
            let tweenBackR = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(tweeninfoR).to({ x: -8.0, y: 3.0, z: 5.0 }, 1000).easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Circular.Out).onUpdate(updatePosition);
            let tweenDownR = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(tweeninfoR).to({ x: -8.0, y: 0.0, z: 5.0 }, 1000).easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Circular.Out).onUpdate(updatePosition);
            let tweenUpG = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(tweeninfoG).to({ x: 0.0, y: 5.0, z: 0.0 }, 1000).easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Circular.Out).onUpdate(updatePosition);
            let tweenOpenG = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(tweeninfoG).to({ x: toX, y: toY + 5.0, z: toZ }, 1000).easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Circular.Out).onUpdate(updatePosition);
            let tweenBackG = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(tweeninfoG).to({ x: 0.0, y: 5.0, z: 0.0 }, 1000).easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Circular.Out).onUpdate(updatePosition);
            let tweenDownG = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(tweeninfoG).to({ x: 0.0, y: 0.0, z: 0.0 }, 1000).easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Circular.Out).onUpdate(updatePosition);
            let tweenUpB = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(tweeninfoB).to({ x: 8.0, y: 2.0, z: 5.0 }, 1000).easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Circular.Out).onUpdate(updatePosition);
            let tweenOpenB = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(tweeninfoB).to({ x: toX + 8.0, y: toY + 2.0, z: toZ + 5.0 }, 1000).easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Circular.Out).onUpdate(updatePosition);
            let tweenBackB = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(tweeninfoB).to({ x: 8.0, y: 2.0, z: 5.0 }, 1000).easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Circular.Out).onUpdate(updatePosition);
            let tweenDownB = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(tweeninfoB).to({ x: 8.0, y: 0.0, z: 5.0 }, 1000).easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Circular.Out).onUpdate(updatePosition);
            tweenUpR.chain(tweenOpenR); // アニメーションを接続
            tweenOpenR.chain(tweenBackR); // アニメーションを接続
            tweenBackR.chain(tweenDownR); // アニメーションを接続
            tweenDownR.chain(tweenUpR); // アニメーションを接続
            tweenUpG.chain(tweenOpenG); // アニメーションを接続
            tweenOpenG.chain(tweenBackG); // アニメーションを接続
            tweenBackG.chain(tweenDownG); // アニメーションを接続
            tweenDownG.chain(tweenUpG); // アニメーションを接続
            tweenUpB.chain(tweenOpenB); // アニメーションを接続
            tweenOpenB.chain(tweenBackB); // アニメーションを接続
            tweenBackB.chain(tweenDownB); // アニメーションを接続
            tweenDownB.chain(tweenUpB); // アニメーションを接続
            tweenUpR.start(); // アニメーションの開始
            tweenOpenG.start(); // アニメーションの開始
            tweenDownB.start(); // アニメーションの開始
        }
        //ライトの設定
        this.light = new three__WEBPACK_IMPORTED_MODULE_2__.DirectionalLight(0xffffff);
        const lvec = new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(1, 1, 1).clone().normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
        // 毎フレームのupdateを呼んで，更新
        // reqestAnimationFrame により次フレームを呼ぶ
        let update = (time) => {
            requestAnimationFrame(update);
            _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.update(); //追加分
        };
        requestAnimationFrame(update);
    };
}
window.addEventListener("DOMContentLoaded", init);
function init() {
    let container = new ThreeJSContainer();
    let viewport = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, 0, 20));
    document.body.appendChild(viewport);
}


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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_tweenjs_tween_js_dist_tween_esm_js-node_modules_three_examples_jsm_contr-78d392"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RyxTQUFTLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUTtnQkFDN0QsSUFBSSxVQUFVLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFFBQVE7Z0JBQzdELElBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxRQUFRO2dCQUU3RCxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVoRCxVQUFVLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDOUIsVUFBVSxDQUFDLFdBQVcsR0FBRyxJQUFJLENB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LENBQUMsQ0FBQztJQUNsRixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN4QyxDQUFDOzs7Ozs7O1VDbFBEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSwrQkFBK0Isd0NBQXdDO1dBQ3ZFO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUJBQWlCLHFCQUFxQjtXQUN0QztXQUNBO1dBQ0Esa0JBQWtCLHFCQUFxQjtXQUN2QztXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gXCJ0aHJlZS9leGFtcGxlcy9qc20vY29udHJvbHMvT3JiaXRDb250cm9sc1wiO1xuaW1wb3J0ICogYXMgVFdFRU4gZnJvbSBcIkB0d2VlbmpzL3R3ZWVuLmpzXCI7XG5cbmNsYXNzIFRocmVlSlNDb250YWluZXIge1xuICAgIHByaXZhdGUgc2NlbmU6IFRIUkVFLlNjZW5lO1xuICAgIHByaXZhdGUgbGlnaHQ6IFRIUkVFLkxpZ2h0O1xuICAgIHByaXZhdGUgY2xvdWRSOiBUSFJFRS5Qb2ludHM7XG4gICAgcHJpdmF0ZSBjbG91ZEc6IFRIUkVFLlBvaW50cztcbiAgICBwcml2YXRlIGNsb3VkQjogVEhSRUUuUG9pbnRzO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICB9XG5cbiAgICAvLyDnlLvpnaLpg6jliIbjga7kvZzmiJAo6KGo56S644GZ44KL5p6g44GU44Go44GrKSpcbiAgICBwdWJsaWMgY3JlYXRlUmVuZGVyZXJET00gPSAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGNhbWVyYVBvczogVEhSRUUuVmVjdG9yMykgPT4ge1xuICAgICAgICBjb25zdCByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCk7XG4gICAgICAgIHJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHJlbmRlcmVyLnNldENsZWFyQ29sb3IobmV3IFRIUkVFLkNvbG9yKDB4MDAwMDAwKSk7XG4gICAgICAgIHJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gdHJ1ZTsgLy/jgrfjg6Pjg4njgqbjg57jg4Pjg5fjgpLmnInlirnjgavjgZnjgotcblxuICAgICAgICAvL+OCq+ODoeODqeOBruioreWumlxuICAgICAgICBjb25zdCBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHdpZHRoIC8gaGVpZ2h0LCAwLjEsIDEwMDApO1xuICAgICAgICBjYW1lcmEucG9zaXRpb24uY29weShjYW1lcmFQb3MpO1xuICAgICAgICBjYW1lcmEubG9va0F0KG5ldyBUSFJFRS5WZWN0b3IzKDAsIDE1LCAwKSk7XG5cbiAgICAgICAgY29uc3Qgb3JiaXRDb250cm9scyA9IG5ldyBPcmJpdENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIuZG9tRWxlbWVudCk7XG5cbiAgICAgICAgdGhpcy5jcmVhdGVTY2VuZSgpO1xuICAgICAgICAvLyDmr47jg5Xjg6zjg7zjg6Djga51cGRhdGXjgpLlkbzjgpPjgafvvIxyZW5kZXJcbiAgICAgICAgLy8gcmVxZXN0QW5pbWF0aW9uRnJhbWUg44Gr44KI44KK5qyh44OV44Os44O844Og44KS5ZG844G2XG4gICAgICAgIGNvbnN0IHJlbmRlcjogRnJhbWVSZXF1ZXN0Q2FsbGJhY2sgPSAodGltZSkgPT4ge1xuICAgICAgICAgICAgb3JiaXRDb250cm9scy51cGRhdGUoKTtcblxuICAgICAgICAgICAgcmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIGNhbWVyYSk7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcblxuICAgICAgICByZW5kZXJlci5kb21FbGVtZW50LnN0eWxlLmNzc0Zsb2F0ID0gXCJsZWZ0XCI7XG4gICAgICAgIHJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUubWFyZ2luID0gXCIxMHB4XCI7XG4gICAgICAgIHJldHVybiByZW5kZXJlci5kb21FbGVtZW50O1xuICAgIH1cblxuICAgIC8vIOOCt+ODvOODs+OBruS9nOaIkCjlhajkvZPjgacx5ZueKVxuICAgIHByaXZhdGUgY3JlYXRlU2NlbmUgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblxuICAgICAgICAvLyDjg4bjgq/jgrnjg4Hjg6Pjga7ov73liqAg6KaL44Gf55uu44KS5pS55ZaEXG4gICAgICAgIGxldCBnZW5lcmF0ZVNwcml0ZSA9IChyOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAvL+aWsOOBl+OBhOOCreODo+ODs+ODkOOCueOBruS9nOaIkFxuICAgICAgICAgICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICAgICAgY2FudmFzLndpZHRoID0gMTY7XG4gICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gMTY7XG5cbiAgICAgICAgICAgIC8v5YaG5b2i44Gu44Kw44Op44OH44O844K344On44Oz44Gu5L2c5oiQXG4gICAgICAgICAgICBsZXQgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICAgICAgbGV0IGdyYWRpZW50ID0gY29udGV4dC5jcmVhdGVSYWRpYWxHcmFkaWVudChjYW52YXMud2lkdGggLyAyLCBjYW52YXMuaGVpZ2h0IC8gMiwgMCwgY2FudmFzLndpZHRoIC8gMiwgY2FudmFzLmhlaWdodCAvIDIsIGNhbnZhcy53aWR0aCAvIDIpO1xuICAgICAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuMiwgJ3JnYmEoJyArIHIgKyAnLCcgKyBnICsgJywnICsgYiArICcsMSknKTtcbiAgICAgICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjIsICdyZ2JhKCcgKyByICsgJywnICsgZyArICcsJyArIGIgKyAnLDEpJyk7XG4gICAgICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC40LCAncmdiYSgnICsgciAvIDQgKyAnLCcgKyBnIC8gNCArICcsJyArIGIgLyA0ICsgJywxKScpO1xuICAgICAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEsICdyZ2JhKDAsMCwwLDEpJyk7XG5cbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gZ3JhZGllbnQ7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICAgICAgICAgIC8v44OG44Kv44K544OB44Oj44Gu55Sf5oiQXG4gICAgICAgICAgICBsZXQgdGV4dHVyZSA9IG5ldyBUSFJFRS5UZXh0dXJlKGNhbnZhcyk7XG4gICAgICAgICAgICB0ZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0ZXh0dXJlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g44OR44O844OG44Kj44Kv44Or44Gu5L2c5oiQXG4gICAgICAgIGNvbnN0IGdlb21ldHJ5UiA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuICAgICAgICBjb25zdCBnZW9tZXRyeUcgPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICAgICAgY29uc3QgZ2VvbWV0cnlCID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7XG5cblxuICAgICAgICAvLyDjg57jg4bjg6rjgqLjg6vjga7kvZzmiJAg6LWkXG4gICAgICAgIGNvbnN0IG1hdGVyaWFsUiA9IG5ldyBUSFJFRS5Qb2ludHNNYXRlcmlhbCh7XG4gICAgICAgICAgICBzaXplOiAxLFxuICAgICAgICAgICAgbWFwOiBnZW5lcmF0ZVNwcml0ZSgyNTUsIDAsIDApLFxuICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgICAgICBibGVuZGluZzogVEhSRUUuQWRkaXRpdmVCbGVuZGluZyxcbiAgICAgICAgICAgIGRlcHRoV3JpdGU6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICAgICAgLy8g44Oe44OG44Oq44Ki44Or44Gu5L2c5oiQIOe3kVxuICAgICAgICBjb25zdCBtYXRlcmlhbEcgPSBuZXcgVEhSRUUuUG9pbnRzTWF0ZXJpYWwoe1xuICAgICAgICAgICAgc2l6ZTogMSxcbiAgICAgICAgICAgIG1hcDogZ2VuZXJhdGVTcHJpdGUoMCwgMjU1LCAwKSxcbiAgICAgICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsXG4gICAgICAgICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIOODnuODhuODquOCouODq+OBruS9nOaIkCDpnZJcbiAgICAgICAgY29uc3QgbWF0ZXJpYWxCID0gbmV3IFRIUkVFLlBvaW50c01hdGVyaWFsKHtcbiAgICAgICAgICAgIHNpemU6IDEsXG4gICAgICAgICAgICBtYXA6IGdlbmVyYXRlU3ByaXRlKDAsIDAsIDI1NSksXG4gICAgICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLFxuICAgICAgICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgY29uc3QgcGFydGljbGVOdW0gPSA1MDA7IC8vIOODkeODvOODhuOCo+OCr+ODq+OBruaVsFxuICAgICAgICBjb25zdCBwb3NpdGlvbnNSID0gbmV3IEZsb2F0MzJBcnJheShwYXJ0aWNsZU51bSAqIDMpO1xuICAgICAgICBjb25zdCBwb3NpdGlvbnNHID0gbmV3IEZsb2F0MzJBcnJheShwYXJ0aWNsZU51bSAqIDMpO1xuICAgICAgICBjb25zdCBwb3NpdGlvbnNCID0gbmV3IEZsb2F0MzJBcnJheShwYXJ0aWNsZU51bSAqIDMpO1xuXG4gICAgICAgIGxldCBwYXJ0aWNsZUluZGV4ID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0aWNsZU51bTsgKytpKSB7XG4gICAgICAgICAgICBwb3NpdGlvbnNSW3BhcnRpY2xlSW5kZXgrK10gPSAwOyAvLyB45bqn5qiZXG4gICAgICAgICAgICBwb3NpdGlvbnNSW3BhcnRpY2xlSW5kZXgrK10gPSAwOyAvLyB55bqn5qiZXG4gICAgICAgICAgICBwb3NpdGlvbnNSW3BhcnRpY2xlSW5kZXgrK10gPSAwOyAvLyB65bqn5qiZXG5cbiAgICAgICAgICAgIHBvc2l0aW9uc0dbcGFydGljbGVJbmRleCsrXSA9IDA7IC8vIHjluqfmqJlcbiAgICAgICAgICAgIHBvc2l0aW9uc0dbcGFydGljbGVJbmRleCsrXSA9IDA7IC8vIHnluqfmqJlcbiAgICAgICAgICAgIHBvc2l0aW9uc0dbcGFydGljbGVJbmRleCsrXSA9IDA7IC8vIHrluqfmqJlcblxuICAgICAgICAgICAgcG9zaXRpb25zQltwYXJ0aWNsZUluZGV4KytdID0gMDsgLy8geOW6p+aomVxuICAgICAgICAgICAgcG9zaXRpb25zQltwYXJ0aWNsZUluZGV4KytdID0gMDsgLy8geeW6p+aomVxuICAgICAgICAgICAgcG9zaXRpb25zQltwYXJ0aWNsZUluZGV4KytdID0gMDsgLy8geuW6p+aomVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gVEhSRUUuUG9pbnRz44Gu5L2c5oiQXG4gICAgICAgIGdlb21ldHJ5Ui5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShwb3NpdGlvbnNSLCAzKSk7XG4gICAgICAgIC8vIFRIUkVFLlBvaW50c+OBruS9nOaIkFxuICAgICAgICBnZW9tZXRyeUcuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUocG9zaXRpb25zRywgMykpO1xuICAgICAgICAvLyBUSFJFRS5Qb2ludHPjga7kvZzmiJBcbiAgICAgICAgZ2VvbWV0cnlCLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHBvc2l0aW9uc0IsIDMpKTtcbiAgICAgICAgLy8g44K344O844Oz44G444Gu6L+95YqgXG4gICAgICAgIHRoaXMuY2xvdWRSID0gbmV3IFRIUkVFLlBvaW50cyhnZW9tZXRyeVIsIG1hdGVyaWFsUik7XG4gICAgICAgIHRoaXMuY2xvdWRHID0gbmV3IFRIUkVFLlBvaW50cyhnZW9tZXRyeUcsIG1hdGVyaWFsRyk7XG4gICAgICAgIHRoaXMuY2xvdWRCID0gbmV3IFRIUkVFLlBvaW50cyhnZW9tZXRyeUIsIG1hdGVyaWFsQik7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMuY2xvdWRSKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5jbG91ZEcpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmNsb3VkQik7XG5cblxuICAgICAgICAvLyDjgZ3jgozjgZ7jgozjga7oirHngavjga7jgqLjg4vjg6Hjg7zjgrfjg6fjg7PjgpLkvZzmiJBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0aWNsZU51bTsgKytpKSB7XG4gICAgICAgICAgICAvLyBUd2VlbuOBp+OCs+ODs+ODiOODreODvOODq+OBmeOCi+WkieaVsOOBruWumue+qVxuICAgICAgICAgICAgbGV0IHR3ZWVuaW5mb1IgPSB7IHg6IC04LjAsIHk6IDMuMCwgejogNS4wLCBpbmRleDogaSB9OyAvLyB0d2VlbuOBp+OCs+ODs+ODiOODreODvOODq+OBmeOCi+WkieaVsOOBruWumue+qVxuICAgICAgICAgICAgbGV0IHR3ZWVuaW5mb0cgPSB7IHg6IDAuMCwgeTogNS4wLCB6OiAwLjAsIGluZGV4OiBpIH07IC8vIHR3ZWVu44Gn44Kz44Oz44OI44Ot44O844Or44GZ44KL5aSJ5pWw44Gu5a6a576pXG4gICAgICAgICAgICBsZXQgdHdlZW5pbmZvQiA9IHsgeDogOC4wLCB5OiAyLjAsIHo6IDUuMCwgaW5kZXg6IGkgfTsgLy8gdHdlZW7jgafjgrPjg7Pjg4jjg63jg7zjg6vjgZnjgovlpInmlbDjga7lrprnvqlcblxuICAgICAgICAgICAgLy8gIFR3ZWVu44Gn44OR44Op44Oh44O844K/44Gu5pu05paw44Gu6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWwXG4gICAgICAgICAgICBsZXQgdXBkYXRlUG9zaXRpb24gPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGdlb21ldHJ5UiA9IDxUSFJFRS5CdWZmZXJHZW9tZXRyeT50aGlzLmNsb3VkUi5nZW9tZXRyeTtcbiAgICAgICAgICAgICAgICBsZXQgZ2VvbWV0cnlHID0gPFRIUkVFLkJ1ZmZlckdlb21ldHJ5PnRoaXMuY2xvdWRHLmdlb21ldHJ5O1xuICAgICAgICAgICAgICAgIGxldCBnZW9tZXRyeUIgPSA8VEhSRUUuQnVmZmVyR2VvbWV0cnk+dGhpcy5jbG91ZEIuZ2VvbWV0cnk7XG4gICAgICAgICAgICAgICAgbGV0IHBvc2l0aW9uc1IgPSBnZW9tZXRyeVIuZ2V0QXR0cmlidXRlKCdwb3NpdGlvbicpOyAvLyDluqfmqJnjg4fjg7zjgr9cbiAgICAgICAgICAgICAgICBsZXQgcG9zaXRpb25zRyA9IGdlb21ldHJ5Ry5nZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJyk7IC8vIOW6p+aomeODh+ODvOOCv1xuICAgICAgICAgICAgICAgIGxldCBwb3NpdGlvbnNCID0gZ2VvbWV0cnlCLmdldEF0dHJpYnV0ZSgncG9zaXRpb24nKTsgLy8g5bqn5qiZ44OH44O844K/XG5cbiAgICAgICAgICAgICAgICBwb3NpdGlvbnNSLnNldFgodHdlZW5pbmZvUi5pbmRleCwgdHdlZW5pbmZvUi54KTtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbnNSLnNldFkodHdlZW5pbmZvUi5pbmRleCwgdHdlZW5pbmZvUi55KTtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbnNSLnNldFoodHdlZW5pbmZvUi5pbmRleCwgdHdlZW5pbmZvUi56KTtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbnNHLnNldFgodHdlZW5pbmZvRy5pbmRleCwgdHdlZW5pbmZvRy54KTtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbnNHLnNldFkodHdlZW5pbmZvRy5pbmRleCwgdHdlZW5pbmZvRy55KTtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbnNHLnNldFoodHdlZW5pbmZvRy5pbmRleCwgdHdlZW5pbmZvRy56KTtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbnNCLnNldFgodHdlZW5pbmZvQi5pbmRleCwgdHdlZW5pbmZvQi54KTtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbnNCLnNldFkodHdlZW5pbmZvQi5pbmRleCwgdHdlZW5pbmZvQi55KTtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbnNCLnNldFoodHdlZW5pbmZvQi5pbmRleCwgdHdlZW5pbmZvQi56KTtcblxuICAgICAgICAgICAgICAgIHBvc2l0aW9uc1IubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uc0cubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uc0IubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyDnkIPpnaLkuIrjga7luqfmqJnlgKRcbiAgICAgICAgICAgIGNvbnN0IHUgPSBNYXRoLnJhbmRvbSgpICogMiAqIE1hdGguUEk7XG4gICAgICAgICAgICBjb25zdCB2ID0gTWF0aC5yYW5kb20oKSAqIDIgKiBNYXRoLlBJIC0gTWF0aC5QSSAvIDI7XG4gICAgICAgICAgICBjb25zdCByID0gNTtcbiAgICAgICAgICAgIGNvbnN0IHRvWCA9IHIgKiBNYXRoLmNvcyh1KSAqIE1hdGguY29zKHYpO1xuICAgICAgICAgICAgY29uc3QgdG9ZID0gciAqIE1hdGguc2luKHUpICogTWF0aC5jb3Modik7XG4gICAgICAgICAgICBjb25zdCB0b1ogPSByICogTWF0aC5zaW4odik7XG5cbiAgICAgICAgICAgIC8vIFR3ZWVu44Gu5L2c5oiQIOWkieWMluOBruS7leaWueOBruWkieabtFxuICAgICAgICAgICAgbGV0IHR3ZWVuVXBSID0gbmV3IFRXRUVOLlR3ZWVuKHR3ZWVuaW5mb1IpLnRvKHsgeDogLTguMCwgeTogMy4wLCB6OiA1LjAgfSwgMTAwMCkuZWFzaW5nKFRXRUVOLkVhc2luZy5DaXJjdWxhci5PdXQpLm9uVXBkYXRlKHVwZGF0ZVBvc2l0aW9uKTtcbiAgICAgICAgICAgIGxldCB0d2Vlbk9wZW5SID0gbmV3IFRXRUVOLlR3ZWVuKHR3ZWVuaW5mb1IpLnRvKHsgeDogdG9YIC0gOC4wLCB5OiB0b1kgKyAzLjAsIHo6IHRvWiArIDUuMCB9LCAxMDAwKS5lYXNpbmcoVFdFRU4uRWFzaW5nLkNpcmN1bGFyLk91dCkub25VcGRhdGUodXBkYXRlUG9zaXRpb24pO1xuICAgICAgICAgICAgbGV0IHR3ZWVuQmFja1IgPSBuZXcgVFdFRU4uVHdlZW4odHdlZW5pbmZvUikudG8oeyB4OiAtOC4wLCB5OiAzLjAsIHo6IDUuMCB9LCAxMDAwKS5lYXNpbmcoVFdFRU4uRWFzaW5nLkNpcmN1bGFyLk91dCkub25VcGRhdGUodXBkYXRlUG9zaXRpb24pO1xuICAgICAgICAgICAgbGV0IHR3ZWVuRG93blIgPSBuZXcgVFdFRU4uVHdlZW4odHdlZW5pbmZvUikudG8oeyB4OiAtOC4wLCB5OiAwLjAsIHo6IDUuMCB9LCAxMDAwKS5lYXNpbmcoVFdFRU4uRWFzaW5nLkNpcmN1bGFyLk91dCkub25VcGRhdGUodXBkYXRlUG9zaXRpb24pO1xuXG4gICAgICAgICAgICBsZXQgdHdlZW5VcEcgPSBuZXcgVFdFRU4uVHdlZW4odHdlZW5pbmZvRykudG8oeyB4OiAwLjAsIHk6IDUuMCwgejogMC4wIH0sIDEwMDApLmVhc2luZyhUV0VFTi5FYXNpbmcuQ2lyY3VsYXIuT3V0KS5vblVwZGF0ZSh1cGRhdGVQb3NpdGlvbik7XG4gICAgICAgICAgICBsZXQgdHdlZW5PcGVuRyA9IG5ldyBUV0VFTi5Ud2Vlbih0d2VlbmluZm9HKS50byh7IHg6IHRvWCwgeTogdG9ZICsgNS4wLCB6OiB0b1ogfSwgMTAwMCkuZWFzaW5nKFRXRUVOLkVhc2luZy5DaXJjdWxhci5PdXQpLm9uVXBkYXRlKHVwZGF0ZVBvc2l0aW9uKTtcbiAgICAgICAgICAgIGxldCB0d2VlbkJhY2tHID0gbmV3IFRXRUVOLlR3ZWVuKHR3ZWVuaW5mb0cpLnRvKHsgeDogMC4wLCB5OiA1LjAsIHo6IDAuMCB9LCAxMDAwKS5lYXNpbmcoVFdFRU4uRWFzaW5nLkNpcmN1bGFyLk91dCkub25VcGRhdGUodXBkYXRlUG9zaXRpb24pO1xuICAgICAgICAgICAgbGV0IHR3ZWVuRG93bkcgPSBuZXcgVFdFRU4uVHdlZW4odHdlZW5pbmZvRykudG8oeyB4OiAwLjAsIHk6IDAuMCwgejogMC4wIH0sIDEwMDApLmVhc2luZyhUV0VFTi5FYXNpbmcuQ2lyY3VsYXIuT3V0KS5vblVwZGF0ZSh1cGRhdGVQb3NpdGlvbik7XG5cbiAgICAgICAgICAgIGxldCB0d2VlblVwQiA9IG5ldyBUV0VFTi5Ud2Vlbih0d2VlbmluZm9CKS50byh7IHg6IDguMCwgeTogMi4wLCB6OiA1LjAgfSwgMTAwMCkuZWFzaW5nKFRXRUVOLkVhc2luZy5DaXJjdWxhci5PdXQpLm9uVXBkYXRlKHVwZGF0ZVBvc2l0aW9uKTtcbiAgICAgICAgICAgIGxldCB0d2Vlbk9wZW5CID0gbmV3IFRXRUVOLlR3ZWVuKHR3ZWVuaW5mb0IpLnRvKHsgeDogdG9YICsgOC4wLCB5OiB0b1kgKyAyLjAsIHo6IHRvWiArIDUuMH0sIDEwMDApLmVhc2luZyhUV0VFTi5FYXNpbmcuQ2lyY3VsYXIuT3V0KS5vblVwZGF0ZSh1cGRhdGVQb3NpdGlvbik7XG4gICAgICAgICAgICBsZXQgdHdlZW5CYWNrQiA9IG5ldyBUV0VFTi5Ud2Vlbih0d2VlbmluZm9CKS50byh7IHg6IDguMCwgeTogMi4wLCB6OiA1LjAgfSwgMTAwMCkuZWFzaW5nKFRXRUVOLkVhc2luZy5DaXJjdWxhci5PdXQpLm9uVXBkYXRlKHVwZGF0ZVBvc2l0aW9uKTtcbiAgICAgICAgICAgIGxldCB0d2VlbkRvd25CID0gbmV3IFRXRUVOLlR3ZWVuKHR3ZWVuaW5mb0IpLnRvKHsgeDogOC4wLCB5OiAwLjAsIHo6IDUuMCB9LCAxMDAwKS5lYXNpbmcoVFdFRU4uRWFzaW5nLkNpcmN1bGFyLk91dCkub25VcGRhdGUodXBkYXRlUG9zaXRpb24pO1xuXG4gICAgICAgICAgICB0d2VlblVwUi5jaGFpbih0d2Vlbk9wZW5SKTsgLy8g44Ki44OL44Oh44O844K344On44Oz44KS5o6l57aaXG4gICAgICAgICAgICB0d2Vlbk9wZW5SLmNoYWluKHR3ZWVuQmFja1IpOyAvLyDjgqLjg4vjg6Hjg7zjgrfjg6fjg7PjgpLmjqXntppcbiAgICAgICAgICAgIHR3ZWVuQmFja1IuY2hhaW4odHdlZW5Eb3duUik7IC8vIOOCouODi+ODoeODvOOCt+ODp+ODs+OCkuaOpee2mlxuICAgICAgICAgICAgdHdlZW5Eb3duUi5jaGFpbih0d2VlblVwUik7IC8vIOOCouODi+ODoeODvOOCt+ODp+ODs+OCkuaOpee2mlxuXG4gICAgICAgICAgICB0d2VlblVwRy5jaGFpbih0d2Vlbk9wZW5HKTsgLy8g44Ki44OL44Oh44O844K344On44Oz44KS5o6l57aaXG4gICAgICAgICAgICB0d2Vlbk9wZW5HLmNoYWluKHR3ZWVuQmFja0cpOyAvLyDjgqLjg4vjg6Hjg7zjgrfjg6fjg7PjgpLmjqXntppcbiAgICAgICAgICAgIHR3ZWVuQmFja0cuY2hhaW4odHdlZW5Eb3duRyk7IC8vIOOCouODi+ODoeODvOOCt+ODp+ODs+OCkuaOpee2mlxuICAgICAgICAgICAgdHdlZW5Eb3duRy5jaGFpbih0d2VlblVwRyk7IC8vIOOCouODi+ODoeODvOOCt+ODp+ODs+OCkuaOpee2mlxuXG4gICAgICAgICAgICB0d2VlblVwQi5jaGFpbih0d2Vlbk9wZW5CKTsgLy8g44Ki44OL44Oh44O844K344On44Oz44KS5o6l57aaXG4gICAgICAgICAgICB0d2Vlbk9wZW5CLmNoYWluKHR3ZWVuQmFja0IpOyAvLyDjgqLjg4vjg6Hjg7zjgrfjg6fjg7PjgpLmjqXntppcbiAgICAgICAgICAgIHR3ZWVuQmFja0IuY2hhaW4odHdlZW5Eb3duQik7IC8vIOOCouODi+ODoeODvOOCt+ODp+ODs+OCkuaOpee2mlxuICAgICAgICAgICAgdHdlZW5Eb3duQi5jaGFpbih0d2VlblVwQik7IC8vIOOCouODi+ODoeODvOOCt+ODp+ODs+OCkuaOpee2mlxuXG5cbiAgICAgICAgICAgIHR3ZWVuVXBSLnN0YXJ0KCk7ICAgICAgICAgIC8vIOOCouODi+ODoeODvOOCt+ODp+ODs+OBrumWi+Wni1xuICAgICAgICAgICAgdHdlZW5PcGVuRy5zdGFydCgpOyAgICAgICAgICAvLyDjgqLjg4vjg6Hjg7zjgrfjg6fjg7Pjga7plovlp4tcbiAgICAgICAgICAgIHR3ZWVuRG93bkIuc3RhcnQoKTsgICAgICAgICAgLy8g44Ki44OL44Oh44O844K344On44Oz44Gu6ZaL5aeLXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8v44Op44Kk44OI44Gu6Kit5a6aXG4gICAgICAgIHRoaXMubGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZmZmZik7XG4gICAgICAgIGNvbnN0IGx2ZWMgPSBuZXcgVEhSRUUuVmVjdG9yMygxLCAxLCAxKS5ub3JtYWxpemUoKTtcbiAgICAgICAgdGhpcy5saWdodC5wb3NpdGlvbi5zZXQobHZlYy54LCBsdmVjLnksIGx2ZWMueik7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubGlnaHQpO1xuXG4gICAgICAgIC8vIOavjuODleODrOODvOODoOOBrnVwZGF0ZeOCkuWRvOOCk+OBp++8jOabtOaWsFxuICAgICAgICAvLyByZXFlc3RBbmltYXRpb25GcmFtZSDjgavjgojjgormrKHjg5Xjg6zjg7zjg6DjgpLlkbzjgbZcbiAgICAgICAgbGV0IHVwZGF0ZTogRnJhbWVSZXF1ZXN0Q2FsbGJhY2sgPSAodGltZSkgPT4ge1xuXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcbiAgICAgICAgICAgIFRXRUVOLnVwZGF0ZSgpOy8v6L+95Yqg5YiGXG4gICAgICAgIH1cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG4gICAgfVxuXG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBpbml0KTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBsZXQgY29udGFpbmVyID0gbmV3IFRocmVlSlNDb250YWluZXIoKTtcblxuICAgIGxldCB2aWV3cG9ydCA9IGNvbnRhaW5lci5jcmVhdGVSZW5kZXJlckRPTSg2NDAsIDQ4MCwgbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMjApKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHZpZXdwb3J0KTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rY2dwcmVuZGVyaW5nXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2NncHJlbmRlcmluZ1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfdHdlZW5qc190d2Vlbl9qc19kaXN0X3R3ZWVuX2VzbV9qcy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2NvbnRyLTc4ZDM5MlwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAudHNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==