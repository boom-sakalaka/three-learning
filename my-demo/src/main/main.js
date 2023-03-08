/* http://www.webgl3d.cn/Three.js/ */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { AxesHelper } from 'three';

/*========================== 光照阴阳计算 ==========================*/

/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();

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
