import express from 'express'
import dotenv from 'dotenv'
import mockdata from './MOCK_DATA.json' assert { type: 'json' };
import fs from 'fs'


dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    return res.send('Homepage called!')
})

// query params
app.get('/contact', (req, res) => {
   return res.send(`Hello there : ${req.query.name}`)
})

// API: GET list users
app.get('/api/users', (req, res) => {
    return res.json(mockdata);
})


// API: GET user with ID
app.route('/api/users/:userid').get((req, res) => {
    const id = req.params.userid
    const findUser = mockdata.find(item => item.id === Number(id));
    return res.json(findUser);
}).patch((req, res) => {
    //edit route
    const id = req.params.userid
    const body = req.body;

    const userIdx = mockdata.findIndex(item => item.id === Number(id));
    

    console.log(mockdata[userIdx]);
    console.log(req.body);

    mockdata[userIdx] = {
        ...mockdata[userIdx],
        ...body
    }


    fs.writeFile('./MOCK_DATA.json', JSON.stringify(mockdata), (err, data) => {
        return res.json({ success: true, userid : id})
    })
    // id - > edit
    // body,
}).delete((req, res) => {
    //delete route
    const id = req.params.userid
    const userIdx = mockdata.findIndex(item => item.id === Number(id));

    mockdata.splice(userIdx, 1);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(mockdata), (err, data) => {
        return res.json({ success: true, userid : id})
    })
})

// POST: Create user
app.post('/api/users', (req, res) => {

    const body = req.body;

    console.log(mockdata.length);

    const newid = mockdata.length + 1;

    const newUser = { newid, ...req.body };
    mockdata.push(newUser);


    fs.writeFile('./MOCK_DATA.json', JSON.stringify(mockdata), (err, data) => {
         
            console.log(mockdata.length);
            return res.json({ success: true, userid : mockdata.length})
    })

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
