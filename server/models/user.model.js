import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
 name:{
    type:String,
    required:true,
 },
 email:{
    type:String,
    required:true,
 },
 password:{
    type:String,
    required:true,
 },
 role:{
    type:String,
    enum:["instructor","student"],//enum is used to define the possible values for a field
    default:"student",
 },
 enrolledCourses:[
    {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Course',
 }
],
photoUrl:{
    type:String,
    default:""
},
},{
    timestamps:true,//time stapm set to true to add createdAt and updatedAt fields
});
export const User = mongoose.model("User",userSchema);