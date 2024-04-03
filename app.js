const express = require('express');
const mongoose = require('mongoose');
const productRouter = require('./routes/productroutes');
const userRouter = require('./routes/authRoutes');
const cartRouter = require("./routes/cartRouters")
const orderRouter = require("./routes/orderRoutes")

const dotenv = require('dotenv');
const CustomError = require('./utils/CustomError');
const globaleErrorController = require("./controllers/globaleErrorController")

// ==
// const cors =require("cors")



dotenv.config({
    path: "./.env"
})


let app = express();

mongoose.connect(process.env.MONGODB_LOCALURI).then(() => {
    console.log(`db connected`);
}).catch((err) => {
    console.log(err);
})


app.use(express.json());


app.use('/app/v1/products', productRouter)
app.use('/app/v1/users', userRouter)
app.use('/app/v1/cart', cartRouter)
app.use('/app/v1/orders', orderRouter)

app.all("*",(req,res,next)=>{

        //Default Error

        // res.status(400).json({
        //     status:"fail",
        // message:`this route ${req.url}is not found`

        // })


        // Golbale Error : Operation Error

    //    let err = new Error(404,`this route ${req, url}is not found`);
    //    err.statusCode=400;
    //    err.status="fail"
    //    next(err) 


    // Custorm Error

    let err =new CustomError(404,`this route ${req.url} is not found`)
    next(err)
        
     })


    // Golbale Error

// app.use((error, req, res, next)=>{
//     let statusCode=error.statusCode ||500;
//     let status= error.status || "fail";

//     res.status(statusCode).json({
//         status:status,
//         message:error.message,
//     })    
// })

app.use(globaleErrorController)

module.exports = app;