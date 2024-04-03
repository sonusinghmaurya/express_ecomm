

const Cart = require("../models/products/Cart");
const Product = require("../models/products/products");
const asyncErrorHandler = require("../utils/asyncErrorHandler")

const getCart = asyncErrorHandler( async (req, res, next) => {
  // try {
    let owner = req.user._id;
    const cart = await Cart.findOne({ owner: owner });
    // console.log(owner);
    if (cart && cart.products.length > 0) 
    {
      res.status(200).json({
        status: "success",
        data: {
          cart,
        },
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "there is no products found in cart",
      });
    }
  // }
  // catch (error) {
  //   res.status(400).json({
  //     status: "fail",
  //     message: error.message,
  //   });
  // }
});



const createCart = asyncErrorHandler( async (req, res, next) =>
 {
  const owner = req.user._id;
  // console.log(owner);
  const { productID, quantity } = req.body;
  // console.log(productID,quantity);
  
 
  // try {
    const cart = await Cart.findOne({ owner: owner });
    // console.log(cart);

    const product = await Product.findById(productID);
    // console.log(product);
    if (!product) {
      // return res.status(404).json({
      //   status: "fail",
      //   message: "there is no product with this id",
      // });

      let err = new CustomError(400, "there is no product with this id")
      next(err)
    }

    let title = product.title;
    let price = product.price;
    // console.log(title,price);

    if (cart) {
      const productIndex = cart.products.findIndex(
        (product) => product.productID === productID
      );
        // console.log(productID);

      if (productIndex > -1) {
        let product = cart.products[productIndex]
        // console.log(product);

        product.quantity += quantity;
        cart.bill = cart.products.reduce((acc, curr) => {
          // return acc += curr.price * curr.quantity
          return acc +curr.price * curr.quantity
          // return acc.price * curr.quantity
        }, 0)


        cart.products[productIndex] = product

        await cart.save()
        res.status(200).json(
          {
            status: "success",
            data: {
              cart
            }
          }
        )
      } else {

        cart.products.push({ productID, title, price, quantity });
        cart.bill = cart.products.reduce((acc, curr) => {
          // return acc += curr.price * curr.quantity
          return acc + curr.price * curr.quantity
        }, 0)

        await cart.save()
        res.status(200).json(
          {
            status: "success",
            data: {
              cart
            }
          }
        )

      }
    } else {
      const newCart = await Cart.create({
        owner: owner,
        products: [
          {
            productID,
            title,
            quantity,
            price,
          },
        ],
        bill: quantity * price,
      });

      res.status(200).json({
        status: "success",
        // message: error.message,
        data: {
           newCart
           }
      });

    }
  // }
  // catch (error) {
  //   res.status(400).json({
  //     status: "fail",
  //     message: error.message,
  //   });
  // }

})





const deleteProduct = asyncErrorHandler( async (req, res, next) => {
  // try {
      const owner = req.user._id;
      // console.log(owner);
      const productId = req.query.productId;
      // console.log(productId);
      const cart = await Cart.findOne({ owner: owner });
      // console.log("cart", cart);
      if (cart) {
          const productIndex = cart.products.findIndex((product) => product.productId == productId)
          // console.log(product.productId);
          // console.log(productId););
          // console.log(productIndex);

          if (productIndex > -1) {
              let product = cart.products[productIndex];
              // console.log(product);
              cart.bill -= product.price * product.quantity;
              if (cart.bill < 0) {
                  cart.bill = 0;
              };
              cart.products.splice(productIndex, 1);
              cart.bill = cart.products.reduce((acc, curr) => {
                  return acc += curr.price * curr.quantity;
              }, 0)
              await cart.save();
              res.status(200).json({
                  status: 'success',
                  data: cart
              })
          } else {
              res.status(200).json({
                  status: 'success',
                  message: 'there is no product with the id'
              })
          }
      } else {
          res.status(200).json({
              status: 'success',
              message: 'ther are no products in cart'
          })
      }
  // } catch (error) {
  //     res.status(400).json({
  //         status: 'bad request',
  //         message: error.message
  //     })
  // }
})



module.exports = {
  getCart,
  createCart,
  deleteProduct
}

// ===============================================================================




























// http://localhost:5000/app/v1/cart?productID=653212f868f08877ed80c1c2