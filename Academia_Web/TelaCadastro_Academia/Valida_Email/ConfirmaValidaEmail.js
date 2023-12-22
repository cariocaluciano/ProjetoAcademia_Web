 function obterParametrosDaURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const Token = urlParams.get('Token');

   
    if (Token) {
      document.body.innerHTML += `<p>${Token}</p>`;
        EnviaTokenParaApi(Token)
    } else {
        document.body.innerHTML += `<p>Bem-vindo!</p>`;
    }
}

function EnviaTokenParaApi(Token) {

      const apiUrl = `https://localhost:7263/api/Adiciona/confirmartoken`/*?Token=${Token}*/ 
      var dados = {
        token:Token
      }
      fetch(apiUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(dados)
      })
      
          .then(response => {
            console.log(response , 'response')
              if (!response.ok) {
                  throw new Error(`Erro na requisição: ${response.status}`);
              }
              return response.json();
          })
          .then(data => {
              var dataConvertidaParaString = JSON.stringify(data)
              fnTrataRetornoApi(dataConvertidaParaString)
              setTimeout(function () {
                 window.location.href = "http://127.0.0.1:5500/TelaLogin_Academia/index.html";
              }, 3000);
              return dataConvertidaParaString;
          })
          .catch(error => {
            console.log('erro' , error)
          });
}


function fnTrataRetornoApi(dataConvertidaParaString) {
    if (dataConvertidaParaString.includes("Tabela")) {
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