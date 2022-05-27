const express = require("express");
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')


app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/arc-clone')

app.post('/api/register', async (req, res) => {
	console.log(req.body)
	try {
		await User.create({
			name: req.body.nameOne,
			email: req.body.emailOne,
			password: req.body.passwordOne ,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

app.post('/api/login', async (req, res) => {
	const user = await User.findOne({
		email: req.body.emailTwo,
        password:req.body.passwordTwo
	})
    if (user) {
        return res.json({status:'ok',user:true,name:user.name})
    } else {

        return res.json({status:'error',user:false})
    }

})


app.listen(5000, () => {
	console.log('Server started on 5000')
})
