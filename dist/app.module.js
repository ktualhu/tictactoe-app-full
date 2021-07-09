"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const events_module_1 = require("./events/events.module");
const game_module_1 = require("./games/game.module");
const rooms_module_1 = require("./rooms/rooms.module");
const rooms_service_1 = require("./rooms/rooms.service");
const users_module_1 = require("./users/users.module");
const users_service_1 = require("./users/users.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [auth_module_1.AuthModule, users_module_1.UsersModule, rooms_module_1.RoomsModule, events_module_1.EventsModule, game_module_1.GameModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, users_service_1.UsersService, rooms_service_1.RoomsService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map