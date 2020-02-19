const express = require('express')
const bp = require('body-parser')
const cors = require('cors')

var MongoClient = require('mongodb').MongoClient;
let mongo = require('mongodb')
var url = "mongodb://localhost:27017/";

const dataBase = 'postman-demo'
const collection = 'todos'

const port = 3081; 
const app = express();
app.use(bp.json())
app.use(cors())

// CRUD
// Create
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
            if (err) throw err;
            res.status(201).json({id: result.insertedId})
            db.close
        })
    })
})

// Read
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
            if (err) throw err;
            res.status(200).json(result)
            // console.log('Returning status: 200, body:', result)
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
            if (err) throw err;
            res.status(200).json(result)
            db.close
        })
    })
})

// Update and Create. In the demo it will just update
app.put('/update/:id', (req,res) => {
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
            if (err) throw err;
            res.status(204).json(result)
            db.close
        })
    })
})

// Update
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
            if (err) throw err;
            res.status(204).json(result)
            db.close
        })
    })
})

// Delete
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
            if (err) throw err;
            if(obj.result.n === 1) {
                res.status(204).send()
            } else {
                res.status(404).json({'statusCode': 404, 'context': 'Did not find todo with id: '+ req.params.id})
            } 
            
            db.close
        })
    })
})

app.post('/bug', (req,res) => {
    console.log('Bug reported')
    res.status(200).json({'response': 'Thank you for the bug report'})
})

app.get('/bug', (req, res) => {
    console.log('Bug report requested')
    res.status(200).json([{'bug': 'description'}])
})

app.post('/feedback', (req,res) => {
    console.log('Feedback submitted')
    res.status(200).json({'response': 'Thank you for the feedback!'})
})

app.get('/feedback', (req,res) => {
    console.log('feedback requested')
    res.status(200).json([{'feedback': 'some feedback'}])
})

app.listen(port, () => console.log(`API running on port: ${port}`))

const missingUser = (res) => {
    res.status(404).json({'statusCode': 404, 'context': 'Missing user.'})
    console.log('Error 404 - missing username')
}

const invalidId = (res) => {
    res.status(404).json({'statusCode': 404, 'context': 'Invalid ID.'})
    console.log('Error 404 - Invalid ID')
}