(function() {
  var BiDirectionalBinding;

  BiDirectionalBinding = (function() {
    function BiDirectionalBinding(options) {
      if (options == null) {
        options = {};
      }
      this.name = options.name;
      this.form = options.form;
      this.dataObj = options.dataObj;
      this.toDom();
      this.toObj();
    }

    BiDirectionalBinding.prototype.toObj = function() {
      var elems, _this;
      elems = document.querySelectorAll("[data-bdb]");
      _this = this;
      return [].forEach.call(elems, function(el) {
        return el.addEventListener("change", function() {
          return _this.dataObj[this.getAttribute("data-bdb")] = this.value;
        }, false);
      });
    };

    BiDirectionalBinding.prototype.toDom = function() {
      return watch(this.dataObj, function(prop, action, newvalue, oldvalue) {
        var elem;
        elem = document.querySelector("[data-bdb=" + prop + "]");
        if (elem.type === "checkbox" || elem.type === "radio") {
          if (newvalue === elem.value) {
            return elem.checked = true;
          } else {
            return elem.checked = false;
          }
        } else {
          return elem.value = newvalue;
        }
      });
    };

    window.BiDirectionalBinding = BiDirectionalBinding;

    return BiDirectionalBinding;

  })();

}).call(this);
