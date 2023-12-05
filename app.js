const express = require('express');
const mongoose = require('mongoose');

const Item = require('./models/items');

const app = express();

app.use(express.urlencoded({extended: true}));

const mongodb = 'mongodb+srv://pdhotmal:mongoDB123@cluster0.tf99hk5.mongodb.net/item-database?retryWrites=true&w=majority'
mongoose.connect(mongodb).then(()=> {
    console.log('connected')
    app.listen(3000);
}).catch(err => console.log(err))

app.set('view engine', 'ejs');
 
app.get('/', (req, res) => {
    // res.sendFile('./views/index.html', {root: __dirname});

    //    const items = [
    //         { name: 'mobile phone', price: 1000 },
    //         { name: 'book', price: 30 },
    //         { name: 'computer', price: 2000 },
    //     ]
    //     res.render('index', { items });

    res.redirect('/get-items');

})


app.get('/get-items', (req, res) => {
    Item.find().then(result => {
        // res.send(result)
        res.render('index', { items: result });   
    }).catch(err => console.log(err))
})



// app.get('/create-item', (req, res) => {
//     const item = new Item({
//         name: 'Computer',
//         price: 2000
//     });
//     item.save().then(result => res.send(result)).catch(err => console.log(err))
// })

app.get('/get-item', (req, res) => {
    Item.findById('656da6246983cd8b2643d4a6').then(result => res.send(result)).catch(err => console.log(err))
})



app.get('/add-item', (req, res) => {
    // res.sendFile('./views/add-item.html', {root: __dirname});
    res.render('add-item')
})


app.post('/items', (req, res) => {
    console.log(req.body)
    const item = new Item(req.body);
    item.save().then(()=>{
        res.redirect('/get-items')
    }).catch(err=>console.log(err))
})

app.get('/items/:id', (req, res) => {
    console.log(req.params)
    const id = req.params.id;
    Item.findById(id).then(result => {
        console.log(result)
        res.render('item-detail', {item: result} )
    })   
})

app.delete('/items/:id', (req, res) => {
    console.log(req.params)
    const id = req.params.id;
    Item.findByIdAndDelete(id).then(result => {
        res.json({ redirect: '/get-items'})
    })   
})

app.put('/items/:id', (req, res) => {
    console.log(req.params)
    const id = req.params.id;
    Item.findByIdAndUpdate(id, req.body).then(result => {
        // res.json({ redirect: '/get-items'})
        res.json({msg: 'Updated Succesfully'})
    })   
})

app.use((req, res) => {
    // res.sendFile('./views/error.html', {root: __dirname});
    res.render('error')
})



/* 


mongoose 
    models
    documents
    querying


*/