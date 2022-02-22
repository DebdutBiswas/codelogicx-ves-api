const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 3000;
const app = express();

// Mddlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}));

// Default routes
app.get('/', (req, res) => {
    res.json({"message": "Welcome to VES API"});
});

// Invalid routes
app.use('/*', (req, res)=>{
    return res.status(404).json({
        error : true,
        message : "404 Not found!"
    })
});

app.listen(port, () => {
    console.log(`VES server is listening on port ${port}`);
});