const fs = require('fs');
const path = require('path');
const router = require('express').Router();

const pathToUsers = path.join(__dirname, '../data/users.json');

router.get('/', (req, res) => {
  const reader = fs.createReadStream(pathToUsers, { encoding: 'utf8' });
  reader.on('error', (err) => {
    res.status(500).send({ message: `Ошибка сервера ${err.message}` });
  });
  reader.on('open', () => {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8'});
    reader.pipe(res);
  });
});

router.get('/:id', (req, res) => {
  const reader = fs.createReadStream(pathToUsers, { encoding: 'utf8' });
  let usersJSON = '';
  reader.on('error', (err) => {
    res.status(500).send({ message: `Ошибка сервера ${err.message}` });
  });

  reader.on('data', (data) => {
    usersJSON += data;
  });

  reader.on('end', () => {
    const usersArr = JSON.parse(usersJSON);
    const user = usersArr.find((item) => item._id === req.params.id);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({
        message: 'Нет пользователя с таким id',
      });
    }
  });
});

module.exports = router;
