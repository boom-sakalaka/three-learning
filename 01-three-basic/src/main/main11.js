import * as THREE from 'three';
import { AxesHelper } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/* 目标 自己创建 几何体 */

/* 1.创建场景 */
const scene = new THREE.Scene();

/* 2.创建相机 */
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

/* 设置相机位置 */
camera.position.set(0, 0, 10);
scene.add(camera);

/* 添加物体 */
/* 创建 几何体 对象 */
// const cubeGeometry = new THREE.BoxGeometry();
// const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xfff00 });
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
  -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0,
]);
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
const Material = new THREE.MeshBasicMaterial({ color: 0xfff00 });
const mesh = new THREE.Mesh(geometry, Material);

scene.add(mesh);

/* 根据集合体和材质 创建物体 */
// const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

/* 将几何体  添加到场景 */
// scene.add(cube);

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
/* 设置控制器的阻尼，让控制器更有真实的效果*/
controls.enableDamping = true;

/* 添加坐标轴辅助器 */
const asesHlper = new AxesHelper(5);
scene.add(asesHlper);

// 设置时钟
const clock = new THREE.Clock();

function render() {
  controls.update();
  renderer.render(scene, camera);
  /* 下一帧 渲染 */
  requestAnimationFrame(render);
}

render();

window.addEventListener('resize', () => {
  console.warn('画面变化');

  /* 更新摄像头 */
  camera.aspect = window.innerWidth / window.innerHeight;

  /* 更新摄像机的投影矩阵 */
  camera.updateProjectionMatrix();

  /* 更新渲染器 */
  renderer.setSize(window.innerWidth, window.innerHeight);

  /* 更新渲染器的像素比例 */
  renderer.setPixelRatio(window.devicePixelRatio);
});
