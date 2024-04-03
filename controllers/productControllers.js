const Products = require('../models/products/products');

// const CustomError = require("../utils/CustomError")

const asyncErrorHandler = require("../utils/asyncErrorHandler")

// const asyncErrorHandler=(func)=>{
//     return (req, res, next)=>{

//         func(req, res, next).catch(err=>next(err))
//     }
// }



const createProducts =asyncErrorHandler( async (req, res,) => {
    // try {
        let newProducts = await Products.create(req.body)
        // console.log("Hi")
        res.status(200).json({
            status: 'success',
            products: newProducts
        })
    // }
    //  catch (error) 
    //  {
    //     res.status(400).json({
    //         status: 'bad request',
    //         message: error.message
    //     })
    // }
})





const getAllProducts =asyncErrorHandler( async (req, res,next) => {
    // try {
        const search = req.query.search || "";
        console.log(search);
        let page = req.query.page * 1 || 1;
        let limit = req.query.limit * 1 || 5;
        let skip = (page - 1) * limit;
        let sort =req.query.sort || "rating"

        let category = req.query.category || "All"

        const categoryArr = [
            "smartphones", "laptops", "fragrances", "skincare", "groceries", "home-decoration", "furniture", "tops", "womens-dresses", "womens-shoes", "mens-shirts", "mens-shoes", "mens-watches", "womens-watches", "womens-bags", "womens-jewellery", "sunglasses", "automotive", "motorcycle", "lighting"
     
        ]

        category === "All" ? (category = [...categoryArr]) : (category = req.query.category.split(","));

        // sorting
        req.query.sort ? (sort=req.query.sort.split(",")):(sort=[sort]);
        let sortBy=","
        console.log(sortBy);

        if(sort.length>0)
        {
            sortBy=sort.join("");
        }
        else{
            sortBy=sort;
        }

        let products = await Products.find({ title: { $regex: search, $options: "i" } })
            .where("category")
            .in([...category])
            // .in([...categoryArr])
            .skip(skip)
            .limit(limit)
            .sort(sortBy)

        let total = await Products.countDocuments();

        res.status(200).json({
            status: "success",
            count: products.length,
            total,
            page,
            limit,
            sort,
            // categoryArr,
            data: {
                products
            }
        })
    // } 

    // catch (error) {
    //     res.status(400).json({
    //         status: "bad request",
    //         message: error.message
    //     })
    // }
})

// ===========================================================

// const getAllProducts = asyncErrorHandler(async (req, res, next) => {
//     const search = req.query.search || "";
//     const page = req.query.page * 1 || 1  ;
//     const limit = req.query.limit * 1 || 5;
//     let category = req.query.category || "All";
//     let sort = req.query.sort || "rating";
//     const categoryArr = [
//       "smartphones",
//       "laptops",
//       "fragrances",
//       "skincare",
//       "groceries",
//       "home-decoration",
//       "furniture",
//       "tops",
//       "womens-dresses",
//       "womens-shoes",
//       "mens-shirts",
//       "mens-shoes",
//       "mens-watches",
//       "womens-watches",
//       "womens-bags",
//       "womens-jewellery",
//       "sunglasses",
//       "automotive",
//       "motorcycle",
//       "lighting",
//     ];
//     //pagination
//     const skip = (page - 1) * limit;

//     //based on category
//     category === "All"
//       ? (category = [...categoryArr])
//       : (category = req.query.category.split(","));

//     //sorting ["price","rating"]  price rating
//     req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
//     let sortBy = "";
//     if (sort.length > 0) {
//       sortBy = sort.join(" ");
//       console.log(sortBy);
//     } else {
//       sortBy = sort;
//     }

//     const products = await Product.find({
//       title: { $regex: search, $options: "i" },
//     })
//       .where("category")
//       .in([...category])
//       .skip(skip)
//       .limit(limit)
//       .sort(sortBy);
//     const total = await Product.countDocuments();
//     res.status(201).json({
//       status: "success",
//       count: products.length,
//       category,
//       total,
//       page,
//       limit,
//       data: {
//         products: products,
//       },
//     });
// });







// ===============================================================

const getProducById =asyncErrorHandler( async (req, res, next) => {
    // try {
        let id = req.params.productId
        let product = await Products.findById(id);
        console.log(product);
        res.status(200).json({
            status: "success",
            data: product
        })
    // } 
    // catch (error) {
    //     res.status(400).json({
    //         status: "bad request",
    //         message: error.message
    //     })
    // }
})

const deleteProduct =asyncErrorHandler( async (req, res,next) => {
    // try {
        let id = req.params.productId;
        await Products.findByIdAndDelete(id);
        res.status(200).json({
            status: "success",
        })
    // } catch (error) {
    //     res.status(400).json({
    //         status: "bad request",
    //         message: error.message
    //     })
    // }

    
})

module.exports = { createProducts, getAllProducts, getProducById, deleteProduct }




// ========================================================================









// http://localhost:5000/app/v1/ecommerce/products?page=3&imit=5

// http://localhost:5000/app/v1/ecommerce/products?category=furniture&laptops



// http://localhost:5000/app/v1/ecommerce/products?category=furniture&laptops


// http://localhost:5000/app/v1/ecommerce/products?category=laptops,smartphones


// ====================

// http://localhost:5000/app/v1/ecommerce/products?limit=20&category=fragrances,laptops
// http://localhost:5000/app/v1/ecommerce/products?limit=20&category=fragrances,laptops


// http://localhost:5000/app/v1/ecommerce/products??sort=-price,rating


// http://localhost:5000/app/v1/ecommerce/products?sort=rating,price



// ================today friday======

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
//             "password": "Hemanth@#1998",
//             "confirmPassword": "Hemanth@#1998",
//             "_id": "6539fcf7ae8b7681fbfc326a",
//             "createdAt": "2023-10-26T05:45:27.618Z",
//             "updatedAt": "2023-10-26T05:45:27.618Z",
//             "__v": 0
//         }
//     }
// }






// http://localhost:5000/app/v1/users/login

// {
//     "status": "success",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1M2YzMzE5OTM2M2Y2MGQ5NTNhMWMzMSIsImlhdCI6MTY5ODY0MTUyNH0.AWarkn5CuYHdyBZtV1XbXThgj8T6DjiVKpXpawrMcfk",
//     "data": {
//       "user": {
//         "_id": "653f33199363f60d953a1c31",
//         "email": "hemanthkumarkv125@gmail.com",
//         "role": "user",
//         "password": "$2a$10$RJyBJt6BNZ1ZGtgOGW1o1eaBwtsU.9oQih0bbzi4IsAM72crphY/i",
//         "createdAt": "2023-10-30T04:37:45.802Z",
//         "updatedAt": "2023-10-30T04:37:45.802Z",
//         "__v": 0
//       }
//     }
//   }






// {
//     _id: new ObjectId("653f4297914d2ee121d24aef"),
//     email: 'hemanthkumarkv125@gmail.com',
//     role: 'user',
//     password: '$2a$10$7DiWY4/kx48ysrkNj1bkiO9L7b/OGj5dA.Ik2Vi53MnKOXbN3c.5i',
//     createdAt: 2023-10-30T05:43:51.619Z,
//     updatedAt: 2023-10-30T05:43:51.619Z,
//     __v: 0
//   }
  