import api from "./api";

export const getAllChamados = async () => {
  const res = await api.get("/chamados/all");
  return res.data;
};

export const getMyChamados = async () => {
  const res = await api.get("/chamados"); // seu backend usa GET /chamados para buscar chamados (veja r_chamados)
  return res.data;
};

export const createChamado = async (payload) => {
  const res = await api.post("/chamados", payload);
  return res.data;
};

export async function getChamadoById(id) {
  try {
    const response = await api.get(`/chamados/all`);
    const chamados = response.data;

    // convertemos tudo para objeto correto
    const chamado = chamados.find(c => c.id === Number(id));

    if (!chamado) {
      return null; // frontend decide o que fazer
    }

    return chamado;
  } catch (error) {
    console.error("Erro ao buscar chamado", error);
    throw error;
  }
}

export const updateChamado = async (id, payload) => {
  const res = await api.put(`/chamados/${id}`, payload);
  return res.data;
};

export const deleteChamado = async (id) => {
  const res = await api.delete(`/chamados/${id}`);
  return res.data;
};
