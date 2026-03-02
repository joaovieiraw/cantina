import axios from "axios";



const BASE_URL = "https://accurately-asp-bestsellers-lauderdale.trycloudflare.com/";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

export default api;

export const getStudents = async () => {
  try {
    const res = await api.get("/students");
    return res.data;
  } catch (err) {
    console.error("Erro ao buscar alunos:", err?.message || err);
    return [];
  }
};

export const getTickets = async () => {
  try {
    const res = await api.get("/tickets");
    return res.data;
  } catch (err) {
    console.error("Erro ao buscar tickets:", err?.message || err);
    return [];
  }
};
