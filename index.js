// index.js
import express from 'express';
import dotenv from 'dotenv';
import imageroutes from './imageroutes.js';
import path from 'path';
import cors from 'cors';

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir requisições de outras origens (frontend, por exemplo)
app.use(cors());

// ⬇️ Middleware para parsear JSON com aumento do limite de payload
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Rota para processar upload e variações de imagem
app.use('/', imageroutes);

// Servidor iniciado
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
