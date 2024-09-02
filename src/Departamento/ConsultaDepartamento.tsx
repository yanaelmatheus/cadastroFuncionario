import React from "react";
import DataGridComponent from "../dataGrid";
import { useAuth } from "../Auth/ContextoAutenticacao";
import { useNavigate } from "react-router-dom";
import Cabecalho from "../Auth/Cabecalho";

const ConsultaDepartamento: React.FC = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/');
  };
      
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleMenu = () => {
    navigate('/');
  };

    return(
        <div className="containerPadrao">
           <div className="header">
              <div className="auth-container">
                <button className="auth-button" onClick={handleMenu}>Menu Principal</button>
              </div>
            </div>
           <div className="containerPadraoDividido">
           </div>
           <span className="button-title">Departamentos</span>
           <DataGridComponent tipoConsulta="Departamento"/>
        </div>
    );
}

export default ConsultaDepartamento;