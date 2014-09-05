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
      this.init();
    }

    BiDirectionalBinding.prototype.init = function() {
      if (window.WatchJS === undefined) {
        console.warn('WARNING: WatchJS is a requirement for BiDirectionalBinding. Please use the compiled file with WatchJS included or source your own version of WatchJS.');
        return false;
      }
      this.toDom();
      return this.toObj();
    };

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
