let Promise = function (CallbackFunc) {
  let self = this;

  //Promise的三种状态
  self.status = "pending";
  self.value = "undefined";
  self.fail = "udfeined";
  //异步的处理
  self.callBackResolave = [];
  self.callBackRejected = [];

  function resolave(val) {
    self.value = val;
    self.status = "resolave";
    self.callBackResolave.forEach(element => {
      element(self.value)
    });
  }
  function rejected(error) {
    self.fail = error;
    self.status = "rejected";
    self.callBackRejected.forEach(element => {
      element(self.fail)
    });
  }
  try {
    CallbackFunc(resolave, rejected)
  } catch (e) {
    rejected(e)
  }
};

Promise.prototype.then = function (onResolave, onRejected) {
  let self = this,
    Promise2;  //链式调用的原理就是返回一个新的Promise;
  if (self.status === "resolave") {
    return Promise2 = new Promise(function (resolave, rejected) {
      try {
        let x = onResolave(self.value)
        if (x instanceof Promise) {
          x.then(resolave, rejected)
        }
        resolave(x);
      } catch (e) {
        rejected(e)
      }
    })
  }
  if (self.status === "rejeted") {
    return Promise2 = new Promise(function (resolave, rejected) {
      try {
        let x = onRejected(self.fail)
        if (x instanceof Promise) {
          x.then(resolave, rejected)
        }
        resolave(x);
      } catch (e) {
        rejected(e)
      }
    })
  }
  if (self.status === "pending") {
    return Promise2 = new Promise(function (resolave, rejected) {
      self.callBackResolave.push(function () {
        let x = onResolave(self.value)
        if (x instanceof Promise) {
          x.then(resolave, rejected)
        }
        resolave(x);
      })
      self.callBackRejected.push(function () {
        let x = onRejected(self.fail)
        if (x instanceof Promise) {
          x.then(resolave, rejected)
        }
        resolave(x);
      })
    })
  }
}


module.exports = Promise;