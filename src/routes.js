const express = require('express')
const { Readable } = require('stream')
const readLine = require('readline')

const client = require('./database/Client')
const multer = require('multer')

const multerConfig = multer()

const router = express.Router()

const Products = [
	{
		code_bar: '',    
		description: '',
		price: Number(''),
		quantity: Number(''),
	}  
]

router.get('/products', async(req, res) => {
	const allDatas = await client.products.findMany()

	return res.json(allDatas)
})

router.post('/products', multerConfig.single('file'), async(req, res) => {
	const { file } = req
	const { buffer } = file

	const readableFile = new Readable()
	readableFile.push(buffer)
	readableFile.push(null)

	const productsLine = readLine.createInterface({
		input: readableFile
	})

	for await(let line of productsLine) {
		const productsLineSplit = line.split(',')
		Products.push({
			code_bar: productsLineSplit[0],
			description: productsLineSplit[1],
			price: Number(productsLineSplit[2]),
			quantity: Number(productsLineSplit[3])
		})
	}

	for await(let{ code_bar, description, price, quantity } of Products) {
		
		await client.products.create({
			data: {
				code_bar,
				description,
				price,
				quantity
			}
		})
	}
	
	return res.json(Products)
})


module.exports = router
