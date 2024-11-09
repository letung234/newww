"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.EditUserController = exports.CreateUserController = exports.GetUserController = exports.GetLoginController = void 0;
var mongodb_1 = require("mongodb");
var database_service_1 = require("~/services/database.service");
// [GET] /users/login
exports.GetLoginController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.render('pages/user/login', {
            pageTitle: 'Đăng Nhập'
        });
        return [2 /*return*/];
    });
}); };
// [GET] /users
exports.GetUserController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, _i, users_1, user, role;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_service_1["default"].User.find({ deleted: false }).project({ password: 0 }).toArray()];
            case 1:
                users = _a.sent();
                _i = 0, users_1 = users;
                _a.label = 2;
            case 2:
                if (!(_i < users_1.length)) return [3 /*break*/, 5];
                user = users_1[_i];
                return [4 /*yield*/, database_service_1["default"].Role.findOne({
                        _id: new mongodb_1.ObjectId(user.role_id),
                        deleted: false
                    })];
            case 3:
                role = _a.sent();
                user.role = role;
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                console.log(users);
                res.render('pages/user/index', {
                    pageTitle: 'Danh sách tài khoản',
                    records: users
                });
                return [2 /*return*/];
        }
    });
}); };
// [GET] /users/create
exports.CreateUserController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var roles;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_service_1["default"].Role.find({ deleted: false }).toArray()];
            case 1:
                roles = _a.sent();
                res.render('pages/user/create', {
                    pageTitle: 'Tạo Tài Khoản',
                    roles: roles
                });
                return [2 /*return*/];
        }
    });
}); };
// [GET] /users/edit
exports.EditUserController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, roles;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, database_service_1["default"].User.findOne({ _id: new mongodb_1.ObjectId(id), deleted: false })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, database_service_1["default"].Role.find({ deleted: false }).toArray()];
            case 2:
                roles = _a.sent();
                res.render('pages/user/edit', {
                    pageTitle: 'Tạo Tài Khoản',
                    roles: roles,
                    user: user
                });
                return [2 /*return*/];
        }
    });
}); };
