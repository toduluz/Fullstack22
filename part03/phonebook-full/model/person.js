const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: [true, 'Name of minimum 3 characters is required']
    },
    number: {
        minLength: 8,
        type: String,
        validate: {
            validator: (v) => {
                return /\d{3}-\d{8}/.test(v) || /\d{2}-\d{7}/.test(v)
            },
            message: props => `${props.value} is not a valid phone number`

        },
        required: [true, 'Phone number of minimum 8 characters is required']
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
