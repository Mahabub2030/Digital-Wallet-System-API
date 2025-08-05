"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsActive = exports.Role = void 0;
var Role;
(function (Role) {
    Role["SUPAR_ADMIN"] = "SUPAR_ADMIN";
    Role["ADMIN"] = "ADMIN";
    Role["AGENT"] = "AGENT";
    Role["USER"] = "USER";
})(Role || (exports.Role = Role = {}));
var IsActive;
(function (IsActive) {
    IsActive["ACTIVE"] = "ACTIVE";
    IsActive["SUSPENDED"] = "SUSPENDED";
    IsActive["BLOCKED"] = "BLOCKED";
})(IsActive || (exports.IsActive = IsActive = {}));
