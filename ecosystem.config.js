module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [

        // First application
        {
            name: 'backend',
            script: './src/worker.js',
            env: {
                NODE_ENV: 'development',
                DB_PATH: 'mongodb://localhost/coral',
                PORT: '3002',
                SESSION_SECRENT: 'secret',
                JWT_SECRET: 'jwt secret',
            },
            env_production: {
                NODE_ENV: 'production',
                DB_PATH: 'mongodb://localhost/coral',
                PORT: '3003',
                SESSION_SECRENT: 'secret',
                JWT_SECRET: 'jwt secret',
            },
            instances: 1,
            exec_mode: "cluster",
        }
    ],

    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    deploy: {
        production: {
            user: 'node',
            host: '212.83.163.1',
            ref: 'origin/master',
            repo: 'git@github.com:repo.git',
            path: '/var/www/production',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env development'
        },
        dev: {
            user: 'node',
            host: '212.83.163.1',
            ref: 'origin/master',
            repo: 'git@github.com:repo.git',
            path: '/var/www/development',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env dev',
            env: {
                NODE_ENV: 'dev',
                PORT: 3001,
                REDIS_STORE_URL: 'localhost: 6379',
                JWT_SECRET: 'jwt secret',
                DB_PATH: 'mongodb://localhost/coral',
                SESSION_SECRENT: 'secret',
            }
        }
    },
};
