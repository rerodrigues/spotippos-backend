'use strict';

var mongoose = require('mongoose');

var propertySchema = new mongoose.Schema({
    _id          : { type: Number, required: true },
    title        : { type: String, required: true },
    price        : { type: Number, required: true },
    beds         : { type: Number, required: true, min : 1, max: 5 },
    baths        : { type: Number, required: true, min : 1, max: 4 },
    lat          : { type: Number, required: true },
    long         : { type: Number, required: true },
    squareMeters : { type: Number, required: true, min: 20, max: 240 },
    description  : { type: String, required: true },
    createdOn    : { type: Date, "default": Date.now }
});

propertySchema.statics.getAll = function(bounds) {

    return this.aggregate([
        { $match: {
            long: { $gte: parseInt(bounds.ax,10), $lte: parseInt(bounds.bx,10) },
            lat:  { $gte: parseInt(bounds.by,10), $lte: parseInt(bounds.ay,10) },
        }},
        { $project: { _id: 0,
            id : "$_id", title:1, price:1, beds:1, baths:1, lat:1, long:1, squareMeters:1, description:1
        }} ]);
};

propertySchema.statics.get = function(id) {

    return this.aggregate([
        { $match: { _id: parseInt(id,10) }}, { $limit: 1 },
        { $project: { _id: 0,
            id : "$_id", title:1, price:1, beds:1, baths:1, lat:1, long:1, squareMeters:1, description:1
        }} ]);
};

mongoose.model('Property', propertySchema, 'properties');
