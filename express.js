import express from 'express'
import dotenv from 'dotenv'

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();


app.get('/', (req, res) => {
    return res.send('Homepage called!')
})

// query params
app.get('/contact', (req, res) => {
   return res.send(`Hello there : ${req.query.name}`)
})
app.listen(port, () => {
    console.log("Server started and listening to port : ", port)
})
