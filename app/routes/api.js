'use strict';

var helpers = require('../helpers'),
    express = require('express'),
    router = express.Router();

// Controllers
var propertiesController = require('../controllers/properties'),
    provincesController  = require('../controllers/provinces');

// Properties
router.route('/properties')
    .get(propertiesController.propertiesList)
    .post(propertiesController.propertyCreate);

router.route('/properties/:id')
    .get(propertiesController.propertyRead)
    .put(propertiesController.propertyUpdate)
    .delete(propertiesController.propertyDelete);

// Provinces
router.route('/provinces')
    .get(provincesController.provincesList);

router.route('/provinces/:nw/:se')
    .get(provincesController.provinceRead);

module.exports = router;
