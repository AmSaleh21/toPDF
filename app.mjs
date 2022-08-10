import express from 'express'
import cors from 'cors';

let app = express();
app.use(cors({
    origin: "*"
}));

app.use(express.json);

export default app;