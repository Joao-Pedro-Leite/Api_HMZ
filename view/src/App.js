import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Home from './Pages/Home';

import DeleteCliente from './Pages/clientes/DeleteCliente';
import HomeCliente from './Pages/clientes/HomeCliente';
import CreateCliente from './Pages/clientes/CreateCliente';
import EditCliente from './Pages/clientes/EditCliente';

import HomeContato from './Pages/contatos/HomeContato';
import CreateContato from './Pages/contatos/CreateContato';
import EditContato from './Pages/contatos/EditContato';
import DeleteContato from './Pages/contatos/DeleteContato'

function App() {
  return (
    <div className="App" >
      <NavBar/>
      <div class="container">
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Clientes" element={<HomeCliente />} />
            <Route path="/Clientes/Cadastro" element={<CreateCliente/>} />
            <Route path="/Clientes/Editar/:cnpj" element={<EditCliente />} />
            <Route path="/Clientes/Deletar/:id" element={<DeleteCliente/>} />



            <Route path="/Contatos/:id" element={<HomeContato />} />
            <Route path="/Contatos/Cadastro/" element={<CreateContato/>} />
            <Route path="/Contatos/Editar/:id" element={<EditContato />} />
            <Route path="/Contatos/Deletar/:id" element={<DeleteContato/>} />

         </Routes>
      </div>
      
    </div>
  );
}

export default App;
