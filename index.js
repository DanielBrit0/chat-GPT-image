// index.js
import express from 'express';
import dotenv from 'dotenv';
import imageRoutes from './imageRoutes.js';
import path from 'path';
import cors from 'cors';

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir requisições de outras origens (frontend, por exemplo)
app.use(cors());

// Middleware para parsear JSON (caso necessário futuramente)
app.use(express.json());

// Rota para processar upload e variações de imagem
app.use('/', imageRoutes);

// Servidor iniciado
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
