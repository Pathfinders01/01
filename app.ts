import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as TWEEN from "@tweenjs/tween.js";

class ThreeJSContainer {
    private scene: THREE.Scene;
    private light: THREE.Light;
    private cloudR: THREE.Points;
    private cloudG: THREE.Points;
    private cloudB: THREE.Points;

    constructor() {

    }

    // 画面部分の作成(表示する枠ごとに)*
    public createRendererDOM = (width: number, height: number, cameraPos: THREE.Vector3) => {
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new THREE.Color(0x000000));
        renderer.shadowMap.enabled = true; //シャドウマップを有効にする

        //カメラの設定
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.copy(cameraPos);
        camera.lookAt(new THREE.Vector3(0, 15, 0));

        const orbitControls = new OrbitControls(camera, renderer.domElement);

        this.createScene();
        // 毎フレームのupdateを呼んで，render
        // reqestAnimationFrame により次フレームを呼ぶ
        const render: FrameRequestCallback = (time) => {
            orbitControls.update();

            renderer.render(this.scene, camera);
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);

        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    }

    // シーンの作成(全体で1回)
    private createScene = () => {
        this.scene = new THREE.Scene();

        // テクスチャの追加 見た目を改善
        let generateSprite = (r: number, g: number, b: number) => {
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
            let texture = new THREE.Texture(canvas);
            texture.needsUpdate = true;
            return texture;
        }

        // パーティクルの作成
        const geometryR = new THREE.BufferGeometry();
        const geometryG = new THREE.BufferGeometry();
        const geometryB = new THREE.BufferGeometry();


        // マテリアルの作成 赤
        const materialR = new THREE.PointsMaterial({
            size: 1,
            map: generateSprite(255, 0, 0),
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });
        // マテリアルの作成 緑
        const materialG = new THREE.PointsMaterial({
            size: 1,
            map: generateSprite(0, 255, 0),
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });
        // マテリアルの作成 青
        const materialB = new THREE.PointsMaterial({
            size: 1,
            map: generateSprite(0, 0, 255),
            transparent: true,
            blending: THREE.AdditiveBlending,
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
        geometryR.setAttribute('position', new THREE.BufferAttribute(positionsR, 3));
        // THREE.Pointsの作成
        geometryG.setAttribute('position', new THREE.BufferAttribute(positionsG, 3));
        // THREE.Pointsの作成
        geometryB.setAttribute('position', new THREE.BufferAttribute(positionsB, 3));
        // シーンへの追加
        this.cloudR = new THREE.Points(geometryR, materialR);
        this.cloudG = new THREE.Points(geometryG, materialG);
        this.cloudB = new THREE.Points(geometryB, materialB);
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
                let geometryR = <THREE.BufferGeometry>this.cloudR.geometry;
                let geometryG = <THREE.BufferGeometry>this.cloudG.geometry;
                let geometryB = <THREE.BufferGeometry>this.cloudB.geometry;
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
            }

            // 球面上の座標値
            const u = Math.random() * 2 * Math.PI;
            const v = Math.random() * 2 * Math.PI - Math.PI / 2;
            const r = 5;
            const toX = r * Math.cos(u) * Math.cos(v);
            const toY = r * Math.sin(u) * Math.cos(v);
            const toZ = r * Math.sin(v);

            // Tweenの作成 変化の仕方の変更
            let tweenUpR = new TWEEN.Tween(tweeninfoR).to({ x: -8.0, y: 3.0, z: 5.0 }, 1000).easing(TWEEN.Easing.Circular.Out).onUpdate(updatePosition);
            let tweenOpenR = new TWEEN.Tween(tweeninfoR).to({ x: toX - 8.0, y: toY + 3.0, z: toZ + 5.0 }, 1000).easing(TWEEN.Easing.Circular.Out).onUpdate(updatePosition);
            let tweenBackR = new TWEEN.Tween(tweeninfoR).to({ x: -8.0, y: 3.0, z: 5.0 }, 1000).easing(TWEEN.Easing.Circular.Out).onUpdate(updatePosition);
            let tweenDownR = new TWEEN.Tween(tweeninfoR).to({ x: -8.0, y: 0.0, z: 5.0 }, 1000).easing(TWEEN.Easing.Circular.Out).onUpdate(updatePosition);

            let tweenUpG = new TWEEN.Tween(tweeninfoG).to({ x: 0.0, y: 5.0, z: 0.0 }, 1000).easing(TWEEN.Easing.Circular.Out).onUpdate(updatePosition);
            let tweenOpenG = new TWEEN.Tween(tweeninfoG).to({ x: toX, y: toY + 5.0, z: toZ }, 1000).easing(TWEEN.Easing.Circular.Out).onUpdate(updatePosition);
            let tweenBackG = new TWEEN.Tween(tweeninfoG).to({ x: 0.0, y: 5.0, z: 0.0 }, 1000).easing(TWEEN.Easing.Circular.Out).onUpdate(updatePosition);
            let tweenDownG = new TWEEN.Tween(tweeninfoG).to({ x: 0.0, y: 0.0, z: 0.0 }, 1000).easing(TWEEN.Easing.Circular.Out).onUpdate(updatePosition);

            let tweenUpB = new TWEEN.Tween(tweeninfoB).to({ x: 8.0, y: 2.0, z: 5.0 }, 1000).easing(TWEEN.Easing.Circular.Out).onUpdate(updatePosition);
            let tweenOpenB = new TWEEN.Tween(tweeninfoB).to({ x: toX + 8.0, y: toY + 2.0, z: toZ + 5.0}, 1000).easing(TWEEN.Easing.Circular.Out).onUpdate(updatePosition);
            let tweenBackB = new TWEEN.Tween(tweeninfoB).to({ x: 8.0, y: 2.0, z: 5.0 }, 1000).easing(TWEEN.Easing.Circular.Out).onUpdate(updatePosition);
            let tweenDownB = new TWEEN.Tween(tweeninfoB).to({ x: 8.0, y: 0.0, z: 5.0 }, 1000).easing(TWEEN.Easing.Circular.Out).onUpdate(updatePosition);

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


            tweenUpR.start();          // アニメーションの開始
            tweenOpenG.start();          // アニメーションの開始
            tweenDownB.start();          // アニメーションの開始
        }


        //ライトの設定
        this.light = new THREE.DirectionalLight(0xffffff);
        const lvec = new THREE.Vector3(1, 1, 1).normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);

        // 毎フレームのupdateを呼んで，更新
        // reqestAnimationFrame により次フレームを呼ぶ
        let update: FrameRequestCallback = (time) => {

            requestAnimationFrame(update);
            TWEEN.update();//追加分
        }
        requestAnimationFrame(update);
    }

}

window.addEventListener("DOMContentLoaded", init);

function init() {
    let container = new ThreeJSContainer();

    let viewport = container.createRendererDOM(640, 480, new THREE.Vector3(0, 0, 20));
    document.body.appendChild(viewport);
}
