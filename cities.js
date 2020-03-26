const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;
app.use(express.static('public'))
app.use(express.json());
app.get('/cities', (req,res)=> {
    fs.readFile('public/cities.json', 'utf8', (err, cities) =>{
        if (err){
            next(err)
        } else{
        res.send(cities)
        }
    })
});

app.post('/city', (req,res)=> {

    console.log(req.body.name)

    fs.readFile('public/cities.json', 'utf8', (err, cities) =>{

        if (err){

            const jsonvide = JSON.stringify({
                "cities" : []
            })
            fs.writeFile('public/cities.json', jsonvide)
        }

        let json = JSON.parse(cities);
        let ville = [];

        json.cities.forEach(element => {

            if (element.name !== req.body.name){

                let newcities = {
                    "id": `${json.cities.length+1}`,
                    "name": req.body.name
                };

                json.cities.push(newcities);
                res.send(json);
            }
        });
    })
});

app.put('/city/:id', (req,res)=> {

    console.log(req.params)

    fs.readFile('public/cities.json', 'utf8', (err, cities) =>{

        if (err){

            const jsonvide = JSON.stringify({
                "cities" : []
            })
            fs.writeFile('public/cities.json', jsonvide)
        }

        let json = JSON.parse(cities);
        let ville = [];

        json.cities.forEach(element => {

            if (element.id === req.params.id){

                element.name = req.body.name;
                res.send(json);
            }
        });
    })
});

app.listen(port, () => console.log(`Example app listening on port ${port}`))
