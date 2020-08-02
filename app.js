const express = require('express');
const path = require('path');

const app = express();
const { PORT = 3000 } = process.env;
const cards = require('./routes/cards.js');
const users = require('./routes/users.js');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/cards', cards);
app.use('/users', users);
app.use((req, res) => {
  res.status(404).send({ massage: 'Запрашиваемый ресурс не найден' });
});
app.listen(PORT, () => {
});
