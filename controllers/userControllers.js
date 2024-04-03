
// const User = require("../models/products/User")
// const jwt = require("jsonwebtoken")
// const asyncErrorHandler = require("../utils/asyncErrorHandler")
// const CustomError = require("../utils/CustomError")
// // const token = require("../models/products/User")
// const sendEmail = require("../utils/email") 


// const genToken = async (id)=>{
//     return await jwt.sign({id:id},process.env.SECRET_STRING,
//         // { expiresIn :"1d",}
    
//         { expiresIn :"1min",}

//         )

// }

// const signup =asyncErrorHandler( async (req, res,next)=>{
//     // try{
//         //check for existing user
//         // const existingUser = await User.findOne({email:req.body.email})

//         // if(existingUser)
//         // {
//         //     // return res.status(400).json({
//         //      res.status(400).json({
//         //         message:"user is already present with this email",
            

//         //     });
//         // }
//         // else{
//             const newUser = await User.create(req.body)

//             // const token = await jwt.sign({id:newUser._id},process.env.SECRET_STRING)
//               const token = await genToken(newUser._id)
        
        
//                 res.status(201).json({
//                     status:"success",
//                     token,
//                     data:{
//                         user:newUser,
//                        },
//                      });
//                     }
//         // }
        
//     // catch(error)
//     // {
//     //         res.status(400).json({
//     //             status:"fail",
//     //             message:error.message,
//     //         })
//     // }
// // }
    
                    

// )




// // existingUser

// const login = asyncErrorHandler(async (req, res, next)=>{
//     // try{
//         const {email, password}=req.body;
//         //check for existing user
//         const existingUser = await User.findOne({email:email});
    
//         // comparePassword
// // console.log(existingUser);
//         const passwordMatch= await existingUser.comparePassword(
//             password,
//             existingUser.password
//         )
//         const token =await genToken(existingUser._id)

//         if(!existingUser && !passwordMatch)
//         {
//             //  res. status(400).json({
//             //     message:"user with this creadential is missing or password is wrong",
//             // })

//             let err = new CustomError(400, "user with this creadential is missing or password is wrong")
//             next(err)
//         }
//         else
//         {
//                 res.status(200).json({
//                 status:"success",
//                 token,
//                 data:{
//                     user:existingUser}
//             })
//         }
              
//     // }
//     // catch(error)
//     // {
//     //     res.status(400).json
//     //     ({
//     //         status:"bad requiest",
//     //         massage:error.message
//     //     })
//     // }
// })



// const forgotPassword =asyncErrorHandler( async (req, res, next)=>{
    
//     // 1.GET USER BASED ON POSTED EMAIL

//     const user = await User.findOne({email:req.body.email})
    

//     if(!user)
//     {
//         let err = new CustomError(401, "something went wron try again")
//         next(err)
//     }

//     // 2.GENERATE A RANDOM RESET TOKEN


//     const token = await user.resetToken()
//     await user.save({validateBeforeSave:false})



//     //   3.SEND THE TOKEN BACK TO THE EMAIL


//     // let message =`this is the link for reset password and it is going to be valid
//     // for 10 min only http://127.0.0.1:5000/app/v1/users/resetPassword/${token}`

//     // const options={

//     //     userEmail:user.email,
//     //     subject:"reset password",
//     //     message:message,

//     // }

//     // await sendEmail(options)
//     // res.status(200).json({
//     //     status:"success",
//     //     message:"email sent successfully"
//     // })

//     //  next()


// // =====================================================================




// const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${token}`
// const message=`we have received a password reset request. Please use the below link to reset password\n\n${resetUrl }\n\n this reset password link will be valid only for 10 minutes  to rest your email`

// try{
//     await sendEmail({

//         userEmail:user.email,
//         subject:"reset password",
//         message:message,
//     })

//     res.status(200).json({
//         status:"success",
//         message:"password reset link send to the user email"
//     })
// }
// catch(err){
//     user.hashedToken=undefined;
//     user.passwordResetTokenExpiresAt = undefined

//     user.save({validateBeforeSave:false})

//     return next(new CustomError(500,'There was an error sending password reset email. please try again '))
// }
 
// })





// const resetPassword =asyncErrorHandler(async (req, res, next)=>{
//     const token = crypto.creaHash('sha256').update(req.params.token).digest("hex");
//      const user = await User.findOne({hashedToken:token, passwordResetTokenExpiresAt:{$gt:Date.now()}})


//      if(!user)
//      {
//         const error = new CustomError(401,"reset passowrd  Token  has been expired")
//         next(error)
//      }

//     // RESETING THE USER PASSWORD

//      user.password = req.body.password;
//      user.confirmPassword = req.body.confirmPassword
//      user.hashedToken = undefined,
//      user.passwordResetTokenExpiresAt=undefined;


//      // LOGIN THE USER

//     //  const loginToken = singToken(user._id);
//     //  res.status(200).json({
//     //     token:loginToken
//     //  })

//      await user.save();
// })

// const verifyRole =(role)=>{
//     return (req, res, next)=>{
//         if(!role.includes(req.user.role))
//         {
//             let err = new CustomError(403, "Your not authorise to access this route")
//             next(err)
//         }
//        next()
//     }

// }


// module.exports ={
//     signup,
//     login,
//     forgotPassword,
//     resetPassword,
//     verifyRole
//                  }



// ==================================================================


// const User = require("../models/User");
const User = require("../models/products/User")
const jwt = require("jsonwebtoken");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/CustomError");
const sendEmail = require("../utils/email");
const crypto = require("crypto");

const genToken = async (id) => {
  return await jwt.sign({ id: id }, process.env.SECRET_STRING, {
    expiresIn: "1d",
  });
};
const signup = asyncErrorHandler(async (req, res) => {
  const newUser = await User.create(req.body);
  const token = await genToken(newUser._id);
  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});


const login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //existing user
  const existingUser = await User.findOne({ email: email });
  const passwordMatch = await existingUser.comparePassword(
    password,
    existingUser.password
  );
  if (!existingUser && !passwordMatch) {
    let err = new CustomError(
      400,
      "user with this credentials is missing or password is wrong"
    );
    next(err);
  }
  let token = await genToken(existingUser._id);
  res.status(200).json({
    status: "success",
    token,
    data: {
      existingUser,
    },
  });
});

const forgotPassword = asyncErrorHandler(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    const err = new CustomError(401, "User doesn't exist");
    next(err);
  }

  let token = await user.resetToken();
  await user.save();
  let message = `this is the link for reset password and it is going to be valid for 10 min only http://127.0.0.1:5000/app/v1/users/resetPassword/${token}`;
  let options = {
    userEmail: user.email,
    subject: "reset password",
    message: message,
  };
  await sendEmail(options);
  res.status(200).json({
    status: "success",
    message: "mail sent successfully",
  });
});

const resetPassword = asyncErrorHandler(async (req, res, next) => {
  let token = crypto
    .createHash("sha256", process.env.SECRET_STRING)
    .update(req.params.token)
    .digest("hex");
  let user = await User.findOne({
    resetHashedToken: token,
    passwordRestTokenExpiresAt: { $gt: Date.now() },
  });
  if (!user) {
    let err = new CustomError(401, "reset password token has been expired");
    next(err);
  }
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordRestTokenExpiresAt = undefined;
  user.resetHashedToken = undefined;
  user.passWordChangedAt = Date.now();
  await user.save();
  res.status(200).json({
    status: "success",
    message: "password has been reset successfully",
  });
});

// const verifyRole=(role)=>{
//   return (req,res,next)=>{
//     if(req.user.role!=role){
//       let err=new CustomError(403,'Youre not authorised to access this route')
//       next(err)
//     }
//     next()
//   }
// }

const verifyRole = (role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      let err = new CustomError(
        403,
        "Youre not authorised to access this route"
      );
      next(err);
    }
    next();
  };
};

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
  verifyRole,
};