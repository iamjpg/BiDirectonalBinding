class BiDirectionalBinding
  constructor: (options={}) ->
    @name = options.name
    @form = options.form
    @dataObj = options.dataObj
    @init()
    
  init: ->
    if window.WatchJS is `undefined`
      console.warn('WARNING: WatchJS is a requirement for BiDirectionalBinding. Please use the compiled file with WatchJS included or source your own version of WatchJS.')
      return false
      
    @toDom()
    @toObj()

  toObj: ->
    elems = document.querySelectorAll("[data-bdb]")
    _this = @
    [].forEach.call elems, (el) ->
      el.addEventListener("change", ->
        _this.dataObj[this.getAttribute("data-bdb")] = this.value
      , false)
      

  # Sending data from object property changes back to the DOM...
  toDom: ->
    watch(@dataObj, (prop, action, newvalue, oldvalue) -> 

      elem = document.querySelector("[data-bdb=" + prop + "]")

      if elem.type is "checkbox" or elem.type is "radio"
        if newvalue is elem.value
          elem.checked = true  
        else
          elem.checked = false
      else
        elem.value = newvalue

    )

  # Export to the window...
  window.BiDirectionalBinding = @
