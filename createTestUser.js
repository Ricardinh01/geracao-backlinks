const { registerUser } = require('./services/auth');

async function createTestUser() {
  try {
    const user = await registerUser('testuser', 'senhaSegura123');
    console.log('Usuário criado com sucesso:', user);
  } catch (error) {
    console.error('Erro ao criar usuário:', error.message);
  }
}

createTestUser();