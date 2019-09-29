/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-29 11:04:46
 * @LastEditTime: 2019-09-29 16:31:01
 * @LastEditors: Please set LastEditors
 */
const SUCCESS = 'fulfilled';
const FAIL = 'rejected';
const PENDING = 'pending';

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'));
    }

    let called;
    if (typeof x === 'function' || (typeof x === 'object' && x != null)) {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, r => {
                    if (called) return;
                    called = true;
                    reject(r);
                });
            } else {
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }

}

class Promise {
    constructor(executor) {
        this.status = PENDING;

        this.value;
        this.reason;

        this.onSuccessCallbacks = [];
        this.onFailCallbacks = [];

        let resolve = (value) => {
            if (value instanceof Promise) {
                return value.then(resolve, reject);
            }

            if (this.status === PENDING) {
                this.status = SUCCESS;
                this.value = value;
                this.onSuccessCallbacks.forEach(fn => fn());
            }
        };

        let reject = (reason) => {
            if (this.status === PENDING) {
                this.status = FAIL;
                this.reason = reason;
                this.onFailCallbacks.forEach(fn => fn());
            }
        };

        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
        onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err};

        let promise2;

        promise2 = new Promise((resolve, reject) => {
            if (this.status === SUCCESS) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            }
    
            if (this.status === FAIL) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            }
    
            if (this.status === PENDING) {
                this.onSuccessCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
                this.onFailCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
            }
        });

        return promise2;
    }
    catch(errCallback) {
        return this.then(null, errCallback);
    }
}

function isPromise(value) {
    if (typeof value === 'function' || (typeof value === 'object' && value != null)) {
        if (typeof value.then === 'function') {
            return true;
        }
    }
    return false;
}

Promise.all = function (values){
    return new Promise((resolve, reject) => {
        let arr = [];
        let i = 0;
        let process = (key, value) => {
            arr[key] = value;
            if (++i === values.length) {
                resolve(arr);
            }
        };
        for (let i = 0; i < values.length; i++) {
            let current = values[i];
            if (isPromise(current)) {
                current.then(y => {
                    process(i, y);
                }, reject);
            } else {
                process(i, current);
            }
        }
    });
};

Promise.race = function (values) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < values.length; i++) {
            let current = values[i];
            if (isPromise(current)) {
                current.then(resolve, reject);
            } else {
                resolve(current);
            }
        }
    });
};

Promise.resolve = function (value) {
	return new Promise((resolve, reject) => {
		resolve(value);
	});
};

Promise.reject = function (reason){
    return new Promise((resolve, reject) => {
        reject(reason);
    });
};

Promise.prototype.finally = function (callback){
	return this.then(data => {
		return Promise.resolve(callback()).then(()=>data);
	}, err => {
		return Promise.reject(callback()).then(()=>{throw err});
	});
};

Promise.defe = Promise.deferred = function (){
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });

    return dfd;
};
module.exports = Promise;