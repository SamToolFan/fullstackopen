const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB - persons collection')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB - persons collection:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})
  
personSchema.set('toJSON', {   // Rewrite the json returnedObject so the object _id is turned into a id string and two objects _id and _v are removed - apparently not interesting
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  module.exports = mongoose.model('Person', personSchema)