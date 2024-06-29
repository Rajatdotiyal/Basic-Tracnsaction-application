const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect("mongodb+srv://rajat:unEdZoU9x65BAxCG@rajatdotiyal.bnwq0ed.mongodb.net/paytmApp");

const userSchema = new Schema({
    firstName : {
        type : String,
        required : true,
        trim  :true,
        maxLength : 30,
    },
    lastName : {
        type : String,
        required  :true,
        trim : true,
        maxLength : 30,
    },
    password : {
        type : String,
        minLength : 6,
        required  :true,
        
    },
    username : {
        type : String ,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        minLength : 3,
        maxLength : 30
    },
})


const accountSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    balance : {
        type : Number,
        required : true,
    }
    
})

const Account = mongoose.model('Account', accountSchema);

const User = mongoose.model('User',userSchema);

module.exports = {User , Account};