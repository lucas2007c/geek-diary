# ⚙ Configuração do Ambiente:

- Terminal 1 - Frontend:
```bash
 cd frontend
```
```bash
 npm i
```
### Caso vá testar no computador:
```bash
 npm start
```
e então aperte W para abrir no navegador
### Caso vá testar no celular:
```bash
 npm run start:tunnel
```

- Terminal 2 - backend:
```bash
 cd backend
```
```bash
 npm i
```
# A api está hospedada no render. para rodar localmente:
Mude a API_URL na pasta frontend/constants para 'http://localhost:3000'
```bash
 npx prisma db push
```
```bash
 npx prisma generate
```
```bash
 npm run dev
```
```bash
 npm start
```

IFSP - Campus Caraguatatuba - Brasil
