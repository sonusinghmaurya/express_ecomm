


const {getOrders,createOrder,deleteOrder } = require("../controllers/orderController");
const auth = require("../middlewares/authMiddleware");
// const { checkout } = require("./cartRouters");

const router = require("express").Router();

router.get("/", auth, getOrders);
router.post("/checkout", auth, createOrder); 
// router.delete("/", auth,deleteOrder);

module.exports = router