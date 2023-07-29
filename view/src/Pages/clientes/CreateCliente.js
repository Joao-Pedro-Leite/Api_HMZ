import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import Axios from 'axios';

function CreateCliente() {
    const navigate = useNavigate();

  const [clienteData, setClienteData] = useState({
    nome: null,
    cnpj: null,
    bairro: null,
    log: null,
    cidade: null,
    estado: null,
    pais: null,
    cargo: null,
    telefone: null,
    email: null,
    // Adicione aqui outros campos do cliente, se houver
  });

  const handleInputChange = (event) => {

    const { name, value } = event.target;
    setClienteData({ ...clienteData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post('http://localhost:5000/cadastroCliente', clienteData)
      .then((res) => {
        console.log(res.data); 
        navigate('/Clientes');
      })
      .catch((error) => {
        console.error(error);
        // Tratar possíveis erros de requisição
      });
  };

  return (
    <div>
      <h1>CreateContato</h1>

    <div className='row'>
        <div className='col-md-12'>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="control-label" htmlFor="nome">Nome:</label>
          <input className="form-control" 
            type="text"
            id="nome"
            name="nome"
            value={clienteData.nome}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="cnpj">CNPJ:</label>
          <input className="form-control"
            type="text"
            id="cnpj"
            name="cnpj"
            value={clienteData.cnpj}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="bairro">Bairro:</label>
          <input className="form-control"
            type="text"
            id="bairro"
            name="bairro"
            value={clienteData.bairro}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="log">Logradouro:</label>
          <input className="form-control"
            type="text"
            id="log"
            name="log"
            value={clienteData.log}
            onChange={handleInputChange}
          />
        </div>

          <div className="form-group">
          <label className="control-label" htmlFor="cidade">Cidade:</label>
          <input className="form-control"
            type="text"
            id="cidade"
            name="cidade"
            value={clienteData.cidade}
            onChange={handleInputChange}
          />
         </div>

          <div className="form-group">
          <label className="control-label" htmlFor="estado">Estado:</label>
          <input className="form-control"
            type="text"
            id="estado"
            name="estado"
            value={clienteData.estado}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label className="control-label" htmlFor="pais">Pais:</label>
          <input className="form-control"
            type="text"
            id="pais"
            name="pais"
            value={clienteData.pais}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label className="control-label" htmlFor="cargo">Cargo:</label>
          <input className="form-control"
            type="text"
            id="cargo"
            name="cargo"
            value={clienteData.cargo}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label className="control-label" htmlFor="telefone">Telefone:</label>
          <input className="form-control" 
            type="int"
            maxLength={9}
            id="telefone"
            name="telefone"
            value={clienteData.telefone}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label className="control-label" htmlFor="email">Email:</label>
          <input className="form-control"
            type="text"
            id="email"
            name="email"
            value={clienteData.email}
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

export default CreateCliente;