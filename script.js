/* Nesta aula vamos revisar o conteúdo que vimos até aqui de DOM e aprenderemos uma nova forma de 
lidar com objetos chamada de foreach */

/* Inicializando lista de convidados com dois convidados */
let listaDeConvidados = [
  {
    nome: "Cleyton",
    vip: true,
    comanda: 9,
    login: "",
  },
  {
    nome: "Ernestine Benton",
    vip: false,
    comanda: 10,
    login: "",
  },
  {
    nome: "Adrienne Dixon",
    vip: false,
    comanda: 11,
    login: "",
  },
  {
    nome: "Sharpe Puckett",
    vip: false,
    comanda: 12,
    login: "",
  },
  {
    nome: "Whitfield Vazquez",
    vip: true,
    comanda: 13,
    login: "",
  },
  {
    nome: "Ina Quinn",
    vip: true,
    comanda: 14,
    login: "",
  },
  {
    nome: "Weeks Nguyen",
    vip: true,
    comanda: 15,
    login: "",
  },
  {
    nome: "Bettye Crawford",
    vip: false,
    comanda: 16,
    login: "",
  },
  {
    nome: "Sloan Bradshaw",
    vip: true,
    comanda: 17,
    login: "",
  },
  {
    nome: "Bettie Wood",
    vip: true,
    comanda: 18,
    login: "",
  },
  {
    nome: "Victoria Tran",
    vip: false,
    comanda: 19,
    login: "",
  },
  {
    nome: "Diana Holder",
    vip: false,
    comanda: 20,
    login: "",
  },
];

/* Identificando IDS que serão manipulados na tela */
let tabelaListaConvidados = document.getElementById("lista-convidados");
let inputNomeConvidado = document.querySelector("#nome-convidado");
/* Dessa forma retorna um HTML collection */
// let botaoIncluirConvidado = document.getElementsByClassName('btn-primary')
let botaoIncluirConvidado = document.getElementById("botao-incluir");
let divMensagemUsuario = document.getElementById("mensagem-usuario");
let checkBoxConvidadoVip = document.getElementById("convidado-vip");

let selectConsultarVip = document.getElementById("consultar-vip");

/* Função que insere registro a registro de usuário na lista (dentro da tabela do HTML) */
function insereConvidadoNoHTML(convidado) {
  // Inserindo no HTML da tabela
  tabelaListaConvidados.innerHTML += `
    <tr>
        <td>${convidado.nome}</td>
        <td>${convidado.vip ? "VIP" : "GERAL"}</td>
        <td>${convidado.comanda}</td>
        <td>${convidado.login}</td>
        <td><button type="button" class="btn btn-danger" name='botao-remover'>
            Remover
            </button>
        </td>
    </tr>
    `;
}

/* Usando foreach para percorrer um array */
function exibeListaDeConvidadosV2(listaDeConvidados) {
  // Limpo a tabela HTML
  tabelaListaConvidados.innerHTML = "";
  // Percorro o array inserindo cada posição em um elemento do HTML (TR) na table
  listaDeConvidados.forEach((convidado) => insereConvidadoNoHTML(convidado));
}

/* Setando um atributo para esconder*/
function fechaDivMensagemUsuario() {
  divMensagemUsuario.setAttribute("hidden", "");
}

// Exibir uma mensagem de resposta ao usuário quando ele clicar no botao incluir
function exibirMensagemUsuario(
  sucesso = true,
  mensagem = "Resposta com sucesso"
) {
  let classeAtual = divMensagemUsuario.getAttribute("class");
  classeAtual = sucesso
    ? classeAtual.replace("alert-danger", "alert-success")
    : classeAtual.replace("alert-success", "alert-danger");

  divMensagemUsuario.setAttribute("class", classeAtual);
  divMensagemUsuario.innerHTML = `  ${mensagem}
                                    <button
                                        type="button"
                                        class="btn-close"
                                        aria-label="Close"
                                        onclick="fechaDivMensagemUsuario()"
                                    ></button>`;
  divMensagemUsuario.removeAttribute("hidden");
}

function gerarNumeroDaComanda() {
  return listaDeConvidados[listaDeConvidados.length - 1].comanda + 1;
}

/*
2 - Ao adicionar um convidado gerar um login para o convidado onde o 
    login deve ser todo em letra minuscula e seguir o padrão. (usando map)
    2.1 - nome-eousobrenome-numerodacomanda. Ex.: Cleyton Professor -> cleyton-professor-10
*/
function gerarLoginConvidados() {
  listaDeConvidados.map((convidado) => {
    convidado.login = `${convidado.nome.toLowerCase().replace(" ", "-")}-${
      convidado.comanda
    }`;
  });
}
/**
 * 
  3 - Filtrar a lista de convidados por convidado vip, normal e todos os registros
    3.1 - caso não tenha registros pelo filtro atribuido exibir na tabela "nenhum registro encontrado"
 */
function consultarVip() {}

gerarLoginConvidados();
exibeListaDeConvidadosV2(listaDeConvidados);

/* Escutando o evento de click para disparar uma função quando ele acontecer */
botaoIncluirConvidado.onclick = function () {
  if (inputNomeConvidado.value.trim()) {
    let convidado = {
      nome: inputNomeConvidado.value,
      vip: checkBoxConvidadoVip.checked,
      comanda: gerarNumeroDaComanda(),
    };
    listaDeConvidados.push(convidado);
    gerarLoginConvidados();
    exibeListaDeConvidadosV2(listaDeConvidados);
    exibirMensagemUsuario(true, "Convidado incluído na lista!");
    inputNomeConvidado.value = "";
  } else {
    exibirMensagemUsuario(false, "O nome do convidado precisa ser preenchido!");
  }
};

selectConsultarVip.addEventListener("change", () => {
  let selecionado = selectConsultarVip.value; // "" ou VIP ou GERAL
  if (selecionado) {
    let listaFiltrada = listaDeConvidados.filter((convidado) => {
      //(selecionado === "VIP") : boolean
      //VIP === true
      //GERAL === false
      return convidado.vip === (selecionado === "VIP");
    });
    //let listaFiltrada = listaDeConvidados.filter(convidado => convidado.vip === (selecionado === "VIP"));
    exibeListaDeConvidadosV2(listaFiltrada);
  }else{
    exibeListaDeConvidadosV2(listaDeConvidados);
  }
});
