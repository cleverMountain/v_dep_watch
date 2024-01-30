import { initState, proxy } from "./inisState"
import mountComponent from "./mountComponent"


class Vue {
  constructor(options) {
    let { data, el } = options,
      vm = this
    vm.el = el
    data = data()

    this.init(data, vm, el)
  }
  init(data, vm, el) {
    // 初始化状态
    initState(data, vm)
    // 代理到vm上
    proxy(data, vm)

    this.mount(vm)

  }
  mount(vm) {
    vm.template = document.querySelector(vm.el).innerHTML

    // render函数，真实节点替换
    const render = (vm) => {
      const regex = /\{\{((?:.|\r?\n)+?)\}\}/
      const div = document.createElement('div')
      div.id = vm.el
      div.innerHTML = vm.template
      let content = [...div.getElementsByTagName('*')]
      content.forEach(item => {
        let matchs
        if (matchs = item.innerHTML.match(regex)) {
          // let c =  new Function(`with(this){return ${vm[matchs[1]]}}`)
          // console.log(c(vm))
          item.innerHTML = new Function(`with(this){return ${vm[matchs[1]]}}`)(vm)

        }
      })
      const bodyElement = document.body;
      // 移除 body 中的所有子元素
      while (bodyElement.firstChild) {
        bodyElement.removeChild(bodyElement.firstChild);
      }
      document.body.appendChild(div)

    }
    // render函数挂载到mount上
    vm.render = render
    mountComponent(vm)
  }
}

export default Vue