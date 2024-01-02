let express = require("express");
let bodyparser = require("body-parser");
let router = express.Router();
let Cart = require("../models/Cart");


router.post("/getCart", async(req, res)=>{
    try{
        cart = await Cart.findById()
        res.end(JSON.stringify({status:"success", data:cart}));
    }
    catch{
        res.end(JSON.stringify({status:"failed", data:"Something went wrong"}));
    }
});
router.post("/addtoCart", async(req, res)=>{
    try{
        console.log("reached")
        const body = req.body
        console.log(body.data)
        let cart = new Cart();
        cart.email=body.data.email
        cart.cart=body.data.cart
        cart.save().then(result=>{
            res.end(JSON.stringify({status:"success", data:result}));
        }, err=>{
            res.end(JSON.stringify({status:"failed", data:err}));
        })
    }
    catch{
        res.end(JSON.stringify({status:"failed", data:"Something went wrong"}));
    }
});

module.exports = router;
