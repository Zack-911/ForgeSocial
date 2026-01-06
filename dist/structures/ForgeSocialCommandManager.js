'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ForgeSocialCommandManager = void 0;
const forgescript_1 = require('@tryforge/forgescript');
const constants_1 = require('../constants');
class ForgeSocialCommandManager extends forgescript_1.BaseCommandManager {
  handlerName = constants_1.ForgeSocialEventManagerName;
}
exports.ForgeSocialCommandManager = ForgeSocialCommandManager;
//# sourceMappingURL=ForgeSocialCommandManager.js.map
