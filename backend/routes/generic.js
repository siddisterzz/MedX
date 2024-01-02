let express = require("express");
let Generic = require('../models/Generic')

let router = express.Router();

router.post("/sgenmed", async(req, res)=>{
    try{
        let body = req.body;
        let generic = new Generic()
        generic.name=body.data.name
        generic.dosage=body.data.dosage
        generic.strength=body.data.strength
        generic.ndaapp=body.data.ndaapp
        generic.save().then(result=>{
            res.send(JSON.stringify({status:"success", data:result}));
        }, err=>{
            res.end(JSON.stringify({status:"failed", data:err}));
        });
    }
    catch(e){
        res.end(JSON.stringify({status:"failed", data:`Something went wrong ${e}`}));        
    }
});

router.post("/getgenmeds",async(req,res)=>{
    try{
        let meds= await Generic.find()
        res.send(JSON.stringify({status:"success",data:meds}))
    }
    catch(err){
        res.send(JSON.stringify({status:"failed",data:err}))
    }
})

module.exports = router;

