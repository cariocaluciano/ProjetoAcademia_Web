
function fnExibeAlunos() {
    const NomeUsuarioEIdAcademia = document.getElementById("NomeUsuarioEIdAcademia").textContent;
    const id = NomeUsuarioEIdAcademia.match(/\d+/g).map(Number);
    const idAcademia = id[0];
    console.log(idAcademia)

    fnGetAlunos(idAcademia)

}


function fnGetAlunos(idAcademia) {
    const apiUrl = `https://localhost:7263/api/academia/aluno/ExibirAlunos?IdAcademia=${idAcademia}`

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
             fnInsereNoHtmlOsDadosDaAcademia(data)
        })
        .catch(error => {
            console.error('Erro ao consumir a API:', error);
        });
         


        function fnInsereNoHtmlOsDadosDaAcademia(objetoJSON) {
    
            const colunasDaTabela = document.getElementById('ColunasDaTabelaDeDadosDosAlunos');
            colunasDaTabela.innerHTML = `<th>Nome</th>
            <th>CPF</th>
            <th>Email</th>
            <th>Contato</th>
            <th>Id</th>`
            // Converter a string JSON em um array de objetos
            var arrayDeObjetos = JSON.parse(objetoJSON.mensagem);
        
            // Obter a tabela pelo ID
            var tabela = document.getElementById('TabelaComOsDadosDosAlunos');
          
            // Iterar sobre os objetos e criar linhas da tabela
            arrayDeObjetos.forEach(function (objeto) {
                var linha = document.createElement('tr');
        
                for (var chave in objeto) {
                    var celula = document.createElement('td');
                    celula.textContent = objeto[chave];
                    linha.appendChild(celula);
                }
        
                tabela.getElementsByTagName('tbody')[0].appendChild(linha);
            });
        }
 }

 