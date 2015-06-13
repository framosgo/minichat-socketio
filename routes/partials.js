/**
 * Created by Renato on 19/04/2015.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/partials/:partialPath', function(req, res, next) {
    res.render('partials/' + req.params.partialPath);
});

module.exports = router;