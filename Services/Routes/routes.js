const {newRoute, routes} = require('express-quickrouter')
const {authenticate} = require('./middleware')
const rts = {"r":[
        new newRoute({name:"/", method:"GET",callback: (req,res) => {
            try{res.sendStatus(200).send("Routes Are Working")}catch(e){}
        }, middleware:(req,res,next) => {console.log("Routes Are Working");next();}}), 
]}

module.exports = rts