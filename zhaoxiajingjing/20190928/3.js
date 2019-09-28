let fs = require('fs');
let p = new Promise((resolve, reject)=>{
    fs.readFile('./name.txt', 'utf8', function (err, data){
        if(err){
            return reject(err);
        }
        resolve(data);
    });
});
p.then((value)=>{
    console.log('成功了', value);
}, (reason)=>{
    console.log('失败了', reason);
});