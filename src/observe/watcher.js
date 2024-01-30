import Dep from "./dep"

function pushTarget(watcher) {
  Dep.target = watcher
}
function popTarget() {
  Dep.target = null
}

let id = 0
class Watcher {
  constructor(vm, render) {
    this.id = id++
    this.deps = [] // 依赖
    // 渲染方法
    this.render = render
    this.vm = vm
    this.get()

  }
  get() {
    pushTarget(this)
    this.render(this.vm) // 调用getter将this指向绑定为vm，否则this指向watcher
    popTarget()
  }
  addDeps(dep) {
    this.deps.push(dep)
  }
  // 更新视图
  update() {
 
    this.render(this.vm)
  }
}


export default Watcher