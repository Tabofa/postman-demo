// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/postman-demo";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

const dataBase = 'postman-demo'
const collection = 'todos'


// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("postman-demo");
//   dbo.createCollection("todos", function(err, res) {
//     if (err) throw err;
//     console.log("Collection created!");
//     db.close();
//   });
// });

// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("postman-demo");
//     var myobj = { name: "demo todo", done: false, created: '2020-02-07T08:12:00', createdBy: 'tabofa' };
//     dbo.collection("todos").insertOne(myobj, function(err, res) {
//       if (err) throw err;
//       console.log("1 document inserted");
//       db.close();
//     });
//   });


// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db(dataBase);
//     dbo.collection(collection).find({ createdBy: 'tabofa' }).toArray(function (err, result) {
//         if (err) throw err;
//         console.log(result);
//         db.close();
//     });
// });

function getAll(username) {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db(dataBase)
        dbo.collection(collection).find({ createdBy: username }).toArray((err, result) => {
            if (err) throw err;
            console.log(result)
            db.close
        })
    })
}

exports.getAll