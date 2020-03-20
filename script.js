const fs = require('fs');
const http = require('http');
const pug = require('pug');

fs.readFile('data.csv', 'utf8', (err, data) =>{
    if(err){
        console.error(err)
        return
    }
    console.log(data);

    const liste = data.split('\n');
    let newdata = {};
    let user = []

    liste.forEach(function (elt){
        var res = {};
        var cells = elt.split(";");
        res.users = cells[0];
        res.location = cells[1];
        user.push(res);
    });

    newdata.users = user;

    const compiledFunction = pug.compileFile('template.pug');
    const port = 3000;


    const server = http.createServer((req, res) => {
        const generatedTemplate = compiledFunction({
            data: newdata
        });

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(generatedTemplate);
    })

    server.listen(port, () =>{
        console.log(`Server launch at port ${port}`);
    });
})