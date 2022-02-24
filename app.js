const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./configs/database');

let authMiddleware = require('./middlewares/auth');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const visitorsRouter = require('./routes/visitors');
const logsRouter = require('./routes/logs');

db.authenticate().then(() => {
    console.log('Database connected...');
    // (async () => await db.sync())();
}).catch(err => {
    console.log('Error: ' + err);
    process.exit();
});

const port = process.env.PORT || 3000;
const app = express();

// Prevent public stack traces on production
process.env.NODE_ENV === 'production' ? app.set('env', 'production') : app.set('env', 'development');

// Mddlewares
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
            res.status(400).send({
                message: 'Malformed request body has been sent!'
        });
    } else next();
});

// Default routes
app.get('/', (req, res) => {
    res.json({"message": "Welcome to VES API"});
});

// Auth route
app.use('/auth', authRouter);

// Auth middlewares
// app.use(authMiddleware);

// Bypass auth middlewares (debug)
process.env.NODE_ENV === 'debug' ? authMiddleware = (req, res, next) => { next() } : console.log({ NODE_ENV: process.env.NODE_ENV });

// App routes
app.use('/users', authMiddleware, usersRouter);
app.use('/visitors', authMiddleware, visitorsRouter);
app.use('/logs', authMiddleware, logsRouter);

// Invalid routes
app.use('/*', (req, res)=>{
    return res.status(404).json({
        error : true,
        message : '404 Not found!'
    })
});

app.listen(port, () => {
    console.log(`VES server is listening on port ${port}`);
});