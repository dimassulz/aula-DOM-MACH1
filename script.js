/* Nesta aula vamos revisar o conteúdo que vimos até aqui de DOM e aprenderemos uma nova forma de 
lidar com objetos chamada de foreach */

/* Inicializando lista de convidados com dois convidados */
let listaDeConvidadosLocalStorage = JSON.parse(localStorage.getItem('listaDeConvidados'));
//let listaDeConvidados = listaDeConvidadosLocalStorage ? listaDeConvidadosLocalStorage : []; /if ternario
let listaDeConvidados = listaDeConvidadosLocalStorage ?? [];//operador de coalescencia

/* Identificando IDS que serão manipulados na tela */
let tabelaListaConvidados = document.getElementById("lista-convidados");
let inputNomeConvidado = document.querySelector("#nome-convidado");
/* Dessa forma retorna um HTML collection */
// let botaoIncluirConvidado = document.getElementsByClassName('btn-primary')
let botaoIncluirConvidado = document.getElementById("botao-incluir");
let divMensagemUsuario = document.getElementById("mensagem-usuario");
let checkBoxConvidadoVip = document.getElementById("convidado-vip");

let selectConsultarVip = document.getElementById("consultar-vip");
let inputConsultarDados = document.getElementById("consultar-dados");

let quantidadeConvidadoVip = document.getElementById("quantidade-vip");
let quantidadeConvidadoGeral = document.getElementById("quantidade-geral");

/* Função que insere registro a registro de usuário na lista (dentro da tabela do HTML) */
function insereConvidadoNoHTML(convidado) {
  // Inserindo no HTML da tabela
  tabelaListaConvidados.innerHTML += `
    <tr>
        <td>${convidado.nome}</td>
        <td>${convidado.vip ? "VIP" : "GERAL"}</td>
        <td>${convidado.comanda}</td>
        <td>${convidado.login}</td>
        <td><button type="button" class="btn btn-danger" name='botao-remover' onclick="removerConvidado(${convidado.comanda})">
            Remover
            </button>
        </td>
    </tr>
    `;
}

const mostrarQuantidadeVip = () => {
  let totalVip = listaDeConvidados.reduce((acumulador, convidado) => {
    return (acumulador += convidado.vip ? 1 : 0);
  }, 0);
  quantidadeConvidadoVip.innerHTML = `${totalVip}`;
  quantidadeConvidadoGeral.innerHTML = `${listaDeConvidados.length - totalVip}`;
};

/* Usando foreach para percorrer um array */
function exibeListaDeConvidadosV2(listaDeConvidados) {
  // Limpo a tabela HTML
  tabelaListaConvidados.innerHTML = "";
  // Percorro o array inserindo cada posição em um elemento do HTML (TR) na table
  listaDeConvidados.forEach((convidado) => insereConvidadoNoHTML(convidado));
  mostrarQuantidadeVip();
}

function removerConvidado(numeroComanda){
  listaDeConvidados.filter((convidado, indice) => {
    if(convidado.comanda == numeroComanda){
      listaDeConvidados.splice(indice,1);
    }
  });
  atualizarListaLocalStorage();
  exibirMensagemUsuario(true, "Convidado removido com sucesso!");
  exibeListaDeConvidadosV2(listaDeConvidados);
}

/* Setando um atributo para esconder*/
function fechaDivMensagemUsuario() {
  divMensagemUsuario.setAttribute("hidden", "");
}

function atualizarListaLocalStorage(){
  localStorage.setItem('listaDeConvidados', JSON.stringify(listaDeConvidados));
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
  if(listaDeConvidados.length > 0){
    return listaDeConvidados[listaDeConvidados.length - 1].comanda + 1;
  }
  return 1;
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
    atualizarListaLocalStorage();
    exibeListaDeConvidadosV2(listaDeConvidados);
    exibirMensagemUsuario(true, "Convidado incluído na lista!");
    inputNomeConvidado.value = "";
  } else {
    exibirMensagemUsuario(false, "O nome do convidado precisa ser preenchido!");
  }
};

inputConsultarDados.addEventListener("keyup", () => {
  let pesquisa = inputConsultarDados.value.toLowerCase().trim();
  let listaFiltrada = listaDeConvidados.filter((convidado) => {
    let comparacaoNome = convidado.nome.toLowerCase().startsWith(pesquisa);
    let comparacaoComanda = convidado.comanda == pesquisa;
    return comparacaoNome || comparacaoComanda;
  });
  exibeListaDeConvidadosV2(listaFiltrada);
});

// selectConsultarVip.addEventListener("change", () => {
//   let selecionado = selectConsultarVip.value; // "" ou VIP ou GERAL
//   if (selecionado) {
//     let listaFiltrada = listaDeConvidados.filter((convidado) => {
//       //(selecionado === "VIP") : boolean
//       //VIP === true
//       //GERAL === false
//       return convidado.vip === (selecionado === "VIP");
//     });
//     //let listaFiltrada = listaDeConvidados.filter(convidado => convidado.vip === (selecionado === "VIP"));
//     exibeListaDeConvidadosV2(listaFiltrada);
//   }else{
//     exibeListaDeConvidadosV2(listaDeConvidados);
//   }
// });
