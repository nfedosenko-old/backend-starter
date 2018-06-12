const pug = require('pug');
const {Router} = require('express');
const controllers = require('./controllers');

const router = Router();

controllers(router);

router.get('/', (req, res) => {
    res.sendFile('./dist/index.html');
});



router.get('/pug', (req, res) => {
    /* pug.renderFile('index.pug', {
         name: 'Timothy'
     })*/
    res.render('index', {pageTitle: 'Pug', youAreUsingPug: true});
});


module.exports = router;
