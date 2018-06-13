const {Router} = require('express');
const controllers = require('./controllers');

const router = Router();

controllers(router);

router.get('/', (req, res) => {
    res.sendFile('./dist/index.html');
});

router.get('/main', (req, res) => {
    res.render('index', {pageTitle: 'EJS'});
});


module.exports = router;
