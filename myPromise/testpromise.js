class myPromise {
    constructor(fnc) {
        this.status = null;

        fnc(this.resolve,this.reject);
    }
    resolve(result) {
        
    }
    reject() {

    }
}
let pro = new myPromise((resolve, reject) {
    resolve('下次一定')
})