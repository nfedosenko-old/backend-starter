const socket = require('socket.io-client')(`http://localhost:${process.env.MAILER_PORT}`);

socket.open();

socket.on('disconnect', () => {
    socket.open();
});

exports.getForgotPasswordMailOptions = (email) => {
    return {
        to: email,
        from: 'Support',
        sender: 'Subbport',
        subject: 'Kek',
        viewUrl: 'forgot-password'
    };
};

exports.getConfirmEmailMailOptions = (email) => {
    return {
        to: email,
        from: 'Support',
        sender: 'Subbport',
        subject: 'Kek',
        viewUrl: 'confirm-email'
    };
};

exports.mailerClient = socket;