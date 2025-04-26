// imageroutes.js
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { v4 as uuidv4 } from "uuid";
import { generateVariation } from "./openaiservice.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Rota para quando a imagem vem em base64 (usado pelo Google Apps Script)
router.post("/generate-variation", async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: "Imagem base64 não fornecida." });
    }

    // Extrai apenas o conteúdo base64 (remove cabeçalho data:image/png;base64,...)
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    // Salva temporariamente a imagem no servidor
    const tempDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    const tempFilePath = path.join(tempDir, `${uuidv4()}.png`);
    fs.writeFileSync(tempFilePath, buffer);

    // Gera variações com OpenAI
    const result = await generateVariation({ imagePath: tempFilePath });

    // Remove imagem temporária
    fs.unlinkSync(tempFilePath);

    res.json(result);
  } catch (error) {
    console.error("Erro ao gerar variação:", error);
    res.status(500).json({ error: "Erro ao processar imagem base64." });
  }
});

export default router;
