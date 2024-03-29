/* http://www.webgl3d.cn/Three.js/ */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { AxesHelper } from 'three';

/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();

/* =================================== 调用已有 几何对象创建 几何体 ================================*/
// /**
//  * 创建网格模型
//  */
// // var geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
// var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
// // var material = new THREE.MeshLambertMaterial({
// //   color: 0x0000ff,
// //   opacity: 0.7,
// //   transparent: true,
// // }); //材质对象Material
// // var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
// var sphereMaterial = new THREE.MeshPhongMaterial({
//   color: 0x0000ff,
//   specular: 0x4488ee,
//   shininess: 12,
// }); //材质对象
// var mesh = new THREE.Mesh(geometry, sphereMaterial); //网格模型对象Mesh
// scene.add(mesh); //网格模型添加到场景中

// /*==================================== 自己去创建 几何体 ===================================== */
// /* 创建一个 Buffer 类 的缓冲对象 */
// const geometry = new THREE.BufferGeometry();
// /* 创建顶点数据 向量数据 */
// const vertices = new Float32Array([
//   0,
//   0,
//   0, //顶点1坐标
//   50,
//   0,
//   0, //顶点2坐标
//   0,
//   100,
//   0, //顶点3坐标
//   0,
//   0,
//   10, //顶点4坐标
//   0,
//   0,
//   100, //顶点5坐标
//   50,
//   0,
//   10, //顶点6坐标
// ]);

// /* 创建属性缓冲区 */
// const attribue = new THREE.BufferAttribute(vertices, 3);
// /* 设置几何体 attribues 属性 */
// geometry.attributes.position = attribue;
// const material = new THREE.MeshBasicMaterial({
//   color: 0x0000ff, //三角面颜色
//   side: THREE.DoubleSide, //两面可见
// });

// var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
// scene.add(mesh);

var geometry = new THREE.BufferGeometry(); //声明一个缓冲几何体对象

//类型数组创建顶点位置position数据
var vertices = new Float32Array([
  0,
  0,
  0, //顶点1坐标
  50,
  0,
  0, //顶点2坐标
  0,
  100,
  0, //顶点3坐标

  0,
  0,
  10, //顶点4坐标
  0,
  0,
  100, //顶点5坐标
  50,
  0,
  10, //顶点6坐标
]);
// 创建属性缓冲区对象
var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，作为一个顶点的xyz坐标
// 设置几何体attributes属性的位置position属性
geometry.attributes.position = attribue;
//类型数组创建顶点颜色color数据
var colors = new Float32Array([
  1,
  0,
  0, //顶点1颜色
  0,
  1,
  0, //顶点2颜色
  0,
  0,
  1, //顶点3颜色

  1,
  1,
  0, //顶点4颜色
  0,
  1,
  1, //顶点5颜色
  1,
  0,
  1, //顶点6颜色
]);
// 设置几何体attributes属性的颜色color属性
geometry.attributes.color = new THREE.BufferAttribute(colors, 3); //3个为一组,表示一个顶点的颜色数据RGB
//材质对象
var material = new THREE.PointsMaterial({
  // 使用顶点颜色数据渲染模型，不需要再定义color属性
  // color: 0xff0000,
  vertexColors: true, //以顶点颜色为准
  size: 10.0, //点对象像素尺寸
});

var normals = new Float32Array([
  0,
  0,
  1, //顶点1法向量
  0,
  0,
  1, //顶点2法向量
  0,
  0,
  1, //顶点3法向量

  0,
  1,
  0, //顶点4法向量
  0,
  1,
  0, //顶点5法向量
  0,
  1,
  0, //顶点6法向量
]);
// 设置几何体attributes属性的位置normal属性
geometry.attributes.normal = new THREE.BufferAttribute(normals, 3); //3个为一组,表示一个顶点的法向量数据

// 点渲染模式  点模型对象Points
var points = new THREE.Mesh(geometry, material); //点模型对象
scene.add(points); //点对象添加到场景

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
