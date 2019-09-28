const SUCCESS = 'fulfilled';
const FAIL = 'rejected';
const PENDING = 'pending';

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
        let promise2;

        promise2 = new Promise((resolve, reject)=>{
            if (this.status === SUCCESS) {
                try { // 用 try catch 捕获同步的报错
                    // 成功态的回调的返回值 x
                    // 【问题】 如果 x 是一个promsie，那么需要取得x执行后的结果
                    let x = onFulfilled(this.value);
                    resolve(x);

                } catch (e) {
                    reject(e);
                }
            }
    
            if (this.status === FAIL) {
                try {
                    let x = onRejected(this.reason);
                    resolve(x);
                } catch (e) {
                    reject(e);
                }
            }
    
            if (this.status === PENDING) {
                this.onSuccessCallbacks.push(()=>{
                    try {
                        let x = onFulfilled(this.value);
                        resolve(x);
                    } catch (e) {
                        reject(e);
                    }
                });
                this.onFailCallbacks.push(()=>{
                    try {
                        let x = onRejected(this.reason);
                        resolve(x);
                    } catch (e) {
                        reject(e);
                    }
                });
            }
        });

        return promise2;
    }
}