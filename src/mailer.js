const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const nodemailer = require('nodemailer');
const kue = require('kue');
const Email = require('email-templates');

const queue = kue.createQueue();

const transporter = nodemailer.createTransport({
    pool: true,
    host: process.env.TRANSPORT_HOST,
    port: process.env.TRANSPORT_PORT,
    auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASSWORD
    }
});

transporter.on('idle', () => {
    queue.process('email', 1, (job, done) => {
        if (transporter.isIdle()) {
            transporter.sendMail(job.data, (err, info) => {
                if (!err) {
                    console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info));
                    done();
                }
            });
        }
    });
});

server.listen(process.env.PORT);

io.on('connection', (socket) => {
    console.log('Socket connection established');

    socket.on('email:send', (options, cb) => {
        const email = new Email({
            views: {
                options: {
                    extension: process.env.RENDER_ENGINE
                }
            }
        });

        email.render(options.viewUrl, options.locals).then(html => {
            console.log('Template rendered successfully');

            const mailOptions = {
                to: options.to,
                from: options.from,
                sender: options.sender,
                subject: options.subject,
                html: html
            };

            queue.create('email', mailOptions).save((err) => {
                if (typeof cb === 'function') {
                    cb(err ? err : null, 'Email added to queue successfully');
                }
            });
        });

    });
});