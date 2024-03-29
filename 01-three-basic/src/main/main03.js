import * as THREE from 'three';
import { AxesHelper } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/* 导入轨道控制器 */

/* 目标 控制3D 物体移动 */

/* 1.创建场景 */
const scene = new THREE.Scene();

/* 2.创建相机 */
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

/* 设置相机位置 */
camera.position.set(0, 0, 10);
scene.add(camera);

/* 添加物体 */
/* 创建 几何体 对象 */
const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xfff00 });
/* 根据集合体和材质 创建物体 */
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

/* 修改物体的位置 */
/* cube.position.set(5, 0, 0); */
cube.position.x = 3;

/* 将几何体  添加到场景 */
scene.add(cube);

/* 初始化 渲染器 */
const renderer = new THREE.WebGL1Renderer();
/* 渲染 尺寸大小 */
renderer.setSize(window.innerWidth, window.innerHeight);

/* 添加 渲染器 webGl 到body */
document.body.appendChild(renderer.domElement);

/* 使用渲染器， 通过相机将场景渲染出来 */
// renderer.render(scene, camera);

/* 创建轨道控制器 */
const controls = new OrbitControls(camera, renderer.domElement);

/* 添加坐标轴辅助器 */
const asesHlper = new AxesHelper(5);
scene.add(asesHlper);

function render() {
  cube.position.x += 0.01;
  if (cube.position.x > 5) {
    cube.position.x = 0;
  }
  renderer.render(scene, camera);
  /* 下一帧 渲染 */
  requestAnimationFrame(render);
}

render();
