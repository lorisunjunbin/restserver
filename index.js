const port = 3000
const express = require('express');
const app = express();

const dummyData = {
    "products": require('./dummydata/products'),
    "categories": require('./dummydata/categories'),
    "employeeNumberSet('00190002')": require('./dummydata/employeeProfile'),
    "managerNumberSet('00190001')": require('./dummydata/manager'),
    "define_dummy_data": "in_folder_dummydata"
};

app.use(express.static(__dirname + '/public'));

app.get('/metadata', (req, res) => {
    console.log('return dummy - metadata ')
    res.send(dummyData)
})

app.get("/:param", (req, res) => {
    const data = dummyData[req.params['param']];
    if (!!data) {
        console.log('Dummy Data -------------------------------->> ' + req.params['param'])
        console.log(data)
        console.log('Dummy Data --------------------------------<< ' + req.params['param'])
        res.send(data);
    } else {
        console.log('return status: 412 - ' + req.params['param'])
        res.sendStatus(412)
    }
})

app.listen(port, () => {
    console.log(`rest server listening at http://localhost:${port}/metadata`)
    for (key in dummyData) {
        console.log(`Dummy ${key} -> http://localhost:${port}/${key}`)
    }
})