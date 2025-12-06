import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext.jsx";

export default function Register() {
  const [form, setForm] = useState({ nome: "", email: "", senha: "", perfil: "usuario" });
  const [msg, setMsg] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    const res = await register(form);
    if (res.ok) {
      setMsg("Cadastrado com sucesso! Faça login.");
      setTimeout(() => navigate("/login"), 900);
    } else {
      setMsg(res.mensagem || "Erro ao cadastrar");
    }
  };

  return (
    <div style={box}>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="senha" type="password" placeholder="Senha" value={form.senha} onChange={handleChange} required />
        <label>
          Perfil:
          <select name="perfil" value={form.perfil} onChange={handleChange}>
            <option value="usuario">Usuário</option>
            <option value="tecnico">Técnico</option>
          </select>
        </label>
        <button type="submit">Cadastrar</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}

const box = { maxWidth: 520, margin: "24px auto", padding: 20, border: "1px solid #eee", borderRadius: 8 };
const formStyle = { display: "flex", flexDirection: "column", gap: 10 };
