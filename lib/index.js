"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Stage = _interopRequireDefault(require("./components/Stage"));

var _KonvaNode = _interopRequireDefault(require("./components/KonvaNode"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

if (typeof window !== 'undefined' && !window.Konva) {
  require('konva');
}

var KONVA_NODES = ['Layer', 'FastLayer', 'Group', 'Label', 'Rect', 'Circle', 'Ellipse', 'Wedge', 'Line', 'Sprite', 'Image', 'Text', 'TextPath', 'Star', 'Ring', 'Arc', 'Tag', 'Path', 'RegularPolygon', 'Arrow', 'Shape', 'Transformer'];
var components = {
  Stage: _Stage.default
};
KONVA_NODES.forEach(function (nodeName) {
  components[nodeName] = (0, _KonvaNode.default)();
});

var VueKonva = _objectSpread({}, components, {
  install: function install(Vue) {
    return Object.keys(components).forEach(function (k) {
      Vue.component("".concat(_utils.componentPrefix).concat(k), components[k]);
    });
  }
});

var _default = VueKonva;
exports.default = _default;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueKonva);
}