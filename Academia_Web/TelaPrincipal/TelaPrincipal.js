const paragrafoDoCabecalhoQueRecebeIdAcademia = document.getElementById('NomeUsuarioEIdAcademia');
const idAcademia = obterParametrosDaURL();


function obterParametrosDaURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const IdAcademia = urlParams.get('Tk');
    return IdAcademia;
}

function fnRetornaInformacoesDaAcademia() {
    const apiUrl = `https://localhost:7263/api/DadosAcademia/GetAcademia?Token=${idAcademia}`

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            return response.json();
        })
        .then(data => {
            var dataConvertidaParaString = JSON.stringify(data)
            var objetoJSON = JSON.parse(JSON.parse(dataConvertidaParaString).mensagem);

            var nome = objetoJSON.Nome;
            var idAcademia = objetoJSON.IdAcademia;

            fnInsereNoHtmlOsDadosDaAcademia(idAcademia,nome)
        })
        .catch(error => {
            console.error('Erro ao consumir a API:', error);
        });

}

function fnInsereNoHtmlOsDadosDaAcademia(idAcademia,nome){

    paragrafoDoCabecalhoQueRecebeIdAcademia.innerText = `${nome} Id: ${idAcademia}` ;
}


window.onload = obterParametrosDaURL;
window.onload = fnRetornaInformacoesDaAcademia;