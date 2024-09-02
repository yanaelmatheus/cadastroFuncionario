import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "./Auth/ContextoAutenticacao";
import Cabecalho from "./Auth/Cabecalho";

const Menu: React.FC = () => {
    const { user, login, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/');
      };
    
      const handleLogout = () => {
        logout();
        navigate('/');
      };

    return(
        <div className='containerPadrao'>
           <div className="button-item">
            <span className="button-title">Departamentos</span>
            <Link to="/CrudDepartamento"><button className="button">Departamentos</button></Link>
           </div>
           <div className="button-item">
            <span className="button-title">Funcionarios</span>
            <Link to="/CrudFuncionario"><button className="button">Funcionario</button></Link>
           </div>
        </div>
    );
}

export default Menu;