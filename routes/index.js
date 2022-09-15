const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send('Ammon Quarshie')
});

module.exports = routes;