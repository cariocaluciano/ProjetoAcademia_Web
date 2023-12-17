function fnEnviaCadastro(){
        document.getElementById('cadastroForm').addEventListener('submit', function(event) {
        event.preventDefault();

    const nomeAcademia = document.getElementById("nomeAcademia").value;
    const cnpjAcademia = document.getElementById("cnpjAcademia").value;
    const nomeUsuario = document.getElementById("nomeUsuario").value;
    const cpfUsuario = document.getElementById("cpfUsuario").value;
    const nomeCompleto = document.getElementById("nomeUsuario").value;
    const email = document.getElementById("email").value;
    const contato = document.getElementById("contato").value;
    const senha = document.getElementById("senha").value;

    fnConsumirAPI(nomeAcademia,cnpjAcademia,nomeUsuario,cpfUsuario,nomeCompleto,email,contato,senha)

        })
}

function fnConsumirAPI(nomeAcademia,cnpjAcademia,nomeUsuario,cpfUsuario,nomeCompleto,email,contato,senha) {
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
        console.log('Dados da API:', data);
      })
      .catch(error => {
        console.error('Erro ao consumir a API:', error);
      });
  }