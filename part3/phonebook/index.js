const express = require('express')
const app = express()

app.use(express.json())

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
    console.log(pbentry.id, typeof pbentry.id, id, typeof id, pbentry.id === id)
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

  const pbentry = {
    id: Math.floor(Math.random() * 1000000000),
    name: body.name,
    number: body.number,
  }

  phonebook = phonebook.concat(pbentry)

  response.json(pbentry)
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