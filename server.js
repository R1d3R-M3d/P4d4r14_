const express = require('express');
const bodyParser = require('body-parser');

//APP
const app = express();
app.set('view engine', 'ejs');
//Where to serve static content
app.use(express.static('./'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//DATABASE
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { name } = require('ejs');
const uri = "mongodb+srv://matt0032014:santos222@cluster0.jvxabd7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

const db = client.db('Cluster0');

async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.dir;   
    }
}

async function findAll() {
    let response = await db.collection('products').find({}, (err, data) => {
        res.send(err);
    }).toArray();

    return response;
} 

// PAGES
app.get('/', async (req, res) => { 
    res.render('index.ejs', {collection: await findAll()}); 
});

//ROUTES
app.route('/upload').post(async (req, res) => {
    if (req.method === 'POST') {
        for (const [key, value] of Object.entries(req.body)) {
            if (typeof(value) === 'string') {req.body[key] = value.trim();}
        }

        db.collection('products').insertOne({
            product: req.body.product,
            amount: parseInt(req.body.amount),
            unitPrice: req.body.amount,
            group: req.body.group,
            characteristics: req.body.characteristics
    
        }, (err, response) => {
            if (err) { console.log(err) } else { console.log('Inserted Record', response.ops[0]) }
        });
    }
    res.redirect('/');
});

app.route('/edit').post(async (req, res) => {
    let id = req.body.id;
    let amount = req.body.amount;

    await db.collection('products').updateOne({_id: new ObjectId(id)}, {
        $set: {
            amount: parseInt(amount)
        }
    }, (err, result) => {
        if (err) return res.send(err);
    });

    res.redirect('/'); 
});

app.route('/buy/:id').get(async (req, res) => {
    let id = req.params.id;
    
    db.collection('products').updateOne({_id: new ObjectId(id)}, {
        $inc: { sell: 1, amount: -1 }
    }, 
    {upsert: true},
    res.redirect('/')
);

});

app.route('/delete/:id') 
.get((req, res) => {
    let id = req.params.id;
    
    db.collection('products').deleteOne({_id: new ObjectId(id)}, (err, result) => {
       if (err) return res.send(500, err); 
    });
    res.redirect('/');
});

//PORT
app.listen(3000, function() {    
    console.log('server runing on port 3000');
    run();
});