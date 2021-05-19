// 引入three.js
import * as THREE from '../../../three.js-r123/build/three.module.js';
import  pointArr  from './lineData.js'//引入国家边界数据
// R:球面半径
function countryLine(R) {
  var geometry = new THREE.BufferGeometry(); //创建一个Buffer类型几何体对象
  //类型数组创建顶点数据
  var vertices = new Float32Array(pointArr);
  // 创建属性缓冲区对象
  var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
  // 设置几何体attributes属性的位置属性
  geometry.attributes.position = attribue;
  // 线条渲染几何体顶点数据
  var material = new THREE.LineBasicMaterial({
    color: 0x00aaaa //线条颜色
  });//材质对象
  var line = new THREE.LineSegments(geometry, material);//间隔绘制直线
  line.scale.set(R,R,R);//lineData.js对应球面半径是1，需要缩放R倍
  return line;
}

export { countryLine };