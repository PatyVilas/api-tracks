const { httpError } = require('../helpers/handleError')
const { encrypt, compare } = require('../helpers/handleBcrypt')
const { tokenSign } = require('../helpers/generateToken')
const userModel = require('../models/users')

//Login!
const loginCtrl = async(req, res) => {
    try {
        const mockUser = {
			name: 'Paty',
			email: 'test@test.com',
			password: '12345678',
			avatar: 'https://cdn5.vectorstock.com/i/1000x1000/43/94/qr-code-inside-computer-and-avatar-head-vector-30434394.jpg',
		};

        const { email, password } = req.body

        if (mockUser.email !== 'test@test.com') {
            res.status(404)
            res.send({ error: 'User not found' })
        }

        const checkPassword = (mockUser.password === password)

        const tokenSession = await tokenSign(mockUser) 

        if (checkPassword) { 
            res.send({
                data: mockUser,
                tokenSession
            })
            return
        }

        if (!checkPassword) {
            res.status(409)
            res.send({
                error: 'Invalid password'
            })
            return
        }

    } catch (e) {
        httpError(res, e)
    }
}

//User registration
const registerCtrl = async(req, res) => {
    try {
        const { email, password, name } = req.body

        const passwordHash = await encrypt(password) 
        const registerUser = await userModel.create({
            email,
            name,
            password: passwordHash
        })
        res.send({ data: registerUser })

    } catch (e) {
        httpError(res, e)
    }
}

module.exports = { loginCtrl, registerCtrl }