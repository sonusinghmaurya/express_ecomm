
// const { Schema, model } = require("mongoose")
// const bcrypt = require("bcryptjs")
// const validator = require("validator")
// const crypto = require("crypto")

// const userSchema = new Schema({

//     name: {
//         type: String,
//         required: [true, "name field can't be empty"],
//         trim: true
//     },
//     email: {
//         type: String,
//         unique: true,
//         required: [true, "email field can't be empty"],
//         lowercase:true,
//         validate: [validator.isEmail, "email is not proper"]
//     },
//     role: {
//         type: String,
//         enum: ["user", "merchant", "admin"],
//         default: "user"
//     },
//     password: {
//         type: String,
//         required: [true, "please enter the password"],
//         minlength: [8, "password should be min 8 characters"],

//     },

//     confirmPassword: {
//         type: String,
//         Select: false,
//         validate: {
//             validator: function (value) {
//                 return this.password == value
//             },
//             message: "password doen't match",
//         },

//     },

//     hashedToken: String,
//     passwordResetTokenExpiresAt:Date

// },
//     {
//         timestamps: true
//     }

// )

// //pre Hook used to  Before save the password and brycrypt passowrd

// userSchema.pre("save", async function (next) {
//     this.password = await bcrypt.hash(this.password, 10)
//     next()
// })


// // to compare password

// userSchema.methods.comparePassword = async function (pwd, pwdDb) {
//     return await bcrypt.compare(pwd, pwdDb)
// }



// //generate token to reset password

// userSchema.methods.resetToken= async function()
// {
//     const token = await crypto.randomBytes(32).toString("hex")
//     this.hashedToken = crypto.createHash("sha256", process.env.SECRET_STRING)
//     .update(token).digest("hex")
//     this.passwordResetTokenExpiresAt=Date.now()+10*60*1000

//     return token;
// }


// module.exports= model('user',userSchema)
// // module.exports= model('User',userSchema)


// =============================================================================



const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const crypto = require("crypto");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name field can't be empty"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email field can't be empty"],
      lowercase: true,
      validate: [validator.isEmail, "email is not proper"],
    },
    role: {
      type: String,
      enum: ["user", "merchant", "admin", "random person"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "please enter the password"],
      minlength: [8, "password should be min 8 characters"],
    },
    confirmPassword: {
      type: String,
      select: false,
      validate: {
        validator: function (value) {
          return this.password === value;
        },
        message: "password doesn't match",
      },
    },

    // hashedToken: String,
    // passwordResetTokenExpiresAt:Date
    passWordChangedAt: Date,
    resetHashedToken: String,
    passwordRestTokenExpiresAt: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//to compare password
userSchema.methods.comparePassword = async function (pwd, pwdDb) {
  return await bcrypt.compare(pwd, pwdDb);
};

//generate token to reset password

userSchema.methods.resetToken = async function () {
  const token = await crypto.randomBytes(32).toString("hex");
  this.resetHashedToken = crypto
    .createHash("sha256", process.env.SECRET_STRING)
    .update(token)
    .digest("hex");
  this.passwordRestTokenExpiresAt = Date.now() + 10 * 60 * 1000;
  return token;
};
module.exports = model("user", userSchema);
















// http://localhost:5000/app/v1/users/signup


// {
//     "name":"Hemanth",
//     "email":"hemanthkumakv153@gmail.com",
//     "password":"Hemanth@#1998",
//     "confirmPassword":"Hemanth@#1998"
// }


// {
//     "status": "success",
//     "data": {
//         "user": {
//             "name": "Hemanth",
//             "email": "hemanthkumakv153@gmail.com",
//             "role": "user",
//             "password": "$2a$10$xsgsmFm73Mn14yag/Uk/jeShYhqJ0ZXUnHEkA/I49YPwKLYJsw8Fa",
//             "confirmPassword": "Hemanth@#1998",
//             "_id": "653b49d84a8816e4557ac36e",
//             "createdAt": "2023-10-27T05:25:44.155Z",
//             "updatedAt": "2023-10-27T05:25:44.155Z",
//             "__v": 0
//         }
//     }
// }