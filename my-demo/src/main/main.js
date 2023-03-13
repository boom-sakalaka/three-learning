/* http://www.webgl3d.cn/Three.js/ */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { AxesHelper } from 'three';

/*==========================  组对象 层级模型  ==========================*/

/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();

// /* 阴影 start */
// var geometry = new THREE.BoxGeometry(40, 100, 40);
// var material = new THREE.MeshLambertMaterial({
//   color: 0x0000ff,
// });
// var mesh = new THREE.Mesh(geometry, material);
// // mesh.position.set(0,0,0)
// scene.add(mesh);

// // 设置产生投影的网格模型
// mesh.castShadow = true;

// //创建一个平面几何体作为投影面
// var planeGeometry = new THREE.PlaneGeometry(300, 200);
// var planeMaterial = new THREE.MeshLambertMaterial({
//   color: 0x999999,
// });
// // 平面网格模型作为投影面
// var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
// scene.add(planeMesh); //网格模型添加到场景中
// planeMesh.rotateX(-Math.PI / 2); //旋转网格模型
// planeMesh.position.y = -50; //设置网格模型y坐标
// // 设置接收阴影的投影面
// planeMesh.receiveShadow = true;

// // 方向光
// var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// // 设置光源位置
// directionalLight.position.set(60, 100, 40);
// scene.add(directionalLight);
// // 设置用于计算阴影的光源对象
// directionalLight.castShadow = true;
// // 设置计算阴影的区域，最好刚好紧密包围在对象周围
// // 计算阴影的区域过大：模糊  过小：看不到或显示不完整
// directionalLight.shadow.camera.near = 0.5;
// directionalLight.shadow.camera.far = 300;
// directionalLight.shadow.camera.left = -50;
// directionalLight.shadow.camera.right = 50;
// directionalLight.shadow.camera.top = 200;
// directionalLight.shadow.camera.bottom = -100;
// // 设置mapSize属性可以使阴影更清晰，不那么模糊
// // directionalLight.shadow.mapSize.set(1024,1024)
// console.log(directionalLight.shadow.camera);
// /* 阴影 end */

//创建两个网格模型mesh1、mesh2
var geometry = new THREE.BoxGeometry(20, 20, 20);
var material = new THREE.MeshLambertMaterial({ color: 0x0000ff });
var group = new THREE.Group();
var mesh1 = new THREE.Mesh(geometry, material);
var mesh2 = new THREE.Mesh(geometry, material);
mesh2.translateX(25);
//把mesh1型插入到组group中，mesh1作为group的子对象
group.add(mesh1);
//把mesh2型插入到组group中，mesh2作为group的子对象
group.add(mesh2);
//把group插入到场景中作为场景子对象

// group.scale.set(4, 4, 4);
// group.rotateY(Math.PI / 6);
// console.log('查看group的子对象', group.children);
console.log('查看Scene的子对象', scene.children);
scene.add(group);

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
