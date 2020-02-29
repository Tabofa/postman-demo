const express = require('express')
const bp = require('body-parser')
const cors = require('cors')
const missingUser = require('./utilities').missingUser
const invalidId = require('./utilities').invalidId
const genericError = require('./utilities').genericError

let MongoClient = require('mongodb').MongoClient;
let mongo = require('mongodb')
let url = "mongodb://mongodb_container:27017/postman-demo";

if(process.env.NODE_ENV === 'dev') {
    url = "mongodb://localhost:27017/";
}

const dataBase = 'postman-demo'
const collection = 'todos'

const port = 3081; 
const app = express();
app.use(bp.json())

// app.options('*', cors())

app.post('/add', (req, res) => {
    let username = req.header('username')
    if(username === undefined) {
        missingUser(res)
        return
    }

    let todo = {
        name: req.body.todo,
        done: false,
        createdBy: username,
        created: new Date(),
        updated: new Date()
    }

    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db(dataBase)
        dbo.collection(collection).insertOne(todo, function(err, result) {
            if (err) {
                console.log(err.log)
                genericError(res)
            } else {
                res.status(201).json({id: result.insertedId})
            }
            db.close
        })
    })
})

app.get('/', (req, res) => {
    let username = req.header('username')
    if(username === undefined) {
        missingUser(res)
        return
    }

    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db(dataBase)
        dbo.collection(collection).find({ createdBy: username }).toArray((err, result) => {
            if (err) {
                genericError(res)
            } else {
                res.status(200).json(result)
            }
            db.close
        })
    })
})

app.get('/feedback', (req,res) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db(dataBase)
        let query = [
            {
                $group: {
                    _id: {
                        question: "$question",
                        answer: "$answer"
                    },
                    count: { "$sum": 1 }
                }
            },
            {
                "$group": {
                    _id: "$_id.question",
                    answers: {
                        $push: {
                            "answer": "$_id.answer",
                            "count": "$count"
                        }
                    }
                }
            }
        ]
        dbo.collection('feedback').aggregate(query).toArray((err, result) => {
            if (err) {
                console.log(err.log)
                genericError(res)
            } else {
                res.status(200).json(result)
            }
            db.close
        })
    })
})

app.post('/feedback', (req,res) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db(dataBase)
        dbo.collection('feedback').insertMany(req.body, function(err, result) {
            if (err) {
                console.log(err.log)
                genericError(res)
            } else {
                res.status(201).json({statusCode: 201, context: 'Created'})
            }
            db.close
        })
    })
})

app.get('/:id', (req, res) => {
    let username = req.header('username')
    if(username === undefined) {
        missingUser(res)
        return
    }

    if(req.params.id.length !== 24) {
        invalidId(res)
        return
    }

    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db(dataBase)
        let o_id = new mongo.ObjectId(req.params.id) 
        dbo.collection(collection).find({ _id: o_id, createdBy: username }).toArray((err, result) => {
            if (err) {
                genericError(res)
            } else {
                if(result.length === 0) {
                    res.status(404).json({statusCode: 404, context: "No task found with provided ID."})
                } else {
                    res.status(200).json(result)
                }
            }
            db.close
        })
    })
})

app.patch('/update/:id', (req,res) => {
    let username = req.header('username')
    if(username === undefined) {
        missingUser(res)
        return
    }

    if(req.params.id.length !== 24) {
        invalidId(res)
        return
    }

    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db(dataBase)
        let o_id = new mongo.ObjectId(req.params.id) 

        let patch = {}

        if(req.body.todo !== undefined) {
            patch.name = req.body.todo
        }

        if(req.body.done !== undefined) {
            patch.done = req.body.done
        }

        patch.updated = new Date()

        let newValues = {$set: patch}

        dbo.collection(collection).updateOne({ _id: o_id, createdBy: username }, newValues, function(err, result) {
            if (err) {
                genericError(res)
            } else {
                res.status(204).json(result)
            }
            db.close
        })
    })
})

app.delete('/delete/:id', (req, res) => {
    let username = req.header('username')
    if(username === undefined) {
        missingUser(res)
        return
    }

    if(req.params.id.length !== 24) {
        invalidId(res)
        return
    }

    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db(dataBase)
        let o_id = new mongo.ObjectId(req.params.id) 
        dbo.collection(collection).deleteOne({ _id: o_id, createdBy: username }, function(err, obj) {
            if (err) {
                genericError(res)
            } else {
                if(obj.result.n === 1) {
                    res.status(204).send()
                } else {
                    res.status(404).json({'statusCode': 404, 'context': 'Did not find todo with id: '+ req.params.id})
                } 
            }
            db.close
        })
    })
})

app.listen(port, () => console.log(`API running on port: ${port}`))