"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default2;

var _utils = require("../utils");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var EventEmitter = require('events');

var EVENTS_NAMESPACE = '.vue-konva-event';

function _default2() {
  var StageEmitter =
  /*#__PURE__*/
  function (_EventEmitter) {
    _inherits(StageEmitter, _EventEmitter);

    function StageEmitter() {
      _classCallCheck(this, StageEmitter);

      return _possibleConstructorReturn(this, _getPrototypeOf(StageEmitter).apply(this, arguments));
    }

    return StageEmitter;
  }(EventEmitter);

  return {
    render: function render(createElement) {
      return createElement('div', [this.config, this.$slots.default]);
    },
    watch: {
      // $attrs: {
      //   handler(val) {
      //     this.uploadKonva();
      //   },
      //   deep: true
      // },
      config: {
        handler: function handler(val) {
          this.uploadKonva();
        },
        deep: true
      }
    },
    props: {
      config: {
        type: Object,
        default: function _default() {
          return {};
        }
      }
    },
    created: function created() {
      this.StageEmitter = new StageEmitter();
      this.StageEmitter.setMaxListeners(0);
      this._stage = {};
      this._parentStage = {};
      this.name = this.$options._componentTag;
    },
    mounted: function mounted() {
      var _this = this;

      var parentKonva = (0, _utils.findParentKonva)(this);
      var _parentStage = parentKonva._stage;

      if (_parentStage && Object.keys(_parentStage).length) {
        this.initKonva(_parentStage);
      }

      parentKonva.StageEmitter.on('mounted', function (parentStage) {
        _this.initKonva(parentStage);
      });
    },
    updated: function updated() {
      var _this2 = this;

      this.uploadKonva(); // check indexes
      // somehow this.$children are not ordered correctly
      // so we have to dive-in into componentOptions of vnode

      this.$children.forEach(function (component) {
        var vnode = component.$vnode;

        var index = _this2.$vnode.componentOptions.children.indexOf(vnode);

        var konvaNode = (0, _utils.findKonvaNode)(component);
        konvaNode.setZIndex(index);
      });
    },
    destroyed: function destroyed() {
      (0, _utils.updatePicture)(this._stage);

      this._stage.destroy();

      this._stage.off(EVENTS_NAMESPACE);
    },
    methods: {
      getNode: function getNode() {
        return this._stage;
      },
      getStage: function getStage() {
        return this._stage;
      },
      initKonva: function initKonva(parentStage) {
        var vm = this;
        var tagName = this.name;
        var nameNode = (0, _utils.getName)(tagName);
        var NodeClass = window.Konva[nameNode];

        if (!NodeClass) {
          console.error('vue-konva error: Can not find node ' + nameNode);
          return;
        }

        this._stage = new NodeClass();
        this._stage.VueComponent = this;

        var animationStage = this._stage.to.bind(this._stage);

        this._stage.to = function (newConfig) {
          animationStage(newConfig);
          setTimeout(function () {
            Object.keys(vm._stage.attrs).forEach(function (key) {
              if (typeof vm._stage.attrs[key] !== 'function') {
                vm.config[key] = vm._stage.attrs[key];
              }
            });
          }, 200);
        };

        this.uploadKonva();
        this.StageEmitter.emit('mounted', this._stage); // const index = this.$parent.$children.indexOf(this);

        parentStage.add(this._stage); // this._stage.setZIndex(index);

        (0, _utils.updatePicture)(parentStage);
      },
      uploadKonva: function uploadKonva() {
        var oldProps = this.oldProps || {};

        var props = _objectSpread({}, this.$attrs, this.config, (0, _utils.createListener)(this.$listeners));

        (0, _utils.applyNodeProps)(this, props, oldProps);
        this.oldProps = props;
      }
    }
  };
}