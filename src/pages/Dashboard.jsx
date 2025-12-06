import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllChamados } from "../api/chamadoService";
import { deleteChamado } from "../api/chamadoService";

export default function Dashboard() {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllChamados();
      setChamados(data);
    } catch (err) {
      setError(err?.response?.data?.mensagem || "Erro ao carregar chamados");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Remover chamado?")) return;
    try {
      await deleteChamado(id);
      setChamados(chamados.filter((c) => c.id !== id));
    } catch (err) {
      alert(err?.response?.data?.mensagem || "Erro ao remover");
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <h2>Chamados</h2>
      <Link to="/chamados/novo">+ Novo Chamado</Link>
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {chamados.map((c) => (
          <li key={c.id} style={itemStyle}>
            <div>
              <strong>{c.titulo}</strong>
              <p style={{ margin: 0 }}>
                {c.descricao?.slice(0, 120)}
                {c.descricao && c.descricao.length > 120 ? "..." : ""}
              </p>
              <small>
                Categoria: {c.categoria || "—"} | Prioridade: {c.prioridade}
              </small>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Link to={`/chamados/${c.id}/editar`}>Editar</Link>
              <button onClick={() => handleDelete(c.id)} style={delBtn}>
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
      {chamados.length === 0 && !loading && <p>Nenhum chamado encontrado.</p>}
    </div>
  );
}

const itemStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "12px",
  borderBottom: "1px solid #eee",
  alignItems: "center",
};

const delBtn = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: 4,
  cursor: "pointer",
};
