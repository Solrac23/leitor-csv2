const express = require('express')
const router = require('./routes')

const app = express()

app.use(router)
// app.use(express.json())

try{
	app.listen(3333, () => {
		console.log('Server is running!')
	})
}catch(err) {
	console.error(err.message)
}

