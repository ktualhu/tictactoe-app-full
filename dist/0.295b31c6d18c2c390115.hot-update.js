exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 13:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IsAuthGuard = void 0;
const common_1 = __webpack_require__(9);
let IsAuthGuard = class IsAuthGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        return true;
    }
};
IsAuthGuard = __decorate([
    common_1.Injectable()
], IsAuthGuard);
exports.IsAuthGuard = IsAuthGuard;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("fafcb74a2150c1cb046d")
/******/ })();
/******/ 
/******/ }
;