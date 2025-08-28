const bcrypt = require('bcryptjs');
const db = require('./database.js');

const registerUser = async (username, password) => {
  const passwordHash = await bcrypt.hash(password, 10);
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO users (username, password_hash) VALUES (?, ?)',
      [username, passwordHash],
      function(err) {
        if (err) reject(new Error('User exists'));
        else resolve({ id: this.lastID, username });
      }
    );
  });
};

const loginUser = async (username, password) => {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT * FROM users WHERE username = ?',
      [username],
      async (err, user) => {
        if (err) return reject(err);
        if (!user) return reject(new Error('User not found'));
        
        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) return reject(new Error('Wrong password'));
        
        resolve({ id: user.id, username: user.username });
      }
    );
  });
};

module.exports = { registerUser, loginUser };
