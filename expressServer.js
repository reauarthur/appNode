const fs = require('fs');
const express = require('express');
const app = express();

const port = 3000;
fs.readFile('data.csv', 'utf8', (err, data) =>{
    if(err){
        console.error(err)
        return
    }
    console.log(data);
    app.get('/data', (req,res)=> res.send(data));

    app.listen(port, () => console.log(`Example app listening on port ${port}`))
})
