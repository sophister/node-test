/**
 * Created by jess on 15/12/18.
 */


'use strict'

class FundAction {

    hi(req, res, next ){
        res.send('FundAction.hi');
    }

    name(req, res, next){
        res.send('FundAction.name');
    }
}

module.exports = FundAction;