import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext.jsx";

export default function Login() {
  const [form, setForm] = useState({ email: "", senha: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await login(form);
    if (res.ok) {
      navigate("/dashboard");
    } else {
      setError(res.mensagem || "Erro no login");
    }
  };

  return (
    <div style={box}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input name="email" placeholder="email" value={form.email} onChange={handleChange} required />
        <input name="senha" type="password" placeholder="senha" value={form.senha} onChange={handleChange} required />
        <button type="submit">Entrar</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>Não tem conta? <Link to="/register">Cadastre-se</Link></p>
    </div>
  );
}

const box = { maxWidth: 420, margin: "24px auto", padding: 20, border: "1px solid #eee", borderRadius: 8 };
const formStyle = { display: "flex", flexDirection: "column", gap: 10 };
