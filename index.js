// express server
const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.disable('x-powered-by')
app.use(cors())

require('dotenv').config()

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]
const generateId = () => persons.length > 0 ? Math.max(...persons.map(person => person.id)) + 1: 1

app.get('/' , (req , res) => {

  res.send('hello world :smile: ')
  
  })

app.get('/api/persons/:id', (req, res) => {
  const { id } = req.params
  const person = persons.find(person => person.id === parseInt(id))
  if (!person) return res.status(404).send(`person with id:${id} was not found`)
  res.json(person)
})

app.get('/info/', (req, res) => {
  let numberOfPerson = persons.length
  res.send(`Phonebook has info for ${numberOfPerson} people <br /> ${new Date()}`)
})

app.get('/api/persons/', (req, res) => res.json(persons))

app.post('/api/persons/', (req, res) => {

  const newNote = req.body
  persons= persons.concat(newNote)
  res.json(persons)
})

app.patch('/api/persons/:id', (req, res) => {
  const { id } = req.params
  const noteUpdate = req.body

  const note = persons.find(note => note.id === parseInt(id))
  notes = persons.map(note => {
    if (note.id === parseInt(id)) {
      note = {
        ...persons,
        ...noteUpdate
      }
    }
    return note
  })

  res.status(200).json({
    ...note,
    ...noteUpdate
  })

})
app.delete('/api/persons/:id', (req, res)=> {
  const {id} = req.params
  persons = persons.filter(person => person.id !== parseInt(id))
  res.json(persons)
})

app.post('/api/persons/', (req, res) => {
  const newPerson = req.body
  if (!newPerson.name || !newPerson.number ) return res.status(400).send(`Name or Number is missing`)
  if(persons.map(person => person.name === newPerson.name)) return res.status(409).send(`Name must be unique`)
  newPerson.id = generateId()
  persons = persons.concat(newPerson)
  res.json(persons)
})


const PORT = process.env.PORT
app.listen(PORT)
console.log('App is running on port', PORT)


