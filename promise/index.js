let Promise = require("./component/promise的all实现");


let p = new Promise(function (resolave, rejected) {
  setTimeout(() => {
    resolave("张志岭")
  }, 2000)
})

let p1 = new Promise(function (resolave, rejected) {
  setTimeout(() => {
    resolave("张志峰")
  }, 2000)
})

Promise.all([p, p1]).then(function (data) {
 console.log(data);
 
}, function (err) {
   console.log(err)
})