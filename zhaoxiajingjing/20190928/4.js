let fs = require('fs');

function read(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8',function(err, data){
            if(err) {
                return reject(err);
            }
            resolve(data);
        });
    });
}

read('./name.txt')
// then-1
.then(function (data) {
    console.log('data①', data);
    return new Promise((resolve, reject) => {
        reject('错误了');
    });
})
// then-2
.then((data) => {
    console.log('data②', data);
}, err => {
    console.log('err②', err);
})
// then-3
.then((data) => {
    console.log('data③', data);
}, (err) => {
    console.log('err③', err);
});