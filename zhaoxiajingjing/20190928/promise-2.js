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
        if (this.status === SUCCESS) {
            onFulfilled(this.value);
        }

        if (this.status === FAIL) {
            onRejected(this.reason);
        }

        if (this.status === PENDING) {
            this.onSuccessCallbacks.push(()=>{
                onFulfilled(this.value);
            });
            this.onFailCallbacks.push(()=>{
                onRejected(this.reason);
            });
        }
    }
}