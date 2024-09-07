const fs = require("fs");

// Lê e processa os dados
async function readFile() {
  //Utilização de ReadStream para menor uso de memória
  const file = fs.createReadStream("valores.json");
  let buffer = "";

  file.on("data", (chunk) => {
    buffer += chunk;
  });

  // Fim da leitura dos dados e inicio do processamento
  file.on("end", () => {
    const dados = JSON.parse(buffer);
    const faturamento = dados.faturas;
    const faturamentoValido = faturamento.filter((fatura) => fatura > 0);

    const menorFaturamento = Math.min(...faturamentoValido.map((f) => f));
    const maiorFaturamento = Math.max(...faturamentoValido.map((f) => f));

    const somaFaturamento = faturamentoValido.reduce((soma, f) => soma + f, 0);
    const mediaFaturamento = somaFaturamento / faturamentoValido.length;

    const diasAcimaMedia = faturamentoValido.filter(
      (f) => f > mediaFaturamento
    ).length;
    console.log("Menor faturamento do ano:", menorFaturamento);
    console.log("Maior faturamento do ano:", maiorFaturamento);
    console.log(
      "Número de dias com faturamento acima da média:",
      diasAcimaMedia
    );
  });
}

// Chamada da função
readFile();
