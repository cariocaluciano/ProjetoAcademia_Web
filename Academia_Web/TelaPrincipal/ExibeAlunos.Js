
function fnExibeAlunos() {
    const NomeUsuarioEIdAcademia = document.getElementById("NomeUsuarioEIdAcademia").textContent;
    const id = NomeUsuarioEIdAcademia.match(/\d+/g).map(Number);
    const idAcademia = id[0];

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

        var tabelaHtmlCabecalho = '<th>Nome</th><th>CPF</th><th>Email</th><th>Contato</th><th>ID</th><th class = "d-flex justify-content-center"><button  type="button" class="btn btn-success btn-sm d-inline-block" onclick="fnModalFormularioAdicionaAluno()">+</button></th>';
        document.getElementById('ColunasDaTabelaDeDadosDosAlunos').innerHTML = tabelaHtmlCabecalho;
       
        var arrayDeObjetos = JSON.parse(objetoJSON.mensagem)

        var tabelaHtml = ''

        for (var i = 0; i < arrayDeObjetos.length; i++) {
            tabelaHtml += '<tr>';
            tabelaHtml += '<td>' + arrayDeObjetos[i].NomeCompleto + '</td>';
            tabelaHtml += '<td>' + arrayDeObjetos[i].Cpf + '</td>';
            tabelaHtml += '<td>' + arrayDeObjetos[i].Email + '</td>';
            tabelaHtml += '<td>' + arrayDeObjetos[i].Contato + '</td>';
            tabelaHtml += '<td id ="idAluno">' + arrayDeObjetos[i].Id + '</td>';
            tabelaHtml += `<td id = "BotoesDeAtualizarEDeletarDaTabela">
            <div class="d-flex justify-content-end">
            <button  type="button" class="btn btn-danger btn-sm d-inline-block" onclick="excluirLinha(this)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
            </button>
            <button  type="button" class="btn btn-primary btn-sm d-inline-block">
             UP
            </button>
            </div>
            </td>`;
            tabelaHtml += '</tr>';
        }
        document.getElementById('CorpoDoCabecalho').innerHTML = tabelaHtml;
    }



}

function excluirLinha(botao){
  var linha = botao.parentNode.parentNode.parentNode; 
  linha.remove();


 var idAluno = botao.parentNode.parentNode.parentNode.children[4].textContent;

 fnDeletaAlunoDaApi(idAluno)

}

function fnDeletaAlunoDaApi(idAluno)
{

    const apiUrl = `https://localhost:7263/api/academia/aluno/DeleteAluno?IdAluno=${idAluno}`;

    fetch(apiUrl ,{
     method: 'DELETE',
     headers :{
        'Content-Type': 'application/json'
     }
    }) .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        return response.json();
    })
    .then(data => {
        var dataConvertidaParaString = JSON.stringify(data)
         console.log(dataConvertidaParaString);
    })
    .catch(error => {
        console.error('Erro ao consumir a API:', error);
    });



}

function fnModalFormularioAdicionaAluno(){
    console.log('Clique')
    document.innerHTML = `<div class="modal" id="formularioModal">
    <div class="modal-dialog">
        <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
                <h4 class="modal-title">Formulário</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="nome">Nome:</label>
                        <input type="text" class="form-control" id="nome" placeholder="Digite seu nome">
                    </div>
                    <div class="form-group">
                        <label for="cpf">CPF:</label>
                        <input type="text" class="form-control" id="cpf" placeholder="Digite seu CPF">
                    </div>
                    <div class="form-group">
                        <label for="email">E-mail:</label>
                        <input type="email" class="form-control" id="email" placeholder="Digite seu e-mail">
                    </div>
                    <div class="form-group">
                        <label for="senha">Senha:</label>
                        <input type="password" class="form-control" id="senha" placeholder="Digite sua senha">
                    </div>
                    <div class="form-group">
                        <label for="contato">Contato:</label>
                        <input type="text" class="form-control" id="contato"
                            placeholder="Digite seu número de contato">
                    </div>
                    <button type="submit" class="btn btn-primary">Enviar</button>
                </form>
            </div>

            <!-- Modal Footer -->
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
            </div>

        </div>
    </div>
</div>
`
}