let express = require("express");
const bcrypt = require('bcrypt');
let User = require("../models/User");
let Order = require("../models/Order");
let Cart = require("../models/Cart")

let router = express.Router();

router.post("/register", async(req, res)=>{
    try{
        let body = req.body;
        let user = new User();
        console.log(body)
        let users = await User.find({email:body.data.email});        
        if(users.length != 0)
        {
            res.end(JSON.stringify({status:"failed", data:"Email already exist"}));
            return
        }
        users = await User.find({mobileno:body.data.mobileno});
        if(users.length != 0)
        {
            res.end(JSON.stringify({status:"failed", data:"Mobile No already exist"}));
            return
        }
        user.name = body.data.name;
        user.email = body.data.email;
        user.mobileno = body.data.mobileno;
        const hashPassword = await bcrypt.hash(body.data.password,12)
        user.password = hashPassword;

        user.save().then(result=>{
            res.send(JSON.stringify({status:"success", data:result}));
        }, err=>{
            res.end(JSON.stringify({status:"failed", data:err}));
        });
    }
    catch(e){
        res.end(JSON.stringify({status:"failed", data:`Something went wrong ${e}`}));        
    }
});


router.post("/login", async(req, res)=>{
    try{
        let body = req.body;
        let user = await User.findOne({email:body.data.email});
        if(user == null)
        {
            res.end(JSON.stringify({status:"failed", data:"Email doesn't exist"}));
        }
        else{
            const isMatch = await bcrypt.compare(body.data.password, user.password);
            console.log(body.data.password, user.password, isMatch)
            if(isMatch){
                req.session.user=req.body.data.email
                let cart = await Cart.findOne({email:body.data.email})
                let email = body.data.email
                if (cart != null){
                    res.cookie('userData',JSON.stringify({email:email, cart:cart}), { maxAge: 900000,domain: 'localhost', path: '/' });
                }
                else{
                    cart=[]
                    res.cookie('userData',JSON.stringify({email:email, cart:cart}), { maxAge: 900000,domain: 'localhost', path: '/' });
                }
                res.send(JSON.stringify({status:"success", data:"Cookie sent"}));
            }
            else{
                res.end(JSON.stringify({status:"failed", data:"Invalid password"})); 
            }
        }
    }
    catch(e){
        res.end(JSON.stringify({status:"failed", data:`Something went wrong${e}`}));        
    }
});

router.post("/orders", async(req, res)=>{
    try{
        let body = req.body;
        let orders = await Order.find({userid:body.data.userid});
        res.end(JSON.stringify({status:"success", data:orders}));        
    }
    catch{
        res.end(JSON.stringify({status:"failed", data:"Something went wrong"}));        
    }
});

router.post('/logout', (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        res.send(JSON.stringify({status:"failed"}));
      } else {
        console.log('Session destroyed');
        res.send(JSON.stringify({status:"success"}));
      }
   });
});
 
  
  
  
  
  
  

module.exports = router;