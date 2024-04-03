

// const {Schema, model} = require("mongoose")


// const orderSchema = new Schema(
//     {
//         owner:{
//                 type:Schema.Types.ObjectId,
//                 required:true,
//                 ref:"users",

//                },
//        products:[
//         {
//             productID:{
//                         type : Schema.Types.ObjectId,
//                         required:true,
//                         ref:"products"
//                     },
//             quantity: {

//             type:Number,
//             required:true,
//             min:1,
//             default:1,

//             },

//             price:{
//                 type:Number,
//                 required:true,


//             },

//             title:{
//                 type:String,
//                 required:true,

//             }


//         }
//        ],

//        bill:{
//                 type:Number,
//                 required:true, 
//                 default:0         
//        },


// },
// {
//    timestamps:true 
// }

// )

// module.exports = model ("order", orderSchema)



// ================================================================




const { Schema, model } = require("mongoose")


const orderSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            required: [true, "user is not found"],
            ref: "users",

        },
        products: [
            {
                productID: {
                    type: Schema.Types.ObjectId,
                    required: [true, " productID is not found"],
                    ref: "products"
                },
                quantity: {

                    type: Number,
                    required: [true, "pleace provide quantity"],
                    min: 1,
                    default: 1,
                    

                },

                price: {
                    type: Number,
                    required: [true, "pleace provide price"]
                },

                title: {
                    type: String,
                    required: [true, "title pleace provide price"]

                }


            }
        ],

        bill: {
            type: Number,
            required: true,
            default: 0
        },


    },
    {
        timestamps: true
    }

)

module.exports = model("order", orderSchema)