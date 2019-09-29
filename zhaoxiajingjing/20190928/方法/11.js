/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-29 13:45:54
 * @LastEditTime: 2019-09-29 14:39:02
 * @LastEditors: Please set LastEditors
 */
let p = new Promise((resolve, reject) => {
    resolve(new Promise((resolve, reject) => {
        setTimeout(()=>{
            reject(new Error('404'));
        }, 3000);
    }));
});
p.then(value => console.log(1, value), reason => console.log(2, reason));