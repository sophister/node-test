/**
 * Created by jess on 15/12/17.
 */


'use strict';

var express = require('express');
var fs = require('fs');

var router = express.Router();

var actionClassMap = {};

router.use('/:action/:method', function(req, res, next){

    var actionName = req.params.action;
    var methodName = req.params.method;

    actionName = actionName.charAt(0).toUpperCase() + actionName.substring(1) + 'Action';

    if( ! actionClassMap.hasOwnProperty(actionName) ){
        console.info('第一次尝试加载action:' + actionName);
        //未加载,需要动态require对应文件
        let filePath = './actions/' + actionName + '.js';
        try{
            //fs.accessSync 如果成功,啥都不反悔,娘希匹
            let isFileExist = fs.accessSync( filePath, fs.R_OK );
            let actionClass = require(filePath);
            actionClassMap[actionName] = actionClass;
        }catch(e){
            console.error(e);
            actionClassMap[actionName] = null;
            return next( e );
        }
    }

    let actionClass = actionClassMap[actionName];
    if( ! actionClass ){
        //TODO 还应该判断对应的类,是否符合Action类的要求
        return next( new Error('找不到对应的action:' + actionName));
    }
    let obj = new actionClass();
    if( typeof obj[methodName] === 'function' ){
        return obj[methodName].call( obj, req, res, next );
    }else{
        return next( new Error('action[' + actionName + ']找不到对应的方法[' + methodName + ']'));
    }

});


module.exports = router;