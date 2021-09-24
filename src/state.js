import { observe } from './observer/index'

export function initState(vm) {
  const opts = vm.$options
  if(opts.props) {
    initProps(vm)
  }
  if(opts.methods) {
    initMethods(vm)
  }
  if(opts.data) {
    initData(vm)
  }
  if(opts.computed) {
    initComputed(vm)
  }
  if(opts.watch) {
    initWatch(vm)
  }
}

function initData(vm) {
  let data = vm.$options.data
  data = vm._data = Object.prototype.toString.call(data) === '[object Function]' ? data.call(vm) : data || {}
  let keys = Object.keys(data)
  for(let key of keys) {
    proxy(vm, '_data', key)
  }
  observe(data)
}

function proxy(vm, sourceKey, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[sourceKey][key]
    },
    set(value) {
      vm[sourceKey][key] = value
    }
  })
}
