const settings = {
    port: process.env.PORT || 3001,
    redisStoreUrl: process.env.REDIS_STORE_URL || 'localhost: 6379',
    jwtSecret: process.env.JWT_SECRET || 'jwt secret',
    dbPath: process.env.DB_PATH || 'mongodb://localhost/coral',
    sessionSecret: process.env.SESSION_SECRENT || 'secret'
};

module.exports = settings;