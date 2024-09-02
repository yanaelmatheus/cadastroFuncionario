import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuth } from "./Auth/ContextoAutenticacao";
import UsuarioType from "./Interfaces/UsuarioType";

const Home: React.FC = () => {
    const[usuario, setUsuario] = useState<string>("");
    const[senha, setSenha] = useState<string>("");
    const[error, setError] = useState<string>();
    const[usuarioEncontrado, setUsuarioEncontrado] = useState<UsuarioType>();
    const navigate = useNavigate();
    const { user, login, logout, setFuncionario } = useAuth();

    useEffect(() => {
        if(usuarioEncontrado){
            login({id: usuarioEncontrado.idUsuario.toString(), name: usuarioEncontrado.user});
            setFuncionario({idFuncionario: usuarioEncontrado.idFuncionario});
            navigate("/Menu");
        }
      }, [usuarioEncontrado]);

    const handleUsuario = (event: ChangeEvent<HTMLInputElement>) =>{
        setUsuario(event.target.value);
    }
    
    const handleSenha = (event: ChangeEvent<HTMLInputElement>) =>{
        setSenha(event.target.value);
    }

    interface Usuario{
        idUsuario: Number | undefined;
        user: string;
        senha: string;
        idFuncionario: Number | undefined;
      }

    const handleEnviar = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        try {
            let user: Usuario = {idUsuario: undefined, user: usuario, senha: senha, idFuncionario: undefined};

            let response = await axios.post('http://localhost:8081/Usuario/logar', JSON.stringify(user),
                                                                                              {
                                                                                                headers: {
                                                                                                  'Content-Type': 'application/json'
                                                                                                }
                                                                                              });
            setUsuarioEncontrado(response.data);
          setError(undefined);
        } catch (err) {
          setError('Erro ao enviar dados');
          console.log(error);
        }
      }

    return(
        <div className='form-grid'>
            <form onSubmit={handleEnviar} className='conteudo-form'>
                <div className='half-width'>
                <label>
                    Usuario:
                    <input type='text' 
                        value={usuario}
                        onChange={handleUsuario}
                        required>
                    </input>
                </label>
                </div>
                
                <div className='half-width'>
                <label>
                    Senha:
                    <input type='text' 
                        value={senha}
                        onChange={handleSenha}
                        required>
                    </input>
                </label>
                </div>

                <button type='submit'>Login</button>

                <div>
                    <Link to="/Funcionario">Registrar-se</Link>
                </div>
            </form>
        </div>
    );
}

export default Home;