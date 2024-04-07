const mongoose = require('mongoose')

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/mern_todo');
  console.log("db is ok")
}


 

const userSchema = new mongoose.Schema({
 name: String,
  email: String,
  age:Number
});



// User model create karo
module.exports = mongoose.model('user', userSchema);
