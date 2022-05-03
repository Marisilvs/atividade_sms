/*pega o id do input html*/
var origem = document.getElementById("id_input_origem");
var destino = document.getElementById("id_input_destino");
var exibir = document.getElementById("exibir");
var mensagem = document.getElementById("id_input_enviar");
var objDados = {};
var response = undefined;
var intervalo = undefined;

var pesquisar = function () {
  console.log("entrou aqui");
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    /*`https://barth.com.br/ApiChatCliqx/chat/verificarMensagem.php?origem=${origem.value}&destino=${destino.value}`*/
    `https://barth.com.br/ApiChatCliqx/chat/verificarMensagem.php?origem=${origem.value}&destino=${destino.value}`
  );
  xhr.send(
    null
  ); /*xhr "send" null serve para enviar informações para algum lugar*/

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status == 200) {
        exibir.innerHTML = "";
        /*recebe a resposta e atribui a variavel response*/
        response = JSON.parse(xhr.responseText);
        console.log(response[i]);
        console.log("fora");
        for (var i = 0; i < response.length; i++) {
          var li = document.createElement("li");

          var dt = document.createElement("dt");
          console.log(response[i]);
          var dtText = document.createTextNode(`${response[i].origem}`);
          dt.appendChild(dtText);
          li.appendChild(dt);

          var dd = document.createElement("dd");
          var ddText = document.createTextNode(`${response[i].mensagem}`);
          dd.appendChild(ddText);
          li.appendChild(dd);

          if(response[i].origem === origem.value){
            li.classList.add("direita")

          }

          exibir.appendChild(li);
          //hierarquia da construção de uma lista não ordenada ul > li >dt > dd
        }

        console.log(response);
      }
    }
  };
};

var criar = function () {
  clearInterval(intervalo);
  objDados = {
    destino: destino.value,
    origem: origem.value,
    mensagem: mensagem.value,
  };

  console.log(objDados.destino)

  var xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    /*"https://barth.com.br/ApiChatCliqx/chat/inserirMensagem.php"*/
    "https://barth.com.br/ApiChatCliqx/chat/inserirMensagem.php"
  );
  
  xhr.send(JSON.stringify(objDados));
  console.log()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 201) {
        intervalo = setInterval(function () {
          pesquisar();
        }, 4000);

      }
    }
  };
};


