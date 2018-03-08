const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;


    const connection = (closure) => {
        return MongoClient.connect('mongodb://localhost:27017/mydb', (err, client) => {
            if (err) return console.log(err);
            let db = client.db('mydb');
            closure(db);
        })
}

router.get('/api/users', function (req, res) {
    connection(db => {
        db.collection('users').find().toArray().then(result => {
                    res.send(result)

        })
    })
  
})
// add user to db 
 router.post('/api/users', function (req, res) {
connection(db=> { 
    db.collection('users').insert(req.body,(err,result)=>{res.send(result)}
)
})
})

//to get one user
router.get('/api/users/:id', function (req, res) {
    let qry ={_id: ObjectID(req.params.id)};
    connection(db => {
        db.collection('users').findOne(qry).then(result => {
                    res.send(result)

        })
    })
})

// GET : localhost:3000/api/todos/123 => to get the array of todos of one user by id
router.get('/api/users/todos/:id/:init', function (req,res) {
    let qry ={_id: ObjectID(req.params.id)};
    connection(db => {
        db.collection('users').findOne(qry,(err,result)=>{ 
                    
                   res.send(result.todos[req.params.init]); 
    })
})})
//  POST : localhost:3000/api/todos/123 => to add a todo task in the list

router.post('/api/users/todos/:id', (req, res) => {
    let qry ={_id: ObjectID(req.params.id)};

    connection(db=> { 
        db.collection('users').update(qry,{$push:{todos:req.body}}).then(result =>{
            res.send(result);
        })
    })
    })

    /// GET : loalhost:3000/api/todos/123/
    router.get('/api/users/todos/:id/', function (req,res) {
        let qry ={_id: ObjectID(req.params.id)};
        connection(db => {
            db.collection('users').findOne(qry,(err,result)=>{ 
                        
                       res.send(result); 
        })
    })})

module.exports = router ;