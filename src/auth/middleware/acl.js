'use strict'

module.exports = (capiblity) => {
    return (req, res, next) => {
        console.log(req.users.Capabilities);
        if (req.users.Capabilities.includes(capiblity)) next(); 
        else next('you dont have the capiblity')
    }
}
