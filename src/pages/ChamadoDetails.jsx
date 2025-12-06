import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChamadoById } from "../api/chamadoService";

export default function ChamadoDetails() {
  const { id } = useParams();
  const [chamado, setChamado] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getChamadoById(id);
        const c = Array.isArray(data) ? data[0] : data;
        setChamado(c);
      } catch (err) {
        setError(err?.response?.data?.mensagem || "Erro ao carregar");
      }
    };
    load();
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!chamado) return <p>Carregando...</p>;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <h2>{chamado.titulo}</h2>
      <p>{chamado.descricao}</p>
      <p><strong>Categoria:</strong> {chamado.categoria || "—"}</p>
      <p><strong>Prioridade:</strong> {chamado.prioridade}</p>
      <p><strong>Status:</strong> {chamado.status}</p>
      <p><strong>Usuário:</strong> {chamado.usuario ? chamado.usuario.nome : "—"}</p>
    </div>
  );
}
