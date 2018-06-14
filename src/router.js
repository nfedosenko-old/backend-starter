const {Router} = require('express');
const controllers = require('./controllers');

const router = Router();

controllers(router);

router.get('/', (req, res) => {
    res.sendFile('./dist/index.html');
});

module.exports = router;
