

const { getCart,createCart,deleteProduct} = require("../controllers/cartcontroller");
const auth = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/", auth, getCart);
router.post("/", auth, createCart);
router.delete("/:id", auth, deleteProduct);

module.exports = router