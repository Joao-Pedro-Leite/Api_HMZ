const Cliente = require('../model/clientes')
const Contato = require('../model/contato')
const Endereco = require('../model/endereco')
const ContatoCliente = require('../model/contatoCliente')
const { where } = require('sequelize')


const CadastroCliente = async (nome, cnpj, log, bairro, cidade, estado, pais, cargo, telefone, email) => {
    
    

    //Checa se usuário existe
    const existe = await Cliente.findAll({
        where: {
            Cnpj: cnpj
        }
    })

    if (existe[0] != undefined) return "Esse CNPJ já está registrado"
    
    //Cria o Endereço
    await Endereco.create({
        Logradouro: log,
        Bairro: bairro,
        Cidade: cidade,
        Estado: estado,
        Pais: pais
    })

    
    const idEndereco = await Endereco.findAll({
        limit: 1,
        where: { Logradouro: log},
    })

    // // Cria o Cliente
    await Cliente.create({
      Nome: nome,
      Cnpj: cnpj,
      EnderecoId: idEndereco[0].Id,
      Ativo: 1
    })

    // // Cria o Contato
    await Contato.create({
        Nome: nome,
        Cargo: cargo,
        Telefone: telefone,
        Email: email
    })

    const idContato = await Contato.findAll({
        limit: 1,
        where: { 
            Nome: nome, 
            Cargo: cargo,
            Telefone: telefone,
            Email: email},
    })

    const idCliente = await Cliente.findAll({
        limit: 1,
        where: { Nome: nome},
    })
    
    // Cria a relação Contato para Cliente
    await ContatoCliente.create({
        ClienteId: idCliente[0].Id,
        ContatoId: idContato[0].Id
    })

    return "Cadastrado com sucesso"
}

//   
const CriarNovoContato = async (cnpj, cargo, telefone, email ) => {
    
    const idCliente = await Cliente.findOne({where: {Cnpj: cnpj}})


    //Checa se contato existe
    const existe = await Contato.findAll({
        where: {Nome: idCliente.Nome, Cargo: cargo, Telefone: telefone, Email : email}
    })

    if (existe[0] != undefined) return "Esse contato já está registrado"

    await Contato.create({
        Nome: idCliente.Nome,
        Cargo: cargo,
        Telefone: telefone,
        Email: email
    })

    

    const idContato = await Contato.findOne({
        where: {Nome:idCliente.Nome, Cargo:cargo, Telefone: telefone, Email : email},
    })

   

    await ContatoCliente.create({ClienteId: idCliente.Id, ContatoId: idContato.Id})

    return "Cadastrado com sucesso"

}



const TodosDadosDoCliente = async (cnpj) =>{
    
    const DadosCliente = await Cliente.findOne({where: {Cnpj: cnpj}})

    if (DadosCliente === null) {return "Essa cnpj de cliente não está cadastrada"}

    const DadosEndereco = await Endereco.findOne({where: {Id: DadosCliente.EnderecoId}})

    console.log(DadosEndereco)

    const todosContatosClientes = await ContatoCliente.findAll({where: {ClienteId: DadosCliente.Id}})

    const listaDeContatos = await Promise.all(todosContatosClientes.map(async e => {
        const contato = await Contato.findOne({ where: { Id: e.ContatoId } });

        const obj = {
            Id: contato.Id,
            Nome: contato.Nome,
            Cargo: contato.Cargo,
            Telefone: contato.Telefone,
            Email: contato.Email
        }
        return obj;
    }));

    const AllClientData = {
        Id: DadosCliente.Id,
        Nome: DadosCliente.Nome,
        Cnpj: DadosCliente.Cnpj,
        Ativo: DadosCliente.Ativo,
        Endereco: {
            Logradouro: DadosEndereco.Logradouro,
            Bairro: DadosEndereco.Bairro,
            Cidade: DadosEndereco.Cidade,
            Estado: DadosEndereco.Estado,
            Pais: DadosEndereco.Pais
        },
        Contatos: listaDeContatos
    }

    return AllClientData
   
}

const DadosDeTodosOsClientes = async () => {
    // Acha todos os clientes
    const todosClientes = await Cliente.findAll()
    const x = await Promise.all(todosClientes.map(async e => {

    // Faz o Obj de cada cliente que foi achado no banco de dados 
        const dataClient = await TodosDadosDoCliente(e.Cnpj)
        return dataClient
    }))



    return x
}

const AtualizarContato = async (id, cargo, telefone, email) => {
    try {
        const modificarContato = await Contato.update({
            Cargo: cargo,
            Telefone: telefone,
            Email: email
        },{where: {Id: id}})
        return "Atualizado com sucesso"
    } catch (e) {
        return ("Deu ruim na hora de atualizar", e)
    }
    



}

const DeletarContato = async (id) => {
    try {

         await ContatoCliente.destroy({
            where : {ContatoId: id}
        })

         await Contato.destroy({
            where : {Id: id}
        })

        
        return "Deletado com sucesso"
    } catch (e) {
        return ("Erro ao deletar contato:", e)
    }
    
}

const AtualizarCliente = async (nome, cnpj, ativo, log, bairro, cidade, estado, pais) => {
    try {

    // verifica se cnpj existe
    const cnpjExiste = await Cliente.findAll({where : {Cnpj: cnpj}})
    
    
    if (cnpjExiste[0] != undefined)  {


        await Cliente.update({
            Nome: nome,
            Ativo: ativo
        },{where: {Cnpj: cnpj}})



        await Endereco.update({
            Logradouro: log,
            Bairro: bairro,
            Cidade: cidade, 
            Estado: estado,
            Pais: pais        
        }, {where: {Id: cnpjExiste[0].EnderecoId}})

        const idDosContatos = await ContatoCliente.findAll({where: {ClienteId: cnpjExiste[0].Id}})

        idDosContatos.map(async e => {
            await Contato.update({
                Nome: nome
            }, {where : {Id: e.ContatoId}})
        })

        return "Atualizado com sucesso"

    } else {
        return "Esse CNPJ não existe, cadastre novo cliente"
    }

  

} catch (e) {
    return ("Erro ao atualizar contato", e)
}
}




const DeletarCliente = async (cnpj) => {

    if(cnpj == null) return "Porafavor insira cnpj"

    try {
        const clienteADeletar = await Cliente.findOne({where : {Cnpj: cnpj}})
        if(clienteADeletar == null) return "informe uma cnpj Válida"

        const todosContatosADeletar = await ContatoCliente.findAll({where: {ClienteId: clienteADeletar.Id}})

        await ContatoCliente.destroy({where: {ClienteId: clienteADeletar.Id}})
        await Cliente.destroy({where : {Cnpj:cnpj}})
        await Endereco.destroy({where : {Id: clienteADeletar.EnderecoId}})
    
    
        
    
        for (const contato of todosContatosADeletar) {
            await Contato.findOne({where: {Id: contato.ContatoId}})
            await Contato.destroy({ where: { Id: contato.ContatoId } });
        }
    
        
        
    
        return "Contato Deletado com Sucesso"  
    } catch (error) {
        return ("Deu um erro ao deletar:", error)
    }
    
}

module.exports = {
    CadastroCliente, 
    CriarNovoContato, 
    TodosDadosDoCliente, 
    DadosDeTodosOsClientes, 
    AtualizarContato,
    DeletarContato,
    AtualizarCliente,
    DeletarCliente
 }