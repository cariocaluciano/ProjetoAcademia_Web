
function fnExibeAlunos() {
    const NomeUsuarioEIdAcademia = document.getElementById("NomeUsuarioEIdAcademia").textContent;
    const id = NomeUsuarioEIdAcademia.match(/\d+/g).map(Number);
    const idAcademia = id[0];

    fnGetAlunos(idAcademia)
}


 function fnGetAlunos(idAcademia) {
    document.getElementById('loadingIndicator').style.display = 'inline-block';

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
        }).finally(fin => {
          fin =  document.getElementById('loadingIndicator').style.display = 'none';
        })
            
    function fnInsereNoHtmlOsDadosDaAcademia(objetoJSON) {

        var tabelaHtmlCabecalho = `<th>Nome</th><th>CPF</th><th>Email</th><th>Contato</th><th>ID</th><th class = "d-flex justify-content-center"><button  type="button" class="btn btn-success btn-sm d-inline-block" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick = "fnClickInsereAluno()">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
        <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/></svg>
        </button></th>`;
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
            <button type="button" title="Cadastrar informações do aluno" class="btn d-inline-block icon-link icon-link-hover" data-bs-toggle="modal" data-bs-target="#exampleModal" style = "--bs-link-hover-color-rgb: 25, 135, 84; background-color:#e0e0e0;" onclick = "fnPegaOsDadosDoAlunoParaInserirNoModal(this)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder-plus" viewBox="0 0 16 16">
            <path d="m.5 3 .04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2m5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98z"/>
            <path d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5"/>
            </svg>
           </button>
           <button  type="button" title="Adicionar pagamento" class="btn d-inline-block icon-link icon-link-hover" data-bs-toggle="modal" data-bs-target="#exampleModal" style = "--bs-link-hover-color-rgb: 25, 135, 84; background-color:#e0e0e0;" onclick = "fnPegaOsDadosDoAlunoParaInserirNoModal(this)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg>
          </button>
            <button  type="button" class="btn btn-primary btn-sm d-inline-block" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick = "fnPegaOsDadosDoAlunoParaInserirNoModal(this)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"/>
            </svg>
           </button>
            <button  type="button" class="btn btn-danger btn-sm d-inline-block" onclick="excluirLinha(this)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
            </button>
            </div>
            </td>`;
            tabelaHtml += '</tr>';
        }
        document.getElementById('CorpoDoCabecalho').innerHTML = tabelaHtml;
    }
}

function excluirLinha(botao) {
    var linha = botao.parentNode.parentNode.parentNode;
    linha.remove();


    var idAluno = botao.parentNode.parentNode.parentNode.children[4].textContent;

    fnDeletaAlunoDaApi(idAluno)

}



function fnDeletaAlunoDaApi(idAluno) {

    const apiUrl = `https://localhost:7263/api/academia/aluno/DeleteAluno?IdAluno=${idAluno}`;

    fetch(apiUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
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



function EnviaFormularioCadastroDeAluno() {

    const nomeCompleto = document.getElementById('NomeAluno').value;
    const cpf = document.getElementById('CpfAluno').value;
    const email = document.getElementById('EmailAluno').value;
    const contato = document.getElementById('ContatoAluno').value;
    const senha = document.getElementById('SenhaAluno').value;
    var idAcademia = document.getElementById('NomeUsuarioEIdAcademia').textContent;
    idAcademia = idAcademia.match(/\d+/g).map(Number);
    idAcademia = idAcademia[0];


    const apiUrl = `https://localhost:7263/api/academia/aluno/Adicionar`
    const dados = {
        idAcademia: idAcademia,
        nomeCompleto: nomeCompleto,
        cpf: cpf,
        email: email,
        contato: contato,
        senha: senha
    }

    fetch(apiUrl, {
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
            var dataConvertidaParaString = JSON.stringify(data)
            fnTrataRetornoApi(dataConvertidaParaString, idAcademia);
        })
        .catch(error => {
            console.error('Erro ao consumir a API:', error);
        });

}



function fnClickInsereAluno() {
    document.getElementById('PostAluno').style.display = "inline-block";
    document.getElementById('PutAluno').style.display = "none";
    document.getElementById('exampleModalLabel').innerText = "Cadastro de aluno";
    document.getElementById('IdAluno').value = '';

    document.getElementById('NomeAluno').value = '';
    document.getElementById('CpfAluno').value = '';
    document.getElementById('EmailAluno').value = '';
    document.getElementById('ContatoAluno').value = '';

}



function fnPegaOsDadosDoAlunoParaInserirNoModal(dadosDoAluno) {

    document.getElementById('NomeAluno').value = dadosDoAluno.parentNode.parentNode.parentNode.children[0].textContent;
    document.getElementById('CpfAluno').value = dadosDoAluno.parentNode.parentNode.parentNode.children[1].textContent;
    document.getElementById('EmailAluno').value = dadosDoAluno.parentNode.parentNode.parentNode.children[2].textContent;
    document.getElementById('ContatoAluno').value = dadosDoAluno.parentNode.parentNode.parentNode.children[3].textContent;
    document.getElementById('IdAluno').value = dadosDoAluno.parentNode.parentNode.parentNode.children[4].textContent;

    document.getElementById('PostAluno').style.display = "none";
    document.getElementById('PutAluno').style.display = "inline-block";
    document.getElementById('exampleModalLabel').innerText = "Atualizar dados do aluno";

}



function fnAtualizaAluno() {
    var idAcademia = document.getElementById('NomeUsuarioEIdAcademia').textContent;
    idAcademia = idAcademia.match(/\d+/g).map(Number);
    idAcademia = idAcademia[0];

    const idAluno = document.getElementById('IdAluno').value
    const nomeCompleto = document.getElementById('NomeAluno').value;
    const cpf = document.getElementById('CpfAluno').value;
    const email = document.getElementById('EmailAluno').value;
    const contato = document.getElementById('ContatoAluno').value;
    const senha = document.getElementById('SenhaAluno').value;

    const apiUrl = `https://localhost:7263/api/academia/aluno/AtualizarDados`
    const dados = {
        idAluno: idAluno,
        idAcademia: idAcademia,
        nomeCompleto: nomeCompleto,
        cpf: cpf,
        email: email,
        contato: contato,
        senha: senha
    }

    fetch(apiUrl, {
        method: 'PUT',
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
            var dataConvertidaParaString = JSON.stringify(data)
            fnTrataRetornoApi(dataConvertidaParaString, idAcademia);
        })
        .catch(error => {
            console.error('Erro ao consumir a API:', error);
        });

}



function BtnPesquisaAluno_Click() {
    var tipoPesquisa;
    var alunoPesquisado = document.getElementById('Input-Pesquisa').value;
    var validacao = document.getElementById('NomeAlunoVazioNaPesquisa');
    validacao.style.display = 'none'

    const checkNome = document.getElementById('flexRadioNome');
    const checkEmail = document.getElementById('flexRadioEmail');
    const checkCpf = document.getElementById('flexRadioCpf');

    if (checkNome.checked) tipoPesquisa = 1;
    if (checkEmail.checked) tipoPesquisa = 2;
    if (checkCpf.checked) tipoPesquisa = 3;


    if (alunoPesquisado === '') {
        validacao.style.display = 'block'
        validacao.innerText = 'Insira um nome válido';
        validacao.style.color = 'red';
        validacao.style.marginTop = '10px';
        alunoPesquisado = 'Erro';//Ajustar , para parar a aplicação quando dor vazio
    }

    const formPesquisa = document.getElementById('Form-PesquisaAluno')
    formPesquisa.addEventListener('submit', function (event) {
        event.preventDefault();
    });

    var idAcademia = document.getElementById('NomeUsuarioEIdAcademia').textContent;
    idAcademia = idAcademia.match(/\d+/g).map(Number);
    idAcademia = idAcademia[0];


    const apiUrl = `https://localhost:7263/api/academia/aluno/ExibirAlunosPesquisa?IdAcademia=${idAcademia}&NomePesquisado=${alunoPesquisado}&TipoPesquisa=${tipoPesquisa}`

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            return response.json();
        })
        .then(data => {
            var objeto = JSON.stringify(data)
            if (objeto.includes('Falha')) {
                fnTrataRetornoApi(objeto, idAcademia)
            }
            else {
                fnInsereNoHtmlOsDadosDaAcademia(data)
            }
        })
        .catch(error => {
            console.error('Erro ao consumir a API:', error);
        });


    function fnInsereNoHtmlOsDadosDaAcademia(objetoJSON) {

        var tabelaHtmlCabecalho = '<th>Nome</th><th>CPF</th><th>Email</th><th>Contato</th><th>ID</th><th class = "d-flex justify-content-center"><button  type="button" class="btn btn-success btn-sm d-inline-block" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick = "fnClickInsereAluno()">+</button></th>';
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
            <button type="button" title="Cadastrar informações do aluno" class="btn d-inline-block icon-link icon-link-hover" data-bs-toggle="modal" data-bs-target="#exampleModal" style = "--bs-link-hover-color-rgb: 25, 135, 84; background-color:#e0e0e0;" onclick = "fnPegaOsDadosDoAlunoParaInserirNoModal(this)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder-plus" viewBox="0 0 16 16">
            <path d="m.5 3 .04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2m5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98z"/>
            <path d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5"/>
            </svg>
           </button>
           <button  type="button" title="Adicionar pagamento" class="btn d-inline-block icon-link icon-link-hover" data-bs-toggle="modal" data-bs-target="#exampleModal" style = "--bs-link-hover-color-rgb: 25, 135, 84; background-color:#e0e0e0;" onclick = "fnPegaOsDadosDoAlunoParaInserirNoModal(this)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg>
          </button>
            <button  type="button" class="btn btn-primary btn-sm d-inline-block" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick = "fnPegaOsDadosDoAlunoParaInserirNoModal(this)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"/>
            </svg>
           </button>
            <button  type="button" class="btn btn-danger btn-sm d-inline-block" onclick="excluirLinha(this)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
            </button>
            </div>
            </td>`;
            tabelaHtml += '</tr>';
        }
        document.getElementById('CorpoDoCabecalho').innerHTML = tabelaHtml;
    }


}



function fnTrataRetornoApi(retornoApi, idAcademia) {
    if (retornoApi.includes('Sucesso')) {
        document.getElementById('FecharModal').click();
        document.getElementById('Input-Pesquisa').value = '';
        fnGetAlunos(idAcademia);
    }
    else if (retornoApi.includes('Falha')) {
        var validacao = document.getElementById('NomeAlunoVazioNaPesquisa');
        validacao.style.display = 'block'
        validacao.innerText = 'Nome não localizado';
        validacao.style.color = 'red';
        validacao.style.marginTop = '10px';
        console.log('Não encontrado')
    }

    else {
        console.log('Irei voltar para ajustar Adiciona Aluno Else')
    }

}

