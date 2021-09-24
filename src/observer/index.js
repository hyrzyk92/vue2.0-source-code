import { arrayMethods } from './array'

class Observer {
  constructor(value) {
    if(!value.__ob__) {
      Object.defineProperty(value, __ob__, {
        value: this,
        enumerable: false,
        writable: true,
        configurable: true
      })
    }
    if(Array.isArray(value)) {
      value.__proto__ = arrayMethods
      this.observeArray(value)
    }else {
      this.walk(value)
    }
  }
  observeArray(array) {
    for(let item of array) {
      observe(item)
    }
  }
  walk(value) {
    let keys = Object.keys(value)
    for(let key of keys) {
      let v = value[key]
      defineReactive(value, key, v)
    }
  }
}

function defineReactive(obj, key, value) {
  observe(value) //递归劫持
  Object.defineProperty(obj, key, {
    get() {
      return value
    },
    set(newValue) {
      if(value === newValue) return
      value = newValue
    }
  })
}

export function observe(value) {
  if(
    Object.prototype.toString.call(value) === '[object Object]' ||
    Array.isArray(value)
  ) {
    return new Observer(value)
  }
}