function fnEnviaCadastro() {
  document.getElementById('cadastroForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const nomeAcademia = document.getElementById("nomeAcademia").value;
    const cnpjAcademia = document.getElementById("cnpjAcademia").value;
    const nomeUsuario = document.getElementById("nomeUsuario").value;
    const cpfUsuario = document.getElementById("cpfUsuario").value;
    const nomeCompleto = document.getElementById("nomeUsuario").value;
    const email = document.getElementById("email").value;
    const contato = document.getElementById("contato").value;
    const senha = document.getElementById("senha").value;

    var retornoValidaCnpj = await fnValidaCNPJ(cnpjAcademia).then((resultado) => {
      resultado;
    })
    if (retornoValidaCnpj == "CNPJ inválido") {
      fnTrataRetornoApi(retornoValidaCnpj);
      return
    }
    
    // fnVerificaEmail(email)

    fnConsumirAPI(nomeAcademia, cnpjAcademia, nomeUsuario, cpfUsuario, nomeCompleto, email, contato, senha)

  })
}


function fnConsumirAPI(nomeAcademia, cnpjAcademia, nomeUsuario, cpfUsuario, nomeCompleto, email, contato, senha) {
  const apiUrl = 'https://localhost:7263/api/Adiciona/Academia';
  // const apiUrl = `https://localhost:7263/api/Adiciona/Academia?NomeAcademia=${nomeAcademia}&CnpjAcademia=${cnpjAcademia}&NomeUsuario=${nomeUsuario}&CpfUsuario=${cpfUsuario}&NomeCompleto=${nomeCompleto}&Email=${email}&Contato=${contato}&Senha=${senha}`
  // Dados a serem enviados no corpo da requisição
  const dados = {
    nomeAcademia: nomeAcademia,
    cnpjAcademia: cnpjAcademia,
    nomeUsuario: nomeUsuario,
    cpfUsuario: cpfUsuario,
    nomeCompleto: nomeCompleto,
    email: email,
    contato: contato,
    senha: senha
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // Indica que estamos enviando dados em formato JSON
    },
    body: JSON.stringify(dados) // Converte os dados para JSON antes de enviá-los
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      return response.json();
    })
    .then(data => {
      var dataConvertidaParaString = JSON.stringify(data)
      console.log(dataConvertidaParaString)
      fnTrataRetornoApi(dataConvertidaParaString);
    })
    .catch(error => {
      console.error('Erro ao consumir a API:', error);
    });

}

function fnTrataRetornoApi(dataConvertidaParaString) {
  if (dataConvertidaParaString.includes("Usuário cadastrado com sucesso.")) {
    var paragrafoDoModal = document.getElementById('paragrafoModalCadAcademia')
    var modal = document.getElementById('modal');
    var modalCSS = document.querySelector('.modal-content')
    var closeModalBtn = document.getElementById('closeModalBtn');

    modalCSS.style.backgroundColor = 'green'
    paragrafoDoModal.innerHTML = 'Usuário cadastrado com sucesso.'
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

    setTimeout(function () {
      window.location.href = "../TelaLogin_Academia/index.html";
    }, 3000);

  }
  if (dataConvertidaParaString.includes("Email já cadastrado")) {
    var paragrafoDoModal = document.getElementById('paragrafoModalCadAcademia')
    var modal = document.getElementById('modal');
    var modalCSS = document.querySelector('.modal-content')
    var closeModalBtn = document.getElementById('closeModalBtn');

    modalCSS.style.backgroundColor = 'red'
    paragrafoDoModal.innerHTML = 'Email já cadastrado.'
    paragrafoDoModal.style.color = 'white'
    paragrafoDoModal.style.marginLeft = '25px'

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
  if (dataConvertidaParaString.includes("CNPJ já cadastrado")) {
    var paragrafoDoModal = document.getElementById('paragrafoModalCadAcademia')
    var modal = document.getElementById('modal');
    var modalCSS = document.querySelector('.modal-content')
    var closeModalBtn = document.getElementById('closeModalBtn');

    modalCSS.style.backgroundColor = 'red'
    paragrafoDoModal.innerHTML = 'CNPJ já cadastrado.'
    paragrafoDoModal.style.color = 'white'
    paragrafoDoModal.style.marginLeft = '25px'

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

  if (dataConvertidaParaString.includes("CNPJ inválido")) {
    var paragrafoDoModal = document.getElementById('paragrafoModalCadAcademia')
    var modal = document.getElementById('modal');
    var modalCSS = document.querySelector('.modal-content')
    var closeModalBtn = document.getElementById('closeModalBtn');

    modalCSS.style.backgroundColor = 'red'
    paragrafoDoModal.innerHTML = 'CNPJ inválido.'
    paragrafoDoModal.style.color = 'white'
    paragrafoDoModal.style.marginLeft = '25px'

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

async function fnValidaCNPJ(cnpj) {
  return new Promise((resolve, rejected) => {
    // Remover caracteres não numéricos
    cnpj = cnpj.replace(/[^\d]/g, '');

    // Verificar se o CNPJ tem 14 dígitos
    if (cnpj.length !== 14) {
      rejected("CNPJ inválido");
    }

    // Verificar se todos os dígitos são iguais (situação inválida)
    if (/^(\d)\1+$/.test(cnpj)) {
      rejected("CNPJ inválido");
    }

    // Calcular o primeiro dígito verificador
    let soma = 0;
    let peso = 2;
    for (let i = 11; i >= 0; i--) {
      soma += parseInt(cnpj.charAt(i)) * peso;
      peso = (peso === 9) ? 2 : peso + 1;
    }
    let digitoVerificador1 = (11 - (soma % 11)) % 11;

    // Verificar se o primeiro dígito verificador está correto
    if (parseInt(cnpj.charAt(12)) !== digitoVerificador1) {
      rejected("CNPJ inválido");
    }

    // Calcular o segundo dígito verificador
    soma = 0;
    peso = 2;
    for (let i = 12; i >= 0; i--) {
      soma += parseInt(cnpj.charAt(i)) * peso;
      peso = (peso === 9) ? 2 : peso + 1;
    }
    let digitoVerificador2 = (11 - (soma % 11)) % 11;

    // Verificar se o segundo dígito verificador está correto
    if (parseInt(cnpj.charAt(13)) !== digitoVerificador2) {
      rejected("CNPJ inválido");
    }
    // Se todas as verificações passaram, o CNPJ é válido
    resolve("CNPJ válido");
  });
}

