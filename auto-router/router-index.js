/**
 * Created by jess on 15/12/17.
 */


'use strict';

var express = require('express');
var fs = require('fs');
var path = require('path');

var router = express.Router();

var actionClassMap = {};

//操作系统目录分隔符
const DIR_SEP = path.sep;

router.use('/', function(req, res, next){

    var path = req.path;
    var baseURL = req.baseUrl;

    if( path[0] === '/' ){
        path = path.substring(1);
    }

    //根据path,切分出对应的action和method
    let arr = path.split('/');
    if( arr.length < 2 ){
        //非法的路由请求
        return next( new Error('请求URL格式错误') );
    }

    let methodName = arr.pop();
    let actionName = arr.pop();

    actionName = actionName.charAt(0).toUpperCase() + actionName.substring(1) + 'Action';

    //因为action存在多层级目录,所以要加上目录来区分不同的action
    if( arr.length > 0 ){
        actionName = arr.join( DIR_SEP ) + DIR_SEP + actionName;
    }

    if( ! actionClassMap.hasOwnProperty(actionName) ){

        console.info('第一次尝试加载action:' + actionName);
        //未加载,需要动态require对应文件
        let filePath = '.' + DIR_SEP + 'actions' + DIR_SEP + actionName + '.js';
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