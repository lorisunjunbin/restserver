const port = 3323
const express = require('express');

const cors = require("cors");
const app = express();
app.use(cors());

const static_path = __dirname.replace('server', 'public/');

//route
const routes = {
    "services": "index.html",
    "products": "index.html",
    "sign-up": "index.html",
    "log-in": "index.html"
};

//dummy data
const dummyData = {
    "authenticate": require('./dummydata/loginjwt'),
    "products_data": require('./dummydata/products'), "define_dummy_data": "in_folder_dummydata"
};

app.use(express.static('../build'));

app.get('/metadata', (req, res) => {
    console.log('return dummy - metadata ')
    res.send(dummyData)
})

app.get("/:param", (req, res) => {
    console.log('app.get');
    //route
    if (routes[req.params['param']]) {
        let file_path = static_path + routes[req.params['param']];
        console.log('route to file: ' + file_path)
        res.sendFile(file_path);
        //data
    } else {
        const data = dummyData[req.params['param']];
        if (!!data) {
            console.log('Dummy Data -------------------------------->> ' + req.params['param'])
            console.log(data)
            console.log('Dummy Data --------------------------------<< ' + req.params['param'])
            res.setHeader('Access-Control-Allow-Origin','*');
            res.send(data);
        } else {
            console.log('return status: 412 - ' + req.params['param'])
            res.sendStatus(412)
        }
    }
})

app.post("/:param", (req, res) => {
    console.log('app.post');
    //route
    if (routes[req.params['param']]) {
        let file_path = static_path + routes[req.params['param']];
        console.log('route to file: ' + file_path)
        res.sendFile(file_path);
        //data
    } else {
        const data = dummyData[req.params['param']];
        if (!!data) {
            console.log('Dummy Data -------------------------------->> ' + req.params['param'])
            console.log(data)
            console.log('Dummy Data --------------------------------<< ' + req.params['param'])
            res.setHeader('Access-Control-Allow-Origin','*');
            res.send(data);
        } else {
            console.log('return status: 412 - ' + req.params['param'])
            res.sendStatus(412)
        }
    }
})

app.listen(port, () => {
    console.log(`rest server listening at http://localhost:${port}/metadata`)
    for (k in dummyData) {
        console.log(`Dummy ${k} -> http://localhost:${port}/${k}`)
    }
})