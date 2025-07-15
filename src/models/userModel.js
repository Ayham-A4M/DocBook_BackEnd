const { default: mongoose } = require("mongoose");
// for normal user
const userSchema=new mongoose.Schema({
    fullName:{type:String,required: true},
    email:{type:String,unique:true,required: true},
    role:String,
    phoneNumber:{type:String,required: true},
    age:{type:Number,required:true},
    password:{type:String,required: true},
    tokenVersion:{type:Number,default:0} // this for login and logout
    
});
const userModel=mongoose.model('user',userSchema,'users');
module.exports=userModel;