const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/TP_Web", {useNewUrlParser:true});
const db = mongoose.connection;
const express = require('express');
const app = express();

app.use(express.static('public'))
app.use(express.json());
//afficher erreur
db.on("error", console.error.bind(console, "connection error:"));
//Pour connecter
db.once("open", function(){
})

//représentation de la collection
const citiesSchema = new mongoose.Schema({
    name:String
});
//Creation du modele basé sur le schema
const Cities = mongoose.model('Cities', citiesSchema);

app.get("/cities", (req,res)=> {
    const city = new Cities({name:"Toulouse"})
    Cities.find(function(err, cities){
            if(err) return console.error(err);
            res.send(cities);
        });
});

app.post('/city', (req,res)=> {
    const citypost = new Cities({name: req.body.name })
    citypost.save(function(err){
        if(err) return console.error(err);
        Cities.find(function(err, cities){
            if(err) return console.error(err);
            res.send(cities);
        });
    });
});

app.put("/city/:id", async(req,res)=> {
    let cities = await Cities.findByIdAndUpdate(req.params.id,{
        name: req.body.name
    },{new: true});
    if (!cities){
        res.status(404).send("Not Found");
    }else{
        res.status(200).send(cities);
    }
});

app.listen(27017, () => console.log(`Example app listening on port 27017`))

