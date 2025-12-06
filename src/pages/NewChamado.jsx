import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createChamado } from "../api/chamadoService";

export default function NewChamado() {
  const [form, setForm] = useState({ titulo: "", descricao: "", categoria: "", prioridade: "baixa" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await createChamado(form);
      navigate("/dashboard");
    } catch (err) {
      setMsg(err?.response?.data?.mensagem || "Erro ao criar chamado");
    }
  };

  return (
    <div style={box}>
      <h2>Novo Chamado</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} required />
        <textarea name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} required rows={6} />
        <input name="categoria" placeholder="Categoria" value={form.categoria} onChange={handleChange} />
        <label>
          Prioridade:
          <select name="prioridade" value={form.prioridade} onChange={handleChange}>
            <option value="baixa">baixa</option>
            <option value="media">média</option>
            <option value="alta">alta</option>
          </select>
        </label>
        <button type="submit">Criar</button>
      </form>
      {msg && <p style={{ color: "red" }}>{msg}</p>}
    </div>
  );
}

const box = { maxWidth: 700, margin: "20px auto", padding: 18, border: "1px solid #eee", borderRadius: 6 };
const formStyle = { display: "flex", flexDirection: "column", gap: 10 };