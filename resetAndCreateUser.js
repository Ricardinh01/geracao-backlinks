const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { registerUser } = require('./services/auth');

async function resetAndCreateUser() {
  const dbPath = path.join(__dirname, 'backlinks.db');
  const db = new sqlite3.Database(dbPath);
  
  // Limpar tabela de usuários
  db.run('DELETE FROM users', async (err) => {
    if (err) {
      console.error('Erro ao limpar tabela de usuários:', err);
    } else {
      console.log('Tabela de usuários limpa com sucesso');
      
      // Criar novo usuário
      try {
        const user = await registerUser('testuser', 'senhaSegura123');
        console.log('Usuário criado com sucesso:', user);
      } catch (error) {
        console.error('Erro ao criar usuário:', error.message);
      }
    }
    db.close();
  });
}

resetAndCreateUser();