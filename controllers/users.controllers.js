import {Users} from '../models/users.models.js'

async function handleGetAllUsers(req,res){
    const allUsers = await Users.find({});
    console.log("GET: Users:  ",allUsers)
    return res.json(allUsers);
}

async function handleGetUserById(req,res){
    const id = req.params.userid
    const findUser = mockdata.find(item => item.id === Number(id));
    return res.json(findUser);
}

async function handleUpdateUserById(req,res){
    const id = req.params.userid
    const body = req.body;

    const findUser = await Users.findByIdAndUpdate(id,body)

    if(findUser){
        res.status(200).json({ success: true})
    }
    else{
        res.status(400).json({error: true})
    }
}

async function handleDeleteUserById(req,res){
    const id = req.params.userid

    const findUser = await Users.findByIdAndDelete(id)

    if(findUser){
        res.status(200).json({ success: true})
    }
    else{
        res.status(400).json({error: true})
    }
}

async function handleCreateUser(req,res){
    
    const body = req.body;

    if(!body.email || !body.firstName || !body.lastName ){
        return res.json({error: "All fields are required" });
    }

    const newUser = await Users.create(body).then(() => {return res.json({success: "true"})}).catch((err) => console.log("Error creating user: ", err))
}

export { handleCreateUser,handleDeleteUserById,handleGetAllUsers,handleGetUserById,handleUpdateUserById}