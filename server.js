// var MongoClient = require('mongodb').MongoClient, format = require('util').format;

// Connection URL
 var url = 'mongodb://localhost:27017/sasha';
// Use connect method to connect to the Server
/*
MongoClient.connect(url, function(err, db) {
    console.log('1');
    if (err) throw err;
    console.log('2');

    var collection = db.collection('sasha');

    collection.insert({sas:1},function(err,docs){
        collection.count(function(err,count){
            console.log(format('count = %s', count));
        })
    });
    collection.find().toArray(function(err,results){
        console.dir(results)
       db.close();
    });


    console.log("Connected correctly to server");

    db.close();
});
*/
var mongoose = require('mongoose');
mongoose.connect(url);
/*
var schemaCat= mongoose.Schema({
    name:String,
    age:Number
});

schemaCat.methods.say = function(){
  console.log('Hello' + this.get('name'))
};
var Cat = mongoose.model('Cat',schemaCat);

Cat.find(function(err,cat){
    console.log(cat);

});
*/
var Cat = mongoose.model('Cat',{name:String});
Cat.find(function(err,cat){
    console.log(cat);

});
var sss = mongoose.model('sasha',{sas:Number});
sss.find(function(err,sss){
    console.log(sss);

});
 /*
var murzik = new Cat({name:'Murzik',age:5});
murzik.save(function(err){
    if(err) throw err;
     else
            murzik.say();
});
*/



