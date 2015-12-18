/**
 * Created by jess on 15/12/17.
 */


'use strict';

console.info('BookAction required');

class BookAction {

    list(req, res, next){
        res.send('BookAction.list');
        console.info('handled by process:' + process.pid);
    }

    detail(req, res, next){
        res.send('BookAction.detail');
    }
}

module.exports = BookAction;