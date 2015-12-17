/**
 * Created by jess on 15/12/17.
 */


'use strict';

class BookAction {

    list(req, res, next){
        res.send('BookAction.list');
    }

    detail(req, res, next){
        res.send('BookAction.detail');
    }
}

module.exports = BookAction;