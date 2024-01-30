import Dep from "./dep"

function observe(data) {
  const dep = new Dep()
  for (let key in data) {
    let value = data[key]
    Object.defineProperty(data, key, {
      get() {
        // 收集依赖
        if (Dep.target) {
          dep.depend()
        }
        return value
      },
      set(newVal) {
        if (newVal !== value) {
  
          value = newVal
          dep.notify()
        }
      }
    })
  }
}


export default observe