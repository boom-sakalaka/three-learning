import * as THREE from 'three';
import { AxesHelper } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
/* 导入动画库 */
// import gsap from 'gsap';

/* 导入轨道控制器 */
/* 目标  全屏 退出全屏 */

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
// cube.position.x = 3;
/* 缩放 */
// cube.scale.set(3, 2, 1);
/* 旋转 */
// cube.rotation.set(Math.PI / 4, 0, 0);

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
/* 设置控制器的阻尼，让控制器更有真实的效果*/
controls.enableDamping = true;

/* 添加坐标轴辅助器 */
const asesHlper = new AxesHelper(5);
scene.add(asesHlper);

// 设置时钟
const clock = new THREE.Clock();

// 设置动画
// const animation1 = gsap.to(cube.position, {
//   x: 5,
//   duration: 5,
//   ease: 'bounce.out',
//   onStart: () => {
//     console.warn('动画开始');
//   },
//   onComplete: () => {
//     console.warn('动画完成');
//   },
//   /* 设置重复的次数  无限次循环就是 -1*/
//   repeat: 2,
//   /* 往返运动 */
//   yoyo: true,
//   delay: 2,
// });
// gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5, repeat: 2 });

window.addEventListener('dblclick', () => {
  // 判断是不是全屏
  const fullscene = document.fullscreenElement;
  if (!fullscene) {
    /* 让画布对象全屏 */
    renderer.domElement.requestFullscreen();
  } else {
    /* 退出全屏 */
    document.exitFullscreen();
  }
});

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
