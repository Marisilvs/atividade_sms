/*pega o id do input html*/
var origem = document.getElementById("input_origem");
var destino = document.getElementById("input_destino");
var response = undefined;

var pesquisar = function () {
    console.log('entrou aqui')
    var xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
        `https://barth.com.br/ApiChatCliqx/chat/verificarMensagem.php?origem=${origem}&destino=${destino}`
    );
    xhr.send(null);/*xhr "send" null serve para enviar informações para algum lugar*/

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status == 200) {
            /*recebe a resposta e atribui a variavel response*/

          response = JSON.parse(xhr.responseText)
          console.log(response.mensagem)
        }
    }
    
}
}