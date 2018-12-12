var mongoose =  require('mongoose');
mongoose.connect("mongodb://localhost:27017/flat",(err)=>{
    if(!err)
    console.log("success");
    else
    console.log("err :"+JSON.stringify(err,undefined,2))
});

const Schema = mongoose.Schema;
var newSchema = Schema({
    name : String,
    address: String,
    phone_no : Number,
    room_no : Number,
    amount : Number
});

var customerdata = mongoose.model('customer',newSchema);
 
module.exports = customerdata;









