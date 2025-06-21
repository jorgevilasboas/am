# Sistema de Gestão de Empreendimentos - Vilas Boas Tech

Um sistema full-stack para gerenciamento de empreendimentos imobiliários e leads, desenvolvido para a Vilas Boas Tech. O sistema oferece autenticação de usuários, controle de acesso baseado em funções (RBAC) e funcionalidades completas de CRUD para empreendimentos e leads.

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** com Express
- **TypeScript** para tipagem estática
- **Prisma ORM** para gerenciamento do banco de dados
- **PostgreSQL** como banco de dados principal
- **JWT** para autenticação
- **bcryptjs** para hash de senhas
- **Multer** para upload de arquivos
- **CORS** para comunicação cross-origin

### Frontend
- **React 18** com TypeScript
- **Material-UI (MUI)** para componentes de interface
- **React Router** para navegação
- **Axios** para requisições HTTP
- **React Query** para gerenciamento de estado do servidor
- **React Number Format** para formatação de valores monetários
- **date-fns** para manipulação de datas
- **Vite** como bundler e dev server
- **Tailwind CSS** para estilização adicional

## 📁 Estrutura do Projeto

```
am/
├── backend/                 # Servidor Node.js/Express
│   ├── prisma/             # Schema e migrações do Prisma
│   │   ├── migrations/     # Migrações do banco de dados
│   │   └── schema.prisma   # Schema do banco de dados
│   ├── src/
│   │   ├── controllers/    # Controladores da aplicação
│   │   ├── middlewares/    # Middlewares (auth, error handling)
│   │   ├── models/         # Modelos de dados
│   │   ├── routes/         # Rotas da API
│   │   ├── scripts/        # Scripts utilitários
│   │   ├── utils/          # Utilitários (upload, etc.)
│   │   └── server.ts       # Arquivo principal do servidor
│   ├── uploads/            # Arquivos enviados pelos usuários
│   └── package.json
│
└── frontend/               # Aplicação React
    ├── src/
    │   ├── components/     # Componentes React reutilizáveis
    │   ├── contexts/       # Contextos (Auth)
    │   ├── pages/          # Páginas da aplicação
    │   ├── services/       # Serviços de API
    │   ├── theme/          # Configuração do tema MUI
    │   ├── types/          # Definições de tipos TypeScript
    │   ├── utils/          # Utilitários (formatação, etc.)
    │   ├── App.tsx         # Componente principal
    │   ├── main.tsx        # Ponto de entrada
    │   └── routes.tsx      # Configuração de rotas
    └── package.json
```

## 🎯 Funcionalidades Principais

### 🔐 Autenticação e Autorização
- **Login/Logout** com email e senha
- **Registro de usuários** com aprovação pendente
- **Tokens JWT** para autenticação persistente
- **Controle de acesso baseado em funções** (ADMIN, USER)
- **Proteção de rotas** no frontend e backend
- **Middleware de autenticação** para APIs protegidas

### 🏢 Gestão de Empreendimentos
- **CRUD completo** de empreendimentos
- **Campos principais:**
  - Construtora (texto)
  - Nome do Empreendimento
  - Bairro
  - Tipo de imóvel
  - Data de Entrega
  - Descrição
  - Status (ACTIVE/INACTIVE)
  - Renda mínima
  - Link da tabela de preços
  - Área (de/até)
  - Número de unidades
- **Upload de arquivos** (books em PDF)
- **Listagem com paginação e ordenação**
- **Busca por texto** em múltiplos campos
- **Formulários de criação e edição**
- **Download de arquivos** anexados

### 👥 Gestão de Leads
- **CRUD completo** de leads
- **Campos principais:**
  - Nome
  - Telefone
  - Email (opcional)
  - Link do CRM (opcional)
  - Renda
  - Data de Nascimento
  - Valor de entrada
  - Anotações
- **Listagem com ordenação e busca**
- **Formulários modais** para criação/edição
- **Formatação automática** de valores monetários

### 👤 Gestão de Usuários
- **Listagem de usuários** (apenas ADMIN)
- **Criação de novos usuários**
- **Edição de perfis**
- **Atribuição de funções**
- **Aprovação de usuários**
- **Exclusão de usuários** (com proteções)

## 🗄️ Estrutura do Banco de Dados

### User
```sql
- id: String (UUID)
- email: String (único)
- name: String
- password: String (hashed)
- role: Role (ADMIN, USER)
- aprovado: Boolean (default: false)
- createdAt: DateTime
- updatedAt: DateTime
```

### Empreendimento
```sql
- id: String (UUID)
- construtora: String
- empreendimento: String
- bairro: String
- tipo: String
- dataEntrega: DateTime
- description: String
- status: String (default: "ACTIVE")
- renda: Float (opcional)
- tabelaLink: String (opcional)
- book: String (opcional)
- bookOriginalName: String (opcional)
- area_de: Decimal(10,2) (opcional)
- area_ate: Decimal(10,2) (opcional)
- unidades: Int (opcional)
- createdAt: DateTime
- updatedAt: DateTime
```

### Lead
```sql
- id: String (UUID)
- nome: String
- telefone: String
- email: String (opcional)
- crmLink: String (opcional)
- renda: Float (opcional)
- dataNascimento: DateTime (opcional)
- entrada: Float (opcional)
- anotacoes: String (opcional)
- createdAt: DateTime
- updatedAt: DateTime
```

## 🔌 API Endpoints

### Autenticação
- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/signup` - Registro de usuário

### Empreendimentos
- `GET /api/empreendimentos` - Lista todos os empreendimentos
- `POST /api/empreendimentos` - Cria um novo empreendimento
- `GET /api/empreendimentos/:id` - Obtém um empreendimento específico
- `PUT /api/empreendimentos/:id` - Atualiza um empreendimento
- `DELETE /api/empreendimentos/:id` - Remove um empreendimento
- `GET /api/empreendimentos/:id/book-info` - Informações do arquivo book
- `GET /api/empreendimentos/:id/download-book` - Download do arquivo book

### Leads
- `GET /api/leads` - Lista todos os leads
- `POST /api/leads` - Cria um novo lead
- `GET /api/leads/:id` - Obtém um lead específico
- `PUT /api/leads/:id` - Atualiza um lead
- `DELETE /api/leads/:id` - Remove um lead

### Usuários
- `GET /api/users` - Lista todos os usuários (apenas ADMIN)
- `POST /api/users` - Cria um novo usuário (apenas ADMIN)
- `GET /api/users/:id` - Obtém um usuário específico
- `PUT /api/users/:id` - Atualiza um usuário
- `DELETE /api/users/:id` - Remove um usuário (apenas ADMIN)

## 🚀 Deploy Automático

O projeto está configurado para deploy automático usando GitHub Actions:

- **Backend**: Deploy automático no Railway
- **Frontend**: Deploy automático no Vercel
- **CI/CD**: GitHub Actions para integração contínua

### 📋 Configuração Rápida

1. **Railway**: Conecte o repositório e configure as variáveis de ambiente
2. **Vercel**: Importe o projeto e configure o diretório `frontend`
3. **GitHub Secrets**: Configure os tokens necessários
4. **Push para main**: Deploy automático é disparado

Veja o guia completo em [DEPLOY.md](./DEPLOY.md)

## 🛠️ Configuração e Instalação

### Pré-requisitos
- Node.js (v16 ou superior)
- PostgreSQL
- Docker (opcional, para rodar o banco)

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

4. Configure o arquivo `.env` com suas credenciais:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/am"
JWT_SECRET="seu_jwt_secret_aqui"
PORT=5001
```

5. Execute as migrações do Prisma:
```bash
npx prisma migrate dev
```

6. Gere o cliente Prisma:
```bash
npx prisma generate
```

7. Crie o usuário admin:
```bash
npm run create-admin
```

8. Inicie o servidor:
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

4. Configure o arquivo `.env`:
```env
VITE_API_URL=http://localhost:5001
```

5. Inicie a aplicação:
```bash
npm run dev
```

## 🐳 Docker

Para executar o projeto usando Docker:

```bash
# Backend
cd backend
docker-compose up -d

# Frontend
cd frontend
docker-compose up -d
```

## 🔒 Segurança

- **Autenticação via JWT** com expiração
- **Senhas hasheadas** com bcrypt
- **Middleware de autenticação** em rotas protegidas
- **Validação de funções** (RBAC)
- **Proteção contra CORS**
- **Validação de dados** de entrada
- **Sanitização de arquivos** uploadados

## 🎨 Interface do Usuário

- **Design responsivo** com Material-UI
- **Tema personalizado** com cores da Vilas Boas Tech
- **Navegação intuitiva** com menu lateral
- **Tabelas interativas** com ordenação e busca
- **Formulários modais** para melhor UX
- **Notificações** e feedback visual
- **Upload de arquivos** com drag & drop

## 📊 Funcionalidades Avançadas

- **Busca em tempo real** em tabelas
- **Ordenação por múltiplos campos**
- **Formatação automática** de valores monetários
- **Upload e download** de arquivos PDF
- **Validação de formulários** em tempo real
- **Gestão de estado** com React Query
- **Tratamento de erros** global

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT.

## 👥 Equipe

Desenvolvido para **Vilas Boas Tech** - Sistema de Gestão de Empreendimentos Imobiliários. 