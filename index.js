// express server
const express = require('express')


const app = express()

app.use(express.json())

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
app.get('/api/notes/:id' , (req , res ) => {
  const {id} = req.params

  const note = notes.find(note => note.id === parseInt(id))

  if(!note) return res.status(404).send(`Note with id:${id} was not found`)

  res.json(note)

})

app.get('/api/persons/' , (req , res ) => res.json(people ) )

app.post('/api/persons/' , (req, res) =>{

const newNote = req.body
notes = notes.concat(newNote)
res.json(notes)
})

app.patch('/api/persons/:id' , (req , res ) => {
const {id} = req.params
const noteUpdate = req.body

const note = notes.find(note => note.id === parseInt(id))
notes = notes.map(note => {
  if(note.id === parseInt(id)){
    note = {
      ...note,
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

const PORT =3001
app.listen(PORT)
console.log('App is running on port', PORT)

