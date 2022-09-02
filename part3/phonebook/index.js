const express = require('express')
const app = express()
const cors = require('cors')


app.use(express.json())

var morgan = require('morgan')

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

app.use(cors())

let phonebook = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  //console.log(`GET All phonebook entries`)
  response.json(phonebook)
})


app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  //console.log(id)
  const pbentry = phonebook.find(pbentry => {
    //console.log(pbentry.id, typeof pbentry.id, id, typeof id, pbentry.id === id)
    return pbentry.id === id
  })

  console.log(pbentry)
  if (pbentry) {
    response.json(pbentry)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  phonebook = phonebook.filter(pbentry => pbentry.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number is missing' 
    })
  }

  const pbentry2 = phonebook.find(pbentry => {
    //console.log(pbentry.name) 
    return pbentry.name === body.name
  })

  if(pbentry2 === undefined) {
    //console.log('not found')

    const pbentry = {
      id: Math.floor(Math.random() * 1000000000),
      name: body.name,
      number: body.number,
    }
    phonebook = phonebook.concat(pbentry)
    response.json(pbentry)
  }
  else {
    //console.log(pbentry2)
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  //console.log(pbentry)
  //console.log(request.headers)
})

app.get('/info', (request, response) => {
  //console.log(`Get number of phonebook entries`)
  const stringtoreturn = `Phonebook has info for `+ phonebook.length + ` people <BR/><BR/> ${Date()}`
  response.send(stringtoreturn)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

