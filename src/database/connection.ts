import { createConnection } from "typeorm";

createConnection().then(connection => {
  console.log('Conexão com banco de dados realizada com sucesso! ✅')
}).catch(error => console.log(`Erro ao conectar com o banco de dados: ${error}`));