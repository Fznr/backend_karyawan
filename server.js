import express from 'express';
import router from './routers/employeeRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

// Routes for authentication, employee management, attendance, etc.

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});