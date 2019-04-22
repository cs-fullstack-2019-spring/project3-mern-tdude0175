var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var BleaterSchema = new Schema
(
    {
        username:{ type:String, required:true, max:100},
        password:{ type:String, required:true, max:100},
        bleat:[
            {
                private:{type:Boolean, defaultValue: false},
                message:{type:String},
                created:{type:Date, default: Date.now()},
            }],
        profilePicture: {type:String},
        backgroundImage:{type: String}
    }
);

module.exports = mongoose.model("bleater",BleaterSchema);