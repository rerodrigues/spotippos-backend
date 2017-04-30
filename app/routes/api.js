'use strict';

var helpers = require('../helpers'),
    express = require('express'),
    router = express.Router();

// Controllers
var propertiesController = require('../controllers/properties'),
    provincesController  = require('../controllers/provinces');

// Properties
router.route('/').all(function(req, res) {
    helpers.respondError(res, 403, "Forbidden");
});

// Properties
router.route('/properties')
    .get(propertiesController.propertyList)
    .post(propertiesController.propertyCreate);

router.route('/properties/:id')
    .get(propertiesController.propertyRead)
    .put(propertiesController.propertyUpdate)
    .delete(propertiesController.propertyDelete);

// Provinces
router.route('/provinces')
    .get(provincesController.provincesList);

router.route('/provinces/:name')
    .get(provincesController.provinceRead);

module.exports = router;
