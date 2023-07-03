'use strict'

module.exports = function Error500(error,req,res,next){
    res.status(500).json({
        Errorcode: 500,
        message: `Code Error message:${error.message}` ,
        path : req.originalUrl 
    })

}