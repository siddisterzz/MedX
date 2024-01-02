let mongoose = require("mongoose");
let Medicine = require("../models/Medicine");
let Schema = mongoose.Schema;
let schema = new Schema(
    {
        email:{type:String, required:true},
        cart:{type:[Medicine.schema],required:true}
    }
);
let medicineModel = mongoose.model("cart", schema);
module.exports = medicineModel