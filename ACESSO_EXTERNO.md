# Acesso Externo ao Sistema

## Configuração para Acesso via iPad/Dispositivos Externos

### 1. Descobrir o IP da sua máquina

**No macOS:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**No Windows:**
```cmd
ipconfig
```

**No Linux:**
```bash
ip addr show
```

### 2. Iniciar o Backend

```bash
cd backend
npm run dev
```

O backend estará disponível em: `http://SEU_IP:5001`

### 3. Iniciar o Frontend

```bash
cd frontend
npm run dev:external
```

O frontend estará disponível em: `http://SEU_IP:5173`

### 4. Acessar no iPad

1. Abra o Safari no iPad
2. Digite o endereço: `http://SEU_IP:5173`
3. Faça login normalmente

### 5. Configurações de Rede

**Importante:** Certifique-se de que:
- O iPad e o computador estão na mesma rede Wi-Fi
- O firewall não está bloqueando as portas 5001 e 5173
- O roteador permite comunicação entre dispositivos na rede local

### 6. Solução de Problemas

**Se não conseguir acessar:**

1. **Verificar se os serviços estão rodando:**
   ```bash
   # Backend
   curl http://localhost:5001/api/health
   
   # Frontend
   curl http://localhost:5173
   ```

2. **Verificar firewall:**
   - macOS: Preferências do Sistema > Segurança e Privacidade > Firewall
   - Windows: Configurações > Atualização e Segurança > Windows Defender > Firewall

3. **Testar conectividade:**
   ```bash
   ping SEU_IP
   ```

4. **Verificar logs:**
   - Backend: Verifique o terminal onde está rodando
   - Frontend: Verifique o terminal onde está rodando

### 7. URLs de Acesso

- **Frontend:** `http://SEU_IP:5173`
- **Backend API:** `http://SEU_IP:5001`

### 8. Exemplo Prático

Se seu IP for `10.0.0.186`:
- Frontend: `http://10.0.0.186:5173`
- Backend: `http://10.0.0.186:5001`

### 9. Configuração Automática

O sistema agora detecta automaticamente o IP da máquina e configura as URLs do backend adequadamente, então você só precisa:

1. Rodar `npm run dev:external` no frontend
2. Rodar `npm run dev` no backend
3. Acessar `http://SEU_IP:5173` no iPad 