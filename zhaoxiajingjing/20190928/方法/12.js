/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-29 14:46:29
 * @LastEditTime: 2019-09-29 15:04:35
 * @LastEditors: Please set LastEditors
 */
// let Promise = require('./1.js');
let p = new Promise((resolve, reject) => {
	resolve(100);
}).finally(()=>{
    console.log('finally');
	return new Promise((resolve, reject)=>{
        reject(404);
    });
}).then(v => console.log(1, v), r => console.log(2, r));