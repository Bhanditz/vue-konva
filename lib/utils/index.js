"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getName = getName;
exports.copy = copy;
exports.createListener = createListener;
exports.findParentKonva = findParentKonva;
exports.findKonvaNode = findKonvaNode;
Object.defineProperty(exports, "updatePicture", {
  enumerable: true,
  get: function get() {
    return _updatePicture.default;
  }
});
Object.defineProperty(exports, "applyNodeProps", {
  enumerable: true,
  get: function get() {
    return _applyNodeProps.default;
  }
});
exports.componentPrefix = void 0;

var _updatePicture = _interopRequireDefault(require("./updatePicture"));

var _applyNodeProps = _interopRequireDefault(require("./applyNodeProps"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var componentPrefix = 'v';
exports.componentPrefix = componentPrefix;

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/(\s|-)+/g, '');
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getName(componentTag) {
  return capitalizeFirstLetter(camelize(componentTag.replace(componentPrefix + '-', '')));
}

function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function createListener(obj) {
  var output = {};
  Object.keys(obj).forEach(function (eventName) {
    output['on' + eventName] = obj[eventName];
  });
  return output;
}

function findParentKonva(instance) {
  function re(instance) {
    if (instance.StageEmitter) {
      return instance;
    }

    if (instance.$parent) {
      return re(instance.$parent);
    }

    return {};
  }

  return re(instance.$parent);
}

function findKonvaNode(instance) {
  if (instance.getNode) {
    return instance.getNode();
  } else if (instance.$children.length === 0) {
    return null;
  } else {
    return findKonvaNode(instance.$children[0]);
  }
}