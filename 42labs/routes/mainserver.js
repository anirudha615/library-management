var mongoose = require ('mongoose'),
    assert = require ('assert');
var redisClient = require('redis').createClient;
var redis = redisClient(6379, 'localhost'); 
var stores = require ('../models/book');
var Verify = require('./verify');   
var express=require('express');

var app = express();

var morgan=require('morgan');

var bodyParser=require('body-Parser');

var hostname ='localhost';

var port = 8080;

app.use(morgan('dev'));
    
var abc = express.Router();
    
abc.use(bodyParser.json());

abc.route('/')
    
    .get(Verify.verifyOrdinaryUser, function(req,res,next){
        redis.flushall();
         redis.get("hi",function(err,reply){
            if (err) throw err;
            else if (reply)
                res.json(JSON.parse(reply));
            else{
    stores.find({},function(err,result){
        if (err) throw err;
        redis.set("hi",JSON.stringify(result),function(){
        res.json(result);
        
        });
    });
            };
         });
    })
    
    .post(Verify.verifyOrdinaryUser,Verify.verifyAdmin, function(req,res,next){
        redis.flushall();
    stores.create(req.body,function(err,result){
        if (err) throw err;
        console.log('Book Created');
        var id = result._id;
        res.writeHead(200,{'Content-Type':'Text/plain'});
        res.end('Book Created with id:' +id);
           
       
    });
    })
    
   
abc.route('/:ID')

    
    .get(Verify.verifyOrdinaryUser, function(req,res,next){
        redis.flushall();
        redis.get("hi",function(err,reply){
            if (err) throw err;
            else if (reply)
                res.json(JSON.parse(reply));
            else{
    stores.findById(req.params.ID,function(err,result){
        if (err) throw err;
        redis.set("hi",JSON.stringify(result),function(){
        res.json(result);
        });
    });
            };
    });
    })

   .put(Verify.verifyOrdinaryUser,Verify.verifyAdmin, function(req,res,next){
       redis.flushall();
   stores.findByIdAndUpdate(req.params.ID,{$set : req.body},{new : true})
   .exec(function(err,result){
       if (err) throw err;
       res.json(result);
       redis.set("hi",JSON.stringify(result),function(err){
           if (err) throw err;

       });
   });
    })

    .delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin, function(req,res,next){
    stores.remove(req.params.ID,function(err,result){
        if (err) throw err;
        res.json(result);
    });
    });

 app.use('/books',abc);
   
   app.use(express.static(__dirname + '/public'));

app.listen(port,hostname,function(){
    console.log('Server Running on 8080');
});

module.exports = abc;