'use strict';

const child_process = require('child_process');

(function () {
    let cmd;
    const MONGODB_URI = process.env.MONGODB_URI;

    console.log('\x1b[36m%s\x1b[0m', 'Restoring data...');

    if (!MONGODB_URI) {
        console.log('\x1b[33m%s\x1b[0m', 'Using MongoDB database at localhost');
        cmd = 'mongorestore --drop -d spotipos data/dump/spotipos/';

    } else {
        const params = MONGODB_URI.match(/^(mongodb:\/\/)?(.+):(.+)@(.+):([0-9]+)\/(.+)$/);

        if (params) {
            console.log('\x1b[33m%s\x1b[0m',`Using MONGODB database at ${MONGODB_URI}`);
            cmd = 'mongorestore -u ${params[2]} -p ${params[3]} -h ${params[4]} --port ${params[5]} -d ${params[6]} --drop data/dump/${params[6]}/';

        } else {
            console.log('\x1b[31m%s\x1b[0m', `ERROR: Invalid MONGODB database URI: ${MONGODB_URI}`);
            return false;

        }
    }

    child_process.exec(cmd, (error, stdout, stderr) => {
        if (!error) {
            console.log(stderr);
            console.log('\x1b[32m%s\x1b[0m', 'DONE!');
        } else {
            console.log(error);
            console.log('\x1b[31m%s\x1b[0m', 'ERROR!');
        }
    });

})();
