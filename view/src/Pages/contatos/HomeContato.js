import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Axios from "axios"

function HomeContato() {
    const { id } = useParams();
    const [contatos, setContatos] = useState([]);

  useEffect(() => {
    
    Axios.get('http://localhost:5000/todosContatos', {
      params: {
        id: id,
      },
    })
      .then((response) => {
        setContatos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (contatos)     
console.log(contatos)
    return <div>
        <h1> Contatos</h1>
        
        <Link to="/Contatos/Cadastro" className="btn btn-primary cadastro">Criar novo Contato</Link>
        <table className="table table-striped">
            <thead className="table-primary">
            <tr>
                <th>
                    Id
                </th>
                <th>
                    Nome
                </th>
                <th>
                    Cargo
                </th>
                <th>
                    Telefone
                </th>
                <th></th>
                <th></th>

            </tr>

            </thead>

            <tbody>
            {contatos && (
                contatos.map(contato => (
                    <tr >
                        <td key={contato.Id}>{contato.Id}</td>
                        <td>{contato.Nome}</td>
                        <td>{contato.Cargo}</td>
                        <td>{contato.Telefone}</td>
                        <td>{contato.Email}</td>
                        <td>
                            <Link to={`/Clientes/Editar/${contato.Id}`} className="btn btn-secondary btnDeletar" >Editar Contato</Link>
                            <Link to={`/Clientes/Deletar/${contato.Id}`} className="btn btn-danger btnDeletar" >Deletar Contato</Link>
                        </td>
                    </tr>
                    ))
                
            )}
            </tbody>
        </table>
        <Link to="/Clientes" className="btn btn-secondary">voltar</Link>
    </div>
};

export default HomeContato;