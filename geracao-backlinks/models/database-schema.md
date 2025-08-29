# Esquema do Banco de Dados - SAAS Geração Backlinks

## Visão Geral

Este documento descreve o esquema do banco de dados MongoDB para o sistema SAAS de geração de backlinks. O sistema utiliza 6 coleções principais para armazenar todas as informações necessárias.

## Coleções

### 1. Users

Armazena informações dos usuários do sistema.

```javascript
{
  _id: ObjectId,
  name: String,           // Nome do usuário
  email: String,          // Email (único)
  password: String,       // Senha (hash)
  createdAt: Date,        // Data de criação
  lastLogin: Date,        // Último login
  isActive: Boolean       // Status da conta
}
```

### 2. Sites

Armazena os sites adicionados pelos usuários para análise e geração de backlinks.

```javascript
{
  _id: ObjectId,
  userId: ObjectId,       // Referência ao usuário
  url: String,            // URL do site
  domainAuthority: Number,// Autoridade do domínio
  backlinkCount: Number,  // Número de backlinks
  keywords: [String],     // Palavras-chave associadas
  niche: String,          // Nicho de mercado
  sitemapUrl: String,     // URL do sitemap
  lastAnalysis: Date,     // Data da última análise
  createdAt: Date         // Data de criação
}
```

### 3. Backlinks

Armazena informações sobre os backlinks gerados.

```javascript
{
  _id: ObjectId,
  userId: ObjectId,       // Referência ao usuário
  siteId: ObjectId,       // Referência ao site
  targetUrl: String,      // URL de destino
  anchorText: String,     // Texto âncora
  sourceSite: String,     // Site de origem
  articleTitle: String,   // Título do artigo
  articleUrl: String,     // URL do artigo publicado
  status: String,         // Status (pending, generated, published, rejected)
  createdAt: Date,        // Data de criação
  publishedAt: Date       // Data de publicação
}
```

### 4. Keywords

Armazena as palavras-chave monitoradas e suas métricas.

```javascript
{
  _id: ObjectId,
  userId: ObjectId,           // Referência ao usuário
  siteId: ObjectId,           // Referência ao site
  keyword: String,            // Palavra-chave
  volume: Number,             // Volume de busca
  competition: String,        // Nível de competição (low, medium, high)
  position: Number,           // Posição atual
  competitiveness: Number,    // Índice de competitividade
  competitorBacklinks: Number,// Backlinks dos concorrentes
  competitorTopics: [String], // Tópicos dos concorrentes
  createdAt: Date             // Data de criação
}
```

### 5. Activities

Registra as atividades dos usuários no sistema.

```javascript
{
  _id: ObjectId,
  userId: ObjectId,       // Referência ao usuário
  action: String,         // Ação realizada
  description: String,    // Descrição da ação
  targetType: String,     // Tipo de alvo (site, backlink, keyword, profile)
  targetId: ObjectId,     // ID do alvo
  timestamp: Date         // Data e hora da ação
}
```

### 6. Settings

Armazena as configurações de interface do usuário.

```javascript
{
  _id: ObjectId,
  userId: ObjectId,       // Referência ao usuário
  theme: String,          // Tema (light, dark)
  primaryColor: String,   // Cor primária
  secondaryColor: String, // Cor secundária
  notifications: {
    email: Boolean,       // Notificações por email
    push: Boolean,        // Notificações push
    sms: Boolean          // Notificações SMS
  },
  privacy: {
    profileVisibility: String, // Visibilidade do perfil
    dataSharing: Boolean       // Compartilhamento de dados
  },
  createdAt: Date,        // Data de criação
  updatedAt: Date         // Data de atualização
}
```

## Relacionamentos

- **Users** ↔ **Sites**: Um usuário pode ter muitos sites (1:N)
- **Users** ↔ **Backlinks**: Um usuário pode criar muitos backlinks (1:N)
- **Users** ↔ **Keywords**: Um usuário pode monitorar muitas palavras-chave (1:N)
- **Users** ↔ **Activities**: Um usuário pode ter muitas atividades (1:N)
- **Users** ↔ **Settings**: Um usuário tem uma configuração (1:1)
- **Sites** ↔ **Backlinks**: Um site pode ter muitos backlinks (1:N)
- **Sites** ↔ **Keywords**: Um site pode ter muitas palavras-chave (1:N)

## Índices

Para otimizar as consultas, os seguintes índices são recomendados:

1. `Users`: Índice único no campo `email`
2. `Sites`: Índice composto em `userId` e `url`
3. `Backlinks`: Índice em `userId` e `siteId`
4. `Keywords`: Índice em `userId` e `siteId`
5. `Activities`: Índice em `userId` e `timestamp`
6. `Settings`: Índice único em `userId`

## Escalabilidade

O esquema foi projetado para suportar:
- 2.000+ sites atendidos
- 30K+ backlinks gerados
- Consultas rápidas mesmo com grandes volumes de dados
- Fácil particionamento horizontal se necessário