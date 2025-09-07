"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redact = redact;
function redact(value, visible = 3) {
    if (typeof value !== 'string')
        return String(value);
    if (value.length <= visible)
        return '*'.repeat(value.length);
    return value.slice(0, visible) + '*'.repeat(value.length - visible);
}
//# sourceMappingURL=redact.js.map