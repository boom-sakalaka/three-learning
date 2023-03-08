/* http://www.webgl3d.cn/Three.js/ */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { AxesHelper } from 'three';

/*========================== 材质 ==========================*/

/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();

/* 创建  几何体 && 材质 && 模型对象 */

/* ========================== 点材质 start  ==========================*/
// const geometry = new THREE.SphereGeometry(100, 25, 25);
// // 创建一个点材质对象
// const material = new THREE.PointsMaterial({
//   color: 0x0000ff, // 颜色
//   size: 3, // 点渲染尺寸
// });

// /* 点模型对象 */
// const pointModal = new THREE.Points(geometry, material);
// scene.add(pointModal);
/* ========================== 点材质 end  ==========================*/

/* ========================== 线材质 start  ==========================*/
// var geometry = new THREE.SphereGeometry(100, 25, 25); //球体
// // 直线基础材质对象
// var material = new THREE.LineBasicMaterial({
//   color: 0x0000ff,
// });
// var line = new THREE.Line(geometry, material); //线模型对象
// scene.add(line); //点模型添加到场景中
/* ========================== 线材质 end  ==========================*/

/* ========================== 虚线材质 start  ==========================*/
// var geometry = new THREE.SphereGeometry(100, 25, 25); //球体
// // 虚线材质对象：产生虚线效果
// var material = new THREE.LineDashedMaterial({
//   color: 0x0000ff,
//   dashSize: 10, //显示线段的大小。默认为3。
//   gapSize: 5, //间隙的大小。默认为1
// });
// var line = new THREE.Line(geometry, material); //线模型对象
// //  computeLineDistances方法  计算LineDashedMaterial所需的距离数组
// line.computeLineDistances();
// scene.add(line);
/* ========================== 虚线材质 end  ==========================*/

/* ========================== 网格材质 start  ==========================*/
const geometry = new THREE.SphereGeometry(100, 25, 25); //球体
/* 基础网格材质对象 */
// const material = new THREE.MeshBasicMaterial({
//   color: 0x0000ff,
// });

var material = new THREE.MeshLambertMaterial({
  color: 0x00ff00,
});

// var material = new THREE.MeshPhongMaterial({
//   color: 0xff0000,
//   specular: 0x444444, //高光部分的颜色
//   shininess: 20, //高光部分的亮度，默认30
// });

const mesh = new THREE.Mesh(geometry, material);

/* ========================== 缩放旋转 start ========================== */
// mesh.scale.set(0.5, 1.5, 2); 网格模型xyz方向分别缩放0.5,1.5,2倍
// mesh.scale.x = 2.0;
// mesh.position.set(80, 2, 10);

/* ========================== 缩放旋转 end ========================== */

scene.add(mesh);

/* ========================== 网格材质 end  ==========================*/

/**
 * 光源设置
 */
//点光源
var point = new THREE.PointLight(0xffffff);
point.position.set(400, 200, 300); //点光源位置
scene.add(point); //点光源添加到场景中

// 点光源2  位置和point关于原点对称
var point2 = new THREE.PointLight(0xffffff);
point2.position.set(-400, -200, -300); //点光源位置
scene.add(point2); //点光源添加到场景中

//环境光
var ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);
// console.log(scene)
// console.log(scene.children)
/**
 * 相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比
var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
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
