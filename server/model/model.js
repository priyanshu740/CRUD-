import mongoose from "mongoose";
const scheme = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:String,
    status:String
})
const Userdb = mongoose.model('userdb',scheme)
export default Userdb