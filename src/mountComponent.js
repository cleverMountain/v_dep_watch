import Watcher from "./observe/watcher"

function mountComponent(vm) {
  console.log(vm)
  new Watcher(vm, vm.render)
}

export default mountComponent