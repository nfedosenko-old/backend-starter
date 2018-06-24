const socket = require('socket.io-client')(`http://localhost:${process.env.MAILER_PORT}`);

socket.open();

socket.on('disconnect', () => {
    socket.open();
});

exports.getForgotPasswordMailOptions = (email, locals) => {
    return {
        to: email,
        from: 'Support',
        sender: 'Subbport',
        subject: 'Reset Password Link',
        viewUrl: 'forgot-password',
        locals: locals
    };
};

exports.getConfirmEmailMailOptions = (email, locals) => {
    return {
        to: email,
        from: 'Support',
        sender: 'Subbport',
        subject: 'Kek',
        viewUrl: 'confirm-email',
        locals: locals
    };
};

exports.mailerClient = socket;