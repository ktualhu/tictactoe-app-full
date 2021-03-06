exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 9:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = exports.LobbyDto = void 0;
const common_1 = __webpack_require__(8);
const express_1 = __webpack_require__(10);
const isauth_guard_1 = __webpack_require__(11);
const rooms_service_1 = __webpack_require__(12);
class LobbyDto {
}
exports.LobbyDto = LobbyDto;
let AppController = class AppController {
    constructor(roomService) {
        this.roomService = roomService;
    }
    async getIndex() {
        return 'index';
    }
    async getIsAuth(req, res) {
        let data = {
            username: null,
            roomId: null,
        };
        if (req.cookies.username) {
            const room = await this.roomService.getRoomById(req.cookies.room_id);
            if (req.cookies.room_id && !room) {
                data = {
                    username: req.cookies.username,
                    roomId: null,
                };
                res.clearCookie('room_id').json(data);
                return data;
            }
            data = {
                username: req.cookies.username,
                roomId: req.cookies.room_id,
            };
        }
        return res.json(data);
    }
};
__decorate([
    common_1.Get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], AppController.prototype, "getIndex", null);
__decorate([
    common_1.Get('/isAuth'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _b : Object, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], AppController.prototype, "getIsAuth", null);
AppController = __decorate([
    common_1.UseGuards(isauth_guard_1.IsAuthGuard),
    common_1.Controller(),
    __metadata("design:paramtypes", [typeof (_e = typeof rooms_service_1.RoomsService !== "undefined" && rooms_service_1.RoomsService) === "function" ? _e : Object])
], AppController);
exports.AppController = AppController;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("ba139d6004a76d9e4a91")
/******/ })();
/******/ 
/******/ }
;