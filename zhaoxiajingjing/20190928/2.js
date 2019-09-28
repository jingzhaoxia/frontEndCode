console.log('-----一封情书-----');

let p = new Promise((resolve, reject) => {
    console.log('executor 请说出你的选择：');
    resolve('你中意我~(*^▽^*)');
    reject('你发了好人卡(╥﹏╥)o');
});

p.then((value) => {
    console.log('成功态---', value);
}, (reason) => {
    console.log('失败态---', reason);
}).then((value) => {
    console.log('---爱你一万年~(*^▽^*)');
}, (reason) => { 
    console.log('---伤心总是难免的o(╥﹏╥)o');
});
console.log('~~~纸短情长~~~');