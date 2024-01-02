let express = require("express");
let bodyparser = require("body-parser");
let Order = require("../models/Order");
let User = require("../models/User")

let router = express.Router();

router.post("/place", async(req, res)=>{
    try{
        let body = req.body;
        let order = new Order();
        console.log(body)
        let user = await User.findOne({email:body.data.email})
        order.name = user.name
        order.email = body.data.email;
        order.orderdate = new Date();
        order.status = body.data.status;
        order.medicines = body.data.medicines;
        order.save().then(result=>{
            res.end(JSON.stringify({status:"success", data:result}));
        }, err=>{
            res.end(JSON.stringify({status:"failed", data:err}));
        });
    }
    catch(err){
        res.end(JSON.stringify({status:"failed", data:`Something went wrong ${err}`}));
    }
});
router.post("/getOrders", async(req,res)=>{
    try{
        let body = req.body;
        let allOrders = await Order.find({email:body.data.email});
        res.send(JSON.stringify({status:"Success",data:allOrders}))
    }
    catch{
        res.end(JSON.stringify({status:"failed", data:"Something went wrong"}));
    }
})
module.exports = router;