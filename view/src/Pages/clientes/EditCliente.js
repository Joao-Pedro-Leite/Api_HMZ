import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Axios from "axios"

function EditCliente() {
  const { cnpj } = useParams();

  const navigate = useNavigate();

  const [clienteData, setClienteData] = useState({
    nome: '',
    cnpj: '',
    ativo: 0,
    bairro: '',
    log: '',
    cidade: '',
    estado: '',
    pais: '',
  });

  useEffect(() => {
    Axios.get(`http://localhost:5000/dadosCliente`, {
      params: {
        cnpj: cnpj,
      },
    })
      .then((res) => {
        const dataFromAPI = res.data;
        console.log(dataFromAPI)
        setClienteData({
          nome: dataFromAPI.Nome,
          cnpj: dataFromAPI.Cnpj,
          ativo: dataFromAPI.Ativo ? 1 : 0,
          bairro: dataFromAPI.Endereco.Bairro,
          log: dataFromAPI.Endereco.Logradouro,
          cidade: dataFromAPI.Endereco.Cidade,
          estado: dataFromAPI.Endereco.Estado,
          pais: dataFromAPI.Endereco.Pais,
        });
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post('http://localhost:5000/atualizarCliente', clienteData)
      .then((res) => {
        console.log(res.data);
        navigate('/Clientes');
      })
      .catch((error) => {
        console.error(error);
        // Tratar possíveis erros de requisição
      });
  };

  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setClienteData({ ...clienteData, [name]: value });
  };

  return (
    <div>
      <h1> Editar Cliente</h1>

      <div className='row'>
        <div className='col-md-12'>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="control-label" htmlFor="nome">Nome:</label>
              <input
                className="form-control"
                type="text"
                id="nome"
                name="nome"
                value={clienteData.nome}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="control-label" htmlFor="cnpj">CNPJ:</label>
              <input
                className="form-control"
                type="text"
                id="cnpj"
                name="cnpj"
                value={clienteData.cnpj}
                onChange={handleInputChange}
                disabled

              />
            </div>

            <label className="control-label" htmlFor="ativo" >Status:</label>
            <select
              className="form-control"
              id="ativo"
              name="ativo"
              value={clienteData.ativo}
              onChange={handleInputChange}
            >
              <option value={0}>Inativo</option>
              <option value={1}>Ativo</option>
            </select>

            <div className="form-group">
              <label className="control-label" htmlFor="bairro">Bairro:</label>
              <input
                className="form-control"
                type="text"
                id="bairro"
                name="bairro"
                value={clienteData.bairro}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="log">Logradouro:</label>
              <input
                className="form-control"
                type="text"
                id="log"
                name="log"
                value={clienteData.log}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="control-label" htmlFor="cidade">Cidade:</label>
              <input
                className="form-control"
                type="text"
                id="cidade"
                name="cidade"
                value={clienteData.cidade}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="control-label" htmlFor="estado">Estado:</label>
              <input
                className="form-control"
                type="text"
                id="estado"
                name="estado"
                value={clienteData.estado}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="control-label" htmlFor="pais">Pais:</label>
              <input
                className="form-control"
                type="text"
                id="pais"
                name="pais"
                value={clienteData.pais}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className='btn btn-primary btnCadastro'>Cadastrar Cliente</button>
          </form>

          <Link to="/Clientes" type='submit' className="btn btn-secondary">
            Voltar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EditCliente;