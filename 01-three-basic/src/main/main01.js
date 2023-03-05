import * as THREE from 'three';

/* 了解three 的基础内容 */
/* 添加一个场景 */

/* 1.创建场景 */
const scene = new THREE.Scene();

/* 2.创建相机 */
const comera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

/* 设置相机位置 */
comera.position.set(0, 0, 10);
scene.add(comera);

/* 添加物体 */
/* 创建 几何体 对象 */
const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xfff00 });
/* 根据集合体和材质 创建物体 */
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

/* 将几何体  添加到场景 */
scene.add(cube);

/* 初始化 渲染器 */
const renderer = new THREE.WebGL1Renderer();
/* 渲染 尺寸大小 */
renderer.setSize(window.innerWidth, window.innerHeight);

/* 添加 渲染器 webGl 到body */
document.body.appendChild(renderer.domElement);

/* 使用渲染器， 通过相机将场景渲染出来 */
renderer.render(scene, comera);
