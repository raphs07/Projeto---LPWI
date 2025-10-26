const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

// Lê dados do corpo do POST
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Rota principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Rota para processar o formulário
app.post("/calcular-media", (req, res) => {
  const { aluno, nota1, nota2 } = req.body;

  const n1 = parseFloat(nota1);
  const n2 = parseFloat(nota2);
  const media = (n1 + n2) / 2;

  let situacao = "";
  if (media >= 6) situacao = "Aprovado";
  else if (media >= 2) situacao = "Exame Final";
  else situacao = "Reprovado";

  res.send(`
    <h2>Resultado</h2>
    <p><b>Aluno:</b> ${aluno}</p>
    <p><b>Nota 1:</b> ${n1}</p>
    <p><b>Nota 2:</b> ${n2}</p>
    <p><b>Média:</b> ${media.toFixed(2)}</p>
    <p><b>Situação:</b> ${situacao}</p>
    <br><a href="/">Voltar</a>
  `);
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
