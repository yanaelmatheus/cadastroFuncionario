import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowId, GridRowModel } from '@mui/x-data-grid';
import { Container, Typography, Paper, Button } from '@mui/material';
import axios from 'axios';

interface Funcionario {
  id: number;
  Nome: string;
  Nascimento: number;
  Sexo: string;
  Departamento: string;
}

interface Departamento {
    id: number;
    Nome: string;
}

interface DataGridFuncionarioProps {
    tipoConsulta: string;
}

const DataGridComponent: React.FC<DataGridFuncionarioProps> = ({ tipoConsulta }) => {
  const [dadosFuncionario, setDadosFuncionario] = useState<Funcionario[]>([]);
  const [dadosDepartamento, setDadosDepartamento] = useState<Departamento[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const[error, setError] = useState<string>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [edits, setEdits] = useState<Map<GridRowId, GridRowModel>>(new Map());
  const [recarregarGrid, setRecarregarGrid] = useState<boolean>(false);
  
  const handleSalvarAlteracoesFuncionario = async () => {
    try {
      await Promise.all(
        Array.from(edits.values()).map((row) =>
          axios.put(`http://localhost:8081/Funcionario`, row)
        )
      );
      setDadosFuncionario((prev) =>
        prev.map((item) => (edits.has(item.id) ? (edits.get(item.id) as Funcionario) : item))
      );
      setEdits(new Map());
      setIsEditing(false);
      setError(undefined);
    } catch (err) {
      setError('Erro ao salvar as alterações');
      console.log(err);
    }
  };

  const handleSalvarAlteracoesDepartamento = async () => {
    try {
      await Promise.all(
        Array.from(edits.values()).map((row) =>
          axios.put(`http://localhost:8081/Departamento`, row)
        )
      );
      setDadosDepartamento((prev) =>
        prev.map((item) => (edits.has(item.id) ? (edits.get(item.id) as Departamento) : item))
      );
      setEdits(new Map());
      setIsEditing(false);
      setError(undefined);
    } catch (err) {
      setError('Erro ao salvar as alterações');
      console.log(err);
    }
  };

  const colunasDepartamento: GridColDef[] = [
    { field: 'id', headerName: 'id', width: 110, editable: false },
    { field: 'nome', headerName: 'Nome', width: 90, editable: true },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 150,
      renderCell: (params) => (
        <div>
          <Button onClick={() => handleDeletarDepartamento(params.row.id)} color="secondary">Deletar</Button>
        </div>
      ),
    },
  ];

  const colunasFuncionario: GridColDef[] = [
    { field: 'id', headerName: 'id', width: 110, editable: false},
    { field: 'nome', headerName: 'Nome', width: 90, editable: true },
    { field: 'nascimento', headerName: 'Nascimento', width: 150, editable: true },
    { field: 'sexo', headerName: 'Sexo', width: 110, editable: true },
    { field: 'departamento', headerName: 'Departamento', width: 110, editable: false },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 150,
      renderCell: (params) => (
        <div>
          <Button onClick={() => handleDeletarFuncionario(params.row.id)} color="secondary">Deletar</Button>
        </div>
      ),
    },
  ];
  
  const handleCancelarEdicao = () => {
    setIsEditing(false);
  };

  const handleDeletarFuncionario = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8081/Funcionario`, {
        params: {
          idFuncionario: id
        }
      });

      setRecarregarGrid(true);
      setError(undefined);
    } catch (err) {
      setError('Erro ao enviar dados');
      console.log(error);
    }
  };
  
  const handleDeletarDepartamento = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8081/Departamento`, {
        params: {
          idDepartamento: id
        }
      });

      setRecarregarGrid(true);
      setError(undefined);
    } catch (err) {
      setError('Erro ao enviar dados');
      console.log(error);
    }
  };

  useEffect(() => {
    if(tipoConsulta === 'Funcionario'){
      carregarFuncionarios();
    } else {
      carregarDepartamentos();
    }
    
    setCarregando(false);
  }, [recarregarGrid]);

  const carregarDepartamentos = async () => {
    try {
      let response = await axios.get('http://localhost:8081/Departamento');

      setDadosDepartamento(response.data);
      setError(undefined);
    } catch (err) {
      setError('Erro ao enviar dados');
      console.log(error);
    }
  }

  const carregarFuncionarios = async () => {
    try {
      let response = await axios.get('http://localhost:8081/Funcionario');

      setDadosFuncionario(response.data);
      setError(undefined);
    } catch (err) {
      setError('Erro ao enviar dados');
      console.log(error);
    }
  }

  const handleRowEdit = (newRow: GridRowModel) => {
    setIsEditing(true);
    setEdits((prev) => new Map(prev).set(newRow.id, newRow));
    return newRow;
  };

  return (
    <Container component={Paper} className='containerGrids'>
      <div className='div-Grid'>
        <DataGrid
          rows={tipoConsulta == 'Funcionario' ? dadosFuncionario : dadosDepartamento}
          columns={tipoConsulta == 'Funcionario' ? colunasFuncionario : colunasDepartamento}
          loading={carregando}
          autoHeight
          processRowUpdate={handleRowEdit}
        />
         {isEditing && (
          <div>
            <Button onClick={tipoConsulta == 'Funcionario' ? handleSalvarAlteracoesFuncionario : handleSalvarAlteracoesDepartamento} color="primary">Salvar</Button>
            <Button onClick={handleCancelarEdicao} color="secondary">Cancelar</Button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default DataGridComponent;