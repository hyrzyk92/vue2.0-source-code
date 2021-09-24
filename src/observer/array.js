const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)
const methods = [
  'push',
  'pop',
  'unshift',
  'shift',
  'splice',
  'reverse',
  'sort'
]

methods.forEach(method => {
  arrayMethods[method] = function(...args) {
    const result = arrayProto[method].apply(this, args)
    let inserted
    switch (method) {
      case 'push':
      case 'unshift': 
        inserted = args 
        break;
      case 'splice': 
        inserted = args.slice(2) 
        break;
      default:
        break;
    }
    if(inserted) {
      this.__ob__.observeArray(inserted)
    }
    return result
  }
})
