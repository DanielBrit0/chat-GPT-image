// openaiservice.js
import axios from "axios";
import fs from "fs";
import FormData from "form-data";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const OPENAI_IMAGE_EDIT_URL = "https://api.openai.com/v1/images/edits";
const OPENAI_IMAGE_VARIATION_URL = "https://api.openai.com/v1/images/variations";

// Função para editar a imagem com um prompt (caso tenha prompt)
export async function editImage({ imagePath, prompt }) {
  try {
    const formData = new FormData();
    formData.append("image", fs.createReadStream(imagePath));
    formData.append("mask", fs.createReadStream(imagePath)); // Pode usar a própria imagem como máscara
    formData.append("prompt", prompt);
    formData.append("n", "2");
    formData.append("size", "1024x1024");

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

// Função para criar variações da imagem (caso NÃO tenha prompt)
export async function createVariation({ imagePath }) {
  try {
    const formData = new FormData();
    formData.append("image", fs.createReadStream(imagePath));
    formData.append("n", "2");
    formData.append("size", "1024x1024");

    const response = await axios.post(OPENAI_IMAGE_VARIATION_URL, formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao criar variação de imagem:", error.response?.data || error.message);
    throw error;
  }
}
