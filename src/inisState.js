import observe from "./observe"

function initState(data, vm) {
  initData(data)
}

function initData(data) {
  observe(data)
}

function proxy(data, vm) {

  for (let key in data) {
    Object.defineProperty(vm, key, {
      get() {
        return data[key]
      },
      set(newVal) {
        data[key] = newVal
      }
    })
  }
}


export { initState, proxy }