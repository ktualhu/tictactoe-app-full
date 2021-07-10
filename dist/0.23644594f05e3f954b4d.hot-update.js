exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 36:
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatGateway = void 0;
const websockets_1 = __webpack_require__(37);
const socket_io_1 = __webpack_require__(38);
const lobby_gateway_1 = __webpack_require__(39);
const curOptions = Object.assign(Object.assign({}, lobby_gateway_1.options), { namespace: '/chat' });
let ChatGateway = class ChatGateway {
    handleJoinChat(data, socket) {
        const chatId = `chat${data.roomId}`;
        socket.join(chatId);
        this.server.to(chatId).emit('chat:join', data.message);
    }
    handleChatLeave(data, socket) {
        const chatId = `chat${data.roomId}`;
        socket.leave(chatId);
        this.server.to(chatId).emit('chat:leave', data.message);
    }
    handleChatMessage(data) {
        console.log('chat:message', data);
        const chatId = `chat${data.roomId}`;
        this.server.to(chatId).emit('chat:message', data.message);
    }
    handleChatMessageLog(data) {
        const chatId = `chat${data.roomId}`;
        this.server.to(chatId).emit('chat:message_log', data.message);
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", typeof (_a = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _a : Object)
], ChatGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('chat:join'),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleJoinChat", null);
__decorate([
    websockets_1.SubscribeMessage('chat:leave'),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_c = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleChatLeave", null);
__decorate([
    websockets_1.SubscribeMessage('chat:message'),
    __param(0, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleChatMessage", null);
__decorate([
    websockets_1.SubscribeMessage('chat:message_log'),
    __param(0, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleChatMessageLog", null);
ChatGateway = __decorate([
    websockets_1.WebSocketGateway()
], ChatGateway);
exports.ChatGateway = ChatGateway;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("d244439c0b772a1fa814")
/******/ })();
/******/ 
/******/ }
;