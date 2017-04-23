'use strict';

var mongoose = require('mongoose');

var coordsType = {
    x : { type: Number, required: true, min: 0, max: 1400 },
    y : { type: Number, required: true, min: 0, max: 1000 }
};

var provinceSchema = new mongoose.Schema({
    name       : { type: String, required: true },
    boundaries : {
        upperLeft   : coordsType,
        bottomRight : coordsType
    }
});

provinceSchema.statics.getAll = function(bounds) {
    var nw = bounds.nw.split(','),
        se = bounds.se.split(',');

    return this.aggregate([
        { $match: {
            'boundaries.upperLeft.x'   : { $gte: parseInt(nw[0],10) },
            'boundaries.upperLeft.y'   : { $lte: parseInt(nw[1],10) },
            'boundaries.bottomRight.x' : { $lte: parseInt(se[0],10) },
            'boundaries.bottomRight.y' : { $gte: parseInt(se[1],10) },
        }},
        { $project: { _id: 0,
            name : 1, boundaries: 1
        }} ]);
};

provinceSchema.statics.get = function(name) {

    return this.aggregate([
        { $match: { name: name }}, { $limit: 1 },
        { $project: { _id: 0, boundaries:1 }}
    ]);
};

mongoose.model('Province', provinceSchema, 'provinces');
