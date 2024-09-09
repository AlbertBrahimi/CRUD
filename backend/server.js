const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.js');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);

app.listen(8081, () => {
  console.log('Server is running on port 8081');
});
