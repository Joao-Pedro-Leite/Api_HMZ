const sequelize = require('msnodesqlv8/lib/sequelize');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('./db');
const Cliente = require('./model/clientes');
const Contato = require('./model/contato');
const Endereco = require('./model/endereco');
const ContatoCliente = require('./model/contatoCliente');
const {
    CadastroCliente, 
    CriarNovoContato, 
    TodosDadosDoCliente, 
    DadosDeTodosOsClientes, 
    AtualizarContato,
    DeletarContato,
    AtualizarCliente,
    DeletarCliente

} = require('./actions/crudActions');

const app = express();

(async() => {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.json());
    app.use(cors());


    try {
        await database.sync()
        console.log("Deu bom")
    } catch (err) {
        console.log("Deu ruim:", err)
    }

    Cliente.belongsTo(Endereco, { foreignKey: 'EnderecoId' }); // Associação com a tabela "Endereco"
    ContatoCliente.belongsTo(Cliente, { foreignKey: 'ClienteId' }); 
    ContatoCliente.belongsTo(Contato, { foreignKey: 'ContatoId', onDelete: 'CASCADE' });

    
    app.get("/todosClientes", async(req,res) => {

        const todosDados = await DadosDeTodosOsClientes()

        res.json(todosDados)

    })

    app.get("/dadosCliente", async (req,res) => {

        const {cnpj} = req.query
        const dadosCliente = await TodosDadosDoCliente(cnpj)
        res.json(dadosCliente)
    })

    app.get("/clientePorId", async (req,res) => {

        const {id} = req.query
       const clientePorId = await Cliente.findOne({where : {Id: id}})

       res.json(clientePorId)
    })

    app.get("/todosContatos", async (req,res) => {

        const {id} = req.query
        console.log("Este é o Id", id)
        const todosContatosClientes = await ContatoCliente.findAll({where: {ClienteId: id}})

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
       res.json(listaDeContatos)
    })

    app.post("/cadastroCliente", async (req,res) => {
        const {
            nome,
            cnpj,
            bairro,
            log,
            cidade,
            estado,
            pais,
            cargo,
            telefone,
            email
        } = req.body
        
        const cadastro = await CadastroCliente(
            nome,
            cnpj,
            bairro,
            log,
            cidade,
            estado,
            pais,
            cargo,
            telefone,
            email
            )


        res.json(
           cadastro
            )  
    })
  
    app.post("/deletarCliente", async (req, res) => {
        const {cnpj} = req.query

        const clienteDeletado = await DeletarCliente(cnpj)

        res.json(clienteDeletado)
    })

    app.post("/atualizarCliente", async (req, res) => {
        const {
            nome,
            cnpj,
            ativo,
            bairro,
            log,
            cidade,
            estado,
            pais
        } = req.body

        // CNPJ PRECISA JÀ EXISTIR
        const clienteAtualizado = await AtualizarCliente(nome, cnpj, ativo, log, bairro, cidade, estado, pais)

        res.json(clienteAtualizado)
    })

    app.post("/criarNovoContato", async (req, res) => {
        const {
            cnpj,
            cargo,
            telefone,
            email
        } = req.body
        const novoContato = CriarNovoContato(cnpj, cargo, telefone, email)

        res.json(novoContato)
    })

    app.post("/atualizarContato", async(req, res) => {
        const {
            id,
            cargo,
            telefone,
            email
        } = req.body

        const contatoAtualizado = await AtualizarContato(id, cargo, telefone, email)

        res.json(contatoAtualizado)
    })

    app.post("/deletarContato", async (req, res) => {
        const {id} = req.body

        const contatoDeletado = await DeletarContato(id)

        res.json(contatoDeletado)
    })
    // {
    //     "nome": "Eryn Gwynevere",
    //   "cnpj": 1230426,
    //       "log": "Rua Utah",
    //       "bairro": "Jardim Flórida",
    //       "cidade": "Jacareí",
    //       "estado": "São Paulo",
    //     "pais": "Brazil",
    //       "cargo": "Matador de boss",
    //       "telefone": 12996,
    //       "email": "leite.jpedro@gmail.com"
    // }
})();





app.listen(5000, () =>{
    console.log("Servidor está na porta: 5000")
});


  // const slaman = await CadastroCliente("ArcStardust" , "2345678", "Rua7", "bairro7", "cidade7","Estado7","Pais7", "Dono", 99627, "@sexmail.com")

    // console.log(slaman)

    // const teste = await CriarNovoContato( "2345678", "Esse também precisa ser deletado", 122345678, "uchiha@gmail.com")

    // console.log(teste)

    // const slaman2 = await CadastroCliente("IkkiUchiha" , "987654321", "Rua6", "bairro6", "cidade6","Estado6","Pais6", "Dono", 99627, "@sexmail.com")

    // console.log(slaman2)

    // const teste2 = await CriarNovoContato( "987654321", "Esse também precisa ser deletado", 122345678, "uchiha@gmail.com")

    // console.log(teste2)

    // const slaman3 = await CadastroCliente("DeusIza" , "69420", "Rua8", "bairro8", "cidade8","Estado8","Pais8", "Dono", 99627, "@sexmail.com")

    // console.log(slaman3)

    // const teste3 = await CriarNovoContato( "69420", "Esse também precisa ser deletado", 122345678, "uchiha@gmail.com")

    // console.log(teste3)

 