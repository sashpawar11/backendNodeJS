import express from 'express'
import dotenv from 'dotenv'
import mockdata from './MOCK_DATA.json' assert { type: 'json' };
import fs from 'fs'
import mongoose from 'mongoose';


// Express Rest API With MongoDB 

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));

// connect mongodb
const db = mongoose.connect(process.env.MONGO_URL).then(() => console.log("Mongodb Connected")).catch((err) => console.log("Error connecting to mongoose: ", err));


// User schema

const userSchema = new mongoose.Schema({

    firstName : {
        type: String,
        required : true
    },
    lastName : {
        type: String
    },
    email : {
        type: String,
        required: true,
        unique: true
    }
},{timestamps: true})

const Users = new mongoose.model("user", userSchema);

app.get('/', (req, res) => {
    return res.send('Homepage called!')
})

// query params
app.get('/contact', (req, res) => {
   return res.send(`Hello there : ${req.query.name}`)
})

// API: GET list users
app.get('/api/users',async (req, res) => {

    const allUsers = await Users.find({});
    console.log("GET: Users:  ",allUsers)
    return res.json(allUsers);
})


// API: GET user with ID
app.route('/api/users/:userid').get((req, res) => {
    const id = req.params.userid
    const findUser = mockdata.find(item => item.id === Number(id));
    return res.json(findUser);
}).patch( async (req, res) => {
    //edit route
    const id = req.params.userid
    const body = req.body;

    const findUser = await Users.findByIdAndUpdate(id,body)

    if(findUser){
        res.status(200).json({ success: true})
    }
    else{
        res.status(400).json({error: true})
    }
    // id - > edit
    // body,
}).delete( async (req, res) => {
    //delete route
    const id = req.params.userid

    const findUser = await Users.findByIdAndDelete(id)

    if(findUser){
        res.status(200).json({ success: true})
    }
    else{
        res.status(400).json({error: true})
    }
})

// POST: Create user
app.post('/api/users', async (req, res) => {


    const body = req.body;

    if(!body.email || !body.firstName || !body.lastName ){
        return res.json({error: "All fields are required" });
    }

    const newUser = await Users.create(body).then(() => res.json({success: "true"})).catch((err) => console.log("Error creating user: ", err))
})






// HTML: GET list users
app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${mockdata.map((item) => 
            `<li>ID: ${item.id}</li>
            <li>First Name: ${item.first_name}</li>
            <li>Email: ${item.email}</li>
            <li>Gender: ${item.gender}</li>
            <li>IP Address: ${item.ip_address}</li><br>`
        ).join("")}
    </ul>
    `
    return res.send(html)
})
 

app.listen(port, () => {
    console.log("Server started and listening to port : ", port)
})
