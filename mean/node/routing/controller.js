var express = require('express');
var routes = express.Router();
var customerdata = require("../model/customerdata");
var ObjectId = require('mongoose').Types.ObjectId;

routes.get('/',function(req,resp){
    customerdata.find((err,docs) =>{
        if(!err)
        resp.send(docs);
        else
        console.log("error occured");
    })
})
routes.get('/:id',function(req,resp){
    const id = req.params.id;
    customerdata.findById(id,function(err,data){
        if(!err)
        resp.send(data);
        else
        console.log("error occured");
    })
})

routes.post('',function(req,resp)
{
     var cust = new customerdata({
         name: req.body.name,
         address: req.body.address,
         phone_no : req.body.phone_no,
         room_no : req.body.room_no,
         amount : req.body.amount 
     });
     cust.save(function(err,data){
         if(!err)
         resp.send(data);
         else
         console.log(err);
     })
})

routes.put('/:id',function(req,resp)
{
    if(!ObjectId.isValid(req.params.id))
    return resp.status(400).send(`No record with given id:${req.params.id}`);

    var cust = {
        name: req.body.name,
        address: req.body.address,
        phone_no : req.body.phone_no,
        room_no : req.body.room_no,
        amount : req.body.amount 
    };
customerdata.findByIdAndUpdate(req.params.id, {$set:cust},{new:true},(err,doc)=>{
    if(!err){
        resp.send(doc);
    }
    else{
        console.log('error in update:' + JSON.stringify(er,undefined,2));
    }
});
});

routes.delete('/:id',function(req,resp){
    if(!ObjectId.isValid(req.params.id))
    return resp.status(400).send("No record with given id:${req.params.id}");

    customerdata.findByIdAndRemove(req.params.id,function(err,data){
        if(!err)
        resp.send(data)
        else
        console.log('error in cust delete:'+JSON.stringify(err,undefined,2));
    })
})



module.exports= routes;