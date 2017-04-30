'use strict';

var helpers = require('../helpers.js'),
    mongoose = require('mongoose'),
    Property = mongoose.model('Property');

// List properties in given bounds
module.exports.propertyList = function(req, res) {

    var bounds = (req.query.ax !== undefined && req.query.ay !== undefined && req.query.bx !== undefined && req.query.by !== undefined) ?
        { ax: req.query.ax, ay: req.query.ay, bx: req.query.bx, by: req.query.by } :
        { ax: 0, ay: 1000, bx: 1400, by: 0};

    Property.getAll(bounds).exec(function(err, results){
        if(err) {
            helpers.respondError(res, 404, err.errmsg);
        } else if (!results.length) {
            helpers.respondError(res, 404, "No properties in boundss");
        } else {
            helpers.respondJson(res, 200, {
                foundProperties: results.length,
                properties : results
            });
        }
    });
};

// Get a properties with a given ID
module.exports.propertyRead = function(req, res) {

    Property.get(req.params.id).exec(function(err, results){
        if(err) {
            helpers.respondError(res, 404, err.errmsg);
        } else if (!results.length) {
            helpers.respondError(res, 404, "Property nof found");
        } else {
            helpers.respondJson(res, 200, results[0]);
        }
    });
};

// Create a property
module.exports.propertyCreate = function(req, res) {
    helpers.respondError(res, 405, 'Not implemented', { 'Allow': 'GET' });
};

// Update a property
module.exports.propertyUpdate = function(req, res) {
    helpers.respondError(res, 405, 'Not implemented', { 'Allow': 'GET' });
};

// Delete a property
module.exports.propertyDelete = function(req, res) {
    helpers.respondError(res, 405, 'Not implemented', { 'Allow': 'GET' });
};
