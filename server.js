import express from 'express';
import router from './routers/employeeRouter.js';
import cors from 'cors'
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});