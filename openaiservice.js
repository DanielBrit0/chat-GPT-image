// openaiservice.js
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import dotenv from "dotenv";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_IMAGE_VARIATION_URL = "https://api.openai.com/v1/images/variations";

export async function generateVariation({ imagePath }) {
  try {
    const formData = new FormData();
    formData.append("image", fs.createReadStream(imagePath));
    formData.append("n", "2"); // número de variações
    formData.append("size", "1024x1024");

    const response = await axios.post(OPENAI_IMAGE_VARIATION_URL, formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao gerar variação da imagem:", error.response?.data || error.message);
    throw error;
  }
}
