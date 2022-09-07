require('dotenv').config()  // For getting enviroment variables out of .env - only localhost - these settings are in Fly.io secrets because you do not want .env with passwords on the FLyo server
const express = require('express') // Express is a node js web application framework that provides broad features for building web and mobile applications.
const cors = require('cors') // Cross-origin resource sharing (CORS) allows AJAX requests to skip the Same-origin policy and access resources from remote hosts.
const mongoose = require('mongoose') // Object Data Modeling (ODM) library for accessing Mongo databases in a more easy way then built in Mongo(in NodeJS, I think) functionality
var morgan = require('morgan') // Library for showing information on contents of requests??? i'm not sure about my wording here :D
const Person = require('./models/person') // Import my js code connecting for to Mongo and the Person schema model

const app = express()
app.use(express.json())
app.use(express.static('build'))
app.use(cors())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :jsonbody'))

morgan.token('jsonbody', function getBody (request) {
  //console.log(request.method)
  if (request.method === 'POST') {
    return JSON.stringify(request.body)
  }
  else {
    //console.log("niet POST")
    return ' '
  }
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    console.log(persons.length)
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.deleteOne({_id: request.params.id}).then(person => {
    response.json(person)
  })  
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: 'name and/or number is missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
