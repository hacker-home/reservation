const db = require('../../database/index.js');
const Room = require('../../database/models/rooms.js');
const cache = require('../cache.js');

exports.get = ((req, res) => {
  const id = req.query.id;
  Room.findAll({
    where: {
      roomId: id,
    },
  })
    .then((result) => {
      const room = result[0].dataValues;
      cache.saveToCache(id.toString(), JSON.stringify(room));
      res.send(room);
    })
    .catch((err) => {
      console.log('Error: ', err);
      res.sendStatus(500);
    });
});

