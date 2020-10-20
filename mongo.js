const {DbUrl} = require('./config')

const mongoose = require('mongoose')
const {Schema , model} = mongoose

console.log(process.argv)
if(process.argv[2])console.log(`you have clicked on ${process.argv[2]}`)

const DB_SETUP = {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: false
}

mongoose.connect(DbUrl , DB_SETUP)

const personSchema = new Schema({
    name:String,

    phoneNumber:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    modifiedAt: {
        type: Date,
        default: Date.now
      },


})

const person = model('Person' , personSchema) //collection = model

const newPerson = new person({
    name: 'Ahmad',
    phoneNumber: '+66736524454'
  })
  newPerson.save()
    .then(result => {
        console.log('we have a new contact!')
        console.log({ newPersonSaved: result })
    })
    .catch(console.log)
    .finally(() => {
        mongoose.connection.close()
    })