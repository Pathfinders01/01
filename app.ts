import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as TWEEN from "@tweenjs/tween.js";

class ThreeJSContainer {
    private scene: THREE.Scene;
    private light: THREE.Light;
    private cloud: THREE.Points;

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
        const geometry = new THREE.BufferGeometry();
        // マテリアルの作成
        //const textureLoader = new THREE.TextureLoader();
        const material = new THREE.PointsMaterial({
            size: 1,
            map: generateSprite(255, 0, 0),
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        const particleNum = 500; // パーティクルの数
        const positions = new Float32Array(particleNum * 3);

        let particleIndex = 0;
        for (let i = 0; i < particleNum; ++i) {
            positions[particleIndex++] = 0; // x座標
            positions[particleIndex++] = 0; // y座標
            positions[particleIndex++] = 0; // z座標
        }

        // THREE.Pointsの作成
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        // シーンへの追加
        this.cloud = new THREE.Points(geometry, material);
        this.scene.add(this.cloud);


        // それぞれのパーティクルのアニメーションを作成
        for (let i = 0; i < particleNum; ++i) {

            // Tweenでコントロールする変数の定義
            let tweeninfo = { x: 0.0, y: 5.0, z: 0.0, index: i }; // tweenでコントロールする変数の定義

            //  Tweenでパラメータの更新の際に呼び出される関数
            let updatePosition = () => {
                let geometry = <THREE.BufferGeometry>this.cloud.geometry;
                let positions = geometry.getAttribute('position'); // 座標データ

                positions.setX(tweeninfo.index, tweeninfo.x);
                positions.setY(tweeninfo.index, tweeninfo.y);
                positions.setZ(tweeninfo.index, tweeninfo.z);

                positions.needsUpdate = true;
            }

            // 球面上の座標値の作成（遷移先の作成）
            const u = Math.random() * 2 * Math.PI;
            const v = Math.random() * 2 * Math.PI - Math.PI / 2;
            const r = 5;
            const toX = r*Math.cos(u)*Math.cos(v);
            const toY = r*Math.sin(u)*Math.cos(v)+5;
            const toZ = r*Math.sin(v);

            // Tweenの作成 変化の仕方の変更
            let tweenUP = new TWEEN.Tween(tweeninfo).to({ x: 0.0, y: 5.0, z: 0.0 }, 1000).easing(TWEEN.Easing.Circular.Out).onUpdate(updatePosition);
            let tween = new TWEEN.Tween(tweeninfo).to({ x: toX, y: toY, z: toZ }, 1000).easing(TWEEN.Easing.Circular.Out).onUpdate(updatePosition);
            let tweenDOWN = new TWEEN.Tween(tweeninfo).to({ x: 0.0, y: 5.0, z: 0.0 }, 1000).easing(TWEEN.Easing.Circular.Out).onUpdate(updatePosition);
            let tweenBack = new TWEEN.Tween(tweeninfo).to({ x: 0.0, y: 0.0, z: 0.0 }, 1000).easing(TWEEN.Easing.Circular.Out).onUpdate(updatePosition);

            tweenUP.chain(tween); // アニメーションを接続
            tween.chain(tweenDOWN); // アニメーションを接続
            tweenDOWN.chain(tweenBack); // アニメーションを接続
            tweenBack.chain(tweenUP); // アニメーションを接続

            tween.start();          // アニメーションの開始
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

    let viewport = container.createRendererDOM(640, 480, new THREE.Vector3(0, 15, 15));
    document.body.appendChild(viewport);
}
