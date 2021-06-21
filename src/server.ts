import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = 3000;
app.listen(port, () => console.log(`Server is running at port ${port}`));