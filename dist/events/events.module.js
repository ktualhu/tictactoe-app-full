"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsModule = void 0;
const common_1 = require("@nestjs/common");
const game_module_1 = require("../games/game.module");
const rooms_module_1 = require("../rooms/rooms.module");
const chat_gateway_1 = require("./chat.gateway");
const game_gateway_1 = require("./game.gateway");
const lobby_gateway_1 = require("./lobby.gateway");
const room_gateway_1 = require("./room.gateway");
let EventsModule = class EventsModule {
};
EventsModule = __decorate([
    common_1.Module({
        imports: [rooms_module_1.RoomsModule, game_module_1.GameModule],
        providers: [lobby_gateway_1.LobbyGateway, room_gateway_1.RoomGateway, chat_gateway_1.ChatGateway, game_gateway_1.GameGateway],
    })
], EventsModule);
exports.EventsModule = EventsModule;
//# sourceMappingURL=events.module.js.map