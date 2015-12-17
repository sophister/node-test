/**
 * Created by jess on 15/12/17.
 */


'use strict';

var co = require('co');

function getUser( name, timeout ){

    name = name || 'default name';
    timeout = timeout || 1000;

    return new Promise(function(resolve, reject){

        setTimeout( function(){

            resolve({
                name : name,
                timeout : timeout
            });

        }, timeout);
    });
}

function asyncWithError( timeout ){

    timeout = timeout || 3000;

    return new Promise(function(resolve, reject){

        setTimeout( function(){

            throw new Error('async error hanppen');

        }, timeout);
    });
}

co( function* test(){
    try{
        var user1 = yield getUser( 'jess', 1000);
        var error = yield asyncWithError( 4000 );
    }catch(e){
        console.error('try catch error success');
    }

    return [ user1 ];
}).then( function(data){
    console.log( JSON.stringify(data) );
}).catch(function(err){
    console.error( err );
    console.log('=================== error catched ==========');
});





