exports.gracefulExit = (connection) => {
    connection.close((err) => {
        process.exit(err ? 1 : 0);
    });
};