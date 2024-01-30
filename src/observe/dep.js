// 定义依赖
let id = 1

class Dep {
  constructor() {
    this.id = id++
    this.subs = [] // watcher的集合
  }
  // 添加target至subs
  depend() {
    if (Dep.target) {
      this.addSubs(Dep.target)
      Dep.target.addDeps(this)
    }
  }
  addSubs(watcher) {
    this.subs.push(watcher)
  }
  // 通知更新
  notify() {
    this.subs.forEach(watcher => watcher.update())
  }
}
Dep.target = null

export default Dep