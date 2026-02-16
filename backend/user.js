const mongoose = require('mongoose')
const {Schema} = mongoose;

const userSchema= new Schema({
    name: String,
    email: String,
    location:{type: String, required:true},
    password:String
})

module.exports= mongoose.model('user', userSchema)