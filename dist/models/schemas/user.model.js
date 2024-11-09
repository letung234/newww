"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(user) {
        this._id = user._id;
        this.name = user.name;
        this.email = user.email;
        this.role_id = user.role_id;
        this.password = user.password;
        this.is_active = user.is_active || false;
        this.deleted = user.deleted || false;
        this.created_at = user.created_at || new Date();
        this.updated_at = user.updated_at || new Date();
        this.deleted_at = user.deleted_at;
    }
}
exports.default = User;