// imageroutes.js
import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import { generateImageVariation } from "./openaiService.js";

// Necessário para manipular __dirname com ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Setup do multer (upload)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/generate-variation", upload.single("image"), async (req, res) => {
  try {
    const prompt = req.body.prompt || null;
    const imagePath = req.file.path;
    const result = await generateImageVariation(imagePath, prompt);
    res.json(result);
  } catch (error) {
    console.error("Erro na rota /generate-variation:", error);
    res.status(500).json({ error: "Erro ao processar imagem" });
  }
});

export default router;
