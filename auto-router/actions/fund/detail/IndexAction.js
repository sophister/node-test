/**
 * Created by jess on 15/12/18.
 */

'use strict';

class IndexAction {

    detail(req, res, next){
        res.send('基金详情页');
    }

    list(req, res, next){
        res.send('基金列表页');
    }

}


module.exports = IndexAction;