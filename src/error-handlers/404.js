'use strict'

module.exports = function Error404(req,res){
    res.status(404).json({
        Errorcode: 404,
        message: 'Page not found',
        path : req.originalUrl 
    })

}