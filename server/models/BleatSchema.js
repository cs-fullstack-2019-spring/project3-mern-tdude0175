var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var BleaterSchema = new Schema
(
    {
        username:{ type:String, required:true, max:100},
        password:{ type:String, required:true, max:100},
        bleat:[
            {
                type:String,
                created:Date,
            }]
    }
);

module.exports = mongoose.model("bleater",BleaterSchema);