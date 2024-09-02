import React from "react";
import {Link, useNavigate} from 'react-router-dom';
import DataGridFuncionario from "../dataGrid";
import DataGridComponent from "../dataGrid";
import { useAuth } from "../Auth/ContextoAutenticacao";
import Cabecalho from "../Auth/Cabecalho";

const ConsultaFuncionario: React.FC = () => {
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
           <span className="button-title">Funcionarios</span>
           <DataGridComponent tipoConsulta="Funcionario"/>
        </div>
    );
}

export default ConsultaFuncionario;