const CustomError = require("../utils/CustomError");

const devError = (res, error) =>
 {
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        stackTrace: error.stack,
        error: error,
    })
}


const handleValidationError = (error) => {
    // const message = `Ivalid value ${err.value} for ${err.path}!`;
    let errArray = Object.values(error.errors);
    let messages = errArray.map((err) =>err.message)
    let message = messages.join(",")
    return new CustomError(400, message)
}

// const handleTokenExpiredError=(error)=>{
    
//     return new CustomError(400, "Your session has been expired tyr loggin in once again");
// }


// Signup same Email Id error handler

const handleDuplicateError=(error)=>{
    let msg=`this email ${error.keyValue.email} exists already`
    return new CustomError(400,msg);
}


// TokenExpiredError Time exprired Error

const handleTokenExpiredError=(error)=>{
    
    return new CustomError(400, "Your session has been expired tyr loggin in once again");
}

// Tokent Change use Error

const handleJsonWebToken=(error)=>{

    return new CustomError(401, "your not authorized user");
}


// id change CostError used

const handleCostError=(error)=>{

        return new CustomError(401, "your not  give proper id")
}



const prodError = (res, error) => {
    if (error.isOperational == true) {
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message
        })
    }
    else {

        res.status(error.statusCode).json({
            status: "error",
            message: "something went wrong please try again leter",
        })

    }
}






module.exports = (error, req, res, next) =>
 {
    // console.log(error);
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error"

    if (process.env.NODE_ENV === "development")
    {
        // console.log(error.statusCode);
        devError(res, error)
    }
   
    else if (process.env.NODE_ENV === "production")   
       {
         // console.log(error);

        if (error.name === "ValidationError") {
            error = handleValidationError(error)
        }

        if(error.name === "TokenExpiredError")
        {
            error = handleTokenExpiredError(error)
        }



        if(error.code ===11000)
        {
            error=handleDuplicateError(error)
        }
        
        if(error.name ==="JsonWebTokenError")
        {
            error = handleJsonWebToken(error)
        }



        if(error.name ==="CastError")
        {
            error = handleCostError(error)
        }

        prodError(res, error)
    }

}