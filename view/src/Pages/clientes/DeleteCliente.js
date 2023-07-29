import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Axios from "axios"

function DeleteCliente() {
    const { id } = useParams();

    const navigate = useNavigate();

    const [clienteData, setClienteData] = useState(null);

  useEffect(() => {
    Axios.get(`http://localhost:5000/clientePorId`, {
      params: {
        id: id,
      },
    })
      .then((res) => {
        setClienteData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!clienteData) {
    return <div>Carregando...</div>;
  }

  const handleDelete = () => {
    Axios.post(`http://localhost:5000/deletarCliente`, null, {
      params: {
        cnpj: clienteData.Cnpj,
      },
    })
      .then((res) => {
        console.log(res.data);
        navigate('/Clientes');
      })
      .catch((error) => {
        console.error(error);
      });
  };
    return <div>
        <h1> Deletar Cliente</h1>

        <h3> Deseja Realmente deletar o Cliente <strong>{clienteData.Nome}</strong> com o CNPJ: <strong>{clienteData.Cnpj}</strong>   </h3>
        
        <button className="btn btn-danger btnDelete" onClick={handleDelete}>Deletar</button>
        
        <Link to="/Clientes" className="btn btn-secondary"> voltar </Link>
        


    </div>
}

export default DeleteCliente