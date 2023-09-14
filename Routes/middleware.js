function authenticate(req,res,next){
res.send("TestingTE")
next();
}

module.exports = {authenticate}
