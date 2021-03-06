function SelfVue (data, el, exp) {
  var self = this
  this.data = data

  Object.keys(data).forEach(function(key) {
    self.proxyKeys(key)
  })

  observe(data)
  el.innerHTML = this.data[exp]
  new Watcher(this, exp, function(value) {
    el.innerHTML = value
  })
}

SelfVue.prototype = {
  proxyKeys: function(key) {
    var self = this
    Object.defineProperty(this, key, {
      enumerable: false,
      configurable: true,
      get: function proxyGetter() {
        return self.data[key]
      },
      set: function proxySetter(newVal) {
        self.data[key] = newVal
      }
    })
  }
}