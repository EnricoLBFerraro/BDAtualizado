const express = require('express');
const {DataTypes} = require('sequelize');
const sequelize = require('./back-sequelize');
const Modelo_Login = require('./modelo_login');
const Modelo_Publi = require('./modelo_publi')
const Modelo_User = require("./modelo_user")
const Modelo_Colab = require('./modelo_colab')
const app = express();
const bcrypt = require('bcrypt');


Modelo_Login.beforeCreate(async (Login, options) =>{
    if(Login.Senha){
        Login.Senha = await bcrypt.hash(Login.Senha, 10);
    }
})



app.use(express.json());
sequelize.sync()
    .then(() =>{
        console.log("Banco de dados sincronizado!");
    })
    .catch((error) =>{
        console.log("Erro ao conectar banco de dados: "+ error);
    });

app.get("/dadosLoginSequelize", async(req, res) =>{
    try{
        const logins = await Modelo_Login.findAll();
        res.json(logins);
    } catch(error){
        console.log("Erro na consulta: "+ error);
        res.status(500).send('Erro na consulta');
    }
});

app.get("/dadosPubliSequelize", async(req, res) =>{
    try{
        const publis = await Modelo_Publi.findAll();
        res.json(publis);
    } catch(error){
        console.log("Erro na consulta: "+ error);
        res.status(500).send('Erro na consulta');
    }
});

app.get("/dadosColab", async(req, body)=>{
    try{
        const colabs = await Modelo_Colab.findAll();
        res.json(colabs);
    } catch(error){
        console.log("Erro na consulta: "+ error);
        res.status(500).send("Erro na consulta");
    }
});

app.get("/dadosUsers", async(req, body) => {
    try{
        const users = await Modelo_User.findAll();
        res.json(users);
    }catch(error){
        console.log("Erro na consulta: "+ error);
        res.status(500).send("Erro na consulta");
    }
})

app.post("adicionarUser", async(req, body)=>{
    try{
        const {Nome, Email, Drt, Cargo, Senha} = req.body;
        const novoUser = Modelo_User.create({Nome, Email, Drt, Cargo, Senha});
        res.json(novoUser);
    }catch(error){
        console.log("Erro: "+ error);
        res.status(500).send("Erro ao adicionar usuario!")
    }
})

app.post("/adicionarColab", async(req, res)=>{
    try{
        const {Nome, Categoria, Data, Descricao} = req.body;
        const novoColab = Modelo_Colab.create({Nome, Categoria, Data, Descricao});
        res.json(novoColab);
    } catch(error){
        console.log("Error: "+ error);
        res.status(500).send("Erro ao adicionar colaborador!")
    }
})


app.post("/adicionarPubli", async(req, res)=>{
    try{
        const {Titulo, Texto, Escritor, Imagem, Tipo_De_Publi, Data_da_Publi } = req.body;
        const novaPubli = Modelo_Publi.create({Titulo, Texto, Escritor, Imagem, Tipo_De_Publi, Data_da_Publi});
        res.json(novaPubli);
    } catch(error){
        console.log("Erro: "+ error);
        res.status(500).send("Erro ao adicionar publicaÃ§Ã£o!")
    }
});

app.post('/adicionarlogin', (req,res) =>{
    try{
        const { Nome,Senha,Tipo_De_Login } = req.body;
        const novoLogin = Modelo_Login.create({Nome,Senha,Tipo_De_Login});
        res.json(novoLogin);
    } catch(error){
        console.log("Erro: "+ error);
        res.status(500).send("Erro ao adicionar usuÃ¡rio!: ", error)
    }
});


//VERIFICAÃ‡ÃƒO DE LOGIN
app.post('/login', async (req, res) =>{
    const {Nome, Senha} = req.body;
    try{
        const user = await Modelo_Login.findOne({where: {Nome}});
        if(!user){
            res.status(401).json({message: "Nome de usuÃ¡rio invalido!"})
            return;
        }
        const senhaCorreta = await bcrypt.compare(Senha, user.Senha);
        if(!senhaCorreta){
            res.status(401).json({message: "Senha incorreta!"});
            return;
        }
        console.log("Acesso liberado!")
    } catch(error){
        console.log("Erro: "+ error);
        res.status(500).send("Erro na verificaÃ§Ã£o de Login")
    }
})

app.listen(3003,()=>{
    console.log('Servidor Express rodando na porta 3003');
})