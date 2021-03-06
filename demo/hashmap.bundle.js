(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.hashmap = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.HashMap = void 0;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  // export default 
  var HashMap =
  /*#__PURE__*/
  function () {
    function HashMap() {
      var capacity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

      _classCallCheck(this, HashMap);

      this.capacity = capacity;
      this.buckets = [];
    } // If key exist return value of the key if not exist return new exception


    _createClass(HashMap, [{
      key: "get",
      value: function get(key) {
        var index = this.hashFunction(key, this.capacity);

        if (this.buckets[index] === undefined) {
          return new Error('Element you are looking for doesn\'t exist');
        }

        if (this.buckets[index].length === 1 && this.buckets[index][0][0] === key) {
          return this.buckets[index][0][1];
        } else {
          for (var i = 0; i < this.buckets[index].length; i++) {
            if (this.buckets[index][i] !== undefined && this.buckets[index][i][0] === key) {
              return this.buckets[index][i][1];
            }
          }
        }
      }
    }, {
      key: "add",
      value: function add(key, value) {
        var index = this.hashFunction(key, this.capacity); // if the bucket is empty insert data

        if (this.buckets[index] === undefined) {
          this.buckets[index] = [[key, value]];
        } else {
          // if the bucket is not empty but you typed the same key then edit value of key
          var inserted = false;

          for (var i = 0; i < this.buckets[index].length; i++) {
            if (this.buckets[index][i] !== undefined && this.buckets[index][i][0] === key) {
              this.buckets[index][i][1] = value;
              inserted = true;
            }
          } // if there is colision push item at the end of the bucket


          if (inserted === false) {
            this.buckets[index].push([key, value]);
          }
        }

        return this.buckets[index];
      }
    }, {
      key: "remove",
      value: function remove(key) {
        var index = this.hashFunction(key, this.capacity);

        if (this.buckets[index] === undefined) {
          return new Error('Element you want to remove doesn\'t exist');
        }

        if (this.buckets[index].length === 1 && this.buckets[index][0][0] === key) {
          delete this.buckets[index];
        } else {
          for (var i = 0; i < this.buckets[index].length; i++) {
            if (this.buckets[index][i] !== undefined && this.buckets[index][i][0] === key) {
              delete this.buckets[index][i];
            }
          }
        }
      }
    }, {
      key: "getAll",
      value: function getAll() {
        console.log(this.buckets);
      }
    }, {
      key: "hashFunction",
      value: function hashFunction(string, capacity) {
        var hash = 0;

        for (var i = 0; i < string.length; i++) {
          hash += string.charCodeAt(i);
        }

        return hash % capacity;
      }
    }]);

    return HashMap;
  }();

  _exports.HashMap = HashMap;
});
