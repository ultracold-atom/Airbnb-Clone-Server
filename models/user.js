const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new Schema({
  firstName: String,
  secondName: String,
  gender: String,
  email: {type:String,unique:true,required:true},
  password: {type:String,required:true}, 
})

UserSchema.pre('save',function(next){
  let user = this
  if(this.isModified('password') || this.isNew){
    bcrypt.genSalt(10,(err,salt)=>{
      if(err){
        return next(err)
      }
      bcrypt.hash(user.password,salt,null,(err,hash)=>{
        if(err){return next(err)}
        user.password = hash 
        next()        
      })
    })
  } else{
    return next()
  }
})

UserSchema.methods.comparePassword = function(password,next){
  let user = this;
  return bcrypt.compareSync(password,user.password)
}


module.exports = mongoose.model("User",UserSchema)