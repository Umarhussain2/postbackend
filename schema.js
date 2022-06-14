const mongoose=require('mongoose')
var firstschema= new mongoose.Schema(
    {
        name:{type:String,unique:true},
        price:{type:Number},
        image:{type:String}
    },
   
    {
        collection:"theecode"
    }
    

);
module.exports=mongoose.model('firstmodel',firstschema)