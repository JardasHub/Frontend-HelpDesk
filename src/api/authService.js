import api from "./api";

export const login = async ({ email, senha }) => {
  const res = await api.post("/auth/login", { email, senha });
  return res.data; // { mensagem, token }
};

export const register = async ({ nome, email, senha, perfil }) => {
  const res = await api.post("/usuarios", { nome, email, senha, perfil });
  return res.data;
};
