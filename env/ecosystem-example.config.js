const MAILER_PORT = "4444";

module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
        {
            name: "backend",
            script: "./src/worker.js",
            env: {
                NODE_ENV: "development",
                DB_HOST: "localhost",
                DB_USERNAME: "",
                DB_PASSWORD: "",
                DB_NAME: "test",
                PORT: "3002",
                MAILER_PORT: MAILER_PORT,
                SESSION_SECRET: "secret",
                TOKEN_ABI: "",
                TOKEN_ADDRESS: "",
                ETH_NETWORK_PROVIDER: "http://localhost:7545"
            },
            env_production: {
                NODE_ENV: "production",
                DB_HOST: "localhost",
                DB_USERNAME: "",
                DB_PASSWORD: "",
                DB_NAME: "test",
                PORT: "3003",
                MAILER_PORT: MAILER_PORT,
                SESSION_SECRET: "secret",
                TOKEN_ABI: "",
                TOKEN_ADDRESS: "",
                ETH_NETWORK_PROVIDER: ""
            },
            instances: 1,
            exec_mode: "cluster",
            watch: ["./src"],
            log_type: "json",
            log_date_format: "YYYY-MM-DD HH:mm Z",
            merge_logs: true,
            error_file: "./logs/error_log.json",
            out_file: "./logs/out_log.json"
        },
        {
            name: "mailer",
            script: "./src/mailer.js",
            watch: ["./src"],
            log_type: "json",
            log_date_format: "YYYY-MM-DD HH:mm Z",
            merge_logs: true,
            error_file: "./logs/mailer_error_log.json",
            out_file: "./logs/mailer_out_log.json",
            env: {
                PORT: MAILER_PORT,
                TRANSPORT_HOST: "smtp.ethereal.email",
                TRANSPORT_PORT: 587,
                AUTH_USER: "rmoy22uzs7xghfr4@ethereal.email",
                AUTH_PASSWORD: "y3JQGWZ5J4UBsCRqEG",
                RENDER_ENGINE: "ejs"
            },
            env_production: {
                PORT: MAILER_PORT,
                TRANSPORT_HOST: "",
                TRANSPORT_PORT: 465,
                AUTH_USER: "",
                AUTH_PASSWORD: "",
                RENDER_ENGINE: "ejs"
            }
        }
    ],

    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    deploy: {},
};
