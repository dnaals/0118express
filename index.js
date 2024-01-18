const express = require('express')
const fs = require('fs');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
let data = JSON.parse(fs.readFileSync('./data.json'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/test', function (req, res) {
    res.send(data.test);
})

app.post('/test', function (req, res) {
    data.test.push(req.body);
    const body = JSON.stringify(data);
    const dataInsert = fs.writeFileSync('./data.json', body);
    res.send(data.test);
})

app.get('/test/:id', function (req, res) {
    const { id } = req.params;
    const findData = data.test.filter(obj => obj.id == id);
    res.send(data.test);
})

app.delete('/test/:id', function (req, res) {
    const { id } = req.params;
    data.test = data.test.filter(obj => obj.id != id)
    const body = JSON.stringify(data);
    fs.writeFileSync('./data.json', body);
    res.send(data.test);
})

app.put('/test/', function (req, res) {
    const updateBody = req.body;
    data.test = data.test.map(obj => {
        if (obj.id == updateBody.id) {
            obj = updateBody;
        }
        return obj;
    })
    const body = JSON.stringify(data);
    fs.writeFileSync('./data.json', body);
    res.send(data.test);
})


const PORT = 3030;
app.listen(PORT, () => {
    console.log(`Server is running ...${PORT}`)
})