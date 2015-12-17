/**
 * Created by jess on 15/12/17.
 */


'use strict';


class TodoAction {

    list(req, res, next){
        res.send('TodoAction.list');
    }

    detail( req, res, next ){
        res.send('TodoAction.detail');
    }
}


module.exports = TodoAction;

