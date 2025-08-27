const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'backlinks.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error('Erro ao consultar banco de dados:', err);
    } else {
      console.log('Usuários cadastrados:');
      console.log(rows);
    }
    db.close();
  });
});