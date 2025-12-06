import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext.jsx";

export default function Header() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header style={headerStyle}>
      <div>
        <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>
          <strong>Suporte</strong>
        </Link>
      </div>
      <nav>
        {token ? (
          <>
            <Link to="/chamados/novo" style={linkStyle}>Novo Chamado</Link>
            <button onClick={handleLogout} style={btnStyle}>Sair</button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Cadastrar</Link>
          </>
        )}
      </nav>
    </header>
  );
}

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 20px",
  background: "#4f46e5",
  color: "white"
};

const linkStyle = { marginRight: 12, color: "white", textDecoration: "none" };
const btnStyle = { background: "#ef4444", color: "white", border: "none", padding: "6px 10px", borderRadius: 4, cursor: "pointer" };
