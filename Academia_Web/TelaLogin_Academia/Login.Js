const ParagrafoParaRetorno = document.getElementById('RetornoDaApi')

function FnEnviaLogin() {
    document.getElementById('Formulario_Login_Academia').addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById("Email").value;
        const senha = document.getElementById("Senha").value;

        FnEnviaLoginParaApi(email, senha)
    })
}

function FnEnviaLoginParaApi(email, senha) {
    const apiUrl = 'https://localhost:7263/api/login/Academia';
    const dados = {
        email: email,
        senha: senha
    };

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
            fnTrataRetornoApi(dataConvertidaParaString);
        })
        .catch(error => {
            console.error('Erro ao consumir a API:', error);
        });
}

function fnTrataRetornoApi(MensagemRetorno) {
    if (MensagemRetorno.includes('Sucesso')) {
        const retornoTratado = MensagemRetorno.split('Sucesso: ')
        const token = retornoTratado[1].slice(0,-2)
        
        window.location.href = `http://127.0.0.1:5500/TelaPrincipal/index.html?Tk=${token}`;    
    }

    else if(MensagemRetorno.includes('Falha')){
      ParagrafoParaRetorno.innerText = 'Usuário ou senha incorreto';
      ParagrafoParaRetorno.style.color = 'red';
      ParagrafoParaRetorno.style.marginTop = '10px'
    }
    else{

    }
}