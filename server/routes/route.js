import express from 'express'
import axios from 'axios'
import {create,del,update,find} from '../controller/controller.js'
const route = express.Router()

route.get('/',(req,res)=>{
    //making a get req to /api/users
    axios.get("http://localhost:3000/api/users")
        .then(function(responce){
            console.log(responce);
            res.render('index',{users:responce.data})
        }).catch(error => {
            res.send(error)
        })
})
route.get('/add_user',(req,res)=>{
    res.render('add_user')
})

route.get('/update',(req,res)=>{
    axios.get("http://localhost:3000/api/users",{params:{id:req.query.id}})
    .then((userdata) => {
        res.render("update",{user:userdata.data})
    }).catch(error => {
       res.send(error)
    })
})

//controller 
route.post('/api/users',create)
route.put('/api/users/:id',update)
route.delete('/api/users/:id',del)
route.get('/api/users',find)

export default route

