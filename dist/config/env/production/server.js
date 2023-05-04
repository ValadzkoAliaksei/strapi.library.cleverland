"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cron_tasks_1 = __importDefault(require("../../cron-tasks"));
exports.default = ({ env }) => ({
    proxy: true,
    url: env('APP_URL'),
    app: {
        keys: env.array('APP_KEYS')
    },
    webhooks: {
        populateRelations: false,
    },
    cron: {
        enabled: true,
        tasks: cron_tasks_1.default,
    }
});
