/**
 * Created by Seth on 8/17/2017.
 */
let https = require('https');

module.exports = {
    contactRelic: function(req, res, next){
            console.log(req.body);

            return res.status(200).send(req.body);
    }
};