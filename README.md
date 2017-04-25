# Spotippos Backend
> The backend part of my [spotipos-frontend](https://github.com/rerodrigues/spotippos-frontend) application that mimicks the original API responses.

_Spotippos backend_ is intended to serve as an API that mimics the responses of the original backend application of the [_Spotippos Anúncios_](https://github.com/VivaReal/code-challenge) app. It was created to serve as a REST API server for my own [_Spotippos Anúncios_](https://github.com/rerodrigues/spotippos-frontend) frontend implementation.

It is at early stages of development and for now can only mimic the original implementation responses. Adding, editing and deleting data is not possible yet.

## Instalation
For installation you will need [Node.js](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/) installed on your system. If you don't have it yet, install them first.

After installing, open a command prompt (`cmd` on windows) and type:

```sh
git clone git@github.com:rerodrigues/spotippos-backend.git
cd spotippos-backend
npm install
```

### Importing intial data

Type in command prompt:

```sh
#To development environment
npm run db-restore-data

#To production environment
MONGODB_URI="mongodb://<username>:<password>@<host>:<port>/<database>" npm run db-restore-data

#Replace the data between < and > with your own information.
```


## API Endpoints

| Endpoint                 | Method | Description                     |
|--------------------------|--------|---------------------------------|
| /api/properties          | GET    | Lists all properties            |
| /api/properties?{bounds} | GET    | Lists properties between bounds |
| /api/properties/{id}     | GET    | Property details                |
| /api/provinces           | GET    | Lists all provinces             |
| /api/provinces?{nw}&{se} | GET    | Lists provinces between bounds  |

_The remaining operations (create, update and delete) will be implemented in future versions._


#### Parameters

| Param  | Value                       | Description                        |
|--------|-----------------------------|------------------------------------|
| bounds | ax={x}&bx={x}&ay={y}&by={y} | Right, Left, Top and Bottom coords |
| nw     | {x},{y}                     | Northwest coordinates (x,y)        |
| se     | {x},{y}                     | Southeast coordinates (x,y)        |
| x      | 0 <= x <= 1400              | Longitude ranges (x)               |
| y      | 0 <= y <= 1000              | Latitude ranges  (y)               |


## Using
`Spotipos Backend` does not have a user interface. Instead it is a REST API server. In order to test it you will need a REST client, like [Postman](https://www.getpostman.com/).

Type in command prompt:

```sh
npm start
```

and then in the REST client use the above API endpoints and parameters to check the responses.


## Relase History
*   1.0.1 _\[28/11/2016\]_
    *   Replaced shell scripts by javascripts
*   1.0.0 _\[27/11/2016\]_
    *   Initial version

## Roadmap

*   2.0
    *   Create, Delete and Update actions
    *   Swagger documentation
*   1.0
    *   ~~Initial version~~

## Contact Info

Renato Rodrigues – [about.me/renato.rodrigues](https://about.me/renato.rodrigues)

Distributed under the MIT license. Check `LICENSE` for more information.

[https://github.com/rerodrigues/](https://github.com/rerodrigues/)
