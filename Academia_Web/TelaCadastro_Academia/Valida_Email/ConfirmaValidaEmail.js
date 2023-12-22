function obterParametrosDaURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // Obtenha o valor do parâmetro 'nome'
    const Token = urlParams.get('Token');

    // Exiba o valor na página
    if (Token) {
        EnviaTokenParaApi(Token);

    } else {
        document.body.innerHTML += `<p>Bem-vindo!</p>`;
    }
}

function EnviaTokenParaApi(Token) {
    return new Promise((resolve, reject) => {
        const apiUrl = `https://localhost:7263/api/Adiciona/confirmartoken?Token=${Token}}`

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na requisição: ${response.status}`);
                }
                reject(response.json())
            })
            .then(data => {
                var dataConvertidaParaString = JSON.stringify(data)
                fnTrataRetornoApi(dataConvertidaParaString)
                setTimeout(function () {
                    window.location.href = "../TelaLogin_Academia/index.html";
                }, 3000);
                resolve(dataConvertidaParaString);
            })
            .catch(error => {
                reject('Erro ao consumir a API:', error)
            });
    });
}

function fnTrataRetornoApi(dataConvertidaParaString) {
    if (dataConvertidaParaString.includes("Tabela Atualizada.")) {
      var paragrafoDoModal = document.getElementById('paragrafoModalCadAcademia')
      var modal = document.getElementById('modal');
      var modalCSS = document.querySelector('.modal-content')
      var closeModalBtn = document.getElementById('closeModalBtn');
  
      modalCSS.style.backgroundColor = 'green'
      paragrafoDoModal.innerHTML = 'Email validado  </br>  Redirecionando para o login...'
      paragrafoDoModal.style.color = 'white'
      paragrafoDoModal.style.marginLeft = '25px'
      modal.style.margin = '10px 0 0 10px'
  
      modal.style.display = 'block';
      modal.style.width = '30%'
      closeModalBtn.addEventListener('click', function () {
        modal.style.display = 'none';
      });
  
      window.addEventListener('click', function (event) {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      });
    }
  else
  {
    var paragrafoDoModal = document.getElementById('paragrafoModalCadAcademia')
    var modal = document.getElementById('modal');
    var modalCSS = document.querySelector('.modal-content')
    var closeModalBtn = document.getElementById('closeModalBtn');

    modalCSS.style.backgroundColor = 'green'
    paragrafoDoModal.innerHTML = 'Token inválido </br> tente efetuar o cadastro novamente.'
    paragrafoDoModal.style.color = 'white'
    paragrafoDoModal.style.marginLeft = '25px'
    modal.style.margin = '10px 0 0 10px'

    modal.style.display = 'block';
    modal.style.width = '30%'
    closeModalBtn.addEventListener('click', function () {
      modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  }
}
// Chame a função quando a página carregar
window.onload = obterParametrosDaURL;