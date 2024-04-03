
const {Schema, model} = require("mongoose")

const cartSchema = new Schema(
    {
        owner:{
                type:Schema.Types.ObjectId,
                required:[true," productID is not found"],
                ref:"users",

               },
       products:[
        {
            productID:{
                        type : Schema.Types.ObjectId,
                        required:[true," productID is not found"],
                        ref:"products"
                    },
            quantity: {

            type:Number,
            required:[true, "pleace provide quantity"],
            min:1,
            default:1,

            },

            price:{
                type:Number,
                required:[true,"pleace provide price"],



            },
            
            title:{
                type:String,
                required:[true,"title pleace provide price"],


            }
            

        }
       ],

       bill:{
                type:Number,
                required:true,          
       },


},
{
   timestamps:true 
}

)

module.exports = model ("cart", cartSchema)