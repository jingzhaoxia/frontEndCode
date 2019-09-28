const SUCCESS = 'fulfilled';
const FAIL = 'rejected';
const PENDING = 'pending';

class Promise {
    constructor(executor) {
        this.status = PENDING;
        this.value;
        this.reason;

        let resolve = (value) => {
            if (this.status === PENDING) {
                this.status = SUCCESS;
                this.value = value;
            }
        };

        let reject = (reason) => {
            if (this.status === PENDING) {
                this.status = FAIL;
                this.reason = resaon;
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
    }
}