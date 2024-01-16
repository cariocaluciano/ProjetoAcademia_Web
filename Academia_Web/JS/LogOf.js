
function fnLogOf() {
    const NomeUsuarioEIdAcademia = document.getElementById("NomeUsuarioEIdAcademia").textContent;
    const id = NomeUsuarioEIdAcademia.match(/\d+/g).map(Number);
    const idAcademia = id[0];

    console.log(idAcademia)

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const Token = urlParams.get('Tk');

    console.log(Token)
    fnConsomeApiLogOf(Token, idAcademia)

}

function fnConsomeApiLogOf(Token, idAcademia) {

    const url = `https://localhost:7263/Api/LogOf`

    const dados =
    {
        token: Token,
        idAcademia: idAcademia
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            var dataConvertidaParaString = JSON.stringify(data);
            fntrataretornoApi(dataConvertidaParaString);
        })
        .catch(error => {
            console.Error('Erro ao consumir a API :', error);
        })
}

function fntrataretornoApi(dataConvertidaParaString){
if(dataConvertidaParaString.includes('Sucesso'))
{

    setTimeout(fnRedirecionaParatelaDeLogin,1000)
}


}

function fnRedirecionaParatelaDeLogin(){
    window.location.href = 'http://127.0.0.1:5500/Academia_Web/TelaLogin_Academia/index.html';
}