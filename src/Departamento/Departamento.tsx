import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import DepartamentoType from "../Interfaces/DepartamentoType";
import { useAuth } from "../Auth/ContextoAutenticacao";
import { useNavigate } from "react-router-dom";
import Cabecalho from "../Auth/Cabecalho";

const Departamento: React.FC = () => {
  const[nomeDepartamento, setNomeDepartamento] = useState<string>("");
  const[error, setError] = useState<string>();
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleEnviar = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      let departamento: DepartamentoType = {idDepartamento: undefined, nome: nomeDepartamento};

      await axios.post('http://localhost:8081/Departamento', JSON.stringify(departamento),
                                                                                        {
                                                                                          headers: {
                                                                                            'Content-Type': 'application/json'
                                                                                          }
                                                                                        });

      setError(undefined);
      navigate('/CrudDepartamento');
    } catch (err) {
      setError('Erro ao enviar dados');
      console.log(error);
    }
  }

  const handleNomeDepartamento = (event: ChangeEvent<HTMLInputElement>) =>{
    setNomeDepartamento(event.target.value);
  }

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

  return (
    <div className='containerPadrao'>
        <div className="header">
          <div className="auth-container">
            <button className="auth-button" onClick={handleMenu}>Menu Principal</button>
          </div>
        </div>
        <div className='form-grid'>
        <form onSubmit={handleEnviar} className='conteudo-form'>
          <div className='half-width'>
            <label>
              Nome Departamento:
              <input type='text' 
                    value={nomeDepartamento}
                    onChange={handleNomeDepartamento}
                    required>
              </input>
            </label>
          </div>
          <button type='submit'>Cadastrar</button>
        </form>
        </div>
    </div>
  );
}

export default Departamento;