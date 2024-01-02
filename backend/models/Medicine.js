let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let schema = new Schema(
    {
        brandname:{type:String, required:true},
        genname:{type:String, required:true},
        brandp:{type:Number, required:true},
        purpose:{type:String,required:true},
        genp:{type:Number, required:true}
    }
);
let medicineModel = mongoose.model("medicine", schema);
module.exports = medicineModel