'use strict';

module.exports.respondJson = function(res, status, content){
    res.status(status);
    res.json(content);
};

module.exports.respondError = function(res, status, message, headers){
    res.header(headers || {});
    res.status(status);
    res.json({
        status: status,
        message: message
    });
};

module.exports.formatProvinces = function(provinces){
    var result = {};

    provinces.forEach(function(province){
        result[province.name] = {
            boundaries : province.boundaries
        };
    });

    return result;
};
