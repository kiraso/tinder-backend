import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import Cards from './dbCards.js'
//Config App
const app = express();
const port = process.env.PORT || 8001
const connection_url = 'mongodb+srv://admin:GEviA9d2CdNl9YUl@cluster0.jmvcg.mongodb.net/tinderdb?retryWrites=true&w=majority'

//MiddleWares
app.use(express.json())
app.use(Cors())

mongoose.Promise = global.Promise;
//DB config

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology:true,
})

app.post('/tinder/cards', (req,res) => {
    const dbCard = req.body;
    Cards.create(req.body,(err,data) => {
    
        if(err){
            return res.status(500).send(err)
        }else{
            return res.status(201).send(data)
        }
    })
})

app.get('/tinder/cards', (req, res) => {
    Cards.find((err,data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    })
})

//Api Endpoints
app.get('/',(req,res) => res.status(200).send("HELLO :D"));
// app.get('/tinder/cards',(req,res) => res.status(200).send("Tinder Cards"));

//Listener
app.listen(port,() => console.log(`listening on localhost: ${port}`));