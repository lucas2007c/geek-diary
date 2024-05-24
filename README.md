# ⚙ Configuração do Ambiente:

- Terminal 1 - Frontend:
```bash
 cd frontend
```
```bash
 npm i
```
```bash
 npm run start:tunnel
```
# A api está hospedada no render. para rodar localmente:
Mude a API_URL na pasta frontend/constants para 'http://localhost:3000'
- Terminal 2 - backend:
```bash
 cd backend
```
```bash
 npm i
```
```bash
 npx prisma db push
```
```bash
 npx prisma generate
```
```bash
 npm start
```

IFSP - Campus Caraguatatuba - Brasil
