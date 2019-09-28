const SUCCESS = 'fulfilled';
const FAIL = 'rejected';
const PENDING = 'pending';

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject('TypeError: Chaining cycle detected for promise~~~~');
    }
    if (typeof x === 'function' || (typeof x === 'object' && x != null)) {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, y => {
                    resolvePromise(promise2, y, resolve, reject);
                }, r => {
                    reject(r);
                });
            } else {
                resolve(x);
            }
        } catch (e) {
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
            if (this.status === PENDING) {
                this.status = SUCCESS;
                this.value = value;
                this.onSuccessCallbacks.forEach(fn => fn());
            }
        };

        let reject = (reason) => {
            if (this.status === PENDING) {
                this.status = FAIL;
                this.reason = resaon;
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
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };

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
}

module.exprots = Promise;
