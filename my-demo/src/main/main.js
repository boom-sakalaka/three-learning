import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { AxesHelper } from 'three';

/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();

// 2、创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);

/**
 * 光源设置
 */
//点光源
// var point = new THREE.PointLight(0xffffff);
// point.position.set(400, 200, 300); //点光源位置
// scene.add(point); //点光源添加到场景中

// // 点光源2  位置和point关于原点对称
// var point2 = new THREE.PointLight(0xffffff);
// point2.position.set(-400, -200, -300); //点光源位置
// scene.add(point2); //点光源添加到场景中

//直线光源
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

//环境光
var ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);

/* ======================================= PBR材质材质 start ============================================================ */
/* 导入纹理 */
const textureLoader = new THREE.TextureLoader(); /* 纹理加载器 */
const sphereTexture = textureLoader.load('./textures/Metal_006_basecolor.jpg');
const sphereAoTexture = textureLoader.load(
  './textures/Metal_006_ambientOcclusion.jpg'
); /* 遮挡贴图 勾勒出了 门框 的 阴影 */

//导入置换贴图
const sphereHeightTexture = textureLoader.load('./textures/Metal_006_height.jpg'); /* 移动物体 产生 立体效果 */
// 导入粗糙度贴图
const roughnessTexture = textureLoader.load(
  './textures/Metal_006_roughness.jpg'
); /* 粗糙度贴图 展示物体的反射光的程度 */

// 导入金属贴图
const metalnessTexture = textureLoader.load('./textures/Metal_006_metallic.jpg'); /* 让物体更有 金属 光泽度 */

// 导入法线贴图
const normalTexture = textureLoader.load('./textures/Metal_006_normal.jpg'); /*  设置光线折射相关 让物体更加真实 */

// 添加物体
const cubeGeometry = new THREE.BoxBufferGeometry(10, 10, 10, 100, 100, 100);
const material = new THREE.MeshStandardMaterial({
  // color: '#ffff00',
  map: sphereTexture,
  aoMap: sphereAoTexture,
  aoMapIntensity: 1,
  displacementMap: sphereHeightTexture,
  displacementScale: 0.1,
  side: THREE.DoubleSide,
  roughness: 1,
  roughnessMap: roughnessTexture,
  metalness: 1,
  metalnessMap: metalnessTexture,
});

const cube = new THREE.Mesh(cubeGeometry, material);
scene.add(cube);

/* ========================================= PBR材质材质 end ========================================================== */
// /**
//  * 相机设置
//  */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
// var k = width / height; //窗口宽高比
// var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
// //创建相机对象
// var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
// camera.position.set(200, 300, 200); //设置相机位置
// camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height); //设置渲染区域尺寸
renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
//执行渲染操作   指定场景、相机作为参数
// renderer.render(scene, camera);

// 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
var axisHelper = new AxesHelper(250);
scene.add(axisHelper);

function render() {
  console.warn('渲染');
  renderer.render(scene, camera);
  /* 下一帧 渲染 */
  requestAnimationFrame(render);
}

/* 创建轨道控制器 */
const controls = new OrbitControls(camera, renderer.domElement);
/* 设置控制器的阻尼，让控制器更有真实的效果*/
controls.enableDamping = true;

render();
