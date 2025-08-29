# Documentação da API - SAAS Geração Backlinks

## Visão Geral

Esta documentação descreve os endpoints da API RESTful para o sistema SAAS de geração de backlinks.

## Autenticação

Todos os endpoints, exceto os de autenticação, requerem um token JWT no header:

```
Authorization: Bearer <token>
```

## Endpoints

### Autenticação

#### Registrar Usuário
```
POST /api/auth/register
```

**Corpo da requisição:**
```json
{
  "name": "Nome do Usuário",
  "email": "email@exemplo.com",
  "password": "senha123"
}
```

**Resposta de sucesso:**
```json
{
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "name": "Nome do Usuário",
    "email": "email@exemplo.com"
  }
}
```

#### Login
```
POST /api/auth/login
```

**Corpo da requisição:**
```json
{
  "email": "email@exemplo.com",
  "password": "senha123"
}
```

**Resposta de sucesso:**
```json
{
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "name": "Nome do Usuário",
    "email": "email@exemplo.com"
  }
}
```

### Sites

#### Listar Sites
```
GET /api/sites
```

**Resposta de sucesso:**
```json
[
  {
    "_id": "site-id",
    "userId": "user-id",
    "url": "https://exemplo.com",
    "domainAuthority": 50,
    "backlinkCount": 10,
    "keywords": ["palavra1", "palavra2"],
    "niche": "Tecnologia",
    "sitemapUrl": "https://exemplo.com/sitemap.xml",
    "lastAnalysis": "2023-08-01T10:00:00Z",
    "createdAt": "2023-08-01T10:00:00Z"
  }
]
```

#### Adicionar Site
```
POST /api/sites
```

**Corpo da requisição:**
```json
{
  "url": "https://exemplo.com"
}
```

**Resposta de sucesso:**
```json
{
  "_id": "site-id",
  "userId": "user-id",
  "url": "https://exemplo.com",
  "domainAuthority": 0,
  "backlinkCount": 0,
  "keywords": [],
  "niche": null,
  "sitemapUrl": null,
  "lastAnalysis": null,
  "createdAt": "2023-08-01T10:00:00Z"
}
```

#### Remover Site
```
DELETE /api/sites/:id
```

**Resposta de sucesso:**
```json
{
  "message": "Site removido com sucesso"
}
```

#### Analisar Site
```
POST /api/sites/:id/analyze
```

**Resposta de sucesso:**
```json
{
  "message": "Análise concluída",
  "site": {
    "_id": "site-id",
    "userId": "user-id",
    "url": "https://exemplo.com",
    "domainAuthority": 50,
    "backlinkCount": 10,
    "keywords": ["palavra1", "palavra2"],
    "niche": "Tecnologia",
    "sitemapUrl": "https://exemplo.com/sitemap.xml",
    "lastAnalysis": "2023-08-01T10:00:00Z",
    "createdAt": "2023-08-01T10:00:00Z"
  }
}
```

### Backlinks

#### Listar Backlinks
```
GET /api/backlinks
```

**Resposta de sucesso:**
```json
[
  {
    "_id": "backlink-id",
    "userId": "user-id",
    "siteId": "site-id",
    "targetUrl": "https://meusite.com/pagina",
    "anchorText": "texto âncora",
    "sourceSite": "sitesparceiros.com",
    "articleTitle": "Título do Artigo",
    "articleUrl": "https://sitesparceiros.com/artigo",
    "status": "published",
    "createdAt": "2023-08-01T10:00:00Z",
    "publishedAt": "2023-08-01T11:00:00Z"
  }
]
```

#### Criar Backlink
```
POST /api/backlinks
```

**Corpo da requisição:**
```json
{
  "siteId": "site-id",
  "targetUrl": "https://meusite.com/pagina",
  "anchorText": "texto âncora",
  "sourceSite": "sitesparceiros.com"
}
```

**Resposta de sucesso:**
```json
{
  "_id": "backlink-id",
  "userId": "user-id",
  "siteId": "site-id",
  "targetUrl": "https://meusite.com/pagina",
  "anchorText": "texto âncora",
  "sourceSite": "sitesparceiros.com",
  "status": "pending",
  "createdAt": "2023-08-01T10:00:00Z"
}
```

#### Gerar Artigo
```
POST /api/backlinks/:id/generate
```

**Resposta de sucesso:**
```json
{
  "message": "Artigo gerado com sucesso",
  "backlink": {
    "_id": "backlink-id",
    "userId": "user-id",
    "siteId": "site-id",
    "targetUrl": "https://meusite.com/pagina",
    "anchorText": "texto âncora",
    "sourceSite": "sitesparceiros.com",
    "articleTitle": "Título do Artigo",
    "status": "generated",
    "createdAt": "2023-08-01T10:00:00Z"
  }
}
```

#### Publicar Backlink
```
POST /api/backlinks/:id/publish
```

**Resposta de sucesso:**
```json
{
  "message": "Backlink publicado com sucesso",
  "backlink": {
    "_id": "backlink-id",
    "userId": "user-id",
    "siteId": "site-id",
    "targetUrl": "https://meusite.com/pagina",
    "anchorText": "texto âncora",
    "sourceSite": "sitesparceiros.com",
    "articleTitle": "Título do Artigo",
    "articleUrl": "https://sitesparceiros.com/artigo",
    "status": "published",
    "createdAt": "2023-08-01T10:00:00Z",
    "publishedAt": "2023-08-01T11:00:00Z"
  }
}
```

### Palavras-Chave

#### Listar Palavras-Chave
```
GET /api/keywords
```

**Resposta de sucesso:**
```json
[
  {
    "_id": "keyword-id",
    "userId": "user-id",
    "siteId": "site-id",
    "keyword": "otimização seo",
    "volume": 2840,
    "competition": "high",
    "position": 5,
    "competitiveness": 85,
    "competitorBacklinks": 24580,
    "competitorTopics": ["otimização on-page", "link building", "conteúdo otimizado"],
    "createdAt": "2023-08-01T10:00:00Z"
  }
]
```

#### Adicionar Palavras-Chave a um Site
```
POST /api/keywords/site/:siteId
```

**Corpo da requisição:**
```json
{
  "keywords": ["palavra1", "palavra2", "palavra3"]
}
```

**Resposta de sucesso:**
```json
{
  "message": "Palavras-chave adicionadas com sucesso"
}
```

#### Analisar Palavra-Chave
```
GET /api/keywords/:id/analysis
```

**Resposta de sucesso:**
```json
{
  "keyword": {
    "_id": "keyword-id",
    "userId": "user-id",
    "siteId": "site-id",
    "keyword": "otimização seo",
    "volume": 2840,
    "competition": "high",
    "position": 5,
    "competitiveness": 85,
    "competitorBacklinks": 24580,
    "competitorTopics": ["otimização on-page", "link building", "conteúdo otimizado"],
    "createdAt": "2023-08-01T10:00:00Z"
  }
}
```

### Configurações

#### Obter Configurações
```
GET /api/settings
```

**Resposta de sucesso:**
```json
{
  "_id": "settings-id",
  "userId": "user-id",
  "theme": "dark",
  "primaryColor": "#FF7A00",
  "secondaryColor": "#000000",
  "notifications": {
    "email": true,
    "push": true,
    "sms": false
  },
  "privacy": {
    "profileVisibility": "private",
    "dataSharing": false
  },
  "createdAt": "2023-08-01T10:00:00Z",
  "updatedAt": "2023-08-01T10:00:00Z"
}
```

#### Atualizar Configurações
```
PUT /api/settings
```

**Corpo da requisição:**
```json
{
  "theme": "light",
  "primaryColor": "#0000FF",
  "notifications": {
    "email": false
  }
}
```

**Resposta de sucesso:**
```json
{
  "_id": "settings-id",
  "userId": "user-id",
  "theme": "light",
  "primaryColor": "#0000FF",
  "secondaryColor": "#000000",
  "notifications": {
    "email": false,
    "push": true,
    "sms": false
  },
  "privacy": {
    "profileVisibility": "private",
    "dataSharing": false
  },
  "createdAt": "2023-08-01T10:00:00Z",
  "updatedAt": "2023-08-01T11:00:00Z"
}
```

### Analytics

#### Obter Dados do Dashboard
```
GET /api/analytics/dashboard
```

**Resposta de sucesso:**
```json
{
  "stats": {
    "sites": 12,
    "backlinks": 142,
    "keywords": 86
  },
  "recentActivities": [
    {
      "_id": "activity-id",
      "userId": "user-id",
      "action": "add_site",
      "description": "Adicionou o site https://exemplo.com",
      "targetType": "site",
      "targetId": "site-id",
      "timestamp": "2023-08-01T14:30:00Z"
    }
  ],
  "statusDistribution": [
    {
      "_id": "pending",
      "count": 12
    },
    {
      "_id": "generated",
      "count": 30
    },
    {
      "_id": "published",
      "count": 100
    },
    {
      "_id": "rejected",
      "count": 5
    }
  ]
}
```

#### Obter Análises de um Site
```
GET /api/analytics/sites/:id
```

**Resposta de sucesso:**
```json
{
  "site": {
    "_id": "site-id",
    "userId": "user-id",
    "url": "https://exemplo.com",
    "domainAuthority": 50,
    "backlinkCount": 10,
    "keywords": ["palavra1", "palavra2"],
    "niche": "Tecnologia",
    "sitemapUrl": "https://exemplo.com/sitemap.xml",
    "lastAnalysis": "2023-08-01T10:00:00Z",
    "createdAt": "2023-08-01T10:00:00Z"
  },
  "backlinkCount": 24,
  "keywordCount": 15,
  "backlinks": [...],
  "keywords": [...]
}
```