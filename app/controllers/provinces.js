'use strict';

var helpers = require('../helpers'),
    mongoose = require('mongoose'),
    Province = mongoose.model('Province');

// List all properties provinces
module.exports.provincesList = function(req, res) {

    Province.getAll().exec(function(err, results){
        if(err) {
            helpers.respondError(res, 404, err.errmsg);
        } else if (!results.length) {
            helpers.respondError(res, 404, "No provinces found.");
        } else {
            helpers.respondJson(res, 200, helpers.formatProvinces(results) );
        }
    });

};

// Get a province with a given name
module.exports.provinceRead = function(req, res) {

    var bounds = (req.params.nw !== undefined && req.params.se !== undefined) ?
        { nw: req.params.nw, se: req.params.se } :
        { nw: '0,1000', se: '1400,0' };

    Province.get(bounds).exec(function(err, results){
        if(err) {
            helpers.respondError(res, 404, err.errmsg);
        } else if (!results.length) {
            helpers.respondError(res, 404, "No provinces found.");
        } else {
            helpers.respondJson(res, 200, helpers.formatProvinces(results));
        }
    });
};
