const router = require('express').Router();
const { createProducts, getAllProducts, getProducById, deleteProduct } = require('../controllers/productControllers');
const auth = require('../middlewares/authMiddleware');
const {verifyRole}=require("../controllers/userControllers")

router.post('/addproducts',auth ,createProducts);
router.get('/',auth,verifyRole(["user", "merchant", "admin", "random person"]) ,getAllProducts);
router.get('/:productId', auth, getProducById);
router.delete('/:productId', auth,deleteProduct)

module.exports = router;