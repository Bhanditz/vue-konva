"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updatePicture;

// adapted FROM: https://github.com/lavrton/react-konva/blob/master/src/react-konva-fiber.js
function updatePicture(node) {
  var drawingNode = node.getLayer() || node.getStage();
  drawingNode && drawingNode.batchDraw();
}