var express = require('express');
var router = express.Router();
var cors = require('cors')
var bodyparser = require('body-parser')
var createUser = require('./users');


const server = express();

// Cors middleware ka use karo
server.use(cors())
server.use(express.json())
// Body parser ka use karo
server.use(bodyparser.json())

server.delete('/delete/:id', async (req, res) => {
const del = await createUser.findByIdAndDelete(req.params.id)
  res.status(200).json(del)
})
server.get('/update/:id', async (req, res) => {
  try {

    const id = await createUser.findById(req.params.id)
    res.status(200).json(id)
  } catch (error) {
    res.status(400).json({ Error: error })

  }
})
server.put('/updateUser/:id', async (req, res) => {

  try {
    const up = await createUser.findByIdAndUpdate(
      req.params.id,
      req.body, { new: true }
      )
      res.status(200).json(up)
  } catch (error) {
    console.log(error)
  }


})
server.post('/DataServerKoBhejo', async function (req, res) {
  // Naya user object create karo
  let userdata = new createUser()

  // Request se data nikalo aur user object mein set karo
  userdata.name = req.body.name
  userdata.email = req.body.email
  userdata.age = req.body.age

  // User object ko save karo
  const doc = await userdata.save()
  console.log("database me save hone vala data=> " + doc)
})
server.get("/DataFrontKoBhejo", async (req, res) => {
  const docs = await createUser.find({})
  // Response bhejo
  res.json(docs);
})
server.listen(8080, () => {
  console.log("server sun raha hai.")
})



router.get('/', function (req, res, next) {
  res.send("hello node");
});

module.exports = router;
