# 🚀 Guia de Deploy Automático

Este guia explica como configurar o deploy automático do backend no Railway e frontend no Vercel usando GitHub Actions.

## 📋 Pré-requisitos

1. **Conta no GitHub** com o repositório do projeto
2. **Conta no Railway** (railway.app)
3. **Conta no Vercel** (vercel.com)
4. **Banco PostgreSQL** (pode ser Railway, Supabase, etc.)

## 🔧 Configuração do Backend (Railway)

### 1. Criar projeto no Railway

1. Acesse [railway.app](https://railway.app)
2. Clique em "New Project"
3. Selecione "Deploy from GitHub repo"
4. Conecte sua conta GitHub e selecione o repositório
5. Configure o diretório como `backend`

### 2. Configurar variáveis de ambiente

No Railway, vá em "Variables" e adicione:

```env
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key
PORT=3001
CORS_ORIGIN=https://your-vercel-app.vercel.app
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760
```

### 3. Configurar banco de dados

1. No Railway, clique em "New"
2. Selecione "Database" → "PostgreSQL"
3. Copie a URL do banco e configure em `DATABASE_URL`
4. Execute as migrações: `railway run npx prisma migrate deploy`

## 🌐 Configuração do Frontend (Vercel)

### 1. Conectar repositório no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Importe o repositório do GitHub
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 2. Configurar variáveis de ambiente

No Vercel, vá em "Settings" → "Environment Variables":

```env
VITE_API_URL=https://your-railway-app.railway.app
```

## 🔑 Configuração do GitHub Actions

### 1. Configurar secrets no GitHub

No seu repositório GitHub, vá em "Settings" → "Secrets and variables" → "Actions" e adicione:

- `RAILWAY_TOKEN`: Token do Railway (obtenha em railway.app/account)
- `VERCEL_TOKEN`: Token do Vercel (obtenha em vercel.com/account/tokens)
- `VERCEL_ORG_ID`: ID da organização Vercel
- `VERCEL_PROJECT_ID`: ID do projeto Vercel

### 2. Obter tokens

**Railway Token:**
1. Acesse [railway.app/account](https://railway.app/account)
2. Vá em "Tokens"
3. Clique em "Create Token"
4. Copie o token

**Vercel Token:**
1. Acesse [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Clique em "Create"
3. Copie o token

**Vercel IDs:**
1. No projeto Vercel, vá em "Settings"
2. Copie o "Project ID"
3. Para o "Org ID", vá em "Settings" da organização

## 🚀 Deploy Automático

### 1. Push para main

Após configurar tudo, faça push para a branch `main`:

```bash
git add .
git commit -m "Configure deploy automático"
git push origin main
```

### 2. Verificar deploy

- **Railway**: Acesse o dashboard do Railway para ver o status
- **Vercel**: Acesse o dashboard do Vercel para ver o status
- **GitHub Actions**: Vá em "Actions" no GitHub para ver os logs

## 🔄 Workflow de Desenvolvimento

1. **Desenvolvimento local**: Use `npm run dev` em ambos os projetos
2. **Teste**: Faça push para uma branch de feature
3. **Deploy**: Merge para `main` dispara deploy automático
4. **Produção**: Acesse as URLs do Railway e Vercel

## 📝 URLs de Produção

Após o deploy, você terá:

- **Backend**: `https://your-app.railway.app`
- **Frontend**: `https://your-app.vercel.app`

## 🛠️ Troubleshooting

### Problemas comuns:

1. **Erro de CORS**: Verifique se `CORS_ORIGIN` está correto
2. **Erro de banco**: Verifique se `DATABASE_URL` está correto
3. **Build falha**: Verifique os logs no GitHub Actions
4. **Variáveis não carregam**: Verifique se estão configuradas corretamente

### Comandos úteis:

```bash
# Verificar logs do Railway
railway logs

# Executar comando no Railway
railway run npm run prisma:migrate

# Verificar status do Vercel
vercel ls
```

## 🔒 Segurança

- Nunca commite arquivos `.env` no Git
- Use secrets do GitHub para tokens sensíveis
- Configure CORS adequadamente
- Use HTTPS em produção
- Mantenha dependências atualizadas 