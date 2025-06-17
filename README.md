# Sistema de Gestão de Empreendimentos

Um sistema full-stack para gerenciamento de empreendimentos imobiliários, com autenticação de usuários e controle de acesso baseado em funções (RBAC).

## Tecnologias Utilizadas

### Backend
- Node.js com Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT para autenticação
- Docker para containerização

### Frontend
- React
- TypeScript
- Material-UI (MUI)
- React Router
- Axios para requisições HTTP
- Context API para gerenciamento de estado

## Estrutura do Projeto

```
.
├── backend/                 # Servidor Node.js/Express
│   ├── prisma/             # Schema e migrações do Prisma
│   │   ├── controllers/    # Controladores da aplicação
│   │   ├── middleware/     # Middlewares (auth, roles)
│   │   ├── routes/         # Rotas da API
│   │   └── scripts/        # Scripts utilitários
│   └── package.json
│
└── frontend/               # Aplicação React
    ├── public/
    ├── src/
    │   ├── components/     # Componentes React
    │   ├── contexts/       # Contextos (Auth)
    │   ├── pages/          # Páginas da aplicação
    │   └── App.tsx         # Componente principal
    └── package.json
```

## Funcionalidades

### Autenticação e Autorização
- Login com email e senha
- Tokens JWT para autenticação
- Controle de acesso baseado em funções (ADMIN, USER)
- Proteção de rotas no frontend e backend

### Empreendimentos
- CRUD completo de empreendimentos
- Campos:
  - Construtora
  - Nome do Empreendimento
  - Bairro
  - Tipo
  - Data de Entrega
- Listagem com paginação
- Formulários de criação e edição

### Usuários
- Gerenciamento de usuários
- Atribuição de funções
- Criação automática de usuário admin

## Configuração e Instalação

### Pré-requisitos
- Node.js (v14 ou superior)
- Docker e Docker Compose
- PostgreSQL

### Backend

1. Entre no diretório do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Execute as migrações do Prisma:
```bash
npx prisma migrate dev
```

5. Crie o usuário admin:
```bash
npm run create-admin
```

6. Inicie o servidor:
```bash
npm run dev
```

### Frontend

1. Entre no diretório do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Inicie a aplicação:
```bash
npm start
```

## Docker

Para executar o projeto usando Docker:

```bash
docker-compose up -d
```

## Estrutura do Banco de Dados

### User
- id: String (UUID)
- email: String
- password: String (hashed)
- role: Role (ADMIN, USER)
- createdAt: DateTime
- updatedAt: DateTime

### Empreendimento
- id: String (UUID)
- construtora: String
- nome: String
- bairro: String
- tipo: String
- dataEntrega: DateTime
- createdAt: DateTime
- updatedAt: DateTime

## API Endpoints

### Autenticação
- POST /api/auth/login - Login de usuário
- POST /api/auth/register - Registro de usuário

### Empreendimentos
- GET /api/empreendimentos - Lista todos os empreendimentos
- POST /api/empreendimentos - Cria um novo empreendimento
- GET /api/empreendimentos/:id - Obtém um empreendimento específico
- PUT /api/empreendimentos/:id - Atualiza um empreendimento
- DELETE /api/empreendimentos/:id - Remove um empreendimento

### Usuários
- GET /api/users - Lista todos os usuários (apenas ADMIN)
- POST /api/users - Cria um novo usuário (apenas ADMIN)
- GET /api/users/:id - Obtém um usuário específico
- PUT /api/users/:id - Atualiza um usuário
- DELETE /api/users/:id - Remove um usuário

## Segurança

- Autenticação via JWT
- Senhas hasheadas com bcrypt
- Middleware de autenticação
- Validação de funções (RBAC)
- Proteção contra CORS
- Validação de dados de entrada

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. 