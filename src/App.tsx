import './App.css';
import { Route, Routes } from 'react-router-dom';
import Funcionario from './Funcionario/Funcionario';
import Home from './Home';
import CrudFuncionario from './Funcionario/CrudFuncionario';
import Departamento from './Departamento/Departamento';
import CrudDepartamento from './Departamento/CrudDepartamento';
import ConsultaFuncionario from './Funcionario/ConsultaFuncionario';
import ConsultaDepartamento from './Departamento/ConsultaDepartamento';
import Ponto from './Ponto/Ponto';
import Menu from './Menu';
import { ContextoAutenticacao } from './Auth/ContextoAutenticacao';

function App() {

  return (
    <ContextoAutenticacao>
      <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/CrudFuncionario" element={<CrudFuncionario />} />
      <Route path="/Funcionario" element={<Funcionario />} />
      <Route path="/CrudDepartamento" element={<CrudDepartamento />} />
      <Route path="/Departamento" element={<Departamento />} />
      <Route path="/ConsultaFuncionario" element={<ConsultaFuncionario />} />
      <Route path="/ConsultarDepartamento" element={<ConsultaDepartamento />} />
      <Route path="/Ponto" element={<Ponto />} />
      <Route path="/Menu" element={<Menu />} />
      <Route path="/Home" element={<Home />} />
    </Routes>
    </ContextoAutenticacao>
  );
}

export default App;