
const jwt = require('jsonwebtoken');
const User = require("../models/products/User");
const asyncErrorHandler = require("../utils/asyncErrorHandler") 
const CustomError = require("../utils/CustomError")


const auth = asyncErrorHandler(async (req, res, next) =>
 {
    const testToken = req.headers.authorization;
    // console.log(testToken);
    let token;

    if (testToken || testToken.startsWith("Bearer")) 
    {
      token = testToken.split(" ")[1];
    }



    //verify token

    const decodedToken = await jwt.verify(token, process.env.SECRET_STRING)

    const user = await User.findById(decodedToken.id)

    if (!user) 
    {
        // return res.status(400).json({
        //     message: "user is not logged in"
        // })

        let err = new CustomError(401, "user is not logged in")
        next(err)
    }
    // }

    req.user = user

    // console.log(token);
    // console.log(req.user);
    next()
})
module.exports = auth