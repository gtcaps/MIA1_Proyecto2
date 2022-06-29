const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/data', (req, res) => {
    /*fs.writeFile('./src/data.json', JSON.stringify(data), error => {
        if (error) {
            console.log(error);
        }
    });*/
    fs.readFile('./src/data.json', 'utf8', (error, data) => {
        if (error) {
            res.json({});
        }

        res.json(JSON.parse(data));
    });
});

app.get('/users', (req, res) => {
    fs.readFile('./src/users.json', 'utf8', (error, data) => {
        if (error) {
            res.json({});
        }

        res.json(JSON.parse(data));
    });
});

app.post('/users', (req, res) => {
    let userInput = req.body;

    let users;
    fs.readFile('./src/users.json', 'utf8', (error, data) => {
        if (error) {
            res.status(500).json({ message: 'No se pudo almacenar el usuario' });
        }
    
        
        users = JSON.parse(data);
        let existUser = users.findIndex(user => user.email === userInput.email);
    
        if (existUser !== -1) {
            res.status(400).json({ message: 'El usuario ya existe' });
        } else {
            users.push(userInput);
            fs.writeFile('./src/users.json', JSON.stringify(users), error => {
                if (error) {
                    res.status(500).json({ message: 'No se pudo almacenar el usuario' });
                }
            });
            res.status(201).json({ message: 'Usuario almacenado' });
        }

    });
    
});


app.listen(3030, () => {
    console.log('Server is running on port 3030');
});