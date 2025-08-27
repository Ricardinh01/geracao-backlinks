const bcrypt = require('bcryptjs');

// Testar senha
async function testPassword() {
  const plainPassword = 'senhaSegura123';
  const hashedPassword = '$2a$10$4bWV4Uku72K7WMLlQSkV8.IBuJt2x1O6/MhJZcgH339YkUZ43wy7q'; // Hash do usuário testuser
  
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  console.log('Senha correta:', isMatch);
  
  // Testar senha incorreta
  const isMatch2 = await bcrypt.compare('senhaErrada', hashedPassword);
  console.log('Senha incorreta:', isMatch2);
}

testPassword();