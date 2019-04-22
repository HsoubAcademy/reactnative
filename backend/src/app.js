import express from 'express';
import routes from './routes';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';

const app = express();


app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Request Info
app.use(morgan('dev'));


// Validation
app.use(expressValidator());

// Routing
app.use('/', routes);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status= 404;
    next(err);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
});


export default app;