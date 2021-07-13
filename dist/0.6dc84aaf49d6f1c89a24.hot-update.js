exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 7:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(9);
const app_controller_1 = __webpack_require__(10);
const auth_module_1 = __webpack_require__(17);
const events_module_1 = __webpack_require__(26);
const game_module_1 = __webpack_require__(27);
const rooms_module_1 = __webpack_require__(30);
const rooms_service_1 = __webpack_require__(13);
const users_module_1 = __webpack_require__(19);
const users_service_1 = __webpack_require__(20);
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            rooms_module_1.RoomsModule,
            events_module_1.EventsModule,
            game_module_1.GameModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [users_service_1.UsersService, rooms_service_1.RoomsService],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("72fe669170a8dda0c518")
/******/ })();
/******/ 
/******/ }
;