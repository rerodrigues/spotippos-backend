'use strict';

var mongoose = require('mongoose'),
    dbURI = process.env.NODE_ENV === 'production' ?
                process.env.MONGODB_URI :
                'mongodb://localhost/spotipos';

mongoose
    .connect(dbURI)
    .connection
        .on('connected', function(){
            console.log('Mongoose connected to ' + dbURI);
        })
        .on('error', function(err){
            console.log('Mongoose connection error ' + err);
        })
        .on('disconnected', function(){
            console.log('Mongoose disconnected');
        });

var closeConnection = function(msg, callback){
    mongoose.connection.close(function(){
        console.log('\nMongoose disconnected on ' + msg + '\n');
        if(typeof callback === 'function') { callback(); }
    });
};

process
    .on('SIGINT', function(){
        closeConnection('App halt', function(){
            process.exit(0);
        });
    })
    .on('SIGTERM', function(){
        closeConnection('Heroku app halt', function(){
            process.exit(0);
        });
    })
    .once('SIGUSR2', function(){
        closeConnection('nodemon restart', function(){
            process.kill(process.pid, 'SIGUSR2');
        });
    });


if(process.platform === 'Win32') {
    var readLine = require('readline'),
        rl = readLine.createInterface({
            input : process.stdin,
            output: process.stdout
        });

    rl.on('SIGINT', function(){
        process.emit('SIGINT');
    });
}

require('./property');
require('./province');
