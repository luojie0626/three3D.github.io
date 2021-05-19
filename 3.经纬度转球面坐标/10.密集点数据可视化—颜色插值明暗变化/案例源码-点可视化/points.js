// 引入three.js
import * as THREE from '../../../three.js-r123/build/three.module.js';
// 引入lon2xyz,经纬度转球面坐标
import { lon2xyz } from './math.js'

import config from './config.js'
var R = config.R;//地球半径

var loader = new THREE.FileLoader();//three.js文件加载类FileLoader：封装了XMLHttpRequest
loader.setResponseType('json');
var group = new THREE.Group();
loader.load('数据.json', function (data) {
  var coordArr = data.points;//所有经纬度坐标数据
  var verticesArr = [];//所有顶点数据，三个元素为一组
  for (var i = 0; i < coordArr.length; i += 2) {
    // 经纬度转球面坐标
    var coord = lon2xyz(R * 1.001, coordArr[i], coordArr[i + 1])
    verticesArr.push(coord.x, coord.y, coord.z);
  }
  var geometry = new THREE.BufferGeometry(); //创建一个Buffer类型几何体对象
  //3个为一组，表示一个顶点的xyz坐标
  var attribute = new THREE.BufferAttribute(new Float32Array(verticesArr), 3);
  // console.log('顶点数据',attribute.count);//25万个点
  // 设置几何体attributes属性的位置属性
  geometry.attributes.position = attribute;
  // 点渲染模式
  var material = new THREE.PointsMaterial({
    color: 0x22ffee,
    size: 0.5 //点尺寸
  }); //材质对象
  var points = new THREE.Points(geometry, material); //点模型对象
  group.add(points);
})

export default group;