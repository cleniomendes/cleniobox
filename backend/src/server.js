const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

//indica quem pode acessar a aplicacao
app.use(cors());

//configurando webSocket e mapeando para escutar requisicoes http tambem. o app.listen virou server.liste
//para que seja possivel em um mesmo listen escutar ws e http.
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
  socket.on('connectRoom', box => {
    socket.join(box);
  })
})

//conexao com o mongo utilizando nova url
mongoose.connect('mongodb+srv://clenio:144407@cluster0-qwjnt.mongodb.net/cleniobox?retryWrites=true', {
  useNewUrlParser: true
});
//Configuracao dos middlewares

//deixando a configuracao do socket disponivel em cada requisicao
app.use((req, res, next) => {
  req.io = io;
  return next(); 
});

//troca de dados com o front end usando json
app.use(express.json());
//permitir enviar arquivo nas requisicoes
app.use(express.urlencoded({ extended: true }));
//utilizando rota para procurar e abrir arquivos na pasta tmp, atraves do retorno de /boxes/:id/show
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));
//caminho do arquivo de rotas
app.use(require('./routes'));

server.listen(3000, ()  => {
    console.log('Example app listening on port 3000!');
  });