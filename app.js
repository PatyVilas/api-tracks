require('dotenv').config()
const epxress = require('express')
const cors = require('cors')
const app = epxress()
const { dbConnect } = require('./config/mongo')

const PORT = process.env.PORT || 3000
app.use(cors())
app.use(epxress.json())
app.use(epxress.static('public'));
app.use('/api/1.0', require('./app/routes'))

app.listen(PORT, () => {
    const time = new Date();
	console.log(`The API is http://localhost:${PORT}/api/1.0`, time);
})