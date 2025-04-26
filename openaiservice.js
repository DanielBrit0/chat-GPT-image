// openaiservice.js
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import dotenv from "dotenv";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_IMAGE_EDIT_URL = "https://api.openai.com/v1/images/edits";

export async function editImage({ imagePath, maskPath = null, prompt }) {
  try {
    const formData = new FormData();
    formData.append("image", fs.createReadStream(imagePath));
    formData.append("prompt", prompt);
    formData.append("n", "2");
    formData.append("size", "1024x1024");

    // A máscara é opcional, mas se fornecida deve ser PNG com transparência
    if (maskPath) {
      formData.append("mask", fs.createReadStream(maskPath));
    }

    const response = await axios.post(OPENAI_IMAGE_EDIT_URL, formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao editar imagem:", error.response?.data || error.message);
    throw error;
  }
}
