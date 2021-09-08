import { query } from "express";
import Userdb from "../model/model.js";

const create = (req,res) =>{
    if(!req.body){
        res.status(400).send({message:'body cannot be empty'})
        return
    }
    //new users data
    const user = new Userdb ({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })
    //save user in database of mongodb 
    user.save(user)
        .then(data => {
            // res.send(data)
            // the path is that we specify in a tag of index.ejs
            res.redirect('/add_user')
        })
        .catch(error => {
            res.status(500).send({
                message:error.message || "some error happen during devlopment"
            })
        })
}
const find = (req,res) =>{
    if(req.query.id){
        const id = req.query.id
        Userdb.findById(id)
        .then(data => {
            if(!data){
                    res.status(404).send({message:"user not found with id"})
            }else{
                res.send(data)
            }
        })
        .catch(error => {
            res.status(500).send({message:"error retriving user with id" + id})
        })
            
        
    }else{
        Userdb.find()
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({message:"error occured"})
        })

    }
}
const update = (req,res) =>{
    if(!req.body){
        res.status(400).send({message:"add some data"})
    }
    const id = req.params.id

    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data => {
        if(!data){
            res.status(404).send(`message:"cannot update user with id ${id}`)
        }
        else{
            res.send(data)
        }
    })
    .catch(error => {
        res.status(500).send({message:"error while updating user information"})
    })
}
const del = (req,res) =>{
    if(!req.body){
        res.status(400).send({message:"add some data"})
    }
    const id = req.params.id

    Userdb.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send(`message:"cannot delete user with id ${id}`)
        }
        else{
            res.send(data)
        }
    })
    .catch(error => {
        res.status(500).send(error )
    })

}
export {create,update,find,del}

