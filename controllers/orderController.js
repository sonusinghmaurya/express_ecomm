const Order = require("../models/products/Order");
const Cart = require("../models/products/Cart");
const asyncErrorHandler = require("../utils/asyncErrorHandler")


const getOrders = asyncErrorHandler(  async (req, res, next) => {
    // try {
        let owner = req.user._id;
        // console.log(owner);
        let orders = await Order.find({ owner });
        res.status(200).json({
            status: "success",
            data: {
                orders,
            }
        })
    // } catch (error) {
    //     res.status(400).json({
    //         status: "bad request",
    //         message: error.message
    //     })
    // }

    
})




const createOrder = asyncErrorHandler(async (req, res, next) => {
    // try {
        let owner = req.user._id;
        // console.log(owner);

        let cart = await Cart.findOne({owner});

        // console.log(cart);

        if (cart) {
           
            const newOrder = await Order.create({
                owner: owner,
                products: cart.products,
                bill: cart.bill
            });
            await Cart.findByIdAndDelete(cart._id);
            res.status(200).json({
                status: 'success',
                message: 'order placed successfully',
                data: {
                    newOrder
                }
            })
        } else {
            res.status(400).json({
                status: "fail",
                message: 'there are no products in the cart '
            })
        }
    // } catch (error) {
    //     res.status(400).json({
    //         status: "bad request",
    //         message: error.message
    //     })
    // }
})



// const deleteOrder = async (req, res) => {

//     let owner = req.user._id;
//     // console.log(owner);

//     // let cart = await Cart.findOne({owner});

//     try {
//         let cart  = owner.params.productId;
//         // await Products.findByIdAndDelete(id);
//         await Products.findByIdAndDelete({owner});
//         res.status(200).json({
//             status: "success",
//         })

//     } catch (error) {
//         res.status(400).json({
//             status: "bad request",
//             message: error.message
//         })
//     }
// }

// const  deleteOrder = async (req, res) => {
//     try {
//         let owner = req.user._id;
//         // console.log(owner);
//         let orders = await Order.findByIdAndDelete({ owner });
//         res.status(200).json({
//             status: "success",
//             data: {
//                 orders,
//             }
//         })
//     } catch (error) {
//         res.status(400).json({
//             status: "bad request",
//             message: error.message
//         })
//     }
// }




module.exports = {
    getOrders,
    createOrder,
    // deleteOrder
   
  }