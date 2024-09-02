import React, { ChangeEvent, ChangeEventHandler, SelectHTMLAttributes, useState } from "react";
import { useAuth } from "../Auth/ContextoAutenticacao";
import { useNavigate } from "react-router-dom";
import Cabecalho from "../Auth/Cabecalho";
import axios from "axios";

const Ponto: React.FC = () => {
  const[error, setError] = useState<string>();
  const { user, login, logout, func } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
      navigate('/');
  };
    
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  interface Ponto{
    dataHoraPonto: Date;
    idFuncionario: Number;
  }

  const handleEnviar = async (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    try {
      if(user && func){
        const now = new Date();
        let ponto: Ponto = {dataHoraPonto: now, idFuncionario: func.idFuncionario};

        let response = await axios.post('http://localhost:8081/Ponto', JSON.stringify(ponto),
                                                                                          {
                                                                                            headers: {
                                                                                              'Content-Type': 'application/json'
                                                                                            }
                                                                                          });
        setError(undefined);
      }
    } catch (err) {
      setError('Erro ao enviar dados');
      console.log(error);
    }
  }

  return (
    <div className='containerPadrao'>
        <Cabecalho user={user} handleLogin={handleLogin} handleLogout={handleLogout} />
        <span className="button-title">Bater Ponto</span>
        <form onSubmit={handleEnviar}>
            <button type='submit' className="button">Bater Ponto</button>
        </form>
    </div>
    )
        
}

export default Ponto;