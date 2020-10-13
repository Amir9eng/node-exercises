// express server
const express = require('express')


const app = express()

app.use(express.json())

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
]
app.get('/api/notes/:id' , (req , res ) => {
  const {id} = req.params

  const note = notes.find(note => note.id === parseInt(id))

  if(!note) return res.status(404).send(`Note with id:${id} was not found`)

  res.json(note)

})

app.get('/api/notes/' , (req , res ) => res.json(notes) )

app.post('/api/notes/' , (req, res) =>{

const newNote = req.body
notes = notes.concat(newNote)
res.json(notes)
})

app.patch('/api/notes/:id' , (req , res ) => {
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

