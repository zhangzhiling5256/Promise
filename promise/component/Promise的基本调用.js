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
  let self = this;
  if (self.status === "resolave") {
    onResolave(self.value)
  }
  if (self.status === "rejected") {
    onRejected(self.fail)
  }
  if (self.status === "pending") {
    self.callBackResolave.push(onResolave);
    self.callBackRejected.push(onRejected);
  }
}


module.exports = Promise;