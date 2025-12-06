import React, { createContext, useContext, useEffect, useState } from "react";
import { login as loginAPI, register as registerAPI } from "../api/authService";
import api from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(() => localStorage.getItem("suporte_token") || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userToken) {
      localStorage.setItem("suporte_token", userToken);
    } else {
      localStorage.removeItem("suporte_token");
    }
  }, [userToken]);

  const login = async ({ email, senha }) => {
    setLoading(true);
    try {
      const data = await loginAPI({ email, senha });
      if (data && data.token) {
        setUserToken(data.token);
        return { ok: true, mensagem: data.mensagem || "Logado" };
      }
      return { ok: false, mensagem: data?.mensagem || "Resposta inesperada" };
    } catch (err) {
      const msg = err?.response?.data?.mensagem || "Erro ao efetuar login";
      return { ok: false, mensagem: msg };
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ nome, email, senha, perfil }) => {
    setLoading(true);
    try {
      const data = await registerAPI({ nome, email, senha, perfil });
      return { ok: true, data };
    } catch (err) {
      const msg = err?.response?.data?.mensagem || "Erro ao cadastrar";
      return { ok: false, mensagem: msg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUserToken(null);
    api.defaults.headers.common["Authorization"] = "";
  };

  return (
    <AuthContext.Provider value={{ token: userToken, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
