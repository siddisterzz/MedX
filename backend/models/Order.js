let mongoose = require("mongoose");
let Medicine = require("../models/Medicine");

let Schema = mongoose.Schema;
let schema = new Schema(
    {
        status:{type:String,required:true},
        name:{type:String,required:true},
        email:{type:String, required:true},
        orderdate:{type:Date, required:true},
        medicines:{type:[Medicine.schema],required:true}
    }
);
let Order = mongoose.model("orders", schema);
module.exports = Order;