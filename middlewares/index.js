// middleware example
const jwt = require("jsonwebtoken")
const middlewares = {
    authMiddleware: (req,res,next)=>{
        try {
            const token = req.headers.authorization.split(" ")[1]
            const isUserTrue = jwt.verify(token,process.env.JWT_SECRETE_KEY)
            // agr token verify hoga tu ye mjhy us user ka object return krega _doc property k andr otherwise error aaega agr token wrong hogaa tu
            // console.log("isUserTrue",isUserTrue._doc);

            // check if user object is got in isUserTrue variable so we will proceed further, otherwise we will through an error of invalid user 
            console.log("isUserTrue",isUserTrue);
            if (isUserTrue){
                next()      // it is a middleware which proceed to the callback function which pass in an API
            }else{
                res.status(401).json({
                    message:"Please Login to Continue"
                })
            }
        } catch (error) {
            res.status(401).json({
                    message:"Invalid User"
            })
        }
    }
}
module.exports = middlewares;
