import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import Axios from "axios";

function HomeCliente() {
    const [data, setData] = useState(null);


    useEffect(() => {
        Axios.get('http://localhost:5000/todosClientes')
            .then(async res => { 
                await setData(res.data) 
                console.log(res.data)
            })
            .catch(error => console.error(error))
    }, []);

    return <div>
    <h1>Clientes Cadastrados</h1>
        <Link to="/Clientes/Cadastro" className="btn btn-primary cadastro" >Cadastra novo Cliente</Link>
        
        
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
                    Cnpj
                </th>
                <th>
                    Status
                </th>
                <th></th>
            </tr>

            </thead>

            <tbody>
            {data && (
                data.map(cliente => (
                    <tr key={cliente.Cnpj}>
                        <td >{cliente.Id}</td>
                        <td>{cliente.Nome}</td>
                        <td>{cliente.Cnpj}</td>
                        <td>{cliente.Ativo == 0 ? "Inativo" : "Ativo"}</td>
                        <td>
                            <Link to={`/Clientes`} className="btn btn-primary " >Contatos</Link>
                            <Link to={`/Clientes/Editar/${cliente.Cnpj}`} className="btn btn-secondary btnDeletar" >Editar Cliente</Link>
                            <Link to={`/Clientes/Deletar/${cliente.Id}`} className="btn btn-danger btnDeletar" >Deletar Cliente</Link>
                        </td>
                    </tr>
                    ))
                
            )}
            </tbody>
        </table>
        


            
        
    </div>
};

export default HomeCliente;