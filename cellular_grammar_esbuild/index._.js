(() => {
  var __commonJS = (callback, module) => () => {
    if (!module) {
      module = {exports: {}};
      callback(module.exports, module);
    }
    return module.exports;
  };

  // node_modules/twgl.js/dist/4.x/twgl-full.js
  var require_twgl_full = __commonJS((exports, module) => {
    /*!
     * @license twgl.js 4.21.2 Copyright (c) 2015, Gregg Tavares All Rights Reserved.
     * Available via the MIT license.
     * see: http://github.com/greggman/twgl.js for details
     */
    (function webpackUniversalModuleDefinition(root, factory) {
      if (typeof exports === "object" && typeof module === "object")
        module.exports = factory();
      else if (typeof define === "function" && define.amd)
        define([], factory);
      else if (typeof exports === "object")
        exports["twgl"] = factory();
      else
        root["twgl"] = factory();
    })(typeof self !== "undefined" ? self : exports, function() {
      return function(modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
          if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
          }
          var module2 = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
          };
          modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
          module2.l = true;
          return module2.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.d = function(exports2, name, getter) {
          if (!__webpack_require__.o(exports2, name)) {
            Object.defineProperty(exports2, name, {enumerable: true, get: getter});
          }
        };
        __webpack_require__.r = function(exports2) {
          if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
            Object.defineProperty(exports2, Symbol.toStringTag, {value: "Module"});
          }
          Object.defineProperty(exports2, "__esModule", {value: true});
        };
        __webpack_require__.t = function(value, mode) {
          if (mode & 1)
            value = __webpack_require__(value);
          if (mode & 8)
            return value;
          if (mode & 4 && typeof value === "object" && value && value.__esModule)
            return value;
          var ns = Object.create(null);
          __webpack_require__.r(ns);
          Object.defineProperty(ns, "default", {enumerable: true, value});
          if (mode & 2 && typeof value != "string")
            for (var key in value)
              __webpack_require__.d(ns, key, function(key2) {
                return value[key2];
              }.bind(null, key));
          return ns;
        };
        __webpack_require__.n = function(module2) {
          var getter = module2 && module2.__esModule ? function getDefault() {
            return module2["default"];
          } : function getModuleExports() {
            return module2;
          };
          __webpack_require__.d(getter, "a", getter);
          return getter;
        };
        __webpack_require__.o = function(object, property) {
          return Object.prototype.hasOwnProperty.call(object, property);
        };
        __webpack_require__.p = "";
        return __webpack_require__(__webpack_require__.s = "./src/twgl-full.js");
      }({
        "./src/attributes.js": function(module2, exports2, __webpack_require__) {
          "use strict";
          function _typeof(obj) {
            "@babel/helpers - typeof";
            if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
              _typeof = function _typeof2(obj2) {
                return typeof obj2;
              };
            } else {
              _typeof = function _typeof2(obj2) {
                return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
              };
            }
            return _typeof(obj);
          }
          exports2.__esModule = true;
          exports2.createAttribsFromArrays = createAttribsFromArrays;
          exports2.createBuffersFromArrays = createBuffersFromArrays;
          exports2.createBufferFromArray = createBufferFromArray;
          exports2.createBufferFromTypedArray = createBufferFromTypedArray;
          exports2.createBufferInfoFromArrays = createBufferInfoFromArrays;
          exports2.setAttribInfoBufferFromArray = setAttribInfoBufferFromArray;
          exports2.setAttributePrefix = setAttributePrefix;
          exports2.setAttributeDefaults_ = setDefaults;
          exports2.getNumComponents_ = getNumComponents;
          exports2.getArray_ = getArray;
          var typedArrays = _interopRequireWildcard(__webpack_require__("./src/typedarrays.js"));
          var helper = _interopRequireWildcard(__webpack_require__("./src/helper.js"));
          function _getRequireWildcardCache() {
            if (typeof WeakMap !== "function")
              return null;
            var cache = new WeakMap();
            _getRequireWildcardCache = function _getRequireWildcardCache2() {
              return cache;
            };
            return cache;
          }
          function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
              return obj;
            }
            if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
              return {default: obj};
            }
            var cache = _getRequireWildcardCache();
            if (cache && cache.has(obj)) {
              return cache.get(obj);
            }
            var newObj = {};
            var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) {
                var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                if (desc && (desc.get || desc.set)) {
                  Object.defineProperty(newObj, key, desc);
                } else {
                  newObj[key] = obj[key];
                }
              }
            }
            newObj["default"] = obj;
            if (cache) {
              cache.set(obj, newObj);
            }
            return newObj;
          }
          var STATIC_DRAW = 35044;
          var ARRAY_BUFFER = 34962;
          var ELEMENT_ARRAY_BUFFER = 34963;
          var BUFFER_SIZE = 34660;
          var BYTE = 5120;
          var UNSIGNED_BYTE = 5121;
          var SHORT = 5122;
          var UNSIGNED_SHORT = 5123;
          var INT = 5124;
          var UNSIGNED_INT = 5125;
          var FLOAT = 5126;
          var gl2 = void 0;
          var defaults = {
            attribPrefix: ""
          };
          function setAttributePrefix(prefix) {
            defaults.attribPrefix = prefix;
          }
          function setDefaults(newDefaults) {
            helper.copyExistingProperties(newDefaults, defaults);
          }
          function setBufferFromTypedArray(gl3, type, buffer, array, drawType) {
            gl3.bindBuffer(type, buffer);
            gl3.bufferData(type, array, drawType || STATIC_DRAW);
          }
          function createBufferFromTypedArray(gl3, typedArray, type, drawType) {
            if (helper.isBuffer(gl3, typedArray)) {
              return typedArray;
            }
            type = type || ARRAY_BUFFER;
            var buffer = gl3.createBuffer();
            setBufferFromTypedArray(gl3, type, buffer, typedArray, drawType);
            return buffer;
          }
          function isIndices(name) {
            return name === "indices";
          }
          function getNormalizationForTypedArray(typedArray) {
            if (typedArray instanceof Int8Array) {
              return true;
            }
            if (typedArray instanceof Uint8Array) {
              return true;
            }
            return false;
          }
          function getNormalizationForTypedArrayType(typedArrayType) {
            if (typedArrayType === Int8Array) {
              return true;
            }
            if (typedArrayType === Uint8Array) {
              return true;
            }
            return false;
          }
          function getArray(array) {
            return array.length ? array : array.data;
          }
          var texcoordRE = /coord|texture/i;
          var colorRE = /color|colour/i;
          function guessNumComponentsFromName(name, length2) {
            var numComponents;
            if (texcoordRE.test(name)) {
              numComponents = 2;
            } else if (colorRE.test(name)) {
              numComponents = 4;
            } else {
              numComponents = 3;
            }
            if (length2 % numComponents > 0) {
              throw new Error("Can not guess numComponents for attribute '".concat(name, "'. Tried ").concat(numComponents, " but ").concat(length2, " values is not evenly divisible by ").concat(numComponents, ". You should specify it."));
            }
            return numComponents;
          }
          function getNumComponents(array, arrayName) {
            return array.numComponents || array.size || guessNumComponentsFromName(arrayName, getArray(array).length);
          }
          function makeTypedArray(array, name) {
            if (typedArrays.isArrayBuffer(array)) {
              return array;
            }
            if (typedArrays.isArrayBuffer(array.data)) {
              return array.data;
            }
            if (Array.isArray(array)) {
              array = {
                data: array
              };
            }
            var Type = array.type;
            if (!Type) {
              if (isIndices(name)) {
                Type = Uint16Array;
              } else {
                Type = Float32Array;
              }
            }
            return new Type(array.data);
          }
          function createAttribsFromArrays(gl3, arrays) {
            var attribs = {};
            Object.keys(arrays).forEach(function(arrayName) {
              if (!isIndices(arrayName)) {
                var array = arrays[arrayName];
                var attribName = array.attrib || array.name || array.attribName || defaults.attribPrefix + arrayName;
                if (array.value) {
                  if (!Array.isArray(array.value) && !typedArrays.isArrayBuffer(array.value)) {
                    throw new Error("array.value is not array or typedarray");
                  }
                  attribs[attribName] = {
                    value: array.value
                  };
                } else {
                  var buffer;
                  var type;
                  var normalization;
                  var numComponents;
                  if (array.buffer && array.buffer instanceof WebGLBuffer) {
                    buffer = array.buffer;
                    numComponents = array.numComponents || array.size;
                    type = array.type;
                    normalization = array.normalize;
                  } else if (typeof array === "number" || typeof array.data === "number") {
                    var numValues = array.data || array;
                    var arrayType = array.type || Float32Array;
                    var numBytes = numValues * arrayType.BYTES_PER_ELEMENT;
                    type = typedArrays.getGLTypeForTypedArrayType(arrayType);
                    normalization = array.normalize !== void 0 ? array.normalize : getNormalizationForTypedArrayType(arrayType);
                    numComponents = array.numComponents || array.size || guessNumComponentsFromName(arrayName, numValues);
                    buffer = gl3.createBuffer();
                    gl3.bindBuffer(ARRAY_BUFFER, buffer);
                    gl3.bufferData(ARRAY_BUFFER, numBytes, array.drawType || STATIC_DRAW);
                  } else {
                    var typedArray = makeTypedArray(array, arrayName);
                    buffer = createBufferFromTypedArray(gl3, typedArray, void 0, array.drawType);
                    type = typedArrays.getGLTypeForTypedArray(typedArray);
                    normalization = array.normalize !== void 0 ? array.normalize : getNormalizationForTypedArray(typedArray);
                    numComponents = getNumComponents(array, arrayName);
                  }
                  attribs[attribName] = {
                    buffer,
                    numComponents,
                    type,
                    normalize: normalization,
                    stride: array.stride || 0,
                    offset: array.offset || 0,
                    divisor: array.divisor === void 0 ? void 0 : array.divisor,
                    drawType: array.drawType
                  };
                }
              }
            });
            gl3.bindBuffer(ARRAY_BUFFER, null);
            return attribs;
          }
          function setAttribInfoBufferFromArray(gl3, attribInfo, array, offset) {
            array = makeTypedArray(array);
            if (offset !== void 0) {
              gl3.bindBuffer(ARRAY_BUFFER, attribInfo.buffer);
              gl3.bufferSubData(ARRAY_BUFFER, offset, array);
            } else {
              setBufferFromTypedArray(gl3, ARRAY_BUFFER, attribInfo.buffer, array, attribInfo.drawType);
            }
          }
          function getBytesPerValueForGLType(gl3, type) {
            if (type === BYTE)
              return 1;
            if (type === UNSIGNED_BYTE)
              return 1;
            if (type === SHORT)
              return 2;
            if (type === UNSIGNED_SHORT)
              return 2;
            if (type === INT)
              return 4;
            if (type === UNSIGNED_INT)
              return 4;
            if (type === FLOAT)
              return 4;
            return 0;
          }
          var positionKeys = ["position", "positions", "a_position"];
          function getNumElementsFromNonIndexedArrays(arrays) {
            var key;
            var ii;
            for (ii = 0; ii < positionKeys.length; ++ii) {
              key = positionKeys[ii];
              if (key in arrays) {
                break;
              }
            }
            if (ii === positionKeys.length) {
              key = Object.keys(arrays)[0];
            }
            var array = arrays[key];
            var length2 = getArray(array).length;
            var numComponents = getNumComponents(array, key);
            var numElements = length2 / numComponents;
            if (length2 % numComponents > 0) {
              throw new Error("numComponents ".concat(numComponents, " not correct for length ").concat(length2));
            }
            return numElements;
          }
          function getNumElementsFromAttributes(gl3, attribs) {
            var key;
            var ii;
            for (ii = 0; ii < positionKeys.length; ++ii) {
              key = positionKeys[ii];
              if (key in attribs) {
                break;
              }
              key = defaults.attribPrefix + key;
              if (key in attribs) {
                break;
              }
            }
            if (ii === positionKeys.length) {
              key = Object.keys(attribs)[0];
            }
            var attrib = attribs[key];
            gl3.bindBuffer(ARRAY_BUFFER, attrib.buffer);
            var numBytes = gl3.getBufferParameter(ARRAY_BUFFER, BUFFER_SIZE);
            gl3.bindBuffer(ARRAY_BUFFER, null);
            var bytesPerValue = getBytesPerValueForGLType(gl3, attrib.type);
            var totalElements = numBytes / bytesPerValue;
            var numComponents = attrib.numComponents || attrib.size;
            var numElements = totalElements / numComponents;
            if (numElements % 1 !== 0) {
              throw new Error("numComponents ".concat(numComponents, " not correct for length ").concat(length));
            }
            return numElements;
          }
          function createBufferInfoFromArrays(gl3, arrays, srcBufferInfo) {
            var newAttribs = createAttribsFromArrays(gl3, arrays);
            var bufferInfo = Object.assign({}, srcBufferInfo ? srcBufferInfo : {});
            bufferInfo.attribs = Object.assign({}, srcBufferInfo ? srcBufferInfo.attribs : {}, newAttribs);
            var indices = arrays.indices;
            if (indices) {
              var newIndices = makeTypedArray(indices, "indices");
              bufferInfo.indices = createBufferFromTypedArray(gl3, newIndices, ELEMENT_ARRAY_BUFFER);
              bufferInfo.numElements = newIndices.length;
              bufferInfo.elementType = typedArrays.getGLTypeForTypedArray(newIndices);
            } else if (!bufferInfo.numElements) {
              bufferInfo.numElements = getNumElementsFromAttributes(gl3, bufferInfo.attribs);
            }
            return bufferInfo;
          }
          function createBufferFromArray(gl3, array, arrayName) {
            var type = arrayName === "indices" ? ELEMENT_ARRAY_BUFFER : ARRAY_BUFFER;
            var typedArray = makeTypedArray(array, arrayName);
            return createBufferFromTypedArray(gl3, typedArray, type);
          }
          function createBuffersFromArrays(gl3, arrays) {
            var buffers = {};
            Object.keys(arrays).forEach(function(key) {
              buffers[key] = createBufferFromArray(gl3, arrays[key], key);
            });
            if (arrays.indices) {
              buffers.numElements = arrays.indices.length;
              buffers.elementType = typedArrays.getGLTypeForTypedArray(makeTypedArray(arrays.indices), "indices");
            } else {
              buffers.numElements = getNumElementsFromNonIndexedArrays(arrays);
            }
            return buffers;
          }
        },
        "./src/draw.js": function(module2, exports2, __webpack_require__) {
          "use strict";
          function _typeof(obj) {
            "@babel/helpers - typeof";
            if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
              _typeof = function _typeof2(obj2) {
                return typeof obj2;
              };
            } else {
              _typeof = function _typeof2(obj2) {
                return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
              };
            }
            return _typeof(obj);
          }
          exports2.__esModule = true;
          exports2.drawBufferInfo = drawBufferInfo;
          exports2.drawObjectList = drawObjectList;
          var programs = _interopRequireWildcard(__webpack_require__("./src/programs.js"));
          function _getRequireWildcardCache() {
            if (typeof WeakMap !== "function")
              return null;
            var cache = new WeakMap();
            _getRequireWildcardCache = function _getRequireWildcardCache2() {
              return cache;
            };
            return cache;
          }
          function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
              return obj;
            }
            if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
              return {default: obj};
            }
            var cache = _getRequireWildcardCache();
            if (cache && cache.has(obj)) {
              return cache.get(obj);
            }
            var newObj = {};
            var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) {
                var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                if (desc && (desc.get || desc.set)) {
                  Object.defineProperty(newObj, key, desc);
                } else {
                  newObj[key] = obj[key];
                }
              }
            }
            newObj["default"] = obj;
            if (cache) {
              cache.set(obj, newObj);
            }
            return newObj;
          }
          var TRIANGLES = 4;
          var UNSIGNED_SHORT = 5123;
          function drawBufferInfo(gl2, bufferInfo, type, count, offset, instanceCount) {
            type = type === void 0 ? TRIANGLES : type;
            var indices = bufferInfo.indices;
            var elementType = bufferInfo.elementType;
            var numElements = count === void 0 ? bufferInfo.numElements : count;
            offset = offset === void 0 ? 0 : offset;
            if (elementType || indices) {
              if (instanceCount !== void 0) {
                gl2.drawElementsInstanced(type, numElements, elementType === void 0 ? UNSIGNED_SHORT : bufferInfo.elementType, offset, instanceCount);
              } else {
                gl2.drawElements(type, numElements, elementType === void 0 ? UNSIGNED_SHORT : bufferInfo.elementType, offset);
              }
            } else {
              if (instanceCount !== void 0) {
                gl2.drawArraysInstanced(type, offset, numElements, instanceCount);
              } else {
                gl2.drawArrays(type, offset, numElements);
              }
            }
          }
          function drawObjectList(gl2, objectsToDraw) {
            var lastUsedProgramInfo = null;
            var lastUsedBufferInfo = null;
            objectsToDraw.forEach(function(object) {
              if (object.active === false) {
                return;
              }
              var programInfo = object.programInfo;
              var bufferInfo = object.vertexArrayInfo || object.bufferInfo;
              var bindBuffers = false;
              var type = object.type === void 0 ? TRIANGLES : object.type;
              if (programInfo !== lastUsedProgramInfo) {
                lastUsedProgramInfo = programInfo;
                gl2.useProgram(programInfo.program);
                bindBuffers = true;
              }
              if (bindBuffers || bufferInfo !== lastUsedBufferInfo) {
                if (lastUsedBufferInfo && lastUsedBufferInfo.vertexArrayObject && !bufferInfo.vertexArrayObject) {
                  gl2.bindVertexArray(null);
                }
                lastUsedBufferInfo = bufferInfo;
                programs.setBuffersAndAttributes(gl2, programInfo, bufferInfo);
              }
              programs.setUniforms(programInfo, object.uniforms);
              drawBufferInfo(gl2, bufferInfo, type, object.count, object.offset, object.instanceCount);
            });
            if (lastUsedBufferInfo && lastUsedBufferInfo.vertexArrayObject) {
              gl2.bindVertexArray(null);
            }
          }
        },
        "./src/framebuffers.js": function(module2, exports2, __webpack_require__) {
          "use strict";
          function _typeof(obj) {
            "@babel/helpers - typeof";
            if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
              _typeof = function _typeof2(obj2) {
                return typeof obj2;
              };
            } else {
              _typeof = function _typeof2(obj2) {
                return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
              };
            }
            return _typeof(obj);
          }
          exports2.__esModule = true;
          exports2.bindFramebufferInfo = bindFramebufferInfo;
          exports2.createFramebufferInfo = createFramebufferInfo;
          exports2.resizeFramebufferInfo = resizeFramebufferInfo;
          var textures = _interopRequireWildcard(__webpack_require__("./src/textures.js"));
          var helper = _interopRequireWildcard(__webpack_require__("./src/helper.js"));
          function _getRequireWildcardCache() {
            if (typeof WeakMap !== "function")
              return null;
            var cache = new WeakMap();
            _getRequireWildcardCache = function _getRequireWildcardCache2() {
              return cache;
            };
            return cache;
          }
          function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
              return obj;
            }
            if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
              return {default: obj};
            }
            var cache = _getRequireWildcardCache();
            if (cache && cache.has(obj)) {
              return cache.get(obj);
            }
            var newObj = {};
            var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) {
                var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                if (desc && (desc.get || desc.set)) {
                  Object.defineProperty(newObj, key, desc);
                } else {
                  newObj[key] = obj[key];
                }
              }
            }
            newObj["default"] = obj;
            if (cache) {
              cache.set(obj, newObj);
            }
            return newObj;
          }
          var gl2 = void 0;
          var FRAMEBUFFER = 36160;
          var RENDERBUFFER = 36161;
          var TEXTURE_2D = 3553;
          var UNSIGNED_BYTE = 5121;
          var DEPTH_COMPONENT = 6402;
          var RGBA = 6408;
          var DEPTH_COMPONENT24 = 33190;
          var DEPTH_COMPONENT32F = 36012;
          var DEPTH24_STENCIL8 = 35056;
          var DEPTH32F_STENCIL8 = 36013;
          var RGBA4 = 32854;
          var RGB5_A1 = 32855;
          var RGB565 = 36194;
          var DEPTH_COMPONENT16 = 33189;
          var STENCIL_INDEX = 6401;
          var STENCIL_INDEX8 = 36168;
          var DEPTH_STENCIL = 34041;
          var COLOR_ATTACHMENT0 = 36064;
          var DEPTH_ATTACHMENT = 36096;
          var STENCIL_ATTACHMENT = 36128;
          var DEPTH_STENCIL_ATTACHMENT = 33306;
          var CLAMP_TO_EDGE = 33071;
          var LINEAR = 9729;
          var defaultAttachments = [{
            format: RGBA,
            type: UNSIGNED_BYTE,
            min: LINEAR,
            wrap: CLAMP_TO_EDGE
          }, {
            format: DEPTH_STENCIL
          }];
          var attachmentsByFormat = {};
          attachmentsByFormat[DEPTH_STENCIL] = DEPTH_STENCIL_ATTACHMENT;
          attachmentsByFormat[STENCIL_INDEX] = STENCIL_ATTACHMENT;
          attachmentsByFormat[STENCIL_INDEX8] = STENCIL_ATTACHMENT;
          attachmentsByFormat[DEPTH_COMPONENT] = DEPTH_ATTACHMENT;
          attachmentsByFormat[DEPTH_COMPONENT16] = DEPTH_ATTACHMENT;
          attachmentsByFormat[DEPTH_COMPONENT24] = DEPTH_ATTACHMENT;
          attachmentsByFormat[DEPTH_COMPONENT32F] = DEPTH_ATTACHMENT;
          attachmentsByFormat[DEPTH24_STENCIL8] = DEPTH_STENCIL_ATTACHMENT;
          attachmentsByFormat[DEPTH32F_STENCIL8] = DEPTH_STENCIL_ATTACHMENT;
          function getAttachmentPointForFormat(format, internalFormat) {
            return attachmentsByFormat[format] || attachmentsByFormat[internalFormat];
          }
          var renderbufferFormats = {};
          renderbufferFormats[RGBA4] = true;
          renderbufferFormats[RGB5_A1] = true;
          renderbufferFormats[RGB565] = true;
          renderbufferFormats[DEPTH_STENCIL] = true;
          renderbufferFormats[DEPTH_COMPONENT16] = true;
          renderbufferFormats[STENCIL_INDEX] = true;
          renderbufferFormats[STENCIL_INDEX8] = true;
          function isRenderbufferFormat(format) {
            return renderbufferFormats[format];
          }
          function createFramebufferInfo(gl3, attachments, width, height) {
            var target = FRAMEBUFFER;
            var fb = gl3.createFramebuffer();
            gl3.bindFramebuffer(target, fb);
            width = width || gl3.drawingBufferWidth;
            height = height || gl3.drawingBufferHeight;
            attachments = attachments || defaultAttachments;
            var colorAttachmentCount = 0;
            var framebufferInfo = {
              framebuffer: fb,
              attachments: [],
              width,
              height
            };
            attachments.forEach(function(attachmentOptions) {
              var attachment = attachmentOptions.attachment;
              var format = attachmentOptions.format;
              var attachmentPoint = attachmentOptions.attachmentPoint || getAttachmentPointForFormat(format, attachmentOptions.internalFormat);
              if (!attachmentPoint) {
                attachmentPoint = COLOR_ATTACHMENT0 + colorAttachmentCount++;
              }
              if (!attachment) {
                if (isRenderbufferFormat(format)) {
                  attachment = gl3.createRenderbuffer();
                  gl3.bindRenderbuffer(RENDERBUFFER, attachment);
                  gl3.renderbufferStorage(RENDERBUFFER, format, width, height);
                } else {
                  var textureOptions = Object.assign({}, attachmentOptions);
                  textureOptions.width = width;
                  textureOptions.height = height;
                  if (textureOptions.auto === void 0) {
                    textureOptions.auto = false;
                    textureOptions.min = textureOptions.min || textureOptions.minMag || LINEAR;
                    textureOptions.mag = textureOptions.mag || textureOptions.minMag || LINEAR;
                    textureOptions.wrapS = textureOptions.wrapS || textureOptions.wrap || CLAMP_TO_EDGE;
                    textureOptions.wrapT = textureOptions.wrapT || textureOptions.wrap || CLAMP_TO_EDGE;
                  }
                  attachment = textures.createTexture(gl3, textureOptions);
                }
              }
              if (helper.isRenderbuffer(gl3, attachment)) {
                gl3.framebufferRenderbuffer(target, attachmentPoint, RENDERBUFFER, attachment);
              } else if (helper.isTexture(gl3, attachment)) {
                if (attachmentOptions.layer !== void 0) {
                  gl3.framebufferTextureLayer(target, attachmentPoint, attachment, attachmentOptions.level || 0, attachmentOptions.layer);
                } else {
                  gl3.framebufferTexture2D(target, attachmentPoint, attachmentOptions.target || TEXTURE_2D, attachment, attachmentOptions.level || 0);
                }
              } else {
                throw new Error("unknown attachment type");
              }
              framebufferInfo.attachments.push(attachment);
            });
            return framebufferInfo;
          }
          function resizeFramebufferInfo(gl3, framebufferInfo, attachments, width, height) {
            width = width || gl3.drawingBufferWidth;
            height = height || gl3.drawingBufferHeight;
            framebufferInfo.width = width;
            framebufferInfo.height = height;
            attachments = attachments || defaultAttachments;
            attachments.forEach(function(attachmentOptions, ndx) {
              var attachment = framebufferInfo.attachments[ndx];
              var format = attachmentOptions.format;
              if (helper.isRenderbuffer(gl3, attachment)) {
                gl3.bindRenderbuffer(RENDERBUFFER, attachment);
                gl3.renderbufferStorage(RENDERBUFFER, format, width, height);
              } else if (helper.isTexture(gl3, attachment)) {
                textures.resizeTexture(gl3, attachment, attachmentOptions, width, height);
              } else {
                throw new Error("unknown attachment type");
              }
            });
          }
          function bindFramebufferInfo(gl3, framebufferInfo, target) {
            target = target || FRAMEBUFFER;
            if (framebufferInfo) {
              gl3.bindFramebuffer(target, framebufferInfo.framebuffer);
              gl3.viewport(0, 0, framebufferInfo.width, framebufferInfo.height);
            } else {
              gl3.bindFramebuffer(target, null);
              gl3.viewport(0, 0, gl3.drawingBufferWidth, gl3.drawingBufferHeight);
            }
          }
        },
        "./src/helper.js": function(module2, exports2, __webpack_require__) {
          "use strict";
          exports2.__esModule = true;
          exports2.copyExistingProperties = copyExistingProperties;
          exports2.copyNamedProperties = copyNamedProperties;
          exports2.error = error;
          exports2.warn = warn;
          exports2.isBuffer = isBuffer;
          exports2.isRenderbuffer = isRenderbuffer;
          exports2.isShader = isShader;
          exports2.isTexture = isTexture;
          exports2.isSampler = isSampler;
          function copyNamedProperties(names, src, dst) {
            names.forEach(function(name) {
              var value = src[name];
              if (value !== void 0) {
                dst[name] = value;
              }
            });
          }
          function copyExistingProperties(src, dst) {
            Object.keys(dst).forEach(function(key) {
              if (dst.hasOwnProperty(key) && src.hasOwnProperty(key)) {
                dst[key] = src[key];
              }
            });
          }
          function error() {
            var _console;
            (_console = console).error.apply(_console, arguments);
          }
          function warn() {
            var _console2;
            (_console2 = console).warn.apply(_console2, arguments);
          }
          function isBuffer(gl2, t) {
            return typeof WebGLBuffer !== "undefined" && t instanceof WebGLBuffer;
          }
          function isRenderbuffer(gl2, t) {
            return typeof WebGLRenderbuffer !== "undefined" && t instanceof WebGLRenderbuffer;
          }
          function isShader(gl2, t) {
            return typeof WebGLShader !== "undefined" && t instanceof WebGLShader;
          }
          function isTexture(gl2, t) {
            return typeof WebGLTexture !== "undefined" && t instanceof WebGLTexture;
          }
          function isSampler(gl2, t) {
            return typeof WebGLSampler !== "undefined" && t instanceof WebGLSampler;
          }
        },
        "./src/m4.js": function(module2, exports2, __webpack_require__) {
          "use strict";
          function _typeof(obj) {
            "@babel/helpers - typeof";
            if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
              _typeof = function _typeof2(obj2) {
                return typeof obj2;
              };
            } else {
              _typeof = function _typeof2(obj2) {
                return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
              };
            }
            return _typeof(obj);
          }
          exports2.__esModule = true;
          exports2.axisRotate = axisRotate;
          exports2.axisRotation = axisRotation;
          exports2.copy = copy;
          exports2.frustum = frustum;
          exports2.getAxis = getAxis;
          exports2.getTranslation = getTranslation;
          exports2.identity = identity;
          exports2.inverse = inverse;
          exports2.lookAt = lookAt;
          exports2.multiply = multiply;
          exports2.negate = negate;
          exports2.ortho = ortho;
          exports2.perspective = perspective;
          exports2.rotateX = rotateX;
          exports2.rotateY = rotateY;
          exports2.rotateZ = rotateZ;
          exports2.rotationX = rotationX;
          exports2.rotationY = rotationY;
          exports2.rotationZ = rotationZ;
          exports2.scale = scale;
          exports2.scaling = scaling;
          exports2.setAxis = setAxis;
          exports2.setDefaultType = setDefaultType;
          exports2.setTranslation = setTranslation;
          exports2.transformDirection = transformDirection;
          exports2.transformNormal = transformNormal;
          exports2.transformPoint = transformPoint;
          exports2.translate = translate;
          exports2.translation = translation;
          exports2.transpose = transpose;
          var v3 = _interopRequireWildcard(__webpack_require__("./src/v3.js"));
          function _getRequireWildcardCache() {
            if (typeof WeakMap !== "function")
              return null;
            var cache = new WeakMap();
            _getRequireWildcardCache = function _getRequireWildcardCache2() {
              return cache;
            };
            return cache;
          }
          function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
              return obj;
            }
            if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
              return {default: obj};
            }
            var cache = _getRequireWildcardCache();
            if (cache && cache.has(obj)) {
              return cache.get(obj);
            }
            var newObj = {};
            var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) {
                var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                if (desc && (desc.get || desc.set)) {
                  Object.defineProperty(newObj, key, desc);
                } else {
                  newObj[key] = obj[key];
                }
              }
            }
            newObj["default"] = obj;
            if (cache) {
              cache.set(obj, newObj);
            }
            return newObj;
          }
          var MatType = Float32Array;
          function setDefaultType(ctor) {
            var oldType = MatType;
            MatType = ctor;
            return oldType;
          }
          function negate(m, dst) {
            dst = dst || new MatType(16);
            dst[0] = -m[0];
            dst[1] = -m[1];
            dst[2] = -m[2];
            dst[3] = -m[3];
            dst[4] = -m[4];
            dst[5] = -m[5];
            dst[6] = -m[6];
            dst[7] = -m[7];
            dst[8] = -m[8];
            dst[9] = -m[9];
            dst[10] = -m[10];
            dst[11] = -m[11];
            dst[12] = -m[12];
            dst[13] = -m[13];
            dst[14] = -m[14];
            dst[15] = -m[15];
            return dst;
          }
          function copy(m, dst) {
            dst = dst || new MatType(16);
            dst[0] = m[0];
            dst[1] = m[1];
            dst[2] = m[2];
            dst[3] = m[3];
            dst[4] = m[4];
            dst[5] = m[5];
            dst[6] = m[6];
            dst[7] = m[7];
            dst[8] = m[8];
            dst[9] = m[9];
            dst[10] = m[10];
            dst[11] = m[11];
            dst[12] = m[12];
            dst[13] = m[13];
            dst[14] = m[14];
            dst[15] = m[15];
            return dst;
          }
          function identity(dst) {
            dst = dst || new MatType(16);
            dst[0] = 1;
            dst[1] = 0;
            dst[2] = 0;
            dst[3] = 0;
            dst[4] = 0;
            dst[5] = 1;
            dst[6] = 0;
            dst[7] = 0;
            dst[8] = 0;
            dst[9] = 0;
            dst[10] = 1;
            dst[11] = 0;
            dst[12] = 0;
            dst[13] = 0;
            dst[14] = 0;
            dst[15] = 1;
            return dst;
          }
          function transpose(m, dst) {
            dst = dst || new MatType(16);
            if (dst === m) {
              var t;
              t = m[1];
              m[1] = m[4];
              m[4] = t;
              t = m[2];
              m[2] = m[8];
              m[8] = t;
              t = m[3];
              m[3] = m[12];
              m[12] = t;
              t = m[6];
              m[6] = m[9];
              m[9] = t;
              t = m[7];
              m[7] = m[13];
              m[13] = t;
              t = m[11];
              m[11] = m[14];
              m[14] = t;
              return dst;
            }
            var m00 = m[0 * 4 + 0];
            var m01 = m[0 * 4 + 1];
            var m02 = m[0 * 4 + 2];
            var m03 = m[0 * 4 + 3];
            var m10 = m[1 * 4 + 0];
            var m11 = m[1 * 4 + 1];
            var m12 = m[1 * 4 + 2];
            var m13 = m[1 * 4 + 3];
            var m20 = m[2 * 4 + 0];
            var m21 = m[2 * 4 + 1];
            var m22 = m[2 * 4 + 2];
            var m23 = m[2 * 4 + 3];
            var m30 = m[3 * 4 + 0];
            var m31 = m[3 * 4 + 1];
            var m32 = m[3 * 4 + 2];
            var m33 = m[3 * 4 + 3];
            dst[0] = m00;
            dst[1] = m10;
            dst[2] = m20;
            dst[3] = m30;
            dst[4] = m01;
            dst[5] = m11;
            dst[6] = m21;
            dst[7] = m31;
            dst[8] = m02;
            dst[9] = m12;
            dst[10] = m22;
            dst[11] = m32;
            dst[12] = m03;
            dst[13] = m13;
            dst[14] = m23;
            dst[15] = m33;
            return dst;
          }
          function inverse(m, dst) {
            dst = dst || new MatType(16);
            var m00 = m[0 * 4 + 0];
            var m01 = m[0 * 4 + 1];
            var m02 = m[0 * 4 + 2];
            var m03 = m[0 * 4 + 3];
            var m10 = m[1 * 4 + 0];
            var m11 = m[1 * 4 + 1];
            var m12 = m[1 * 4 + 2];
            var m13 = m[1 * 4 + 3];
            var m20 = m[2 * 4 + 0];
            var m21 = m[2 * 4 + 1];
            var m22 = m[2 * 4 + 2];
            var m23 = m[2 * 4 + 3];
            var m30 = m[3 * 4 + 0];
            var m31 = m[3 * 4 + 1];
            var m32 = m[3 * 4 + 2];
            var m33 = m[3 * 4 + 3];
            var tmp_0 = m22 * m33;
            var tmp_1 = m32 * m23;
            var tmp_2 = m12 * m33;
            var tmp_3 = m32 * m13;
            var tmp_4 = m12 * m23;
            var tmp_5 = m22 * m13;
            var tmp_6 = m02 * m33;
            var tmp_7 = m32 * m03;
            var tmp_8 = m02 * m23;
            var tmp_9 = m22 * m03;
            var tmp_10 = m02 * m13;
            var tmp_11 = m12 * m03;
            var tmp_12 = m20 * m31;
            var tmp_13 = m30 * m21;
            var tmp_14 = m10 * m31;
            var tmp_15 = m30 * m11;
            var tmp_16 = m10 * m21;
            var tmp_17 = m20 * m11;
            var tmp_18 = m00 * m31;
            var tmp_19 = m30 * m01;
            var tmp_20 = m00 * m21;
            var tmp_21 = m20 * m01;
            var tmp_22 = m00 * m11;
            var tmp_23 = m10 * m01;
            var t0 = tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31 - (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
            var t1 = tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31 - (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
            var t2 = tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31 - (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
            var t3 = tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21 - (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);
            var d = 1 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);
            dst[0] = d * t0;
            dst[1] = d * t1;
            dst[2] = d * t2;
            dst[3] = d * t3;
            dst[4] = d * (tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30 - (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30));
            dst[5] = d * (tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30 - (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30));
            dst[6] = d * (tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30 - (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30));
            dst[7] = d * (tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20 - (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20));
            dst[8] = d * (tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33 - (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33));
            dst[9] = d * (tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33 - (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33));
            dst[10] = d * (tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33 - (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33));
            dst[11] = d * (tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23 - (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23));
            dst[12] = d * (tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12 - (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22));
            dst[13] = d * (tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22 - (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02));
            dst[14] = d * (tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02 - (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12));
            dst[15] = d * (tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12 - (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02));
            return dst;
          }
          function multiply(a, b, dst) {
            dst = dst || new MatType(16);
            var a00 = a[0];
            var a01 = a[1];
            var a02 = a[2];
            var a03 = a[3];
            var a10 = a[4 + 0];
            var a11 = a[4 + 1];
            var a12 = a[4 + 2];
            var a13 = a[4 + 3];
            var a20 = a[8 + 0];
            var a21 = a[8 + 1];
            var a22 = a[8 + 2];
            var a23 = a[8 + 3];
            var a30 = a[12 + 0];
            var a31 = a[12 + 1];
            var a32 = a[12 + 2];
            var a33 = a[12 + 3];
            var b00 = b[0];
            var b01 = b[1];
            var b02 = b[2];
            var b03 = b[3];
            var b10 = b[4 + 0];
            var b11 = b[4 + 1];
            var b12 = b[4 + 2];
            var b13 = b[4 + 3];
            var b20 = b[8 + 0];
            var b21 = b[8 + 1];
            var b22 = b[8 + 2];
            var b23 = b[8 + 3];
            var b30 = b[12 + 0];
            var b31 = b[12 + 1];
            var b32 = b[12 + 2];
            var b33 = b[12 + 3];
            dst[0] = a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03;
            dst[1] = a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03;
            dst[2] = a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03;
            dst[3] = a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03;
            dst[4] = a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13;
            dst[5] = a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13;
            dst[6] = a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13;
            dst[7] = a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13;
            dst[8] = a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23;
            dst[9] = a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23;
            dst[10] = a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23;
            dst[11] = a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23;
            dst[12] = a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33;
            dst[13] = a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33;
            dst[14] = a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33;
            dst[15] = a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33;
            return dst;
          }
          function setTranslation(a, v, dst) {
            dst = dst || identity();
            if (a !== dst) {
              dst[0] = a[0];
              dst[1] = a[1];
              dst[2] = a[2];
              dst[3] = a[3];
              dst[4] = a[4];
              dst[5] = a[5];
              dst[6] = a[6];
              dst[7] = a[7];
              dst[8] = a[8];
              dst[9] = a[9];
              dst[10] = a[10];
              dst[11] = a[11];
            }
            dst[12] = v[0];
            dst[13] = v[1];
            dst[14] = v[2];
            dst[15] = 1;
            return dst;
          }
          function getTranslation(m, dst) {
            dst = dst || v3.create();
            dst[0] = m[12];
            dst[1] = m[13];
            dst[2] = m[14];
            return dst;
          }
          function getAxis(m, axis, dst) {
            dst = dst || v3.create();
            var off = axis * 4;
            dst[0] = m[off + 0];
            dst[1] = m[off + 1];
            dst[2] = m[off + 2];
            return dst;
          }
          function setAxis(a, v, axis, dst) {
            if (dst !== a) {
              dst = copy(a, dst);
            }
            var off = axis * 4;
            dst[off + 0] = v[0];
            dst[off + 1] = v[1];
            dst[off + 2] = v[2];
            return dst;
          }
          function perspective(fieldOfViewYInRadians, aspect, zNear, zFar, dst) {
            dst = dst || new MatType(16);
            var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewYInRadians);
            var rangeInv = 1 / (zNear - zFar);
            dst[0] = f / aspect;
            dst[1] = 0;
            dst[2] = 0;
            dst[3] = 0;
            dst[4] = 0;
            dst[5] = f;
            dst[6] = 0;
            dst[7] = 0;
            dst[8] = 0;
            dst[9] = 0;
            dst[10] = (zNear + zFar) * rangeInv;
            dst[11] = -1;
            dst[12] = 0;
            dst[13] = 0;
            dst[14] = zNear * zFar * rangeInv * 2;
            dst[15] = 0;
            return dst;
          }
          function ortho(left, right, bottom, top, near, far, dst) {
            dst = dst || new MatType(16);
            dst[0] = 2 / (right - left);
            dst[1] = 0;
            dst[2] = 0;
            dst[3] = 0;
            dst[4] = 0;
            dst[5] = 2 / (top - bottom);
            dst[6] = 0;
            dst[7] = 0;
            dst[8] = 0;
            dst[9] = 0;
            dst[10] = 2 / (near - far);
            dst[11] = 0;
            dst[12] = (right + left) / (left - right);
            dst[13] = (top + bottom) / (bottom - top);
            dst[14] = (far + near) / (near - far);
            dst[15] = 1;
            return dst;
          }
          function frustum(left, right, bottom, top, near, far, dst) {
            dst = dst || new MatType(16);
            var dx = right - left;
            var dy = top - bottom;
            var dz = near - far;
            dst[0] = 2 * near / dx;
            dst[1] = 0;
            dst[2] = 0;
            dst[3] = 0;
            dst[4] = 0;
            dst[5] = 2 * near / dy;
            dst[6] = 0;
            dst[7] = 0;
            dst[8] = (left + right) / dx;
            dst[9] = (top + bottom) / dy;
            dst[10] = far / dz;
            dst[11] = -1;
            dst[12] = 0;
            dst[13] = 0;
            dst[14] = near * far / dz;
            dst[15] = 0;
            return dst;
          }
          var xAxis;
          var yAxis;
          var zAxis;
          function lookAt(eye, target, up, dst) {
            dst = dst || new MatType(16);
            xAxis = xAxis || v3.create();
            yAxis = yAxis || v3.create();
            zAxis = zAxis || v3.create();
            v3.normalize(v3.subtract(eye, target, zAxis), zAxis);
            v3.normalize(v3.cross(up, zAxis, xAxis), xAxis);
            v3.normalize(v3.cross(zAxis, xAxis, yAxis), yAxis);
            dst[0] = xAxis[0];
            dst[1] = xAxis[1];
            dst[2] = xAxis[2];
            dst[3] = 0;
            dst[4] = yAxis[0];
            dst[5] = yAxis[1];
            dst[6] = yAxis[2];
            dst[7] = 0;
            dst[8] = zAxis[0];
            dst[9] = zAxis[1];
            dst[10] = zAxis[2];
            dst[11] = 0;
            dst[12] = eye[0];
            dst[13] = eye[1];
            dst[14] = eye[2];
            dst[15] = 1;
            return dst;
          }
          function translation(v, dst) {
            dst = dst || new MatType(16);
            dst[0] = 1;
            dst[1] = 0;
            dst[2] = 0;
            dst[3] = 0;
            dst[4] = 0;
            dst[5] = 1;
            dst[6] = 0;
            dst[7] = 0;
            dst[8] = 0;
            dst[9] = 0;
            dst[10] = 1;
            dst[11] = 0;
            dst[12] = v[0];
            dst[13] = v[1];
            dst[14] = v[2];
            dst[15] = 1;
            return dst;
          }
          function translate(m, v, dst) {
            dst = dst || new MatType(16);
            var v0 = v[0];
            var v1 = v[1];
            var v2 = v[2];
            var m00 = m[0];
            var m01 = m[1];
            var m02 = m[2];
            var m03 = m[3];
            var m10 = m[1 * 4 + 0];
            var m11 = m[1 * 4 + 1];
            var m12 = m[1 * 4 + 2];
            var m13 = m[1 * 4 + 3];
            var m20 = m[2 * 4 + 0];
            var m21 = m[2 * 4 + 1];
            var m22 = m[2 * 4 + 2];
            var m23 = m[2 * 4 + 3];
            var m30 = m[3 * 4 + 0];
            var m31 = m[3 * 4 + 1];
            var m32 = m[3 * 4 + 2];
            var m33 = m[3 * 4 + 3];
            if (m !== dst) {
              dst[0] = m00;
              dst[1] = m01;
              dst[2] = m02;
              dst[3] = m03;
              dst[4] = m10;
              dst[5] = m11;
              dst[6] = m12;
              dst[7] = m13;
              dst[8] = m20;
              dst[9] = m21;
              dst[10] = m22;
              dst[11] = m23;
            }
            dst[12] = m00 * v0 + m10 * v1 + m20 * v2 + m30;
            dst[13] = m01 * v0 + m11 * v1 + m21 * v2 + m31;
            dst[14] = m02 * v0 + m12 * v1 + m22 * v2 + m32;
            dst[15] = m03 * v0 + m13 * v1 + m23 * v2 + m33;
            return dst;
          }
          function rotationX(angleInRadians, dst) {
            dst = dst || new MatType(16);
            var c = Math.cos(angleInRadians);
            var s = Math.sin(angleInRadians);
            dst[0] = 1;
            dst[1] = 0;
            dst[2] = 0;
            dst[3] = 0;
            dst[4] = 0;
            dst[5] = c;
            dst[6] = s;
            dst[7] = 0;
            dst[8] = 0;
            dst[9] = -s;
            dst[10] = c;
            dst[11] = 0;
            dst[12] = 0;
            dst[13] = 0;
            dst[14] = 0;
            dst[15] = 1;
            return dst;
          }
          function rotateX(m, angleInRadians, dst) {
            dst = dst || new MatType(16);
            var m10 = m[4];
            var m11 = m[5];
            var m12 = m[6];
            var m13 = m[7];
            var m20 = m[8];
            var m21 = m[9];
            var m22 = m[10];
            var m23 = m[11];
            var c = Math.cos(angleInRadians);
            var s = Math.sin(angleInRadians);
            dst[4] = c * m10 + s * m20;
            dst[5] = c * m11 + s * m21;
            dst[6] = c * m12 + s * m22;
            dst[7] = c * m13 + s * m23;
            dst[8] = c * m20 - s * m10;
            dst[9] = c * m21 - s * m11;
            dst[10] = c * m22 - s * m12;
            dst[11] = c * m23 - s * m13;
            if (m !== dst) {
              dst[0] = m[0];
              dst[1] = m[1];
              dst[2] = m[2];
              dst[3] = m[3];
              dst[12] = m[12];
              dst[13] = m[13];
              dst[14] = m[14];
              dst[15] = m[15];
            }
            return dst;
          }
          function rotationY(angleInRadians, dst) {
            dst = dst || new MatType(16);
            var c = Math.cos(angleInRadians);
            var s = Math.sin(angleInRadians);
            dst[0] = c;
            dst[1] = 0;
            dst[2] = -s;
            dst[3] = 0;
            dst[4] = 0;
            dst[5] = 1;
            dst[6] = 0;
            dst[7] = 0;
            dst[8] = s;
            dst[9] = 0;
            dst[10] = c;
            dst[11] = 0;
            dst[12] = 0;
            dst[13] = 0;
            dst[14] = 0;
            dst[15] = 1;
            return dst;
          }
          function rotateY(m, angleInRadians, dst) {
            dst = dst || new MatType(16);
            var m00 = m[0 * 4 + 0];
            var m01 = m[0 * 4 + 1];
            var m02 = m[0 * 4 + 2];
            var m03 = m[0 * 4 + 3];
            var m20 = m[2 * 4 + 0];
            var m21 = m[2 * 4 + 1];
            var m22 = m[2 * 4 + 2];
            var m23 = m[2 * 4 + 3];
            var c = Math.cos(angleInRadians);
            var s = Math.sin(angleInRadians);
            dst[0] = c * m00 - s * m20;
            dst[1] = c * m01 - s * m21;
            dst[2] = c * m02 - s * m22;
            dst[3] = c * m03 - s * m23;
            dst[8] = c * m20 + s * m00;
            dst[9] = c * m21 + s * m01;
            dst[10] = c * m22 + s * m02;
            dst[11] = c * m23 + s * m03;
            if (m !== dst) {
              dst[4] = m[4];
              dst[5] = m[5];
              dst[6] = m[6];
              dst[7] = m[7];
              dst[12] = m[12];
              dst[13] = m[13];
              dst[14] = m[14];
              dst[15] = m[15];
            }
            return dst;
          }
          function rotationZ(angleInRadians, dst) {
            dst = dst || new MatType(16);
            var c = Math.cos(angleInRadians);
            var s = Math.sin(angleInRadians);
            dst[0] = c;
            dst[1] = s;
            dst[2] = 0;
            dst[3] = 0;
            dst[4] = -s;
            dst[5] = c;
            dst[6] = 0;
            dst[7] = 0;
            dst[8] = 0;
            dst[9] = 0;
            dst[10] = 1;
            dst[11] = 0;
            dst[12] = 0;
            dst[13] = 0;
            dst[14] = 0;
            dst[15] = 1;
            return dst;
          }
          function rotateZ(m, angleInRadians, dst) {
            dst = dst || new MatType(16);
            var m00 = m[0 * 4 + 0];
            var m01 = m[0 * 4 + 1];
            var m02 = m[0 * 4 + 2];
            var m03 = m[0 * 4 + 3];
            var m10 = m[1 * 4 + 0];
            var m11 = m[1 * 4 + 1];
            var m12 = m[1 * 4 + 2];
            var m13 = m[1 * 4 + 3];
            var c = Math.cos(angleInRadians);
            var s = Math.sin(angleInRadians);
            dst[0] = c * m00 + s * m10;
            dst[1] = c * m01 + s * m11;
            dst[2] = c * m02 + s * m12;
            dst[3] = c * m03 + s * m13;
            dst[4] = c * m10 - s * m00;
            dst[5] = c * m11 - s * m01;
            dst[6] = c * m12 - s * m02;
            dst[7] = c * m13 - s * m03;
            if (m !== dst) {
              dst[8] = m[8];
              dst[9] = m[9];
              dst[10] = m[10];
              dst[11] = m[11];
              dst[12] = m[12];
              dst[13] = m[13];
              dst[14] = m[14];
              dst[15] = m[15];
            }
            return dst;
          }
          function axisRotation(axis, angleInRadians, dst) {
            dst = dst || new MatType(16);
            var x = axis[0];
            var y = axis[1];
            var z = axis[2];
            var n = Math.sqrt(x * x + y * y + z * z);
            x /= n;
            y /= n;
            z /= n;
            var xx = x * x;
            var yy = y * y;
            var zz = z * z;
            var c = Math.cos(angleInRadians);
            var s = Math.sin(angleInRadians);
            var oneMinusCosine = 1 - c;
            dst[0] = xx + (1 - xx) * c;
            dst[1] = x * y * oneMinusCosine + z * s;
            dst[2] = x * z * oneMinusCosine - y * s;
            dst[3] = 0;
            dst[4] = x * y * oneMinusCosine - z * s;
            dst[5] = yy + (1 - yy) * c;
            dst[6] = y * z * oneMinusCosine + x * s;
            dst[7] = 0;
            dst[8] = x * z * oneMinusCosine + y * s;
            dst[9] = y * z * oneMinusCosine - x * s;
            dst[10] = zz + (1 - zz) * c;
            dst[11] = 0;
            dst[12] = 0;
            dst[13] = 0;
            dst[14] = 0;
            dst[15] = 1;
            return dst;
          }
          function axisRotate(m, axis, angleInRadians, dst) {
            dst = dst || new MatType(16);
            var x = axis[0];
            var y = axis[1];
            var z = axis[2];
            var n = Math.sqrt(x * x + y * y + z * z);
            x /= n;
            y /= n;
            z /= n;
            var xx = x * x;
            var yy = y * y;
            var zz = z * z;
            var c = Math.cos(angleInRadians);
            var s = Math.sin(angleInRadians);
            var oneMinusCosine = 1 - c;
            var r00 = xx + (1 - xx) * c;
            var r01 = x * y * oneMinusCosine + z * s;
            var r02 = x * z * oneMinusCosine - y * s;
            var r10 = x * y * oneMinusCosine - z * s;
            var r11 = yy + (1 - yy) * c;
            var r12 = y * z * oneMinusCosine + x * s;
            var r20 = x * z * oneMinusCosine + y * s;
            var r21 = y * z * oneMinusCosine - x * s;
            var r22 = zz + (1 - zz) * c;
            var m00 = m[0];
            var m01 = m[1];
            var m02 = m[2];
            var m03 = m[3];
            var m10 = m[4];
            var m11 = m[5];
            var m12 = m[6];
            var m13 = m[7];
            var m20 = m[8];
            var m21 = m[9];
            var m22 = m[10];
            var m23 = m[11];
            dst[0] = r00 * m00 + r01 * m10 + r02 * m20;
            dst[1] = r00 * m01 + r01 * m11 + r02 * m21;
            dst[2] = r00 * m02 + r01 * m12 + r02 * m22;
            dst[3] = r00 * m03 + r01 * m13 + r02 * m23;
            dst[4] = r10 * m00 + r11 * m10 + r12 * m20;
            dst[5] = r10 * m01 + r11 * m11 + r12 * m21;
            dst[6] = r10 * m02 + r11 * m12 + r12 * m22;
            dst[7] = r10 * m03 + r11 * m13 + r12 * m23;
            dst[8] = r20 * m00 + r21 * m10 + r22 * m20;
            dst[9] = r20 * m01 + r21 * m11 + r22 * m21;
            dst[10] = r20 * m02 + r21 * m12 + r22 * m22;
            dst[11] = r20 * m03 + r21 * m13 + r22 * m23;
            if (m !== dst) {
              dst[12] = m[12];
              dst[13] = m[13];
              dst[14] = m[14];
              dst[15] = m[15];
            }
            return dst;
          }
          function scaling(v, dst) {
            dst = dst || new MatType(16);
            dst[0] = v[0];
            dst[1] = 0;
            dst[2] = 0;
            dst[3] = 0;
            dst[4] = 0;
            dst[5] = v[1];
            dst[6] = 0;
            dst[7] = 0;
            dst[8] = 0;
            dst[9] = 0;
            dst[10] = v[2];
            dst[11] = 0;
            dst[12] = 0;
            dst[13] = 0;
            dst[14] = 0;
            dst[15] = 1;
            return dst;
          }
          function scale(m, v, dst) {
            dst = dst || new MatType(16);
            var v0 = v[0];
            var v1 = v[1];
            var v2 = v[2];
            dst[0] = v0 * m[0 * 4 + 0];
            dst[1] = v0 * m[0 * 4 + 1];
            dst[2] = v0 * m[0 * 4 + 2];
            dst[3] = v0 * m[0 * 4 + 3];
            dst[4] = v1 * m[1 * 4 + 0];
            dst[5] = v1 * m[1 * 4 + 1];
            dst[6] = v1 * m[1 * 4 + 2];
            dst[7] = v1 * m[1 * 4 + 3];
            dst[8] = v2 * m[2 * 4 + 0];
            dst[9] = v2 * m[2 * 4 + 1];
            dst[10] = v2 * m[2 * 4 + 2];
            dst[11] = v2 * m[2 * 4 + 3];
            if (m !== dst) {
              dst[12] = m[12];
              dst[13] = m[13];
              dst[14] = m[14];
              dst[15] = m[15];
            }
            return dst;
          }
          function transformPoint(m, v, dst) {
            dst = dst || v3.create();
            var v0 = v[0];
            var v1 = v[1];
            var v2 = v[2];
            var d = v0 * m[0 * 4 + 3] + v1 * m[1 * 4 + 3] + v2 * m[2 * 4 + 3] + m[3 * 4 + 3];
            dst[0] = (v0 * m[0 * 4 + 0] + v1 * m[1 * 4 + 0] + v2 * m[2 * 4 + 0] + m[3 * 4 + 0]) / d;
            dst[1] = (v0 * m[0 * 4 + 1] + v1 * m[1 * 4 + 1] + v2 * m[2 * 4 + 1] + m[3 * 4 + 1]) / d;
            dst[2] = (v0 * m[0 * 4 + 2] + v1 * m[1 * 4 + 2] + v2 * m[2 * 4 + 2] + m[3 * 4 + 2]) / d;
            return dst;
          }
          function transformDirection(m, v, dst) {
            dst = dst || v3.create();
            var v0 = v[0];
            var v1 = v[1];
            var v2 = v[2];
            dst[0] = v0 * m[0 * 4 + 0] + v1 * m[1 * 4 + 0] + v2 * m[2 * 4 + 0];
            dst[1] = v0 * m[0 * 4 + 1] + v1 * m[1 * 4 + 1] + v2 * m[2 * 4 + 1];
            dst[2] = v0 * m[0 * 4 + 2] + v1 * m[1 * 4 + 2] + v2 * m[2 * 4 + 2];
            return dst;
          }
          function transformNormal(m, v, dst) {
            dst = dst || v3.create();
            var mi = inverse(m);
            var v0 = v[0];
            var v1 = v[1];
            var v2 = v[2];
            dst[0] = v0 * mi[0 * 4 + 0] + v1 * mi[0 * 4 + 1] + v2 * mi[0 * 4 + 2];
            dst[1] = v0 * mi[1 * 4 + 0] + v1 * mi[1 * 4 + 1] + v2 * mi[1 * 4 + 2];
            dst[2] = v0 * mi[2 * 4 + 0] + v1 * mi[2 * 4 + 1] + v2 * mi[2 * 4 + 2];
            return dst;
          }
        },
        "./src/primitives.js": function(module2, exports2, __webpack_require__) {
          "use strict";
          function _typeof(obj) {
            "@babel/helpers - typeof";
            if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
              _typeof = function _typeof2(obj2) {
                return typeof obj2;
              };
            } else {
              _typeof = function _typeof2(obj2) {
                return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
              };
            }
            return _typeof(obj);
          }
          exports2.__esModule = true;
          exports2.create3DFVertices = create3DFVertices;
          exports2.createAugmentedTypedArray = createAugmentedTypedArray;
          exports2.createCubeVertices = createCubeVertices;
          exports2.createPlaneVertices = createPlaneVertices;
          exports2.createSphereVertices = createSphereVertices;
          exports2.createTruncatedConeVertices = createTruncatedConeVertices;
          exports2.createXYQuadVertices = createXYQuadVertices;
          exports2.createCrescentVertices = createCrescentVertices;
          exports2.createCylinderVertices = createCylinderVertices;
          exports2.createTorusVertices = createTorusVertices;
          exports2.createDiscVertices = createDiscVertices;
          exports2.deindexVertices = deindexVertices;
          exports2.flattenNormals = flattenNormals;
          exports2.makeRandomVertexColors = makeRandomVertexColors;
          exports2.reorientDirections = reorientDirections;
          exports2.reorientNormals = reorientNormals;
          exports2.reorientPositions = reorientPositions;
          exports2.reorientVertices = reorientVertices;
          exports2.concatVertices = concatVertices;
          exports2.duplicateVertices = duplicateVertices;
          exports2.createDiscBuffers = exports2.createDiscBufferInfo = exports2.createTorusBuffers = exports2.createTorusBufferInfo = exports2.createCylinderBuffers = exports2.createCylinderBufferInfo = exports2.createCrescentBuffers = exports2.createCrescentBufferInfo = exports2.createCresentVertices = exports2.createCresentBuffers = exports2.createCresentBufferInfo = exports2.createXYQuadBuffers = exports2.createXYQuadBufferInfo = exports2.createTruncatedConeBuffers = exports2.createTruncatedConeBufferInfo = exports2.createSphereBuffers = exports2.createSphereBufferInfo = exports2.createPlaneBuffers = exports2.createPlaneBufferInfo = exports2.createCubeBuffers = exports2.createCubeBufferInfo = exports2.create3DFBuffers = exports2.create3DFBufferInfo = void 0;
          var attributes = _interopRequireWildcard(__webpack_require__("./src/attributes.js"));
          var helper = _interopRequireWildcard(__webpack_require__("./src/helper.js"));
          var typedArrays = _interopRequireWildcard(__webpack_require__("./src/typedarrays.js"));
          var m4 = _interopRequireWildcard(__webpack_require__("./src/m4.js"));
          var v3 = _interopRequireWildcard(__webpack_require__("./src/v3.js"));
          function _getRequireWildcardCache() {
            if (typeof WeakMap !== "function")
              return null;
            var cache = new WeakMap();
            _getRequireWildcardCache = function _getRequireWildcardCache2() {
              return cache;
            };
            return cache;
          }
          function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
              return obj;
            }
            if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
              return {default: obj};
            }
            var cache = _getRequireWildcardCache();
            if (cache && cache.has(obj)) {
              return cache.get(obj);
            }
            var newObj = {};
            var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) {
                var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                if (desc && (desc.get || desc.set)) {
                  Object.defineProperty(newObj, key, desc);
                } else {
                  newObj[key] = obj[key];
                }
              }
            }
            newObj["default"] = obj;
            if (cache) {
              cache.set(obj, newObj);
            }
            return newObj;
          }
          var getArray = attributes.getArray_;
          var getNumComponents = attributes.getNumComponents_;
          function augmentTypedArray(typedArray, numComponents) {
            var cursor = 0;
            typedArray.push = function() {
              for (var ii = 0; ii < arguments.length; ++ii) {
                var value = arguments[ii];
                if (value instanceof Array || typedArrays.isArrayBuffer(value)) {
                  for (var jj = 0; jj < value.length; ++jj) {
                    typedArray[cursor++] = value[jj];
                  }
                } else {
                  typedArray[cursor++] = value;
                }
              }
            };
            typedArray.reset = function(opt_index) {
              cursor = opt_index || 0;
            };
            typedArray.numComponents = numComponents;
            Object.defineProperty(typedArray, "numElements", {
              get: function get() {
                return this.length / this.numComponents | 0;
              }
            });
            return typedArray;
          }
          function createAugmentedTypedArray(numComponents, numElements, opt_type) {
            var Type = opt_type || Float32Array;
            return augmentTypedArray(new Type(numComponents * numElements), numComponents);
          }
          function allButIndices(name) {
            return name !== "indices";
          }
          function deindexVertices(vertices) {
            var indices = vertices.indices;
            var newVertices = {};
            var numElements = indices.length;
            function expandToUnindexed(channel) {
              var srcBuffer = vertices[channel];
              var numComponents = srcBuffer.numComponents;
              var dstBuffer = createAugmentedTypedArray(numComponents, numElements, srcBuffer.constructor);
              for (var ii = 0; ii < numElements; ++ii) {
                var ndx = indices[ii];
                var offset = ndx * numComponents;
                for (var jj = 0; jj < numComponents; ++jj) {
                  dstBuffer.push(srcBuffer[offset + jj]);
                }
              }
              newVertices[channel] = dstBuffer;
            }
            Object.keys(vertices).filter(allButIndices).forEach(expandToUnindexed);
            return newVertices;
          }
          function flattenNormals(vertices) {
            if (vertices.indices) {
              throw new Error("can not flatten normals of indexed vertices. deindex them first");
            }
            var normals = vertices.normal;
            var numNormals = normals.length;
            for (var ii = 0; ii < numNormals; ii += 9) {
              var nax = normals[ii + 0];
              var nay = normals[ii + 1];
              var naz = normals[ii + 2];
              var nbx = normals[ii + 3];
              var nby = normals[ii + 4];
              var nbz = normals[ii + 5];
              var ncx = normals[ii + 6];
              var ncy = normals[ii + 7];
              var ncz = normals[ii + 8];
              var nx = nax + nbx + ncx;
              var ny = nay + nby + ncy;
              var nz = naz + nbz + ncz;
              var length2 = Math.sqrt(nx * nx + ny * ny + nz * nz);
              nx /= length2;
              ny /= length2;
              nz /= length2;
              normals[ii + 0] = nx;
              normals[ii + 1] = ny;
              normals[ii + 2] = nz;
              normals[ii + 3] = nx;
              normals[ii + 4] = ny;
              normals[ii + 5] = nz;
              normals[ii + 6] = nx;
              normals[ii + 7] = ny;
              normals[ii + 8] = nz;
            }
            return vertices;
          }
          function applyFuncToV3Array(array, matrix, fn) {
            var len = array.length;
            var tmp = new Float32Array(3);
            for (var ii = 0; ii < len; ii += 3) {
              fn(matrix, [array[ii], array[ii + 1], array[ii + 2]], tmp);
              array[ii] = tmp[0];
              array[ii + 1] = tmp[1];
              array[ii + 2] = tmp[2];
            }
          }
          function transformNormal(mi, v, dst) {
            dst = dst || v3.create();
            var v0 = v[0];
            var v1 = v[1];
            var v2 = v[2];
            dst[0] = v0 * mi[0 * 4 + 0] + v1 * mi[0 * 4 + 1] + v2 * mi[0 * 4 + 2];
            dst[1] = v0 * mi[1 * 4 + 0] + v1 * mi[1 * 4 + 1] + v2 * mi[1 * 4 + 2];
            dst[2] = v0 * mi[2 * 4 + 0] + v1 * mi[2 * 4 + 1] + v2 * mi[2 * 4 + 2];
            return dst;
          }
          function reorientDirections(array, matrix) {
            applyFuncToV3Array(array, matrix, m4.transformDirection);
            return array;
          }
          function reorientNormals(array, matrix) {
            applyFuncToV3Array(array, m4.inverse(matrix), transformNormal);
            return array;
          }
          function reorientPositions(array, matrix) {
            applyFuncToV3Array(array, matrix, m4.transformPoint);
            return array;
          }
          function reorientVertices(arrays, matrix) {
            Object.keys(arrays).forEach(function(name) {
              var array = arrays[name];
              if (name.indexOf("pos") >= 0) {
                reorientPositions(array, matrix);
              } else if (name.indexOf("tan") >= 0 || name.indexOf("binorm") >= 0) {
                reorientDirections(array, matrix);
              } else if (name.indexOf("norm") >= 0) {
                reorientNormals(array, matrix);
              }
            });
            return arrays;
          }
          function createXYQuadVertices(size, xOffset, yOffset) {
            size = size || 2;
            xOffset = xOffset || 0;
            yOffset = yOffset || 0;
            size *= 0.5;
            return {
              position: {
                numComponents: 2,
                data: [xOffset + -1 * size, yOffset + -1 * size, xOffset + 1 * size, yOffset + -1 * size, xOffset + -1 * size, yOffset + 1 * size, xOffset + 1 * size, yOffset + 1 * size]
              },
              normal: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
              texcoord: [0, 0, 1, 0, 0, 1, 1, 1],
              indices: [0, 1, 2, 2, 1, 3]
            };
          }
          function createPlaneVertices(width, depth, subdivisionsWidth, subdivisionsDepth, matrix) {
            width = width || 1;
            depth = depth || 1;
            subdivisionsWidth = subdivisionsWidth || 1;
            subdivisionsDepth = subdivisionsDepth || 1;
            matrix = matrix || m4.identity();
            var numVertices = (subdivisionsWidth + 1) * (subdivisionsDepth + 1);
            var positions = createAugmentedTypedArray(3, numVertices);
            var normals = createAugmentedTypedArray(3, numVertices);
            var texcoords = createAugmentedTypedArray(2, numVertices);
            for (var z = 0; z <= subdivisionsDepth; z++) {
              for (var x = 0; x <= subdivisionsWidth; x++) {
                var u = x / subdivisionsWidth;
                var v = z / subdivisionsDepth;
                positions.push(width * u - width * 0.5, 0, depth * v - depth * 0.5);
                normals.push(0, 1, 0);
                texcoords.push(u, v);
              }
            }
            var numVertsAcross = subdivisionsWidth + 1;
            var indices = createAugmentedTypedArray(3, subdivisionsWidth * subdivisionsDepth * 2, Uint16Array);
            for (var _z = 0; _z < subdivisionsDepth; _z++) {
              for (var _x = 0; _x < subdivisionsWidth; _x++) {
                indices.push((_z + 0) * numVertsAcross + _x, (_z + 1) * numVertsAcross + _x, (_z + 0) * numVertsAcross + _x + 1);
                indices.push((_z + 1) * numVertsAcross + _x, (_z + 1) * numVertsAcross + _x + 1, (_z + 0) * numVertsAcross + _x + 1);
              }
            }
            var arrays = reorientVertices({
              position: positions,
              normal: normals,
              texcoord: texcoords,
              indices
            }, matrix);
            return arrays;
          }
          function createSphereVertices(radius, subdivisionsAxis, subdivisionsHeight, opt_startLatitudeInRadians, opt_endLatitudeInRadians, opt_startLongitudeInRadians, opt_endLongitudeInRadians) {
            if (subdivisionsAxis <= 0 || subdivisionsHeight <= 0) {
              throw new Error("subdivisionAxis and subdivisionHeight must be > 0");
            }
            opt_startLatitudeInRadians = opt_startLatitudeInRadians || 0;
            opt_endLatitudeInRadians = opt_endLatitudeInRadians || Math.PI;
            opt_startLongitudeInRadians = opt_startLongitudeInRadians || 0;
            opt_endLongitudeInRadians = opt_endLongitudeInRadians || Math.PI * 2;
            var latRange = opt_endLatitudeInRadians - opt_startLatitudeInRadians;
            var longRange = opt_endLongitudeInRadians - opt_startLongitudeInRadians;
            var numVertices = (subdivisionsAxis + 1) * (subdivisionsHeight + 1);
            var positions = createAugmentedTypedArray(3, numVertices);
            var normals = createAugmentedTypedArray(3, numVertices);
            var texcoords = createAugmentedTypedArray(2, numVertices);
            for (var y = 0; y <= subdivisionsHeight; y++) {
              for (var x = 0; x <= subdivisionsAxis; x++) {
                var u = x / subdivisionsAxis;
                var v = y / subdivisionsHeight;
                var theta = longRange * u + opt_startLongitudeInRadians;
                var phi = latRange * v + opt_startLatitudeInRadians;
                var sinTheta = Math.sin(theta);
                var cosTheta = Math.cos(theta);
                var sinPhi = Math.sin(phi);
                var cosPhi = Math.cos(phi);
                var ux = cosTheta * sinPhi;
                var uy = cosPhi;
                var uz = sinTheta * sinPhi;
                positions.push(radius * ux, radius * uy, radius * uz);
                normals.push(ux, uy, uz);
                texcoords.push(1 - u, v);
              }
            }
            var numVertsAround = subdivisionsAxis + 1;
            var indices = createAugmentedTypedArray(3, subdivisionsAxis * subdivisionsHeight * 2, Uint16Array);
            for (var _x2 = 0; _x2 < subdivisionsAxis; _x2++) {
              for (var _y = 0; _y < subdivisionsHeight; _y++) {
                indices.push((_y + 0) * numVertsAround + _x2, (_y + 0) * numVertsAround + _x2 + 1, (_y + 1) * numVertsAround + _x2);
                indices.push((_y + 1) * numVertsAround + _x2, (_y + 0) * numVertsAround + _x2 + 1, (_y + 1) * numVertsAround + _x2 + 1);
              }
            }
            return {
              position: positions,
              normal: normals,
              texcoord: texcoords,
              indices
            };
          }
          var CUBE_FACE_INDICES = [
            [3, 7, 5, 1],
            [6, 2, 0, 4],
            [6, 7, 3, 2],
            [0, 1, 5, 4],
            [7, 6, 4, 5],
            [2, 3, 1, 0]
          ];
          function createCubeVertices(size) {
            size = size || 1;
            var k = size / 2;
            var cornerVertices = [[-k, -k, -k], [+k, -k, -k], [-k, +k, -k], [+k, +k, -k], [-k, -k, +k], [+k, -k, +k], [-k, +k, +k], [+k, +k, +k]];
            var faceNormals = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
            var uvCoords = [[1, 0], [0, 0], [0, 1], [1, 1]];
            var numVertices = 6 * 4;
            var positions = createAugmentedTypedArray(3, numVertices);
            var normals = createAugmentedTypedArray(3, numVertices);
            var texcoords = createAugmentedTypedArray(2, numVertices);
            var indices = createAugmentedTypedArray(3, 6 * 2, Uint16Array);
            for (var f = 0; f < 6; ++f) {
              var faceIndices = CUBE_FACE_INDICES[f];
              for (var v = 0; v < 4; ++v) {
                var position = cornerVertices[faceIndices[v]];
                var normal = faceNormals[f];
                var uv = uvCoords[v];
                positions.push(position);
                normals.push(normal);
                texcoords.push(uv);
              }
              var offset = 4 * f;
              indices.push(offset + 0, offset + 1, offset + 2);
              indices.push(offset + 0, offset + 2, offset + 3);
            }
            return {
              position: positions,
              normal: normals,
              texcoord: texcoords,
              indices
            };
          }
          function createTruncatedConeVertices(bottomRadius, topRadius, height, radialSubdivisions, verticalSubdivisions, opt_topCap, opt_bottomCap) {
            if (radialSubdivisions < 3) {
              throw new Error("radialSubdivisions must be 3 or greater");
            }
            if (verticalSubdivisions < 1) {
              throw new Error("verticalSubdivisions must be 1 or greater");
            }
            var topCap = opt_topCap === void 0 ? true : opt_topCap;
            var bottomCap = opt_bottomCap === void 0 ? true : opt_bottomCap;
            var extra = (topCap ? 2 : 0) + (bottomCap ? 2 : 0);
            var numVertices = (radialSubdivisions + 1) * (verticalSubdivisions + 1 + extra);
            var positions = createAugmentedTypedArray(3, numVertices);
            var normals = createAugmentedTypedArray(3, numVertices);
            var texcoords = createAugmentedTypedArray(2, numVertices);
            var indices = createAugmentedTypedArray(3, radialSubdivisions * (verticalSubdivisions + extra / 2) * 2, Uint16Array);
            var vertsAroundEdge = radialSubdivisions + 1;
            var slant = Math.atan2(bottomRadius - topRadius, height);
            var cosSlant = Math.cos(slant);
            var sinSlant = Math.sin(slant);
            var start = topCap ? -2 : 0;
            var end = verticalSubdivisions + (bottomCap ? 2 : 0);
            for (var yy = start; yy <= end; ++yy) {
              var v = yy / verticalSubdivisions;
              var y = height * v;
              var ringRadius = void 0;
              if (yy < 0) {
                y = 0;
                v = 1;
                ringRadius = bottomRadius;
              } else if (yy > verticalSubdivisions) {
                y = height;
                v = 1;
                ringRadius = topRadius;
              } else {
                ringRadius = bottomRadius + (topRadius - bottomRadius) * (yy / verticalSubdivisions);
              }
              if (yy === -2 || yy === verticalSubdivisions + 2) {
                ringRadius = 0;
                v = 0;
              }
              y -= height / 2;
              for (var ii = 0; ii < vertsAroundEdge; ++ii) {
                var sin = Math.sin(ii * Math.PI * 2 / radialSubdivisions);
                var cos = Math.cos(ii * Math.PI * 2 / radialSubdivisions);
                positions.push(sin * ringRadius, y, cos * ringRadius);
                if (yy < 0) {
                  normals.push(0, -1, 0);
                } else if (yy > verticalSubdivisions) {
                  normals.push(0, 1, 0);
                } else if (ringRadius === 0) {
                  normals.push(0, 0, 0);
                } else {
                  normals.push(sin * cosSlant, sinSlant, cos * cosSlant);
                }
                texcoords.push(ii / radialSubdivisions, 1 - v);
              }
            }
            for (var _yy = 0; _yy < verticalSubdivisions + extra; ++_yy) {
              if (_yy === 1 && topCap || _yy === verticalSubdivisions + extra - 2 && bottomCap) {
                continue;
              }
              for (var _ii = 0; _ii < radialSubdivisions; ++_ii) {
                indices.push(vertsAroundEdge * (_yy + 0) + 0 + _ii, vertsAroundEdge * (_yy + 0) + 1 + _ii, vertsAroundEdge * (_yy + 1) + 1 + _ii);
                indices.push(vertsAroundEdge * (_yy + 0) + 0 + _ii, vertsAroundEdge * (_yy + 1) + 1 + _ii, vertsAroundEdge * (_yy + 1) + 0 + _ii);
              }
            }
            return {
              position: positions,
              normal: normals,
              texcoord: texcoords,
              indices
            };
          }
          function expandRLEData(rleData, padding) {
            padding = padding || [];
            var data = [];
            for (var ii = 0; ii < rleData.length; ii += 4) {
              var runLength = rleData[ii];
              var element = rleData.slice(ii + 1, ii + 4);
              element.push.apply(element, padding);
              for (var jj = 0; jj < runLength; ++jj) {
                data.push.apply(data, element);
              }
            }
            return data;
          }
          function create3DFVertices() {
            var positions = [
              0,
              0,
              0,
              0,
              150,
              0,
              30,
              0,
              0,
              0,
              150,
              0,
              30,
              150,
              0,
              30,
              0,
              0,
              30,
              0,
              0,
              30,
              30,
              0,
              100,
              0,
              0,
              30,
              30,
              0,
              100,
              30,
              0,
              100,
              0,
              0,
              30,
              60,
              0,
              30,
              90,
              0,
              67,
              60,
              0,
              30,
              90,
              0,
              67,
              90,
              0,
              67,
              60,
              0,
              0,
              0,
              30,
              30,
              0,
              30,
              0,
              150,
              30,
              0,
              150,
              30,
              30,
              0,
              30,
              30,
              150,
              30,
              30,
              0,
              30,
              100,
              0,
              30,
              30,
              30,
              30,
              30,
              30,
              30,
              100,
              0,
              30,
              100,
              30,
              30,
              30,
              60,
              30,
              67,
              60,
              30,
              30,
              90,
              30,
              30,
              90,
              30,
              67,
              60,
              30,
              67,
              90,
              30,
              0,
              0,
              0,
              100,
              0,
              0,
              100,
              0,
              30,
              0,
              0,
              0,
              100,
              0,
              30,
              0,
              0,
              30,
              100,
              0,
              0,
              100,
              30,
              0,
              100,
              30,
              30,
              100,
              0,
              0,
              100,
              30,
              30,
              100,
              0,
              30,
              30,
              30,
              0,
              30,
              30,
              30,
              100,
              30,
              30,
              30,
              30,
              0,
              100,
              30,
              30,
              100,
              30,
              0,
              30,
              30,
              0,
              30,
              60,
              30,
              30,
              30,
              30,
              30,
              30,
              0,
              30,
              60,
              0,
              30,
              60,
              30,
              30,
              60,
              0,
              67,
              60,
              30,
              30,
              60,
              30,
              30,
              60,
              0,
              67,
              60,
              0,
              67,
              60,
              30,
              67,
              60,
              0,
              67,
              90,
              30,
              67,
              60,
              30,
              67,
              60,
              0,
              67,
              90,
              0,
              67,
              90,
              30,
              30,
              90,
              0,
              30,
              90,
              30,
              67,
              90,
              30,
              30,
              90,
              0,
              67,
              90,
              30,
              67,
              90,
              0,
              30,
              90,
              0,
              30,
              150,
              30,
              30,
              90,
              30,
              30,
              90,
              0,
              30,
              150,
              0,
              30,
              150,
              30,
              0,
              150,
              0,
              0,
              150,
              30,
              30,
              150,
              30,
              0,
              150,
              0,
              30,
              150,
              30,
              30,
              150,
              0,
              0,
              0,
              0,
              0,
              0,
              30,
              0,
              150,
              30,
              0,
              0,
              0,
              0,
              150,
              30,
              0,
              150,
              0
            ];
            var texcoords = [
              0.22,
              0.19,
              0.22,
              0.79,
              0.34,
              0.19,
              0.22,
              0.79,
              0.34,
              0.79,
              0.34,
              0.19,
              0.34,
              0.19,
              0.34,
              0.31,
              0.62,
              0.19,
              0.34,
              0.31,
              0.62,
              0.31,
              0.62,
              0.19,
              0.34,
              0.43,
              0.34,
              0.55,
              0.49,
              0.43,
              0.34,
              0.55,
              0.49,
              0.55,
              0.49,
              0.43,
              0,
              0,
              1,
              0,
              0,
              1,
              0,
              1,
              1,
              0,
              1,
              1,
              0,
              0,
              1,
              0,
              0,
              1,
              0,
              1,
              1,
              0,
              1,
              1,
              0,
              0,
              1,
              0,
              0,
              1,
              0,
              1,
              1,
              0,
              1,
              1,
              0,
              0,
              1,
              0,
              1,
              1,
              0,
              0,
              1,
              1,
              0,
              1,
              0,
              0,
              1,
              0,
              1,
              1,
              0,
              0,
              1,
              1,
              0,
              1,
              0,
              0,
              0,
              1,
              1,
              1,
              0,
              0,
              1,
              1,
              1,
              0,
              0,
              0,
              1,
              1,
              0,
              1,
              0,
              0,
              1,
              0,
              1,
              1,
              0,
              0,
              1,
              1,
              0,
              1,
              0,
              0,
              1,
              0,
              1,
              1,
              0,
              0,
              1,
              1,
              0,
              1,
              0,
              0,
              1,
              0,
              1,
              1,
              0,
              0,
              0,
              1,
              1,
              1,
              0,
              0,
              1,
              1,
              1,
              0,
              0,
              0,
              1,
              1,
              0,
              1,
              0,
              0,
              1,
              0,
              1,
              1,
              0,
              0,
              0,
              1,
              1,
              1,
              0,
              0,
              1,
              1,
              1,
              0,
              0,
              0,
              0,
              1,
              1,
              1,
              0,
              0,
              1,
              1,
              1,
              0
            ];
            var normals = expandRLEData([
              18,
              0,
              0,
              1,
              18,
              0,
              0,
              -1,
              6,
              0,
              1,
              0,
              6,
              1,
              0,
              0,
              6,
              0,
              -1,
              0,
              6,
              1,
              0,
              0,
              6,
              0,
              1,
              0,
              6,
              1,
              0,
              0,
              6,
              0,
              -1,
              0,
              6,
              1,
              0,
              0,
              6,
              0,
              -1,
              0,
              6,
              -1,
              0,
              0
            ]);
            var colors = expandRLEData([
              18,
              200,
              70,
              120,
              18,
              80,
              70,
              200,
              6,
              70,
              200,
              210,
              6,
              200,
              200,
              70,
              6,
              210,
              100,
              70,
              6,
              210,
              160,
              70,
              6,
              70,
              180,
              210,
              6,
              100,
              70,
              210,
              6,
              76,
              210,
              100,
              6,
              140,
              210,
              80,
              6,
              90,
              130,
              110,
              6,
              160,
              160,
              220
            ], [255]);
            var numVerts = positions.length / 3;
            var arrays = {
              position: createAugmentedTypedArray(3, numVerts),
              texcoord: createAugmentedTypedArray(2, numVerts),
              normal: createAugmentedTypedArray(3, numVerts),
              color: createAugmentedTypedArray(4, numVerts, Uint8Array),
              indices: createAugmentedTypedArray(3, numVerts / 3, Uint16Array)
            };
            arrays.position.push(positions);
            arrays.texcoord.push(texcoords);
            arrays.normal.push(normals);
            arrays.color.push(colors);
            for (var ii = 0; ii < numVerts; ++ii) {
              arrays.indices.push(ii);
            }
            return arrays;
          }
          function createCrescentVertices(verticalRadius, outerRadius, innerRadius, thickness, subdivisionsDown, startOffset, endOffset) {
            if (subdivisionsDown <= 0) {
              throw new Error("subdivisionDown must be > 0");
            }
            startOffset = startOffset || 0;
            endOffset = endOffset || 1;
            var subdivisionsThick = 2;
            var offsetRange = endOffset - startOffset;
            var numVertices = (subdivisionsDown + 1) * 2 * (2 + subdivisionsThick);
            var positions = createAugmentedTypedArray(3, numVertices);
            var normals = createAugmentedTypedArray(3, numVertices);
            var texcoords = createAugmentedTypedArray(2, numVertices);
            function lerp(a, b, s) {
              return a + (b - a) * s;
            }
            function createArc(arcRadius, x2, normalMult, normalAdd, uMult, uAdd) {
              for (var z = 0; z <= subdivisionsDown; z++) {
                var uBack2 = x2 / (subdivisionsThick - 1);
                var v = z / subdivisionsDown;
                var xBack = (uBack2 - 0.5) * 2;
                var angle = (startOffset + v * offsetRange) * Math.PI;
                var s = Math.sin(angle);
                var c = Math.cos(angle);
                var radius = lerp(verticalRadius, arcRadius, s);
                var px = xBack * thickness;
                var py = c * verticalRadius;
                var pz = s * radius;
                positions.push(px, py, pz);
                var n = v3.add(v3.multiply([0, s, c], normalMult), normalAdd);
                normals.push(n);
                texcoords.push(uBack2 * uMult + uAdd, v);
              }
            }
            for (var x = 0; x < subdivisionsThick; x++) {
              var uBack = (x / (subdivisionsThick - 1) - 0.5) * 2;
              createArc(outerRadius, x, [1, 1, 1], [0, 0, 0], 1, 0);
              createArc(outerRadius, x, [0, 0, 0], [uBack, 0, 0], 0, 0);
              createArc(innerRadius, x, [1, 1, 1], [0, 0, 0], 1, 0);
              createArc(innerRadius, x, [0, 0, 0], [uBack, 0, 0], 0, 1);
            }
            var indices = createAugmentedTypedArray(3, subdivisionsDown * 2 * (2 + subdivisionsThick), Uint16Array);
            function createSurface(leftArcOffset, rightArcOffset) {
              for (var z = 0; z < subdivisionsDown; ++z) {
                indices.push(leftArcOffset + z + 0, leftArcOffset + z + 1, rightArcOffset + z + 0);
                indices.push(leftArcOffset + z + 1, rightArcOffset + z + 1, rightArcOffset + z + 0);
              }
            }
            var numVerticesDown = subdivisionsDown + 1;
            createSurface(numVerticesDown * 0, numVerticesDown * 4);
            createSurface(numVerticesDown * 5, numVerticesDown * 7);
            createSurface(numVerticesDown * 6, numVerticesDown * 2);
            createSurface(numVerticesDown * 3, numVerticesDown * 1);
            return {
              position: positions,
              normal: normals,
              texcoord: texcoords,
              indices
            };
          }
          function createCylinderVertices(radius, height, radialSubdivisions, verticalSubdivisions, topCap, bottomCap) {
            return createTruncatedConeVertices(radius, radius, height, radialSubdivisions, verticalSubdivisions, topCap, bottomCap);
          }
          function createTorusVertices(radius, thickness, radialSubdivisions, bodySubdivisions, startAngle, endAngle) {
            if (radialSubdivisions < 3) {
              throw new Error("radialSubdivisions must be 3 or greater");
            }
            if (bodySubdivisions < 3) {
              throw new Error("verticalSubdivisions must be 3 or greater");
            }
            startAngle = startAngle || 0;
            endAngle = endAngle || Math.PI * 2;
            var range = endAngle - startAngle;
            var radialParts = radialSubdivisions + 1;
            var bodyParts = bodySubdivisions + 1;
            var numVertices = radialParts * bodyParts;
            var positions = createAugmentedTypedArray(3, numVertices);
            var normals = createAugmentedTypedArray(3, numVertices);
            var texcoords = createAugmentedTypedArray(2, numVertices);
            var indices = createAugmentedTypedArray(3, radialSubdivisions * bodySubdivisions * 2, Uint16Array);
            for (var slice = 0; slice < bodyParts; ++slice) {
              var v = slice / bodySubdivisions;
              var sliceAngle = v * Math.PI * 2;
              var sliceSin = Math.sin(sliceAngle);
              var ringRadius = radius + sliceSin * thickness;
              var ny = Math.cos(sliceAngle);
              var y = ny * thickness;
              for (var ring = 0; ring < radialParts; ++ring) {
                var u = ring / radialSubdivisions;
                var ringAngle = startAngle + u * range;
                var xSin = Math.sin(ringAngle);
                var zCos = Math.cos(ringAngle);
                var x = xSin * ringRadius;
                var z = zCos * ringRadius;
                var nx = xSin * sliceSin;
                var nz = zCos * sliceSin;
                positions.push(x, y, z);
                normals.push(nx, ny, nz);
                texcoords.push(u, 1 - v);
              }
            }
            for (var _slice = 0; _slice < bodySubdivisions; ++_slice) {
              for (var _ring = 0; _ring < radialSubdivisions; ++_ring) {
                var nextRingIndex = 1 + _ring;
                var nextSliceIndex = 1 + _slice;
                indices.push(radialParts * _slice + _ring, radialParts * nextSliceIndex + _ring, radialParts * _slice + nextRingIndex);
                indices.push(radialParts * nextSliceIndex + _ring, radialParts * nextSliceIndex + nextRingIndex, radialParts * _slice + nextRingIndex);
              }
            }
            return {
              position: positions,
              normal: normals,
              texcoord: texcoords,
              indices
            };
          }
          function createDiscVertices(radius, divisions, stacks, innerRadius, stackPower) {
            if (divisions < 3) {
              throw new Error("divisions must be at least 3");
            }
            stacks = stacks ? stacks : 1;
            stackPower = stackPower ? stackPower : 1;
            innerRadius = innerRadius ? innerRadius : 0;
            var numVertices = (divisions + 1) * (stacks + 1);
            var positions = createAugmentedTypedArray(3, numVertices);
            var normals = createAugmentedTypedArray(3, numVertices);
            var texcoords = createAugmentedTypedArray(2, numVertices);
            var indices = createAugmentedTypedArray(3, stacks * divisions * 2, Uint16Array);
            var firstIndex = 0;
            var radiusSpan = radius - innerRadius;
            var pointsPerStack = divisions + 1;
            for (var stack = 0; stack <= stacks; ++stack) {
              var stackRadius = innerRadius + radiusSpan * Math.pow(stack / stacks, stackPower);
              for (var i = 0; i <= divisions; ++i) {
                var theta = 2 * Math.PI * i / divisions;
                var x = stackRadius * Math.cos(theta);
                var z = stackRadius * Math.sin(theta);
                positions.push(x, 0, z);
                normals.push(0, 1, 0);
                texcoords.push(1 - i / divisions, stack / stacks);
                if (stack > 0 && i !== divisions) {
                  var a = firstIndex + (i + 1);
                  var b = firstIndex + i;
                  var c = firstIndex + i - pointsPerStack;
                  var d = firstIndex + (i + 1) - pointsPerStack;
                  indices.push(a, b, c);
                  indices.push(a, c, d);
                }
              }
              firstIndex += divisions + 1;
            }
            return {
              position: positions,
              normal: normals,
              texcoord: texcoords,
              indices
            };
          }
          function randInt(range) {
            return Math.random() * range | 0;
          }
          function makeRandomVertexColors(vertices, options) {
            options = options || {};
            var numElements = vertices.position.numElements;
            var vColors = createAugmentedTypedArray(4, numElements, Uint8Array);
            var rand = options.rand || function(ndx, channel) {
              return channel < 3 ? randInt(256) : 255;
            };
            vertices.color = vColors;
            if (vertices.indices) {
              for (var ii = 0; ii < numElements; ++ii) {
                vColors.push(rand(ii, 0), rand(ii, 1), rand(ii, 2), rand(ii, 3));
              }
            } else {
              var numVertsPerColor = options.vertsPerColor || 3;
              var numSets = numElements / numVertsPerColor;
              for (var _ii2 = 0; _ii2 < numSets; ++_ii2) {
                var color = [rand(_ii2, 0), rand(_ii2, 1), rand(_ii2, 2), rand(_ii2, 3)];
                for (var jj = 0; jj < numVertsPerColor; ++jj) {
                  vColors.push(color);
                }
              }
            }
            return vertices;
          }
          function createBufferFunc(fn) {
            return function(gl2) {
              var arrays = fn.apply(this, Array.prototype.slice.call(arguments, 1));
              return attributes.createBuffersFromArrays(gl2, arrays);
            };
          }
          function createBufferInfoFunc(fn) {
            return function(gl2) {
              var arrays = fn.apply(null, Array.prototype.slice.call(arguments, 1));
              return attributes.createBufferInfoFromArrays(gl2, arrays);
            };
          }
          var arraySpecPropertyNames = ["numComponents", "size", "type", "normalize", "stride", "offset", "attrib", "name", "attribName"];
          function copyElements(src, dst, dstNdx, offset) {
            offset = offset || 0;
            var length2 = src.length;
            for (var ii = 0; ii < length2; ++ii) {
              dst[dstNdx + ii] = src[ii] + offset;
            }
          }
          function createArrayOfSameType(srcArray, length2) {
            var arraySrc = getArray(srcArray);
            var newArray = new arraySrc.constructor(length2);
            var newArraySpec = newArray;
            if (arraySrc.numComponents && arraySrc.numElements) {
              augmentTypedArray(newArray, arraySrc.numComponents);
            }
            if (srcArray.data) {
              newArraySpec = {
                data: newArray
              };
              helper.copyNamedProperties(arraySpecPropertyNames, srcArray, newArraySpec);
            }
            return newArraySpec;
          }
          function concatVertices(arrayOfArrays) {
            var names = {};
            var baseName;
            var _loop = function _loop2(ii2) {
              var arrays = arrayOfArrays[ii2];
              Object.keys(arrays).forEach(function(name) {
                if (!names[name]) {
                  names[name] = [];
                }
                if (!baseName && name !== "indices") {
                  baseName = name;
                }
                var arrayInfo = arrays[name];
                var numComponents = getNumComponents(arrayInfo, name);
                var array = getArray(arrayInfo);
                var numElements = array.length / numComponents;
                names[name].push(numElements);
              });
            };
            for (var ii = 0; ii < arrayOfArrays.length; ++ii) {
              _loop(ii);
            }
            function getLengthOfCombinedArrays(name) {
              var length2 = 0;
              var arraySpec;
              for (var _ii3 = 0; _ii3 < arrayOfArrays.length; ++_ii3) {
                var arrays = arrayOfArrays[_ii3];
                var arrayInfo = arrays[name];
                var array = getArray(arrayInfo);
                length2 += array.length;
                if (!arraySpec || arrayInfo.data) {
                  arraySpec = arrayInfo;
                }
              }
              return {
                length: length2,
                spec: arraySpec
              };
            }
            function copyArraysToNewArray(name, base2, newArray) {
              var baseIndex = 0;
              var offset = 0;
              for (var _ii4 = 0; _ii4 < arrayOfArrays.length; ++_ii4) {
                var arrays = arrayOfArrays[_ii4];
                var arrayInfo = arrays[name];
                var array = getArray(arrayInfo);
                if (name === "indices") {
                  copyElements(array, newArray, offset, baseIndex);
                  baseIndex += base2[_ii4];
                } else {
                  copyElements(array, newArray, offset);
                }
                offset += array.length;
              }
            }
            var base = names[baseName];
            var newArrays = {};
            Object.keys(names).forEach(function(name) {
              var info = getLengthOfCombinedArrays(name);
              var newArraySpec = createArrayOfSameType(info.spec, info.length);
              copyArraysToNewArray(name, base, getArray(newArraySpec));
              newArrays[name] = newArraySpec;
            });
            return newArrays;
          }
          function duplicateVertices(arrays) {
            var newArrays = {};
            Object.keys(arrays).forEach(function(name) {
              var arraySpec = arrays[name];
              var srcArray = getArray(arraySpec);
              var newArraySpec = createArrayOfSameType(arraySpec, srcArray.length);
              copyElements(srcArray, getArray(newArraySpec), 0);
              newArrays[name] = newArraySpec;
            });
            return newArrays;
          }
          var create3DFBufferInfo = createBufferInfoFunc(create3DFVertices);
          exports2.create3DFBufferInfo = create3DFBufferInfo;
          var create3DFBuffers = createBufferFunc(create3DFVertices);
          exports2.create3DFBuffers = create3DFBuffers;
          var createCubeBufferInfo = createBufferInfoFunc(createCubeVertices);
          exports2.createCubeBufferInfo = createCubeBufferInfo;
          var createCubeBuffers = createBufferFunc(createCubeVertices);
          exports2.createCubeBuffers = createCubeBuffers;
          var createPlaneBufferInfo = createBufferInfoFunc(createPlaneVertices);
          exports2.createPlaneBufferInfo = createPlaneBufferInfo;
          var createPlaneBuffers = createBufferFunc(createPlaneVertices);
          exports2.createPlaneBuffers = createPlaneBuffers;
          var createSphereBufferInfo = createBufferInfoFunc(createSphereVertices);
          exports2.createSphereBufferInfo = createSphereBufferInfo;
          var createSphereBuffers = createBufferFunc(createSphereVertices);
          exports2.createSphereBuffers = createSphereBuffers;
          var createTruncatedConeBufferInfo = createBufferInfoFunc(createTruncatedConeVertices);
          exports2.createTruncatedConeBufferInfo = createTruncatedConeBufferInfo;
          var createTruncatedConeBuffers = createBufferFunc(createTruncatedConeVertices);
          exports2.createTruncatedConeBuffers = createTruncatedConeBuffers;
          var createXYQuadBufferInfo = createBufferInfoFunc(createXYQuadVertices);
          exports2.createXYQuadBufferInfo = createXYQuadBufferInfo;
          var createXYQuadBuffers = createBufferFunc(createXYQuadVertices);
          exports2.createXYQuadBuffers = createXYQuadBuffers;
          var createCrescentBufferInfo = createBufferInfoFunc(createCrescentVertices);
          exports2.createCrescentBufferInfo = createCrescentBufferInfo;
          var createCrescentBuffers = createBufferFunc(createCrescentVertices);
          exports2.createCrescentBuffers = createCrescentBuffers;
          var createCylinderBufferInfo = createBufferInfoFunc(createCylinderVertices);
          exports2.createCylinderBufferInfo = createCylinderBufferInfo;
          var createCylinderBuffers = createBufferFunc(createCylinderVertices);
          exports2.createCylinderBuffers = createCylinderBuffers;
          var createTorusBufferInfo = createBufferInfoFunc(createTorusVertices);
          exports2.createTorusBufferInfo = createTorusBufferInfo;
          var createTorusBuffers = createBufferFunc(createTorusVertices);
          exports2.createTorusBuffers = createTorusBuffers;
          var createDiscBufferInfo = createBufferInfoFunc(createDiscVertices);
          exports2.createDiscBufferInfo = createDiscBufferInfo;
          var createDiscBuffers = createBufferFunc(createDiscVertices);
          exports2.createDiscBuffers = createDiscBuffers;
          var createCresentBufferInfo = createCrescentBufferInfo;
          exports2.createCresentBufferInfo = createCresentBufferInfo;
          var createCresentBuffers = createCrescentBuffers;
          exports2.createCresentBuffers = createCresentBuffers;
          var createCresentVertices = createCrescentVertices;
          exports2.createCresentVertices = createCresentVertices;
        },
        "./src/programs.js": function(module2, exports2, __webpack_require__) {
          "use strict";
          function _typeof(obj) {
            "@babel/helpers - typeof";
            if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
              _typeof = function _typeof2(obj2) {
                return typeof obj2;
              };
            } else {
              _typeof = function _typeof2(obj2) {
                return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
              };
            }
            return _typeof(obj);
          }
          exports2.__esModule = true;
          exports2.createAttributeSetters = createAttributeSetters;
          exports2.createProgram = createProgram;
          exports2.createProgramFromScripts = createProgramFromScripts;
          exports2.createProgramFromSources = createProgramFromSources;
          exports2.createProgramInfo = createProgramInfo;
          exports2.createProgramInfoFromProgram = createProgramInfoFromProgram;
          exports2.createUniformSetters = createUniformSetters;
          exports2.createUniformBlockSpecFromProgram = createUniformBlockSpecFromProgram;
          exports2.createUniformBlockInfoFromProgram = createUniformBlockInfoFromProgram;
          exports2.createUniformBlockInfo = createUniformBlockInfo;
          exports2.createTransformFeedback = createTransformFeedback;
          exports2.createTransformFeedbackInfo = createTransformFeedbackInfo;
          exports2.bindTransformFeedbackInfo = bindTransformFeedbackInfo;
          exports2.setAttributes = setAttributes;
          exports2.setBuffersAndAttributes = setBuffersAndAttributes;
          exports2.setUniforms = setUniforms;
          exports2.setUniformBlock = setUniformBlock;
          exports2.setBlockUniforms = setBlockUniforms;
          exports2.bindUniformBlock = bindUniformBlock;
          exports2.setUniformsAndBindTextures = void 0;
          var utils = _interopRequireWildcard(__webpack_require__("./src/utils.js"));
          var helper = _interopRequireWildcard(__webpack_require__("./src/helper.js"));
          function _getRequireWildcardCache() {
            if (typeof WeakMap !== "function")
              return null;
            var cache = new WeakMap();
            _getRequireWildcardCache = function _getRequireWildcardCache2() {
              return cache;
            };
            return cache;
          }
          function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
              return obj;
            }
            if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
              return {default: obj};
            }
            var cache = _getRequireWildcardCache();
            if (cache && cache.has(obj)) {
              return cache.get(obj);
            }
            var newObj = {};
            var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) {
                var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                if (desc && (desc.get || desc.set)) {
                  Object.defineProperty(newObj, key, desc);
                } else {
                  newObj[key] = obj[key];
                }
              }
            }
            newObj["default"] = obj;
            if (cache) {
              cache.set(obj, newObj);
            }
            return newObj;
          }
          function _toConsumableArray(arr) {
            return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
          }
          function _nonIterableSpread() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }
          function _unsupportedIterableToArray(o, minLen) {
            if (!o)
              return;
            if (typeof o === "string")
              return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === "Object" && o.constructor)
              n = o.constructor.name;
            if (n === "Map" || n === "Set")
              return Array.from(o);
            if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
              return _arrayLikeToArray(o, minLen);
          }
          function _iterableToArray(iter) {
            if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
              return Array.from(iter);
          }
          function _arrayWithoutHoles(arr) {
            if (Array.isArray(arr))
              return _arrayLikeToArray(arr);
          }
          function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length)
              len = arr.length;
            for (var i = 0, arr2 = new Array(len); i < len; i++) {
              arr2[i] = arr[i];
            }
            return arr2;
          }
          var error = helper.error;
          var warn = helper.warn;
          function getElementById(id) {
            return typeof document !== "undefined" && document.getElementById ? document.getElementById(id) : null;
          }
          var TEXTURE0 = 33984;
          var DYNAMIC_DRAW = 35048;
          var ARRAY_BUFFER = 34962;
          var ELEMENT_ARRAY_BUFFER = 34963;
          var UNIFORM_BUFFER = 35345;
          var TRANSFORM_FEEDBACK_BUFFER = 35982;
          var TRANSFORM_FEEDBACK = 36386;
          var COMPILE_STATUS = 35713;
          var LINK_STATUS = 35714;
          var FRAGMENT_SHADER = 35632;
          var VERTEX_SHADER = 35633;
          var SEPARATE_ATTRIBS = 35981;
          var ACTIVE_UNIFORMS = 35718;
          var ACTIVE_ATTRIBUTES = 35721;
          var TRANSFORM_FEEDBACK_VARYINGS = 35971;
          var ACTIVE_UNIFORM_BLOCKS = 35382;
          var UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER = 35396;
          var UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER = 35398;
          var UNIFORM_BLOCK_DATA_SIZE = 35392;
          var UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES = 35395;
          var FLOAT = 5126;
          var FLOAT_VEC2 = 35664;
          var FLOAT_VEC3 = 35665;
          var FLOAT_VEC4 = 35666;
          var INT = 5124;
          var INT_VEC2 = 35667;
          var INT_VEC3 = 35668;
          var INT_VEC4 = 35669;
          var BOOL = 35670;
          var BOOL_VEC2 = 35671;
          var BOOL_VEC3 = 35672;
          var BOOL_VEC4 = 35673;
          var FLOAT_MAT2 = 35674;
          var FLOAT_MAT3 = 35675;
          var FLOAT_MAT4 = 35676;
          var SAMPLER_2D = 35678;
          var SAMPLER_CUBE = 35680;
          var SAMPLER_3D = 35679;
          var SAMPLER_2D_SHADOW = 35682;
          var FLOAT_MAT2x3 = 35685;
          var FLOAT_MAT2x4 = 35686;
          var FLOAT_MAT3x2 = 35687;
          var FLOAT_MAT3x4 = 35688;
          var FLOAT_MAT4x2 = 35689;
          var FLOAT_MAT4x3 = 35690;
          var SAMPLER_2D_ARRAY = 36289;
          var SAMPLER_2D_ARRAY_SHADOW = 36292;
          var SAMPLER_CUBE_SHADOW = 36293;
          var UNSIGNED_INT = 5125;
          var UNSIGNED_INT_VEC2 = 36294;
          var UNSIGNED_INT_VEC3 = 36295;
          var UNSIGNED_INT_VEC4 = 36296;
          var INT_SAMPLER_2D = 36298;
          var INT_SAMPLER_3D = 36299;
          var INT_SAMPLER_CUBE = 36300;
          var INT_SAMPLER_2D_ARRAY = 36303;
          var UNSIGNED_INT_SAMPLER_2D = 36306;
          var UNSIGNED_INT_SAMPLER_3D = 36307;
          var UNSIGNED_INT_SAMPLER_CUBE = 36308;
          var UNSIGNED_INT_SAMPLER_2D_ARRAY = 36311;
          var TEXTURE_2D = 3553;
          var TEXTURE_CUBE_MAP = 34067;
          var TEXTURE_3D = 32879;
          var TEXTURE_2D_ARRAY = 35866;
          var typeMap = {};
          function getBindPointForSamplerType(gl3, type) {
            return typeMap[type].bindPoint;
          }
          function floatSetter(gl3, location2) {
            return function(v) {
              gl3.uniform1f(location2, v);
            };
          }
          function floatArraySetter(gl3, location2) {
            return function(v) {
              gl3.uniform1fv(location2, v);
            };
          }
          function floatVec2Setter(gl3, location2) {
            return function(v) {
              gl3.uniform2fv(location2, v);
            };
          }
          function floatVec3Setter(gl3, location2) {
            return function(v) {
              gl3.uniform3fv(location2, v);
            };
          }
          function floatVec4Setter(gl3, location2) {
            return function(v) {
              gl3.uniform4fv(location2, v);
            };
          }
          function intSetter(gl3, location2) {
            return function(v) {
              gl3.uniform1i(location2, v);
            };
          }
          function intArraySetter(gl3, location2) {
            return function(v) {
              gl3.uniform1iv(location2, v);
            };
          }
          function intVec2Setter(gl3, location2) {
            return function(v) {
              gl3.uniform2iv(location2, v);
            };
          }
          function intVec3Setter(gl3, location2) {
            return function(v) {
              gl3.uniform3iv(location2, v);
            };
          }
          function intVec4Setter(gl3, location2) {
            return function(v) {
              gl3.uniform4iv(location2, v);
            };
          }
          function uintSetter(gl3, location2) {
            return function(v) {
              gl3.uniform1ui(location2, v);
            };
          }
          function uintArraySetter(gl3, location2) {
            return function(v) {
              gl3.uniform1uiv(location2, v);
            };
          }
          function uintVec2Setter(gl3, location2) {
            return function(v) {
              gl3.uniform2uiv(location2, v);
            };
          }
          function uintVec3Setter(gl3, location2) {
            return function(v) {
              gl3.uniform3uiv(location2, v);
            };
          }
          function uintVec4Setter(gl3, location2) {
            return function(v) {
              gl3.uniform4uiv(location2, v);
            };
          }
          function floatMat2Setter(gl3, location2) {
            return function(v) {
              gl3.uniformMatrix2fv(location2, false, v);
            };
          }
          function floatMat3Setter(gl3, location2) {
            return function(v) {
              gl3.uniformMatrix3fv(location2, false, v);
            };
          }
          function floatMat4Setter(gl3, location2) {
            return function(v) {
              gl3.uniformMatrix4fv(location2, false, v);
            };
          }
          function floatMat23Setter(gl3, location2) {
            return function(v) {
              gl3.uniformMatrix2x3fv(location2, false, v);
            };
          }
          function floatMat32Setter(gl3, location2) {
            return function(v) {
              gl3.uniformMatrix3x2fv(location2, false, v);
            };
          }
          function floatMat24Setter(gl3, location2) {
            return function(v) {
              gl3.uniformMatrix2x4fv(location2, false, v);
            };
          }
          function floatMat42Setter(gl3, location2) {
            return function(v) {
              gl3.uniformMatrix4x2fv(location2, false, v);
            };
          }
          function floatMat34Setter(gl3, location2) {
            return function(v) {
              gl3.uniformMatrix3x4fv(location2, false, v);
            };
          }
          function floatMat43Setter(gl3, location2) {
            return function(v) {
              gl3.uniformMatrix4x3fv(location2, false, v);
            };
          }
          function samplerSetter(gl3, type, unit, location2) {
            var bindPoint = getBindPointForSamplerType(gl3, type);
            return utils.isWebGL2(gl3) ? function(textureOrPair) {
              var texture;
              var sampler;
              if (helper.isTexture(gl3, textureOrPair)) {
                texture = textureOrPair;
                sampler = null;
              } else {
                texture = textureOrPair.texture;
                sampler = textureOrPair.sampler;
              }
              gl3.uniform1i(location2, unit);
              gl3.activeTexture(TEXTURE0 + unit);
              gl3.bindTexture(bindPoint, texture);
              gl3.bindSampler(unit, sampler);
            } : function(texture) {
              gl3.uniform1i(location2, unit);
              gl3.activeTexture(TEXTURE0 + unit);
              gl3.bindTexture(bindPoint, texture);
            };
          }
          function samplerArraySetter(gl3, type, unit, location2, size) {
            var bindPoint = getBindPointForSamplerType(gl3, type);
            var units = new Int32Array(size);
            for (var ii = 0; ii < size; ++ii) {
              units[ii] = unit + ii;
            }
            return utils.isWebGL2(gl3) ? function(textures) {
              gl3.uniform1iv(location2, units);
              textures.forEach(function(textureOrPair, index) {
                gl3.activeTexture(TEXTURE0 + units[index]);
                var texture;
                var sampler;
                if (helper.isTexture(gl3, textureOrPair)) {
                  texture = textureOrPair;
                  sampler = null;
                } else {
                  texture = textureOrPair.texture;
                  sampler = textureOrPair.sampler;
                }
                gl3.bindSampler(unit, sampler);
                gl3.bindTexture(bindPoint, texture);
              });
            } : function(textures) {
              gl3.uniform1iv(location2, units);
              textures.forEach(function(texture, index) {
                gl3.activeTexture(TEXTURE0 + units[index]);
                gl3.bindTexture(bindPoint, texture);
              });
            };
          }
          typeMap[FLOAT] = {
            Type: Float32Array,
            size: 4,
            setter: floatSetter,
            arraySetter: floatArraySetter
          };
          typeMap[FLOAT_VEC2] = {
            Type: Float32Array,
            size: 8,
            setter: floatVec2Setter,
            cols: 2
          };
          typeMap[FLOAT_VEC3] = {
            Type: Float32Array,
            size: 12,
            setter: floatVec3Setter,
            cols: 3
          };
          typeMap[FLOAT_VEC4] = {
            Type: Float32Array,
            size: 16,
            setter: floatVec4Setter,
            cols: 4
          };
          typeMap[INT] = {
            Type: Int32Array,
            size: 4,
            setter: intSetter,
            arraySetter: intArraySetter
          };
          typeMap[INT_VEC2] = {
            Type: Int32Array,
            size: 8,
            setter: intVec2Setter,
            cols: 2
          };
          typeMap[INT_VEC3] = {
            Type: Int32Array,
            size: 12,
            setter: intVec3Setter,
            cols: 3
          };
          typeMap[INT_VEC4] = {
            Type: Int32Array,
            size: 16,
            setter: intVec4Setter,
            cols: 4
          };
          typeMap[UNSIGNED_INT] = {
            Type: Uint32Array,
            size: 4,
            setter: uintSetter,
            arraySetter: uintArraySetter
          };
          typeMap[UNSIGNED_INT_VEC2] = {
            Type: Uint32Array,
            size: 8,
            setter: uintVec2Setter,
            cols: 2
          };
          typeMap[UNSIGNED_INT_VEC3] = {
            Type: Uint32Array,
            size: 12,
            setter: uintVec3Setter,
            cols: 3
          };
          typeMap[UNSIGNED_INT_VEC4] = {
            Type: Uint32Array,
            size: 16,
            setter: uintVec4Setter,
            cols: 4
          };
          typeMap[BOOL] = {
            Type: Uint32Array,
            size: 4,
            setter: intSetter,
            arraySetter: intArraySetter
          };
          typeMap[BOOL_VEC2] = {
            Type: Uint32Array,
            size: 8,
            setter: intVec2Setter,
            cols: 2
          };
          typeMap[BOOL_VEC3] = {
            Type: Uint32Array,
            size: 12,
            setter: intVec3Setter,
            cols: 3
          };
          typeMap[BOOL_VEC4] = {
            Type: Uint32Array,
            size: 16,
            setter: intVec4Setter,
            cols: 4
          };
          typeMap[FLOAT_MAT2] = {
            Type: Float32Array,
            size: 32,
            setter: floatMat2Setter,
            rows: 2,
            cols: 2
          };
          typeMap[FLOAT_MAT3] = {
            Type: Float32Array,
            size: 48,
            setter: floatMat3Setter,
            rows: 3,
            cols: 3
          };
          typeMap[FLOAT_MAT4] = {
            Type: Float32Array,
            size: 64,
            setter: floatMat4Setter,
            rows: 4,
            cols: 4
          };
          typeMap[FLOAT_MAT2x3] = {
            Type: Float32Array,
            size: 32,
            setter: floatMat23Setter,
            rows: 2,
            cols: 3
          };
          typeMap[FLOAT_MAT2x4] = {
            Type: Float32Array,
            size: 32,
            setter: floatMat24Setter,
            rows: 2,
            cols: 4
          };
          typeMap[FLOAT_MAT3x2] = {
            Type: Float32Array,
            size: 48,
            setter: floatMat32Setter,
            rows: 3,
            cols: 2
          };
          typeMap[FLOAT_MAT3x4] = {
            Type: Float32Array,
            size: 48,
            setter: floatMat34Setter,
            rows: 3,
            cols: 4
          };
          typeMap[FLOAT_MAT4x2] = {
            Type: Float32Array,
            size: 64,
            setter: floatMat42Setter,
            rows: 4,
            cols: 2
          };
          typeMap[FLOAT_MAT4x3] = {
            Type: Float32Array,
            size: 64,
            setter: floatMat43Setter,
            rows: 4,
            cols: 3
          };
          typeMap[SAMPLER_2D] = {
            Type: null,
            size: 0,
            setter: samplerSetter,
            arraySetter: samplerArraySetter,
            bindPoint: TEXTURE_2D
          };
          typeMap[SAMPLER_CUBE] = {
            Type: null,
            size: 0,
            setter: samplerSetter,
            arraySetter: samplerArraySetter,
            bindPoint: TEXTURE_CUBE_MAP
          };
          typeMap[SAMPLER_3D] = {
            Type: null,
            size: 0,
            setter: samplerSetter,
            arraySetter: samplerArraySetter,
            bindPoint: TEXTURE_3D
          };
          typeMap[SAMPLER_2D_SHADOW] = {
            Type: null,
            size: 0,
            setter: samplerSetter,
            arraySetter: samplerArraySetter,
            bindPoint: TEXTURE_2D
          };
          typeMap[SAMPLER_2D_ARRAY] = {
            Type: null,
            size: 0,
            setter: samplerSetter,
            arraySetter: samplerArraySetter,
            bindPoint: TEXTURE_2D_ARRAY
          };
          typeMap[SAMPLER_2D_ARRAY_SHADOW] = {
            Type: null,
            size: 0,
            setter: samplerSetter,
            arraySetter: samplerArraySetter,
            bindPoint: TEXTURE_2D_ARRAY
          };
          typeMap[SAMPLER_CUBE_SHADOW] = {
            Type: null,
            size: 0,
            setter: samplerSetter,
            arraySetter: samplerArraySetter,
            bindPoint: TEXTURE_CUBE_MAP
          };
          typeMap[INT_SAMPLER_2D] = {
            Type: null,
            size: 0,
            setter: samplerSetter,
            arraySetter: samplerArraySetter,
            bindPoint: TEXTURE_2D
          };
          typeMap[INT_SAMPLER_3D] = {
            Type: null,
            size: 0,
            setter: samplerSetter,
            arraySetter: samplerArraySetter,
            bindPoint: TEXTURE_3D
          };
          typeMap[INT_SAMPLER_CUBE] = {
            Type: null,
            size: 0,
            setter: samplerSetter,
            arraySetter: samplerArraySetter,
            bindPoint: TEXTURE_CUBE_MAP
          };
          typeMap[INT_SAMPLER_2D_ARRAY] = {
            Type: null,
            size: 0,
            setter: samplerSetter,
            arraySetter: samplerArraySetter,
            bindPoint: TEXTURE_2D_ARRAY
          };
          typeMap[UNSIGNED_INT_SAMPLER_2D] = {
            Type: null,
            size: 0,
            setter: samplerSetter,
            arraySetter: samplerArraySetter,
            bindPoint: TEXTURE_2D
          };
          typeMap[UNSIGNED_INT_SAMPLER_3D] = {
            Type: null,
            size: 0,
            setter: samplerSetter,
            arraySetter: samplerArraySetter,
            bindPoint: TEXTURE_3D
          };
          typeMap[UNSIGNED_INT_SAMPLER_CUBE] = {
            Type: null,
            size: 0,
            setter: samplerSetter,
            arraySetter: samplerArraySetter,
            bindPoint: TEXTURE_CUBE_MAP
          };
          typeMap[UNSIGNED_INT_SAMPLER_2D_ARRAY] = {
            Type: null,
            size: 0,
            setter: samplerSetter,
            arraySetter: samplerArraySetter,
            bindPoint: TEXTURE_2D_ARRAY
          };
          function floatAttribSetter(gl3, index) {
            return function(b) {
              if (b.value) {
                gl3.disableVertexAttribArray(index);
                switch (b.value.length) {
                  case 4:
                    gl3.vertexAttrib4fv(index, b.value);
                    break;
                  case 3:
                    gl3.vertexAttrib3fv(index, b.value);
                    break;
                  case 2:
                    gl3.vertexAttrib2fv(index, b.value);
                    break;
                  case 1:
                    gl3.vertexAttrib1fv(index, b.value);
                    break;
                  default:
                    throw new Error("the length of a float constant value must be between 1 and 4!");
                }
              } else {
                gl3.bindBuffer(ARRAY_BUFFER, b.buffer);
                gl3.enableVertexAttribArray(index);
                gl3.vertexAttribPointer(index, b.numComponents || b.size, b.type || FLOAT, b.normalize || false, b.stride || 0, b.offset || 0);
                if (b.divisor !== void 0) {
                  gl3.vertexAttribDivisor(index, b.divisor);
                }
              }
            };
          }
          function intAttribSetter(gl3, index) {
            return function(b) {
              if (b.value) {
                gl3.disableVertexAttribArray(index);
                if (b.value.length === 4) {
                  gl3.vertexAttrib4iv(index, b.value);
                } else {
                  throw new Error("The length of an integer constant value must be 4!");
                }
              } else {
                gl3.bindBuffer(ARRAY_BUFFER, b.buffer);
                gl3.enableVertexAttribArray(index);
                gl3.vertexAttribIPointer(index, b.numComponents || b.size, b.type || INT, b.stride || 0, b.offset || 0);
                if (b.divisor !== void 0) {
                  gl3.vertexAttribDivisor(index, b.divisor);
                }
              }
            };
          }
          function uintAttribSetter(gl3, index) {
            return function(b) {
              if (b.value) {
                gl3.disableVertexAttribArray(index);
                if (b.value.length === 4) {
                  gl3.vertexAttrib4uiv(index, b.value);
                } else {
                  throw new Error("The length of an unsigned integer constant value must be 4!");
                }
              } else {
                gl3.bindBuffer(ARRAY_BUFFER, b.buffer);
                gl3.enableVertexAttribArray(index);
                gl3.vertexAttribIPointer(index, b.numComponents || b.size, b.type || UNSIGNED_INT, b.stride || 0, b.offset || 0);
                if (b.divisor !== void 0) {
                  gl3.vertexAttribDivisor(index, b.divisor);
                }
              }
            };
          }
          function matAttribSetter(gl3, index, typeInfo) {
            var defaultSize = typeInfo.size;
            var count = typeInfo.count;
            return function(b) {
              gl3.bindBuffer(ARRAY_BUFFER, b.buffer);
              var numComponents = b.size || b.numComponents || defaultSize;
              var size = numComponents / count;
              var type = b.type || FLOAT;
              var typeInfo2 = typeMap[type];
              var stride = typeInfo2.size * numComponents;
              var normalize = b.normalize || false;
              var offset = b.offset || 0;
              var rowOffset = stride / count;
              for (var i = 0; i < count; ++i) {
                gl3.enableVertexAttribArray(index + i);
                gl3.vertexAttribPointer(index + i, size, type, normalize, stride, offset + rowOffset * i);
                if (b.divisor !== void 0) {
                  gl3.vertexAttribDivisor(index + i, b.divisor);
                }
              }
            };
          }
          var attrTypeMap = {};
          attrTypeMap[FLOAT] = {
            size: 4,
            setter: floatAttribSetter
          };
          attrTypeMap[FLOAT_VEC2] = {
            size: 8,
            setter: floatAttribSetter
          };
          attrTypeMap[FLOAT_VEC3] = {
            size: 12,
            setter: floatAttribSetter
          };
          attrTypeMap[FLOAT_VEC4] = {
            size: 16,
            setter: floatAttribSetter
          };
          attrTypeMap[INT] = {
            size: 4,
            setter: intAttribSetter
          };
          attrTypeMap[INT_VEC2] = {
            size: 8,
            setter: intAttribSetter
          };
          attrTypeMap[INT_VEC3] = {
            size: 12,
            setter: intAttribSetter
          };
          attrTypeMap[INT_VEC4] = {
            size: 16,
            setter: intAttribSetter
          };
          attrTypeMap[UNSIGNED_INT] = {
            size: 4,
            setter: uintAttribSetter
          };
          attrTypeMap[UNSIGNED_INT_VEC2] = {
            size: 8,
            setter: uintAttribSetter
          };
          attrTypeMap[UNSIGNED_INT_VEC3] = {
            size: 12,
            setter: uintAttribSetter
          };
          attrTypeMap[UNSIGNED_INT_VEC4] = {
            size: 16,
            setter: uintAttribSetter
          };
          attrTypeMap[BOOL] = {
            size: 4,
            setter: intAttribSetter
          };
          attrTypeMap[BOOL_VEC2] = {
            size: 8,
            setter: intAttribSetter
          };
          attrTypeMap[BOOL_VEC3] = {
            size: 12,
            setter: intAttribSetter
          };
          attrTypeMap[BOOL_VEC4] = {
            size: 16,
            setter: intAttribSetter
          };
          attrTypeMap[FLOAT_MAT2] = {
            size: 4,
            setter: matAttribSetter,
            count: 2
          };
          attrTypeMap[FLOAT_MAT3] = {
            size: 9,
            setter: matAttribSetter,
            count: 3
          };
          attrTypeMap[FLOAT_MAT4] = {
            size: 16,
            setter: matAttribSetter,
            count: 4
          };
          var gl2 = void 0;
          var errorRE = /ERROR:\s*\d+:(\d+)/gi;
          function addLineNumbersWithError(src) {
            var log = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
            var lineOffset = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
            var matches = _toConsumableArray(log.matchAll(errorRE));
            var lineNoToErrorMap = new Map(matches.map(function(m, ndx) {
              var lineNo = parseInt(m[1]);
              var next = matches[ndx + 1];
              var end = next ? next.index : log.length;
              var msg = log.substring(m.index, end);
              return [lineNo - 1, msg];
            }));
            return src.split("\n").map(function(line, lineNo) {
              var err = lineNoToErrorMap.get(lineNo);
              return "".concat(lineNo + 1 + lineOffset, ": ").concat(line).concat(err ? "\n\n^^^ ".concat(err) : "");
            }).join("\n");
          }
          var spaceRE = /^[ \t]*\n/;
          function loadShader(gl3, shaderSource, shaderType, opt_errorCallback) {
            var errFn = opt_errorCallback || error;
            var shader = gl3.createShader(shaderType);
            var lineOffset = 0;
            if (spaceRE.test(shaderSource)) {
              lineOffset = 1;
              shaderSource = shaderSource.replace(spaceRE, "");
            }
            gl3.shaderSource(shader, shaderSource);
            gl3.compileShader(shader);
            var compiled = gl3.getShaderParameter(shader, COMPILE_STATUS);
            if (!compiled) {
              var lastError = gl3.getShaderInfoLog(shader);
              errFn("".concat(addLineNumbersWithError(shaderSource, lastError, lineOffset), "\nError compiling ").concat(utils.glEnumToString(gl3, shaderType), ": ").concat(lastError));
              gl3.deleteShader(shader);
              return null;
            }
            return shader;
          }
          function getProgramOptions(opt_attribs, opt_locations, opt_errorCallback) {
            var transformFeedbackVaryings;
            var transformFeedbackMode;
            if (typeof opt_locations === "function") {
              opt_errorCallback = opt_locations;
              opt_locations = void 0;
            }
            if (typeof opt_attribs === "function") {
              opt_errorCallback = opt_attribs;
              opt_attribs = void 0;
            } else if (opt_attribs && !Array.isArray(opt_attribs)) {
              if (opt_attribs.errorCallback) {
                return opt_attribs;
              }
              var opt = opt_attribs;
              opt_errorCallback = opt.errorCallback;
              opt_attribs = opt.attribLocations;
              transformFeedbackVaryings = opt.transformFeedbackVaryings;
              transformFeedbackMode = opt.transformFeedbackMode;
            }
            var options = {
              errorCallback: opt_errorCallback || error,
              transformFeedbackVaryings,
              transformFeedbackMode
            };
            if (opt_attribs) {
              var attribLocations = {};
              if (Array.isArray(opt_attribs)) {
                opt_attribs.forEach(function(attrib, ndx) {
                  attribLocations[attrib] = opt_locations ? opt_locations[ndx] : ndx;
                });
              } else {
                attribLocations = opt_attribs;
              }
              options.attribLocations = attribLocations;
            }
            return options;
          }
          var defaultShaderType = ["VERTEX_SHADER", "FRAGMENT_SHADER"];
          function getShaderTypeFromScriptType(gl3, scriptType) {
            if (scriptType.indexOf("frag") >= 0) {
              return FRAGMENT_SHADER;
            } else if (scriptType.indexOf("vert") >= 0) {
              return VERTEX_SHADER;
            }
            return void 0;
          }
          function deleteShaders(gl3, shaders) {
            shaders.forEach(function(shader) {
              gl3.deleteShader(shader);
            });
          }
          function createProgram(gl3, shaders, opt_attribs, opt_locations, opt_errorCallback) {
            var progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
            var realShaders = [];
            var newShaders = [];
            for (var ndx = 0; ndx < shaders.length; ++ndx) {
              var shader = shaders[ndx];
              if (typeof shader === "string") {
                var elem = getElementById(shader);
                var src = elem ? elem.text : shader;
                var type = gl3[defaultShaderType[ndx]];
                if (elem && elem.type) {
                  type = getShaderTypeFromScriptType(gl3, elem.type) || type;
                }
                shader = loadShader(gl3, src, type, progOptions.errorCallback);
                newShaders.push(shader);
              }
              if (helper.isShader(gl3, shader)) {
                realShaders.push(shader);
              }
            }
            if (realShaders.length !== shaders.length) {
              progOptions.errorCallback("not enough shaders for program");
              deleteShaders(gl3, newShaders);
              return null;
            }
            var program = gl3.createProgram();
            realShaders.forEach(function(shader2) {
              gl3.attachShader(program, shader2);
            });
            if (progOptions.attribLocations) {
              Object.keys(progOptions.attribLocations).forEach(function(attrib) {
                gl3.bindAttribLocation(program, progOptions.attribLocations[attrib], attrib);
              });
            }
            var varyings = progOptions.transformFeedbackVaryings;
            if (varyings) {
              if (varyings.attribs) {
                varyings = varyings.attribs;
              }
              if (!Array.isArray(varyings)) {
                varyings = Object.keys(varyings);
              }
              gl3.transformFeedbackVaryings(program, varyings, progOptions.transformFeedbackMode || SEPARATE_ATTRIBS);
            }
            gl3.linkProgram(program);
            var linked = gl3.getProgramParameter(program, LINK_STATUS);
            if (!linked) {
              var lastError = gl3.getProgramInfoLog(program);
              progOptions.errorCallback("".concat(realShaders.map(function(shader2) {
                var src2 = addLineNumbersWithError(gl3.getShaderSource(shader2), "", 0);
                var type2 = gl3.getShaderParameter(shader2, gl3.SHADER_TYPE);
                return "".concat(utils.glEnumToString(gl3, type2), "\n").concat(src2, "}");
              }).join("\n"), "\nError in program linking: ").concat(lastError));
              gl3.deleteProgram(program);
              deleteShaders(gl3, newShaders);
              return null;
            }
            return program;
          }
          function createShaderFromScript(gl3, scriptId, opt_shaderType, opt_errorCallback) {
            var shaderSource = "";
            var shaderScript = getElementById(scriptId);
            if (!shaderScript) {
              throw new Error("unknown script element: ".concat(scriptId));
            }
            shaderSource = shaderScript.text;
            var shaderType = opt_shaderType || getShaderTypeFromScriptType(gl3, shaderScript.type);
            if (!shaderType) {
              throw new Error("unknown shader type");
            }
            return loadShader(gl3, shaderSource, shaderType, opt_errorCallback);
          }
          function createProgramFromScripts(gl3, shaderScriptIds, opt_attribs, opt_locations, opt_errorCallback) {
            var progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
            var shaders = [];
            for (var ii = 0; ii < shaderScriptIds.length; ++ii) {
              var shader = createShaderFromScript(gl3, shaderScriptIds[ii], gl3[defaultShaderType[ii]], progOptions.errorCallback);
              if (!shader) {
                return null;
              }
              shaders.push(shader);
            }
            return createProgram(gl3, shaders, progOptions);
          }
          function createProgramFromSources(gl3, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
            var progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
            var shaders = [];
            for (var ii = 0; ii < shaderSources.length; ++ii) {
              var shader = loadShader(gl3, shaderSources[ii], gl3[defaultShaderType[ii]], progOptions.errorCallback);
              if (!shader) {
                return null;
              }
              shaders.push(shader);
            }
            return createProgram(gl3, shaders, progOptions);
          }
          function isBuiltIn(info) {
            var name = info.name;
            return name.startsWith("gl_") || name.startsWith("webgl_");
          }
          var tokenRE = /(\.|\[|]|\w+)/g;
          var isDigit = function isDigit2(s) {
            return s >= "0" && s <= "9";
          };
          function addSetterToUniformTree(fullPath, setter, node, uniformSetters) {
            var tokens = fullPath.split(tokenRE).filter(function(s) {
              return s !== "";
            });
            var tokenNdx = 0;
            var path = "";
            for (; ; ) {
              var token = tokens[tokenNdx++];
              path += token;
              var isArrayIndex = isDigit(token[0]);
              var accessor = isArrayIndex ? parseInt(token) : token;
              if (isArrayIndex) {
                path += tokens[tokenNdx++];
              }
              var isLastToken = tokenNdx === tokens.length;
              if (isLastToken) {
                node[accessor] = setter;
                break;
              } else {
                var _token = tokens[tokenNdx++];
                var isArray = _token === "[";
                var child = node[accessor] || (isArray ? [] : {});
                node[accessor] = child;
                node = child;
                uniformSetters[path] = uniformSetters[path] || function(node2) {
                  return function(value) {
                    setUniformTree(node2, value);
                  };
                }(child);
                path += _token;
              }
            }
          }
          function createUniformSetters(gl3, program) {
            var textureUnit = 0;
            function createUniformSetter(program2, uniformInfo2, location3) {
              var isArray = uniformInfo2.name.endsWith("[0]");
              var type = uniformInfo2.type;
              var typeInfo = typeMap[type];
              if (!typeInfo) {
                throw new Error("unknown type: 0x".concat(type.toString(16)));
              }
              var setter2;
              if (typeInfo.bindPoint) {
                var unit = textureUnit;
                textureUnit += uniformInfo2.size;
                if (isArray) {
                  setter2 = typeInfo.arraySetter(gl3, type, unit, location3, uniformInfo2.size);
                } else {
                  setter2 = typeInfo.setter(gl3, type, unit, location3, uniformInfo2.size);
                }
              } else {
                if (typeInfo.arraySetter && isArray) {
                  setter2 = typeInfo.arraySetter(gl3, location3);
                } else {
                  setter2 = typeInfo.setter(gl3, location3);
                }
              }
              setter2.location = location3;
              return setter2;
            }
            var uniformSetters = {};
            var uniformTree = {};
            var numUniforms = gl3.getProgramParameter(program, ACTIVE_UNIFORMS);
            for (var ii = 0; ii < numUniforms; ++ii) {
              var uniformInfo = gl3.getActiveUniform(program, ii);
              if (isBuiltIn(uniformInfo)) {
                continue;
              }
              var name = uniformInfo.name;
              if (name.endsWith("[0]")) {
                name = name.substr(0, name.length - 3);
              }
              var location2 = gl3.getUniformLocation(program, uniformInfo.name);
              if (location2) {
                var setter = createUniformSetter(program, uniformInfo, location2);
                uniformSetters[name] = setter;
                addSetterToUniformTree(name, setter, uniformTree, uniformSetters);
              }
            }
            return uniformSetters;
          }
          function createTransformFeedbackInfo(gl3, program) {
            var info = {};
            var numVaryings = gl3.getProgramParameter(program, TRANSFORM_FEEDBACK_VARYINGS);
            for (var ii = 0; ii < numVaryings; ++ii) {
              var varying = gl3.getTransformFeedbackVarying(program, ii);
              info[varying.name] = {
                index: ii,
                type: varying.type,
                size: varying.size
              };
            }
            return info;
          }
          function bindTransformFeedbackInfo(gl3, transformFeedbackInfo, bufferInfo) {
            if (transformFeedbackInfo.transformFeedbackInfo) {
              transformFeedbackInfo = transformFeedbackInfo.transformFeedbackInfo;
            }
            if (bufferInfo.attribs) {
              bufferInfo = bufferInfo.attribs;
            }
            for (var name in bufferInfo) {
              var varying = transformFeedbackInfo[name];
              if (varying) {
                var buf = bufferInfo[name];
                if (buf.offset) {
                  gl3.bindBufferRange(TRANSFORM_FEEDBACK_BUFFER, varying.index, buf.buffer, buf.offset, buf.size);
                } else {
                  gl3.bindBufferBase(TRANSFORM_FEEDBACK_BUFFER, varying.index, buf.buffer);
                }
              }
            }
          }
          function createTransformFeedback(gl3, programInfo, bufferInfo) {
            var tf = gl3.createTransformFeedback();
            gl3.bindTransformFeedback(TRANSFORM_FEEDBACK, tf);
            gl3.useProgram(programInfo.program);
            bindTransformFeedbackInfo(gl3, programInfo, bufferInfo);
            gl3.bindTransformFeedback(TRANSFORM_FEEDBACK, null);
            return tf;
          }
          function createUniformBlockSpecFromProgram(gl3, program) {
            var numUniforms = gl3.getProgramParameter(program, ACTIVE_UNIFORMS);
            var uniformData = [];
            var uniformIndices = [];
            for (var ii = 0; ii < numUniforms; ++ii) {
              uniformIndices.push(ii);
              uniformData.push({});
              var uniformInfo = gl3.getActiveUniform(program, ii);
              uniformData[ii].name = uniformInfo.name;
            }
            [
              ["UNIFORM_TYPE", "type"],
              ["UNIFORM_SIZE", "size"],
              ["UNIFORM_BLOCK_INDEX", "blockNdx"],
              ["UNIFORM_OFFSET", "offset"]
            ].forEach(function(pair) {
              var pname = pair[0];
              var key = pair[1];
              gl3.getActiveUniforms(program, uniformIndices, gl3[pname]).forEach(function(value, ndx) {
                uniformData[ndx][key] = value;
              });
            });
            var blockSpecs = {};
            var numUniformBlocks = gl3.getProgramParameter(program, ACTIVE_UNIFORM_BLOCKS);
            for (var _ii = 0; _ii < numUniformBlocks; ++_ii) {
              var name = gl3.getActiveUniformBlockName(program, _ii);
              var blockSpec = {
                index: gl3.getUniformBlockIndex(program, name),
                usedByVertexShader: gl3.getActiveUniformBlockParameter(program, _ii, UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER),
                usedByFragmentShader: gl3.getActiveUniformBlockParameter(program, _ii, UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER),
                size: gl3.getActiveUniformBlockParameter(program, _ii, UNIFORM_BLOCK_DATA_SIZE),
                uniformIndices: gl3.getActiveUniformBlockParameter(program, _ii, UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES)
              };
              blockSpec.used = blockSpec.usedByVertexShader || blockSpec.usedByFragmentShader;
              blockSpecs[name] = blockSpec;
            }
            return {
              blockSpecs,
              uniformData
            };
          }
          var arraySuffixRE = /\[\d+\]\.$/;
          var pad = function pad2(v, padding) {
            return ((v + (padding - 1)) / padding | 0) * padding;
          };
          function createUniformBlockUniformSetter(view, isArray, rows, cols) {
            if (isArray || rows) {
              cols = cols || 1;
              var numElements = view.length;
              var totalRows = numElements / 4;
              return function(value) {
                var dst = 0;
                var src = 0;
                for (var row = 0; row < totalRows; ++row) {
                  for (var col = 0; col < cols; ++col) {
                    view[dst++] = value[src++];
                  }
                  dst += 4 - cols;
                }
              };
            } else {
              return function(value) {
                if (value.length) {
                  view.set(value);
                } else {
                  view[0] = value;
                }
              };
            }
          }
          function createUniformBlockInfoFromProgram(gl3, program, uniformBlockSpec, blockName) {
            var blockSpecs = uniformBlockSpec.blockSpecs;
            var uniformData = uniformBlockSpec.uniformData;
            var blockSpec = blockSpecs[blockName];
            if (!blockSpec) {
              warn("no uniform block object named:", blockName);
              return {
                name: blockName,
                uniforms: {}
              };
            }
            var array = new ArrayBuffer(blockSpec.size);
            var buffer = gl3.createBuffer();
            var uniformBufferIndex = blockSpec.index;
            gl3.bindBuffer(UNIFORM_BUFFER, buffer);
            gl3.uniformBlockBinding(program, blockSpec.index, uniformBufferIndex);
            var prefix = blockName + ".";
            if (arraySuffixRE.test(prefix)) {
              prefix = prefix.replace(arraySuffixRE, ".");
            }
            var uniforms = {};
            var setters = {};
            var setterTree = {};
            blockSpec.uniformIndices.forEach(function(uniformNdx) {
              var data = uniformData[uniformNdx];
              var name = data.name;
              if (name.startsWith(prefix)) {
                name = name.substr(prefix.length);
              }
              var isArray = name.endsWith("[0]");
              if (isArray) {
                name = name.substr(0, name.length - 3);
              }
              var typeInfo = typeMap[data.type];
              var Type = typeInfo.Type;
              var byteLength = isArray ? pad(typeInfo.size, 16) * data.size : typeInfo.size * data.size;
              var uniformView = new Type(array, data.offset, byteLength / Type.BYTES_PER_ELEMENT);
              uniforms[name] = uniformView;
              var setter = createUniformBlockUniformSetter(uniformView, isArray, typeInfo.rows, typeInfo.cols);
              setters[name] = setter;
              addSetterToUniformTree(name, setter, setterTree, setters);
            });
            return {
              name: blockName,
              array,
              asFloat: new Float32Array(array),
              buffer,
              uniforms,
              setters
            };
          }
          function createUniformBlockInfo(gl3, programInfo, blockName) {
            return createUniformBlockInfoFromProgram(gl3, programInfo.program, programInfo.uniformBlockSpec, blockName);
          }
          function bindUniformBlock(gl3, programInfo, uniformBlockInfo) {
            var uniformBlockSpec = programInfo.uniformBlockSpec || programInfo;
            var blockSpec = uniformBlockSpec.blockSpecs[uniformBlockInfo.name];
            if (blockSpec) {
              var bufferBindIndex = blockSpec.index;
              gl3.bindBufferRange(UNIFORM_BUFFER, bufferBindIndex, uniformBlockInfo.buffer, uniformBlockInfo.offset || 0, uniformBlockInfo.array.byteLength);
              return true;
            }
            return false;
          }
          function setUniformBlock(gl3, programInfo, uniformBlockInfo) {
            if (bindUniformBlock(gl3, programInfo, uniformBlockInfo)) {
              gl3.bufferData(UNIFORM_BUFFER, uniformBlockInfo.array, DYNAMIC_DRAW);
            }
          }
          function setBlockUniforms(uniformBlockInfo, values) {
            var setters = uniformBlockInfo.setters;
            for (var name in values) {
              var setter = setters[name];
              if (setter) {
                var value = values[name];
                setter(value);
              }
            }
          }
          function setUniformTree(tree, values) {
            for (var name in values) {
              var prop = tree[name];
              if (typeof prop === "function") {
                prop(values[name]);
              } else {
                setUniformTree(tree[name], values[name]);
              }
            }
          }
          function setUniforms(setters) {
            var actualSetters = setters.uniformSetters || setters;
            var numArgs = arguments.length <= 1 ? 0 : arguments.length - 1;
            for (var aNdx = 0; aNdx < numArgs; ++aNdx) {
              var values = aNdx + 1 < 1 || arguments.length <= aNdx + 1 ? void 0 : arguments[aNdx + 1];
              if (Array.isArray(values)) {
                var numValues = values.length;
                for (var ii = 0; ii < numValues; ++ii) {
                  setUniforms(actualSetters, values[ii]);
                }
              } else {
                for (var name in values) {
                  var setter = actualSetters[name];
                  if (setter) {
                    setter(values[name]);
                  }
                }
              }
            }
          }
          var setUniformsAndBindTextures = setUniforms;
          exports2.setUniformsAndBindTextures = setUniformsAndBindTextures;
          function createAttributeSetters(gl3, program) {
            var attribSetters = {};
            var numAttribs = gl3.getProgramParameter(program, ACTIVE_ATTRIBUTES);
            for (var ii = 0; ii < numAttribs; ++ii) {
              var attribInfo = gl3.getActiveAttrib(program, ii);
              if (isBuiltIn(attribInfo)) {
                continue;
              }
              var index = gl3.getAttribLocation(program, attribInfo.name);
              var typeInfo = attrTypeMap[attribInfo.type];
              var setter = typeInfo.setter(gl3, index, typeInfo);
              setter.location = index;
              attribSetters[attribInfo.name] = setter;
            }
            return attribSetters;
          }
          function setAttributes(setters, buffers) {
            for (var name in buffers) {
              var setter = setters[name];
              if (setter) {
                setter(buffers[name]);
              }
            }
          }
          function setBuffersAndAttributes(gl3, programInfo, buffers) {
            if (buffers.vertexArrayObject) {
              gl3.bindVertexArray(buffers.vertexArrayObject);
            } else {
              setAttributes(programInfo.attribSetters || programInfo, buffers.attribs);
              if (buffers.indices) {
                gl3.bindBuffer(ELEMENT_ARRAY_BUFFER, buffers.indices);
              }
            }
          }
          function createProgramInfoFromProgram(gl3, program) {
            var uniformSetters = createUniformSetters(gl3, program);
            var attribSetters = createAttributeSetters(gl3, program);
            var programInfo = {
              program,
              uniformSetters,
              attribSetters
            };
            if (utils.isWebGL2(gl3)) {
              programInfo.uniformBlockSpec = createUniformBlockSpecFromProgram(gl3, program);
              programInfo.transformFeedbackInfo = createTransformFeedbackInfo(gl3, program);
            }
            return programInfo;
          }
          function createProgramInfo(gl3, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
            var progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
            var good = true;
            shaderSources = shaderSources.map(function(source) {
              if (source.indexOf("\n") < 0) {
                var script = getElementById(source);
                if (!script) {
                  progOptions.errorCallback("no element with id: " + source);
                  good = false;
                } else {
                  source = script.text;
                }
              }
              return source;
            });
            if (!good) {
              return null;
            }
            var program = createProgramFromSources(gl3, shaderSources, progOptions);
            if (!program) {
              return null;
            }
            return createProgramInfoFromProgram(gl3, program);
          }
        },
        "./src/textures.js": function(module2, exports2, __webpack_require__) {
          "use strict";
          function _typeof(obj) {
            "@babel/helpers - typeof";
            if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
              _typeof = function _typeof2(obj2) {
                return typeof obj2;
              };
            } else {
              _typeof = function _typeof2(obj2) {
                return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
              };
            }
            return _typeof(obj);
          }
          exports2.__esModule = true;
          exports2.setTextureDefaults_ = setDefaults;
          exports2.createSampler = createSampler;
          exports2.createSamplers = createSamplers;
          exports2.setSamplerParameters = setSamplerParameters;
          exports2.createTexture = createTexture;
          exports2.setEmptyTexture = setEmptyTexture;
          exports2.setTextureFromArray = setTextureFromArray;
          exports2.loadTextureFromUrl = loadTextureFromUrl;
          exports2.setTextureFromElement = setTextureFromElement;
          exports2.setTextureFilteringForSize = setTextureFilteringForSize;
          exports2.setTextureParameters = setTextureParameters;
          exports2.setDefaultTextureColor = setDefaultTextureColor;
          exports2.createTextures = createTextures;
          exports2.resizeTexture = resizeTexture;
          exports2.canGenerateMipmap = canGenerateMipmap;
          exports2.canFilter = canFilter;
          exports2.getNumComponentsForFormat = getNumComponentsForFormat;
          exports2.getBytesPerElementForInternalFormat = getBytesPerElementForInternalFormat;
          exports2.getFormatAndTypeForInternalFormat = getFormatAndTypeForInternalFormat;
          var utils = _interopRequireWildcard(__webpack_require__("./src/utils.js"));
          var typedArrays = _interopRequireWildcard(__webpack_require__("./src/typedarrays.js"));
          var helper = _interopRequireWildcard(__webpack_require__("./src/helper.js"));
          function _getRequireWildcardCache() {
            if (typeof WeakMap !== "function")
              return null;
            var cache = new WeakMap();
            _getRequireWildcardCache = function _getRequireWildcardCache2() {
              return cache;
            };
            return cache;
          }
          function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
              return obj;
            }
            if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
              return {default: obj};
            }
            var cache = _getRequireWildcardCache();
            if (cache && cache.has(obj)) {
              return cache.get(obj);
            }
            var newObj = {};
            var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) {
                var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                if (desc && (desc.get || desc.set)) {
                  Object.defineProperty(newObj, key, desc);
                } else {
                  newObj[key] = obj[key];
                }
              }
            }
            newObj["default"] = obj;
            if (cache) {
              cache.set(obj, newObj);
            }
            return newObj;
          }
          var gl2 = void 0;
          var defaults = {
            textureColor: new Uint8Array([128, 192, 255, 255]),
            textureOptions: {},
            crossOrigin: void 0
          };
          var isArrayBuffer = typedArrays.isArrayBuffer;
          var getShared2DContext = function() {
            var s_ctx;
            return function getShared2DContext2() {
              s_ctx = s_ctx || (typeof document !== "undefined" && document.createElement ? document.createElement("canvas").getContext("2d") : null);
              return s_ctx;
            };
          }();
          var ALPHA = 6406;
          var RGB = 6407;
          var RGBA = 6408;
          var LUMINANCE = 6409;
          var LUMINANCE_ALPHA = 6410;
          var DEPTH_COMPONENT = 6402;
          var DEPTH_STENCIL = 34041;
          var CLAMP_TO_EDGE = 33071;
          var NEAREST = 9728;
          var LINEAR = 9729;
          var TEXTURE_2D = 3553;
          var TEXTURE_CUBE_MAP = 34067;
          var TEXTURE_3D = 32879;
          var TEXTURE_2D_ARRAY = 35866;
          var TEXTURE_CUBE_MAP_POSITIVE_X = 34069;
          var TEXTURE_CUBE_MAP_NEGATIVE_X = 34070;
          var TEXTURE_CUBE_MAP_POSITIVE_Y = 34071;
          var TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072;
          var TEXTURE_CUBE_MAP_POSITIVE_Z = 34073;
          var TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074;
          var TEXTURE_MIN_FILTER = 10241;
          var TEXTURE_MAG_FILTER = 10240;
          var TEXTURE_WRAP_S = 10242;
          var TEXTURE_WRAP_T = 10243;
          var TEXTURE_WRAP_R = 32882;
          var TEXTURE_MIN_LOD = 33082;
          var TEXTURE_MAX_LOD = 33083;
          var TEXTURE_BASE_LEVEL = 33084;
          var TEXTURE_MAX_LEVEL = 33085;
          var UNPACK_ALIGNMENT = 3317;
          var UNPACK_ROW_LENGTH = 3314;
          var UNPACK_IMAGE_HEIGHT = 32878;
          var UNPACK_SKIP_PIXELS = 3316;
          var UNPACK_SKIP_ROWS = 3315;
          var UNPACK_SKIP_IMAGES = 32877;
          var UNPACK_COLORSPACE_CONVERSION_WEBGL = 37443;
          var UNPACK_PREMULTIPLY_ALPHA_WEBGL = 37441;
          var UNPACK_FLIP_Y_WEBGL = 37440;
          var R8 = 33321;
          var R8_SNORM = 36756;
          var R16F = 33325;
          var R32F = 33326;
          var R8UI = 33330;
          var R8I = 33329;
          var RG16UI = 33338;
          var RG16I = 33337;
          var RG32UI = 33340;
          var RG32I = 33339;
          var RG8 = 33323;
          var RG8_SNORM = 36757;
          var RG16F = 33327;
          var RG32F = 33328;
          var RG8UI = 33336;
          var RG8I = 33335;
          var R16UI = 33332;
          var R16I = 33331;
          var R32UI = 33334;
          var R32I = 33333;
          var RGB8 = 32849;
          var SRGB8 = 35905;
          var RGB565 = 36194;
          var RGB8_SNORM = 36758;
          var R11F_G11F_B10F = 35898;
          var RGB9_E5 = 35901;
          var RGB16F = 34843;
          var RGB32F = 34837;
          var RGB8UI = 36221;
          var RGB8I = 36239;
          var RGB16UI = 36215;
          var RGB16I = 36233;
          var RGB32UI = 36209;
          var RGB32I = 36227;
          var RGBA8 = 32856;
          var SRGB8_ALPHA8 = 35907;
          var RGBA8_SNORM = 36759;
          var RGB5_A1 = 32855;
          var RGBA4 = 32854;
          var RGB10_A2 = 32857;
          var RGBA16F = 34842;
          var RGBA32F = 34836;
          var RGBA8UI = 36220;
          var RGBA8I = 36238;
          var RGB10_A2UI = 36975;
          var RGBA16UI = 36214;
          var RGBA16I = 36232;
          var RGBA32I = 36226;
          var RGBA32UI = 36208;
          var DEPTH_COMPONENT16 = 33189;
          var DEPTH_COMPONENT24 = 33190;
          var DEPTH_COMPONENT32F = 36012;
          var DEPTH32F_STENCIL8 = 36013;
          var DEPTH24_STENCIL8 = 35056;
          var BYTE = 5120;
          var UNSIGNED_BYTE = 5121;
          var SHORT = 5122;
          var UNSIGNED_SHORT = 5123;
          var INT = 5124;
          var UNSIGNED_INT = 5125;
          var FLOAT = 5126;
          var UNSIGNED_SHORT_4_4_4_4 = 32819;
          var UNSIGNED_SHORT_5_5_5_1 = 32820;
          var UNSIGNED_SHORT_5_6_5 = 33635;
          var HALF_FLOAT = 5131;
          var HALF_FLOAT_OES = 36193;
          var UNSIGNED_INT_2_10_10_10_REV = 33640;
          var UNSIGNED_INT_10F_11F_11F_REV = 35899;
          var UNSIGNED_INT_5_9_9_9_REV = 35902;
          var FLOAT_32_UNSIGNED_INT_24_8_REV = 36269;
          var UNSIGNED_INT_24_8 = 34042;
          var RG = 33319;
          var RG_INTEGER = 33320;
          var RED = 6403;
          var RED_INTEGER = 36244;
          var RGB_INTEGER = 36248;
          var RGBA_INTEGER = 36249;
          var formatInfo = {};
          {
            var f = formatInfo;
            f[ALPHA] = {
              numColorComponents: 1
            };
            f[LUMINANCE] = {
              numColorComponents: 1
            };
            f[LUMINANCE_ALPHA] = {
              numColorComponents: 2
            };
            f[RGB] = {
              numColorComponents: 3
            };
            f[RGBA] = {
              numColorComponents: 4
            };
            f[RED] = {
              numColorComponents: 1
            };
            f[RED_INTEGER] = {
              numColorComponents: 1
            };
            f[RG] = {
              numColorComponents: 2
            };
            f[RG_INTEGER] = {
              numColorComponents: 2
            };
            f[RGB] = {
              numColorComponents: 3
            };
            f[RGB_INTEGER] = {
              numColorComponents: 3
            };
            f[RGBA] = {
              numColorComponents: 4
            };
            f[RGBA_INTEGER] = {
              numColorComponents: 4
            };
            f[DEPTH_COMPONENT] = {
              numColorComponents: 1
            };
            f[DEPTH_STENCIL] = {
              numColorComponents: 2
            };
          }
          var s_textureInternalFormatInfo;
          function getTextureInternalFormatInfo(internalFormat) {
            if (!s_textureInternalFormatInfo) {
              var t = {};
              t[ALPHA] = {
                textureFormat: ALPHA,
                colorRenderable: true,
                textureFilterable: true,
                bytesPerElement: [1, 2, 2, 4],
                type: [UNSIGNED_BYTE, HALF_FLOAT, HALF_FLOAT_OES, FLOAT]
              };
              t[LUMINANCE] = {
                textureFormat: LUMINANCE,
                colorRenderable: true,
                textureFilterable: true,
                bytesPerElement: [1, 2, 2, 4],
                type: [UNSIGNED_BYTE, HALF_FLOAT, HALF_FLOAT_OES, FLOAT]
              };
              t[LUMINANCE_ALPHA] = {
                textureFormat: LUMINANCE_ALPHA,
                colorRenderable: true,
                textureFilterable: true,
                bytesPerElement: [2, 4, 4, 8],
                type: [UNSIGNED_BYTE, HALF_FLOAT, HALF_FLOAT_OES, FLOAT]
              };
              t[RGB] = {
                textureFormat: RGB,
                colorRenderable: true,
                textureFilterable: true,
                bytesPerElement: [3, 6, 6, 12, 2],
                type: [UNSIGNED_BYTE, HALF_FLOAT, HALF_FLOAT_OES, FLOAT, UNSIGNED_SHORT_5_6_5]
              };
              t[RGBA] = {
                textureFormat: RGBA,
                colorRenderable: true,
                textureFilterable: true,
                bytesPerElement: [4, 8, 8, 16, 2, 2],
                type: [UNSIGNED_BYTE, HALF_FLOAT, HALF_FLOAT_OES, FLOAT, UNSIGNED_SHORT_4_4_4_4, UNSIGNED_SHORT_5_5_5_1]
              };
              t[DEPTH_COMPONENT] = {
                textureFormat: DEPTH_COMPONENT,
                colorRenderable: true,
                textureFilterable: false,
                bytesPerElement: [2, 4],
                type: [UNSIGNED_INT, UNSIGNED_SHORT]
              };
              t[R8] = {
                textureFormat: RED,
                colorRenderable: true,
                textureFilterable: true,
                bytesPerElement: [1],
                type: [UNSIGNED_BYTE]
              };
              t[R8_SNORM] = {
                textureFormat: RED,
                colorRenderable: false,
                textureFilterable: true,
                bytesPerElement: [1],
                type: [BYTE]
              };
              t[R16F] = {
                textureFormat: RED,
                colorRenderable: false,
                textureFilterable: true,
                bytesPerElement: [4, 2],
                type: [FLOAT, HALF_FLOAT]
              };
              t[R32F] = {
                textureFormat: RED,
                colorRenderable: false,
                textureFilterable: false,
                bytesPerElement: [4],
                type: [FLOAT]
              };
              t[R8UI] = {
                textureFormat: RED_INTEGER,
                colorRenderable: true,
                textureFilterable: false,
                bytesPerElement: [1],
                type: [UNSIGNED_BYTE]
              };
              t[R8I] = {
                textureFormat: RED_INTEGER,
                colorRenderable: true,
                textureFilterable: false,
                bytesPerElement: [1],
                type: [BYTE]
              };
              t[R16UI] = {
                textureFormat: RED_INTEGER,
                colorRenderable: true,
                textureFilterable: false,
                bytesPerElement: [2],
                type: [UNSIGNED_SHORT]
              };
              t[R16I] = {
                textureFormat: RED_INTEGER,
                colorRenderable: true,
                textureFilterable: false,
                bytesPerElement: [2],
                type: [SHORT]
              };
              t[R32UI] = {
                textureFormat: RED_INTEGER,
                colorRenderable: true,
                textureFilterable: false,
                bytesPerElement: [4],
                type: [UNSIGNED_INT]
              };
              t[R32I] = {
                textureFormat: RED_INTEGER,
                colorRenderable: true,
                textureFilterable: false,
                bytesPerElement: [4],
                type: [INT]
              };
              t[RG8] = {
                textureFormat: RG,
                colorRenderable: true,
                textureFilterable: true,
                bytesPerElement: [2],
                type: [UNSIGNED_BYTE]
              };
              t[RG8_SNORM] = {
                textureFormat: RG,
                colorRenderable: false,
                textureFilterable: true,
                bytesPerElement: [2],
                type: [BYTE]
              };
              t[RG16F] = {
                textureFormat: RG,
                colorRenderable: false,
                textureFilterable: true,
                bytesPerElement: [8, 4],
                type: [FLOAT, HALF_FLOAT]
              };
              t[RG32F] = {
                textureFormat: RG,
                colorRenderable: false,
                textureFilterable: false,
                bytesPerElement: [8],
                type: [FLOAT]
              };
              t[RG8UI] = {
                textureFormat: RG_INTEGER,
                colorRenderable: true,
                textureFilterable: false,
                bytesPerElement: [2],
                type: [UNSIGNED_BYTE]
              };
              t[RG8I] = {
                textureFormat: RG_INTEGER,
                colorRenderable: true,
                textureFilterable: false,
                bytesPerElement: [2],
                type: [BYTE]
              };
              t[RG16UI] = {
                textureFormat: RG_INTEGER,
                colorRenderable: true,
                textureFilterable: false,
                bytesPerElement: [4],
                type: [UNSIGNED_SHORT]
              };
              t[RG16I] = {
                textureFormat: RG_INTEGER,
                colorRenderable: true,
                textureFilterable: false,
                bytesPerElement: [4],
                type: [SHORT]
              };
              t[RG32UI] = {
                textureFormat: RG_INTEGER,
                colorRenderable: true,
                textureFilterable: false,
                bytesPerElement: [8],
                type: [UNSIGNED_INT]
              };
              t[RG32I] = {
                textureFormat: RG_INTEGER,
                colorRenderable: true,
                textureFilterable: false,
                bytesPerElement: [8],
                type: [INT]
              };
              t[RGB8] = {
                textureFormat: RGB,
                colorRenderable: true,
                textureFilterable: true,
                bytesPerElement: [3],
                type: [UNSIGNED_BYTE]
              };
              t[SRGB8] = {
                textureFormat: RGB,
                colorRenderable: false,
                textureFilterable: true,
                bytesPerElement: [3],
                type: [UNSIGNED_BYTE]
              };
              t[RGB565] = {
                textureFormat: RGB,
                colorRenderable: true,
                textureFilterable: true,
                bytesPerElement: [3, 2],
                type: [UNSIGNED_BYTE, UNSIGNED_SHORT_5_6_5]
              };
              t[RGB8_SNORM] = {
                textureFormat: RGB,
                colorRenderable: false,
                textureFilterable: true,
                bytesPerElement: [3],
                type: [BYTE]
              };
              t[R11F_G11F_B10F] = {
                textureFormat: RGB,
                colorRenderable: false,
                textureFilterable: true,
                bytesPerElement: [12, 6, 4],
                type: [FLOAT, HALF_FLOAT, UNSIGNED_INT_10F_11F_11F_REV]
              };
              t[RGB9_E5] = {
                textureFormat: RGB,
                colorRenderable: false,
                textureFilterable: true,
                bytesPerElement: [12, 6, 4],
                type: [FLOAT, HALF_FLOAT, UNSIGNED_INT_5_9_9_9_REV]
              };
              t[RGB16F] = {
                textureFormat: RGB,
                colorRenderable: false,
                textureFilterable: true,
                bytesPerElement: [12, 6],
                type: [FLOAT, HALF_FLOAT]
              };
              t[RGB32F] = {
                textureFormat: RGB,
                colorRenderable: false,
                textureFilterable: false,
                bytesPerElement: [12],
                type: [FLOAT]
              };
              t[RGB8UI] = {
                textureFormat: RGB_INTEGER,
                colorRenderable: false,
                textureFilterable: false,
                bytesPerElement: [3],
                type: [UNSIGNED_BYTE]
              };
              t[RGB8I] = {
                textureFormat: RGB_INTEGER,
                colorRenderable: false,
                textureFilterable: false,
                bytesPerElement: [3],
                type: [BYTE]
              };
              t[RGB16UI] = {
                textureFormat: RGB_INTEGER,
                colorRenderable: false,
                textureFilterable: false,
                bytesPerElement: [6],
                type: [UNSIGNED_SHORT]
              };
              t[RGB16I] = {
                textureFormat: RGB_INTEGER,
                colorRenderable: false,
                textureFilterable: false,
                bytesPerElement: [6],
                type: [SHORT]
              };
              t[RGB32UI] = {
                textureFormat: RGB_INTEGER,
                colorRenderable: false,
                textureFilterable: false,
                bytesPerElement: [12],
                type: [UNSIGNED_INT]
              };
              t[RGB32I] = {
                textureFormat: RGB_INTEGER,
                colorRenderable: false,
                textureFilterable: false,
                bytesPerElement: [12],
                type: [INT]
              };
              t[RGBA8] = {
                textureFormat: RGBA,
                colorRenderable: true,
                textureFilterable: true,
                bytesPerElement: [4],
                type: [UNSIGNED_BYTE]
              };
              t[SRGB8_ALPHA8] = {
                textureFormat: RGBA,
                colorRenderable: true,
                textureFilterable: true,
                bytesPerElement: [4],
                type: [UNSIGNED_BYTE]
              };
              t[RGBA8_SNORM] = {
                textureFormat: RGBA,
                colorRenderable: false,
                textureFilterable: true,
                bytesPerElement: [4],
                type: [BYTE]
              };
              t[RGB5_A1] = {
                textureFormat: RGBA,
                colorRenderable: true,
                textureFilterable: true,
                bytesPerElement: [4, 2, 4],
                type: [UNSIGNED_BYTE, UNSIGNED_SHORT_5_5_5_1, UNSIGNED_INT_2_10_10_10_REV]
              };
              t[RGBA4] = {
                textureFormat: RGBA,
                colorRenderable: true,
                textureFilterable: true,
                bytesPerElement: [4, 2],
                type: [UNSIGNED_BYTE, UNSIGNED_SHORT_4_4_4_4]
              };
              t[RGB10_A2] = {
                textureFormat: RGBA,
                colorRenderable: true,
                textureFilterable: true,
                bytesPerElement: [4],
                type: [UNSIGNED_INT_2_10_10_10_REV]
              };
              t[RGBA16F] = {
                textureFormat: RGBA,
                colorRenderable: false,
                textureFilterable: true,
                bytesPerElement: [16, 8],
                type: [FLOAT, HALF_FLOAT]
              };
              t[RGBA32F] = {
                textureFormat: RGBA,
                colorRenderable: false,
                textureFilterable: false,
                bytesPerElement: [16],
                type: [FLOAT]
              };
              t[RGBA8UI] = {
                textureFormat: RGBA_INTEGER,
                colorRenderable: true,
                textureFilterable: false,
                bytesPerElement: [4],
                type: [UNSIGNED_BYTE]
              };
              t[RGBA8I] = {
                textureFormat: RGBA_INTEGER,
                colorRenderable: true,
                textureFilterable: false,
                bytesPerElement: [4],
                type: [BYTE]
              };
              t[RGB10_A2UI] = {
                textureFormat: RGBA_INTEGER,
                colorRenderable: true,
                textureFilterable: false,
                bytesPerElement: [4],
                type: [UNSIGNED_INT_2_10_10_10_REV]
              };
              t[RGBA16UI] = {
                textureFormat: RGBA_INTEGER,
                colorRenderable: true,
                textureFilterable: false,
                bytesPerElement: [8],
                type: [UNSIGNED_SHORT]
              };
              t[RGBA16I] = {
                textureFormat: RGBA_INTEGER,
                colorRenderable: true,
                textureFilterable: false,
                bytesPerElement: [8],
                type: [SHORT]
              };
              t[RGBA32I] = {
                textureFormat: RGBA_INTEGER,
                colorRenderable: true,
                textureFilterable: false,
                bytesPerElement: [16],
                type: [INT]
              };
              t[RGBA32UI] = {
                textureFormat: RGBA_INTEGER,
                colorRenderable: true,
                textureFilterable: false,
                bytesPerElement: [16],
                type: [UNSIGNED_INT]
              };
              t[DEPTH_COMPONENT16] = {
                textureFormat: DEPTH_COMPONENT,
                colorRenderable: true,
                textureFilterable: false,
                bytesPerElement: [2, 4],
                type: [UNSIGNED_SHORT, UNSIGNED_INT]
              };
              t[DEPTH_COMPONENT24] = {
                textureFormat: DEPTH_COMPONENT,
                colorRenderable: true,
                textureFilterable: false,
                bytesPerElement: [4],
                type: [UNSIGNED_INT]
              };
              t[DEPTH_COMPONENT32F] = {
                textureFormat: DEPTH_COMPONENT,
                colorRenderable: true,
                textureFilterable: false,
                bytesPerElement: [4],
                type: [FLOAT]
              };
              t[DEPTH24_STENCIL8] = {
                textureFormat: DEPTH_STENCIL,
                colorRenderable: true,
                textureFilterable: false,
                bytesPerElement: [4],
                type: [UNSIGNED_INT_24_8]
              };
              t[DEPTH32F_STENCIL8] = {
                textureFormat: DEPTH_STENCIL,
                colorRenderable: true,
                textureFilterable: false,
                bytesPerElement: [4],
                type: [FLOAT_32_UNSIGNED_INT_24_8_REV]
              };
              Object.keys(t).forEach(function(internalFormat2) {
                var info = t[internalFormat2];
                info.bytesPerElementMap = {};
                info.bytesPerElement.forEach(function(bytesPerElement, ndx) {
                  var type = info.type[ndx];
                  info.bytesPerElementMap[type] = bytesPerElement;
                });
              });
              s_textureInternalFormatInfo = t;
            }
            return s_textureInternalFormatInfo[internalFormat];
          }
          function getBytesPerElementForInternalFormat(internalFormat, type) {
            var info = getTextureInternalFormatInfo(internalFormat);
            if (!info) {
              throw "unknown internal format";
            }
            var bytesPerElement = info.bytesPerElementMap[type];
            if (bytesPerElement === void 0) {
              throw "unknown internal format";
            }
            return bytesPerElement;
          }
          function getFormatAndTypeForInternalFormat(internalFormat) {
            var info = getTextureInternalFormatInfo(internalFormat);
            if (!info) {
              throw "unknown internal format";
            }
            return {
              format: info.textureFormat,
              type: info.type[0]
            };
          }
          function isPowerOf2(value) {
            return (value & value - 1) === 0;
          }
          function canGenerateMipmap(gl3, width, height, internalFormat) {
            if (!utils.isWebGL2(gl3)) {
              return isPowerOf2(width) && isPowerOf2(height);
            }
            var info = getTextureInternalFormatInfo(internalFormat);
            if (!info) {
              throw "unknown internal format";
            }
            return info.colorRenderable && info.textureFilterable;
          }
          function canFilter(internalFormat) {
            var info = getTextureInternalFormatInfo(internalFormat);
            if (!info) {
              throw "unknown internal format";
            }
            return info.textureFilterable;
          }
          function getNumComponentsForFormat(format) {
            var info = formatInfo[format];
            if (!info) {
              throw "unknown format: " + format;
            }
            return info.numColorComponents;
          }
          function getTextureTypeForArrayType(gl3, src, defaultType) {
            if (isArrayBuffer(src)) {
              return typedArrays.getGLTypeForTypedArray(src);
            }
            return defaultType || UNSIGNED_BYTE;
          }
          function guessDimensions(gl3, target, width, height, numElements) {
            if (numElements % 1 !== 0) {
              throw "can't guess dimensions";
            }
            if (!width && !height) {
              var size = Math.sqrt(numElements / (target === TEXTURE_CUBE_MAP ? 6 : 1));
              if (size % 1 === 0) {
                width = size;
                height = size;
              } else {
                width = numElements;
                height = 1;
              }
            } else if (!height) {
              height = numElements / width;
              if (height % 1) {
                throw "can't guess dimensions";
              }
            } else if (!width) {
              width = numElements / height;
              if (width % 1) {
                throw "can't guess dimensions";
              }
            }
            return {
              width,
              height
            };
          }
          function setDefaultTextureColor(color) {
            defaults.textureColor = new Uint8Array([color[0] * 255, color[1] * 255, color[2] * 255, color[3] * 255]);
          }
          function setDefaults(newDefaults) {
            helper.copyExistingProperties(newDefaults, defaults);
            if (newDefaults.textureColor) {
              setDefaultTextureColor(newDefaults.textureColor);
            }
          }
          function setPackState(gl3, options) {
            if (options.colorspaceConversion !== void 0) {
              gl3.pixelStorei(UNPACK_COLORSPACE_CONVERSION_WEBGL, options.colorspaceConversion);
            }
            if (options.premultiplyAlpha !== void 0) {
              gl3.pixelStorei(UNPACK_PREMULTIPLY_ALPHA_WEBGL, options.premultiplyAlpha);
            }
            if (options.flipY !== void 0) {
              gl3.pixelStorei(UNPACK_FLIP_Y_WEBGL, options.flipY);
            }
          }
          function setSkipStateToDefault(gl3) {
            gl3.pixelStorei(UNPACK_ALIGNMENT, 4);
            if (utils.isWebGL2(gl3)) {
              gl3.pixelStorei(UNPACK_ROW_LENGTH, 0);
              gl3.pixelStorei(UNPACK_IMAGE_HEIGHT, 0);
              gl3.pixelStorei(UNPACK_SKIP_PIXELS, 0);
              gl3.pixelStorei(UNPACK_SKIP_ROWS, 0);
              gl3.pixelStorei(UNPACK_SKIP_IMAGES, 0);
            }
          }
          function setTextureSamplerParameters(gl3, target, parameteriFn, options) {
            if (options.minMag) {
              parameteriFn.call(gl3, target, TEXTURE_MIN_FILTER, options.minMag);
              parameteriFn.call(gl3, target, TEXTURE_MAG_FILTER, options.minMag);
            }
            if (options.min) {
              parameteriFn.call(gl3, target, TEXTURE_MIN_FILTER, options.min);
            }
            if (options.mag) {
              parameteriFn.call(gl3, target, TEXTURE_MAG_FILTER, options.mag);
            }
            if (options.wrap) {
              parameteriFn.call(gl3, target, TEXTURE_WRAP_S, options.wrap);
              parameteriFn.call(gl3, target, TEXTURE_WRAP_T, options.wrap);
              if (target === TEXTURE_3D || helper.isSampler(gl3, target)) {
                parameteriFn.call(gl3, target, TEXTURE_WRAP_R, options.wrap);
              }
            }
            if (options.wrapR) {
              parameteriFn.call(gl3, target, TEXTURE_WRAP_R, options.wrapR);
            }
            if (options.wrapS) {
              parameteriFn.call(gl3, target, TEXTURE_WRAP_S, options.wrapS);
            }
            if (options.wrapT) {
              parameteriFn.call(gl3, target, TEXTURE_WRAP_T, options.wrapT);
            }
            if (options.minLod) {
              parameteriFn.call(gl3, target, TEXTURE_MIN_LOD, options.minLod);
            }
            if (options.maxLod) {
              parameteriFn.call(gl3, target, TEXTURE_MAX_LOD, options.maxLod);
            }
            if (options.baseLevel) {
              parameteriFn.call(gl3, target, TEXTURE_BASE_LEVEL, options.baseLevel);
            }
            if (options.maxLevel) {
              parameteriFn.call(gl3, target, TEXTURE_MAX_LEVEL, options.maxLevel);
            }
          }
          function setTextureParameters(gl3, tex, options) {
            var target = options.target || TEXTURE_2D;
            gl3.bindTexture(target, tex);
            setTextureSamplerParameters(gl3, target, gl3.texParameteri, options);
          }
          function setSamplerParameters(gl3, sampler, options) {
            setTextureSamplerParameters(gl3, sampler, gl3.samplerParameteri, options);
          }
          function createSampler(gl3, options) {
            var sampler = gl3.createSampler();
            setSamplerParameters(gl3, sampler, options);
            return sampler;
          }
          function createSamplers(gl3, samplerOptions) {
            var samplers = {};
            Object.keys(samplerOptions).forEach(function(name) {
              samplers[name] = createSampler(gl3, samplerOptions[name]);
            });
            return samplers;
          }
          function make1Pixel(color) {
            color = color || defaults.textureColor;
            if (isArrayBuffer(color)) {
              return color;
            }
            return new Uint8Array([color[0] * 255, color[1] * 255, color[2] * 255, color[3] * 255]);
          }
          function setTextureFilteringForSize(gl3, tex, options, width, height, internalFormat) {
            options = options || defaults.textureOptions;
            internalFormat = internalFormat || RGBA;
            var target = options.target || TEXTURE_2D;
            width = width || options.width;
            height = height || options.height;
            gl3.bindTexture(target, tex);
            if (canGenerateMipmap(gl3, width, height, internalFormat)) {
              gl3.generateMipmap(target);
            } else {
              var filtering = canFilter(internalFormat) ? LINEAR : NEAREST;
              gl3.texParameteri(target, TEXTURE_MIN_FILTER, filtering);
              gl3.texParameteri(target, TEXTURE_MAG_FILTER, filtering);
              gl3.texParameteri(target, TEXTURE_WRAP_S, CLAMP_TO_EDGE);
              gl3.texParameteri(target, TEXTURE_WRAP_T, CLAMP_TO_EDGE);
            }
          }
          function shouldAutomaticallySetTextureFilteringForSize(options) {
            return options.auto === true || options.auto === void 0 && options.level === void 0;
          }
          function getCubeFaceOrder(gl3, options) {
            options = options || {};
            return options.cubeFaceOrder || [TEXTURE_CUBE_MAP_POSITIVE_X, TEXTURE_CUBE_MAP_NEGATIVE_X, TEXTURE_CUBE_MAP_POSITIVE_Y, TEXTURE_CUBE_MAP_NEGATIVE_Y, TEXTURE_CUBE_MAP_POSITIVE_Z, TEXTURE_CUBE_MAP_NEGATIVE_Z];
          }
          function getCubeFacesWithNdx(gl3, options) {
            var faces = getCubeFaceOrder(gl3, options);
            var facesWithNdx = faces.map(function(face, ndx) {
              return {
                face,
                ndx
              };
            });
            facesWithNdx.sort(function(a, b) {
              return a.face - b.face;
            });
            return facesWithNdx;
          }
          function setTextureFromElement(gl3, tex, element, options) {
            options = options || defaults.textureOptions;
            var target = options.target || TEXTURE_2D;
            var level = options.level || 0;
            var width = element.width;
            var height = element.height;
            var internalFormat = options.internalFormat || options.format || RGBA;
            var formatType = getFormatAndTypeForInternalFormat(internalFormat);
            var format = options.format || formatType.format;
            var type = options.type || formatType.type;
            setPackState(gl3, options);
            gl3.bindTexture(target, tex);
            if (target === TEXTURE_CUBE_MAP) {
              var imgWidth = element.width;
              var imgHeight = element.height;
              var size;
              var slices;
              if (imgWidth / 6 === imgHeight) {
                size = imgHeight;
                slices = [0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0];
              } else if (imgHeight / 6 === imgWidth) {
                size = imgWidth;
                slices = [0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5];
              } else if (imgWidth / 3 === imgHeight / 2) {
                size = imgWidth / 3;
                slices = [0, 0, 1, 0, 2, 0, 0, 1, 1, 1, 2, 1];
              } else if (imgWidth / 2 === imgHeight / 3) {
                size = imgWidth / 2;
                slices = [0, 0, 1, 0, 0, 1, 1, 1, 0, 2, 1, 2];
              } else {
                throw "can't figure out cube map from element: " + (element.src ? element.src : element.nodeName);
              }
              var ctx = getShared2DContext();
              if (ctx) {
                ctx.canvas.width = size;
                ctx.canvas.height = size;
                width = size;
                height = size;
                getCubeFacesWithNdx(gl3, options).forEach(function(f2) {
                  var xOffset = slices[f2.ndx * 2 + 0] * size;
                  var yOffset = slices[f2.ndx * 2 + 1] * size;
                  ctx.drawImage(element, xOffset, yOffset, size, size, 0, 0, size, size);
                  gl3.texImage2D(f2.face, level, internalFormat, format, type, ctx.canvas);
                });
                ctx.canvas.width = 1;
                ctx.canvas.height = 1;
              } else if (typeof createImageBitmap !== "undefined") {
                width = size;
                height = size;
                getCubeFacesWithNdx(gl3, options).forEach(function(f2) {
                  var xOffset = slices[f2.ndx * 2 + 0] * size;
                  var yOffset = slices[f2.ndx * 2 + 1] * size;
                  gl3.texImage2D(f2.face, level, internalFormat, size, size, 0, format, type, null);
                  createImageBitmap(element, xOffset, yOffset, size, size, {
                    premultiplyAlpha: "none",
                    colorSpaceConversion: "none"
                  }).then(function(imageBitmap) {
                    setPackState(gl3, options);
                    gl3.bindTexture(target, tex);
                    gl3.texImage2D(f2.face, level, internalFormat, format, type, imageBitmap);
                    if (shouldAutomaticallySetTextureFilteringForSize(options)) {
                      setTextureFilteringForSize(gl3, tex, options, width, height, internalFormat);
                    }
                  });
                });
              }
            } else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) {
              var smallest = Math.min(element.width, element.height);
              var largest = Math.max(element.width, element.height);
              var depth = largest / smallest;
              if (depth % 1 !== 0) {
                throw "can not compute 3D dimensions of element";
              }
              var xMult = element.width === largest ? 1 : 0;
              var yMult = element.height === largest ? 1 : 0;
              gl3.pixelStorei(UNPACK_ALIGNMENT, 1);
              gl3.pixelStorei(UNPACK_ROW_LENGTH, element.width);
              gl3.pixelStorei(UNPACK_IMAGE_HEIGHT, 0);
              gl3.pixelStorei(UNPACK_SKIP_IMAGES, 0);
              gl3.texImage3D(target, level, internalFormat, smallest, smallest, smallest, 0, format, type, null);
              for (var d = 0; d < depth; ++d) {
                var srcX = d * smallest * xMult;
                var srcY = d * smallest * yMult;
                gl3.pixelStorei(UNPACK_SKIP_PIXELS, srcX);
                gl3.pixelStorei(UNPACK_SKIP_ROWS, srcY);
                gl3.texSubImage3D(target, level, 0, 0, d, smallest, smallest, 1, format, type, element);
              }
              setSkipStateToDefault(gl3);
            } else {
              gl3.texImage2D(target, level, internalFormat, format, type, element);
            }
            if (shouldAutomaticallySetTextureFilteringForSize(options)) {
              setTextureFilteringForSize(gl3, tex, options, width, height, internalFormat);
            }
            setTextureParameters(gl3, tex, options);
          }
          function noop() {
          }
          function urlIsSameOrigin(url) {
            if (typeof document !== "undefined") {
              var a = document.createElement("a");
              a.href = url;
              return a.hostname === location.hostname && a.port === location.port && a.protocol === location.protocol;
            } else {
              var localOrigin = new URL(location.href).origin;
              var urlOrigin = new URL(url, location.href).origin;
              return urlOrigin === localOrigin;
            }
          }
          function setToAnonymousIfUndefinedAndURLIsNotSameOrigin(url, crossOrigin) {
            return crossOrigin === void 0 && !urlIsSameOrigin(url) ? "anonymous" : crossOrigin;
          }
          function loadImage(url, crossOrigin, callback) {
            callback = callback || noop;
            var img;
            crossOrigin = crossOrigin !== void 0 ? crossOrigin : defaults.crossOrigin;
            crossOrigin = setToAnonymousIfUndefinedAndURLIsNotSameOrigin(url, crossOrigin);
            if (typeof Image !== "undefined") {
              img = new Image();
              if (crossOrigin !== void 0) {
                img.crossOrigin = crossOrigin;
              }
              var clearEventHandlers = function clearEventHandlers2() {
                img.removeEventListener("error", onError);
                img.removeEventListener("load", onLoad);
                img = null;
              };
              var onError = function onError2() {
                var msg = "couldn't load image: " + url;
                helper.error(msg);
                callback(msg, img);
                clearEventHandlers();
              };
              var onLoad = function onLoad2() {
                callback(null, img);
                clearEventHandlers();
              };
              img.addEventListener("error", onError);
              img.addEventListener("load", onLoad);
              img.src = url;
              return img;
            } else if (typeof ImageBitmap !== "undefined") {
              var err;
              var bm;
              var cb = function cb2() {
                callback(err, bm);
              };
              var options = {};
              if (crossOrigin) {
                options.mode = "cors";
              }
              fetch(url, options).then(function(response) {
                if (!response.ok) {
                  throw response;
                }
                return response.blob();
              }).then(function(blob) {
                return createImageBitmap(blob, {
                  premultiplyAlpha: "none",
                  colorSpaceConversion: "none"
                });
              }).then(function(bitmap) {
                bm = bitmap;
                setTimeout(cb);
              })["catch"](function(e) {
                err = e;
                setTimeout(cb);
              });
              img = null;
            }
            return img;
          }
          function isTexImageSource(obj) {
            return typeof ImageBitmap !== "undefined" && obj instanceof ImageBitmap || typeof ImageData !== "undefined" && obj instanceof ImageData || typeof HTMLElement !== "undefined" && obj instanceof HTMLElement;
          }
          function loadAndUseImage(obj, crossOrigin, callback) {
            if (isTexImageSource(obj)) {
              setTimeout(function() {
                callback(null, obj);
              });
              return obj;
            }
            return loadImage(obj, crossOrigin, callback);
          }
          function setTextureTo1PixelColor(gl3, tex, options) {
            options = options || defaults.textureOptions;
            var target = options.target || TEXTURE_2D;
            gl3.bindTexture(target, tex);
            if (options.color === false) {
              return;
            }
            var color = make1Pixel(options.color);
            if (target === TEXTURE_CUBE_MAP) {
              for (var ii = 0; ii < 6; ++ii) {
                gl3.texImage2D(TEXTURE_CUBE_MAP_POSITIVE_X + ii, 0, RGBA, 1, 1, 0, RGBA, UNSIGNED_BYTE, color);
              }
            } else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) {
              gl3.texImage3D(target, 0, RGBA, 1, 1, 1, 0, RGBA, UNSIGNED_BYTE, color);
            } else {
              gl3.texImage2D(target, 0, RGBA, 1, 1, 0, RGBA, UNSIGNED_BYTE, color);
            }
          }
          function loadTextureFromUrl(gl3, tex, options, callback) {
            callback = callback || noop;
            options = options || defaults.textureOptions;
            setTextureTo1PixelColor(gl3, tex, options);
            options = Object.assign({}, options);
            var img = loadAndUseImage(options.src, options.crossOrigin, function(err, img2) {
              if (err) {
                callback(err, tex, img2);
              } else {
                setTextureFromElement(gl3, tex, img2, options);
                callback(null, tex, img2);
              }
            });
            return img;
          }
          function loadCubemapFromUrls(gl3, tex, options, callback) {
            callback = callback || noop;
            var urls = options.src;
            if (urls.length !== 6) {
              throw "there must be 6 urls for a cubemap";
            }
            var level = options.level || 0;
            var internalFormat = options.internalFormat || options.format || RGBA;
            var formatType = getFormatAndTypeForInternalFormat(internalFormat);
            var format = options.format || formatType.format;
            var type = options.type || UNSIGNED_BYTE;
            var target = options.target || TEXTURE_2D;
            if (target !== TEXTURE_CUBE_MAP) {
              throw "target must be TEXTURE_CUBE_MAP";
            }
            setTextureTo1PixelColor(gl3, tex, options);
            options = Object.assign({}, options);
            var numToLoad = 6;
            var errors = [];
            var faces = getCubeFaceOrder(gl3, options);
            var imgs;
            function uploadImg(faceTarget) {
              return function(err, img) {
                --numToLoad;
                if (err) {
                  errors.push(err);
                } else {
                  if (img.width !== img.height) {
                    errors.push("cubemap face img is not a square: " + img.src);
                  } else {
                    setPackState(gl3, options);
                    gl3.bindTexture(target, tex);
                    if (numToLoad === 5) {
                      getCubeFaceOrder(gl3).forEach(function(otherTarget) {
                        gl3.texImage2D(otherTarget, level, internalFormat, format, type, img);
                      });
                    } else {
                      gl3.texImage2D(faceTarget, level, internalFormat, format, type, img);
                    }
                    if (shouldAutomaticallySetTextureFilteringForSize(options)) {
                      gl3.generateMipmap(target);
                    }
                  }
                }
                if (numToLoad === 0) {
                  callback(errors.length ? errors : void 0, tex, imgs);
                }
              };
            }
            imgs = urls.map(function(url, ndx) {
              return loadAndUseImage(url, options.crossOrigin, uploadImg(faces[ndx]));
            });
          }
          function loadSlicesFromUrls(gl3, tex, options, callback) {
            callback = callback || noop;
            var urls = options.src;
            var internalFormat = options.internalFormat || options.format || RGBA;
            var formatType = getFormatAndTypeForInternalFormat(internalFormat);
            var format = options.format || formatType.format;
            var type = options.type || UNSIGNED_BYTE;
            var target = options.target || TEXTURE_2D_ARRAY;
            if (target !== TEXTURE_3D && target !== TEXTURE_2D_ARRAY) {
              throw "target must be TEXTURE_3D or TEXTURE_2D_ARRAY";
            }
            setTextureTo1PixelColor(gl3, tex, options);
            options = Object.assign({}, options);
            var numToLoad = urls.length;
            var errors = [];
            var imgs;
            var level = options.level || 0;
            var width = options.width;
            var height = options.height;
            var depth = urls.length;
            var firstImage = true;
            function uploadImg(slice) {
              return function(err, img) {
                --numToLoad;
                if (err) {
                  errors.push(err);
                } else {
                  setPackState(gl3, options);
                  gl3.bindTexture(target, tex);
                  if (firstImage) {
                    firstImage = false;
                    width = options.width || img.width;
                    height = options.height || img.height;
                    gl3.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, null);
                    for (var s = 0; s < depth; ++s) {
                      gl3.texSubImage3D(target, level, 0, 0, s, width, height, 1, format, type, img);
                    }
                  } else {
                    var src = img;
                    var ctx;
                    if (img.width !== width || img.height !== height) {
                      ctx = getShared2DContext();
                      src = ctx.canvas;
                      ctx.canvas.width = width;
                      ctx.canvas.height = height;
                      ctx.drawImage(img, 0, 0, width, height);
                    }
                    gl3.texSubImage3D(target, level, 0, 0, slice, width, height, 1, format, type, src);
                    if (ctx && src === ctx.canvas) {
                      ctx.canvas.width = 0;
                      ctx.canvas.height = 0;
                    }
                  }
                  if (shouldAutomaticallySetTextureFilteringForSize(options)) {
                    gl3.generateMipmap(target);
                  }
                }
                if (numToLoad === 0) {
                  callback(errors.length ? errors : void 0, tex, imgs);
                }
              };
            }
            imgs = urls.map(function(url, ndx) {
              return loadAndUseImage(url, options.crossOrigin, uploadImg(ndx));
            });
          }
          function setTextureFromArray(gl3, tex, src, options) {
            options = options || defaults.textureOptions;
            var target = options.target || TEXTURE_2D;
            gl3.bindTexture(target, tex);
            var width = options.width;
            var height = options.height;
            var depth = options.depth;
            var level = options.level || 0;
            var internalFormat = options.internalFormat || options.format || RGBA;
            var formatType = getFormatAndTypeForInternalFormat(internalFormat);
            var format = options.format || formatType.format;
            var type = options.type || getTextureTypeForArrayType(gl3, src, formatType.type);
            if (!isArrayBuffer(src)) {
              var Type = typedArrays.getTypedArrayTypeForGLType(type);
              src = new Type(src);
            } else if (src instanceof Uint8ClampedArray) {
              src = new Uint8Array(src.buffer);
            }
            var bytesPerElement = getBytesPerElementForInternalFormat(internalFormat, type);
            var numElements = src.byteLength / bytesPerElement;
            if (numElements % 1) {
              throw "length wrong size for format: " + utils.glEnumToString(gl3, format);
            }
            var dimensions;
            if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) {
              if (!width && !height && !depth) {
                var size = Math.cbrt(numElements);
                if (size % 1 !== 0) {
                  throw "can't guess cube size of array of numElements: " + numElements;
                }
                width = size;
                height = size;
                depth = size;
              } else if (width && (!height || !depth)) {
                dimensions = guessDimensions(gl3, target, height, depth, numElements / width);
                height = dimensions.width;
                depth = dimensions.height;
              } else if (height && (!width || !depth)) {
                dimensions = guessDimensions(gl3, target, width, depth, numElements / height);
                width = dimensions.width;
                depth = dimensions.height;
              } else {
                dimensions = guessDimensions(gl3, target, width, height, numElements / depth);
                width = dimensions.width;
                height = dimensions.height;
              }
            } else {
              dimensions = guessDimensions(gl3, target, width, height, numElements);
              width = dimensions.width;
              height = dimensions.height;
            }
            setSkipStateToDefault(gl3);
            gl3.pixelStorei(UNPACK_ALIGNMENT, options.unpackAlignment || 1);
            setPackState(gl3, options);
            if (target === TEXTURE_CUBE_MAP) {
              var elementsPerElement = bytesPerElement / src.BYTES_PER_ELEMENT;
              var faceSize = numElements / 6 * elementsPerElement;
              getCubeFacesWithNdx(gl3, options).forEach(function(f2) {
                var offset = faceSize * f2.ndx;
                var data = src.subarray(offset, offset + faceSize);
                gl3.texImage2D(f2.face, level, internalFormat, width, height, 0, format, type, data);
              });
            } else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) {
              gl3.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, src);
            } else {
              gl3.texImage2D(target, level, internalFormat, width, height, 0, format, type, src);
            }
            return {
              width,
              height,
              depth,
              type
            };
          }
          function setEmptyTexture(gl3, tex, options) {
            var target = options.target || TEXTURE_2D;
            gl3.bindTexture(target, tex);
            var level = options.level || 0;
            var internalFormat = options.internalFormat || options.format || RGBA;
            var formatType = getFormatAndTypeForInternalFormat(internalFormat);
            var format = options.format || formatType.format;
            var type = options.type || formatType.type;
            setPackState(gl3, options);
            if (target === TEXTURE_CUBE_MAP) {
              for (var ii = 0; ii < 6; ++ii) {
                gl3.texImage2D(TEXTURE_CUBE_MAP_POSITIVE_X + ii, level, internalFormat, options.width, options.height, 0, format, type, null);
              }
            } else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) {
              gl3.texImage3D(target, level, internalFormat, options.width, options.height, options.depth, 0, format, type, null);
            } else {
              gl3.texImage2D(target, level, internalFormat, options.width, options.height, 0, format, type, null);
            }
          }
          function createTexture(gl3, options, callback) {
            callback = callback || noop;
            options = options || defaults.textureOptions;
            var tex = gl3.createTexture();
            var target = options.target || TEXTURE_2D;
            var width = options.width || 1;
            var height = options.height || 1;
            var internalFormat = options.internalFormat || RGBA;
            gl3.bindTexture(target, tex);
            if (target === TEXTURE_CUBE_MAP) {
              gl3.texParameteri(target, TEXTURE_WRAP_S, CLAMP_TO_EDGE);
              gl3.texParameteri(target, TEXTURE_WRAP_T, CLAMP_TO_EDGE);
            }
            var src = options.src;
            if (src) {
              if (typeof src === "function") {
                src = src(gl3, options);
              }
              if (typeof src === "string") {
                loadTextureFromUrl(gl3, tex, options, callback);
              } else if (isArrayBuffer(src) || Array.isArray(src) && (typeof src[0] === "number" || Array.isArray(src[0]) || isArrayBuffer(src[0]))) {
                var dimensions = setTextureFromArray(gl3, tex, src, options);
                width = dimensions.width;
                height = dimensions.height;
              } else if (Array.isArray(src) && (typeof src[0] === "string" || isTexImageSource(src[0]))) {
                if (target === TEXTURE_CUBE_MAP) {
                  loadCubemapFromUrls(gl3, tex, options, callback);
                } else {
                  loadSlicesFromUrls(gl3, tex, options, callback);
                }
              } else {
                setTextureFromElement(gl3, tex, src, options);
                width = src.width;
                height = src.height;
              }
            } else {
              setEmptyTexture(gl3, tex, options);
            }
            if (shouldAutomaticallySetTextureFilteringForSize(options)) {
              setTextureFilteringForSize(gl3, tex, options, width, height, internalFormat);
            }
            setTextureParameters(gl3, tex, options);
            return tex;
          }
          function resizeTexture(gl3, tex, options, width, height, depth) {
            width = width || options.width;
            height = height || options.height;
            depth = depth || options.depth;
            var target = options.target || TEXTURE_2D;
            gl3.bindTexture(target, tex);
            var level = options.level || 0;
            var internalFormat = options.internalFormat || options.format || RGBA;
            var formatType = getFormatAndTypeForInternalFormat(internalFormat);
            var format = options.format || formatType.format;
            var type;
            var src = options.src;
            if (!src) {
              type = options.type || formatType.type;
            } else if (isArrayBuffer(src) || Array.isArray(src) && typeof src[0] === "number") {
              type = options.type || getTextureTypeForArrayType(gl3, src, formatType.type);
            } else {
              type = options.type || formatType.type;
            }
            if (target === TEXTURE_CUBE_MAP) {
              for (var ii = 0; ii < 6; ++ii) {
                gl3.texImage2D(TEXTURE_CUBE_MAP_POSITIVE_X + ii, level, internalFormat, width, height, 0, format, type, null);
              }
            } else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) {
              gl3.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, null);
            } else {
              gl3.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);
            }
          }
          function isAsyncSrc(src) {
            return typeof src === "string" || Array.isArray(src) && typeof src[0] === "string";
          }
          function createTextures(gl3, textureOptions, callback) {
            callback = callback || noop;
            var numDownloading = 0;
            var errors = [];
            var textures = {};
            var images = {};
            function callCallbackIfReady() {
              if (numDownloading === 0) {
                setTimeout(function() {
                  callback(errors.length ? errors : void 0, textures, images);
                }, 0);
              }
            }
            Object.keys(textureOptions).forEach(function(name) {
              var options = textureOptions[name];
              var onLoadFn;
              if (isAsyncSrc(options.src)) {
                onLoadFn = function onLoadFn2(err, tex, img) {
                  images[name] = img;
                  --numDownloading;
                  if (err) {
                    errors.push(err);
                  }
                  callCallbackIfReady();
                };
                ++numDownloading;
              }
              textures[name] = createTexture(gl3, options, onLoadFn);
            });
            callCallbackIfReady();
            return textures;
          }
        },
        "./src/twgl-full.js": function(module2, exports2, __webpack_require__) {
          "use strict";
          function _typeof(obj) {
            "@babel/helpers - typeof";
            if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
              _typeof = function _typeof2(obj2) {
                return typeof obj2;
              };
            } else {
              _typeof = function _typeof2(obj2) {
                return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
              };
            }
            return _typeof(obj);
          }
          exports2.__esModule = true;
          var _exportNames = {
            m4: true,
            v3: true,
            primitives: true
          };
          exports2.primitives = exports2.v3 = exports2.m4 = void 0;
          var m4 = _interopRequireWildcard(__webpack_require__("./src/m4.js"));
          exports2.m4 = m4;
          var v3 = _interopRequireWildcard(__webpack_require__("./src/v3.js"));
          exports2.v3 = v3;
          var primitives = _interopRequireWildcard(__webpack_require__("./src/primitives.js"));
          exports2.primitives = primitives;
          var _twgl = __webpack_require__("./src/twgl.js");
          Object.keys(_twgl).forEach(function(key) {
            if (key === "default" || key === "__esModule")
              return;
            if (Object.prototype.hasOwnProperty.call(_exportNames, key))
              return;
            exports2[key] = _twgl[key];
          });
          function _getRequireWildcardCache() {
            if (typeof WeakMap !== "function")
              return null;
            var cache = new WeakMap();
            _getRequireWildcardCache = function _getRequireWildcardCache2() {
              return cache;
            };
            return cache;
          }
          function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
              return obj;
            }
            if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
              return {default: obj};
            }
            var cache = _getRequireWildcardCache();
            if (cache && cache.has(obj)) {
              return cache.get(obj);
            }
            var newObj = {};
            var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) {
                var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                if (desc && (desc.get || desc.set)) {
                  Object.defineProperty(newObj, key, desc);
                } else {
                  newObj[key] = obj[key];
                }
              }
            }
            newObj["default"] = obj;
            if (cache) {
              cache.set(obj, newObj);
            }
            return newObj;
          }
        },
        "./src/twgl.js": function(module2, exports2, __webpack_require__) {
          "use strict";
          function _typeof(obj) {
            "@babel/helpers - typeof";
            if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
              _typeof = function _typeof2(obj2) {
                return typeof obj2;
              };
            } else {
              _typeof = function _typeof2(obj2) {
                return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
              };
            }
            return _typeof(obj);
          }
          exports2.__esModule = true;
          var _exportNames = {
            addExtensionsToContext: true,
            getContext: true,
            getWebGLContext: true,
            resizeCanvasToDisplaySize: true,
            setDefaults: true,
            attributes: true,
            textures: true,
            utils: true,
            draw: true,
            framebuffers: true,
            programs: true,
            typedarrays: true,
            vertexArrays: true
          };
          exports2.addExtensionsToContext = addExtensionsToContext;
          exports2.getContext = getContext;
          exports2.getWebGLContext = getWebGLContext;
          exports2.resizeCanvasToDisplaySize = resizeCanvasToDisplaySize;
          exports2.setDefaults = setDefaults;
          exports2.vertexArrays = exports2.typedarrays = exports2.programs = exports2.framebuffers = exports2.draw = exports2.utils = exports2.textures = exports2.attributes = void 0;
          var attributes = _interopRequireWildcard(__webpack_require__("./src/attributes.js"));
          exports2.attributes = attributes;
          Object.keys(attributes).forEach(function(key) {
            if (key === "default" || key === "__esModule")
              return;
            if (Object.prototype.hasOwnProperty.call(_exportNames, key))
              return;
            exports2[key] = attributes[key];
          });
          var textures = _interopRequireWildcard(__webpack_require__("./src/textures.js"));
          exports2.textures = textures;
          Object.keys(textures).forEach(function(key) {
            if (key === "default" || key === "__esModule")
              return;
            if (Object.prototype.hasOwnProperty.call(_exportNames, key))
              return;
            exports2[key] = textures[key];
          });
          var helper = _interopRequireWildcard(__webpack_require__("./src/helper.js"));
          var utils = _interopRequireWildcard(__webpack_require__("./src/utils.js"));
          exports2.utils = utils;
          Object.keys(utils).forEach(function(key) {
            if (key === "default" || key === "__esModule")
              return;
            if (Object.prototype.hasOwnProperty.call(_exportNames, key))
              return;
            exports2[key] = utils[key];
          });
          var draw2 = _interopRequireWildcard(__webpack_require__("./src/draw.js"));
          exports2.draw = draw2;
          Object.keys(draw2).forEach(function(key) {
            if (key === "default" || key === "__esModule")
              return;
            if (Object.prototype.hasOwnProperty.call(_exportNames, key))
              return;
            exports2[key] = draw2[key];
          });
          var framebuffers = _interopRequireWildcard(__webpack_require__("./src/framebuffers.js"));
          exports2.framebuffers = framebuffers;
          Object.keys(framebuffers).forEach(function(key) {
            if (key === "default" || key === "__esModule")
              return;
            if (Object.prototype.hasOwnProperty.call(_exportNames, key))
              return;
            exports2[key] = framebuffers[key];
          });
          var programs = _interopRequireWildcard(__webpack_require__("./src/programs.js"));
          exports2.programs = programs;
          Object.keys(programs).forEach(function(key) {
            if (key === "default" || key === "__esModule")
              return;
            if (Object.prototype.hasOwnProperty.call(_exportNames, key))
              return;
            exports2[key] = programs[key];
          });
          var typedarrays = _interopRequireWildcard(__webpack_require__("./src/typedarrays.js"));
          exports2.typedarrays = typedarrays;
          Object.keys(typedarrays).forEach(function(key) {
            if (key === "default" || key === "__esModule")
              return;
            if (Object.prototype.hasOwnProperty.call(_exportNames, key))
              return;
            exports2[key] = typedarrays[key];
          });
          var vertexArrays = _interopRequireWildcard(__webpack_require__("./src/vertex-arrays.js"));
          exports2.vertexArrays = vertexArrays;
          Object.keys(vertexArrays).forEach(function(key) {
            if (key === "default" || key === "__esModule")
              return;
            if (Object.prototype.hasOwnProperty.call(_exportNames, key))
              return;
            exports2[key] = vertexArrays[key];
          });
          function _getRequireWildcardCache() {
            if (typeof WeakMap !== "function")
              return null;
            var cache = new WeakMap();
            _getRequireWildcardCache = function _getRequireWildcardCache2() {
              return cache;
            };
            return cache;
          }
          function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
              return obj;
            }
            if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
              return {default: obj};
            }
            var cache = _getRequireWildcardCache();
            if (cache && cache.has(obj)) {
              return cache.get(obj);
            }
            var newObj = {};
            var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) {
                var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                if (desc && (desc.get || desc.set)) {
                  Object.defineProperty(newObj, key, desc);
                } else {
                  newObj[key] = obj[key];
                }
              }
            }
            newObj["default"] = obj;
            if (cache) {
              cache.set(obj, newObj);
            }
            return newObj;
          }
          var gl2 = void 0;
          var defaults = {
            addExtensionsToContext: true
          };
          function setDefaults(newDefaults) {
            helper.copyExistingProperties(newDefaults, defaults);
            attributes.setAttributeDefaults_(newDefaults);
            textures.setTextureDefaults_(newDefaults);
          }
          var prefixRE = /^(.*?)_/;
          function addExtensionToContext(gl3, extensionName) {
            utils.glEnumToString(gl3, 0);
            var ext = gl3.getExtension(extensionName);
            if (ext) {
              var enums = {};
              var fnSuffix = prefixRE.exec(extensionName)[1];
              var enumSuffix = "_" + fnSuffix;
              for (var key in ext) {
                var value = ext[key];
                var isFunc = typeof value === "function";
                var suffix = isFunc ? fnSuffix : enumSuffix;
                var name = key;
                if (key.endsWith(suffix)) {
                  name = key.substring(0, key.length - suffix.length);
                }
                if (gl3[name] !== void 0) {
                  if (!isFunc && gl3[name] !== value) {
                    helper.warn(name, gl3[name], value, key);
                  }
                } else {
                  if (isFunc) {
                    gl3[name] = function(origFn) {
                      return function() {
                        return origFn.apply(ext, arguments);
                      };
                    }(value);
                  } else {
                    gl3[name] = value;
                    enums[name] = value;
                  }
                }
              }
              enums.constructor = {
                name: ext.constructor.name
              };
              utils.glEnumToString(enums, 0);
            }
            return ext;
          }
          var supportedExtensions = ["ANGLE_instanced_arrays", "EXT_blend_minmax", "EXT_color_buffer_float", "EXT_color_buffer_half_float", "EXT_disjoint_timer_query", "EXT_disjoint_timer_query_webgl2", "EXT_frag_depth", "EXT_sRGB", "EXT_shader_texture_lod", "EXT_texture_filter_anisotropic", "OES_element_index_uint", "OES_standard_derivatives", "OES_texture_float", "OES_texture_float_linear", "OES_texture_half_float", "OES_texture_half_float_linear", "OES_vertex_array_object", "WEBGL_color_buffer_float", "WEBGL_compressed_texture_atc", "WEBGL_compressed_texture_etc1", "WEBGL_compressed_texture_pvrtc", "WEBGL_compressed_texture_s3tc", "WEBGL_compressed_texture_s3tc_srgb", "WEBGL_depth_texture", "WEBGL_draw_buffers"];
          function addExtensionsToContext(gl3) {
            for (var ii = 0; ii < supportedExtensions.length; ++ii) {
              addExtensionToContext(gl3, supportedExtensions[ii]);
            }
          }
          function create3DContext(canvas2, opt_attribs) {
            var names = ["webgl", "experimental-webgl"];
            var context = null;
            for (var ii = 0; ii < names.length; ++ii) {
              context = canvas2.getContext(names[ii], opt_attribs);
              if (context) {
                if (defaults.addExtensionsToContext) {
                  addExtensionsToContext(context);
                }
                break;
              }
            }
            return context;
          }
          function getWebGLContext(canvas2, opt_attribs) {
            var gl3 = create3DContext(canvas2, opt_attribs);
            return gl3;
          }
          function createContext(canvas2, opt_attribs) {
            var names = ["webgl2", "webgl", "experimental-webgl"];
            var context = null;
            for (var ii = 0; ii < names.length; ++ii) {
              context = canvas2.getContext(names[ii], opt_attribs);
              if (context) {
                if (defaults.addExtensionsToContext) {
                  addExtensionsToContext(context);
                }
                break;
              }
            }
            return context;
          }
          function getContext(canvas2, opt_attribs) {
            var gl3 = createContext(canvas2, opt_attribs);
            return gl3;
          }
          function resizeCanvasToDisplaySize(canvas2, multiplier) {
            multiplier = multiplier || 1;
            multiplier = Math.max(0, multiplier);
            var width = canvas2.clientWidth * multiplier | 0;
            var height = canvas2.clientHeight * multiplier | 0;
            if (canvas2.width !== width || canvas2.height !== height) {
              canvas2.width = width;
              canvas2.height = height;
              return true;
            }
            return false;
          }
        },
        "./src/typedarrays.js": function(module2, exports2, __webpack_require__) {
          "use strict";
          exports2.__esModule = true;
          exports2.getGLTypeForTypedArray = getGLTypeForTypedArray;
          exports2.getGLTypeForTypedArrayType = getGLTypeForTypedArrayType;
          exports2.getTypedArrayTypeForGLType = getTypedArrayTypeForGLType;
          exports2.isArrayBuffer = void 0;
          var gl2 = void 0;
          var BYTE = 5120;
          var UNSIGNED_BYTE = 5121;
          var SHORT = 5122;
          var UNSIGNED_SHORT = 5123;
          var INT = 5124;
          var UNSIGNED_INT = 5125;
          var FLOAT = 5126;
          var UNSIGNED_SHORT_4_4_4_4 = 32819;
          var UNSIGNED_SHORT_5_5_5_1 = 32820;
          var UNSIGNED_SHORT_5_6_5 = 33635;
          var HALF_FLOAT = 5131;
          var UNSIGNED_INT_2_10_10_10_REV = 33640;
          var UNSIGNED_INT_10F_11F_11F_REV = 35899;
          var UNSIGNED_INT_5_9_9_9_REV = 35902;
          var FLOAT_32_UNSIGNED_INT_24_8_REV = 36269;
          var UNSIGNED_INT_24_8 = 34042;
          var glTypeToTypedArray = {};
          {
            var tt = glTypeToTypedArray;
            tt[BYTE] = Int8Array;
            tt[UNSIGNED_BYTE] = Uint8Array;
            tt[SHORT] = Int16Array;
            tt[UNSIGNED_SHORT] = Uint16Array;
            tt[INT] = Int32Array;
            tt[UNSIGNED_INT] = Uint32Array;
            tt[FLOAT] = Float32Array;
            tt[UNSIGNED_SHORT_4_4_4_4] = Uint16Array;
            tt[UNSIGNED_SHORT_5_5_5_1] = Uint16Array;
            tt[UNSIGNED_SHORT_5_6_5] = Uint16Array;
            tt[HALF_FLOAT] = Uint16Array;
            tt[UNSIGNED_INT_2_10_10_10_REV] = Uint32Array;
            tt[UNSIGNED_INT_10F_11F_11F_REV] = Uint32Array;
            tt[UNSIGNED_INT_5_9_9_9_REV] = Uint32Array;
            tt[FLOAT_32_UNSIGNED_INT_24_8_REV] = Uint32Array;
            tt[UNSIGNED_INT_24_8] = Uint32Array;
          }
          function getGLTypeForTypedArray(typedArray) {
            if (typedArray instanceof Int8Array) {
              return BYTE;
            }
            if (typedArray instanceof Uint8Array) {
              return UNSIGNED_BYTE;
            }
            if (typedArray instanceof Uint8ClampedArray) {
              return UNSIGNED_BYTE;
            }
            if (typedArray instanceof Int16Array) {
              return SHORT;
            }
            if (typedArray instanceof Uint16Array) {
              return UNSIGNED_SHORT;
            }
            if (typedArray instanceof Int32Array) {
              return INT;
            }
            if (typedArray instanceof Uint32Array) {
              return UNSIGNED_INT;
            }
            if (typedArray instanceof Float32Array) {
              return FLOAT;
            }
            throw new Error("unsupported typed array type");
          }
          function getGLTypeForTypedArrayType(typedArrayType) {
            if (typedArrayType === Int8Array) {
              return BYTE;
            }
            if (typedArrayType === Uint8Array) {
              return UNSIGNED_BYTE;
            }
            if (typedArrayType === Uint8ClampedArray) {
              return UNSIGNED_BYTE;
            }
            if (typedArrayType === Int16Array) {
              return SHORT;
            }
            if (typedArrayType === Uint16Array) {
              return UNSIGNED_SHORT;
            }
            if (typedArrayType === Int32Array) {
              return INT;
            }
            if (typedArrayType === Uint32Array) {
              return UNSIGNED_INT;
            }
            if (typedArrayType === Float32Array) {
              return FLOAT;
            }
            throw new Error("unsupported typed array type");
          }
          function getTypedArrayTypeForGLType(type) {
            var CTOR = glTypeToTypedArray[type];
            if (!CTOR) {
              throw new Error("unknown gl type");
            }
            return CTOR;
          }
          var isArrayBuffer = typeof SharedArrayBuffer !== "undefined" ? function isArrayBufferOrSharedArrayBuffer(a) {
            return a && a.buffer && (a.buffer instanceof ArrayBuffer || a.buffer instanceof SharedArrayBuffer);
          } : function isArrayBuffer2(a) {
            return a && a.buffer && a.buffer instanceof ArrayBuffer;
          };
          exports2.isArrayBuffer = isArrayBuffer;
        },
        "./src/utils.js": function(module2, exports2, __webpack_require__) {
          "use strict";
          exports2.__esModule = true;
          exports2.isWebGL1 = isWebGL1;
          exports2.isWebGL2 = isWebGL2;
          exports2.glEnumToString = void 0;
          function isWebGL2(gl2) {
            return !!gl2.texStorage2D;
          }
          function isWebGL1(gl2) {
            return !gl2.texStorage2D;
          }
          var glEnumToString = function() {
            var haveEnumsForType = {};
            var enums = {};
            function addEnums(gl2) {
              var type = gl2.constructor.name;
              if (!haveEnumsForType[type]) {
                for (var key in gl2) {
                  if (typeof gl2[key] === "number") {
                    var existing = enums[gl2[key]];
                    enums[gl2[key]] = existing ? "".concat(existing, " | ").concat(key) : key;
                  }
                }
                haveEnumsForType[type] = true;
              }
            }
            return function glEnumToString2(gl2, value) {
              addEnums(gl2);
              return enums[value] || (typeof value === "number" ? "0x".concat(value.toString(16)) : value);
            };
          }();
          exports2.glEnumToString = glEnumToString;
        },
        "./src/v3.js": function(module2, exports2, __webpack_require__) {
          "use strict";
          exports2.__esModule = true;
          exports2.add = add;
          exports2.copy = copy;
          exports2.create = create;
          exports2.cross = cross;
          exports2.distance = distance;
          exports2.distanceSq = distanceSq;
          exports2.divide = divide;
          exports2.divScalar = divScalar;
          exports2.dot = dot;
          exports2.lerp = lerp;
          exports2.lerpV = lerpV;
          exports2.length = length2;
          exports2.lengthSq = lengthSq;
          exports2.max = max;
          exports2.min = min;
          exports2.mulScalar = mulScalar;
          exports2.multiply = multiply;
          exports2.negate = negate;
          exports2.normalize = normalize;
          exports2.setDefaultType = setDefaultType;
          exports2.subtract = subtract;
          var VecType = Float32Array;
          function setDefaultType(ctor) {
            var oldType = VecType;
            VecType = ctor;
            return oldType;
          }
          function create(x, y, z) {
            var dst = new VecType(3);
            if (x) {
              dst[0] = x;
            }
            if (y) {
              dst[1] = y;
            }
            if (z) {
              dst[2] = z;
            }
            return dst;
          }
          function add(a, b, dst) {
            dst = dst || new VecType(3);
            dst[0] = a[0] + b[0];
            dst[1] = a[1] + b[1];
            dst[2] = a[2] + b[2];
            return dst;
          }
          function subtract(a, b, dst) {
            dst = dst || new VecType(3);
            dst[0] = a[0] - b[0];
            dst[1] = a[1] - b[1];
            dst[2] = a[2] - b[2];
            return dst;
          }
          function lerp(a, b, t, dst) {
            dst = dst || new VecType(3);
            dst[0] = a[0] + t * (b[0] - a[0]);
            dst[1] = a[1] + t * (b[1] - a[1]);
            dst[2] = a[2] + t * (b[2] - a[2]);
            return dst;
          }
          function lerpV(a, b, t, dst) {
            dst = dst || new VecType(3);
            dst[0] = a[0] + t[0] * (b[0] - a[0]);
            dst[1] = a[1] + t[1] * (b[1] - a[1]);
            dst[2] = a[2] + t[2] * (b[2] - a[2]);
            return dst;
          }
          function max(a, b, dst) {
            dst = dst || new VecType(3);
            dst[0] = Math.max(a[0], b[0]);
            dst[1] = Math.max(a[1], b[1]);
            dst[2] = Math.max(a[2], b[2]);
            return dst;
          }
          function min(a, b, dst) {
            dst = dst || new VecType(3);
            dst[0] = Math.min(a[0], b[0]);
            dst[1] = Math.min(a[1], b[1]);
            dst[2] = Math.min(a[2], b[2]);
            return dst;
          }
          function mulScalar(v, k, dst) {
            dst = dst || new VecType(3);
            dst[0] = v[0] * k;
            dst[1] = v[1] * k;
            dst[2] = v[2] * k;
            return dst;
          }
          function divScalar(v, k, dst) {
            dst = dst || new VecType(3);
            dst[0] = v[0] / k;
            dst[1] = v[1] / k;
            dst[2] = v[2] / k;
            return dst;
          }
          function cross(a, b, dst) {
            dst = dst || new VecType(3);
            var t1 = a[2] * b[0] - a[0] * b[2];
            var t2 = a[0] * b[1] - a[1] * b[0];
            dst[0] = a[1] * b[2] - a[2] * b[1];
            dst[1] = t1;
            dst[2] = t2;
            return dst;
          }
          function dot(a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
          }
          function length2(v) {
            return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
          }
          function lengthSq(v) {
            return v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
          }
          function distance(a, b) {
            var dx = a[0] - b[0];
            var dy = a[1] - b[1];
            var dz = a[2] - b[2];
            return Math.sqrt(dx * dx + dy * dy + dz * dz);
          }
          function distanceSq(a, b) {
            var dx = a[0] - b[0];
            var dy = a[1] - b[1];
            var dz = a[2] - b[2];
            return dx * dx + dy * dy + dz * dz;
          }
          function normalize(a, dst) {
            dst = dst || new VecType(3);
            var lenSq = a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
            var len = Math.sqrt(lenSq);
            if (len > 1e-5) {
              dst[0] = a[0] / len;
              dst[1] = a[1] / len;
              dst[2] = a[2] / len;
            } else {
              dst[0] = 0;
              dst[1] = 0;
              dst[2] = 0;
            }
            return dst;
          }
          function negate(v, dst) {
            dst = dst || new VecType(3);
            dst[0] = -v[0];
            dst[1] = -v[1];
            dst[2] = -v[2];
            return dst;
          }
          function copy(v, dst) {
            dst = dst || new VecType(3);
            dst[0] = v[0];
            dst[1] = v[1];
            dst[2] = v[2];
            return dst;
          }
          function multiply(a, b, dst) {
            dst = dst || new VecType(3);
            dst[0] = a[0] * b[0];
            dst[1] = a[1] * b[1];
            dst[2] = a[2] * b[2];
            return dst;
          }
          function divide(a, b, dst) {
            dst = dst || new VecType(3);
            dst[0] = a[0] / b[0];
            dst[1] = a[1] / b[1];
            dst[2] = a[2] / b[2];
            return dst;
          }
        },
        "./src/vertex-arrays.js": function(module2, exports2, __webpack_require__) {
          "use strict";
          function _typeof(obj) {
            "@babel/helpers - typeof";
            if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
              _typeof = function _typeof2(obj2) {
                return typeof obj2;
              };
            } else {
              _typeof = function _typeof2(obj2) {
                return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
              };
            }
            return _typeof(obj);
          }
          exports2.__esModule = true;
          exports2.createVertexArrayInfo = createVertexArrayInfo;
          exports2.createVAOAndSetAttributes = createVAOAndSetAttributes;
          exports2.createVAOFromBufferInfo = createVAOFromBufferInfo;
          var programs = _interopRequireWildcard(__webpack_require__("./src/programs.js"));
          function _getRequireWildcardCache() {
            if (typeof WeakMap !== "function")
              return null;
            var cache = new WeakMap();
            _getRequireWildcardCache = function _getRequireWildcardCache2() {
              return cache;
            };
            return cache;
          }
          function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
              return obj;
            }
            if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
              return {default: obj};
            }
            var cache = _getRequireWildcardCache();
            if (cache && cache.has(obj)) {
              return cache.get(obj);
            }
            var newObj = {};
            var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) {
                var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                if (desc && (desc.get || desc.set)) {
                  Object.defineProperty(newObj, key, desc);
                } else {
                  newObj[key] = obj[key];
                }
              }
            }
            newObj["default"] = obj;
            if (cache) {
              cache.set(obj, newObj);
            }
            return newObj;
          }
          var ELEMENT_ARRAY_BUFFER = 34963;
          function createVertexArrayInfo(gl2, programInfos, bufferInfo) {
            var vao = gl2.createVertexArray();
            gl2.bindVertexArray(vao);
            if (!programInfos.length) {
              programInfos = [programInfos];
            }
            programInfos.forEach(function(programInfo) {
              programs.setBuffersAndAttributes(gl2, programInfo, bufferInfo);
            });
            gl2.bindVertexArray(null);
            return {
              numElements: bufferInfo.numElements,
              elementType: bufferInfo.elementType,
              vertexArrayObject: vao
            };
          }
          function createVAOAndSetAttributes(gl2, setters, attribs, indices) {
            var vao = gl2.createVertexArray();
            gl2.bindVertexArray(vao);
            programs.setAttributes(setters, attribs);
            if (indices) {
              gl2.bindBuffer(ELEMENT_ARRAY_BUFFER, indices);
            }
            gl2.bindVertexArray(null);
            return vao;
          }
          function createVAOFromBufferInfo(gl2, programInfo, bufferInfo) {
            return createVAOAndSetAttributes(gl2, programInfo.attribSetters || programInfo, bufferInfo.attribs, bufferInfo.indices);
          }
        }
      });
    });
  });

  // node_modules/webmidi/webmidi.min.js
  var require_webmidi_min = __commonJS((exports, module) => {
    !function(scope) {
      "use strict";
      function WebMidi2() {
        if (WebMidi2.prototype._singleton)
          throw new Error("WebMidi is a singleton, it cannot be instantiated directly.");
        (WebMidi2.prototype._singleton = this)._inputs = [], this._outputs = [], this._userHandlers = {}, this._stateChangeQueue = [], this._processingStateChange = false, this._midiInterfaceEvents = ["connected", "disconnected"], this._nrpnBuffer = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []], this._nrpnEventsEnabled = true, this._nrpnTypes = ["entry", "increment", "decrement"], this._notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"], this._semitones = {C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11}, Object.defineProperties(this, {MIDI_SYSTEM_MESSAGES: {value: {sysex: 240, timecode: 241, songposition: 242, songselect: 243, tuningrequest: 246, sysexend: 247, clock: 248, start: 250, continue: 251, stop: 252, activesensing: 254, reset: 255, midimessage: 0, unknownsystemmessage: -1}, writable: false, enumerable: true, configurable: false}, MIDI_CHANNEL_MESSAGES: {value: {noteoff: 8, noteon: 9, keyaftertouch: 10, controlchange: 11, channelmode: 11, nrpn: 11, programchange: 12, channelaftertouch: 13, pitchbend: 14}, writable: false, enumerable: true, configurable: false}, MIDI_REGISTERED_PARAMETER: {value: {pitchbendrange: [0, 0], channelfinetuning: [0, 1], channelcoarsetuning: [0, 2], tuningprogram: [0, 3], tuningbank: [0, 4], modulationrange: [0, 5], azimuthangle: [61, 0], elevationangle: [61, 1], gain: [61, 2], distanceratio: [61, 3], maximumdistance: [61, 4], maximumdistancegain: [61, 5], referencedistanceratio: [61, 6], panspreadangle: [61, 7], rollangle: [61, 8]}, writable: false, enumerable: true, configurable: false}, MIDI_CONTROL_CHANGE_MESSAGES: {value: {bankselectcoarse: 0, modulationwheelcoarse: 1, breathcontrollercoarse: 2, footcontrollercoarse: 4, portamentotimecoarse: 5, dataentrycoarse: 6, volumecoarse: 7, balancecoarse: 8, pancoarse: 10, expressioncoarse: 11, effectcontrol1coarse: 12, effectcontrol2coarse: 13, generalpurposeslider1: 16, generalpurposeslider2: 17, generalpurposeslider3: 18, generalpurposeslider4: 19, bankselectfine: 32, modulationwheelfine: 33, breathcontrollerfine: 34, footcontrollerfine: 36, portamentotimefine: 37, dataentryfine: 38, volumefine: 39, balancefine: 40, panfine: 42, expressionfine: 43, effectcontrol1fine: 44, effectcontrol2fine: 45, holdpedal: 64, portamento: 65, sustenutopedal: 66, softpedal: 67, legatopedal: 68, hold2pedal: 69, soundvariation: 70, resonance: 71, soundreleasetime: 72, soundattacktime: 73, brightness: 74, soundcontrol6: 75, soundcontrol7: 76, soundcontrol8: 77, soundcontrol9: 78, soundcontrol10: 79, generalpurposebutton1: 80, generalpurposebutton2: 81, generalpurposebutton3: 82, generalpurposebutton4: 83, reverblevel: 91, tremololevel: 92, choruslevel: 93, celestelevel: 94, phaserlevel: 95, databuttonincrement: 96, databuttondecrement: 97, nonregisteredparametercoarse: 98, nonregisteredparameterfine: 99, registeredparametercoarse: 100, registeredparameterfine: 101}, writable: false, enumerable: true, configurable: false}, MIDI_NRPN_MESSAGES: {value: {entrymsb: 6, entrylsb: 38, increment: 96, decrement: 97, paramlsb: 98, parammsb: 99, nullactiveparameter: 127}, writable: false, enumerable: true, configurable: false}, MIDI_CHANNEL_MODE_MESSAGES: {value: {allsoundoff: 120, resetallcontrollers: 121, localcontrol: 122, allnotesoff: 123, omnimodeoff: 124, omnimodeon: 125, monomodeon: 126, polymodeon: 127}, writable: false, enumerable: true, configurable: false}, octaveOffset: {value: 0, writable: true, enumerable: true, configurable: false}}), Object.defineProperties(this, {supported: {enumerable: true, get: function() {
          return "requestMIDIAccess" in navigator;
        }}, enabled: {enumerable: true, get: function() {
          return this.interface !== void 0;
        }.bind(this)}, inputs: {enumerable: true, get: function() {
          return this._inputs;
        }.bind(this)}, outputs: {enumerable: true, get: function() {
          return this._outputs;
        }.bind(this)}, sysexEnabled: {enumerable: true, get: function() {
          return !(!this.interface || !this.interface.sysexEnabled);
        }.bind(this)}, nrpnEventsEnabled: {enumerable: true, get: function() {
          return !!this._nrpnEventsEnabled;
        }.bind(this), set: function(enabled) {
          return this._nrpnEventsEnabled = enabled, this._nrpnEventsEnabled;
        }}, nrpnTypes: {enumerable: true, get: function() {
          return this._nrpnTypes;
        }.bind(this)}, time: {enumerable: true, get: function() {
          return performance.now();
        }}});
      }
      var wm = new WebMidi2();
      function Input(midiInput) {
        var that = this;
        this._userHandlers = {channel: {}, system: {}}, this._midiInput = midiInput, Object.defineProperties(this, {connection: {enumerable: true, get: function() {
          return that._midiInput.connection;
        }}, id: {enumerable: true, get: function() {
          return that._midiInput.id;
        }}, manufacturer: {enumerable: true, get: function() {
          return that._midiInput.manufacturer;
        }}, name: {enumerable: true, get: function() {
          return that._midiInput.name;
        }}, state: {enumerable: true, get: function() {
          return that._midiInput.state;
        }}, type: {enumerable: true, get: function() {
          return that._midiInput.type;
        }}}), this._initializeUserHandlers(), this._midiInput.onmidimessage = this._onMidiMessage.bind(this);
      }
      function Output(midiOutput) {
        var that = this;
        this._midiOutput = midiOutput, Object.defineProperties(this, {connection: {enumerable: true, get: function() {
          return that._midiOutput.connection;
        }}, id: {enumerable: true, get: function() {
          return that._midiOutput.id;
        }}, manufacturer: {enumerable: true, get: function() {
          return that._midiOutput.manufacturer;
        }}, name: {enumerable: true, get: function() {
          return that._midiOutput.name;
        }}, state: {enumerable: true, get: function() {
          return that._midiOutput.state;
        }}, type: {enumerable: true, get: function() {
          return that._midiOutput.type;
        }}});
      }
      WebMidi2.prototype.enable = function(callback, sysex) {
        this.enabled || (this.supported ? navigator.requestMIDIAccess({sysex}).then(function(midiAccess) {
          var promiseTimeout, events = [], promises = [];
          this.interface = midiAccess, this._resetInterfaceUserHandlers(), this.interface.onstatechange = function(e) {
            events.push(e);
          };
          for (var inputs = midiAccess.inputs.values(), input = inputs.next(); input && !input.done; input = inputs.next())
            promises.push(input.value.open());
          for (var outputs = midiAccess.outputs.values(), output = outputs.next(); output && !output.done; output = outputs.next())
            promises.push(output.value.open());
          function onPortsOpen() {
            clearTimeout(promiseTimeout), this._updateInputsAndOutputs(), this.interface.onstatechange = this._onInterfaceStateChange.bind(this), typeof callback == "function" && callback.call(this), events.forEach(function(event) {
              this._onInterfaceStateChange(event);
            }.bind(this));
          }
          promiseTimeout = setTimeout(onPortsOpen.bind(this), 200), Promise && Promise.all(promises).catch(function(err) {
          }).then(onPortsOpen.bind(this));
        }.bind(this), function(err) {
          typeof callback == "function" && callback.call(this, err);
        }.bind(this)) : typeof callback == "function" && callback(new Error("The Web MIDI API is not supported by your browser.")));
      }, WebMidi2.prototype.disable = function() {
        if (!this.supported)
          throw new Error("The Web MIDI API is not supported by your browser.");
        this.enabled && (this.removeListener(), this.inputs.forEach(function(input) {
          input.removeListener();
        })), this.interface && (this.interface.onstatechange = void 0), this.interface = void 0, this._inputs = [], this._outputs = [], this._nrpnEventsEnabled = true, this._resetInterfaceUserHandlers();
      }, WebMidi2.prototype.addListener = function(type, listener) {
        if (!this.enabled)
          throw new Error("WebMidi must be enabled before adding event listeners.");
        if (typeof listener != "function")
          throw new TypeError("The 'listener' parameter must be a function.");
        if (!(0 <= this._midiInterfaceEvents.indexOf(type)))
          throw new TypeError("The specified event type is not supported.");
        return this._userHandlers[type].push(listener), this;
      }, WebMidi2.prototype.hasListener = function(type, listener) {
        if (!this.enabled)
          throw new Error("WebMidi must be enabled before checking event listeners.");
        if (typeof listener != "function")
          throw new TypeError("The 'listener' parameter must be a function.");
        if (!(0 <= this._midiInterfaceEvents.indexOf(type)))
          throw new TypeError("The specified event type is not supported.");
        for (var o = 0; o < this._userHandlers[type].length; o++)
          if (this._userHandlers[type][o] === listener)
            return true;
        return false;
      }, WebMidi2.prototype.removeListener = function(type, listener) {
        if (!this.enabled)
          throw new Error("WebMidi must be enabled before removing event listeners.");
        if (listener !== void 0 && typeof listener != "function")
          throw new TypeError("The 'listener' parameter must be a function.");
        if (0 <= this._midiInterfaceEvents.indexOf(type))
          if (listener)
            for (var o = 0; o < this._userHandlers[type].length; o++)
              this._userHandlers[type][o] === listener && this._userHandlers[type].splice(o, 1);
          else
            this._userHandlers[type] = [];
        else {
          if (type !== void 0)
            throw new TypeError("The specified event type is not supported.");
          this._resetInterfaceUserHandlers();
        }
        return this;
      }, WebMidi2.prototype.toMIDIChannels = function(channel) {
        var channels;
        if (channel === "all" || channel === void 0)
          channels = ["all"];
        else {
          if (channel === "none")
            return channels = [];
          channels = Array.isArray(channel) ? channel : [channel];
        }
        return -1 < channels.indexOf("all") && (channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]), channels.map(function(ch) {
          return parseInt(ch);
        }).filter(function(ch) {
          return 1 <= ch && ch <= 16;
        });
      }, WebMidi2.prototype.getInputById = function(id) {
        if (!this.enabled)
          throw new Error("WebMidi is not enabled.");
        id = String(id);
        for (var i = 0; i < this.inputs.length; i++)
          if (this.inputs[i].id === id)
            return this.inputs[i];
        return false;
      }, WebMidi2.prototype.getOutputById = function(id) {
        if (!this.enabled)
          throw new Error("WebMidi is not enabled.");
        id = String(id);
        for (var i = 0; i < this.outputs.length; i++)
          if (this.outputs[i].id === id)
            return this.outputs[i];
        return false;
      }, WebMidi2.prototype.getInputByName = function(name) {
        if (!this.enabled)
          throw new Error("WebMidi is not enabled.");
        for (var i = 0; i < this.inputs.length; i++)
          if (~this.inputs[i].name.indexOf(name))
            return this.inputs[i];
        return false;
      }, WebMidi2.prototype.getOctave = function(number) {
        if (number != null && 0 <= number && number <= 127)
          return Math.floor(Math.floor(number) / 12 - 1) + Math.floor(wm.octaveOffset);
      }, WebMidi2.prototype.getOutputByName = function(name) {
        if (!this.enabled)
          throw new Error("WebMidi is not enabled.");
        for (var i = 0; i < this.outputs.length; i++)
          if (~this.outputs[i].name.indexOf(name))
            return this.outputs[i];
        return false;
      }, WebMidi2.prototype.guessNoteNumber = function(input) {
        var output = false;
        if (input && input.toFixed && 0 <= input && input <= 127 ? output = Math.round(input) : 0 <= parseInt(input) && parseInt(input) <= 127 ? output = parseInt(input) : (typeof input == "string" || input instanceof String) && (output = this.noteNameToNumber(input)), output === false)
          throw new Error("Invalid input value (" + input + ").");
        return output;
      }, WebMidi2.prototype.noteNameToNumber = function(name) {
        typeof name != "string" && (name = "");
        var matches = name.match(/([CDEFGAB])(#{0,2}|b{0,2})(-?\d+)/i);
        if (!matches)
          throw new RangeError("Invalid note name.");
        var semitones = wm._semitones[matches[1].toUpperCase()], result = 12 * (parseInt(matches[3]) + 1 - Math.floor(wm.octaveOffset)) + semitones;
        if (-1 < matches[2].toLowerCase().indexOf("b") ? result -= matches[2].length : -1 < matches[2].toLowerCase().indexOf("#") && (result += matches[2].length), result < 0 || 127 < result)
          throw new RangeError("Invalid note name or note outside valid range.");
        return result;
      }, WebMidi2.prototype._updateInputsAndOutputs = function() {
        this._updateInputs(), this._updateOutputs();
      }, WebMidi2.prototype._updateInputs = function() {
        for (var i = 0; i < this._inputs.length; i++) {
          for (var remove = true, updated = this.interface.inputs.values(), input = updated.next(); input && !input.done; input = updated.next())
            if (this._inputs[i]._midiInput === input.value) {
              remove = false;
              break;
            }
          remove && this._inputs.splice(i, 1);
        }
        this.interface && this.interface.inputs.forEach(function(nInput) {
          for (var add = true, j = 0; j < this._inputs.length; j++)
            this._inputs[j]._midiInput === nInput && (add = false);
          add && this._inputs.push(new Input(nInput));
        }.bind(this));
      }, WebMidi2.prototype._updateOutputs = function() {
        for (var i = 0; i < this._outputs.length; i++) {
          for (var remove = true, updated = this.interface.outputs.values(), output = updated.next(); output && !output.done; output = updated.next())
            if (this._outputs[i]._midiOutput === output.value) {
              remove = false;
              break;
            }
          remove && this._outputs.splice(i, 1);
        }
        this.interface && this.interface.outputs.forEach(function(nOutput) {
          for (var add = true, j = 0; j < this._outputs.length; j++)
            this._outputs[j]._midiOutput === nOutput && (add = false);
          add && this._outputs.push(new Output(nOutput));
        }.bind(this));
      }, WebMidi2.prototype._onInterfaceStateChange = function(e) {
        this._updateInputsAndOutputs();
        var event = {timestamp: e.timeStamp, type: e.port.state};
        this.interface && e.port.state === "connected" ? e.port.type === "output" ? event.port = this.getOutputById(e.port.id) : e.port.type === "input" && (event.port = this.getInputById(e.port.id)) : event.port = {connection: "closed", id: e.port.id, manufacturer: e.port.manufacturer, name: e.port.name, state: e.port.state, type: e.port.type}, this._userHandlers[e.port.state].forEach(function(handler) {
          handler(event);
        });
      }, WebMidi2.prototype._resetInterfaceUserHandlers = function() {
        for (var i = 0; i < this._midiInterfaceEvents.length; i++)
          this._userHandlers[this._midiInterfaceEvents[i]] = [];
      }, Input.prototype.on = Input.prototype.addListener = function(type, channel, listener) {
        var that = this;
        if (channel === void 0 && (channel = "all"), Array.isArray(channel) || (channel = [channel]), channel.forEach(function(item) {
          if (item !== "all" && !(1 <= item && item <= 16))
            throw new RangeError("The 'channel' parameter is invalid.");
        }), typeof listener != "function")
          throw new TypeError("The 'listener' parameter must be a function.");
        if (wm.MIDI_SYSTEM_MESSAGES[type] !== void 0)
          this._userHandlers.system[type] || (this._userHandlers.system[type] = []), this._userHandlers.system[type].push(listener);
        else {
          if (wm.MIDI_CHANNEL_MESSAGES[type] === void 0)
            throw new TypeError("The specified event type is not supported.");
          if (-1 < channel.indexOf("all")) {
            channel = [];
            for (var j = 1; j <= 16; j++)
              channel.push(j);
          }
          this._userHandlers.channel[type] || (this._userHandlers.channel[type] = []), channel.forEach(function(ch) {
            that._userHandlers.channel[type][ch] || (that._userHandlers.channel[type][ch] = []), that._userHandlers.channel[type][ch].push(listener);
          });
        }
        return this;
      }, Input.prototype.hasListener = function(type, channel, listener) {
        var that = this;
        if (typeof listener != "function")
          throw new TypeError("The 'listener' parameter must be a function.");
        if (channel === void 0 && (channel = "all"), channel.constructor !== Array && (channel = [channel]), wm.MIDI_SYSTEM_MESSAGES[type] !== void 0) {
          for (var o = 0; o < this._userHandlers.system[type].length; o++)
            if (this._userHandlers.system[type][o] === listener)
              return true;
        } else if (wm.MIDI_CHANNEL_MESSAGES[type] !== void 0) {
          if (-1 < channel.indexOf("all")) {
            channel = [];
            for (var j = 1; j <= 16; j++)
              channel.push(j);
          }
          return !!this._userHandlers.channel[type] && channel.every(function(chNum) {
            var listeners = that._userHandlers.channel[type][chNum];
            return listeners && -1 < listeners.indexOf(listener);
          });
        }
        return false;
      }, Input.prototype.removeListener = function(type, channel, listener) {
        var that = this;
        if (listener !== void 0 && typeof listener != "function")
          throw new TypeError("The 'listener' parameter must be a function.");
        if (channel === void 0 && (channel = "all"), channel.constructor !== Array && (channel = [channel]), wm.MIDI_SYSTEM_MESSAGES[type] !== void 0)
          if (listener === void 0)
            this._userHandlers.system[type] = [];
          else
            for (var o = 0; o < this._userHandlers.system[type].length; o++)
              this._userHandlers.system[type][o] === listener && this._userHandlers.system[type].splice(o, 1);
        else if (wm.MIDI_CHANNEL_MESSAGES[type] !== void 0) {
          if (-1 < channel.indexOf("all")) {
            channel = [];
            for (var j = 1; j <= 16; j++)
              channel.push(j);
          }
          if (!this._userHandlers.channel[type])
            return this;
          channel.forEach(function(chNum) {
            var listeners = that._userHandlers.channel[type][chNum];
            if (listeners)
              if (listener === void 0)
                that._userHandlers.channel[type][chNum] = [];
              else
                for (var l = 0; l < listeners.length; l++)
                  listeners[l] === listener && listeners.splice(l, 1);
          });
        } else {
          if (type !== void 0)
            throw new TypeError("The specified event type is not supported.");
          this._initializeUserHandlers();
        }
        return this;
      }, Input.prototype._initializeUserHandlers = function() {
        for (var prop1 in wm.MIDI_CHANNEL_MESSAGES)
          Object.prototype.hasOwnProperty.call(wm.MIDI_CHANNEL_MESSAGES, prop1) && (this._userHandlers.channel[prop1] = {});
        for (var prop2 in wm.MIDI_SYSTEM_MESSAGES)
          Object.prototype.hasOwnProperty.call(wm.MIDI_SYSTEM_MESSAGES, prop2) && (this._userHandlers.system[prop2] = []);
      }, Input.prototype._onMidiMessage = function(e) {
        if (0 < this._userHandlers.system.midimessage.length) {
          var event = {target: this, data: e.data, timestamp: e.timeStamp, type: "midimessage"};
          this._userHandlers.system.midimessage.forEach(function(callback) {
            callback(event);
          });
        }
        e.data[0] < 240 ? (this._parseChannelEvent(e), this._parseNrpnEvent(e)) : e.data[0] <= 255 && this._parseSystemEvent(e);
      }, Input.prototype._parseNrpnEvent = function(e) {
        var data1, data2, command = e.data[0] >> 4, channelBufferIndex = 15 & e.data[0], channel = 1 + channelBufferIndex;
        if (1 < e.data.length && (data1 = e.data[1], data2 = 2 < e.data.length ? e.data[2] : void 0), wm.nrpnEventsEnabled && command === wm.MIDI_CHANNEL_MESSAGES.controlchange && (data1 >= wm.MIDI_NRPN_MESSAGES.increment && data1 <= wm.MIDI_NRPN_MESSAGES.parammsb || data1 === wm.MIDI_NRPN_MESSAGES.entrymsb || data1 === wm.MIDI_NRPN_MESSAGES.entrylsb)) {
          var ccEvent = {target: this, type: "controlchange", data: e.data, timestamp: e.timeStamp, channel, controller: {number: data1, name: this.getCcNameByNumber(data1)}, value: data2};
          if (ccEvent.controller.number === wm.MIDI_NRPN_MESSAGES.parammsb && ccEvent.value != wm.MIDI_NRPN_MESSAGES.nullactiveparameter)
            wm._nrpnBuffer[channelBufferIndex] = [], wm._nrpnBuffer[channelBufferIndex][0] = ccEvent;
          else if (wm._nrpnBuffer[channelBufferIndex].length === 1 && ccEvent.controller.number === wm.MIDI_NRPN_MESSAGES.paramlsb)
            wm._nrpnBuffer[channelBufferIndex].push(ccEvent);
          else if (wm._nrpnBuffer[channelBufferIndex].length !== 2 || ccEvent.controller.number !== wm.MIDI_NRPN_MESSAGES.increment && ccEvent.controller.number !== wm.MIDI_NRPN_MESSAGES.decrement && ccEvent.controller.number !== wm.MIDI_NRPN_MESSAGES.entrymsb)
            if (wm._nrpnBuffer[channelBufferIndex].length === 3 && wm._nrpnBuffer[channelBufferIndex][2].number === wm.MIDI_NRPN_MESSAGES.entrymsb && ccEvent.controller.number === wm.MIDI_NRPN_MESSAGES.entrylsb)
              wm._nrpnBuffer[channelBufferIndex].push(ccEvent);
            else if (3 <= wm._nrpnBuffer[channelBufferIndex].length && wm._nrpnBuffer[channelBufferIndex].length <= 4 && ccEvent.controller.number === wm.MIDI_NRPN_MESSAGES.parammsb && ccEvent.value === wm.MIDI_NRPN_MESSAGES.nullactiveparameter)
              wm._nrpnBuffer[channelBufferIndex].push(ccEvent);
            else if (4 <= wm._nrpnBuffer[channelBufferIndex].length && wm._nrpnBuffer[channelBufferIndex].length <= 5 && ccEvent.controller.number === wm.MIDI_NRPN_MESSAGES.paramlsb && ccEvent.value === wm.MIDI_NRPN_MESSAGES.nullactiveparameter) {
              wm._nrpnBuffer[channelBufferIndex].push(ccEvent);
              var rawData = [];
              wm._nrpnBuffer[channelBufferIndex].forEach(function(ev) {
                rawData.push(ev.data);
              });
              var nrpnNumber = wm._nrpnBuffer[channelBufferIndex][0].value << 7 | wm._nrpnBuffer[channelBufferIndex][1].value, nrpnValue = wm._nrpnBuffer[channelBufferIndex][2].value;
              wm._nrpnBuffer[channelBufferIndex].length === 6 && (nrpnValue = wm._nrpnBuffer[channelBufferIndex][2].value << 7 | wm._nrpnBuffer[channelBufferIndex][3].value);
              var nrpnControllerType = "";
              switch (wm._nrpnBuffer[channelBufferIndex][2].controller.number) {
                case wm.MIDI_NRPN_MESSAGES.entrymsb:
                  nrpnControllerType = wm._nrpnTypes[0];
                  break;
                case wm.MIDI_NRPN_MESSAGES.increment:
                  nrpnControllerType = wm._nrpnTypes[1];
                  break;
                case wm.MIDI_NRPN_MESSAGES.decrement:
                  nrpnControllerType = wm._nrpnTypes[2];
                  break;
                default:
                  throw new Error("The NPRN type was unidentifiable.");
              }
              var nrpnEvent = {timestamp: ccEvent.timestamp, channel: ccEvent.channel, type: "nrpn", data: rawData, controller: {number: nrpnNumber, type: nrpnControllerType, name: "Non-Registered Parameter " + nrpnNumber}, value: nrpnValue};
              wm._nrpnBuffer[channelBufferIndex] = [], this._userHandlers.channel[nrpnEvent.type] && this._userHandlers.channel[nrpnEvent.type][nrpnEvent.channel] && this._userHandlers.channel[nrpnEvent.type][nrpnEvent.channel].forEach(function(callback) {
                callback(nrpnEvent);
              });
            } else
              wm._nrpnBuffer[channelBufferIndex] = [];
          else
            wm._nrpnBuffer[channelBufferIndex].push(ccEvent);
        }
      }, Input.prototype._parseChannelEvent = function(e) {
        var data1, data2, command = e.data[0] >> 4, channel = 1 + (15 & e.data[0]);
        1 < e.data.length && (data1 = e.data[1], data2 = 2 < e.data.length ? e.data[2] : void 0);
        var event = {target: this, data: e.data, timestamp: e.timeStamp, channel};
        command === wm.MIDI_CHANNEL_MESSAGES.noteoff || command === wm.MIDI_CHANNEL_MESSAGES.noteon && data2 === 0 ? (event.type = "noteoff", event.note = {number: data1, name: wm._notes[data1 % 12], octave: wm.getOctave(data1)}, event.velocity = data2 / 127, event.rawVelocity = data2) : command === wm.MIDI_CHANNEL_MESSAGES.noteon ? (event.type = "noteon", event.note = {number: data1, name: wm._notes[data1 % 12], octave: wm.getOctave(data1)}, event.velocity = data2 / 127, event.rawVelocity = data2) : command === wm.MIDI_CHANNEL_MESSAGES.keyaftertouch ? (event.type = "keyaftertouch", event.note = {number: data1, name: wm._notes[data1 % 12], octave: wm.getOctave(data1)}, event.value = data2 / 127) : command === wm.MIDI_CHANNEL_MESSAGES.controlchange && 0 <= data1 && data1 <= 119 ? (event.type = "controlchange", event.controller = {number: data1, name: this.getCcNameByNumber(data1)}, event.value = data2) : command === wm.MIDI_CHANNEL_MESSAGES.channelmode && 120 <= data1 && data1 <= 127 ? (event.type = "channelmode", event.controller = {number: data1, name: this.getChannelModeByNumber(data1)}, event.value = data2) : command === wm.MIDI_CHANNEL_MESSAGES.programchange ? (event.type = "programchange", event.value = data1) : command === wm.MIDI_CHANNEL_MESSAGES.channelaftertouch ? (event.type = "channelaftertouch", event.value = data1 / 127) : command === wm.MIDI_CHANNEL_MESSAGES.pitchbend ? (event.type = "pitchbend", event.value = ((data2 << 7) + data1 - 8192) / 8192) : event.type = "unknownchannelmessage", this._userHandlers.channel[event.type] && this._userHandlers.channel[event.type][channel] && this._userHandlers.channel[event.type][channel].forEach(function(callback) {
          callback(event);
        });
      }, Input.prototype.getCcNameByNumber = function(number) {
        if (!(0 <= (number = Math.floor(number)) && number <= 119))
          throw new RangeError("The control change number must be between 0 and 119.");
        for (var cc in wm.MIDI_CONTROL_CHANGE_MESSAGES)
          if (Object.prototype.hasOwnProperty.call(wm.MIDI_CONTROL_CHANGE_MESSAGES, cc) && number === wm.MIDI_CONTROL_CHANGE_MESSAGES[cc])
            return cc;
      }, Input.prototype.getChannelModeByNumber = function(number) {
        if (!(120 <= (number = Math.floor(number)) && status <= 127))
          throw new RangeError("The control change number must be between 120 and 127.");
        for (var cm in wm.MIDI_CHANNEL_MODE_MESSAGES)
          if (Object.prototype.hasOwnProperty.call(wm.MIDI_CHANNEL_MODE_MESSAGES, cm) && number === wm.MIDI_CHANNEL_MODE_MESSAGES[cm])
            return cm;
      }, Input.prototype._parseSystemEvent = function(e) {
        var command = e.data[0], event = {target: this, data: e.data, timestamp: e.timeStamp};
        command === wm.MIDI_SYSTEM_MESSAGES.sysex ? event.type = "sysex" : command === wm.MIDI_SYSTEM_MESSAGES.timecode ? event.type = "timecode" : command === wm.MIDI_SYSTEM_MESSAGES.songposition ? event.type = "songposition" : command === wm.MIDI_SYSTEM_MESSAGES.songselect ? (event.type = "songselect", event.song = e.data[1]) : command === wm.MIDI_SYSTEM_MESSAGES.tuningrequest ? event.type = "tuningrequest" : command === wm.MIDI_SYSTEM_MESSAGES.clock ? event.type = "clock" : command === wm.MIDI_SYSTEM_MESSAGES.start ? event.type = "start" : command === wm.MIDI_SYSTEM_MESSAGES.continue ? event.type = "continue" : command === wm.MIDI_SYSTEM_MESSAGES.stop ? event.type = "stop" : command === wm.MIDI_SYSTEM_MESSAGES.activesensing ? event.type = "activesensing" : command === wm.MIDI_SYSTEM_MESSAGES.reset ? event.type = "reset" : event.type = "unknownsystemmessage", this._userHandlers.system[event.type] && this._userHandlers.system[event.type].forEach(function(callback) {
          callback(event);
        });
      }, Output.prototype.send = function(status2, data, timestamp) {
        if (!(128 <= status2 && status2 <= 255))
          throw new RangeError("The status byte must be an integer between 128 (0x80) and 255 (0xFF).");
        data === void 0 && (data = []), Array.isArray(data) || (data = [data]);
        var message = [];
        return data.forEach(function(item) {
          var parsed = Math.floor(item);
          if (!(0 <= parsed && parsed <= 255))
            throw new RangeError("Data bytes must be integers between 0 (0x00) and 255 (0xFF).");
          message.push(parsed);
        }), this._midiOutput.send([status2].concat(message), parseFloat(timestamp) || 0), this;
      }, Output.prototype.sendSysex = function(manufacturer, data, options) {
        if (!wm.sysexEnabled)
          throw new Error("Sysex message support must first be activated.");
        return options = options || {}, manufacturer = [].concat(manufacturer), data.forEach(function(item) {
          if (item < 0 || 127 < item)
            throw new RangeError("The data bytes of a sysex message must be integers between 0 (0x00) and 127 (0x7F).");
        }), data = manufacturer.concat(data, wm.MIDI_SYSTEM_MESSAGES.sysexend), this.send(wm.MIDI_SYSTEM_MESSAGES.sysex, data, this._parseTimeParameter(options.time)), this;
      }, Output.prototype.sendTimecodeQuarterFrame = function(value, options) {
        return options = options || {}, this.send(wm.MIDI_SYSTEM_MESSAGES.timecode, value, this._parseTimeParameter(options.time)), this;
      }, Output.prototype.sendSongPosition = function(value, options) {
        options = options || {};
        var msb = (value = Math.floor(value) || 0) >> 7 & 127, lsb = 127 & value;
        return this.send(wm.MIDI_SYSTEM_MESSAGES.songposition, [msb, lsb], this._parseTimeParameter(options.time)), this;
      }, Output.prototype.sendSongSelect = function(value, options) {
        if (options = options || {}, !(0 <= (value = Math.floor(value)) && value <= 127))
          throw new RangeError("The song number must be between 0 and 127.");
        return this.send(wm.MIDI_SYSTEM_MESSAGES.songselect, [value], this._parseTimeParameter(options.time)), this;
      }, Output.prototype.sendTuningRequest = function(options) {
        return options = options || {}, this.send(wm.MIDI_SYSTEM_MESSAGES.tuningrequest, void 0, this._parseTimeParameter(options.time)), this;
      }, Output.prototype.sendClock = function(options) {
        return options = options || {}, this.send(wm.MIDI_SYSTEM_MESSAGES.clock, void 0, this._parseTimeParameter(options.time)), this;
      }, Output.prototype.sendStart = function(options) {
        return options = options || {}, this.send(wm.MIDI_SYSTEM_MESSAGES.start, void 0, this._parseTimeParameter(options.time)), this;
      }, Output.prototype.sendContinue = function(options) {
        return options = options || {}, this.send(wm.MIDI_SYSTEM_MESSAGES.continue, void 0, this._parseTimeParameter(options.time)), this;
      }, Output.prototype.sendStop = function(options) {
        return options = options || {}, this.send(wm.MIDI_SYSTEM_MESSAGES.stop, void 0, this._parseTimeParameter(options.time)), this;
      }, Output.prototype.sendActiveSensing = function(options) {
        return options = options || {}, this.send(wm.MIDI_SYSTEM_MESSAGES.activesensing, [], this._parseTimeParameter(options.time)), this;
      }, Output.prototype.sendReset = function(options) {
        return options = options || {}, this.send(wm.MIDI_SYSTEM_MESSAGES.reset, void 0, this._parseTimeParameter(options.time)), this;
      }, Output.prototype.stopNote = function(note, channel, options) {
        if (note === "all")
          return this.sendChannelMode("allnotesoff", 0, channel, options);
        var nVelocity = 64;
        return (options = options || {}).rawVelocity ? !isNaN(options.velocity) && 0 <= options.velocity && options.velocity <= 127 && (nVelocity = options.velocity) : !isNaN(options.velocity) && 0 <= options.velocity && options.velocity <= 1 && (nVelocity = 127 * options.velocity), this._convertNoteToArray(note).forEach(function(item) {
          wm.toMIDIChannels(channel).forEach(function(ch) {
            this.send((wm.MIDI_CHANNEL_MESSAGES.noteoff << 4) + (ch - 1), [item, Math.round(nVelocity)], this._parseTimeParameter(options.time));
          }.bind(this));
        }.bind(this)), this;
      }, Output.prototype.playNote = function(note, channel, options) {
        var time, nVelocity = 64;
        if ((options = options || {}).rawVelocity ? !isNaN(options.velocity) && 0 <= options.velocity && options.velocity <= 127 && (nVelocity = options.velocity) : !isNaN(options.velocity) && 0 <= options.velocity && options.velocity <= 1 && (nVelocity = 127 * options.velocity), time = this._parseTimeParameter(options.time), this._convertNoteToArray(note).forEach(function(item) {
          wm.toMIDIChannels(channel).forEach(function(ch) {
            this.send((wm.MIDI_CHANNEL_MESSAGES.noteon << 4) + (ch - 1), [item, Math.round(nVelocity)], time);
          }.bind(this));
        }.bind(this)), !isNaN(options.duration)) {
          options.duration <= 0 && (options.duration = 0);
          var nRelease = 64;
          options.rawVelocity ? !isNaN(options.release) && 0 <= options.release && options.release <= 127 && (nRelease = options.release) : !isNaN(options.release) && 0 <= options.release && options.release <= 1 && (nRelease = 127 * options.release), this._convertNoteToArray(note).forEach(function(item) {
            wm.toMIDIChannels(channel).forEach(function(ch) {
              this.send((wm.MIDI_CHANNEL_MESSAGES.noteoff << 4) + (ch - 1), [item, Math.round(nRelease)], (time || wm.time) + options.duration);
            }.bind(this));
          }.bind(this));
        }
        return this;
      }, Output.prototype.sendKeyAftertouch = function(note, channel, pressure, options) {
        var that = this;
        if (options = options || {}, channel < 1 || 16 < channel)
          throw new RangeError("The channel must be between 1 and 16.");
        (isNaN(pressure) || pressure < 0 || 1 < pressure) && (pressure = 0.5);
        var nPressure = Math.round(127 * pressure);
        return this._convertNoteToArray(note).forEach(function(item) {
          wm.toMIDIChannels(channel).forEach(function(ch) {
            that.send((wm.MIDI_CHANNEL_MESSAGES.keyaftertouch << 4) + (ch - 1), [item, nPressure], that._parseTimeParameter(options.time));
          });
        }), this;
      }, Output.prototype.sendControlChange = function(controller, value, channel, options) {
        if (options = options || {}, typeof controller == "string") {
          if ((controller = wm.MIDI_CONTROL_CHANGE_MESSAGES[controller]) === void 0)
            throw new TypeError("Invalid controller name.");
        } else if (!(0 <= (controller = Math.floor(controller)) && controller <= 119))
          throw new RangeError("Controller numbers must be between 0 and 119.");
        if (!(0 <= (value = Math.floor(value) || 0) && value <= 127))
          throw new RangeError("Controller value must be between 0 and 127.");
        return wm.toMIDIChannels(channel).forEach(function(ch) {
          this.send((wm.MIDI_CHANNEL_MESSAGES.controlchange << 4) + (ch - 1), [controller, value], this._parseTimeParameter(options.time));
        }.bind(this)), this;
      }, Output.prototype._selectRegisteredParameter = function(parameter, channel, time) {
        var that = this;
        if (parameter[0] = Math.floor(parameter[0]), !(0 <= parameter[0] && parameter[0] <= 127))
          throw new RangeError("The control65 value must be between 0 and 127");
        if (parameter[1] = Math.floor(parameter[1]), !(0 <= parameter[1] && parameter[1] <= 127))
          throw new RangeError("The control64 value must be between 0 and 127");
        return wm.toMIDIChannels(channel).forEach(function() {
          that.sendControlChange(101, parameter[0], channel, {time}), that.sendControlChange(100, parameter[1], channel, {time});
        }), this;
      }, Output.prototype._selectNonRegisteredParameter = function(parameter, channel, time) {
        var that = this;
        if (parameter[0] = Math.floor(parameter[0]), !(0 <= parameter[0] && parameter[0] <= 127))
          throw new RangeError("The control63 value must be between 0 and 127");
        if (parameter[1] = Math.floor(parameter[1]), !(0 <= parameter[1] && parameter[1] <= 127))
          throw new RangeError("The control62 value must be between 0 and 127");
        return wm.toMIDIChannels(channel).forEach(function() {
          that.sendControlChange(99, parameter[0], channel, {time}), that.sendControlChange(98, parameter[1], channel, {time});
        }), this;
      }, Output.prototype._setCurrentRegisteredParameter = function(data, channel, time) {
        var that = this;
        if ((data = [].concat(data))[0] = Math.floor(data[0]), !(0 <= data[0] && data[0] <= 127))
          throw new RangeError("The msb value must be between 0 and 127");
        return wm.toMIDIChannels(channel).forEach(function() {
          that.sendControlChange(6, data[0], channel, {time});
        }), data[1] = Math.floor(data[1]), 0 <= data[1] && data[1] <= 127 && wm.toMIDIChannels(channel).forEach(function() {
          that.sendControlChange(38, data[1], channel, {time});
        }), this;
      }, Output.prototype._deselectRegisteredParameter = function(channel, time) {
        var that = this;
        return wm.toMIDIChannels(channel).forEach(function() {
          that.sendControlChange(101, 127, channel, {time}), that.sendControlChange(100, 127, channel, {time});
        }), this;
      }, Output.prototype.setRegisteredParameter = function(parameter, data, channel, options) {
        var that = this;
        if (options = options || {}, !Array.isArray(parameter)) {
          if (!wm.MIDI_REGISTERED_PARAMETER[parameter])
            throw new Error("The specified parameter is not available.");
          parameter = wm.MIDI_REGISTERED_PARAMETER[parameter];
        }
        return wm.toMIDIChannels(channel).forEach(function() {
          that._selectRegisteredParameter(parameter, channel, options.time), that._setCurrentRegisteredParameter(data, channel, options.time), that._deselectRegisteredParameter(channel, options.time);
        }), this;
      }, Output.prototype.setNonRegisteredParameter = function(parameter, data, channel, options) {
        var that = this;
        if (options = options || {}, !(0 <= parameter[0] && parameter[0] <= 127 && 0 <= parameter[1] && parameter[1] <= 127))
          throw new Error("Position 0 and 1 of the 2-position parameter array must both be between 0 and 127.");
        return data = [].concat(data), wm.toMIDIChannels(channel).forEach(function() {
          that._selectNonRegisteredParameter(parameter, channel, options.time), that._setCurrentRegisteredParameter(data, channel, options.time), that._deselectRegisteredParameter(channel, options.time);
        }), this;
      }, Output.prototype.incrementRegisteredParameter = function(parameter, channel, options) {
        var that = this;
        if (options = options || {}, !Array.isArray(parameter)) {
          if (!wm.MIDI_REGISTERED_PARAMETER[parameter])
            throw new Error("The specified parameter is not available.");
          parameter = wm.MIDI_REGISTERED_PARAMETER[parameter];
        }
        return wm.toMIDIChannels(channel).forEach(function() {
          that._selectRegisteredParameter(parameter, channel, options.time), that.sendControlChange(96, 0, channel, {time: options.time}), that._deselectRegisteredParameter(channel, options.time);
        }), this;
      }, Output.prototype.decrementRegisteredParameter = function(parameter, channel, options) {
        if (options = options || {}, !Array.isArray(parameter)) {
          if (!wm.MIDI_REGISTERED_PARAMETER[parameter])
            throw new TypeError("The specified parameter is not available.");
          parameter = wm.MIDI_REGISTERED_PARAMETER[parameter];
        }
        return wm.toMIDIChannels(channel).forEach(function() {
          this._selectRegisteredParameter(parameter, channel, options.time), this.sendControlChange(97, 0, channel, {time: options.time}), this._deselectRegisteredParameter(channel, options.time);
        }.bind(this)), this;
      }, Output.prototype.setPitchBendRange = function(semitones, cents, channel, options) {
        var that = this;
        if (options = options || {}, !(0 <= (semitones = Math.floor(semitones) || 0) && semitones <= 127))
          throw new RangeError("The semitones value must be between 0 and 127");
        if (!(0 <= (cents = Math.floor(cents) || 0) && cents <= 127))
          throw new RangeError("The cents value must be between 0 and 127");
        return wm.toMIDIChannels(channel).forEach(function() {
          that.setRegisteredParameter("pitchbendrange", [semitones, cents], channel, {time: options.time});
        }), this;
      }, Output.prototype.setModulationRange = function(semitones, cents, channel, options) {
        var that = this;
        if (options = options || {}, !(0 <= (semitones = Math.floor(semitones) || 0) && semitones <= 127))
          throw new RangeError("The semitones value must be between 0 and 127");
        if (!(0 <= (cents = Math.floor(cents) || 0) && cents <= 127))
          throw new RangeError("The cents value must be between 0 and 127");
        return wm.toMIDIChannels(channel).forEach(function() {
          that.setRegisteredParameter("modulationrange", [semitones, cents], channel, {time: options.time});
        }), this;
      }, Output.prototype.setMasterTuning = function(value, channel, options) {
        var that = this;
        if (options = options || {}, (value = parseFloat(value) || 0) <= -65 || 64 <= value)
          throw new RangeError("The value must be a decimal number larger than -65 and smaller than 64.");
        var coarse = Math.floor(value) + 64, fine = value - Math.floor(value), msb = (fine = Math.round((fine + 1) / 2 * 16383)) >> 7 & 127, lsb = 127 & fine;
        return wm.toMIDIChannels(channel).forEach(function() {
          that.setRegisteredParameter("channelcoarsetuning", coarse, channel, {time: options.time}), that.setRegisteredParameter("channelfinetuning", [msb, lsb], channel, {time: options.time});
        }), this;
      }, Output.prototype.setTuningProgram = function(value, channel, options) {
        var that = this;
        if (options = options || {}, !(0 <= (value = Math.floor(value)) && value <= 127))
          throw new RangeError("The program value must be between 0 and 127");
        return wm.toMIDIChannels(channel).forEach(function() {
          that.setRegisteredParameter("tuningprogram", value, channel, {time: options.time});
        }), this;
      }, Output.prototype.setTuningBank = function(value, channel, options) {
        var that = this;
        if (options = options || {}, !(0 <= (value = Math.floor(value) || 0) && value <= 127))
          throw new RangeError("The bank value must be between 0 and 127");
        return wm.toMIDIChannels(channel).forEach(function() {
          that.setRegisteredParameter("tuningbank", value, channel, {time: options.time});
        }), this;
      }, Output.prototype.sendChannelMode = function(command, value, channel, options) {
        if (options = options || {}, typeof command == "string") {
          if (!(command = wm.MIDI_CHANNEL_MODE_MESSAGES[command]))
            throw new TypeError("Invalid channel mode message name.");
        } else if (!(120 <= (command = Math.floor(command)) && command <= 127))
          throw new RangeError("Channel mode numerical identifiers must be between 120 and 127.");
        if ((value = Math.floor(value) || 0) < 0 || 127 < value)
          throw new RangeError("Value must be an integer between 0 and 127.");
        return wm.toMIDIChannels(channel).forEach(function(ch) {
          this.send((wm.MIDI_CHANNEL_MESSAGES.channelmode << 4) + (ch - 1), [command, value], this._parseTimeParameter(options.time));
        }.bind(this)), this;
      }, Output.prototype.sendProgramChange = function(program, channel, options) {
        var that = this;
        if (options = options || {}, program = Math.floor(program), isNaN(program) || program < 0 || 127 < program)
          throw new RangeError("Program numbers must be between 0 and 127.");
        return wm.toMIDIChannels(channel).forEach(function(ch) {
          that.send((wm.MIDI_CHANNEL_MESSAGES.programchange << 4) + (ch - 1), [program], that._parseTimeParameter(options.time));
        }), this;
      }, Output.prototype.sendChannelAftertouch = function(pressure, channel, options) {
        var that = this;
        options = options || {}, pressure = parseFloat(pressure), (isNaN(pressure) || pressure < 0 || 1 < pressure) && (pressure = 0.5);
        var nPressure = Math.round(127 * pressure);
        return wm.toMIDIChannels(channel).forEach(function(ch) {
          that.send((wm.MIDI_CHANNEL_MESSAGES.channelaftertouch << 4) + (ch - 1), [nPressure], that._parseTimeParameter(options.time));
        }), this;
      }, Output.prototype.sendPitchBend = function(bend, channel, options) {
        var that = this;
        if (options = options || {}, isNaN(bend) || bend < -1 || 1 < bend)
          throw new RangeError("Pitch bend value must be between -1 and 1.");
        var nLevel = Math.round((bend + 1) / 2 * 16383), msb = nLevel >> 7 & 127, lsb = 127 & nLevel;
        return wm.toMIDIChannels(channel).forEach(function(ch) {
          that.send((wm.MIDI_CHANNEL_MESSAGES.pitchbend << 4) + (ch - 1), [lsb, msb], that._parseTimeParameter(options.time));
        }), this;
      }, Output.prototype._parseTimeParameter = function(time) {
        var value, parsed = parseFloat(time);
        return typeof time == "string" && time.substring(0, 1) === "+" ? parsed && 0 < parsed && (value = wm.time + parsed) : parsed > wm.time && (value = parsed), value;
      }, Output.prototype._convertNoteToArray = function(note) {
        var notes = [];
        return Array.isArray(note) || (note = [note]), note.forEach(function(item) {
          notes.push(wm.guessNoteNumber(item));
        }), notes;
      }, typeof define == "function" && typeof define.amd == "object" ? define([], function() {
        return wm;
      }) : typeof module != "undefined" && module.exports ? module.exports = wm : scope.WebMidi || (scope.WebMidi = wm);
    }(exports);
  });

  // node_modules/chroma-js/chroma.js
  var require_chroma = __commonJS((exports, module) => {
    /**
     * chroma.js - JavaScript library for color conversions
     *
     * Copyright (c) 2011-2019, Gregor Aisch
     * All rights reserved.
     *
     * Redistribution and use in source and binary forms, with or without
     * modification, are permitted provided that the following conditions are met:
     *
     * 1. Redistributions of source code must retain the above copyright notice, this
     * list of conditions and the following disclaimer.
     *
     * 2. Redistributions in binary form must reproduce the above copyright notice,
     * this list of conditions and the following disclaimer in the documentation
     * and/or other materials provided with the distribution.
     *
     * 3. The name Gregor Aisch may not be used to endorse or promote products
     * derived from this software without specific prior written permission.
     *
     * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
     * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
     * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
     * DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
     * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
     * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
     * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
     * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
     * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
     * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
     *
     * -------------------------------------------------------
     *
     * chroma.js includes colors from colorbrewer2.org, which are released under
     * the following license:
     *
     * Copyright (c) 2002 Cynthia Brewer, Mark Harrower,
     * and The Pennsylvania State University.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing,
     * software distributed under the License is distributed on an
     * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
     * either express or implied. See the License for the specific
     * language governing permissions and limitations under the License.
     *
     * ------------------------------------------------------
     *
     * Named colors are taken from X11 Color Names.
     * http://www.w3.org/TR/css3-color/#svg-color
     *
     * @preserve
     */
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.chroma = factory();
    })(exports, function() {
      "use strict";
      var limit = function(x, min2, max2) {
        if (min2 === void 0)
          min2 = 0;
        if (max2 === void 0)
          max2 = 1;
        return x < min2 ? min2 : x > max2 ? max2 : x;
      };
      var clip_rgb = function(rgb) {
        rgb._clipped = false;
        rgb._unclipped = rgb.slice(0);
        for (var i2 = 0; i2 <= 3; i2++) {
          if (i2 < 3) {
            if (rgb[i2] < 0 || rgb[i2] > 255) {
              rgb._clipped = true;
            }
            rgb[i2] = limit(rgb[i2], 0, 255);
          } else if (i2 === 3) {
            rgb[i2] = limit(rgb[i2], 0, 1);
          }
        }
        return rgb;
      };
      var classToType = {};
      for (var i = 0, list = ["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Undefined", "Null"]; i < list.length; i += 1) {
        var name = list[i];
        classToType["[object " + name + "]"] = name.toLowerCase();
      }
      var type = function(obj) {
        return classToType[Object.prototype.toString.call(obj)] || "object";
      };
      var unpack = function(args, keyOrder) {
        if (keyOrder === void 0)
          keyOrder = null;
        if (args.length >= 3) {
          return Array.prototype.slice.call(args);
        }
        if (type(args[0]) == "object" && keyOrder) {
          return keyOrder.split("").filter(function(k) {
            return args[0][k] !== void 0;
          }).map(function(k) {
            return args[0][k];
          });
        }
        return args[0];
      };
      var last = function(args) {
        if (args.length < 2) {
          return null;
        }
        var l = args.length - 1;
        if (type(args[l]) == "string") {
          return args[l].toLowerCase();
        }
        return null;
      };
      var PI = Math.PI;
      var utils = {
        clip_rgb,
        limit,
        type,
        unpack,
        last,
        PI,
        TWOPI: PI * 2,
        PITHIRD: PI / 3,
        DEG2RAD: PI / 180,
        RAD2DEG: 180 / PI
      };
      var input = {
        format: {},
        autodetect: []
      };
      var last$1 = utils.last;
      var clip_rgb$1 = utils.clip_rgb;
      var type$1 = utils.type;
      var Color = function Color2() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var me = this;
        if (type$1(args[0]) === "object" && args[0].constructor && args[0].constructor === this.constructor) {
          return args[0];
        }
        var mode = last$1(args);
        var autodetect = false;
        if (!mode) {
          autodetect = true;
          if (!input.sorted) {
            input.autodetect = input.autodetect.sort(function(a, b) {
              return b.p - a.p;
            });
            input.sorted = true;
          }
          for (var i2 = 0, list2 = input.autodetect; i2 < list2.length; i2 += 1) {
            var chk = list2[i2];
            mode = chk.test.apply(chk, args);
            if (mode) {
              break;
            }
          }
        }
        if (input.format[mode]) {
          var rgb = input.format[mode].apply(null, autodetect ? args : args.slice(0, -1));
          me._rgb = clip_rgb$1(rgb);
        } else {
          throw new Error("unknown format: " + args);
        }
        if (me._rgb.length === 3) {
          me._rgb.push(1);
        }
      };
      Color.prototype.toString = function toString() {
        if (type$1(this.hex) == "function") {
          return this.hex();
        }
        return "[" + this._rgb.join(",") + "]";
      };
      var Color_1 = Color;
      var chroma2 = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return new (Function.prototype.bind.apply(chroma2.Color, [null].concat(args)))();
      };
      chroma2.Color = Color_1;
      chroma2.version = "2.1.2";
      var chroma_1 = chroma2;
      var unpack$1 = utils.unpack;
      var max = Math.max;
      var rgb2cmyk = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var ref = unpack$1(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        r = r / 255;
        g = g / 255;
        b = b / 255;
        var k = 1 - max(r, max(g, b));
        var f = k < 1 ? 1 / (1 - k) : 0;
        var c = (1 - r - k) * f;
        var m = (1 - g - k) * f;
        var y = (1 - b - k) * f;
        return [c, m, y, k];
      };
      var rgb2cmyk_1 = rgb2cmyk;
      var unpack$2 = utils.unpack;
      var cmyk2rgb = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$2(args, "cmyk");
        var c = args[0];
        var m = args[1];
        var y = args[2];
        var k = args[3];
        var alpha = args.length > 4 ? args[4] : 1;
        if (k === 1) {
          return [0, 0, 0, alpha];
        }
        return [
          c >= 1 ? 0 : 255 * (1 - c) * (1 - k),
          m >= 1 ? 0 : 255 * (1 - m) * (1 - k),
          y >= 1 ? 0 : 255 * (1 - y) * (1 - k),
          alpha
        ];
      };
      var cmyk2rgb_1 = cmyk2rgb;
      var unpack$3 = utils.unpack;
      var type$2 = utils.type;
      Color_1.prototype.cmyk = function() {
        return rgb2cmyk_1(this._rgb);
      };
      chroma_1.cmyk = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ["cmyk"])))();
      };
      input.format.cmyk = cmyk2rgb_1;
      input.autodetect.push({
        p: 2,
        test: function() {
          var args = [], len = arguments.length;
          while (len--)
            args[len] = arguments[len];
          args = unpack$3(args, "cmyk");
          if (type$2(args) === "array" && args.length === 4) {
            return "cmyk";
          }
        }
      });
      var unpack$4 = utils.unpack;
      var last$2 = utils.last;
      var rnd = function(a) {
        return Math.round(a * 100) / 100;
      };
      var hsl2css = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var hsla = unpack$4(args, "hsla");
        var mode = last$2(args) || "lsa";
        hsla[0] = rnd(hsla[0] || 0);
        hsla[1] = rnd(hsla[1] * 100) + "%";
        hsla[2] = rnd(hsla[2] * 100) + "%";
        if (mode === "hsla" || hsla.length > 3 && hsla[3] < 1) {
          hsla[3] = hsla.length > 3 ? hsla[3] : 1;
          mode = "hsla";
        } else {
          hsla.length = 3;
        }
        return mode + "(" + hsla.join(",") + ")";
      };
      var hsl2css_1 = hsl2css;
      var unpack$5 = utils.unpack;
      var rgb2hsl = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$5(args, "rgba");
        var r = args[0];
        var g = args[1];
        var b = args[2];
        r /= 255;
        g /= 255;
        b /= 255;
        var min2 = Math.min(r, g, b);
        var max2 = Math.max(r, g, b);
        var l = (max2 + min2) / 2;
        var s, h;
        if (max2 === min2) {
          s = 0;
          h = Number.NaN;
        } else {
          s = l < 0.5 ? (max2 - min2) / (max2 + min2) : (max2 - min2) / (2 - max2 - min2);
        }
        if (r == max2) {
          h = (g - b) / (max2 - min2);
        } else if (g == max2) {
          h = 2 + (b - r) / (max2 - min2);
        } else if (b == max2) {
          h = 4 + (r - g) / (max2 - min2);
        }
        h *= 60;
        if (h < 0) {
          h += 360;
        }
        if (args.length > 3 && args[3] !== void 0) {
          return [h, s, l, args[3]];
        }
        return [h, s, l];
      };
      var rgb2hsl_1 = rgb2hsl;
      var unpack$6 = utils.unpack;
      var last$3 = utils.last;
      var round = Math.round;
      var rgb2css = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var rgba = unpack$6(args, "rgba");
        var mode = last$3(args) || "rgb";
        if (mode.substr(0, 3) == "hsl") {
          return hsl2css_1(rgb2hsl_1(rgba), mode);
        }
        rgba[0] = round(rgba[0]);
        rgba[1] = round(rgba[1]);
        rgba[2] = round(rgba[2]);
        if (mode === "rgba" || rgba.length > 3 && rgba[3] < 1) {
          rgba[3] = rgba.length > 3 ? rgba[3] : 1;
          mode = "rgba";
        }
        return mode + "(" + rgba.slice(0, mode === "rgb" ? 3 : 4).join(",") + ")";
      };
      var rgb2css_1 = rgb2css;
      var unpack$7 = utils.unpack;
      var round$1 = Math.round;
      var hsl2rgb = function() {
        var assign;
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$7(args, "hsl");
        var h = args[0];
        var s = args[1];
        var l = args[2];
        var r, g, b;
        if (s === 0) {
          r = g = b = l * 255;
        } else {
          var t3 = [0, 0, 0];
          var c = [0, 0, 0];
          var t2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
          var t1 = 2 * l - t2;
          var h_ = h / 360;
          t3[0] = h_ + 1 / 3;
          t3[1] = h_;
          t3[2] = h_ - 1 / 3;
          for (var i2 = 0; i2 < 3; i2++) {
            if (t3[i2] < 0) {
              t3[i2] += 1;
            }
            if (t3[i2] > 1) {
              t3[i2] -= 1;
            }
            if (6 * t3[i2] < 1) {
              c[i2] = t1 + (t2 - t1) * 6 * t3[i2];
            } else if (2 * t3[i2] < 1) {
              c[i2] = t2;
            } else if (3 * t3[i2] < 2) {
              c[i2] = t1 + (t2 - t1) * (2 / 3 - t3[i2]) * 6;
            } else {
              c[i2] = t1;
            }
          }
          assign = [round$1(c[0] * 255), round$1(c[1] * 255), round$1(c[2] * 255)], r = assign[0], g = assign[1], b = assign[2];
        }
        if (args.length > 3) {
          return [r, g, b, args[3]];
        }
        return [r, g, b, 1];
      };
      var hsl2rgb_1 = hsl2rgb;
      var RE_RGB = /^rgb\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/;
      var RE_RGBA = /^rgba\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*([01]|[01]?\.\d+)\)$/;
      var RE_RGB_PCT = /^rgb\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
      var RE_RGBA_PCT = /^rgba\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
      var RE_HSL = /^hsl\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
      var RE_HSLA = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
      var round$2 = Math.round;
      var css2rgb = function(css) {
        css = css.toLowerCase().trim();
        var m;
        if (input.format.named) {
          try {
            return input.format.named(css);
          } catch (e) {
          }
        }
        if (m = css.match(RE_RGB)) {
          var rgb = m.slice(1, 4);
          for (var i2 = 0; i2 < 3; i2++) {
            rgb[i2] = +rgb[i2];
          }
          rgb[3] = 1;
          return rgb;
        }
        if (m = css.match(RE_RGBA)) {
          var rgb$12 = m.slice(1, 5);
          for (var i$12 = 0; i$12 < 4; i$12++) {
            rgb$12[i$12] = +rgb$12[i$12];
          }
          return rgb$12;
        }
        if (m = css.match(RE_RGB_PCT)) {
          var rgb$2 = m.slice(1, 4);
          for (var i$2 = 0; i$2 < 3; i$2++) {
            rgb$2[i$2] = round$2(rgb$2[i$2] * 2.55);
          }
          rgb$2[3] = 1;
          return rgb$2;
        }
        if (m = css.match(RE_RGBA_PCT)) {
          var rgb$3 = m.slice(1, 5);
          for (var i$3 = 0; i$3 < 3; i$3++) {
            rgb$3[i$3] = round$2(rgb$3[i$3] * 2.55);
          }
          rgb$3[3] = +rgb$3[3];
          return rgb$3;
        }
        if (m = css.match(RE_HSL)) {
          var hsl = m.slice(1, 4);
          hsl[1] *= 0.01;
          hsl[2] *= 0.01;
          var rgb$4 = hsl2rgb_1(hsl);
          rgb$4[3] = 1;
          return rgb$4;
        }
        if (m = css.match(RE_HSLA)) {
          var hsl$12 = m.slice(1, 4);
          hsl$12[1] *= 0.01;
          hsl$12[2] *= 0.01;
          var rgb$5 = hsl2rgb_1(hsl$12);
          rgb$5[3] = +m[4];
          return rgb$5;
        }
      };
      css2rgb.test = function(s) {
        return RE_RGB.test(s) || RE_RGBA.test(s) || RE_RGB_PCT.test(s) || RE_RGBA_PCT.test(s) || RE_HSL.test(s) || RE_HSLA.test(s);
      };
      var css2rgb_1 = css2rgb;
      var type$3 = utils.type;
      Color_1.prototype.css = function(mode) {
        return rgb2css_1(this._rgb, mode);
      };
      chroma_1.css = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ["css"])))();
      };
      input.format.css = css2rgb_1;
      input.autodetect.push({
        p: 5,
        test: function(h) {
          var rest = [], len = arguments.length - 1;
          while (len-- > 0)
            rest[len] = arguments[len + 1];
          if (!rest.length && type$3(h) === "string" && css2rgb_1.test(h)) {
            return "css";
          }
        }
      });
      var unpack$8 = utils.unpack;
      input.format.gl = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var rgb = unpack$8(args, "rgba");
        rgb[0] *= 255;
        rgb[1] *= 255;
        rgb[2] *= 255;
        return rgb;
      };
      chroma_1.gl = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ["gl"])))();
      };
      Color_1.prototype.gl = function() {
        var rgb = this._rgb;
        return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, rgb[3]];
      };
      var unpack$9 = utils.unpack;
      var rgb2hcg = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var ref = unpack$9(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var min2 = Math.min(r, g, b);
        var max2 = Math.max(r, g, b);
        var delta = max2 - min2;
        var c = delta * 100 / 255;
        var _g = min2 / (255 - delta) * 100;
        var h;
        if (delta === 0) {
          h = Number.NaN;
        } else {
          if (r === max2) {
            h = (g - b) / delta;
          }
          if (g === max2) {
            h = 2 + (b - r) / delta;
          }
          if (b === max2) {
            h = 4 + (r - g) / delta;
          }
          h *= 60;
          if (h < 0) {
            h += 360;
          }
        }
        return [h, c, _g];
      };
      var rgb2hcg_1 = rgb2hcg;
      var unpack$a = utils.unpack;
      var floor = Math.floor;
      var hcg2rgb = function() {
        var assign, assign$1, assign$2, assign$3, assign$4, assign$5;
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$a(args, "hcg");
        var h = args[0];
        var c = args[1];
        var _g = args[2];
        var r, g, b;
        _g = _g * 255;
        var _c = c * 255;
        if (c === 0) {
          r = g = b = _g;
        } else {
          if (h === 360) {
            h = 0;
          }
          if (h > 360) {
            h -= 360;
          }
          if (h < 0) {
            h += 360;
          }
          h /= 60;
          var i2 = floor(h);
          var f = h - i2;
          var p = _g * (1 - c);
          var q = p + _c * (1 - f);
          var t = p + _c * f;
          var v = p + _c;
          switch (i2) {
            case 0:
              assign = [v, t, p], r = assign[0], g = assign[1], b = assign[2];
              break;
            case 1:
              assign$1 = [q, v, p], r = assign$1[0], g = assign$1[1], b = assign$1[2];
              break;
            case 2:
              assign$2 = [p, v, t], r = assign$2[0], g = assign$2[1], b = assign$2[2];
              break;
            case 3:
              assign$3 = [p, q, v], r = assign$3[0], g = assign$3[1], b = assign$3[2];
              break;
            case 4:
              assign$4 = [t, p, v], r = assign$4[0], g = assign$4[1], b = assign$4[2];
              break;
            case 5:
              assign$5 = [v, p, q], r = assign$5[0], g = assign$5[1], b = assign$5[2];
              break;
          }
        }
        return [r, g, b, args.length > 3 ? args[3] : 1];
      };
      var hcg2rgb_1 = hcg2rgb;
      var unpack$b = utils.unpack;
      var type$4 = utils.type;
      Color_1.prototype.hcg = function() {
        return rgb2hcg_1(this._rgb);
      };
      chroma_1.hcg = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ["hcg"])))();
      };
      input.format.hcg = hcg2rgb_1;
      input.autodetect.push({
        p: 1,
        test: function() {
          var args = [], len = arguments.length;
          while (len--)
            args[len] = arguments[len];
          args = unpack$b(args, "hcg");
          if (type$4(args) === "array" && args.length === 3) {
            return "hcg";
          }
        }
      });
      var unpack$c = utils.unpack;
      var last$4 = utils.last;
      var round$3 = Math.round;
      var rgb2hex = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var ref = unpack$c(args, "rgba");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var a = ref[3];
        var mode = last$4(args) || "auto";
        if (a === void 0) {
          a = 1;
        }
        if (mode === "auto") {
          mode = a < 1 ? "rgba" : "rgb";
        }
        r = round$3(r);
        g = round$3(g);
        b = round$3(b);
        var u = r << 16 | g << 8 | b;
        var str = "000000" + u.toString(16);
        str = str.substr(str.length - 6);
        var hxa = "0" + round$3(a * 255).toString(16);
        hxa = hxa.substr(hxa.length - 2);
        switch (mode.toLowerCase()) {
          case "rgba":
            return "#" + str + hxa;
          case "argb":
            return "#" + hxa + str;
          default:
            return "#" + str;
        }
      };
      var rgb2hex_1 = rgb2hex;
      var RE_HEX = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      var RE_HEXA = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/;
      var hex2rgb = function(hex) {
        if (hex.match(RE_HEX)) {
          if (hex.length === 4 || hex.length === 7) {
            hex = hex.substr(1);
          }
          if (hex.length === 3) {
            hex = hex.split("");
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
          }
          var u = parseInt(hex, 16);
          var r = u >> 16;
          var g = u >> 8 & 255;
          var b = u & 255;
          return [r, g, b, 1];
        }
        if (hex.match(RE_HEXA)) {
          if (hex.length === 5 || hex.length === 9) {
            hex = hex.substr(1);
          }
          if (hex.length === 4) {
            hex = hex.split("");
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
          }
          var u$1 = parseInt(hex, 16);
          var r$1 = u$1 >> 24 & 255;
          var g$1 = u$1 >> 16 & 255;
          var b$1 = u$1 >> 8 & 255;
          var a = Math.round((u$1 & 255) / 255 * 100) / 100;
          return [r$1, g$1, b$1, a];
        }
        throw new Error("unknown hex color: " + hex);
      };
      var hex2rgb_1 = hex2rgb;
      var type$5 = utils.type;
      Color_1.prototype.hex = function(mode) {
        return rgb2hex_1(this._rgb, mode);
      };
      chroma_1.hex = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ["hex"])))();
      };
      input.format.hex = hex2rgb_1;
      input.autodetect.push({
        p: 4,
        test: function(h) {
          var rest = [], len = arguments.length - 1;
          while (len-- > 0)
            rest[len] = arguments[len + 1];
          if (!rest.length && type$5(h) === "string" && [3, 4, 5, 6, 7, 8, 9].indexOf(h.length) >= 0) {
            return "hex";
          }
        }
      });
      var unpack$d = utils.unpack;
      var TWOPI = utils.TWOPI;
      var min = Math.min;
      var sqrt = Math.sqrt;
      var acos = Math.acos;
      var rgb2hsi = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var ref = unpack$d(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        r /= 255;
        g /= 255;
        b /= 255;
        var h;
        var min_ = min(r, g, b);
        var i2 = (r + g + b) / 3;
        var s = i2 > 0 ? 1 - min_ / i2 : 0;
        if (s === 0) {
          h = NaN;
        } else {
          h = (r - g + (r - b)) / 2;
          h /= sqrt((r - g) * (r - g) + (r - b) * (g - b));
          h = acos(h);
          if (b > g) {
            h = TWOPI - h;
          }
          h /= TWOPI;
        }
        return [h * 360, s, i2];
      };
      var rgb2hsi_1 = rgb2hsi;
      var unpack$e = utils.unpack;
      var limit$1 = utils.limit;
      var TWOPI$1 = utils.TWOPI;
      var PITHIRD = utils.PITHIRD;
      var cos = Math.cos;
      var hsi2rgb = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$e(args, "hsi");
        var h = args[0];
        var s = args[1];
        var i2 = args[2];
        var r, g, b;
        if (isNaN(h)) {
          h = 0;
        }
        if (isNaN(s)) {
          s = 0;
        }
        if (h > 360) {
          h -= 360;
        }
        if (h < 0) {
          h += 360;
        }
        h /= 360;
        if (h < 1 / 3) {
          b = (1 - s) / 3;
          r = (1 + s * cos(TWOPI$1 * h) / cos(PITHIRD - TWOPI$1 * h)) / 3;
          g = 1 - (b + r);
        } else if (h < 2 / 3) {
          h -= 1 / 3;
          r = (1 - s) / 3;
          g = (1 + s * cos(TWOPI$1 * h) / cos(PITHIRD - TWOPI$1 * h)) / 3;
          b = 1 - (r + g);
        } else {
          h -= 2 / 3;
          g = (1 - s) / 3;
          b = (1 + s * cos(TWOPI$1 * h) / cos(PITHIRD - TWOPI$1 * h)) / 3;
          r = 1 - (g + b);
        }
        r = limit$1(i2 * r * 3);
        g = limit$1(i2 * g * 3);
        b = limit$1(i2 * b * 3);
        return [r * 255, g * 255, b * 255, args.length > 3 ? args[3] : 1];
      };
      var hsi2rgb_1 = hsi2rgb;
      var unpack$f = utils.unpack;
      var type$6 = utils.type;
      Color_1.prototype.hsi = function() {
        return rgb2hsi_1(this._rgb);
      };
      chroma_1.hsi = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ["hsi"])))();
      };
      input.format.hsi = hsi2rgb_1;
      input.autodetect.push({
        p: 2,
        test: function() {
          var args = [], len = arguments.length;
          while (len--)
            args[len] = arguments[len];
          args = unpack$f(args, "hsi");
          if (type$6(args) === "array" && args.length === 3) {
            return "hsi";
          }
        }
      });
      var unpack$g = utils.unpack;
      var type$7 = utils.type;
      Color_1.prototype.hsl = function() {
        return rgb2hsl_1(this._rgb);
      };
      chroma_1.hsl = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ["hsl"])))();
      };
      input.format.hsl = hsl2rgb_1;
      input.autodetect.push({
        p: 2,
        test: function() {
          var args = [], len = arguments.length;
          while (len--)
            args[len] = arguments[len];
          args = unpack$g(args, "hsl");
          if (type$7(args) === "array" && args.length === 3) {
            return "hsl";
          }
        }
      });
      var unpack$h = utils.unpack;
      var min$1 = Math.min;
      var max$1 = Math.max;
      var rgb2hsl$1 = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$h(args, "rgb");
        var r = args[0];
        var g = args[1];
        var b = args[2];
        var min_ = min$1(r, g, b);
        var max_ = max$1(r, g, b);
        var delta = max_ - min_;
        var h, s, v;
        v = max_ / 255;
        if (max_ === 0) {
          h = Number.NaN;
          s = 0;
        } else {
          s = delta / max_;
          if (r === max_) {
            h = (g - b) / delta;
          }
          if (g === max_) {
            h = 2 + (b - r) / delta;
          }
          if (b === max_) {
            h = 4 + (r - g) / delta;
          }
          h *= 60;
          if (h < 0) {
            h += 360;
          }
        }
        return [h, s, v];
      };
      var rgb2hsv = rgb2hsl$1;
      var unpack$i = utils.unpack;
      var floor$1 = Math.floor;
      var hsv2rgb = function() {
        var assign, assign$1, assign$2, assign$3, assign$4, assign$5;
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$i(args, "hsv");
        var h = args[0];
        var s = args[1];
        var v = args[2];
        var r, g, b;
        v *= 255;
        if (s === 0) {
          r = g = b = v;
        } else {
          if (h === 360) {
            h = 0;
          }
          if (h > 360) {
            h -= 360;
          }
          if (h < 0) {
            h += 360;
          }
          h /= 60;
          var i2 = floor$1(h);
          var f = h - i2;
          var p = v * (1 - s);
          var q = v * (1 - s * f);
          var t = v * (1 - s * (1 - f));
          switch (i2) {
            case 0:
              assign = [v, t, p], r = assign[0], g = assign[1], b = assign[2];
              break;
            case 1:
              assign$1 = [q, v, p], r = assign$1[0], g = assign$1[1], b = assign$1[2];
              break;
            case 2:
              assign$2 = [p, v, t], r = assign$2[0], g = assign$2[1], b = assign$2[2];
              break;
            case 3:
              assign$3 = [p, q, v], r = assign$3[0], g = assign$3[1], b = assign$3[2];
              break;
            case 4:
              assign$4 = [t, p, v], r = assign$4[0], g = assign$4[1], b = assign$4[2];
              break;
            case 5:
              assign$5 = [v, p, q], r = assign$5[0], g = assign$5[1], b = assign$5[2];
              break;
          }
        }
        return [r, g, b, args.length > 3 ? args[3] : 1];
      };
      var hsv2rgb_1 = hsv2rgb;
      var unpack$j = utils.unpack;
      var type$8 = utils.type;
      Color_1.prototype.hsv = function() {
        return rgb2hsv(this._rgb);
      };
      chroma_1.hsv = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ["hsv"])))();
      };
      input.format.hsv = hsv2rgb_1;
      input.autodetect.push({
        p: 2,
        test: function() {
          var args = [], len = arguments.length;
          while (len--)
            args[len] = arguments[len];
          args = unpack$j(args, "hsv");
          if (type$8(args) === "array" && args.length === 3) {
            return "hsv";
          }
        }
      });
      var labConstants = {
        Kn: 18,
        Xn: 0.95047,
        Yn: 1,
        Zn: 1.08883,
        t0: 0.137931034,
        t1: 0.206896552,
        t2: 0.12841855,
        t3: 8856452e-9
      };
      var unpack$k = utils.unpack;
      var pow = Math.pow;
      var rgb2lab = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var ref = unpack$k(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2xyz(r, g, b);
        var x = ref$1[0];
        var y = ref$1[1];
        var z = ref$1[2];
        var l = 116 * y - 16;
        return [l < 0 ? 0 : l, 500 * (x - y), 200 * (y - z)];
      };
      var rgb_xyz = function(r) {
        if ((r /= 255) <= 0.04045) {
          return r / 12.92;
        }
        return pow((r + 0.055) / 1.055, 2.4);
      };
      var xyz_lab = function(t) {
        if (t > labConstants.t3) {
          return pow(t, 1 / 3);
        }
        return t / labConstants.t2 + labConstants.t0;
      };
      var rgb2xyz = function(r, g, b) {
        r = rgb_xyz(r);
        g = rgb_xyz(g);
        b = rgb_xyz(b);
        var x = xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / labConstants.Xn);
        var y = xyz_lab((0.2126729 * r + 0.7151522 * g + 0.072175 * b) / labConstants.Yn);
        var z = xyz_lab((0.0193339 * r + 0.119192 * g + 0.9503041 * b) / labConstants.Zn);
        return [x, y, z];
      };
      var rgb2lab_1 = rgb2lab;
      var unpack$l = utils.unpack;
      var pow$1 = Math.pow;
      var lab2rgb = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$l(args, "lab");
        var l = args[0];
        var a = args[1];
        var b = args[2];
        var x, y, z, r, g, b_;
        y = (l + 16) / 116;
        x = isNaN(a) ? y : y + a / 500;
        z = isNaN(b) ? y : y - b / 200;
        y = labConstants.Yn * lab_xyz(y);
        x = labConstants.Xn * lab_xyz(x);
        z = labConstants.Zn * lab_xyz(z);
        r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z);
        g = xyz_rgb(-0.969266 * x + 1.8760108 * y + 0.041556 * z);
        b_ = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);
        return [r, g, b_, args.length > 3 ? args[3] : 1];
      };
      var xyz_rgb = function(r) {
        return 255 * (r <= 304e-5 ? 12.92 * r : 1.055 * pow$1(r, 1 / 2.4) - 0.055);
      };
      var lab_xyz = function(t) {
        return t > labConstants.t1 ? t * t * t : labConstants.t2 * (t - labConstants.t0);
      };
      var lab2rgb_1 = lab2rgb;
      var unpack$m = utils.unpack;
      var type$9 = utils.type;
      Color_1.prototype.lab = function() {
        return rgb2lab_1(this._rgb);
      };
      chroma_1.lab = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ["lab"])))();
      };
      input.format.lab = lab2rgb_1;
      input.autodetect.push({
        p: 2,
        test: function() {
          var args = [], len = arguments.length;
          while (len--)
            args[len] = arguments[len];
          args = unpack$m(args, "lab");
          if (type$9(args) === "array" && args.length === 3) {
            return "lab";
          }
        }
      });
      var unpack$n = utils.unpack;
      var RAD2DEG = utils.RAD2DEG;
      var sqrt$1 = Math.sqrt;
      var atan2 = Math.atan2;
      var round$4 = Math.round;
      var lab2lch = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var ref = unpack$n(args, "lab");
        var l = ref[0];
        var a = ref[1];
        var b = ref[2];
        var c = sqrt$1(a * a + b * b);
        var h = (atan2(b, a) * RAD2DEG + 360) % 360;
        if (round$4(c * 1e4) === 0) {
          h = Number.NaN;
        }
        return [l, c, h];
      };
      var lab2lch_1 = lab2lch;
      var unpack$o = utils.unpack;
      var rgb2lch = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var ref = unpack$o(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2lab_1(r, g, b);
        var l = ref$1[0];
        var a = ref$1[1];
        var b_ = ref$1[2];
        return lab2lch_1(l, a, b_);
      };
      var rgb2lch_1 = rgb2lch;
      var unpack$p = utils.unpack;
      var DEG2RAD = utils.DEG2RAD;
      var sin = Math.sin;
      var cos$1 = Math.cos;
      var lch2lab = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var ref = unpack$p(args, "lch");
        var l = ref[0];
        var c = ref[1];
        var h = ref[2];
        if (isNaN(h)) {
          h = 0;
        }
        h = h * DEG2RAD;
        return [l, cos$1(h) * c, sin(h) * c];
      };
      var lch2lab_1 = lch2lab;
      var unpack$q = utils.unpack;
      var lch2rgb = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$q(args, "lch");
        var l = args[0];
        var c = args[1];
        var h = args[2];
        var ref = lch2lab_1(l, c, h);
        var L = ref[0];
        var a = ref[1];
        var b_ = ref[2];
        var ref$1 = lab2rgb_1(L, a, b_);
        var r = ref$1[0];
        var g = ref$1[1];
        var b = ref$1[2];
        return [r, g, b, args.length > 3 ? args[3] : 1];
      };
      var lch2rgb_1 = lch2rgb;
      var unpack$r = utils.unpack;
      var hcl2rgb = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var hcl = unpack$r(args, "hcl").reverse();
        return lch2rgb_1.apply(void 0, hcl);
      };
      var hcl2rgb_1 = hcl2rgb;
      var unpack$s = utils.unpack;
      var type$a = utils.type;
      Color_1.prototype.lch = function() {
        return rgb2lch_1(this._rgb);
      };
      Color_1.prototype.hcl = function() {
        return rgb2lch_1(this._rgb).reverse();
      };
      chroma_1.lch = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ["lch"])))();
      };
      chroma_1.hcl = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ["hcl"])))();
      };
      input.format.lch = lch2rgb_1;
      input.format.hcl = hcl2rgb_1;
      ["lch", "hcl"].forEach(function(m) {
        return input.autodetect.push({
          p: 2,
          test: function() {
            var args = [], len = arguments.length;
            while (len--)
              args[len] = arguments[len];
            args = unpack$s(args, m);
            if (type$a(args) === "array" && args.length === 3) {
              return m;
            }
          }
        });
      });
      var w3cx11 = {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflower: "#6495ed",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkgrey: "#a9a9a9",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkslategrey: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dimgrey: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        grey: "#808080",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        laserlemon: "#ffff54",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrod: "#fafad2",
        lightgoldenrodyellow: "#fafad2",
        lightgray: "#d3d3d3",
        lightgreen: "#90ee90",
        lightgrey: "#d3d3d3",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        maroon2: "#7f0000",
        maroon3: "#b03060",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370db",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#db7093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        purple2: "#7f007f",
        purple3: "#a020f0",
        rebeccapurple: "#663399",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        slategrey: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32"
      };
      var w3cx11_1 = w3cx11;
      var type$b = utils.type;
      Color_1.prototype.name = function() {
        var hex = rgb2hex_1(this._rgb, "rgb");
        for (var i2 = 0, list2 = Object.keys(w3cx11_1); i2 < list2.length; i2 += 1) {
          var n = list2[i2];
          if (w3cx11_1[n] === hex) {
            return n.toLowerCase();
          }
        }
        return hex;
      };
      input.format.named = function(name2) {
        name2 = name2.toLowerCase();
        if (w3cx11_1[name2]) {
          return hex2rgb_1(w3cx11_1[name2]);
        }
        throw new Error("unknown color name: " + name2);
      };
      input.autodetect.push({
        p: 5,
        test: function(h) {
          var rest = [], len = arguments.length - 1;
          while (len-- > 0)
            rest[len] = arguments[len + 1];
          if (!rest.length && type$b(h) === "string" && w3cx11_1[h.toLowerCase()]) {
            return "named";
          }
        }
      });
      var unpack$t = utils.unpack;
      var rgb2num = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var ref = unpack$t(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        return (r << 16) + (g << 8) + b;
      };
      var rgb2num_1 = rgb2num;
      var type$c = utils.type;
      var num2rgb = function(num) {
        if (type$c(num) == "number" && num >= 0 && num <= 16777215) {
          var r = num >> 16;
          var g = num >> 8 & 255;
          var b = num & 255;
          return [r, g, b, 1];
        }
        throw new Error("unknown num color: " + num);
      };
      var num2rgb_1 = num2rgb;
      var type$d = utils.type;
      Color_1.prototype.num = function() {
        return rgb2num_1(this._rgb);
      };
      chroma_1.num = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ["num"])))();
      };
      input.format.num = num2rgb_1;
      input.autodetect.push({
        p: 5,
        test: function() {
          var args = [], len = arguments.length;
          while (len--)
            args[len] = arguments[len];
          if (args.length === 1 && type$d(args[0]) === "number" && args[0] >= 0 && args[0] <= 16777215) {
            return "num";
          }
        }
      });
      var unpack$u = utils.unpack;
      var type$e = utils.type;
      var round$5 = Math.round;
      Color_1.prototype.rgb = function(rnd2) {
        if (rnd2 === void 0)
          rnd2 = true;
        if (rnd2 === false) {
          return this._rgb.slice(0, 3);
        }
        return this._rgb.slice(0, 3).map(round$5);
      };
      Color_1.prototype.rgba = function(rnd2) {
        if (rnd2 === void 0)
          rnd2 = true;
        return this._rgb.slice(0, 4).map(function(v, i2) {
          return i2 < 3 ? rnd2 === false ? v : round$5(v) : v;
        });
      };
      chroma_1.rgb = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ["rgb"])))();
      };
      input.format.rgb = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var rgba = unpack$u(args, "rgba");
        if (rgba[3] === void 0) {
          rgba[3] = 1;
        }
        return rgba;
      };
      input.autodetect.push({
        p: 3,
        test: function() {
          var args = [], len = arguments.length;
          while (len--)
            args[len] = arguments[len];
          args = unpack$u(args, "rgba");
          if (type$e(args) === "array" && (args.length === 3 || args.length === 4 && type$e(args[3]) == "number" && args[3] >= 0 && args[3] <= 1)) {
            return "rgb";
          }
        }
      });
      var log = Math.log;
      var temperature2rgb = function(kelvin) {
        var temp = kelvin / 100;
        var r, g, b;
        if (temp < 66) {
          r = 255;
          g = -155.25485562709179 - 0.44596950469579133 * (g = temp - 2) + 104.49216199393888 * log(g);
          b = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp - 10) + 115.67994401066147 * log(b);
        } else {
          r = 351.97690566805693 + 0.114206453784165 * (r = temp - 55) - 40.25366309332127 * log(r);
          g = 325.4494125711974 + 0.07943456536662342 * (g = temp - 50) - 28.0852963507957 * log(g);
          b = 255;
        }
        return [r, g, b, 1];
      };
      var temperature2rgb_1 = temperature2rgb;
      var unpack$v = utils.unpack;
      var round$6 = Math.round;
      var rgb2temperature = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        var rgb = unpack$v(args, "rgb");
        var r = rgb[0], b = rgb[2];
        var minTemp = 1e3;
        var maxTemp = 4e4;
        var eps = 0.4;
        var temp;
        while (maxTemp - minTemp > eps) {
          temp = (maxTemp + minTemp) * 0.5;
          var rgb$12 = temperature2rgb_1(temp);
          if (rgb$12[2] / rgb$12[0] >= b / r) {
            maxTemp = temp;
          } else {
            minTemp = temp;
          }
        }
        return round$6(temp);
      };
      var rgb2temperature_1 = rgb2temperature;
      Color_1.prototype.temp = Color_1.prototype.kelvin = Color_1.prototype.temperature = function() {
        return rgb2temperature_1(this._rgb);
      };
      chroma_1.temp = chroma_1.kelvin = chroma_1.temperature = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color_1, [null].concat(args, ["temp"])))();
      };
      input.format.temp = input.format.kelvin = input.format.temperature = temperature2rgb_1;
      var type$f = utils.type;
      Color_1.prototype.alpha = function(a, mutate) {
        if (mutate === void 0)
          mutate = false;
        if (a !== void 0 && type$f(a) === "number") {
          if (mutate) {
            this._rgb[3] = a;
            return this;
          }
          return new Color_1([this._rgb[0], this._rgb[1], this._rgb[2], a], "rgb");
        }
        return this._rgb[3];
      };
      Color_1.prototype.clipped = function() {
        return this._rgb._clipped || false;
      };
      Color_1.prototype.darken = function(amount) {
        if (amount === void 0)
          amount = 1;
        var me = this;
        var lab = me.lab();
        lab[0] -= labConstants.Kn * amount;
        return new Color_1(lab, "lab").alpha(me.alpha(), true);
      };
      Color_1.prototype.brighten = function(amount) {
        if (amount === void 0)
          amount = 1;
        return this.darken(-amount);
      };
      Color_1.prototype.darker = Color_1.prototype.darken;
      Color_1.prototype.brighter = Color_1.prototype.brighten;
      Color_1.prototype.get = function(mc) {
        var ref = mc.split(".");
        var mode = ref[0];
        var channel = ref[1];
        var src = this[mode]();
        if (channel) {
          var i2 = mode.indexOf(channel);
          if (i2 > -1) {
            return src[i2];
          }
          throw new Error("unknown channel " + channel + " in mode " + mode);
        } else {
          return src;
        }
      };
      var type$g = utils.type;
      var pow$2 = Math.pow;
      var EPS = 1e-7;
      var MAX_ITER = 20;
      Color_1.prototype.luminance = function(lum) {
        if (lum !== void 0 && type$g(lum) === "number") {
          if (lum === 0) {
            return new Color_1([0, 0, 0, this._rgb[3]], "rgb");
          }
          if (lum === 1) {
            return new Color_1([255, 255, 255, this._rgb[3]], "rgb");
          }
          var cur_lum = this.luminance();
          var mode = "rgb";
          var max_iter = MAX_ITER;
          var test = function(low, high) {
            var mid = low.interpolate(high, 0.5, mode);
            var lm = mid.luminance();
            if (Math.abs(lum - lm) < EPS || !max_iter--) {
              return mid;
            }
            return lm > lum ? test(low, mid) : test(mid, high);
          };
          var rgb = (cur_lum > lum ? test(new Color_1([0, 0, 0]), this) : test(this, new Color_1([255, 255, 255]))).rgb();
          return new Color_1(rgb.concat([this._rgb[3]]));
        }
        return rgb2luminance.apply(void 0, this._rgb.slice(0, 3));
      };
      var rgb2luminance = function(r, g, b) {
        r = luminance_x(r);
        g = luminance_x(g);
        b = luminance_x(b);
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };
      var luminance_x = function(x) {
        x /= 255;
        return x <= 0.03928 ? x / 12.92 : pow$2((x + 0.055) / 1.055, 2.4);
      };
      var interpolator = {};
      var type$h = utils.type;
      var mix = function(col1, col2, f) {
        if (f === void 0)
          f = 0.5;
        var rest = [], len = arguments.length - 3;
        while (len-- > 0)
          rest[len] = arguments[len + 3];
        var mode = rest[0] || "lrgb";
        if (!interpolator[mode] && !rest.length) {
          mode = Object.keys(interpolator)[0];
        }
        if (!interpolator[mode]) {
          throw new Error("interpolation mode " + mode + " is not defined");
        }
        if (type$h(col1) !== "object") {
          col1 = new Color_1(col1);
        }
        if (type$h(col2) !== "object") {
          col2 = new Color_1(col2);
        }
        return interpolator[mode](col1, col2, f).alpha(col1.alpha() + f * (col2.alpha() - col1.alpha()));
      };
      Color_1.prototype.mix = Color_1.prototype.interpolate = function(col2, f) {
        if (f === void 0)
          f = 0.5;
        var rest = [], len = arguments.length - 2;
        while (len-- > 0)
          rest[len] = arguments[len + 2];
        return mix.apply(void 0, [this, col2, f].concat(rest));
      };
      Color_1.prototype.premultiply = function(mutate) {
        if (mutate === void 0)
          mutate = false;
        var rgb = this._rgb;
        var a = rgb[3];
        if (mutate) {
          this._rgb = [rgb[0] * a, rgb[1] * a, rgb[2] * a, a];
          return this;
        } else {
          return new Color_1([rgb[0] * a, rgb[1] * a, rgb[2] * a, a], "rgb");
        }
      };
      Color_1.prototype.saturate = function(amount) {
        if (amount === void 0)
          amount = 1;
        var me = this;
        var lch = me.lch();
        lch[1] += labConstants.Kn * amount;
        if (lch[1] < 0) {
          lch[1] = 0;
        }
        return new Color_1(lch, "lch").alpha(me.alpha(), true);
      };
      Color_1.prototype.desaturate = function(amount) {
        if (amount === void 0)
          amount = 1;
        return this.saturate(-amount);
      };
      var type$i = utils.type;
      Color_1.prototype.set = function(mc, value, mutate) {
        if (mutate === void 0)
          mutate = false;
        var ref = mc.split(".");
        var mode = ref[0];
        var channel = ref[1];
        var src = this[mode]();
        if (channel) {
          var i2 = mode.indexOf(channel);
          if (i2 > -1) {
            if (type$i(value) == "string") {
              switch (value.charAt(0)) {
                case "+":
                  src[i2] += +value;
                  break;
                case "-":
                  src[i2] += +value;
                  break;
                case "*":
                  src[i2] *= +value.substr(1);
                  break;
                case "/":
                  src[i2] /= +value.substr(1);
                  break;
                default:
                  src[i2] = +value;
              }
            } else if (type$i(value) === "number") {
              src[i2] = value;
            } else {
              throw new Error("unsupported value for Color.set");
            }
            var out = new Color_1(src, mode);
            if (mutate) {
              this._rgb = out._rgb;
              return this;
            }
            return out;
          }
          throw new Error("unknown channel " + channel + " in mode " + mode);
        } else {
          return src;
        }
      };
      var rgb$1 = function(col1, col2, f) {
        var xyz0 = col1._rgb;
        var xyz1 = col2._rgb;
        return new Color_1(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), "rgb");
      };
      interpolator.rgb = rgb$1;
      var sqrt$2 = Math.sqrt;
      var pow$3 = Math.pow;
      var lrgb = function(col1, col2, f) {
        var ref = col1._rgb;
        var x1 = ref[0];
        var y1 = ref[1];
        var z1 = ref[2];
        var ref$1 = col2._rgb;
        var x2 = ref$1[0];
        var y2 = ref$1[1];
        var z2 = ref$1[2];
        return new Color_1(sqrt$2(pow$3(x1, 2) * (1 - f) + pow$3(x2, 2) * f), sqrt$2(pow$3(y1, 2) * (1 - f) + pow$3(y2, 2) * f), sqrt$2(pow$3(z1, 2) * (1 - f) + pow$3(z2, 2) * f), "rgb");
      };
      interpolator.lrgb = lrgb;
      var lab$1 = function(col1, col2, f) {
        var xyz0 = col1.lab();
        var xyz1 = col2.lab();
        return new Color_1(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), "lab");
      };
      interpolator.lab = lab$1;
      var _hsx = function(col1, col2, f, m) {
        var assign, assign$1;
        var xyz0, xyz1;
        if (m === "hsl") {
          xyz0 = col1.hsl();
          xyz1 = col2.hsl();
        } else if (m === "hsv") {
          xyz0 = col1.hsv();
          xyz1 = col2.hsv();
        } else if (m === "hcg") {
          xyz0 = col1.hcg();
          xyz1 = col2.hcg();
        } else if (m === "hsi") {
          xyz0 = col1.hsi();
          xyz1 = col2.hsi();
        } else if (m === "lch" || m === "hcl") {
          m = "hcl";
          xyz0 = col1.hcl();
          xyz1 = col2.hcl();
        }
        var hue0, hue1, sat0, sat1, lbv0, lbv1;
        if (m.substr(0, 1) === "h") {
          assign = xyz0, hue0 = assign[0], sat0 = assign[1], lbv0 = assign[2];
          assign$1 = xyz1, hue1 = assign$1[0], sat1 = assign$1[1], lbv1 = assign$1[2];
        }
        var sat, hue, lbv, dh;
        if (!isNaN(hue0) && !isNaN(hue1)) {
          if (hue1 > hue0 && hue1 - hue0 > 180) {
            dh = hue1 - (hue0 + 360);
          } else if (hue1 < hue0 && hue0 - hue1 > 180) {
            dh = hue1 + 360 - hue0;
          } else {
            dh = hue1 - hue0;
          }
          hue = hue0 + f * dh;
        } else if (!isNaN(hue0)) {
          hue = hue0;
          if ((lbv1 == 1 || lbv1 == 0) && m != "hsv") {
            sat = sat0;
          }
        } else if (!isNaN(hue1)) {
          hue = hue1;
          if ((lbv0 == 1 || lbv0 == 0) && m != "hsv") {
            sat = sat1;
          }
        } else {
          hue = Number.NaN;
        }
        if (sat === void 0) {
          sat = sat0 + f * (sat1 - sat0);
        }
        lbv = lbv0 + f * (lbv1 - lbv0);
        return new Color_1([hue, sat, lbv], m);
      };
      var lch$1 = function(col1, col2, f) {
        return _hsx(col1, col2, f, "lch");
      };
      interpolator.lch = lch$1;
      interpolator.hcl = lch$1;
      var num$1 = function(col1, col2, f) {
        var c1 = col1.num();
        var c2 = col2.num();
        return new Color_1(c1 + f * (c2 - c1), "num");
      };
      interpolator.num = num$1;
      var hcg$1 = function(col1, col2, f) {
        return _hsx(col1, col2, f, "hcg");
      };
      interpolator.hcg = hcg$1;
      var hsi$1 = function(col1, col2, f) {
        return _hsx(col1, col2, f, "hsi");
      };
      interpolator.hsi = hsi$1;
      var hsl$1 = function(col1, col2, f) {
        return _hsx(col1, col2, f, "hsl");
      };
      interpolator.hsl = hsl$1;
      var hsv$1 = function(col1, col2, f) {
        return _hsx(col1, col2, f, "hsv");
      };
      interpolator.hsv = hsv$1;
      var clip_rgb$2 = utils.clip_rgb;
      var pow$4 = Math.pow;
      var sqrt$3 = Math.sqrt;
      var PI$1 = Math.PI;
      var cos$2 = Math.cos;
      var sin$1 = Math.sin;
      var atan2$1 = Math.atan2;
      var average = function(colors, mode, weights) {
        if (mode === void 0)
          mode = "lrgb";
        if (weights === void 0)
          weights = null;
        var l = colors.length;
        if (!weights) {
          weights = Array.from(new Array(l)).map(function() {
            return 1;
          });
        }
        var k = l / weights.reduce(function(a, b) {
          return a + b;
        });
        weights.forEach(function(w, i3) {
          weights[i3] *= k;
        });
        colors = colors.map(function(c) {
          return new Color_1(c);
        });
        if (mode === "lrgb") {
          return _average_lrgb(colors, weights);
        }
        var first = colors.shift();
        var xyz = first.get(mode);
        var cnt = [];
        var dx = 0;
        var dy = 0;
        for (var i2 = 0; i2 < xyz.length; i2++) {
          xyz[i2] = (xyz[i2] || 0) * weights[0];
          cnt.push(isNaN(xyz[i2]) ? 0 : weights[0]);
          if (mode.charAt(i2) === "h" && !isNaN(xyz[i2])) {
            var A = xyz[i2] / 180 * PI$1;
            dx += cos$2(A) * weights[0];
            dy += sin$1(A) * weights[0];
          }
        }
        var alpha = first.alpha() * weights[0];
        colors.forEach(function(c, ci) {
          var xyz2 = c.get(mode);
          alpha += c.alpha() * weights[ci + 1];
          for (var i3 = 0; i3 < xyz.length; i3++) {
            if (!isNaN(xyz2[i3])) {
              cnt[i3] += weights[ci + 1];
              if (mode.charAt(i3) === "h") {
                var A2 = xyz2[i3] / 180 * PI$1;
                dx += cos$2(A2) * weights[ci + 1];
                dy += sin$1(A2) * weights[ci + 1];
              } else {
                xyz[i3] += xyz2[i3] * weights[ci + 1];
              }
            }
          }
        });
        for (var i$12 = 0; i$12 < xyz.length; i$12++) {
          if (mode.charAt(i$12) === "h") {
            var A$1 = atan2$1(dy / cnt[i$12], dx / cnt[i$12]) / PI$1 * 180;
            while (A$1 < 0) {
              A$1 += 360;
            }
            while (A$1 >= 360) {
              A$1 -= 360;
            }
            xyz[i$12] = A$1;
          } else {
            xyz[i$12] = xyz[i$12] / cnt[i$12];
          }
        }
        alpha /= l;
        return new Color_1(xyz, mode).alpha(alpha > 0.99999 ? 1 : alpha, true);
      };
      var _average_lrgb = function(colors, weights) {
        var l = colors.length;
        var xyz = [0, 0, 0, 0];
        for (var i2 = 0; i2 < colors.length; i2++) {
          var col = colors[i2];
          var f = weights[i2] / l;
          var rgb = col._rgb;
          xyz[0] += pow$4(rgb[0], 2) * f;
          xyz[1] += pow$4(rgb[1], 2) * f;
          xyz[2] += pow$4(rgb[2], 2) * f;
          xyz[3] += rgb[3] * f;
        }
        xyz[0] = sqrt$3(xyz[0]);
        xyz[1] = sqrt$3(xyz[1]);
        xyz[2] = sqrt$3(xyz[2]);
        if (xyz[3] > 0.9999999) {
          xyz[3] = 1;
        }
        return new Color_1(clip_rgb$2(xyz));
      };
      var type$j = utils.type;
      var pow$5 = Math.pow;
      var scale = function(colors) {
        var _mode = "rgb";
        var _nacol = chroma_1("#ccc");
        var _spread = 0;
        var _domain = [0, 1];
        var _pos = [];
        var _padding = [0, 0];
        var _classes = false;
        var _colors = [];
        var _out = false;
        var _min = 0;
        var _max = 1;
        var _correctLightness = false;
        var _colorCache = {};
        var _useCache = true;
        var _gamma = 1;
        var setColors = function(colors2) {
          colors2 = colors2 || ["#fff", "#000"];
          if (colors2 && type$j(colors2) === "string" && chroma_1.brewer && chroma_1.brewer[colors2.toLowerCase()]) {
            colors2 = chroma_1.brewer[colors2.toLowerCase()];
          }
          if (type$j(colors2) === "array") {
            if (colors2.length === 1) {
              colors2 = [colors2[0], colors2[0]];
            }
            colors2 = colors2.slice(0);
            for (var c = 0; c < colors2.length; c++) {
              colors2[c] = chroma_1(colors2[c]);
            }
            _pos.length = 0;
            for (var c$1 = 0; c$1 < colors2.length; c$1++) {
              _pos.push(c$1 / (colors2.length - 1));
            }
          }
          resetCache();
          return _colors = colors2;
        };
        var getClass = function(value) {
          if (_classes != null) {
            var n = _classes.length - 1;
            var i2 = 0;
            while (i2 < n && value >= _classes[i2]) {
              i2++;
            }
            return i2 - 1;
          }
          return 0;
        };
        var tMapLightness = function(t) {
          return t;
        };
        var tMapDomain = function(t) {
          return t;
        };
        var getColor = function(val, bypassMap) {
          var col, t;
          if (bypassMap == null) {
            bypassMap = false;
          }
          if (isNaN(val) || val === null) {
            return _nacol;
          }
          if (!bypassMap) {
            if (_classes && _classes.length > 2) {
              var c = getClass(val);
              t = c / (_classes.length - 2);
            } else if (_max !== _min) {
              t = (val - _min) / (_max - _min);
            } else {
              t = 1;
            }
          } else {
            t = val;
          }
          t = tMapDomain(t);
          if (!bypassMap) {
            t = tMapLightness(t);
          }
          if (_gamma !== 1) {
            t = pow$5(t, _gamma);
          }
          t = _padding[0] + t * (1 - _padding[0] - _padding[1]);
          t = Math.min(1, Math.max(0, t));
          var k = Math.floor(t * 1e4);
          if (_useCache && _colorCache[k]) {
            col = _colorCache[k];
          } else {
            if (type$j(_colors) === "array") {
              for (var i2 = 0; i2 < _pos.length; i2++) {
                var p = _pos[i2];
                if (t <= p) {
                  col = _colors[i2];
                  break;
                }
                if (t >= p && i2 === _pos.length - 1) {
                  col = _colors[i2];
                  break;
                }
                if (t > p && t < _pos[i2 + 1]) {
                  t = (t - p) / (_pos[i2 + 1] - p);
                  col = chroma_1.interpolate(_colors[i2], _colors[i2 + 1], t, _mode);
                  break;
                }
              }
            } else if (type$j(_colors) === "function") {
              col = _colors(t);
            }
            if (_useCache) {
              _colorCache[k] = col;
            }
          }
          return col;
        };
        var resetCache = function() {
          return _colorCache = {};
        };
        setColors(colors);
        var f = function(v) {
          var c = chroma_1(getColor(v));
          if (_out && c[_out]) {
            return c[_out]();
          } else {
            return c;
          }
        };
        f.classes = function(classes) {
          if (classes != null) {
            if (type$j(classes) === "array") {
              _classes = classes;
              _domain = [classes[0], classes[classes.length - 1]];
            } else {
              var d = chroma_1.analyze(_domain);
              if (classes === 0) {
                _classes = [d.min, d.max];
              } else {
                _classes = chroma_1.limits(d, "e", classes);
              }
            }
            return f;
          }
          return _classes;
        };
        f.domain = function(domain) {
          if (!arguments.length) {
            return _domain;
          }
          _min = domain[0];
          _max = domain[domain.length - 1];
          _pos = [];
          var k = _colors.length;
          if (domain.length === k && _min !== _max) {
            for (var i2 = 0, list2 = Array.from(domain); i2 < list2.length; i2 += 1) {
              var d = list2[i2];
              _pos.push((d - _min) / (_max - _min));
            }
          } else {
            for (var c = 0; c < k; c++) {
              _pos.push(c / (k - 1));
            }
            if (domain.length > 2) {
              var tOut = domain.map(function(d2, i3) {
                return i3 / (domain.length - 1);
              });
              var tBreaks = domain.map(function(d2) {
                return (d2 - _min) / (_max - _min);
              });
              if (!tBreaks.every(function(val, i3) {
                return tOut[i3] === val;
              })) {
                tMapDomain = function(t) {
                  if (t <= 0 || t >= 1) {
                    return t;
                  }
                  var i3 = 0;
                  while (t >= tBreaks[i3 + 1]) {
                    i3++;
                  }
                  var f2 = (t - tBreaks[i3]) / (tBreaks[i3 + 1] - tBreaks[i3]);
                  var out = tOut[i3] + f2 * (tOut[i3 + 1] - tOut[i3]);
                  return out;
                };
              }
            }
          }
          _domain = [_min, _max];
          return f;
        };
        f.mode = function(_m) {
          if (!arguments.length) {
            return _mode;
          }
          _mode = _m;
          resetCache();
          return f;
        };
        f.range = function(colors2, _pos2) {
          setColors(colors2, _pos2);
          return f;
        };
        f.out = function(_o) {
          _out = _o;
          return f;
        };
        f.spread = function(val) {
          if (!arguments.length) {
            return _spread;
          }
          _spread = val;
          return f;
        };
        f.correctLightness = function(v) {
          if (v == null) {
            v = true;
          }
          _correctLightness = v;
          resetCache();
          if (_correctLightness) {
            tMapLightness = function(t) {
              var L0 = getColor(0, true).lab()[0];
              var L1 = getColor(1, true).lab()[0];
              var pol = L0 > L1;
              var L_actual = getColor(t, true).lab()[0];
              var L_ideal = L0 + (L1 - L0) * t;
              var L_diff = L_actual - L_ideal;
              var t0 = 0;
              var t1 = 1;
              var max_iter = 20;
              while (Math.abs(L_diff) > 0.01 && max_iter-- > 0) {
                (function() {
                  if (pol) {
                    L_diff *= -1;
                  }
                  if (L_diff < 0) {
                    t0 = t;
                    t += (t1 - t) * 0.5;
                  } else {
                    t1 = t;
                    t += (t0 - t) * 0.5;
                  }
                  L_actual = getColor(t, true).lab()[0];
                  return L_diff = L_actual - L_ideal;
                })();
              }
              return t;
            };
          } else {
            tMapLightness = function(t) {
              return t;
            };
          }
          return f;
        };
        f.padding = function(p) {
          if (p != null) {
            if (type$j(p) === "number") {
              p = [p, p];
            }
            _padding = p;
            return f;
          } else {
            return _padding;
          }
        };
        f.colors = function(numColors, out) {
          if (arguments.length < 2) {
            out = "hex";
          }
          var result = [];
          if (arguments.length === 0) {
            result = _colors.slice(0);
          } else if (numColors === 1) {
            result = [f(0.5)];
          } else if (numColors > 1) {
            var dm = _domain[0];
            var dd = _domain[1] - dm;
            result = __range__(0, numColors, false).map(function(i3) {
              return f(dm + i3 / (numColors - 1) * dd);
            });
          } else {
            colors = [];
            var samples = [];
            if (_classes && _classes.length > 2) {
              for (var i2 = 1, end = _classes.length, asc = 1 <= end; asc ? i2 < end : i2 > end; asc ? i2++ : i2--) {
                samples.push((_classes[i2 - 1] + _classes[i2]) * 0.5);
              }
            } else {
              samples = _domain;
            }
            result = samples.map(function(v) {
              return f(v);
            });
          }
          if (chroma_1[out]) {
            result = result.map(function(c) {
              return c[out]();
            });
          }
          return result;
        };
        f.cache = function(c) {
          if (c != null) {
            _useCache = c;
            return f;
          } else {
            return _useCache;
          }
        };
        f.gamma = function(g) {
          if (g != null) {
            _gamma = g;
            return f;
          } else {
            return _gamma;
          }
        };
        f.nodata = function(d) {
          if (d != null) {
            _nacol = chroma_1(d);
            return f;
          } else {
            return _nacol;
          }
        };
        return f;
      };
      function __range__(left, right, inclusive) {
        var range = [];
        var ascending = left < right;
        var end = !inclusive ? right : ascending ? right + 1 : right - 1;
        for (var i2 = left; ascending ? i2 < end : i2 > end; ascending ? i2++ : i2--) {
          range.push(i2);
        }
        return range;
      }
      var bezier = function(colors) {
        var assign, assign$1, assign$2;
        var I, lab0, lab1, lab2;
        colors = colors.map(function(c) {
          return new Color_1(c);
        });
        if (colors.length === 2) {
          assign = colors.map(function(c) {
            return c.lab();
          }), lab0 = assign[0], lab1 = assign[1];
          I = function(t) {
            var lab = [0, 1, 2].map(function(i2) {
              return lab0[i2] + t * (lab1[i2] - lab0[i2]);
            });
            return new Color_1(lab, "lab");
          };
        } else if (colors.length === 3) {
          assign$1 = colors.map(function(c) {
            return c.lab();
          }), lab0 = assign$1[0], lab1 = assign$1[1], lab2 = assign$1[2];
          I = function(t) {
            var lab = [0, 1, 2].map(function(i2) {
              return (1 - t) * (1 - t) * lab0[i2] + 2 * (1 - t) * t * lab1[i2] + t * t * lab2[i2];
            });
            return new Color_1(lab, "lab");
          };
        } else if (colors.length === 4) {
          var lab3;
          assign$2 = colors.map(function(c) {
            return c.lab();
          }), lab0 = assign$2[0], lab1 = assign$2[1], lab2 = assign$2[2], lab3 = assign$2[3];
          I = function(t) {
            var lab = [0, 1, 2].map(function(i2) {
              return (1 - t) * (1 - t) * (1 - t) * lab0[i2] + 3 * (1 - t) * (1 - t) * t * lab1[i2] + 3 * (1 - t) * t * t * lab2[i2] + t * t * t * lab3[i2];
            });
            return new Color_1(lab, "lab");
          };
        } else if (colors.length === 5) {
          var I0 = bezier(colors.slice(0, 3));
          var I1 = bezier(colors.slice(2, 5));
          I = function(t) {
            if (t < 0.5) {
              return I0(t * 2);
            } else {
              return I1((t - 0.5) * 2);
            }
          };
        }
        return I;
      };
      var bezier_1 = function(colors) {
        var f = bezier(colors);
        f.scale = function() {
          return scale(f);
        };
        return f;
      };
      var blend = function(bottom, top, mode) {
        if (!blend[mode]) {
          throw new Error("unknown blend mode " + mode);
        }
        return blend[mode](bottom, top);
      };
      var blend_f = function(f) {
        return function(bottom, top) {
          var c0 = chroma_1(top).rgb();
          var c1 = chroma_1(bottom).rgb();
          return chroma_1.rgb(f(c0, c1));
        };
      };
      var each = function(f) {
        return function(c0, c1) {
          var out = [];
          out[0] = f(c0[0], c1[0]);
          out[1] = f(c0[1], c1[1]);
          out[2] = f(c0[2], c1[2]);
          return out;
        };
      };
      var normal = function(a) {
        return a;
      };
      var multiply = function(a, b) {
        return a * b / 255;
      };
      var darken$1 = function(a, b) {
        return a > b ? b : a;
      };
      var lighten = function(a, b) {
        return a > b ? a : b;
      };
      var screen = function(a, b) {
        return 255 * (1 - (1 - a / 255) * (1 - b / 255));
      };
      var overlay = function(a, b) {
        return b < 128 ? 2 * a * b / 255 : 255 * (1 - 2 * (1 - a / 255) * (1 - b / 255));
      };
      var burn = function(a, b) {
        return 255 * (1 - (1 - b / 255) / (a / 255));
      };
      var dodge = function(a, b) {
        if (a === 255) {
          return 255;
        }
        a = 255 * (b / 255) / (1 - a / 255);
        return a > 255 ? 255 : a;
      };
      blend.normal = blend_f(each(normal));
      blend.multiply = blend_f(each(multiply));
      blend.screen = blend_f(each(screen));
      blend.overlay = blend_f(each(overlay));
      blend.darken = blend_f(each(darken$1));
      blend.lighten = blend_f(each(lighten));
      blend.dodge = blend_f(each(dodge));
      blend.burn = blend_f(each(burn));
      var blend_1 = blend;
      var type$k = utils.type;
      var clip_rgb$3 = utils.clip_rgb;
      var TWOPI$2 = utils.TWOPI;
      var pow$6 = Math.pow;
      var sin$2 = Math.sin;
      var cos$3 = Math.cos;
      var cubehelix = function(start, rotations, hue, gamma, lightness) {
        if (start === void 0)
          start = 300;
        if (rotations === void 0)
          rotations = -1.5;
        if (hue === void 0)
          hue = 1;
        if (gamma === void 0)
          gamma = 1;
        if (lightness === void 0)
          lightness = [0, 1];
        var dh = 0, dl;
        if (type$k(lightness) === "array") {
          dl = lightness[1] - lightness[0];
        } else {
          dl = 0;
          lightness = [lightness, lightness];
        }
        var f = function(fract) {
          var a = TWOPI$2 * ((start + 120) / 360 + rotations * fract);
          var l = pow$6(lightness[0] + dl * fract, gamma);
          var h = dh !== 0 ? hue[0] + fract * dh : hue;
          var amp = h * l * (1 - l) / 2;
          var cos_a = cos$3(a);
          var sin_a = sin$2(a);
          var r = l + amp * (-0.14861 * cos_a + 1.78277 * sin_a);
          var g = l + amp * (-0.29227 * cos_a - 0.90649 * sin_a);
          var b = l + amp * (1.97294 * cos_a);
          return chroma_1(clip_rgb$3([r * 255, g * 255, b * 255, 1]));
        };
        f.start = function(s) {
          if (s == null) {
            return start;
          }
          start = s;
          return f;
        };
        f.rotations = function(r) {
          if (r == null) {
            return rotations;
          }
          rotations = r;
          return f;
        };
        f.gamma = function(g) {
          if (g == null) {
            return gamma;
          }
          gamma = g;
          return f;
        };
        f.hue = function(h) {
          if (h == null) {
            return hue;
          }
          hue = h;
          if (type$k(hue) === "array") {
            dh = hue[1] - hue[0];
            if (dh === 0) {
              hue = hue[1];
            }
          } else {
            dh = 0;
          }
          return f;
        };
        f.lightness = function(h) {
          if (h == null) {
            return lightness;
          }
          if (type$k(h) === "array") {
            lightness = h;
            dl = h[1] - h[0];
          } else {
            lightness = [h, h];
            dl = 0;
          }
          return f;
        };
        f.scale = function() {
          return chroma_1.scale(f);
        };
        f.hue(hue);
        return f;
      };
      var digits = "0123456789abcdef";
      var floor$2 = Math.floor;
      var random = Math.random;
      var random_1 = function() {
        var code = "#";
        for (var i2 = 0; i2 < 6; i2++) {
          code += digits.charAt(floor$2(random() * 16));
        }
        return new Color_1(code, "hex");
      };
      var log$1 = Math.log;
      var pow$7 = Math.pow;
      var floor$3 = Math.floor;
      var abs = Math.abs;
      var analyze = function(data, key2) {
        if (key2 === void 0)
          key2 = null;
        var r = {
          min: Number.MAX_VALUE,
          max: Number.MAX_VALUE * -1,
          sum: 0,
          values: [],
          count: 0
        };
        if (type(data) === "object") {
          data = Object.values(data);
        }
        data.forEach(function(val) {
          if (key2 && type(val) === "object") {
            val = val[key2];
          }
          if (val !== void 0 && val !== null && !isNaN(val)) {
            r.values.push(val);
            r.sum += val;
            if (val < r.min) {
              r.min = val;
            }
            if (val > r.max) {
              r.max = val;
            }
            r.count += 1;
          }
        });
        r.domain = [r.min, r.max];
        r.limits = function(mode, num) {
          return limits(r, mode, num);
        };
        return r;
      };
      var limits = function(data, mode, num) {
        if (mode === void 0)
          mode = "equal";
        if (num === void 0)
          num = 7;
        if (type(data) == "array") {
          data = analyze(data);
        }
        var min2 = data.min;
        var max2 = data.max;
        var values = data.values.sort(function(a, b) {
          return a - b;
        });
        if (num === 1) {
          return [min2, max2];
        }
        var limits2 = [];
        if (mode.substr(0, 1) === "c") {
          limits2.push(min2);
          limits2.push(max2);
        }
        if (mode.substr(0, 1) === "e") {
          limits2.push(min2);
          for (var i2 = 1; i2 < num; i2++) {
            limits2.push(min2 + i2 / num * (max2 - min2));
          }
          limits2.push(max2);
        } else if (mode.substr(0, 1) === "l") {
          if (min2 <= 0) {
            throw new Error("Logarithmic scales are only possible for values > 0");
          }
          var min_log = Math.LOG10E * log$1(min2);
          var max_log = Math.LOG10E * log$1(max2);
          limits2.push(min2);
          for (var i$12 = 1; i$12 < num; i$12++) {
            limits2.push(pow$7(10, min_log + i$12 / num * (max_log - min_log)));
          }
          limits2.push(max2);
        } else if (mode.substr(0, 1) === "q") {
          limits2.push(min2);
          for (var i$2 = 1; i$2 < num; i$2++) {
            var p = (values.length - 1) * i$2 / num;
            var pb = floor$3(p);
            if (pb === p) {
              limits2.push(values[pb]);
            } else {
              var pr = p - pb;
              limits2.push(values[pb] * (1 - pr) + values[pb + 1] * pr);
            }
          }
          limits2.push(max2);
        } else if (mode.substr(0, 1) === "k") {
          var cluster;
          var n = values.length;
          var assignments = new Array(n);
          var clusterSizes = new Array(num);
          var repeat = true;
          var nb_iters = 0;
          var centroids = null;
          centroids = [];
          centroids.push(min2);
          for (var i$3 = 1; i$3 < num; i$3++) {
            centroids.push(min2 + i$3 / num * (max2 - min2));
          }
          centroids.push(max2);
          while (repeat) {
            for (var j = 0; j < num; j++) {
              clusterSizes[j] = 0;
            }
            for (var i$4 = 0; i$4 < n; i$4++) {
              var value = values[i$4];
              var mindist = Number.MAX_VALUE;
              var best = void 0;
              for (var j$1 = 0; j$1 < num; j$1++) {
                var dist = abs(centroids[j$1] - value);
                if (dist < mindist) {
                  mindist = dist;
                  best = j$1;
                }
                clusterSizes[best]++;
                assignments[i$4] = best;
              }
            }
            var newCentroids = new Array(num);
            for (var j$2 = 0; j$2 < num; j$2++) {
              newCentroids[j$2] = null;
            }
            for (var i$5 = 0; i$5 < n; i$5++) {
              cluster = assignments[i$5];
              if (newCentroids[cluster] === null) {
                newCentroids[cluster] = values[i$5];
              } else {
                newCentroids[cluster] += values[i$5];
              }
            }
            for (var j$3 = 0; j$3 < num; j$3++) {
              newCentroids[j$3] *= 1 / clusterSizes[j$3];
            }
            repeat = false;
            for (var j$4 = 0; j$4 < num; j$4++) {
              if (newCentroids[j$4] !== centroids[j$4]) {
                repeat = true;
                break;
              }
            }
            centroids = newCentroids;
            nb_iters++;
            if (nb_iters > 200) {
              repeat = false;
            }
          }
          var kClusters = {};
          for (var j$5 = 0; j$5 < num; j$5++) {
            kClusters[j$5] = [];
          }
          for (var i$6 = 0; i$6 < n; i$6++) {
            cluster = assignments[i$6];
            kClusters[cluster].push(values[i$6]);
          }
          var tmpKMeansBreaks = [];
          for (var j$6 = 0; j$6 < num; j$6++) {
            tmpKMeansBreaks.push(kClusters[j$6][0]);
            tmpKMeansBreaks.push(kClusters[j$6][kClusters[j$6].length - 1]);
          }
          tmpKMeansBreaks = tmpKMeansBreaks.sort(function(a, b) {
            return a - b;
          });
          limits2.push(tmpKMeansBreaks[0]);
          for (var i$7 = 1; i$7 < tmpKMeansBreaks.length; i$7 += 2) {
            var v = tmpKMeansBreaks[i$7];
            if (!isNaN(v) && limits2.indexOf(v) === -1) {
              limits2.push(v);
            }
          }
        }
        return limits2;
      };
      var analyze_1 = {analyze, limits};
      var contrast = function(a, b) {
        a = new Color_1(a);
        b = new Color_1(b);
        var l1 = a.luminance();
        var l2 = b.luminance();
        return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
      };
      var sqrt$4 = Math.sqrt;
      var atan2$2 = Math.atan2;
      var abs$1 = Math.abs;
      var cos$4 = Math.cos;
      var PI$2 = Math.PI;
      var deltaE = function(a, b, L, C) {
        if (L === void 0)
          L = 1;
        if (C === void 0)
          C = 1;
        a = new Color_1(a);
        b = new Color_1(b);
        var ref = Array.from(a.lab());
        var L1 = ref[0];
        var a1 = ref[1];
        var b1 = ref[2];
        var ref$1 = Array.from(b.lab());
        var L2 = ref$1[0];
        var a2 = ref$1[1];
        var b2 = ref$1[2];
        var c1 = sqrt$4(a1 * a1 + b1 * b1);
        var c2 = sqrt$4(a2 * a2 + b2 * b2);
        var sl = L1 < 16 ? 0.511 : 0.040975 * L1 / (1 + 0.01765 * L1);
        var sc = 0.0638 * c1 / (1 + 0.0131 * c1) + 0.638;
        var h1 = c1 < 1e-6 ? 0 : atan2$2(b1, a1) * 180 / PI$2;
        while (h1 < 0) {
          h1 += 360;
        }
        while (h1 >= 360) {
          h1 -= 360;
        }
        var t = h1 >= 164 && h1 <= 345 ? 0.56 + abs$1(0.2 * cos$4(PI$2 * (h1 + 168) / 180)) : 0.36 + abs$1(0.4 * cos$4(PI$2 * (h1 + 35) / 180));
        var c4 = c1 * c1 * c1 * c1;
        var f = sqrt$4(c4 / (c4 + 1900));
        var sh = sc * (f * t + 1 - f);
        var delL = L1 - L2;
        var delC = c1 - c2;
        var delA = a1 - a2;
        var delB = b1 - b2;
        var dH2 = delA * delA + delB * delB - delC * delC;
        var v1 = delL / (L * sl);
        var v2 = delC / (C * sc);
        var v3 = sh;
        return sqrt$4(v1 * v1 + v2 * v2 + dH2 / (v3 * v3));
      };
      var distance = function(a, b, mode) {
        if (mode === void 0)
          mode = "lab";
        a = new Color_1(a);
        b = new Color_1(b);
        var l1 = a.get(mode);
        var l2 = b.get(mode);
        var sum_sq = 0;
        for (var i2 in l1) {
          var d = (l1[i2] || 0) - (l2[i2] || 0);
          sum_sq += d * d;
        }
        return Math.sqrt(sum_sq);
      };
      var valid = function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        try {
          new (Function.prototype.bind.apply(Color_1, [null].concat(args)))();
          return true;
        } catch (e) {
          return false;
        }
      };
      var scales = {
        cool: function cool() {
          return scale([chroma_1.hsl(180, 1, 0.9), chroma_1.hsl(250, 0.7, 0.4)]);
        },
        hot: function hot() {
          return scale(["#000", "#f00", "#ff0", "#fff"], [0, 0.25, 0.75, 1]).mode("rgb");
        }
      };
      var colorbrewer = {
        OrRd: ["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"],
        PuBu: ["#fff7fb", "#ece7f2", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#045a8d", "#023858"],
        BuPu: ["#f7fcfd", "#e0ecf4", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#810f7c", "#4d004b"],
        Oranges: ["#fff5eb", "#fee6ce", "#fdd0a2", "#fdae6b", "#fd8d3c", "#f16913", "#d94801", "#a63603", "#7f2704"],
        BuGn: ["#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#006d2c", "#00441b"],
        YlOrBr: ["#ffffe5", "#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"],
        YlGn: ["#ffffe5", "#f7fcb9", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#006837", "#004529"],
        Reds: ["#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d"],
        RdPu: ["#fff7f3", "#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177", "#49006a"],
        Greens: ["#f7fcf5", "#e5f5e0", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#006d2c", "#00441b"],
        YlGnBu: ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"],
        Purples: ["#fcfbfd", "#efedf5", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#54278f", "#3f007d"],
        GnBu: ["#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#0868ac", "#084081"],
        Greys: ["#ffffff", "#f0f0f0", "#d9d9d9", "#bdbdbd", "#969696", "#737373", "#525252", "#252525", "#000000"],
        YlOrRd: ["#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#bd0026", "#800026"],
        PuRd: ["#f7f4f9", "#e7e1ef", "#d4b9da", "#c994c7", "#df65b0", "#e7298a", "#ce1256", "#980043", "#67001f"],
        Blues: ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"],
        PuBuGn: ["#fff7fb", "#ece2f0", "#d0d1e6", "#a6bddb", "#67a9cf", "#3690c0", "#02818a", "#016c59", "#014636"],
        Viridis: ["#440154", "#482777", "#3f4a8a", "#31678e", "#26838f", "#1f9d8a", "#6cce5a", "#b6de2b", "#fee825"],
        Spectral: ["#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2"],
        RdYlGn: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"],
        RdBu: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#f7f7f7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac", "#053061"],
        PiYG: ["#8e0152", "#c51b7d", "#de77ae", "#f1b6da", "#fde0ef", "#f7f7f7", "#e6f5d0", "#b8e186", "#7fbc41", "#4d9221", "#276419"],
        PRGn: ["#40004b", "#762a83", "#9970ab", "#c2a5cf", "#e7d4e8", "#f7f7f7", "#d9f0d3", "#a6dba0", "#5aae61", "#1b7837", "#00441b"],
        RdYlBu: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695"],
        BrBG: ["#543005", "#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#f5f5f5", "#c7eae5", "#80cdc1", "#35978f", "#01665e", "#003c30"],
        RdGy: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#ffffff", "#e0e0e0", "#bababa", "#878787", "#4d4d4d", "#1a1a1a"],
        PuOr: ["#7f3b08", "#b35806", "#e08214", "#fdb863", "#fee0b6", "#f7f7f7", "#d8daeb", "#b2abd2", "#8073ac", "#542788", "#2d004b"],
        Set2: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"],
        Accent: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666"],
        Set1: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf", "#999999"],
        Set3: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"],
        Dark2: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"],
        Paired: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"],
        Pastel2: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc", "#cccccc"],
        Pastel1: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd", "#fddaec", "#f2f2f2"]
      };
      for (var i$1 = 0, list$1 = Object.keys(colorbrewer); i$1 < list$1.length; i$1 += 1) {
        var key = list$1[i$1];
        colorbrewer[key.toLowerCase()] = colorbrewer[key];
      }
      var colorbrewer_1 = colorbrewer;
      chroma_1.average = average;
      chroma_1.bezier = bezier_1;
      chroma_1.blend = blend_1;
      chroma_1.cubehelix = cubehelix;
      chroma_1.mix = chroma_1.interpolate = mix;
      chroma_1.random = random_1;
      chroma_1.scale = scale;
      chroma_1.analyze = analyze_1.analyze;
      chroma_1.contrast = contrast;
      chroma_1.deltaE = deltaE;
      chroma_1.distance = distance;
      chroma_1.limits = analyze_1.limits;
      chroma_1.valid = valid;
      chroma_1.scales = scales;
      chroma_1.colors = w3cx11_1;
      chroma_1.brewer = colorbrewer_1;
      var chroma_js = chroma_1;
      return chroma_js;
    });
  });

  // rnd.frag
  var require_rnd = __commonJS((exports, module) => {
    module.exports = "precision mediump float;uniform sampler2D backbuffer;uniform float tick;uniform float u_time;uniform vec2 u_resolution;\n#define t u_time\n#define f tick\n#define res u_resolution\n#define o gl_FragColor\n#define FC gl_FragCoord.xy\n#define PI 3.1415926536\n#define rnd(x) fract(54321.987 * sin(987.12345 * x))\nvoid main(){vec2 uv=FC.xy/u_resolution;float size=1./pow(2.,1.+2.);uv=floor(uv/size)*size;float uvSerial=uv.x*8.+uv.y;uv=vec2(floor(uvSerial/8.),fract(uvSerial/8.));gl_FragColor+=rnd(length(uv+vec2(0,.1)));gl_FragColor=fract(gl_FragColor+tick/1000.);}";
  });

  // ca.frag
  var require_ca = __commonJS((exports, module) => {
    module.exports = "precision mediump float;uniform sampler2D tex;uniform float tick;uniform float divisions;uniform float u_time;uniform vec2 u_resolution;uniform float midi[64];\n#define t u_time\n#define f tick\n#define res u_resolution\n#define o gl_FragColor\n#define FC gl_FragCoord.xy\n#define PI 3.1415926536\n#pragma glslify: snoise2D = require(../modules/math/glsl-noise/simplex/2d.glsl)\n#pragma glslify: snoise3D = require(../modules/math/glsl-noise/simplex/3d.glsl)\n#define rnd(x) fract(54321.987 * sin(987.12345 * x))\nvoid main(){vec2 uv=FC.xy/u_resolution;\n#define func(n0, n1, n2, n3, n4, i) rnd((n0 + 2.*n1 + 4.*n2 + 8.*n3 + 16.*n3 + 32.*n4)/64. + i + vec4(0)+.01*floor(tick/200.))\nfloat size=1./pow(2.,divisions+2.);uv=floor(uv/size)*size+size/2.;float n0=step(.5,texture2D(tex,fract(uv)).r);float n1=step(.5,texture2D(tex,fract(uv-vec2(size,0))).r);float n2=step(.5,texture2D(tex,fract(uv-vec2(0,size))).r);float n3=step(.5,texture2D(tex,fract(uv+vec2(size,0))).r);float n4=step(.5,texture2D(tex,fract(uv+vec2(0,size))).r);vec2 quadrant=floor(mod(uv,vec2(size))/size*2.);float quadId=quadrant.x+2.*quadrant.y;o=vec4(step(.5,func(n0,n1,n2,n3,n4,quadId)));}";
  });

  // draw.frag
  var require_draw = __commonJS((exports, module) => {
    module.exports = "precision mediump float;uniform vec2 u_resolution;uniform vec2 u_tex_res;uniform sampler2D tex;uniform sampler2D backbuffer;uniform float midi[64];uniform float u_time;uniform vec4 palette[5];\n#define PI 3.1415\n#define col(c) -cos((pow(vec3(c), pw) + off) * 2. * PI) * mul + add\nvec3 pw=vec3(midi[0+16],midi[1+16],midi[2+16]);vec3 off=vec3(midi[4+16],midi[5+16],midi[6+16]);vec3 mul=vec3(midi[8+16],midi[9+16],midi[10+16]);vec3 add=vec3(midi[12+16],midi[13+16],midi[14+16]);float size=midi[15+16*2]*10000.;\n#define rnd(d) fract(sin(length(d)*99.))\n#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))\nvoid main(){vec2 uvN=gl_FragCoord.xy/u_resolution;vec2 uv=(gl_FragCoord.xy*2.-u_resolution)/min(u_resolution.x,u_resolution.y);gl_FragColor=texture2D(tex,uvN);gl_FragColor.a=1.;}";
  });

  // index.js
  "use strict";
  var fileNamePrefix = "island";
  var FPS = 30;
  var animDuration = 40 * FPS;
  var animDelay = animDuration;
  var isRendering = false;
  var twgl = require_twgl_full();
  var WebMidi = require_webmidi_min();
  var chroma = require_chroma();
  var midi = JSON.parse(localStorage.getItem("midi"));
  if (!midi)
    midi = Array(64).fill(0.5);
  var palette = ["#230f2b", "#f21d41", "#ebebbc", "#bce3c5", "#82b3ae"];
  palette = palette.map((c) => chroma(c).gl());
  palette = palette.sort((a, b) => chroma(a).get("lch.l") - chroma(b).get("lch.l"));
  var passes;
  WebMidi.enable(function(err) {
    if (err) {
      console.log("WebMidi could not be enabled.", err);
    }
    var input = WebMidi.inputs[0];
    input.addListener("controlchange", "all", function(e) {
      let [code, id, value] = Array.from(e.data);
      value = value / 127;
      console.log(id, value);
      if (code == 176) {
        midi[id] = value;
      }
      localStorage.setItem("midi", JSON.stringify(midi));
    });
  });
  function Pass({frag, size = 8, texture}) {
    if (size.length)
      this.resolution = size;
    else
      this.resolution = [size, size];
    console.log(this.resolution);
    this.vert = `
  precision mediump float;
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }`;
    this.frag = frag;
    this.program = twgl.createProgramInfo(gl, [this.vert, this.frag]);
    this.attachments = [{format: gl.RGBA, type: gl.FLOAT, minMag: gl.NEAREST, wrap: gl.CLAMP_TO_EDGE}];
    this.buffer = twgl.createFramebufferInfo(gl, this.attachments, ...this.resolution);
    this.backbuffer = twgl.createFramebufferInfo(gl, this.attachments, ...this.resolution);
    this.b = this.backbuffer.attachments[0];
    this.positionObject = {position: {data: [1, 1, 1, -1, -1, -1, -1, 1], numComponents: 2}};
    this.positionBuffer = twgl.createBufferInfoFromArrays(gl, this.positionObject);
    this.texture = texture;
    this.draw = ({uniforms, target}) => {
      gl.useProgram(this.program.program);
      twgl.setBuffersAndAttributes(gl, this.program, this.positionBuffer);
      if (!uniforms.u_resolution)
        uniforms.u_resolution = this.resolution;
      if (target != "screen")
        uniforms.backbuffer = this.backbuffer.attachments[0];
      if (this.texture)
        uniforms.texture = this.texture;
      twgl.setUniforms(this.program, uniforms);
      if (target != "self") {
        twgl.bindFramebufferInfo(gl, null);
        twgl.drawBufferInfo(gl, this.positionBuffer, gl.TRIANGLE_FAN);
      }
      if (target != "screen") {
        twgl.bindFramebufferInfo(gl, this.buffer);
        let tmp = this.buffer;
        this.buffer = this.backbuffer;
        this.backbuffer = tmp;
        this.b = this.backbuffer.attachments[0];
        twgl.drawBufferInfo(gl, this.positionBuffer, gl.TRIANGLE_FAN);
      }
    };
  }
  var tick = 0;
  var canvas = document.getElementById("canvasgl");
  var gl = twgl.getWebGLContext(canvas, {antialias: false, depth: false});
  twgl.addExtensionsToContext(gl);
  gl.getExtension("OES_texture_float");
  gl.getExtension("WEBGL_color_buffer_float");
  var dt;
  var prevTime;
  var conwayInitTexture = twgl.createTexture(gl, {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARAQMAAAABo9W5AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAZQTFRFAAAA////pdmf3QAAADBJREFUeJxjYIACHgkGBjYDBgbVIAYG6zwGBtEQBgY+C4gciAbxQeIgeZA6kHooAACUUgRTZfOwlgAAAABJRU5ErkJggg==",
    crossOrigin: ""
  }, function(err, tex, img) {
  });
  passes = {
    rnd: new Pass({
      frag: require_rnd(),
      size: 1024
    }),
    ca: new Pass({
      frag: require_ca(),
      size: 1024
    }),
    draw: new Pass({
      frag: require_draw()
    })
  };
  function draw(time) {
    twgl.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    dt = prevTime ? time - prevTime : 0;
    prevTime = time;
    passes.rnd.draw({uniforms: {tick}, target: "self"});
    passes.ca.draw({uniforms: {tick, tex: passes.rnd.b, divisions: 1}, target: "self"});
    passes.ca.draw({uniforms: {tick, tex: passes.ca.b, divisions: 2}, target: "self"});
    passes.ca.draw({uniforms: {tick, tex: passes.ca.b, divisions: 3}, target: "self"});
    passes.ca.draw({uniforms: {tick, tex: passes.ca.b, divisions: 4}, target: "self"});
    passes.ca.draw({uniforms: {tick, tex: passes.ca.b, divisions: 5}, target: "self"});
    passes.draw.draw({
      uniforms: {
        tex: passes.ca.b,
        midi,
        u_time: (tick - animDelay) / animDuration,
        palette: palette.flat(),
        u_resolution: [canvas.width, canvas.height]
      },
      target: "screen"
    });
    if (isRendering == true && tick > animDelay) {
      let link = document.getElementById("link");
      const zeroPad = (num, places) => String(num).padStart(places, "0");
      link.setAttribute("download", fileNamePrefix + `${zeroPad(tick - animDelay, 6)}.png`);
      link.setAttribute("href", canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
      link.click();
      if ((tick - animDelay) / animDuration > 1)
        isRendering = false;
    }
    tick++;
  }
  setInterval(animate, 50);
  function animate(now) {
    draw(now / 1e3);
  }
})();
