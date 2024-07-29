const bcrypt = require('bcryptjs');

const password = 'Manonmani123#';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) throw err;
  console.log('Hashed Password:', hash);
});
