# 实现vue的依赖收集及更新

1. 定义Dep,并且在get是去收集依赖
```js
// 定义
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
// 收集依赖(页面最开始访问属性时)
Object.defineProperty(data, key, {
  get() {
    // 收集依赖
    if (Dep.target) {
      dep.depend()
    }
    return value
  }
```

2. 此时Dep.target是一个watcher，Dep便于watcher有了通信，通过Dep.target.addDeps(this)将依赖收集起来，同同时dep也会把wather收集起来
```js
Dep.target.addDeps(this)

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
```


3. 当数据更新时，通过set去通知视图更新notify
```js
this.subs.forEach(watcher => watcher.update())
```


4. watcher与dep是多对多的的关系，从代码结构来看也是这样的，从组件来说，每一个组件都会有一个实例化的过程然后产生watcher，当某个属性被好几个组件使用时，每个组件的dep都回去收集watcher，同理也是相同的
