const express = require('express');
const cors = require('cors');
const app = express();

const userRoutes = require('./routes/user');

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);

app.listen(9000, () => console.log('Backend running on port 9000'));