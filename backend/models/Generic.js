let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let schema = new Schema(
    {
        name:{type:String, required:true},
        dosage:{type:String, required:true},
        strength:{type:String, required:true},
        ndaapp:{type:String,required:true},
    }
);
let genericModel = mongoose.model("generics", schema);
module.exports = genericModel