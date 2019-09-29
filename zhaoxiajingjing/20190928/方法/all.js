/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-29 15:10:57
 * @LastEditTime: 2019-09-29 15:10:57
 * @LastEditors: your name
 */
let fs = require('fs').promise;
Promise.all([
    fs.readFile('./name.txt', 'utf8'),
    fs.readFile('./address.txt', 'utf8'),
    1,2
])
.then(data => {
    console.log(1, data);
}, err => {
    console.log(2, err);
});