"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ env }) => ({
    email: {
        config: {
            provider: "nodemailer",
            providerOptions: {
                host: env("SMTP_HOST"),
                port: env("SMTP_PORT"),
                secure: true,
                auth: {
                    user: env("SMTP_EMAIL"),
                    pass: env("SMTP_PASS"),
                },
            },
            settings: {
                defaultFrom: env("SMTP_EMAIL"),
            },
        },
    },
});
