

const {signup} = require("../controllers/userControllers")
const {login} = require("../controllers/userControllers")
const {forgotPassword} = require("../controllers/userControllers")
const {resetPassword} = require("../controllers/userControllers")

const router = require("express").Router()
router.post("/signup",signup)
router.post("/login",login)
router.post("/forgotPassword" ,forgotPassword )
router.patch("/resetPassword:token" ,resetPassword )

module.exports=router;





