/**
 * test co library with async operation
 * Created by jess on 15/12/17.
 */

'use strict';


var express = require('express');
var co = require('co');


function getUser( name , timeout ){

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

console.log('before co func');

co(function* test1(){
    var user1 = yield getUser('user1');
    var user2 = yield getUser( 'user2', 3000);
    return [ user1, user2 ];
}).then( function( data ){
    console.log( JSON.stringify(data) );
} ).catch(function(err){
    console.error( err );
});

console.log( 'after co function');