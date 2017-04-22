'use strict';

var helpers = require('../helpers'),
    mongoose = require('mongoose'),
    Province = mongoose.model('Province');

// List all properties provinces
module.exports.provincesList = function(req, res) {

    var bounds = (req.query.nw !== undefined && req.query.se !== undefined) ?
        { nw: req.query.nw, se: req.query.se } :
        { nw: '0,1000', se: '1400,0' };

    Province.getAll(bounds).exec(function(err, results){
        if(err) {
            helpers.respondError(res, 404, err.errmsg);
        } else if (!results.length) {
            helpers.respondError(res, 404, "No provinces found.");
        } else {
            helpers.respondJson(res, 200, helpers.formatProvinces(results) );
        }
    });

};
