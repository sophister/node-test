/**
 * 自动根据URL来load对应的action,执行对应的方法
 * Created by jess on 15/12/17.
 */


'use strict';

var express = require('express');

var routerIndex = require('./router-index.js');

var app = express();

app.use('/node', routerIndex);

app.use( function(err, req, res, next ){
    res.send( err.message );
});


var port = 3000;

app.listen( port );

console.log('app listen:' + port);

