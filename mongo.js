const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

console.log(name, number)

const url =
    `mongodb+srv://uipathtestitili:${password}@cluster1.fo89s22.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)


const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: name,
    number: number
})

if (person.name !== undefined || person.number !== undefined) {
    person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })
} else {
    console.log('Phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}
