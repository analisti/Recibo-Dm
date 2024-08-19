function numeroParaExtenso(numero) {
  const unidades = [
    "",
    "um",
    "dois",
    "três",
    "quatro",
    "cinco",
    "seis",
    "sete",
    "oito",
    "nove",
  ];
  const especiais = [
    "dez",
    "onze",
    "doze",
    "treze",
    "quatorze",
    "quinze",
    "dezesseis",
    "dezessete",
    "dezoito",
    "dezenove",
  ];
  const dezenas = [
    "",
    "",
    "vinte",
    "trinta",
    "quarenta",
    "cinquenta",
    "sessenta",
    "setenta",
    "oitenta",
    "noventa",
  ];
  const centenas = [
    "",
    "cento",
    "duzentos",
    "trezentos",
    "quatrocentos",
    "quinhentos",
    "seiscentos",
    "setecentos",
    "oitocentos",
    "novecentos",
  ];

  let extenso = "";

  if (numero === 0) return "zero reais";
  if (numero === 100) return "cem reais";

  if (numero > 999) {
    const milhar = Math.floor(numero / 1000);
    const resto = numero % 1000;
    extenso += milhar === 1 ? "mil" : unidades[milhar] + " mil";
    if (resto > 0) {
      extenso += resto < 100 ? " e " : ", ";
      numero = resto;
    } else {
      return extenso.trim() + " reais";
    }
  }

  const c = Math.floor(numero / 100);
  const d = Math.floor((numero % 100) / 10);
  const u = numero % 10;

  if (c > 0) extenso += (extenso ? ", " : "") + centenas[c];
  if (d > 1) extenso += (extenso ? " e " : "") + dezenas[d];
  if (d === 1) extenso += (extenso ? " e " : "") + especiais[u];
  if (d !== 1 && u > 0) extenso += (extenso ? " e " : "") + unidades[u];

  return extenso.trim() + " reais";
}

function gerarRecibo() {
  const container = document.getElementById("recibos");
  const dataAtual = new Date();
  const dataFormatada =
    dataAtual.getDate().toString().padStart(2, "0") +
    " de " +
    dataAtual.toLocaleString("pt-BR", { month: "long" }) +
    " de " +
    dataAtual.getFullYear();

  let reciboHTML = `
    <div class="recibo">
      <h1>RECIBO DE PAGAMENTO DE COMISSÃO DE CORRETAGEM</h1>
      <div class="content">
        <p>
          A DM IMOBILIÁRIA LTDA, pessoa jurídica, inscrita no CNPJ de
          número: 19.535.429/0001-01, através do(a) corretor(a)
          infra-assinado(a), declara para os devidos fins legais que
          recebeu a quantia de R$ <input type="text" class="input-small valor-numerico" />,00
          (<input type="text" class="input-medium valor-extenso" readonly />)
           do Residencial: <b>Colina Park</b>
           inscrito no CNPJ de número: 33.492.779/0001-69,
        </p>
        <p>
          pela intermediação da compra e venda de imóveis objeto de CONTRATOS e
          ACERTOS conforme descritos abaixo:
        </p>
        <div class="contrato-acerto-box">
          <div>
            <label for="contratoNumero">CONTRATO Nº:</label>
            <input type="text" id="contratoNumero" class="input-small" />
          </div>
          <div>
            <label for="acertoNumero">ACERTO Nº:</label>
            <input type="text" id="acertoNumero" class="input-small" />
          </div>
        </div>
        <div class="corretor-assinatura-container">
          <div class="corretor-box">
            <p>NOME DO CORRETOR(A) LEGÍVEL:</p>
            <p>Paulo Henrique Souza Guedes</p>
            <p>CPF: 073.616.221-60</p>
          </div>
          <div class="assinatura">
            <em>E por ser verdade firmam o presente, para os devidos fins legais,</em>
            <p>MT, ${dataFormatada}.</p>
            <hr>
            <em>Corretor(a) de Imóveis - DM Imobiliária</em>
          </div>
        </div>
      </div>
    </div>
    <hr />`;

  container.insertAdjacentHTML("beforeend", reciboHTML);

  const valorInputs = container.querySelectorAll(".valor-numerico");
  valorInputs.forEach((input) => {
    input.addEventListener("input", function () {
      const valor = parseInt(input.value.replace(/[^0-9]/g, ""), 10) || 0;
      const extensoInput = input
        .closest(".recibo")
        .querySelector(".valor-extenso");
      extensoInput.value = numeroParaExtenso(valor);
    });
  });
}

document.getElementById("addReciboBtn").addEventListener("click", gerarRecibo);

// Gere um recibo inicial
gerarRecibo();
