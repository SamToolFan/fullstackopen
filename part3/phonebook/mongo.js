const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide at least the password as an argument: node mongo.js <password>')
  process.exit(1)
}
else if (process.argv.length === 3) {
  console.log('Show the phonebook contents')
}
else if (process.argv.length === 5) {
  console.log('Addition to the phonebook')
}
else{
  console.log('Not the right number of parameters provided')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://samtoolfan:${password}@cluster0.s9de4bw.mongodb.net/personApp?retryWrites=true&w=majority`
// original url => mongodb+srv://notes-app-full:${password}@cluster1.lvvbt.mongodb.net/?retryWrites=true&w=majority

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')
   
    if (process.argv.length === 5) {
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
      })

      person.save().then(result => {
        console.log(`Added '${process.argv[3]}' with phonenumber '${process.argv[4]}' to phonebook`)
        //console.log(result)
        mongoose.connection.close()
      })
    }
    else {
      Person.find({}).then(result => {
        console.log('Phonebook')
        result.forEach(person => {
          console.log(person.name+' '+person.number)
        })
        mongoose.connection.close()
      })
    }
  })
  .catch((err) => console.log(err))



