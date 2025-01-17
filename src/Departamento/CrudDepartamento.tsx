import React from "react";
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from "../Auth/ContextoAutenticacao";
import Cabecalho from "../Auth/Cabecalho";

const CrudDepartamento: React.FC = () => {
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
        <div className='containerPadrao'>
           <div className="header">
              <div className="auth-container">
                <button className="auth-button" onClick={handleMenu}>Menu Principal</button>
              </div>
            </div>
           <div className="button-item">
            <span className="button-title">Departamentos</span>
            <Link to="/Departamento"><button className="button">Cadastrar</button></Link>
           </div>
           <div className="button-item">
            <Link to="/ConsultarDepartamento"><button className="button">Consultar/Editar/Deletar</button></Link>
           </div>
        </div>
    );
}

export default CrudDepartamento;