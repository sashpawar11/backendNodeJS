import express from 'express'
import dotenv from 'dotenv'
import {connectMongo} from './utils/db.utils.js'
import userRouter from './routes/users.routes.js'

// Express Rest API With MongoDB 

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));

// connect mongodb
connectMongo();


// API: GET list users
app.use('/api/users', userRouter)


 

app.listen(port, () => {
    console.log("Server started and listening to port : ", port)
})
