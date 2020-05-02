const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password".')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

//#region Middleware
// setup virtual property to reference tasks for user
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

// methods on instance and individul user
userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisisataskmanager')

    // add token to user
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

// methods on the User model
userSchema.statics.findByCredentials = async (email, password) => {
    const loginErrorMsg = 'Unable to login';
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error(loginErrorMsg)
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error(loginErrorMsg)
    }

    return user;
}

// Hash the plain text password before saving
// Needs to be normal function for the this reference
userSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password')) {
        // second argument is number of rounds to hash
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Delete cascade - delete use tasks when user is removed
userSchema.pre('remove', async function(next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})
//#endregion

const User = mongoose.model('User', userSchema)

module.exports = User