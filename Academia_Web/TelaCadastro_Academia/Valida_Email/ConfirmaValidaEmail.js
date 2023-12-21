function obterParametrosDaURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // Obtenha o valor do parâmetro 'nome'
    const Token = urlParams.get('Token');

    // Exiba o valor na página
    if (Token) {
        document.body.innerHTML += `<p>TOKEN = , ${Token}!</p>`;
    } else {
        document.body.innerHTML += `<p>Bem-vindo!</p>`;
    }
}

// Chame a função quando a página carregar
window.onload = obterParametrosDaURL;