let express = require("express");
let bodyparser = require("body-parser");
let Medicine = require("../models/Medicine");
let fs = require("fs");

let router = express.Router();

router.post("/save", async(req, res)=>{
    try{
        let body = req.body;
        let medicine = new Medicine();
        if(body.data.id != ""){
            medicine = await Medicine.findById(body.data.id);
        }
        medicine.brandname = body.data.brandname;
        medicine.genname = body.data.genname;
        medicine.brandp= body.data.brandp;
        medicine.genp= body.data.genp;
        medicine.purpose=body.data.purpose;
        medicine.save().then(result=>{
            res.end(JSON.stringify({status:"success", data:result}));
        }, err=>{
            res.end(JSON.stringify({status:"failed", data:err}));
        })
    }
    catch(e){
        res.end(JSON.stringify({status:"failed", data:`${e}`}));
    }
});

router.post("/list", async(req, res)=>{
    try{
        let medicine = await Medicine.find();
        res.end(JSON.stringify({status:"success", data:medicine}));
    }
    catch{
        res.end(JSON.stringify({status:"failed", data:"Something went wrong"}));
    }
});

router.post("/get", async(req, res)=>{
    try{
        let body = req.body;
        let medicine = await Medicine.findById(body.data.id);
        res.end(JSON.stringify({status:"success", data:medicine}));
    }
    catch{
        res.end(JSON.stringify({status:"failed", data:"Something went wrong"}));
    }
});

router.post("/delete", async(req, res)=>{
    try{
        let body = req.body;
        await Medicine.findByIdAndDelete(body.data.id);
        res.end(JSON.stringify({status:"success"}));
    }
    catch{
        res.end(JSON.stringify({status:"failed", data:"Something went wrong"}));
    }
});

module.exports = router;