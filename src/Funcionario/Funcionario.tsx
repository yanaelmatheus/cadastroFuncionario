import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Funcionario: React.FC = () => {
  /*const[usuario, setUsuario] = useState<string>("");
  const[senha, setSenha] = useState<string>("");*/
  const[nome, setNome] = useState<string>("");
  const[sexo, setSexo] = useState<string>("");
  const[idDepartamento, setIdDepartamento] = useState<string>();
  const[idFuncionario, setIdFuncionario] = useState<Number>();
  const[error, setError] = useState<string>();
  const[departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    carregarDepartamentos();
  }, []);

  /*useEffect(() => {
    if(idFuncionario){
      cadastrarUsuario();
    }
  }, [idFuncionario]);*/

  /*interface Usuario{
    idUsuario: Number | undefined;
    user: string;
    senha: string;
    idFuncionario: Number | undefined;
  }*/

  /*const cadastrarUsuario = async () => {
    try {
      let user: Usuario = {idUsuario: undefined, user: usuario, senha: senha, idFuncionario: idFuncionario};

      let response = await axios.post('http://localhost:8081/Usuario', JSON.stringify(user),
                                                                                        {
                                                                                          headers: {
                                                                                            'Content-Type': 'application/json'
                                                                                          }
                                                                                        });
      if(response.data){
        navigate("/Home");
      }
      setError(undefined);
    } catch (err) {
      setError('Erro ao enviar dados');
      console.log(error);
    }
  }*/

  const carregarDepartamentos = async () => {

    try {
      let response = await axios.get('http://localhost:8081/Departamento');

      setDepartamentos(response.data);
      setError(undefined);
    } catch (err) {
      setError('Erro ao enviar dados');
      console.log(error);
    }
  }

  interface Departamento{
    id: number | undefined;
    nome: string;
}

  interface Funcionario{
    nome: string;
    sexo: string;
    idDepartamento: Number;
  }

  const handleEnviar = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      let funcionario: Funcionario = {nome: nome, sexo: sexo, idDepartamento: new Number(idDepartamento)};

      let response = await axios.post('http://localhost:8081/Funcionario', JSON.stringify(funcionario),
                                                                                        {
                                                                                          headers: {
                                                                                            'Content-Type': 'application/json'
                                                                                          }
                                                                                        });
      setIdFuncionario(response.data.idFuncionario);
      navigate('/CrudFuncionario');
      setError(undefined);
    } catch (err) {
      setError('Erro ao enviar dados');
      console.log(error);
    }
  }

  /*const handleUsuario = (event: ChangeEvent<HTMLInputElement>) =>{
    setUsuario(event.target.value);
  }

  const handleSenha = (event: ChangeEvent<HTMLInputElement>) =>{
    setSenha(event.target.value);
  }*/

  const handleNome = (event: ChangeEvent<HTMLInputElement>) =>{
    setNome(event.target.value);
  }

  const handleSexo = (event: React.ChangeEvent<HTMLSelectElement>) =>{
    setSexo(event.target.value);
  }

  const handleDepartamento = (event: React.ChangeEvent<HTMLSelectElement>) =>{
    setIdDepartamento(event.target.value);
  }

  const handleMenu = () => {
    navigate('/');
  };

  const formatarData = (data: string) => {
    const date = new Date(data);
    return date;
  };

  return (
    <div className='form-grid'>
      <div className="header">
        <div className="auth-container">
          <button className="auth-button" onClick={handleMenu}>Menu Principal</button>
        </div>
      </div>
      <form onSubmit={handleEnviar} className='conteudo-form'>
        <div className='half-width'>
          <label>
            Nome:
            <input type='text' 
                  value={nome}
                  onChange={handleNome}
                  required>
            </input>
          </label>
        </div>

        <div className='half-width'>
          <label>
            Sexo:
            <select value={sexo}
                    onChange={handleSexo}
                    required={true}>
              <option value="">Selecione o Sexo</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </select>
          </label>
        </div>

        <div className='half-width'>
          <label>
            Departamento:
            <select value={idDepartamento}
                    onChange={handleDepartamento}
                    required={true}>
              <option value="">Selecione um Departamento</option>
              {departamentos.map((departamento) => (
                <option value={departamento.id}>
                  {departamento.nome}
                </option>
              ))}
            </select>
          </label>
        </div>
        
        <button type='submit'>Cadastrar</button>
      </form>
    </div>
  );
}

export default Funcionario;