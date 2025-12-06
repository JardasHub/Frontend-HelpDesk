import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getChamadoById, updateChamado } from "../api/chamadoService";

export default function EditChamado() {
  const { id } = useParams();
  const [form, setForm] = useState({ titulo: "", descricao: "", categoria: "", prioridade: "baixa", status: "aberto" });
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getChamadoById(id);
        // dependendo do retorno, se for array ou objeto, normalize:
        const chamado = Array.isArray(data) ? (data[0] || {}) : data;
        setForm({
          titulo: chamado.titulo || "",
          descricao: chamado.descricao || "",
          categoria: chamado.categoria || "",
          prioridade: chamado.prioridade || "baixa",
          status: chamado.status || "aberto",
        });
      } catch (err) {
        setMsg(err?.response?.data?.mensagem || "Não foi possível carregar o chamado");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateChamado(id, form);
      navigate("/dashboard");
    } catch (err) {
      setMsg(err?.response?.data?.mensagem || "Erro ao atualizar");
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div style={box}>
      <h2>Editar Chamado</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} required />
        <textarea name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} rows={6} required />
        <input name="categoria" placeholder="Categoria" value={form.categoria} onChange={handleChange} />
        <label>
          Prioridade:
          <select name="prioridade" value={form.prioridade} onChange={handleChange}>
            <option value="baixa">baixa</option>
            <option value="media">média</option>
            <option value="alta">alta</option>
          </select>
        </label>
        <label>
          Status:
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="aberto">aberto</option>
            <option value="em andamento">em andamento</option>
            <option value="fechado">fechado</option>
          </select>
        </label>
        <button type="submit">Salvar</button>
      </form>
      {msg && <p style={{ color: "red" }}>{msg}</p>}
    </div>
  );
}

const box = { maxWidth: 700, margin: "20px auto", padding: 18, border: "1px solid #eee", borderRadius: 6 };
const formStyle = { display: "flex", flexDirection: "column", gap: 10 };
