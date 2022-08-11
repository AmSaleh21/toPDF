import express from 'express'
import cors from 'cors';
import router from './routes/route.mjs'
import handleError from './middleware/errorHandlers/errorHandler.mjs'

let app = express();

app.use(cors({
    origin: "*"
}));

app.use(express.json());
app.use(router);
app.use(handleError);

export default app;